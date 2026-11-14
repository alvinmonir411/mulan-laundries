"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

const SLIDES = [
  {
    image: "/images/slide1.webp",
    badge: "New York Premier Commercial & Residential Laundry",
    title: "Best-in-Class Commercial Laundry & Linen Management in New York",
    description: "Processing over 1,000,000 pounds per year under universal precautions. Operating 24/7/365 with dedicated account managers and prompt delivery.",
    primaryCta: { text: "Request Commercial Quote", href: "/contact" },
    secondaryCta: { text: "Schedule Pickup", href: "/pickup-request" }
  },
  {
    image: "/images/slide2.webp",
    badge: "Hotels, Spas & Short-Term Rentals",
    title: "Precision Cleaning & Reliable Turnaround for NYC Hospitality",
    description: "Crisp bed linens, ultra-absorbent bath towels, and pristine table settings. Emergency rush turnaround available within hours.",
    primaryCta: { text: "Explore Hotel Laundry", href: "/services/hotel-laundry" },
    secondaryCta: { text: "Call (917) 365-4366", href: `tel:${BUSINESS_INFO.phoneRaw}` }
  },
  {
    image: "/images/slide3.jpg",
    badge: "Residential Wash & Fold Services",
    title: "Whites & Colors Separated with Eco-Friendly ECOS Detergents",
    description: "Door-to-door wash, dry, and fold laundry. We professionally clean, neatly fold in clear poly-wrap or hang, and return directly to your door.",
    primaryCta: { text: "Residential Wash & Fold", href: "/wash-fold" },
    secondaryCta: { text: "Schedule a Pickup", href: "/pickup-request" }
  },
  {
    image: "/images/slide4.webp",
    badge: "All 5 NYC Boroughs Covered",
    title: "Door-to-Door Delivery Across Manhattan, Brooklyn, Queens & The Bronx",
    description: "Backed by an 18-year brand heritage. Real-time updates, GPS-tracked dispatch, and seamless regular daily or bi-weekly pickup routes.",
    primaryCta: { text: "Book Pickup Now", href: "/pickup-request" },
    secondaryCta: { text: "About Our 18-Year Legacy", href: "/about" }
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative bg-navy-950 overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
      {/* Background Images */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-40 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-7000`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        </div>
      ))}

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-navy-950/80 pointer-events-none" />

      {/* Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in duration-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>{SLIDES[current].badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {SLIDES[current].title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
            {SLIDES[current].description}
          </p>

          {/* Key Value Points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>1,000,000+ Lbs/Yr</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>24/7, 365 NYC Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Universal Precautions</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={SLIDES[current].primaryCta.href}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{SLIDES[current].primaryCta.text}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={SLIDES[current].secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>{SLIDES[current].secondaryCta.text}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 ml-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "w-6 bg-sky-400" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
