import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { SiteSettings, DEFAULT_SITE_SETTINGS } from "./settingsTypes";

export type { SiteSettings };
export { DEFAULT_SITE_SETTINGS };

const LOCAL_SETTINGS_FILE = path.join(process.cwd(), "src", "data", "site_settings.json");

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

function readLocalSettings(): SiteSettings {
  try {
    if (fs.existsSync(LOCAL_SETTINGS_FILE)) {
      const data = fs.readFileSync(LOCAL_SETTINGS_FILE, "utf8");
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(data) };
    }
  } catch (err) {
    console.warn("[SETTINGS LOCAL READ ERROR]", err);
  }
  return { ...DEFAULT_SITE_SETTINGS };
}

function writeLocalSettings(settings: SiteSettings) {
  try {
    const dir = path.dirname(LOCAL_SETTINGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf8");
  } catch (err) {
    console.error("[SETTINGS LOCAL WRITE ERROR]", err);
  }
}

let schemaInitialized = false;

export async function initializeSettingsSchema(sql: any) {
  if (schemaInitialized) return;
  try {
    const tableExists = await sql`
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'site_settings';
    `;

    if (!tableExists || tableExists.length === 0) {
      await sql`
        CREATE TABLE IF NOT EXISTS site_settings (
          key VARCHAR(100) PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    }
    schemaInitialized = true;

    const countRes = await sql`SELECT count(*) as count FROM site_settings;`;
    const count = parseInt(countRes[0]?.count || "0", 10);

    if (count === 0) {
      console.log("[NEON DB] Seeding default site_settings...");
      for (const [key, value] of Object.entries(DEFAULT_SITE_SETTINGS)) {
        await sql`
          INSERT INTO site_settings (key, value, updated_at)
          VALUES (${key}, ${value}, CURRENT_TIMESTAMP)
          ON CONFLICT (key) DO NOTHING;
        `;
      }
    }
  } catch (err) {
    console.error("[NEON DB SETTINGS SCHEMA INIT ERROR]", err);
  }
}

export async function fetchAllSettings(): Promise<SiteSettings> {
  const dbUrl = getDatabaseUrl();

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSettingsSchema(sql);
      const rows = await sql`SELECT key, value FROM site_settings;`;

      if (rows && rows.length > 0) {
        const settings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };
        rows.forEach((r: any) => {
          settings[r.key] = r.value;
        });
        // Also keep local fallback synchronized
        writeLocalSettings(settings);
        return settings;
      }
    } catch (err) {
      console.error("[NEON DB FETCH SETTINGS ERROR] Falling back to local:", err);
    }
  }

  return readLocalSettings();
}

// Cached getter with Next.js Cache Tag (60s stale fallback + on-demand revalidateTag)
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    return await fetchAllSettings();
  },
  ["site-settings-cache-key"],
  {
    tags: ["site-settings"],
    revalidate: 60,
  }
);

export async function saveSiteSettingsBatch(
  newSettings: Partial<SiteSettings>
): Promise<SiteSettings> {
  const dbUrl = getDatabaseUrl();
  const current = await fetchAllSettings();
  const updated: SiteSettings = { ...current };
  for (const [k, v] of Object.entries(newSettings)) {
    if (v !== undefined) {
      updated[k] = v;
    }
  }

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSettingsSchema(sql);

      for (const [k, v] of Object.entries(newSettings)) {
        if (v !== undefined) {
          await sql`
            INSERT INTO site_settings (key, value, updated_at)
            VALUES (${k}, ${String(v)}, CURRENT_TIMESTAMP)
            ON CONFLICT (key)
            DO UPDATE SET
              value = ${String(v)},
              updated_at = CURRENT_TIMESTAMP;
          `;
        }
      }
      console.log("[NEON DB] Successfully updated site_settings batch in database.");
    } catch (err) {
      console.error("[NEON DB SAVE SETTINGS ERROR]", err);
    }
  }

  // Update local file fallback
  writeLocalSettings(updated);

  // Trigger instant Next.js cache revalidation across entire site
  try {
    revalidateTag("site-settings", "max");
    revalidateTag("site-images", "max");
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/commercial-laundry");
    revalidatePath("/wash-fold");
    revalidatePath("/pickup-request");
    revalidatePath("/contact");
  } catch (err) {
    console.warn("[CACHE REVALIDATION WARN]", err);
  }

  return updated;
}
