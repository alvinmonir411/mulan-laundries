import React from "react";
import type { Metadata } from "next";
import { PickupRequestForm } from "@/components/forms/PickupRequestForm";
import { Clock, ShieldCheck, Truck, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export const metadata: Metadata = {
  title: "Schedule Laundry Pickup | Mulan Laundries NYC",
  description:
    "Schedule your commercial or residential laundry pickup with Mulan Laundries. 24/7 door-to-door service across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.",
  alternates: {
    canonical: "/pickup-request",
  },
};

export default function PickupRequestPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-2">
              Fast NYC Service • Door-to-Door Pickup
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Schedule Your Laundry Pickup
            </h1>
            <p className="mt-3 text-base text-slate-300">
              Submit your request online in seconds. Our NYC dispatch team confirms pickup immediately and tracks your items end-to-end.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <PickupRequestForm />
            </div>

            {/* Sidebar Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dispatch Help Card */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle space-y-5">
                <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3">
                  Need Immediate Rush Service?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For last-minute hotel turnovers, hospital emergency surges, or same-day residential pickup within hours, please call our dispatch team directly:
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-navy-900 hover:bg-navy-850 text-white font-bold text-sm rounded-xl transition-all shadow-sm w-full justify-center"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>Call (917) 365-4366</span>
                </a>
              </div>

              {/* 3 Guarantees */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-2">
                  The Mulan Service Standard
                </h4>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-navy-900">All 5 NYC Boroughs</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Prompt pickup across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-navy-900">Operating 24/7, 365</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Early morning, late night, and weekend pickups accommodated seamlessly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-navy-900">Protected Packaging</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Delivered clean, folded, and sealed in clear protective poly-wrap or on hangers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
