import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
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

    const mimeType = file.type || "application/octet-stream";
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const finalFilename = `${baseName}_${Date.now()}${ext}`;

    // 1. If Vercel Blob token is available, use Vercel Blob (industry-standard, supports high-speed CDN streaming for videos and images up to 500MB)
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      try {
        const blobResult = await put(`uploads/${finalFilename}`, file, {
          access: "public",
          token: blobToken,
        });

        if (blobResult && blobResult.url) {
          console.log("[VERCEL BLOB UPLOAD SUCCESS]:", blobResult.url);
          return NextResponse.json({
            success: true,
            url: blobResult.url,
            filename: finalFilename,
            size: file.size,
            provider: "vercel-blob",
            message: "File uploaded to Vercel Blob CDN successfully!",
          });
        }
      } catch (blobErr: any) {
        console.warn("[VERCEL BLOB UPLOAD WARN, FALLING BACK]:", blobErr?.message);
      }
    }

    // 2. Try local filesystem if running locally
    const isLocalEnvironment = !process.env.VERCEL;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    // 3. Fallback to Base64 Data URI (only if smaller than 4.5MB to avoid payload limits)
    if (buffer.length < 4.5 * 1024 * 1024) {
      const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

      const dbUrl = getDatabaseUrl();
      if (dbUrl) {
        try {
          const sql = neon(dbUrl);
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

      return NextResponse.json({
        success: true,
        url: base64Data,
        filename: finalFilename,
        size: buffer.length,
        provider: "data-uri",
        message: "Media uploaded successfully!",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "File is larger than 4.5MB and Vercel Blob direct upload is required.",
      },
      { status: 413 }
    );
  } catch (err: any) {
    console.error("[UPLOAD API ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
