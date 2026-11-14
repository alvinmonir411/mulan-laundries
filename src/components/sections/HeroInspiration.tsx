import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Truck, ShieldCheck, Clock, Award, Sparkles } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

interface HeroInspirationProps {
  heroImage?: string;
  heroAlt?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  badge?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const HeroInspiration: React.FC<HeroInspirationProps> = ({
  heroImage = "/images/laundry-hero-inspiration.jpg",
  heroAlt = "Clean modern washing machine with colorful folded towels in wicker basket",
  titleLine1 = "Clean Clothes,",
  titleLine2 = "Fresh Life!",
  subtitle = "Professional laundry & commercial linen management service with care, universal precautions hygiene & 24/7 on-time delivery across New York City.",
  badge = "New York Premier Laundry & Linen Management",
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}) => {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#005BD3] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A192F] tracking-tight leading-[1.12]">
              {titleLine1} <br className="hidden sm:inline" />
              <span className="text-[#005BD3]">{titleLine2}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 pb-2">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-2.5 p-2 rounded-xl">
                <div className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/60 text-[#005BD3] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">Free Pickup</h4>
                  <span className="text-[11px] text-slate-500 block leading-tight">& Delivery</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-2.5 p-2 rounded-xl">
                <div className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/60 text-[#005BD3] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">100% Hygienic</h4>
                  <span className="text-[11px] text-slate-500 block leading-tight">OSHA / JCAHO</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-2.5 p-2 rounded-xl">
                <div className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/60 text-[#005BD3] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">Express Delivery</h4>
                  <span className="text-[11px] text-slate-500 block leading-tight">Within Hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-2.5 p-2 rounded-xl">
                <div className="w-9 h-9 rounded-full border border-blue-200 bg-blue-50/60 text-[#005BD3] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">18+ Years</h4>
                  <span className="text-[11px] text-slate-500 block leading-tight">Brand Heritage</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/pickup-request"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-300 hover:border-[#005BD3] text-slate-800 hover:text-[#005BD3] font-bold text-sm rounded-lg transition-all"
              >
                <div className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-slate-600">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>{ctaSecondary}</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Dynamic Image Rendered from DB */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-gradient-to-tr from-sky-100 to-blue-50 rounded-full blur-2xl -z-10" />

            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-card border border-slate-100/80 bg-white">
              <Image
                src={heroImage}
                alt={heroAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
