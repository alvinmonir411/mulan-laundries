import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { fetchAllPages, savePage, deletePage } from "@/lib/cmsData";

export async function GET() {
  try {
    const pages = await fetchAllPages();
    return NextResponse.json(
      {
        success: true,
        pages,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("[ADMIN PAGES GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { success: false, error: "Slug and title are required." },
        { status: 400 }
      );
    }

    const saved = await savePage(body);

    // Revalidate the specific page and tags
    try {
      revalidatePath(slug, "page");
      revalidatePath("/admin", "page");
      revalidateTag("site-pages", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      page: saved,
      message: `Page '${slug}' updated and cache revalidated!`,
    });
  } catch (err: any) {
    console.error("[ADMIN PAGES POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save page" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    await deletePage(slug);

    // Revalidate
    try {
      revalidatePath(slug, "page");
      revalidateTag("site-pages", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      message: `Page '${slug}' deleted successfully!`,
    });
  } catch (err: any) {
    console.error("[ADMIN PAGES DELETE ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete page" },
      { status: 500 }
    );
  }
}
