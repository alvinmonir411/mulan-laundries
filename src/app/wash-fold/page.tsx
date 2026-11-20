import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Package, Sparkles, AlertCircle, ArrowRight, CheckCircle2, ShieldCheck, Leaf } from "lucide-react";
import { WASH_FOLD_DATA } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wash & Fold Laundry Pickup NYC | Mulan Laundries",
  description:
    "Professional wash and fold laundry service in New York City. Whites and colors separated, eco-friendly ECOS detergents, allergy-free formulas, and prompt door-to-door delivery.",
  alternates: {
    canonical: "/wash-fold",
  },
};

export default async function WashFoldPage() {
  const images = await getSiteImages();
  const washFoldImg = images.service_wash_fold?.image_url || "/images/washfold.jpg";
  const washFoldAlt = images.service_wash_fold?.alt_text || "Mulan Wash & Fold Laundry";

  return (
    <>
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={washFoldImg}
            alt={washFoldAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Package className="w-3.5 h-3.5" />
              <span>Residential & Bulk Laundry Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {WASH_FOLD_DATA.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {WASH_FOLD_DATA.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative & Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <span>The Mulan Difference</span>
              </div>

              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Give Us Your Dirty Laundry — We Wash, Fold, & Deliver
              </h2>

              {WASH_FOLD_DATA.narrative.map((para, idx) => (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Eco Detergents Callout */}
              <div className="p-5 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">Eco-Friendly & Hypoallergenic Options</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    We offer environment-friendly ECOS detergent, all Allergy-free hypoallergenic detergents, and OXI-CLEAN non-chlorine bleach upon request.
                  </p>
                </div>
              </div>

              {/* Oversized Item Notice */}
              <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-start gap-3.5 text-xs text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-950 mb-0.5">{WASH_FOLD_DATA.itemPolicy.notice}</h5>
                  <p className="leading-relaxed">{WASH_FOLD_DATA.itemPolicy.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[380px] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
                <Image
                  src={washFoldImg}
                  alt={washFoldAlt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h4 className="text-base font-bold text-navy-900">What is Included in Every Load:</h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Garments separated into white and colored loads</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Highest quality detergents, bleaches, and fabric softeners</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Controlled-heat drying to eliminate shrinkage</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Prompt folding and bundling to reduce wrinkling</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Protective clear plastic packaging or hangers ready to store</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/pickup-request"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    <span>Schedule Wash & Fold Pickup</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
