"use client";

import React, { useState, useEffect } from "react";
import { Phone, Calendar, MessageSquare, X } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

interface MobileStickyCallProps {
  phone?: string;
  phoneRaw?: string;
  enabled?: boolean;
}

export const MobileStickyCall: React.FC<MobileStickyCallProps> = ({
  phone = BUSINESS_INFO.phone,
  phoneRaw = BUSINESS_INFO.phoneRaw,
  enabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling past the header (120px)
    const handleScroll = () => {
      if (window.scrollY > 120 && !dismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 120) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!enabled || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile Quick Call & Pickup"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,29,64,0.15)] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Primary Call Now Action */}
        <a
          href={`tel:${phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#005BD3] hover:bg-[#0048A8] active:scale-[0.98] text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all"
          id="mobile-sticky-call-btn"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-3 h-3 text-white animate-pulse" />
          </div>
          <span>Call: {phone}</span>
        </a>

        {/* Quick Pickup Link */}
        <a
          href="/pickup-request"
          className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white py-3 px-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
          aria-label="Book free laundry pickup"
          title="Book Free Pickup"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden xs:inline">Pickup</span>
        </a>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Dismiss quick call bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
