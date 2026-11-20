// SERVER COMPONENT - no "use client" - renders static HTML including LCP image on first request
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Clock, Award, Sparkles, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { HeroSliderLazy } from "./HeroSliderLazy";

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".mov") ||
    clean.endsWith(".ogg") ||
    clean.includes("/video/upload") ||
    clean.includes("/videos/")
  );
}

function optimizeCloudinaryUrl(url: string, width = 800): string {
  if (!url || typeof url !== "string") return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const parts = url.split("/upload/");
    const cleanPath = parts[1].replace(/^(f_[^/]+|q_[^/]+|w_[^/]+|\w+_[^/]+,?)+\//, "");
    return `${parts[0]}/upload/f_webp,q_auto:good,w_${width}/${cleanPath}`;
  }
  return url;
}

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

export function HeroInspiration({
  heroImage,
  heroAlt,
  heroVideo,
  videoPoster,
  titleLine1 = "Clean Clothes,",
  titleLine2 = "Fresh Life!",
  subtitle = "Professional laundry & commercial linen management service with hospital-grade hygiene, universal precautions & 24/7 on-time delivery across all 5 NYC boroughs.",
  badge = "New York Premier Laundry & Linen Management",
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}: HeroInspirationProps) {
  const isVideo = isVideoUrl(heroVideo);
  const rawSlide1Image =
    (!isVideo && heroVideo) ||
    (!isVideoUrl(heroImage) && heroImage) ||
    "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908752/mulan-laundries/slide1.webp";

  // Mobile-optimised WebP, served directly from Cloudinary CDN (no /_next/image proxy)
  const slide1Image = optimizeCloudinaryUrl(rawSlide1Image, 800);
  const posterImg = optimizeCloudinaryUrl(
    (!isVideoUrl(videoPoster) && videoPoster) ||
    (!isVideoUrl(heroImage) && heroImage) ||
    "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908752/mulan-laundries/slide1.webp",
    800
  );

  const slides = [
    {
      id: 1,
      image: slide1Image,
      alt: heroAlt || "Mulan Laundries NYC premier commercial laundry facility and automated washers",
      badge: badge || "New York Premier Laundry & Linen Management",
      headlineLine1: titleLine1 || "Clean Clothes,",
      headlineLine2: titleLine2 || "Fresh Life!",
      description: subtitle || "Professional laundry & commercial linen management service with hospital-grade hygiene, universal precautions & 24/7 on-time delivery across all 5 NYC boroughs.",
      isVideo: isVideo,
      videoSrc: heroVideo,
    },
    {
      id: 2,
      image: optimizeCloudinaryUrl("https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908957/mulan-laundries/slide2.webp", 800),
      alt: "Hospitality & hotel linen laundry management New York City",
      badge: "5-Star Hotel & Hospitality Linen Specialists",
      headlineLine1: "Pristine Linens,",
      headlineLine2: "Five-Star Comfort!",
      description: "Crisp bedsheets, plush bath towels, and pristine table settings with precision rotary pressing and emergency same-day turnaround for NYC hotels & restaurants.",
      isVideo: false,
    },
    {
      id: 3,
      image: optimizeCloudinaryUrl("https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908958/mulan-laundries/slide3.jpg", 800),
      alt: "Residential wash and fold door to door laundry pickup service",
      badge: "Residential Door-to-Door Wash & Fold",
      headlineLine1: "Whites & Colors Separated,",
      headlineLine2: "Neatly Folded!",
      description: "Separated with care and washed with eco-friendly detergents. Cleanly wrapped in protective poly-bags or hung ready to put away.",
      isVideo: false,
    },
    {
      id: 4,
      image: optimizeCloudinaryUrl("https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908959/mulan-laundries/slide4.webp", 800),
      alt: "Mulan Laundries NYC commercial delivery van and logistics",
      badge: "Serving All 5 Boroughs 24/7/365",
      headlineLine1: "Reliable NYC Pickup,",
      headlineLine2: "Guaranteed On-Time!",
      description: "Processing over 1,000,000 lbs annually. Operating 24/7 with GPS-tracked dispatch routes across all 5 boroughs of New York City.",
      isVideo: false,
    },
  ];

  return (
    <section className="relative w-full min-h-[720px] h-auto lg:h-[760px] xl:h-[780px] py-16 sm:py-20 lg:py-0 flex items-center justify-center overflow-hidden bg-slate-950 text-white">

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE 1 BACKGROUND - Rendered in SSR HTML = INSTANT LCP PAINT
          No JavaScript needed. Browser sees <img> immediately.
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        {/* Slide 1 static SSR image — this is the LCP element */}
        {!isVideo ? (
          <Image
            src={slide1Image}
            alt={heroAlt || "Mulan Laundries NYC premier commercial laundry facility"}
            fill
            priority
            fetchPriority="high"
            loading="eager"
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <video
            src={heroVideo}
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
        )}
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 z-10" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FOREGROUND CONTENT — also SSR, no JS needed for static text
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Top Badge */}
          <div className="h-8 flex items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-all shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-100">
                {badge}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="min-h-[80px] sm:min-h-[110px] lg:min-h-[140px] flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-md">
              <span className="block text-white drop-shadow-lg">{titleLine1}</span>
              <span className="block bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                {titleLine2}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="min-h-[56px] sm:min-h-[64px] flex items-center">
            <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-md line-clamp-2 sm:line-clamp-none">
              {subtitle}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
            {[
              { icon: <Truck className="w-4 h-4" />, color: "sky", label: "Free Pickup", sub: "& Delivery" },
              { icon: <ShieldCheck className="w-4 h-4" />, color: "emerald", label: "100% Hygienic", sub: "OSHA / JCAHO" },
              { icon: <Clock className="w-4 h-4" />, color: "blue", label: "Express Service", sub: "24h Turnaround" },
              { icon: <Award className="w-4 h-4" />, color: "amber", label: "18+ Years", sub: "NYC Heritage" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-md">
                <div className={`w-9 h-9 rounded-lg bg-${b.color}-500/20 text-${b.color}-300 border border-${b.color}-400/30 flex items-center justify-center shrink-0`}>
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

      {/* ═══════════════════════════════════════════════════════════════
          CLIENT SLIDER — lazy loaded AFTER LCP, handles slide 2/3/4
          and live BroadcastChannel updates from admin dashboard
      ═══════════════════════════════════════════════════════════════ */}
      <HeroSliderLazy slides={slides} posterImg={posterImg} />
    </section>
  );
}
