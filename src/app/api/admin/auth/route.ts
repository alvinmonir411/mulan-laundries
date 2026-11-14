import { NextRequest, NextResponse } from "next/server";

const VALID_EMAIL = "admin@gmail.com";
const VALID_PASS = "13663";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    if (
      email.trim().toLowerCase() === VALID_EMAIL.toLowerCase() &&
      password.trim() === VALID_PASS
    ) {
      const response = NextResponse.json({
        success: true,
        user: {
          email: VALID_EMAIL,
          role: "Administrator",
          authenticatedAt: new Date().toISOString(),
        },
        message: "Authentication successful",
      });

      // Set auth cookie
      response.cookies.set("mulan_admin_auth", "true", {
        httpOnly: false, // accessible to client for smooth state
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Incorrect email or password. Access denied." },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Authentication server error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  response.cookies.delete("mulan_admin_auth");
  return response;
}
