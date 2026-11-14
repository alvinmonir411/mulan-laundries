"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    promoCode: "",
    message: "",
    honeypot: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState<{ clientName?: string; phone?: string; email?: string; promoCode?: string; discountPercent?: number }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    else if (formData.phone.trim().length < 7) errs.phone = "Please enter a valid phone number.";
    
    if (!formData.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) errs.message = "Message is required.";
    else if (formData.message.trim().length < 5) errs.message = "Message must be at least 5 characters.";

    if (formData.promoCode.trim()) {
      const promoUpper = formData.promoCode.trim().toUpperCase();
      if (promoUpper !== "WELCOME20") {
        errs.promoCode = "ভুল প্রোমো কোড! এই ধরণের কোনো প্রোমো কোড আমাদের নেই। (Invalid promo code)";
      }
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message);
        setReferenceId(data.referenceId || "");
        setSubmittedDetails(data.details || {
          clientName: formData.name,
          phone: formData.phone,
          email: formData.email,
          promoCode: formData.promoCode,
          discountPercent: formData.promoCode.trim().toUpperCase() === "WELCOME20" ? 20 : 0
        });
        setFormData({ name: "", phone: "", email: "", promoCode: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        if (data.errors) {
          setErrors(data.errors);
          setServerMessage("Please correct the highlighted errors.");
        } else {
          setServerMessage(data.error || "Something went wrong, try refreshing and submitting the form again.");
        }
      }
    } catch (err) {
      setStatus("error");
      setServerMessage("Network error. Please try refreshing or call (917) 365-4366 directly.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
      {/* When Submitted Successfully: Form is HIDDEN, and Success Card is shown */}
      {status === "success" ? (
        <div className="p-6 sm:p-8 bg-emerald-50/90 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-950">
                Message Successfully Sent!
              </h3>
              <p className="text-sm text-emerald-800 mt-1.5 leading-relaxed">
                {serverMessage || "Your message was received successfully! A representative from Mulan Laundries will contact you shortly."}
              </p>

              {/* Receipt Summary Card matching Pickup design */}
              <div className="mt-5 p-4 sm:p-5 bg-white rounded-xl border border-emerald-200/80 text-xs sm:text-sm space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Tracking Reference:</span>
                  <span className="font-mono font-bold text-white bg-[#005BD3] px-2.5 py-1 rounded text-xs tracking-wider">
                    {referenceId}
                  </span>
                </div>

                {submittedDetails.clientName && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Client Name:</span>
                    <span className="font-semibold text-slate-800">{submittedDetails.clientName}</span>
                  </div>
                )}

                {submittedDetails.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Contact Phone:</span>
                    <span className="font-semibold text-slate-800">{submittedDetails.phone}</span>
                  </div>
                )}

                {submittedDetails.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Email Address:</span>
                    <span className="font-semibold text-slate-800">{submittedDetails.email}</span>
                  </div>
                )}

                {submittedDetails.promoCode && (
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-100">
                    <span className="text-slate-500 font-medium">Applied Promo Code:</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                      {submittedDetails.promoCode} ({submittedDetails.discountPercent}% OFF)
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500 font-medium">Response SLA:</span>
                  <span className="font-semibold text-emerald-700">Within 1-2 Hours (24/7 NYC Team)</span>
                </div>
              </div>

              {/* Action Button to Reset Form */}
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 underline transition-colors"
              >
                <span>Submit another message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy-900">Have Any Questions?</h3>
            <p className="text-sm text-slate-500 mt-1">
              Send our New York team a message and we will respond promptly.
            </p>
          </div>

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-700">
                <h4 className="font-bold text-red-900">Submission Error</h4>
                <p className="mt-0.5">{serverMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Anti-spam honeypot (hidden from humans) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url">Leave empty</label>
              <input
                id="website_url"
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Name <span className="text-sky-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                      : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                  Phone <span className="text-sky-600">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(917) 000-0000"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                      : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                Email Address <span className="text-sky-600">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                    : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Promo Code Input */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <label htmlFor="contact-promo" className="block text-xs font-bold uppercase tracking-wider text-navy-800">
                Promo Code (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  id="contact-promo"
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleChange}
                  placeholder="Enter promo code if you have one"
                  aria-invalid={!!errors.promoCode}
                  className={`w-full px-3.5 py-2 text-sm uppercase font-mono font-semibold tracking-wider rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.promoCode
                      ? "border-red-400 bg-red-50/40 text-red-900 focus:border-red-500 focus:ring-red-100"
                      : formData.promoCode.trim().toUpperCase() === "WELCOME20"
                      ? "border-emerald-500 bg-emerald-50/30 text-emerald-900 focus:border-emerald-600 focus:ring-emerald-100"
                      : "border-slate-300 bg-white text-navy-900 focus:border-[#005BD3] focus:ring-blue-100"
                  }`}
                />
                {formData.promoCode.trim().toUpperCase() === "WELCOME20" && (
                  <span className="shrink-0 flex items-center px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
                    ✓ 20% Applied
                  </span>
                )}
              </div>
              {errors.promoCode && (
                <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1">
                  <span>⚠</span> {errors.promoCode}
                </p>
              )}
              {formData.promoCode.trim().toUpperCase() === "WELCOME20" && (
                <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                  <span>✓</span> Promo code verified: 20% discount will be applied to your invoice!
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
                Message <span className="text-sky-600">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your laundry or linen management requirements..."
                aria-invalid={!!errors.message}
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                    : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
                }`}
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SENDING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};
