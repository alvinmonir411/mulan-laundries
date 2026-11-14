import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { DEFAULT_SITE_IMAGES } from "@/lib/defaultImages";

export async function POST(req: NextRequest) {
  try {
    const { databaseUrl, saveToEnv } = await req.json();

    if (!databaseUrl || typeof databaseUrl !== "string" || !databaseUrl.startsWith("postgresql://")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid Neon PostgreSQL connection URL (starts with postgresql://)" },
        { status: 400 }
      );
    }

    const trimmedUrl = databaseUrl.trim();
    const sql = neon(trimmedUrl);

    // Test query
    const res = await sql`SELECT NOW() as current_time, current_database() as db_name;`;

    // Ensure schema
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

    // Seed if empty
    const countRes = await sql`SELECT count(*) as count FROM site_images;`;
    const count = parseInt(countRes[0]?.count || "0", 10);
    if (count === 0) {
      for (const item of DEFAULT_SITE_IMAGES) {
        await sql`
          INSERT INTO site_images (slot_key, title, section, image_url, alt_text)
          VALUES (${item.slot_key}, ${item.title}, ${item.section}, ${item.image_url}, ${item.alt_text})
          ON CONFLICT (slot_key) DO NOTHING;
        `;
      }
    }

    // Optionally save to .env.local
    if (saveToEnv) {
      const envPath = path.join(process.cwd(), ".env.local");
      fs.writeFileSync(envPath, `DATABASE_URL="${trimmedUrl}"\n`, "utf8");
      process.env.DATABASE_URL = trimmedUrl;
    }

    return NextResponse.json({
      success: true,
      message: `Connected successfully to Neon database '${res[0]?.db_name}'! Table 'site_images' initialized with ${DEFAULT_SITE_IMAGES.length} slots.`,
      serverTime: res[0]?.current_time,
      database: res[0]?.db_name,
    });
  } catch (err: any) {
    console.error("[TEST DB ERROR]", err);
    return NextResponse.json(
      { success: false, error: `Connection failed: ${err.message || String(err)}` },
      { status: 500 }
    );
  }
}
