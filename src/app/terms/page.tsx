import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export const metadata: Metadata = {
  title: "Terms and Conditions | Mulan Laundries NYC",
  description: "Terms and Conditions for commercial and residential laundry services with Mulan Laundries in New York City.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
              Service Agreement
            </span>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">1. Service Overview</h2>
              <p>
                Mulan Laundries provides commercial laundry, linen management, and residential wash and fold pickup and delivery services across New York City (Manhattan, Brooklyn, Queens, The Bronx, and Staten Island). By scheduling a pickup or retaining our services, you agree to these Terms and Conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">2. Sorting, Wash & Garment Care</h2>
              <p>
                All residential wash and fold clothes are separated into white and colored loads and washed separately. We use high-quality commercial detergents, eco-friendly ECOS detergents, allergy-free hypoallergenic solutions, and non-chlorine bleach upon request. While we take utmost care under universal precautions, customers are responsible for checking pockets for foreign objects, pens, or valuables prior to pickup.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">3. Specialty & Oversized Items</h2>
              <p>
                As disclosed across our service guidelines, large or time-consuming items—such as heavy blankets, comforters, duvets, pillows, and rugs/mats—require dedicated individual wash and dry cycles and are subject to additional charges beyond standard per-pound wash and fold rates.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">4. Commercial Accounts & Linen Management</h2>
              <p>
                Commercial accounts operate under universal precautions adhering to OSHA and Joint Commission (JCAHO) regulated sanitation standards. Par inventory levels, recurring pickup schedules, and custom invoicing are managed through dedicated commercial agreements coordinated by your assigned account specialist.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">5. Pickup & Delivery Protocol</h2>
              <p>
                Mulan Laundries provides door-to-door pickup and delivery. Our team makes every reasonable effort to honor scheduled delivery windows. For emergency rush cycles, delivery within hours is available upon direct coordination with our dispatch team at (917) 365-4366.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-navy-900">6. Contact Information</h2>
              <p>
                For questions regarding these Terms, please contact Mulan Laundries at {BUSINESS_INFO.email} or call {BUSINESS_INFO.phone}.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/pickup-request"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5"
            >
              <span>Ready to schedule a pickup?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
