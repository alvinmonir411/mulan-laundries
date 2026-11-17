import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

export async function GET() {
  const dbUrl = getDatabaseUrl();

  let latestVersion = new Date().toISOString();
  let timestamp = Date.now();

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      const res = await sql`
        SELECT GREATEST(
          COALESCE((SELECT MAX(updated_at) FROM site_settings), '1970-01-01'::timestamptz),
          COALESCE((SELECT MAX(updated_at) FROM site_images), '1970-01-01'::timestamptz),
          COALESCE((SELECT MAX(updated_at) FROM site_testimonials), '1970-01-01'::timestamptz),
          COALESCE((SELECT MAX(updated_at) FROM site_faqs), '1970-01-01'::timestamptz),
          COALESCE((SELECT MAX(updated_at) FROM site_pages), '1970-01-01'::timestamptz)
        ) as latest_version
      `;

      if (res && res[0]?.latest_version) {
        latestVersion = new Date(res[0].latest_version).toISOString();
        timestamp = new Date(res[0].latest_version).getTime();
      }
    } catch (err: any) {
      console.warn("[SITE-SYNC ERROR]", err?.message);
    }
  }

  return NextResponse.json(
    {
      success: true,
      latestVersion,
      timestamp,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}
