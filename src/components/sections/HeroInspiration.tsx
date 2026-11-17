"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Phone
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { ServiceSearchBar } from "@/components/navigation/ServiceSearchBar";

interface HeroInspirationProps {
  heroImage?: string;
  heroAlt?: string;
  heroVideo?: string;
  videoPoster?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  badge?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const HeroInspiration: React.FC<HeroInspirationProps> = ({
  heroImage,
  heroAlt,
  titleLine1 = "Clean Clothes,",
  titleLine2 = "Fresh Life!",
  subtitle = "Professional laundry & commercial linen management service with hospital-grade hygiene, universal precautions & 24/7 on-time delivery across all 5 NYC boroughs.",
  badge = "New York Premier Laundry & Linen Management",
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}) => {
  // Original client slides with priority to custom uploaded hero image
  const slides = [
    {
      id: 1,
      image: heroImage || "/images/slide1.webp",
      alt: heroAlt || "Mulan Laundries NYC premier commercial laundry facility and automated washers",
      badge: badge || "New York Premier Laundry & Linen Management",
      headlineLine1: titleLine1 || "Clean Clothes,",
      headlineLine2: titleLine2 || "Fresh Life!",
      description: subtitle || "Professional laundry & commercial linen management service with hospital-grade hygiene, universal precautions & 24/7 on-time delivery across all 5 NYC boroughs.",
    },
    {
      id: 2,
      image: "/images/slide2.webp",
      alt: "Hospitality & hotel linen laundry management New York City",
      badge: "5-Star Hotel & Hospitality Linen Specialists",
      headlineLine1: "Pristine Linens,",
      headlineLine2: "Five-Star Comfort!",
      description: "Crisp bedsheets, plush bath towels, and pristine table settings with precision rotary pressing and emergency same-day turnaround for NYC hotels & restaurants.",
    },
    {
      id: 3,
      image: "/images/slide3.jpg",
      alt: "Residential wash and fold door to door laundry pickup service",
      badge: "Residential Door-to-Door Wash & Fold",
      headlineLine1: "Whites & Colors Separated,",
      headlineLine2: "Neatly Folded!",
      description: "Separated with care and washed with eco-friendly detergents. Cleanly wrapped in protective poly-bags or hung ready to put away.",
    },
    {
      id: 4,
      image: "/images/slide4.webp",
      alt: "Mulan Laundries NYC commercial delivery van and logistics",
      badge: "Serving All 5 Boroughs 24/7/365",
      headlineLine1: "Reliable NYC Pickup,",
      headlineLine2: "Guaranteed On-Time!",
      description: "Processing over 1,000,000 lbs annually. Operating 24/7 with GPS-tracked dispatch routes across all 5 boroughs of New York City.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative w-full h-[680px] sm:h-[720px] lg:h-[760px] xl:h-[780px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 1. BACKGROUND SLIDER IMAGES LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            } transition-transform duration-7000`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Crisp Cinematic Dark Gradient Overlay (Balanced so images remain vivid and bright while text is perfectly legible) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 z-10" />
      </div>

      {/* 2. FOREGROUND CONTENT LAYER (Fixed container height so every slide has 100% identical height) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Top Badge: Fixed height */}
          <div className="h-8 flex items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-all shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-100">
                {active.badge}
              </span>
            </div>
          </div>

          {/* Main Headline: Fixed height to eliminate layout shifts between slides */}
          <div className="min-h-[90px] sm:min-h-[110px] lg:min-h-[140px] flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-md">
              <span className="block text-white drop-shadow-lg">{active.headlineLine1}</span>
              <span className="block bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                {active.headlineLine2}
              </span>
            </h1>
          </div>

          {/* Subheadline: Fixed min-height so description length does not jump slide height */}
          <div className="min-h-[56px] sm:min-h-[64px] flex items-center">
            <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-md line-clamp-2 sm:line-clamp-none">
              {active.description}
            </p>
          </div>

          {/* 4 Trust Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Free Pickup</h4>
                <span className="text-[11px] text-slate-200 block">& Delivery</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">100% Hygienic</h4>
                <span className="text-[11px] text-slate-200 block">OSHA / JCAHO</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Express Service</h4>
                <span className="text-[11px] text-slate-200 block">24h Turnaround</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">18+ Years</h4>
                <span className="text-[11px] text-slate-200 block">NYC Heritage</span>
              </div>
            </div>
          </div>

          {/* Quick Service Search Bar */}
          <div className="pt-2">
            <ServiceSearchBar
              variant="hero"
              placeholder="Search services (e.g. Hotel, Hospital, Wash & Fold, Airbnb)..."
            />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href="/pickup-request"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-black/40 hover:bg-black/60 text-white border border-white/25 backdrop-blur-md font-bold text-base rounded-xl transition-all shadow-md"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call ({BUSINESS_INFO.phone})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slider Controls (Prev / Next & Dots) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? "w-7 bg-sky-400 shadow-md" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
