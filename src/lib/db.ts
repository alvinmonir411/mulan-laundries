import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { DEFAULT_SITE_IMAGES, SiteImage } from "./defaultImages";

const LOCAL_FALLBACK_FILE = path.join(process.cwd(), "src", "data", "site_images.json");

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

// In-memory / file cache for fallback
function readFallbackFile(): Record<string, SiteImage> {
  try {
    if (fs.existsSync(LOCAL_FALLBACK_FILE)) {
      const data = fs.readFileSync(LOCAL_FALLBACK_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[DB FALLBACK] Could not read fallback file, using defaults:", err);
  }

  // Seed default map
  const defaultMap: Record<string, SiteImage> = {};
  DEFAULT_SITE_IMAGES.forEach((img) => {
    defaultMap[img.slot_key] = img;
  });
  return defaultMap;
}

function writeFallbackFile(data: Record<string, SiteImage>) {
  try {
    const dir = path.dirname(LOCAL_FALLBACK_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_FALLBACK_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("[DB FALLBACK] Could not write fallback file:", err);
  }
}

export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  provider: "neon" | "local_fallback";
  message: string;
}> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    return {
      connected: false,
      provider: "local_fallback",
      message: "No Neon DATABASE_URL configured in .env.local. Currently using local JSON store.",
    };
  }

  try {
    const sql = neon(dbUrl);
    const result = await sql`SELECT 1 as test;`;
    if (result && result.length > 0) {
      await initializeNeonSchema(sql);
      return {
        connected: true,
        provider: "neon",
        message: "Successfully connected to Neon Postgres database!",
      };
    }
    return {
      connected: false,
      provider: "local_fallback",
      message: "Neon connection test returned empty response.",
    };
  } catch (err: any) {
    return {
      connected: false,
      provider: "local_fallback",
      message: `Neon connection failed: ${err.message || String(err)}. Using local store.`,
    };
  }
}

let imageSchemaInitialized = false;

async function initializeNeonSchema(sql: any) {
  if (imageSchemaInitialized) return;
  try {
    const tableExists = await sql`
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'site_images';
    `;

    if (!tableExists || tableExists.length === 0) {
      await sql`
        CREATE TABLE IF NOT EXISTS site_images (
          id SERIAL PRIMARY KEY,
          slot_key VARCHAR(100) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          section VARCHAR(100) NOT NULL,
          image_url TEXT NOT NULL,
          alt_text VARCHAR(255) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    }
    imageSchemaInitialized = true;

    // Seed defaults if table is empty
    const countResult = await sql`SELECT count(*) as count FROM site_images;`;
    const count = parseInt(countResult[0]?.count || "0", 10);

    if (count === 0) {
      console.log("[NEON DB] Seeding default site images table...");
      for (const item of DEFAULT_SITE_IMAGES) {
        await sql`
          INSERT INTO site_images (slot_key, title, section, image_url, alt_text)
          VALUES (${item.slot_key}, ${item.title}, ${item.section}, ${item.image_url}, ${item.alt_text})
          ON CONFLICT (slot_key) DO NOTHING;
        `;
      }
    }
  } catch (err) {
    console.error("[NEON DB SCHEMA INIT ERROR]", err);
  }
}

export async function fetchAllImages(): Promise<Record<string, SiteImage>> {
  const dbUrl = getDatabaseUrl();

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeNeonSchema(sql);
      const rows = await sql`
        SELECT slot_key, title, section, image_url, alt_text, updated_at
        FROM site_images
        ORDER BY section, slot_key;
      `;

      if (rows && rows.length > 0) {
        const map: Record<string, SiteImage> = {};
        rows.forEach((r: any) => {
          map[r.slot_key] = {
            slot_key: r.slot_key,
            title: r.title,
            section: r.section,
            image_url: r.image_url,
            alt_text: r.alt_text,
            updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        });

        // Ensure all defaults are present in map
        DEFAULT_SITE_IMAGES.forEach((d) => {
          if (!map[d.slot_key]) {
            map[d.slot_key] = d;
          }
        });

        return map;
      }
    } catch (err) {
      console.error("[NEON DB FETCH ERROR] Falling back to local store:", err);
    }
  }

  // Fallback
  return readFallbackFile();
}

export async function saveImageSlot(
  slotKey: string,
  imageUrl: string,
  altText?: string
): Promise<SiteImage> {
  const dbUrl = getDatabaseUrl();
  const existingDefaults = DEFAULT_SITE_IMAGES.find((i) => i.slot_key === slotKey);
  const title = existingDefaults?.title || slotKey;
  const section = existingDefaults?.section || "General";
  const safeAlt = altText || existingDefaults?.alt_text || title;
  const now = new Date().toISOString();

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeNeonSchema(sql);

      await sql`
        INSERT INTO site_images (slot_key, title, section, image_url, alt_text, updated_at)
        VALUES (${slotKey}, ${title}, ${section}, ${imageUrl}, ${safeAlt}, CURRENT_TIMESTAMP)
        ON CONFLICT (slot_key)
        DO UPDATE SET
          image_url = ${imageUrl},
          alt_text = ${safeAlt},
          updated_at = CURRENT_TIMESTAMP;
      `;

      console.log(`[NEON DB] Saved image slot '${slotKey}' -> ${imageUrl}`);
    } catch (err) {
      console.error(`[NEON DB SAVE ERROR] for slot ${slotKey}:`, err);
    }
  }

  // Also always write to local fallback to keep synchronized
  const localMap = readFallbackFile();
  const updatedItem: SiteImage = {
    slot_key: slotKey,
    title,
    section,
    image_url: imageUrl,
    alt_text: safeAlt,
    updated_at: now,
  };
  localMap[slotKey] = updatedItem;
  writeFallbackFile(localMap);

  return updatedItem;
}
