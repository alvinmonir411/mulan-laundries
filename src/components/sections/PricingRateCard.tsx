import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, CheckCircle2, Truck } from "lucide-react";

const SERVICE_TIERS = [
  {
    category: "Commercial Linen & Hotels",
    standard: "Scheduled Par Exchange",
    express: "24-Hr Rotary Iron & Return",
    rush: "Same-Day Turnover Rush",
  },
  {
    category: "Residential Wash & Fold",
    standard: "Scheduled Route Delivery",
    express: "24-Hr Clean, Fold & Wrap",
    rush: "Same-Day Priority Pack",
  },
  {
    category: "Hospital & Healthcare",
    standard: "Universal Precautions Cycle",
    express: "24-Hr JCAHO Sanitization",
    rush: "Emergency Clinical Surge",
  },
  {
    category: "Short-Term Rentals & Airbnb",
    standard: "Turnover-Day Linen Swap",
    express: "24-Hr Unit-Ready Bundles",
    rush: "Same-Day Guest Check-In",
  },
  {
    category: "Gyms & Health Clubs",
    standard: "Continuous Towel Exchange",
    express: "24-Hr Anti-Odor Wash & Fold",
    rush: "Peak Class Replenishment",
  },
  {
    category: "Salons, Spas & Wellness",
    standard: "Gentle Oil-Extraction Wash",
    express: "24-Hr Plush Conditioning",
    rush: "Weekend Booking Rush",
  },
  {
    category: "Specialty & Bulky Items *",
    standard: "Dedicated Drum Washing",
    express: "Controlled-Heat Drying",
    rush: "Expedited Safe Handling",
  },
];

interface PricingRateCardProps {
  basketImage?: string;
  basketAlt?: string;
}

export const PricingRateCard: React.FC<PricingRateCardProps> = ({
  basketImage = "/images/washfold.jpg",
  basketAlt = "Fresh fluffy folded towels in basket",
}) => {
  return (
    <section id="turnaround" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (4 cols): Badge, Title & Basket Image */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#005BD3] block mb-1.5">
                SERVICE LOGISTICS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                Turnaround & Delivery Options
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Customized commercial laundry programs, scheduled linen par swaps, and rapid door-to-door turnarounds tailored to your business needs across New York City.
              </p>
            </div>

            {/* Basket Graphic with "24/7 NYC Dispatch" Badge (matching inspiration layout) */}
            <div className="relative mx-auto lg:mx-0 w-64 h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
              <Image
                src={basketImage}
                alt={basketAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10" />

              {/* Circular Badge */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[#005BD3] text-white flex flex-col items-center justify-center shadow-lg border-2 border-white text-center p-1">
                <span className="text-[10px] font-bold uppercase leading-tight">24/7</span>
                <span className="text-xs font-black uppercase leading-tight">Dispatch</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (8 cols): Clean Royal Blue Turnaround Table */}
          <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-blue-200/80 shadow-card bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                {/* Table Header (Matching Inspiration Solid Blue Header) */}
                <thead className="bg-[#005BD3] text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">
                      Service / Linen Category
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold text-center">
                      Standard Schedule <br />
                      <span className="text-[10px] font-normal text-blue-100 lowercase">(2 - 3 Days Delivery)</span>
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold text-center">
                      Express Turnaround <br />
                      <span className="text-[10px] font-normal text-blue-100 lowercase">(24 Hours Delivery)</span>
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold text-center">
                      Emergency Rush <br />
                      <span className="text-[10px] font-normal text-blue-100 lowercase">(Same Day Dispatch)</span>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">
                  {SERVICE_TIERS.map((row, idx) => (
                    <tr
                      key={row.category}
                      className={idx % 2 === 0 ? "bg-white hover:bg-blue-50/40" : "bg-slate-50/60 hover:bg-blue-50/40 transition-colors"}
                    >
                      <td className="px-5 py-3.5 font-semibold text-slate-800 text-xs sm:text-sm">
                        {row.category}
                      </td>
                      <td className="px-4 py-3.5 text-center font-medium text-slate-600 text-xs sm:text-sm">
                        {row.standard}
                      </td>
                      <td className="px-4 py-3.5 text-center font-medium text-slate-600 text-xs sm:text-sm">
                        {row.express}
                      </td>
                      <td className="px-4 py-3.5 text-center font-bold text-[#005BD3] text-xs sm:text-sm">
                        {row.rush}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Disclaimer (Custom Quote & Commercial Billing Policy) */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed flex items-center gap-2">
              <span className="text-[#005BD3] font-bold">*</span>
              <span>
                Commercial volume contracts and customized pickup cadences are established per facility par requirements. Contact our NYC dispatch team for tailored account setups.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
