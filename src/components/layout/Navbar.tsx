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
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [commercialDropdownOpen, setCommercialDropdownOpen] = useState(false);

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
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/"
                className="text-sm font-semibold text-[#005BD3] hover:text-blue-700 transition-colors"
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors py-1 focus:outline-none"
                  aria-expanded={servicesDropdownOpen}
                >
                  <Link href="/services" className="hover:text-[#005BD3]">
                    Services
                  </Link>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-3 mt-1 animate-in fade-in duration-150 z-50">
                    <div className="px-3 pb-2 mb-2 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        All Laundry Services
                      </span>
                    </div>
                    <div className="max-h-[380px] overflow-y-auto px-1 space-y-0.5">
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg bg-blue-50/70 hover:bg-blue-100/70 transition-colors mb-1"
                      >
                        <div className="text-sm font-bold text-[#005BD3]">
                          All Services Catalog →
                        </div>
                        <div className="text-xs text-slate-500">View complete commercial & residential offerings</div>
                      </Link>
                      <Link
                        href="/wash-fold"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Residential Wash & Fold
                        </div>
                        <div className="text-xs text-slate-500">Regular washing, drying & bundling</div>
                      </Link>
                      <Link
                        href="/commercial-laundry"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-sm font-semibold text-slate-800 hover:text-[#005BD3]">
                          Commercial Laundry Overview
                        </div>
                        <div className="text-xs text-slate-500">1,000,000+ lbs capacity & OSHA/JCAHO</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Wash & Fold Link */}
              <Link
                href="/wash-fold"
                className="text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors whitespace-nowrap"
              >
                Wash & Fold
              </Link>

              {/* Commercial Laundry Dropdown (Commercial Service Divisions) */}
              <div
                className="relative"
                onMouseEnter={() => setCommercialDropdownOpen(true)}
                onMouseLeave={() => setCommercialDropdownOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-[#005BD3] transition-colors py-1 focus:outline-none"
                  aria-expanded={commercialDropdownOpen}
                >
                  <Link href="/commercial-laundry" className="hover:text-[#005BD3] whitespace-nowrap">
                    Commercial Laundry
                  </Link>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
                </button>

                {commercialDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 py-3 mt-1 animate-in fade-in duration-150 z-50">
                    <div className="px-4 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Commercial Service Divisions
                      </span>
                      <Link
                        href="/commercial-laundry"
                        onClick={() => setCommercialDropdownOpen(false)}
                        className="text-[11px] font-bold text-[#005BD3] hover:underline"
                      >
                        Overview →
                      </Link>
                    </div>
                    <div className="max-h-[420px] overflow-y-auto px-1.5 space-y-0.5">
                      <Link
                        href="/commercial-laundry"
                        onClick={() => setCommercialDropdownOpen(false)}
                        className="block px-3 py-2 rounded-lg bg-blue-50/70 hover:bg-blue-100/70 transition-colors mb-1"
                      >
                        <div className="text-sm font-bold text-[#005BD3]">
                          Commercial Hub Overview →
                        </div>
                        <div className="text-xs text-slate-500">1,000,000+ lbs capacity & institutional coverage</div>
                      </Link>

                      {[
                        { name: "Hospital Laundry Services", href: "/services/hospital-laundry", desc: "Universal precautions & clinical hygiene" },
                        { name: "Short-Term Residential & Airbnb", href: "/services/short-term-rentals", desc: "Fast guest turnovers & unit-ready bundles" },
                        { name: "Hotels & Hospitality Laundry", href: "/services/hotel-laundry", desc: "Rotary pressing & crisp bedding" },
                        { name: "Gyms & Fitness Centers", href: "/services/gyms", desc: "Towel swaps & sweat odor removal" },
                        { name: "Health Clubs & Wellness", href: "/services/health-clubs", desc: "Plush spa towels & sauna sheets" },
                        { name: "Salons & Spas Laundry", href: "/services/salons-spas", desc: "Bleach-safe & massage oil care" },
                        { name: "Schools & Dorms Laundry", href: "/services/schools-dorms", desc: "Student dorm bundles & campus linen" },
                        { name: "Shelter Homes & Facilities", href: "/services/shelter-homes", desc: "High-volume institutional washing" },
                        { name: "Bed & Breakfast Laundry", href: "/services/bed-and-breakfast", desc: "Delicate heirloom & fine cotton care" },
                      ].map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setCommercialDropdownOpen(false)}
                          className="block px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-[#005BD3]">
                            {subItem.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {subItem.desc}
                          </div>
                        </Link>
                      ))}
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
