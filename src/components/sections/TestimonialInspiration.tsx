"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { SiteTestimonial } from "@/lib/cmsTypes";

interface TestimonialInspirationProps {
  testimonials?: SiteTestimonial[];
  googleMapsUrl?: string;
}

const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/place/Mulan+Laundries/@40.7911231,-73.9454053,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2590b25cfa8d3:0x79bbf3629678f0e2!8m2!3d40.7911231!4d-73.9454053!16s%2Fg%2F11pprs7bcr";

export const TestimonialInspiration: React.FC<TestimonialInspirationProps> = ({
  testimonials = [],
  googleMapsUrl = DEFAULT_MAPS_URL,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activeReviews = (testimonials || []).filter((t) => t.active);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [activeReviews.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#005BD3] uppercase tracking-wider mb-3">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </span>
              <span>Google Maps Verified Reviews</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              What NYC Clients Say on Google
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Authentic reviews from NYC hotels, clinics, fitness centers, Airbnb hosts, and residential customers.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white border-slate-300 text-slate-800 hover:border-[#005BD3] hover:text-[#005BD3] shadow-sm hover:shadow"
                  : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
              }`}
              aria-label="Previous Google reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white border-slate-300 text-slate-800 hover:border-[#005BD3] hover:text-[#005BD3] shadow-sm hover:shadow"
                  : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
              }`}
              aria-label="Next Google reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Slider Cards Row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeReviews.map((r, i) => (
            <div
              key={r.id || i}
              className="w-[310px] sm:w-[350px] shrink-0 snap-start bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars + Source Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    {r.source || "Google Review"}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{r.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </p>
                  <span className="text-[11px] text-slate-500 block truncate max-w-[210px] mt-0.5">
                    {r.role}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-50 text-[#005BD3] flex items-center justify-center text-xs font-bold shrink-0">
                  {r.author.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
