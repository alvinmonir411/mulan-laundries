"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export const PickupRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    customerType: "Commercial",
    pickupDay: "Monday",
    promoCode: "",
    message: "",
    honeypot: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState<{ clientName?: string; customerType?: string; pickupDay?: string; promoCode?: string; discountPercent?: number }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.firstName.trim()) errs.firstName = "First name is required.";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    else if (formData.phone.trim().length < 7) errs.phone = "Please enter a valid phone number.";
    
    if (!formData.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) errs.message = "Pickup instructions or message is required.";
    else if (formData.message.trim().length < 3) errs.message = "Please provide at least a brief pickup note.";

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
      const res = await fetch("/api/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message);
        setReferenceId(data.referenceId || "");
        setSubmittedDetails(data.details || {});
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          customerType: "Commercial",
          pickupDay: "Monday",
          promoCode: "",
          message: "",
          honeypot: ""
        });
      } else {
        setStatus("error");
        if (data.errors) {
          setErrors(data.errors);
          setServerMessage("Please review the highlighted fields below.");
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
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-card">
      <div className="mb-8 pb-6 border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-1">
          Direct NYC Dispatch
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          Pickup Request
        </h2>
        <p className="text-sm text-slate-500 mt-1.5">
          Schedule your commercial or residential laundry pickup. Operating 24/7, 365 across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-emerald-950">
                Pickup Request Successfully Scheduled!
              </h3>
              <p className="text-sm text-emerald-800 mt-1">{serverMessage}</p>

              <div className="mt-4 p-4 bg-white/80 rounded-lg border border-emerald-200/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-emerald-900">{referenceId}</span>
                </div>
                {submittedDetails.clientName && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Client Name:</span>
                    <span className="font-semibold text-slate-800">{submittedDetails.clientName}</span>
                  </div>
                )}
                {submittedDetails.customerType && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Account Type:</span>
                    <span className="font-semibold text-slate-800">{submittedDetails.customerType}</span>
                  </div>
                )}
                {submittedDetails.pickupDay && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Requested Day:</span>
                    <span className="font-semibold text-sky-700">{submittedDetails.pickupDay}</span>
                  </div>
                )}
                {submittedDetails.promoCode && (
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-100">
                    <span className="text-slate-500">Applied Promo Code:</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                      {submittedDetails.promoCode} ({submittedDetails.discountPercent}% OFF)
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setStatus("idle")}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
              >
                <span>Submit another pickup request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700">
            <h4 className="font-bold text-red-900">Submission Error</h4>
            <p className="mt-0.5">{serverMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="pu_website_url">Leave empty</label>
          <input
            id="pu_website_url"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="first-name" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              First Name <span className="text-sky-600">*</span>
            </label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
              }`}
            />
            {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="last-name" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              Last Name <span className="text-sky-600">*</span>
            </label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
              }`}
            />
            {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="pickup-phone" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              Phone Number <span className="text-sky-600">*</span>
            </label>
            <input
              id="pickup-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Eg. (917) 365-4366"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
              }`}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="pickup-email" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              Email Address <span className="text-sky-600">*</span>
            </label>
            <input
              id="pickup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Eg. name@company.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
              }`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Customer Type & Pickup Day */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="customer-type" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              Customer Type
            </label>
            <select
              id="customer-type"
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-navy-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors focus:outline-none"
            >
              <option value="Commercial">Commercial Account (Business / Facility)</option>
              <option value="Residential">Residential Customer (Household / Wash & Fold)</option>
            </select>
          </div>

          <div>
            <label htmlFor="pickup-day" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
              Preferred Pickup Day
            </label>
            <select
              id="pickup-day"
              name="pickupDay"
              value={formData.pickupDay}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-navy-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors focus:outline-none"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </div>

        {/* Promo Code & Discount Pill */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
          <label htmlFor="pickup-promo" className="block text-xs font-bold uppercase tracking-wider text-navy-800">
            Promo / Voucher Code (Optional)
          </label>
          <div className="flex gap-2">
            <input
              id="pickup-promo"
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleChange}
              placeholder="Enter promo code if you have one"
              aria-invalid={!!errors.promoCode}
              className={`w-full px-4 py-2 text-sm uppercase font-mono font-semibold tracking-wider rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                errors.promoCode
                  ? "border-red-400 bg-red-50/40 text-red-900 focus:border-red-500 focus:ring-red-100"
                  : formData.promoCode.trim().toUpperCase() === "WELCOME20"
                  ? "border-emerald-500 bg-emerald-50/30 text-emerald-900 focus:border-emerald-600 focus:ring-emerald-100"
                  : "border-slate-300 bg-white text-navy-900 focus:border-[#005BD3] focus:ring-blue-100"
              }`}
            />
            {formData.promoCode.trim().toUpperCase() === "WELCOME20" && (
              <span className="shrink-0 flex items-center px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
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
              <span>✓</span> Promo code verified: 20% discount will be applied to your pickup invoice!
            </p>
          )}
        </div>

        {/* Message / Special Instructions */}
        <div>
          <label htmlFor="pickup-message" className="block text-xs font-bold uppercase tracking-wider text-navy-800 mb-1.5">
            Pickup Address & Special Instructions <span className="text-sky-600">*</span>
          </label>
          <textarea
            id="pickup-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please provide your pickup address, suite/room details, estimated volume, or special linen handling notes..."
            aria-invalid={!!errors.message}
            className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-300 focus:ring-red-200 bg-red-50/20"
                : "border-slate-300 focus:border-sky-500 focus:ring-sky-100"
            }`}
          />
          {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 px-8 text-sm font-bold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-500 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>PROCESSING PICKUP REQUEST...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>CONFIRM & SCHEDULE PICKUP</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center pt-2">
          By submitting this request, your pickup window is reserved directly with our NYC dispatch team. Questions? Call <a href="tel:+19173654366" className="text-sky-600 font-semibold underline">(917) 365-4366</a>.
        </p>
      </form>
    </div>
  );
};
