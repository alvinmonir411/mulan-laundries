import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Phone, Sparkles, Building2, ShieldCheck, Clock, Truck } from "lucide-react";
import { COMMERCIAL_SERVICES, COMMERCIAL_HUB_DATA } from "@/data/services";
import { BUSINESS_INFO } from "@/data/business";
import { getSiteImages } from "@/lib/images";
import { getSiteSettings } from "@/lib/settings";
import { ServiceSearchBar } from "@/components/navigation/ServiceSearchBar";

export const metadata: Metadata = {
  title: "Laundry & Linen Management Services NYC | Commercial & Residential | Mulan Laundries",
  description:
    "Explore Mulan Laundries' full suite of laundry and commercial linen services across New York City: Residential Wash & Fold, Commercial Linen Management, Healthcare & Hospitality services.",
  alternates: {
    canonical: "/services",
  },
};

const SERVICE_CARDS = [
  {
    title: "Residential Wash & Fold",
    href: "/wash-fold",
    imageSlot: "service_wash_fold",
    defaultImg: "/images/washfold.jpg",
    badge: "Residential & Family",
    description: "Everyday garment washing, hypoallergenic detergent options, controlled temperature drying, and crisp bundle packaging.",
    features: ["Personalized sorting & care", "Free door-to-door pickup & delivery", "Custom fold or hanger return"],
  },
  {
    title: "Commercial Laundry Overview",
    href: "/commercial-laundry",
    imageSlot: "service_commercial",
    defaultImg: "/images/commercial-laundry.jpg",
    badge: "High Volume Facility",
    description: "Industrial continuous wash capacity processing over 1,000,000 lbs annually with rigorous quality control.",
    features: ["Heavy-duty continuous washers", "Dedicated commercial route drivers", "OSHA & CDC hygiene compliance"],
  },
  {
    title: "Hotel & Hospitality Linens",
    href: "/services/hotel-laundry",
    imageSlot: "service_rotary_pressing",
    defaultImg: "/images/hotels.jpg",
    badge: "Hospitality & Lodging",
    description: "Rotary iron pressing for 300+ thread count sheets, duvet covers, pillowcases, and ultra-absorbent bath sheets.",
    features: ["Industrial flatwork rotary ironing", "Same-day turnover replenishment", "Damage inspection & reporting"],
  },
  {
    title: "Hospital & Clinical Healthcare",
    href: "/services/hospital-laundry",
    imageSlot: "service_hospital",
    defaultImg: "/images/hospital-loundry-img.jpg",
    badge: "Universal Precautions",
    description: "Sanitized linen management adhering strictly to OSHA and Joint Commission infection control standards.",
    features: ["Universal precautions barrier handling", "Thermal disinfection wash chemistry", "Separated bio-containment staging"],
  },
  {
    title: "Short-Term Rentals & Airbnb",
    href: "/services/short-term-rentals",
    imageSlot: "service_rentals",
    defaultImg: "/images/residential-services.jpg",
    badge: "Property Management",
    description: "Fast turnarounds for vacation hosts and building managers with unit-packed bedding, linens, and towels.",
    features: ["Turnover-day rapid scheduling", "Pre-bundled unit kits", "Keyless drop-off coordination"],
  },
  {
    title: "Gyms & Health Clubs",
    href: "/services/gyms",
    imageSlot: "service_gyms",
    defaultImg: "/images/gym.jpg",
    badge: "Fitness Centers",
    description: "Continuous towel management and odor-neutralizing thermal sanitization for boutique fitness and athletic clubs.",
    features: ["High-absorbency towel supply", "Sweat & mildew odor extraction", "Scheduled par inventory replenishment"],
  },
  {
    title: "Salons & Luxury Spas",
    href: "/services/salons-spas",
    imageSlot: "service_salons_spas",
    defaultImg: "/images/salons-_-spas.jpg",
    badge: "Spa & Wellness",
    description: "Specialized oil-extraction formulas preserving plush textures and vibrant colors for towels, robes, and capes.",
    features: ["Deep massage oil extraction", "Ultra-soft botanical fabric finishing", "Stain prevention treatment"],
  },
  {
    title: "Schools, Dorms & Student Housing",
    href: "/services/schools-dorms",
    imageSlot: "service_schools_dorms",
    defaultImg: "/images/schools.jpg",
    badge: "Campus & Dorms",
    description: "Semester laundry contracts and student housing linen services with designated pickup stations across NYC.",
    features: ["Bulk campus delivery logistics", "Individual student bundle bags", "Reliable weekly exchange days"],
  },
  {
    title: "Shelter Homes & Non-Profit Housing",
    href: "/services/shelter-homes",
    imageSlot: "service_shelter_homes",
    defaultImg: "/images/shelterHomes.jpg",
    badge: "Community Care",
    description: "Dignified, heavy-duty commercial linen support and bulk bedding processing for transitional facilities.",
    features: ["Non-profit budget consideration", "Heavy thermal sanitization", "High-volume blanket & sheet loads"],
  },
  {
    title: "Bed & Breakfasts / Boutique Inns",
    href: "/services/bed-and-breakfast",
    imageSlot: "service_special_care",
    defaultImg: "/images/bedbreakfast.jpg",
    badge: "Boutique Lodging",
    description: "Artisan care for antique bed coverings, delicate table napery, and luxury guest linens.",
    features: ["Custom temperature profile washing", "Gentle steam & iron finish", "Hand-inspection before packaging"],
  },
];

export default async function ServicesHubPage() {
  const [images, settings] = await Promise.all([
    getSiteImages(),
    getSiteSettings(),
  ]);

  const phone = settings.phone || BUSINESS_INFO.phone;
  const phoneRaw = settings.phone_raw || BUSINESS_INFO.phoneRaw;

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-[#005BD3]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Full Service Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Commercial & Residential Laundry Services
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              From individual residential wash & fold to industrial hospitality linen management, Mulan Laundries provides hospital-grade sanitization, scheduled route pickups, and dependable 24/7 service throughout New York City.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/pickup-request"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm shadow-md transition-all gap-2"
              >
                Schedule Free Pickup <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all gap-2"
              >
                <Phone className="w-4 h-4 text-blue-300" />
                Call {phone}
              </a>
            </div>

            {/* Quick Live Search Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 block mb-2">
                Quick Service Filter
              </span>
              <ServiceSearchBar variant="hero" placeholder="Search service catalog by name, industry or keyword..." />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#005BD3] block mb-2">
              COMPREHENSIVE NYC LINEN CARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Select Your Specialized Service
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Every industry demands unique wash chemistries, handling standards, and delivery schedules. Explore our specialized services below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CARDS.map((service) => {
              const imgUrl = (images[service.imageSlot]?.image_url) || service.defaultImg;
              const imgAlt = (images[service.imageSlot]?.alt_text) || service.title;

              return (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:h-56 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={imgAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#001D40]/90 text-white shadow-sm backdrop-blur-sm">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0A192F] group-hover:text-[#005BD3] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#005BD3] hover:text-[#004BB5] group/link"
                      >
                        <span>View Service Details</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-[#001D40] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Tailored Commercial Laundry Program?
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Speak directly with our NYC commercial route managers for scheduled pickups, volume linen par management, and custom facility walkthroughs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/pickup-request"
              className="px-8 py-3.5 rounded-full bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm shadow-lg transition-all"
            >
              Request Commercial Walkthrough
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              Call Direct: {phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
