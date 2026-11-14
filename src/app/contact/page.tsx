import React from "react";
import type { Metadata } from "next";
import { Phone, Clock, MapPin, Mail, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Mulan Laundries | NYC Commercial Quotes & Customer Inquiries",
  description:
    "Contact Mulan Laundries in New York City. Call (917) 365-4366 or message our Bronx headquarters 24/7 for commercial laundry quotes and pickup inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-2">
              Get in Touch • 24/7 NYC Assistance
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Contact Us
            </h1>
            <p className="mt-3 text-base text-slate-300">
              Have questions about our commercial accounts or residential pickup? Our New York team is available around the clock.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle space-y-6">
                <h2 className="text-xl font-bold text-navy-900 border-b border-slate-100 pb-4">
                  Headquarters & NYC Dispatch
                </h2>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Our Address:
                    </h3>
                    <span className="text-base font-semibold text-navy-900 block">
                      {BUSINESS_INFO.fullAddress}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Serving Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Call Us:
                    </h3>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="text-lg font-bold text-sky-600 hover:text-sky-700 transition-colors block"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      24*7 Assistance Available • Well Qualified Staff
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Working Hours:
                    </h3>
                    <span className="text-sm font-semibold text-navy-900 block">
                      Services Provided: Mon.–Sun. 24x7
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Operating 365 days a year without interruption.
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Email Address:
                    </h3>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-sm font-semibold text-navy-900 hover:text-sky-600 transition-colors block"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quality & Safety Note */}
              <div className="bg-sky-50/80 rounded-2xl p-6 border border-sky-100 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-sky-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Universal Precautions in Processing</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Adhering to OSHA and Joint Commission (JCAHO) sanitization standards across all facilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Form (7 cols) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
