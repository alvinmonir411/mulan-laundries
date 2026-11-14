import { NextRequest, NextResponse } from "next/server";
import { fetchAllSubmissions } from "@/lib/submissions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (!ref || ref.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please provide a valid tracking reference ID." },
        { status: 400 }
      );
    }

    const cleanRef = ref.trim().toUpperCase();
    const submissions = await fetchAllSubmissions();
    const match = submissions.find(
      (s) => s.reference_id.toUpperCase() === cleanRef
    );

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: `No record found for tracking ID "${cleanRef}". Please verify the reference number or contact dispatch at (917) 365-4366.`,
        },
        { status: 404 }
      );
    }

    // Return sanitized tracking information
    return NextResponse.json(
      {
        success: true,
        record: {
          reference_id: match.reference_id,
          type: match.type,
          name: match.name,
          customer_type: match.customer_type,
          pickup_day: match.pickup_day,
          status: match.status,
          promo_code: match.promo_code,
          discount_percent: match.discount_percent || 0,
          created_at: match.created_at,
          notes: match.notes,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[TRACK API ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Server error checking tracking ID." },
      { status: 500 }
    );
  }
}
