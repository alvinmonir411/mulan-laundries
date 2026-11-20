"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  initialBadge?: string;
  initialTitle1?: string;
  initialTitle2?: string;
  initialSubtitle?: string;
  initialCtaPrimary?: string;
  initialCtaSecondary?: string;
}

const isVideoUrl = (url?: string): boolean => {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  return clean.endsWith(".mp4") || clean.endsWith(".webm") || clean.endsWith(".mov") || clean.includes("/video/upload");
};

export function HeroSliderClient({ slides, posterImg }: HeroSliderClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToSlide = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      React.startTransition(() => setCurrentSlide(next));
      setTimeout(() => setAnimating(false), 50);
    }, 400);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length, goToSlide]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
    if (currentSlide === 0) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [currentSlide]);

  const active = slides[currentSlide];

  return (
    <>
      {/* Background: all slides */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full ${
              animating ? "transition-all duration-700 ease-in-out" : ""
            } ${
              idx === currentSlide
                ? "opacity-100 scale-100 z-[1]"
                : "opacity-0 scale-[1.03] z-0 pointer-events-none"
            }`}
          >
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
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
                unoptimized={true}
                sizes="100vw"
                className="object-cover object-center"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 z-10" />
      </div>

      {/* Live badge and headline overlay (updates on slide change) */}
      <div className="absolute top-0 left-0 z-20 w-full h-full pointer-events-none">
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full h-full flex items-center">
          <div className={`max-w-3xl space-y-5 sm:space-y-6 transition-all duration-500 ease-in-out ${animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}>
            <div className="h-8" />
            <div className="min-h-[80px] sm:min-h-[110px] lg:min-h-[140px] flex flex-col justify-center">
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-lg">{active.headlineLine1}</span>
              <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">{active.headlineLine2}</span>
            </div>
            <div className="min-h-[56px] sm:min-h-[64px] flex items-center">
              <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl leading-relaxed font-normal drop-shadow-md line-clamp-2 sm:line-clamp-none">{active.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dot + Arrow controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:right-6 z-30 flex items-center gap-3">
        <button onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)} aria-label="Previous slide" className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => goToSlide((currentSlide + 1) % slides.length)} aria-label="Next slide" className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/20 transition-all backdrop-blur-md">
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 sm:ml-1 bg-black/40 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-full border border-white/15 sm:border-none">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} aria-label={`Go to slide ${i + 1}`} className="p-1.5 min-w-[28px] min-h-[36px] flex items-center justify-center focus:outline-none">
              <span className={`h-2 rounded-full transition-all duration-500 block ${i === currentSlide ? "w-6 sm:w-7 bg-sky-400 shadow-md" : "w-2 bg-white/40 hover:bg-white/60"}`} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
