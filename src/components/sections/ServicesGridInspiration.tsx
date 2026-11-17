import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Shirt, Building2, Hotel, ShieldCheck, Home, Star, ArrowRight } from "lucide-react";
import { SiteImage } from "@/lib/defaultImages";

const SERVICES_CARDS = [
  {
    title: "Wash & Fold",
    desc: "Regular washing & folding service for daily wear, whites & colors separated.",
    defaultImage: "/images/washfold.jpg",
    slotKey: "service_wash_fold",
    icon: Shirt,
    href: "/wash-fold"
  },
  {
    title: "Commercial Linen",
    desc: "Processing over 1,000,000 lbs/yr for hospitality, restaurants, and facilities.",
    defaultImage: "/images/commercial-laundry.jpg",
    slotKey: "service_commercial",
    icon: Building2,
    href: "/commercial-laundry"
  },
  {
    title: "Hotel Laundry Services",
    desc: "Timely linen management, crisp rotary pressing, and pristine guest-ready bedding.",
    defaultImage: "/images/hotels.jpg",
    slotKey: "service_rotary_pressing",
    icon: Hotel,
    href: "/services/hotel-laundry"
  },
  {
    title: "Hospital Laundry",
    desc: "OSHA & Joint Commission universal precautions clinical sanitization.",
    defaultImage: "/images/hospital-loundry-img.jpg",
    slotKey: "service_hospital",
    icon: ShieldCheck,
    href: "/services/hospital-laundry"
  },
  {
    title: "Laundry for Rentals",
    desc: "Fast turnover linens for Airbnb, serviced apartments, and residential buildings.",
    defaultImage: "/images/residential-services.jpg",
    slotKey: "service_rentals",
    icon: Home,
    href: "/services/short-term-rentals"
  },
  {
    title: "Special Care Items",
    desc: "Dedicated individual specialty care for comforters, duvets, blankets & rugs.",
    defaultImage: "/images/bedbreakfast.jpg",
    slotKey: "service_special_care",
    icon: Star,
    href: "/services/bed-and-breakfast"
  }
];

interface ServicesGridInspirationProps {
  images?: Record<string, SiteImage>;
}

export const ServicesGridInspiration: React.FC<ServicesGridInspirationProps> = ({ images }) => {
  return (
    <section id="services" className="py-20 bg-slate-50/60 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Decorative Accent (matching inspiration) */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#005BD3] block mb-2">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            Commercial & Residential Laundry Services
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-16 bg-blue-200" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#005BD3] bg-white" />
            <span className="h-px w-16 bg-blue-200" />
          </div>
        </div>

        {/* 6 Visual Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {SERVICES_CARDS.map((card) => {
            const Icon = card.icon;
            const dynamicImg = images?.[card.slotKey];
            const imgSrc = dynamicImg?.image_url || card.defaultImage;
            const imgAlt = dynamicImg?.alt_text || card.title;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Photo Top Container */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 220px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Floating Circular Icon (matching inspiration design) */}
                  <div className="absolute -bottom-3 left-4 w-9 h-9 rounded-full bg-white border border-blue-100 shadow-md flex items-center justify-center text-[#005BD3] group-hover:bg-[#005BD3] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#005BD3] transition-colors mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-[#005BD3]">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
