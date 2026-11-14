import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, TrendingUp, Users, ArrowRight, Sparkles, Building2, CheckCircle2, Phone } from "lucide-react";
import { COMMERCIAL_HUB_DATA, COMMERCIAL_SERVICES } from "@/data/services";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteImages } from "@/lib/images";

const SLUG_TO_SLOT: Record<string, string> = {
  "hospital-laundry": "service_hospital",
  "short-term-rentals": "service_rentals",
  "health-clubs": "service_health_clubs",
  "schools-dorms": "service_schools_dorms",
  "shelter-homes": "service_shelter_homes",
  "salons-spas": "service_salons_spas",
  "gyms": "service_gyms",
  "hotel-laundry": "service_rotary_pressing",
  "bed-and-breakfast": "service_special_care",
};

export const metadata: Metadata = {
  title: "Commercial Laundry Services NYC | 1,000,000+ Lbs/Yr Capacity",
  description:
    "Mulan Laundries provides high-volume commercial laundry services across New York City. Operating under universal precautions adhering to OSHA and Joint Commission standards.",
  alternates: {
    canonical: "/commercial-laundry",
  },
};

export default async function CommercialLaundryPage() {
  const images = await getSiteImages();
  const commercialHero = images.service_commercial?.image_url || "/images/commercial-laundry.jpg";
  const commercialAlt = images.service_commercial?.alt_text || "Mulan Commercial Laundry Machinery";

  return (
    <>
      {/* Subpage Header Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={commercialHero}
            alt={commercialAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial & Institutional Linen Operations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {COMMERCIAL_HUB_DATA.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {COMMERCIAL_HUB_DATA.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-900 border-b border-navy-850 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {COMMERCIAL_HUB_DATA.stats.map((stat) => (
              <div key={stat.label} className="p-3">
                <span className="text-2xl sm:text-3xl font-black text-sky-400 block">{stat.value}</span>
                <span className="text-xs text-slate-300 uppercase tracking-wider mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Core Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <span>Universal Precautions & Compliance</span>
              </div>

              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Operating Under Universal Precautions Adhering to OSHA & Joint Commission Standards
              </h2>

              {COMMERCIAL_HUB_DATA.narrative.map((para, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}

              <div className="p-5 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Dedicated Commercial Account Specialist</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Each commercial account is handled by our experienced account specialist to monitor par levels, coordinate pickup cadences, and ensure continuous linen supply.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
                <Image
                  src={commercialHero}
                  alt={commercialAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-200/90 max-w-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
                  Industries We Specialize In:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Hotels • Restaurants • Gyms • Motels • Spas • Salons • Short-Term Rentals • Healthcare Facilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 9 Dedicated Commercial Verticals */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Dedicated Programs"
            title="Commercial Service Divisions"
            subtitle="Click on any commercial vertical below to explore industry-specific linen solutions, pickup schedules, and fabric handling."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMMERCIAL_SERVICES.map((s) => {
              const slot = SLUG_TO_SLOT[s.slug];
              const cardImg = (slot && images[slot]?.image_url) || s.heroImage;
              const cardAlt = (slot && images[slot]?.alt_text) || s.title;

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-100">
                    <Image
                      src={cardImg}
                      alt={cardAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-sky-600/90 px-2 py-0.5 rounded">
                        {s.badge}
                      </span>
                    </div>
                  </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {s.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Quote Callout */}
      <section className="py-16 bg-navy-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Request a Commercial Consultation & Quote
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Contact Mulan Laundries to establish a customized commercial laundry program with dedicated account management and 24/7 NYC dispatch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Request Commercial Quote
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Call (917) 365-4366
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
