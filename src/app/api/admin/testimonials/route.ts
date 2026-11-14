import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  fetchAllTestimonials,
  saveTestimonial,
  deleteTestimonial,
} from "@/lib/cmsData";

export async function GET() {
  try {
    const testimonials = await fetchAllTestimonials();
    return NextResponse.json(
      {
        success: true,
        testimonials,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("[ADMIN TESTIMONIALS GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, quote } = body;

    if (!author || !quote) {
      return NextResponse.json(
        { success: false, error: "Author and quote are required." },
        { status: 400 }
      );
    }

    const saved = await saveTestimonial(body);

    // Revalidate public pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/about", "page");
      revalidateTag("site-testimonials", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      testimonial: saved,
      message: "Testimonial saved successfully!",
    });
  } catch (err: any) {
    console.error("[ADMIN TESTIMONIALS POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = idParam ? parseInt(idParam, 10) : null;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Valid testimonial id is required" },
        { status: 400 }
      );
    }

    await deleteTestimonial(id);

    // Revalidate public pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/about", "page");
      revalidateTag("site-testimonials", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      message: `Testimonial #${id} deleted successfully!`,
    });
  } catch (err: any) {
    console.error("[ADMIN TESTIMONIALS DELETE ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
