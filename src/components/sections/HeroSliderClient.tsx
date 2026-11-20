"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Phone,
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

interface SlideData {
  id: number;
  image: string;
  alt: string;
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  isVideo?: boolean;
  videoSrc?: string;
}

interface HeroSliderClientProps {
  slides: SlideData[];
  posterImg: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export function HeroSliderClient({
  slides,
  posterImg,
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}: HeroSliderClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mark as mounted so we know client JS is active
  useEffect(() => {
    setMounted(true);
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        React.startTransition(() => setCurrentSlide(next));
        setTimeout(() => setAnimating(false), 50);
      }, 400);
    },
    [animating]
  );

  // Auto-play every 5 seconds
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length, goToSlide, mounted]);

  // Video play/pause on slide change
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
    if (currentSlide === 0) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [currentSlide]);

  const active = slides[currentSlide];

  const trustBadges = [
    { icon: <Truck className="w-4 h-4" />, color: "sky", label: "Free Pickup", sub: "& Delivery" },
    { icon: <ShieldCheck className="w-4 h-4" />, color: "emerald", label: "100% Hygienic", sub: "OSHA / JCAHO" },
    { icon: <Clock className="w-4 h-4" />, color: "blue", label: "Express Service", sub: "24h Turnaround" },
    { icon: <Award className="w-4 h-4" />, color: "amber", label: "18+ Years", sub: "NYC Heritage" },
  ];

  return (
    <>
      {/* ═══ SLIDE BACKGROUNDS (slides 2-4 switch; slide 1 uses SSR image underneath) ═══ */}
      <div className="absolute inset-0 w-full h-full z-[1] overflow-hidden">
        {slides.map((slide, idx) => {
          // Slide 1 background: only render overlay once mounted and switched away from slide 1
          // When on slide 1 (currentSlide === 0), the SSR image below shows through (opacity-0 here)
          const isActive = idx === currentSlide;
          const showImage = mounted && (idx !== 0 || currentSlide !== 0);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive && showImage ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {showImage && (
                <>
                  {slide.isVideo && slide.videoSrc && idx === 0 ? (
                    <video
                      ref={videoRef}
                      src={slide.videoSrc}
                      poster={posterImg}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover object-center"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  ) : (
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      unoptimized
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 z-10" />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ═══ FOREGROUND CONTENT — badge, headline, subtitle, trust badges, CTAs ═══ */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
          <div className="max-w-3xl space-y-5 sm:space-y-6">

            {/* Top Badge */}
            <div
              className={`h-8 flex items-center transition-all duration-500 ${
                animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-100">
                  {active.badge}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div
              className={`min-h-[80px] sm:min-h-[110px] lg:min-h-[140px] flex flex-col justify-center transition-all duration-500 ${
                animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-md">
                <span className="block text-white drop-shadow-lg">{active.headlineLine1}</span>
                <span className="block bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                  {active.headlineLine2}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`min-h-[56px] sm:min-h-[64px] flex items-center transition-all duration-500 ${
                animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-md line-clamp-2 sm:line-clamp-none">
                {active.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md"
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-${b.color}-500/20 text-${b.color}-300 border border-${b.color}-400/30 flex items-center justify-center shrink-0`}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white leading-tight block">{b.label}</span>
                    <span className="text-[11px] text-slate-200 block">{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <Link
                href="/pickup-request"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {ctaSecondary && (
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-black/40 hover:bg-black/60 text-white border border-white/25 backdrop-blur-md font-bold text-base rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>{ctaSecondary}</span>
                </Link>
              )}
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold text-sm rounded-xl transition-all shadow-md"
                title={`Call ${BUSINESS_INFO.phone}`}
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call ({BUSINESS_INFO.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ DOT + ARROW CONTROLS ═══ */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:right-6 z-30 flex items-center gap-3">
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          aria-label="Next slide"
          className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 sm:ml-1 bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-full border border-white/15 sm:border-none">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="p-1.5 min-w-[28px] min-h-[36px] flex items-center justify-center focus:outline-none"
            >
              <span
                className={`h-2 rounded-full transition-all duration-500 block ${
                  i === currentSlide ? "w-6 sm:w-7 bg-sky-400 shadow-md" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
