"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Calendar, ArrowRight, X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { BUSINESS_INFO } from "@/data/business";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [commercialOpen, setCommercialOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <span className="font-bold text-lg text-navy-900 tracking-tight">
              Mulan Laundries
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 space-y-1">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="py-2">
                    <button
                      onClick={() => setCommercialOpen(!commercialOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-navy-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          commercialOpen ? "rotate-180 text-sky-600" : ""
                        }`}
                      />
                    </button>
                    {commercialOpen && (
                      <div className="mt-2 pl-4 space-y-1 border-l-2 border-sky-100">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={onClose}
                            className="block px-3 py-2 text-sm text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 rounded-md transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-base font-semibold text-navy-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
          <Link
            href="/pickup-request"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-sky-600 text-white font-semibold rounded-lg shadow-sm hover:bg-sky-700 transition-colors text-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>SCHEDULE PICKUP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-slate-200 text-navy-900 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <div className="text-center text-xs text-slate-500 pt-2">
            24/7 Service • All 5 NYC Boroughs
          </div>
        </div>
      </div>
    </div>
  );
};
