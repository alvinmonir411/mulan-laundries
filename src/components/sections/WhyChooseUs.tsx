import React from "react";
import Image from "next/image";
import { UserCheck, DollarSign, Truck, ShieldCheck, Clock, Bell, Sparkles } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    DollarSign,
    Truck,
    ShieldCheck,
    Clock,
    Bell
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Mulan Advantage"
          title="Why Choose Mulan Laundries"
          subtitle="Backed by an 18-year brand heritage in New York, we deliver excellence at every step of your laundry and linen management."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUSINESS_INFO.whyChooseUs.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  {pillar.legacyIcon && (
                    <div className="relative w-7 h-7 opacity-30 group-hover:opacity-70 transition-opacity">
                      <Image
                        src={pillar.legacyIcon}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-navy-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">Need a Customized Commercial Agreement?</h4>
            <p className="text-sm text-slate-300 mt-1">
              We create personalized contracts tailored to your exact linen par counts, pickup frequencies, and delivery docks.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-6 py-3 bg-white text-navy-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition-colors"
            >
              Call (917) 365-4366
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
