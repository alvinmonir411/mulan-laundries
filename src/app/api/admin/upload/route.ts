import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k",
  api_key: process.env.CLOUDINARY_API_KEY || "673182877555238",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Lt98TBmqTdi3RGHIEr6xGv9KPxU",
  secure: true,
});

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

    // Try uploading to Cloudinary
    try {
      const mimeType = file.type || "image/jpeg";
      const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        folder: "mulan-laundries",
        resource_type: "image",
      });

      if (uploadResult && uploadResult.secure_url) {
        console.log("[CLOUDINARY UPLOAD SUCCESS]", uploadResult.secure_url);
        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          provider: "cloudinary",
          message: "Image uploaded to Cloudinary successfully!",
        });
      }
    } catch (cloudinaryErr: any) {
      console.warn("[CLOUDINARY UPLOAD WARN, FALLING BACK TO LOCAL]", cloudinaryErr);
    }

    // Fallback to local storage if Cloudinary upload throws
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const finalFilename = `${baseName}_${Date.now()}${ext}`;
    const destPath = path.join(uploadsDir, finalFilename);

    fs.writeFileSync(destPath, buffer);

    const publicUrl = `/uploads/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: buffer.length,
      provider: "local",
      message: "Image uploaded successfully (local fallback)!",
    });
  } catch (err: any) {
    console.error("[UPLOAD API ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
