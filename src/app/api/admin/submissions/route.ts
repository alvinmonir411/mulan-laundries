import { NextRequest, NextResponse } from "next/server";
import { fetchAllSubmissions, updateSubmissionStatus, deleteSubmission } from "@/lib/submissions";

export async function GET() {
  try {
    const submissions = await fetchAllSubmissions();
    return NextResponse.json({
      success: true,
      submissions,
      count: submissions.length,
    });
  } catch (err: any) {
    console.error("[ADMIN SUBMISSIONS GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load submissions" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference_id, status, notes } = body;

    if (!reference_id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing reference_id or status" },
        { status: 400 }
      );
    }

    const success = await updateSubmissionStatus(reference_id, status, notes);

    return NextResponse.json({
      success,
      message: `Inquiry ${reference_id} status updated to ${status}`,
    });
  } catch (err: any) {
    console.error("[ADMIN SUBMISSIONS PATCH ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("reference_id");

    if (!ref) {
      return NextResponse.json(
        { success: false, error: "Missing reference_id query parameter" },
        { status: 400 }
      );
    }

    const success = await deleteSubmission(ref);

    return NextResponse.json({
      success,
      message: `Inquiry ${ref} deleted successfully`,
    });
  } catch (err: any) {
    console.error("[ADMIN SUBMISSIONS DELETE ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete submission" },
      { status: 500 }
    );
  }
}
