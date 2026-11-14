import { NextRequest, NextResponse } from "next/server";
import { checkDatabaseConnection, fetchAllImages } from "@/lib/db";
import { updateImageAndTriggerRevalidation } from "@/lib/images";
import { DEFAULT_SITE_IMAGES } from "@/lib/defaultImages";

export async function GET() {
  try {
    const dbStatus = await checkDatabaseConnection();
    const imagesMap = await fetchAllImages();

    // Transform map into ordered array using default order
    const imagesList = DEFAULT_SITE_IMAGES.map((def) => {
      const live = imagesMap[def.slot_key];
      return live || def;
    });

    return NextResponse.json(
      {
        success: true,
        images: imagesList,
        dbStatus,
        totalSlots: imagesList.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("[ADMIN IMAGES GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load images" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slotKey, imageUrl, altText } = body;

    if (!slotKey || typeof slotKey !== "string") {
      return NextResponse.json(
        { success: false, error: "slotKey is required" },
        { status: 400 }
      );
    }

    if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
      return NextResponse.json(
        { success: false, error: "imageUrl cannot be empty" },
        { status: 400 }
      );
    }

    const updated = await updateImageAndTriggerRevalidation(
      slotKey.trim(),
      imageUrl.trim(),
      altText ? altText.trim() : undefined
    );

    return NextResponse.json({
      success: true,
      message: `Image for slot '${slotKey}' updated successfully! Cache purged and revalidation triggered.`,
      image: updated,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[ADMIN IMAGES POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update image" },
      { status: 500 }
    );
  }
}
