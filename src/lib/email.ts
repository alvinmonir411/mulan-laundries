import { Resend } from "resend";

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

export const DEFAULT_CLIENT_EMAIL = process.env.CLIENT_NOTIFICATION_EMAIL || "mulanlaundries@gmail.com";
export const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Mulan Laundries <onboarding@resend.dev>";

interface ContactEmailParams {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  customerType?: string;
  subject?: string;
  message: string;
  promoCode?: string;
  discountPercent?: number;
}

interface PickupEmailParams {
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  customerType: string;
  pickupDay: string;
  message: string;
  promoCode?: string;
  discountPercent?: number;
}

/**
 * Sends both Client Notification and Customer Confirmation for Contact Form submissions.
 */
export async function sendContactEmails(params: ContactEmailParams) {
  const { referenceId, name, email, phone, customerType, subject, message, promoCode, discountPercent } = params;

  const results = {
    clientSent: false,
    customerSent: false,
    clientError: null as string | null,
    customerError: null as string | null,
  };

  const resend = getResendClient();
  if (!resend) {
    console.warn("[RESEND NOTICE]: RESEND_API_KEY environment variable is not set. Skipping email dispatch.");
    return results;
  }

  // 1. Email to Client / Admin
  try {
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; padding: 28px 32px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
    .badge { display: inline-block; padding: 4px 10px; background: #0284c7; color: #fff; font-size: 11px; font-weight: 700; border-radius: 999px; margin-top: 8px; }
    .content { padding: 32px; }
    .ref-box { background: #f1f5f9; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 24px; }
    .ref-box strong { color: #0f172a; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px; }
    .msg-box { background: #fafafa; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 6px; }
    .promo-box { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 10px 14px; border-radius: 8px; color: #065f46; font-size: 13px; font-weight: 600; margin-top: 12px; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; }
    .btn { display: inline-block; padding: 10px 18px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; margin-right: 8px; }
    .btn-call { background: #0284c7; color: #ffffff; }
    .btn-reply { background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; }
    .footer { background: #f8fafc; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Website Inquiry Received</h1>
      <p>Mulan Laundries — Lead Notification</p>
      <span class="badge">Reference: ${referenceId}</span>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Customer Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Customer Type</div>
        <div class="field-value">${customerType || "General Inquiry"}</div>
      </div>
      ${subject ? `
      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${subject}</div>
      </div>` : ""}
      <div class="field">
        <div class="field-label">Message / Requirements</div>
        <div class="msg-box">${message.replace(/\n/g, "<br/>")}</div>
      </div>
      ${promoCode ? `
      <div class="promo-box">
        Promo Code Applied: <strong>${promoCode}</strong> (${discountPercent}% OFF)
      </div>` : ""}

      <div class="actions">
        <a class="btn btn-call" href="tel:${phone}">Call Client (${phone})</a>
        <a class="btn btn-reply" href="mailto:${email}?subject=Re:%20Mulan%20Laundries%20Inquiry%20[${referenceId}]">Reply to Email</a>
      </div>
    </div>
    <div class="footer">
      Mulan Laundries NYC • Automated Website Notification
    </div>
  </div>
</body>
</html>`;

    const clientRes = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: DEFAULT_CLIENT_EMAIL,
      replyTo: email,
      subject: `[New Inquiry] ${name} - ${referenceId}`,
      html: clientHtml,
    });

    if (clientRes.error) {
      console.error("[RESEND CLIENT EMAIL ERROR]:", clientRes.error);
      results.clientError = clientRes.error.message;
    } else {
      results.clientSent = true;
      console.log(`[RESEND CLIENT EMAIL SENT]: Ref ${referenceId}`, clientRes.data?.id);
    }
  } catch (err: any) {
    console.error("[RESEND CLIENT EXCEPTION]:", err?.message || err);
    results.clientError = err?.message || "Unknown error";
  }

  // 2. Confirmation Email to Customer
  try {
    const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; padding: 32px; color: #ffffff; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
    .header p { margin: 8px 0 0 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 32px; }
    .ref-badge { display: inline-block; background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    p { font-size: 15px; line-height: 1.6; color: #334155; }
    .highlight-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .highlight-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 12px; }
    .highlight-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
    .highlight-label { color: #64748b; }
    .highlight-val { font-weight: 600; color: #0f172a; }
    .contact-box { text-align: center; padding: 20px; background: #eff6ff; border-radius: 12px; margin-top: 24px; }
    .contact-box h3 { margin: 0 0 6px 0; font-size: 16px; color: #1e40af; }
    .contact-box p { margin: 0; font-size: 13px; color: #3b82f6; }
    .footer { background: #f8fafc; padding: 20px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Thank You for Contacting Mulan Laundries</h1>
      <p>NYC's Trusted Commercial & Residential Laundry Specialist</p>
    </div>
    <div class="content">
      <div class="ref-badge">Reference ID: ${referenceId}</div>
      <p>Hello <strong>${name}</strong>,</p>
      <p>We have successfully received your inquiry. A member of our NYC laundry specialist team will review your message and reach out to you shortly via phone or email.</p>
      
      <div class="highlight-card">
        <div class="highlight-title">Inquiry Summary</div>
        <div class="highlight-row">
          <span class="highlight-label">Name:</span>
          <span class="highlight-val">${name}</span>
        </div>
        <div class="highlight-row">
          <span class="highlight-label">Phone:</span>
          <span class="highlight-val">${phone}</span>
        </div>
        <div class="highlight-row">
          <span class="highlight-label">Customer Type:</span>
          <span class="highlight-val">${customerType || "General Inquiry"}</span>
        </div>
        ${promoCode ? `
        <div class="highlight-row">
          <span class="highlight-label">Promo Discount:</span>
          <span class="highlight-val" style="color: #16a34a;">${promoCode} (${discountPercent}% OFF)</span>
        </div>` : ""}
      </div>

      <div class="contact-box">
        <h3>Need Immediate Assistance?</h3>
        <p>Call our direct line 24/7 at <strong>(917) 365-4366</strong></p>
      </div>
    </div>
    <div class="footer">
      Mulan Laundries • 179 E 105th St, New York, NY 10029 • Operating 24/7/365
    </div>
  </div>
</body>
</html>`;

    const customerRes = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: email,
      subject: `We Received Your Message — Mulan Laundries [${referenceId}]`,
      html: customerHtml,
    });

    if (customerRes.error) {
      console.warn("[RESEND CUSTOMER EMAIL NOTICE]:", customerRes.error.message);
      results.customerError = customerRes.error.message;
    } else {
      results.customerSent = true;
      console.log(`[RESEND CUSTOMER EMAIL SENT]: Ref ${referenceId}`, customerRes.data?.id);
    }
  } catch (err: any) {
    console.warn("[RESEND CUSTOMER EXCEPTION]:", err?.message || err);
    results.customerError = err?.message || "Customer email failed";
  }

  return results;
}

/**
 * Sends both Client Notification and Customer Confirmation for Laundry Pickup Requests.
 */
export async function sendPickupEmails(params: PickupEmailParams) {
  const { referenceId, name, email, phone, customerType, pickupDay, message, promoCode, discountPercent } = params;

  const results = {
    clientSent: false,
    customerSent: false,
    clientError: null as string | null,
    customerError: null as string | null,
  };

  const resend = getResendClient();
  if (!resend) {
    console.warn("[RESEND NOTICE]: RESEND_API_KEY environment variable is not set. Skipping email dispatch.");
    return results;
  }

  // 1. Email to Client / Admin
  try {
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; padding: 28px 32px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: 600; }
    .badge { display: inline-block; padding: 4px 10px; background: #0284c7; color: #fff; font-size: 11px; font-weight: 700; border-radius: 999px; margin-top: 8px; }
    .content { padding: 32px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px; }
    .highlight-badge { display: inline-block; padding: 6px 12px; background: #e0f2fe; color: #0369a1; font-weight: 700; border-radius: 6px; font-size: 14px; }
    .msg-box { background: #fafafa; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 6px; }
    .promo-box { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 10px 14px; border-radius: 8px; color: #065f46; font-size: 13px; font-weight: 600; margin-top: 12px; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; }
    .btn { display: inline-block; padding: 10px 18px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; margin-right: 8px; }
    .btn-call { background: #0284c7; color: #ffffff; }
    .btn-reply { background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; }
    .footer { background: #f8fafc; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Laundry Pickup Scheduled</h1>
      <p>Urgent Action Required — Dispatch Confirmation</p>
      <span class="badge">Reference: ${referenceId}</span>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Scheduled Pickup Day</div>
        <div class="field-value"><span class="highlight-badge">${pickupDay}</span></div>
      </div>
      <div class="field">
        <div class="field-label">Customer Service Type</div>
        <div class="field-value">${customerType} Laundry</div>
      </div>
      <div class="field">
        <div class="field-label">Customer Name</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Pickup Address / Special Instructions</div>
        <div class="msg-box">${message.replace(/\n/g, "<br/>")}</div>
      </div>
      ${promoCode ? `
      <div class="promo-box">
        Promo Code Applied: <strong>${promoCode}</strong> (${discountPercent}% OFF)
      </div>` : ""}

      <div class="actions">
        <a class="btn btn-call" href="tel:${phone}">Call Client Immediately (${phone})</a>
        <a class="btn btn-reply" href="mailto:${email}?subject=Pickup%20Confirmation%20—%20Mulan%20Laundries%20[${referenceId}]">Send Email Confirmation</a>
      </div>
    </div>
    <div class="footer">
      Mulan Laundries NYC Dispatch • Operating 24 Hours a Day / 7 Days a Week
    </div>
  </div>
</body>
</html>`;

    const clientRes = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: DEFAULT_CLIENT_EMAIL,
      replyTo: email,
      subject: `[New Pickup Request] ${pickupDay} - ${name} (${customerType})`,
      html: clientHtml,
    });

    if (clientRes.error) {
      console.error("[RESEND CLIENT PICKUP EMAIL ERROR]:", clientRes.error);
      results.clientError = clientRes.error.message;
    } else {
      results.clientSent = true;
      console.log(`[RESEND CLIENT PICKUP EMAIL SENT]: Ref ${referenceId}`, clientRes.data?.id);
    }
  } catch (err: any) {
    console.error("[RESEND CLIENT PICKUP EXCEPTION]:", err?.message || err);
    results.clientError = err?.message || "Unknown error";
  }

  // 2. Confirmation Email to Customer
  try {
    const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0A192F; padding: 32px; color: #ffffff; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
    .header p { margin: 8px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: 600; }
    .content { padding: 32px; }
    .ref-badge { display: inline-block; background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    p { font-size: 15px; line-height: 1.6; color: #334155; }
    .highlight-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .highlight-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 12px; }
    .highlight-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
    .highlight-label { color: #64748b; }
    .highlight-val { font-weight: 600; color: #0f172a; }
    .contact-box { text-align: center; padding: 20px; background: #eff6ff; border-radius: 12px; margin-top: 24px; }
    .contact-box h3 { margin: 0 0 6px 0; font-size: 16px; color: #1e40af; }
    .contact-box p { margin: 0; font-size: 13px; color: #3b82f6; }
    .footer { background: #f8fafc; padding: 20px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Your Pickup Request is Confirmed!</h1>
      <p>Mulan Laundries — NYC Pickup & Delivery</p>
    </div>
    <div class="content">
      <div class="ref-badge">Tracking Ref: ${referenceId}</div>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for booking with Mulan Laundries! We have received your pickup schedule request. Our dispatch team is preparing your route and will contact you directly before our driver arrives.</p>
      
      <div class="highlight-card">
        <div class="highlight-title">Pickup Booking Details</div>
        <div class="highlight-row">
          <span class="highlight-label">Scheduled Day:</span>
          <span class="highlight-val" style="color: #0284c7;">${pickupDay}</span>
        </div>
        <div class="highlight-row">
          <span class="highlight-label">Service Category:</span>
          <span class="highlight-val">${customerType}</span>
        </div>
        <div class="highlight-row">
          <span class="highlight-label">Contact Phone:</span>
          <span class="highlight-val">${phone}</span>
        </div>
        ${promoCode ? `
        <div class="highlight-row">
          <span class="highlight-label">Promo Applied:</span>
          <span class="highlight-val" style="color: #16a34a;">${promoCode} (${discountPercent}% OFF)</span>
        </div>` : ""}
      </div>

      <div class="contact-box">
        <h3>Questions or Rescheduling?</h3>
        <p>Call our dispatch desk 24/7 at <strong>(917) 365-4366</strong></p>
      </div>
    </div>
    <div class="footer">
      Mulan Laundries • 179 E 105th St, New York, NY 10029 • Operating 24/7/365
    </div>
  </div>
</body>
</html>`;

    const customerRes = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: email,
      subject: `Pickup Request Confirmation — Mulan Laundries [${referenceId}]`,
      html: customerHtml,
    });

    if (customerRes.error) {
      console.warn("[RESEND CUSTOMER PICKUP NOTICE]:", customerRes.error.message);
      results.customerError = customerRes.error.message;
    } else {
      results.customerSent = true;
      console.log(`[RESEND CUSTOMER PICKUP SENT]: Ref ${referenceId}`, customerRes.data?.id);
    }
  } catch (err: any) {
    console.warn("[RESEND CUSTOMER PICKUP EXCEPTION]:", err?.message || err);
    results.customerError = err?.message || "Customer pickup email failed";
  }

  return results;
}
