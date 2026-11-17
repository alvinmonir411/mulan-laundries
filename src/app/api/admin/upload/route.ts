import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in form data" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "application/octet-stream";
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const finalFilename = `${baseName}_${Date.now()}${ext}`;

    // 1. Try local filesystem if running locally (not on Vercel read-only filesystem)
    const isLocalEnvironment = !process.env.VERCEL;
    if (isLocalEnvironment) {
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const destPath = path.join(uploadsDir, finalFilename);
        fs.writeFileSync(destPath, buffer);

        const localUrl = `/uploads/${finalFilename}`;
        return NextResponse.json({
          success: true,
          url: localUrl,
          filename: finalFilename,
          size: buffer.length,
          provider: "local",
          message: "File uploaded successfully to local storage!",
        });
      } catch (fsErr: any) {
        console.warn("[UPLOAD LOCAL FS WARN, FALLING BACK TO DATABASE/DATA-URI]:", fsErr?.message);
      }
    }

    // 2. Prepare Base64 Data URI for serverless (works seamlessly for images on Vercel without third-party limits)
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // 3. Persist into Neon Postgres media_assets table if database is available
    const dbUrl = getDatabaseUrl();
    if (dbUrl) {
      try {
        const sql = neon(dbUrl);
        // Ensure table exists
        await sql`
          CREATE TABLE IF NOT EXISTS media_assets (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255),
            mime_type VARCHAR(100),
            data_url TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `;

        await sql`
          INSERT INTO media_assets (filename, mime_type, data_url)
          VALUES (${finalFilename}, ${mimeType}, ${base64Data});
        `;

        console.log("[MEDIA UPLOAD NEON SUCCESS]:", finalFilename);
        return NextResponse.json({
          success: true,
          url: base64Data,
          filename: finalFilename,
          size: buffer.length,
          provider: "neon-db",
          message: "Media uploaded and persisted successfully to database!",
        });
      } catch (dbErr: any) {
        console.warn("[MEDIA UPLOAD NEON WARN]:", dbErr?.message);
      }
    }

    // 4. Standalone Data URI fallback
    return NextResponse.json({
      success: true,
      url: base64Data,
      filename: finalFilename,
      size: buffer.length,
      provider: "data-uri",
      message: "Media uploaded successfully!",
    });
  } catch (err: any) {
    console.error("[UPLOAD API ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
