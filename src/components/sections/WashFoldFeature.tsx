import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Layers, Package } from "lucide-react";
import { WASH_FOLD_DATA } from "@/data/services";

export const WashFoldFeature: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
              <Image
                src="/images/washfold.jpg"
                alt="Residential wash and fold folded laundry service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating Quality Box */}
            <div className="absolute -bottom-6 right-6 left-6 sm:left-auto sm:right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200/80 max-w-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Whites & Colors Separated</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Washed independently with fabric-safe temperatures to preserve garment brilliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Policy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
              <Package className="w-3.5 h-3.5" />
              <span>Residential Laundry Service</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Wash & Fold Laundry Pickup Services in New York
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Give us your dirty laundry, we’ll wash it, fold it, and package it up for you. What could be easier? All clothes are separated into white and colored loads and washed separately using only the highest quality detergents and fabric softeners.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We offer environment-friendly ECOS detergent, allergy-free formulas, and OXI-CLEAN non-chlorine bleach upon request. Your items will then be dried, promptly folded, and neatly bundled in clear plastic bags or on hangers to reduce wrinkling and ready to put away.
            </p>

            {/* 3 Step Highlights */}
            <div className="space-y-3 pt-2">
              {WASH_FOLD_DATA.processSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-mono font-bold text-sky-600 text-xs bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-navy-900">{step.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Oversized Item Disclaimer */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Specialty & Oversized Item Policy:</span>
                <span className="text-amber-800">
                  Large or time-consuming items (such as blankets, comforters/duvets, pillows, and rugs/mats) require dedicated wash cycles and are subject to additional charges.
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/pickup-request"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                <span>Schedule Wash & Fold Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/wash-fold"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-sm rounded-xl transition-all"
              >
                <span>Full Service Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
