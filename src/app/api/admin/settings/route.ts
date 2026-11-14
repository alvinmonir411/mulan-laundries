import { NextRequest, NextResponse } from "next/server";
import { fetchAllSettings, saveSiteSettingsBatch } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await fetchAllSettings();
    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load site settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const settingsPayload = body.settings && typeof body.settings === "object" ? body.settings : body;

    if (!settingsPayload || typeof settingsPayload !== "object" || Object.keys(settingsPayload).length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid settings payload" },
        { status: 400 }
      );
    }

    const updated = await saveSiteSettingsBatch(settingsPayload);

    return NextResponse.json({
      success: true,
      settings: updated,
      message: "Site settings updated and cache purged live!",
    });
  } catch (err: any) {
    console.error("[SETTINGS API POST ERROR]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
