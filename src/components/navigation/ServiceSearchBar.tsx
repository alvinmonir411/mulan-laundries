"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Shirt,
  Building2,
  ShieldCheck,
  Hotel,
  Home,
  Dumbbell,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Coffee,
  Truck,
  CheckCircle2
} from "lucide-react";

export interface SearchableService {
  id: string;
  title: string;
  category: string;
  badge: string;
  shortDesc: string;
  href: string;
  keywords: string[];
  iconName: string;
}

export const ALL_SEARCHABLE_SERVICES: SearchableService[] = [
  {
    id: "wash-fold",
    title: "Residential Wash & Fold",
    category: "Residential",
    badge: "Most Popular",
    shortDesc: "Whites & colors separated, hypoallergenic eco-wash, crisp fold & bundled return.",
    href: "/wash-fold",
    keywords: ["wash", "fold", "wash and fold", "clothes", "residential", "daily", "garments", "t-shirt", "bedding", "laundry"],
    iconName: "Shirt"
  },
  {
    id: "commercial-laundry",
    title: "Commercial Laundry & Linen Management",
    category: "Commercial",
    badge: "1,000,000+ Lbs/Yr",
    shortDesc: "High-capacity automated commercial processing plant for NYC enterprises.",
    href: "/commercial-laundry",
    keywords: ["commercial", "industrial", "bulk", "linen", "facility", "enterprise", "business", "volume", "par level"],
    iconName: "Building2"
  },
  {
    id: "hotel-laundry",
    title: "Hotel Laundry & Rotary Pressing",
    category: "Hospitality",
    badge: "B2B Hospitality",
    shortDesc: "Industrial rotary pressing for crisp bedsheets, duvet covers & luxury bath linens.",
    href: "/services/hotel-laundry",
    keywords: ["hotel", "motel", "hospitality", "rotary", "pressing", "iron", "bedsheet", "duvet", "linens", "pillowcase", "guest room"],
    iconName: "Hotel"
  },
  {
    id: "hospital-laundry",
    title: "Hospital & Healthcare Laundry",
    category: "Healthcare",
    badge: "OSHA & JCAHO Certified",
    shortDesc: "Universal precautions, soil-level barrier sorting & clinical sanitization for hospitals.",
    href: "/services/hospital-laundry",
    keywords: ["hospital", "clinic", "medical", "patient", "gown", "scrubs", "sanitization", "doctor", "health", "infection control", "healthcare"],
    iconName: "ShieldCheck"
  },
  {
    id: "short-term-rentals",
    title: "Short-Term Rentals & Airbnb Laundry",
    category: "Residential & B2B",
    badge: "Fast Turnover",
    shortDesc: "Rapid unit-ready turnover linens and towel sets for Airbnb and serviced apartments.",
    href: "/services/short-term-rentals",
    keywords: ["airbnb", "rental", "short term", "apartment", "turnover", "bedding", "towel", "guest", "residential building"],
    iconName: "Home"
  },
  {
    id: "gyms",
    title: "Gyms & Fitness Centers Towel Service",
    category: "Fitness & Athletics",
    badge: "Daily Towel Swaps",
    shortDesc: "Enzymatic sweat odor elimination, high-temp thermal sanitization & fresh towel swaps.",
    href: "/services/gyms",
    keywords: ["gym", "fitness", "workout", "towel", "sweat", "athletic", "crossfit", "training", "locker room"],
    iconName: "Dumbbell"
  },
  {
    id: "health-clubs",
    title: "Health Clubs & Wellness Centers",
    category: "Wellness",
    badge: "Luxury Plush",
    shortDesc: "Plush velvet bath towels, sauna wraps & hydrotherapy linen laundering.",
    href: "/services/health-clubs",
    keywords: ["health club", "wellness", "spa", "sauna", "hydrotherapy", "towel", "plush", "massage"],
    iconName: "Sparkles"
  },
  {
    id: "salons-spas",
    title: "Salons & Spas Laundry Services",
    category: "Personal Care",
    badge: "Oil & Dye Stripping",
    shortDesc: "Specialized chemistry stripping cosmetic oils & dyes, ultra-soft finish for towels.",
    href: "/services/salons-spas",
    keywords: ["salon", "spa", "massage", "facial", "towel", "oil", "dye", "hair", "beauty", "esthetician"],
    iconName: "Sparkles"
  },
  {
    id: "schools-dorms",
    title: "Schools, Colleges & Dormitories",
    category: "Education",
    badge: "Campus Logistics",
    shortDesc: "Campus bulk pickup, student dorm bedding, athletics uniforms & hypoallergenic wash.",
    href: "/services/schools-dorms",
    keywords: ["school", "college", "dorm", "dormitory", "university", "student", "campus", "athletic uniform"],
    iconName: "GraduationCap"
  },
  {
    id: "shelter-homes",
    title: "Shelter Homes & Non-Profit Facilities",
    category: "Non-Profit & Social Care",
    badge: "Community Care",
    shortDesc: "Compassionate, high-hygiene bulk linen care for shelters and charitable facilities.",
    href: "/services/shelter-homes",
    keywords: ["shelter", "non-profit", "community", "charity", "facility", "barrier wash", "bulk"],
    iconName: "HeartHandshake"
  },
  {
    id: "bed-and-breakfast",
    title: "Bed & Breakfast & Special Care Delicates",
    category: "Boutique Hospitality",
    badge: "Heirloom & Delicates",
    shortDesc: "Gentle specialty care for down comforters, duvets, blankets, quilts & luxury linens.",
    href: "/services/bed-and-breakfast",
    keywords: ["bed and breakfast", "b&b", "inn", "boutique", "comforter", "duvet", "blanket", "delicates", "quilt"],
    iconName: "Coffee"
  },
  {
    id: "pickup-request",
    title: "Book Free Pickup & Delivery",
    category: "Dispatch",
    badge: "All 5 NYC Boroughs",
    shortDesc: "Schedule fast doorstep laundry pickup in Manhattan, Brooklyn, Queens, Bronx & Staten Island.",
    href: "/pickup-request",
    keywords: ["pickup", "delivery", "book", "schedule", "free pickup", "driver", "dispatch", "order"],
    iconName: "Truck"
  }
];

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case "Shirt":
      return Shirt;
    case "Building2":
      return Building2;
    case "Hotel":
      return Hotel;
    case "ShieldCheck":
      return ShieldCheck;
    case "Home":
      return Home;
    case "Dumbbell":
      return Dumbbell;
    case "Sparkles":
      return Sparkles;
    case "GraduationCap":
      return GraduationCap;
    case "HeartHandshake":
      return HeartHandshake;
    case "Coffee":
      return Coffee;
    case "Truck":
      return Truck;
    default:
      return Shirt;
  }
}

interface ServiceSearchBarProps {
  variant?: "navbar" | "hero" | "mobile" | "modal";
  placeholder?: string;
  onSelect?: () => void;
  className?: string;
}

export const ServiceSearchBar: React.FC<ServiceSearchBarProps> = ({
  variant = "navbar",
  placeholder = "Search laundry services (e.g. Hotel, Hospital, Wash & Fold, Airbnb)...",
  onSelect,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter matching services
  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Default recommended results
      return ALL_SEARCHABLE_SERVICES.slice(0, 6);
    }
    return ALL_SEARCHABLE_SERVICES.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchCategory = item.category.toLowerCase().includes(trimmed);
      const matchDesc = item.shortDesc.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(trimmed));
      return matchTitle || matchCategory || matchDesc || matchKeywords;
    });
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex].href);
      } else if (results.length > 0) {
        handleSelect(results[0].href);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
    if (onSelect) onSelect();
    router.push(href);
  };

  const handleQuickTagClick = (tag: string) => {
    setQuery(tag);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  // 1. HERO BANNER VARIANT
  if (variant === "hero") {
    return (
      <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
        <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-2 group focus-within:ring-2 focus-within:ring-sky-400 focus-within:border-sky-400 transition-all">
          <div className="pl-3 pr-2 text-sky-600">
            <Search className="w-5 h-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search laundry services"
            className="w-full bg-transparent py-2 px-1 text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 mr-1 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              if (results.length > 0) {
                handleSelect(results[0].href);
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all shrink-0"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills underneath input */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 px-1">
          <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Popular:
          </span>
          {["Wash & Fold", "Hotel Laundry", "Hospital", "Airbnb", "Gyms", "Commercial"].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sky-100 text-xs font-medium backdrop-blur-sm transition-all"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[420px] overflow-y-auto">
            <div className="px-4 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>{query ? `Matching Services (${results.length})` : "Recommended Services"}</span>
              <span className="text-[11px] font-normal text-slate-400">Press ↑↓ to navigate, Enter to view</span>
            </div>

            {results.length === 0 ? (
              <div className="p-6 text-center text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">No matching services found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-500">
                  Need a custom commercial program? Call us at{" "}
                  <a href="tel:+19173654366" className="text-sky-600 font-bold hover:underline">
                    (917) 365-4366
                  </a>
                </p>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                {results.map((service, idx) => {
                  const Icon = getServiceIcon(service.iconName);
                  const isSelected = idx === activeIndex;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleSelect(service.href)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-sky-50 text-sky-900 ring-1 ring-sky-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">{service.title}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-700">
                            {service.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 2. NAVBAR VARIANT (DESKTOP HEADER)
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white rounded-full border border-slate-200 focus-within:border-[#005BD3] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200 w-full max-w-full sm:w-56 md:w-64 lg:w-60 xl:w-72 px-3 py-1.5">
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search services..."
          aria-label="Search laundry services"
          className="w-full bg-transparent text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[440px] overflow-y-auto">
          <div className="px-4 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>{query ? `Results (${results.length})` : "Explore Services"}</span>
            <span className="text-[10px] font-normal text-slate-400">Esc to close</span>
          </div>

          {/* Quick pills */}
          {!query && (
            <div className="px-4 pb-2.5 mb-2 border-b border-slate-100 flex flex-wrap gap-1.5">
              {["Hotel", "Hospital", "Wash & Fold", "Airbnb", "Gyms"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-[11px] font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No services found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="px-2 space-y-0.5">
              {results.map((service, idx) => {
                const Icon = getServiceIcon(service.iconName);
                const isSelected = idx === activeIndex;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelect(service.href)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50 text-blue-900 ring-1 ring-blue-200"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005BD3] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-xs text-slate-900">{service.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-600">
                          {service.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 mt-2 border-t border-slate-100 px-4 flex items-center justify-between text-[11px]">
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="text-[#005BD3] font-bold hover:underline"
            >
              View Full Catalog →
            </Link>
            <Link
              href="/pickup-request"
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-900"
            >
              Book Pickup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

