// SERVER COMPONENT - no "use client"
// Renders ONLY the LCP background image in SSR HTML for instant paint.
// All text, controls, and slide switching are handled by HeroSliderClient (lazy loaded).
import React from "react";
import Image from "next/image";
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
    <section className="relative w-full min-h-[720px] h-auto lg:h-[760px] xl:h-[780px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">

      {/* ═══════════════════════════════════════════════════════════
          SSR BACKGROUND — LCP image rendered in initial HTML.
          No JS required. Browser paints this immediately.
          z-0: sits behind the client slider overlay.
      ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950" aria-hidden="true">
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

      {/* ═══════════════════════════════════════════════════════════
          CLIENT SLIDER — lazy loaded after LCP.
          Renders on top (z-10+) with all text, badges, CTAs,
          slide switching, autoplay, and dot/arrow controls.
      ═══════════════════════════════════════════════════════════ */}
      <HeroSliderLazy
        slides={slides}
        posterImg={posterImg}
        ctaPrimary={ctaPrimary}
        ctaSecondary={ctaSecondary}
      />
    </section>
  );
}
