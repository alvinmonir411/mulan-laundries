import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { COMMERCIAL_SERVICES } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/lib/defaultImages";

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

interface IndustriesGridProps {
  images?: Record<string, SiteImage>;
}

export const IndustriesGrid: React.FC<IndustriesGridProps> = ({ images }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Specialized B2B Verticals"
          title="Business Industries We Serve Across New York"
          subtitle="Tailored commercial laundry programs, dedicated account specialists, and precision sanitization for New York's leading industries."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMERCIAL_SERVICES.map((service) => {
            const slotKey = SLUG_TO_SLOT[service.slug];
            const dynamicImg = slotKey && images ? images[slotKey] : undefined;
            const cardImg = dynamicImg?.image_url || service.heroImage;
            const cardAlt = dynamicImg?.alt_text || service.title;

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cardImg}
                    alt={cardAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-sky-600/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {service.badge}
                    </span>
                  </div>
                </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-sky-600 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                  <span>Explore Specialized Program</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
