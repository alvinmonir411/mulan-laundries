import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  CalendarCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Layers, 
  PackageCheck,
  RefreshCw
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "How It Works | Seamless Laundry Pickup & Delivery NYC | Mulan Laundries",
  description:
    "Learn how Mulan Laundries operates: 4 easy steps from scheduling online or calling, to convenient NYC doorstep pickup, universal precautions washing, and crisp delivery.",
  alternates: {
    canonical: "/how-it-works",
  },
};

const STEPS = [
  {
    step: "01",
    title: "Schedule Your Pickup",
    subtitle: "Book Online or Call Direct",
    description:
      "Schedule through our simple online pickup form or call our NYC dispatch center at (917) 365-4366. Choose your preferred day, time window, and any special fabric care preferences.",
    image: "/images/free-pickup.jpg",
    alt: "Scheduling online laundry pickup in New York City with Mulan Laundries",
    icon: CalendarCheck,
    highlights: ["24/7 online scheduling", "Immediate route confirmation", "Custom washing & folding instructions"],
  },
  {
    step: "02",
    title: "Driver Pickup at Doorstep",
    subtitle: "NYC Route Dispatch",
    description:
      "Our uniformed Mulan route driver arrives during your chosen pickup window. We provide clean, labeled collection bags and safe contactless handling for residential doors, doormen, and commercial loading docks.",
    image: "/images/residential-services.jpg",
    alt: "Mulan Laundries NYC driver collecting bagged laundry for delivery and washing",
    icon: Truck,
    highlights: ["GPS-tracked NYC fleet", "Doorman, lobby, or commercial dock pickup", "Secure bag tagging & weight receipt"],
  },
  {
    step: "03",
    title: "Universal Precautions Cleaning",
    subtitle: "Expert Wash & Fold / Rotary Press",
    description:
      "Your items are sorted by color and fabric type. We clean using high-efficiency commercial equipment, premium detergents, and temperature-controlled drying. Every batch is cleaned separately — never mixed with other orders.",
    image: "/images/commercial-facility.jpg",
    alt: "Commercial washing machines and clinical hygiene laundry cleaning facility",
    icon: Sparkles,
    highlights: ["Never co-mingled with other laundry", "Hypoallergenic & commercial detergent choices", "Precision rotary pressing for bed linens"],
  },
  {
    step: "04",
    title: "Crisp Packaging & Fast Delivery",
    subtitle: "Delivered Fresh & Ready",
    description:
      "Clothes are crisply folded, paired, bundled in protective clear packaging (or placed on hangers), and returned right to your doorstep or facility linen room on schedule.",
    image: "/images/washfold.jpg",
    alt: "Neatly bundled and folded clean laundry ready for doorstep delivery",
    icon: PackageCheck,
    highlights: ["Neat shrink or plastic protective bundle wrap", "Hangers available upon request", "Prompt on-time delivery across all 5 NYC boroughs"],
  },
];

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();
  const phone = settings.phone || BUSINESS_INFO.phone;
  const phoneRaw = settings.phone_raw || BUSINESS_INFO.phoneRaw;

  return (
    <>
      {/* Hero Banner with Authentic Facility Background */}
      <section className="bg-navy-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/commercial-facility.jpg"
            alt="Mulan Laundries NYC commercial laundry facility"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-[#005BD3]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              Simple & Reliable Process
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              How Mulan Laundries Works
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              We eliminate laundry day stress for NYC households and commercial facilities. From your initial pickup request to crisp delivery, our 4-step process delivers unparalleled freshness, cleanliness, and convenience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/pickup-request"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm shadow-md transition-all gap-2"
              >
                Schedule Your Pickup <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all gap-2"
              >
                <Phone className="w-4 h-4 text-blue-300" />
                Call Direct: {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#005BD3] block mb-2">
              STEP-BY-STEP PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              4 Easy Steps to Fresh, Clean Laundry
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Designed for busy New Yorkers, hospitality businesses, and healthcare operators who demand precision timing and clinical hygiene.
            </p>
          </div>

          <div className="space-y-12">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.step}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-8 lg:gap-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Visual Step Image Column */}
                  <div className="w-full lg:w-5/12">
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 group">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      {/* Step Number Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#005BD3] text-white px-3.5 py-1.5 rounded-full shadow-md font-black text-sm">
                        <Icon className="w-4 h-4 text-white" />
                        <span>STEP {step.step}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Details Column */}
                  <div className="w-full lg:w-7/12 space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#005BD3] bg-blue-50 px-3 py-1 rounded-full">
                        {step.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                        Key Features:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {step.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commercial vs Residential Guarantee Section */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60">
              <Clock className="w-10 h-10 text-[#005BD3] mb-4" />
              <h4 className="text-lg font-bold text-[#0A192F]">On-Time Route Reliability</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Dedicated driver routes covering Manhattan, Brooklyn, Queens, Bronx, and Staten Island. We respect your schedule and delivery commitments.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60">
              <ShieldCheck className="w-10 h-10 text-[#005BD3] mb-4" />
              <h4 className="text-lg font-bold text-[#0A192F]">Separate Drum Washing</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Your garments and linens are never washed or dried with another customer's order. Strict batch isolation guarantees privacy and hygiene.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60">
              <Layers className="w-10 h-10 text-[#005BD3] mb-4" />
              <h4 className="text-lg font-bold text-[#0A192F]">Hospital-Grade Precautions</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We handle commercial hotel, shelter, and medical linens following universal precautions to eliminate cross-contamination and guarantee clinical cleanliness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#001D40] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Experience Effortless Laundry?
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Book your free pickup online in under 60 seconds, or give us a call for immediate scheduling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/pickup-request"
              className="px-8 py-3.5 rounded-full bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm shadow-lg transition-all"
            >
              Book a Free Pickup
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              Call Dispatch: {phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
