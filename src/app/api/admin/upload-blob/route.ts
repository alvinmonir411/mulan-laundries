import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    const jsonResponse = await handleUpload({
      body,
      request,
      token: blobToken,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/ogg",
            "video/x-matroska",
            "video/mpeg",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
            "image/avif",
            "application/octet-stream",
          ],
          maximumSizeInBytes: 150 * 1024 * 1024, // 150MB for video/media uploads
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("[VERCEL BLOB CLIENT UPLOAD COMPLETE]:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[VERCEL BLOB CLIENT UPLOAD HANDLER ERROR]:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to handle blob upload" },
      { status: 400 }
    );
  }
}
