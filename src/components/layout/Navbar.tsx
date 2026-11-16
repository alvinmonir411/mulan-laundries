"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, Phone, Calendar, ArrowRight, Waves, Search } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { BUSINESS_INFO } from "@/data/business";
import { MobileMenu } from "./MobileMenu";
import { ServiceSearchBar } from "@/components/navigation/ServiceSearchBar";

interface NavbarProps {
  logoUrl?: string;
  logoAlt?: string;
  phone?: string;
  phoneRaw?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logoUrl = "/images/new-logo.webp",
  logoAlt = "Mulan Laundries",
  phone = BUSINESS_INFO.phone,
  phoneRaw = BUSINESS_INFO.phoneRaw,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          scrolled ? "shadow-md py-3 border-b border-slate-100" : "py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            >
              <div className="relative h-11 w-44 sm:h-12 sm:w-48">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links (Clean, Spacious Original Layout) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              <Link
                href="/"
                className="text-sm font-semibold text-[#005BD3] hover:text-blue-700 transition-colors"
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors py-1 focus:outline-none"
                  aria-expanded={dropdownOpen}
                >
                  <Link href="/services" className="hover:text-[#005BD3]">
                    Services
                  </Link>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#005BD3] transition-transform" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-3 mt-1 animate-in fade-in duration-150 z-50">
                    <div className="px-3 pb-2 mb-2 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Commercial & Residential Services
                      </span>
                    </div>
                    <div className="max-h-[380px] overflow-y-auto px-1 space-y-0.5">
                      <Link
                        href="/services"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg bg-blue-50/70 hover:bg-blue-100/70 transition-colors mb-1"
                      >
                        <div className="text-sm font-bold text-[#005BD3]">
                          All Services Catalog →
                        </div>
                        <div className="text-xs text-slate-500">View complete commercial & residential offerings</div>
                      </Link>
                      <Link
                        href="/wash-fold"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Residential Wash & Fold
                        </div>
                        <div className="text-xs text-slate-500">Regular washing, drying & bundling</div>
                      </Link>
                      <Link
                        href="/commercial-laundry"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Commercial Laundry Overview
                        </div>
                        <div className="text-xs text-slate-500">1,000,000+ lbs capacity & OSHA/JCAHO</div>
                      </Link>
                      <Link
                        href="/services/hotel-laundry"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Hotels & Hospitality
                        </div>
                        <div className="text-xs text-slate-500">Rotary pressing & crisp bedding</div>
                      </Link>
                      <Link
                        href="/services/hospital-laundry"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Hospital Laundry Services
                        </div>
                        <div className="text-xs text-slate-500">Universal precautions & clinical hygiene</div>
                      </Link>
                      <Link
                        href="/services/short-term-rentals"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Short-Term Rentals & Airbnb
                        </div>
                        <div className="text-xs text-slate-500">Fast guest turnovers & unit-ready sets</div>
                      </Link>
                      <Link
                        href="/services/gyms"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Gyms & Fitness Centers
                        </div>
                        <div className="text-xs text-slate-500">Towel swaps & sweat odor removal</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/how-it-works"
                className="text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors"
              >
                How It Works
              </Link>

              <Link
                href="/about"
                className="text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Search Bar + Primary CTA in Navbar */}
            <div className="hidden lg:flex items-center gap-3">
              <ServiceSearchBar variant="navbar" />

              <Link
                href="/pickup-request"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#005BD3] hover:bg-[#004BB5] text-white font-bold text-sm rounded-full shadow-sm hover:shadow transition-all shrink-0"
              >
                Book a Pickup
              </Link>
            </div>

            {/* Mobile Actions: Search Trigger, Call, Menu */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-700 hover:text-[#005BD3] hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Search services"
              >
                <Search className="w-5 h-5" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="p-2 text-[#005BD3] hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Call Mulan Laundries"
              >
                <Phone className="w-5 h-5" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
