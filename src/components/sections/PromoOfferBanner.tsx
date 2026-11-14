import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket, Sparkles } from "lucide-react";

interface PromoOfferBannerProps {
  promoImage?: string;
  promoAlt?: string;
}

export const PromoOfferBanner: React.FC<PromoOfferBannerProps> = ({
  promoImage = "/images/free-pickup.jpg",
  promoAlt = "Folded fresh laundry in delivery basket with fresh floral accents",
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#005BD3] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          {/* Subtle Decorative Background Bubbles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (8 cols) */}
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Time Welcome Offer</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Get 20% OFF on Your First Order
              </h2>

              <p className="text-blue-100 text-sm sm:text-base max-w-xl font-normal">
                Experience New York’s premier commercial and residential laundry service. Free door-to-door pickup & delivery across all 5 boroughs.
              </p>

              {/* Coupon Pill (Matching inspiration design) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-[#005BD3] font-bold text-sm shadow-md">
                  <Ticket className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-500 text-xs uppercase font-semibold">Use Code:</span>
                  <span className="font-mono font-black text-base text-[#005BD3]">WELCOME20</span>
                </div>

                <Link
                  href="/pickup-request"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <span>Book Pickup Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Graphic (4 cols): Basket of folded towels */}
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="relative w-56 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-white/10 backdrop-blur-sm">
                <Image
                  src={promoImage}
                  alt={promoAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
