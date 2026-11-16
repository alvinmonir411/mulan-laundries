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
  Maximize2
} from "lucide-react";

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
  heroAlt = "Clean modern washing machine with colorful folded towels in wicker basket",
  heroVideo = "/videos/mulan-laundry-hero.mp4",
  videoPoster = "/images/laundry-hero-inspiration.jpg",
  titleLine1 = "Clean Clothes,",
  titleLine2 = "Fresh Life!",
  subtitle = "Professional laundry & commercial linen management service with care, universal precautions hygiene & 24/7 on-time delivery across New York City.",
  badge = "New York Premier Laundry & Linen Management",
  ctaPrimary = "Book a Free Pickup",
  ctaSecondary = "How It Works",
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load video only when in or near viewport using IntersectionObserver to protect LCP / TBT
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // In view: ensure video source is loaded and playing smoothly
            if (videoElement.paused && isPlaying) {
              videoElement.play().catch(() => {
                // Autoplay may be restricted if unmuted
              });
            }
          } else {
            // Out of view: pause video to save CPU/GPU/battery
            if (!videoElement.paused) {
              videoElement.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Copy, Value Proposition, Action CTAs */}
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

          {/* Right Column (5 cols): High-Performance Motion Video Hero with Image Poster Guard */}
          <div className="lg:col-span-5 relative flex items-center justify-center" ref={containerRef}>
            {/* Ambient Background Glow */}
            <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] bg-gradient-to-tr from-sky-100 to-blue-50 rounded-full blur-2xl -z-10" />

            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-card border border-slate-100/80 bg-slate-900 group">
              {/* Fallback Static Poster Image (Guarantees Instant LCP) */}
              <Image
                src={videoPoster || heroImage}
                alt={heroAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className={`object-cover transition-opacity duration-700 ${
                  isVideoLoaded && !hasVideoError ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Ambient Motion Video */}
              {!hasVideoError && (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={videoPoster || heroImage}
                  onLoadedData={() => setIsVideoLoaded(true)}
                  onError={() => setHasVideoError(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isVideoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  aria-label="Mulan Laundries high-capacity commercial laundry facility motion preview"
                >
                  <source src="/videos/mulan-laundry-hero.webm" type="video/webm" />
                  <source src={heroVideo} type="video/mp4" />
                </video>
              )}

              {/* Top Glass Live Tag */}
              <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001D40]/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/10 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NYC Commercial Laundry Facility</span>
              </div>

              {/* Bottom Video Floating Controls (Play/Pause & Mute) */}
              {isVideoLoaded && !hasVideoError && (
                <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center gap-2 bg-[#001D40]/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
