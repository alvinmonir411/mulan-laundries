import React from "react";
import Link from "next/link";
import { Phone, Calendar, ArrowRight, Clock, MapPin } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export const QuickActionBanner: React.FC = () => {
  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card border border-slate-200/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Quick Item 1: Phone */}
          <div className="flex items-center gap-4 sm:border-r border-slate-100 pr-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Immediate Dispatch
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-lg font-bold text-navy-900 hover:text-sky-600 transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>

          {/* Quick Item 2: Schedule & Areas */}
          <div className="flex items-center gap-4 sm:border-r border-slate-100 pr-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Operating Hours
              </span>
              <span className="text-sm font-bold text-navy-900 block">
                Mon.–Sun. 24x7 (365 Days)
              </span>
              <span className="text-xs text-slate-500">
                All 5 NYC Boroughs Covered
              </span>
            </div>
          </div>

          {/* Quick Item 3: Primary Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/pickup-request"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>REQUEST A QUOTE / PICKUP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
