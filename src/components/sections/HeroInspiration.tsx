"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Truck,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Phone
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

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
  heroImage = "/images/laundry-hero-inspiration.jpg",
  heroAlt = "Mulan Laundries high-capacity commercial and residential laundry facility",
  heroVideo = "/videos/hero-cinematic.mp4",
  videoPoster = "/images/laundry-hero-inspiration.jpg",
  titleLine1 = "Clean Clothes,",
  titleLine2 = "Fresh Life!",
  subtitle = "Professional laundry & commercial linen management service with hospital-grade hygiene, universal precautions & 24/7 on-time delivery across all 5 NYC boroughs.",
  badge = "New York Premier Laundry & Linen Management",
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy pause video when scrolled out of view to preserve CPU/GPU battery
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoElement.paused && isPlaying) {
              videoElement.play().catch(() => {});
            }
          } else {
            if (!videoElement.paused) {
              videoElement.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[760px] xl:min-h-[820px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 1. FULL BACKGROUND VIDEO & POSTER LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Instant LCP Poster Image (Priority Loaded with Zero CLS) */}
        <Image
          src={videoPoster || heroImage}
          alt={heroAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded && !hasVideoError ? "opacity-0" : "opacity-100 scale-105"
          }`}
        />

        {/* Cinematic Ambient Background Video Loop */}
        {!hasVideoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={videoPoster || heroImage}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setHasVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 scale-[1.03] ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Mulan Laundries NYC commercial laundry operation background video"
          >
            <source src="/videos/hero-cinematic.webm" type="video/webm" />
            <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
            <source src="/videos/mulan-laundry-hero.webm" type="video/webm" />
            <source src="/videos/mulan-laundry-hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Multi-layered Cinematic Dark Gradient Overlay for Maximum Text Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10" />
        <div className="absolute inset-0 backdrop-blur-[1.5px] z-10 pointer-events-none" />
      </div>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {/* Top Badge: Facility & Location Status */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-sky-100">
              {badge}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              <span className="block text-white drop-shadow-sm">{titleLine1}</span>
              <span className="block bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                {titleLine2}
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal drop-shadow">
            {subtitle}
          </p>

          {/* 4 Trust Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Free Pickup</h4>
                <span className="text-[11px] text-slate-300 block">& Delivery</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">100% Hygienic</h4>
                <span className="text-[11px] text-slate-300 block">OSHA / JCAHO</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Express Service</h4>
                <span className="text-[11px] text-slate-300 block">24h Turnaround</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">18+ Years</h4>
                <span className="text-[11px] text-slate-300 block">NYC Heritage</span>
              </div>
            </div>
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md font-bold text-base rounded-xl transition-all"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call ({BUSINESS_INFO.phone})</span>
            </a>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-slate-300 hover:text-white font-semibold text-sm transition-colors"
            >
              <div className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-slate-300">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>{ctaSecondary}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. FLOATING AMBIENT VIDEO CONTROLS (BOTTOM-RIGHT) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 shadow-xl text-xs text-slate-300">
        <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400 pr-1">
          Ambient Motion
        </span>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Decorative Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
};
