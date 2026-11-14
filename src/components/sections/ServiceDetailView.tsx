import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";
import { ServiceItem } from "@/data/services";
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

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export async function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const images = await getSiteImages();
  const slotKey = SLUG_TO_SLOT[service.slug];
  const dynamicImg = slotKey ? images[slotKey] : undefined;
  const heroImage = dynamicImg?.image_url || service.heroImage;
  const heroAlt = dynamicImg?.alt_text || service.title;
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{service.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {service.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/pickup-request"
                className="px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Schedule Service / Quote
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Call (917) 365-4366
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Needs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <span>Tailored Industry Operations</span>
              </div>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Specialized Linen Care Designed for Your Sector
              </h2>

              {service.fullOverview.map((paragraph, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Industry Standards & Compliance:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.standards.map((std, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-navy-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[440px] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:right-6 bg-navy-900 text-white p-6 rounded-2xl shadow-xl border border-navy-800 max-w-sm">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  24/7 NYC Dispatch
                </span>
                <p className="text-xs text-slate-300">
                  Daily swaps, scheduled recurring routes, or emergency on-demand rush turnarounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Linens Handled Matrix */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Textile Solutions"
            title={`Comprehensive Linens Handled for ${service.title.replace(' Services', '').replace(' Laundry', '')}`}
            subtitle="Every fabric type receives customized stain treatment, proper wash temperatures, and protective finishing."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.linensHandled.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-navy-900">{item.category}</h3>
                    <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md">
                      Specialty Clean
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-3">{item.items}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Industry Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Proven Workflow"
            title="Our Streamlined Process"
            subtitle="Efficiency and reliability are critical. Mulan Laundries follows a structured, proven process to manage every load."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-sky-600 font-mono mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Choose Us"
            title="The Mulan Advantage for Your Organization"
            subtitle="Dedicated account management, flexible scheduling, and emergency rush coverage across all 5 boroughs."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h4 className="text-base font-bold text-navy-900">{benefit.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-16 bg-navy-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Partner with Mulan Laundries for {service.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Contact us today to establish a dependable laundry plan tailored to your facility’s exact volume and turnover schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pickup-request"
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Schedule Pickup / Quote
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Call (917) 365-4366
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
