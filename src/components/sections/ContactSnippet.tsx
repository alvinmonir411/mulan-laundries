import React from "react";
import dynamic from "next/dynamic";
import { Phone, Clock, MapPin, Mail, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ContactForm = dynamic(
  () => import("@/components/forms/ContactForm").then((mod) => mod.ContactForm),
  { ssr: true }
);

interface ContactSnippetProps {
  phone?: string;
  phoneRaw?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export const ContactSnippet: React.FC<ContactSnippetProps> = ({
  phone = BUSINESS_INFO.phone,
  phoneRaw = BUSINESS_INFO.phoneRaw,
  email = BUSINESS_INFO.email,
  address = BUSINESS_INFO.fullAddress,
  hours = "Services Provided: Mon.–Sun. 24x7",
}) => {
  return (
    <section id="contact-section" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Contact Mulan Laundries NYC"
          subtitle="Have questions about commercial pricing, linen contracts, or residential pickup? Reach out to our New York team 24/7."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle space-y-6">
              <h3 className="text-xl font-bold text-navy-900 border-b border-slate-100 pb-4">
                Headquarters & Dispatch
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Our Address
                  </span>
                  <span className="text-sm font-semibold text-navy-900 block">
                    {address}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Dispatching citywide across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.
                  </span>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Call Us (24/7 Assistance)
                  </span>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="text-base font-bold text-sky-600 hover:text-sky-700 transition-colors block"
                  >
                    {phone}
                  </a>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Immediate phone quotes & emergency rush orders.
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Working Schedule
                  </span>
                  <span className="text-sm font-semibold text-navy-900 block">
                    {hours}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    Operating 365 days a year without pause.
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Email Inquiries
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-semibold text-navy-900 hover:text-sky-600 transition-colors block"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quality Standard Card */}
            <div className="bg-sky-50/80 rounded-2xl p-6 border border-sky-100 flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-sky-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-navy-900">Guaranteed Hygiene Standards</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Universal precautions adhering to OSHA and Joint Commission (JCAHO) sanitization procedures.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
