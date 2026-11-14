import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { fetchAllFaqs, saveFaq, deleteFaq } from "@/lib/cmsData";

export async function GET() {
  try {
    const faqs = await fetchAllFaqs();
    return NextResponse.json(
      {
        success: true,
        faqs,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("[ADMIN FAQS GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const saved = await saveFaq(body);

    // Revalidate public pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/commercial-laundry", "page");
      revalidatePath("/wash-fold", "page");
      revalidatePath("/contact", "page");
      revalidateTag("site-faqs", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      faq: saved,
      message: "FAQ saved successfully!",
    });
  } catch (err: any) {
    console.error("[ADMIN FAQS POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save FAQ" },
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
        { success: false, error: "Valid FAQ id is required" },
        { status: 400 }
      );
    }

    await deleteFaq(id);

    // Revalidate public pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/commercial-laundry", "page");
      revalidatePath("/wash-fold", "page");
      revalidatePath("/contact", "page");
      revalidateTag("site-faqs", "max");
    } catch (e) {
      console.warn("[REVALIDATE ERROR]", e);
    }

    return NextResponse.json({
      success: true,
      message: `FAQ #${id} deleted successfully!`,
    });
  } catch (err: any) {
    console.error("[ADMIN FAQS DELETE ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
