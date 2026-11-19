import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";
import { sendPickupEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, email, customerType, pickupDay, message, promoCode, honeypot } = body;

    // Honeypot spam defense
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Spam submission rejected." },
        { status: 400 }
      );
    }

    const errors: Record<string, string> = {};

    if (!firstName || typeof firstName !== "string" || firstName.trim().length < 1) {
      errors.firstName = "First name is required.";
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length < 1) {
      errors.lastName = "Last name is required.";
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      errors.phone = "Valid phone number is required (at least 7 digits).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Valid email is required.";
    }

    const validCustomerTypes = ["Residential", "Commercial"];
    if (!customerType || !validCustomerTypes.includes(customerType)) {
      errors.customerType = "Please select either Residential or Commercial.";
    }

    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (!pickupDay || !validDays.includes(pickupDay)) {
      errors.pickupDay = "Please select a valid pickup day.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      errors.message = "Please write a message or pickup instructions (at least 3 characters).";
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
    const referenceId = `ML-PU-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const discountPercent = cleanPromo === "WELCOME20" ? 20 : 0;

    // Store submission in Neon Database & Local Backup
    await createSubmission({
      reference_id: referenceId,
      type: "pickup",
      name: fullName,
      email: email.trim(),
      phone: phone.trim(),
      customer_type: customerType,
      pickup_day: pickupDay,
      subject: `Pickup Request (${customerType} - ${pickupDay})${cleanPromo ? ` [Promo: ${cleanPromo} - ${discountPercent}% OFF]` : ""}`,
      message: message.trim(),
      promo_code: cleanPromo,
      discount_percent: discountPercent,
      status: "New",
    });

    // Send email notifications via Resend (Client & Customer)
    const emailResult = await sendPickupEmails({
      referenceId,
      name: fullName,
      email: email.trim(),
      phone: phone.trim(),
      customerType,
      pickupDay,
      message: message.trim(),
      promoCode: cleanPromo,
      discountPercent,
    });

    // Log the verified pickup request
    console.log(`[PICKUP REQUEST RECEIVED & STORED IN NEON DB] Ref: ${referenceId}`, {
      client: fullName,
      phone: phone.trim(),
      email: email.trim(),
      customerType,
      pickupDay,
      emailResult,
      messageLength: message.trim().length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your pickup request was received successfully! A representative from Mulan Laundries will confirm your pickup schedule shortly.",
        referenceId,
        details: {
          clientName: `${firstName.trim()} ${lastName.trim()}`,
          customerType,
          pickupDay,
          promoCode: cleanPromo,
          discountPercent
        },
        receivedAt: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[PICKUP API ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try refreshing and submitting again or call (917) 365-4366." },
      { status: 500 }
    );
  }
}
