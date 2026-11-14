import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy Policy | Mulan Laundries NYC",
  description: "Privacy Policy for Mulan Laundries. How we collect, protect, and handle client information for laundry pickup and delivery.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
              Client Protection
            </span>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">1. Information We Collect</h2>
              <p>
                When you request a commercial quote or schedule a pickup through Mulan Laundries, we collect your name, phone number, email address, physical pickup address, and specific service preferences (such as customer type and pickup day).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">2. How We Use Your Information</h2>
              <p>
                Your information is used strictly to coordinate door-to-door pickup and delivery logistics, provide instant order tracking updates via SMS or email, dispatch uniformed drivers to your location, and process invoices. We never sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">3. Data Security & Storage</h2>
              <p>
                We implement robust security practices to safeguard customer communications and contact information. All web traffic and form submissions are transmitted over secure HTTPS/TLS encryption.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">4. Contacting Our Team</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to update your contact preferences, please reach out to our team at {BUSINESS_INFO.email} or call {BUSINESS_INFO.phone}.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/contact"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5"
            >
              <span>Have a question for our team?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
