import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, subject, customerType, promoCode, honeypot } = body;

    // Honeypot spam defense: if bot filled this hidden field, reject immediately
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Spam submission rejected." },
        { status: 400 }
      );
    }

    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      errors.phone = "Please enter a valid phone number (at least 7 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      errors.message = "Please write a message of at least 5 characters.";
    }

    const cleanPromo = (promoCode && typeof promoCode === "string") ? promoCode.trim().toUpperCase() : undefined;
    if (cleanPromo && cleanPromo !== "WELCOME20") {
      errors.promoCode = "ভুল প্রোমো কোড! এই ধরণের কোনো প্রোমো কোড আমাদের নেই। (Invalid promo code)";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 422 }
      );
    }

    // Generate real reference ID for client verification
    const referenceId = `ML-CT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const discountPercent = cleanPromo === "WELCOME20" ? 20 : 0;

    // Store submission in Neon Database & Local Backup
    await createSubmission({
      reference_id: referenceId,
      type: "contact",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      customer_type: customerType || "General Inquiry",
      subject: subject || (cleanPromo ? `Website Contact [Promo: ${cleanPromo} - ${discountPercent}% OFF]` : "Website Contact Form Inquiry"),
      message: message.trim(),
      promo_code: cleanPromo,
      discount_percent: discountPercent,
      status: "New",
    });

    // Log the verified contact inquiry
    console.log(`[CONTACT INQUIRY RECEIVED & STORED IN NEON DB] Ref: ${referenceId}`, {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      messageLength: message.trim().length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message was sent successfully! Our NYC team will contact you shortly.",
        referenceId,
        details: {
          clientName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          promoCode: cleanPromo,
          discountPercent
        },
        receivedAt: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try refreshing and submitting the form again or call (917) 365-4366." },
      { status: 500 }
    );
  }
}
