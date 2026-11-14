import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, Truck, Clock, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

interface PickupBannerProps {
  pickupImage?: string;
  pickupAlt?: string;
}

export const PickupBanner: React.FC<PickupBannerProps> = ({
  pickupImage = "/images/free-pickup.jpg",
  pickupAlt = "Mulan Laundries door to door pickup and delivery van",
}) => {
  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-90" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Door-to-Door Pickup & Delivery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Offload Your Laundry Chores & Let Mulan Handle the Rest
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              You can offload yourself with the laundry work pending at home or business and leave it upon us. We make sure that we not only provide you with quality services, but we also add to your comfort by offering door-to-door pick up and delivery services whenever you need our assistance.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Our team of committed professionals carefully wraps your cleaned linens in protective plastic bags or arranges them on hangers ready to put away. Once you place an order, you instantly receive order status updates without waiting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Pickup Within Hours Available</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Clean Poly-Wrap Packaging</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/pickup-request"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Pickup Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl transition-all backdrop-blur-sm"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call (917) 365-4366</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[380px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={pickupImage}
                alt={pickupAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-navy-900 border border-navy-800 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                Serving All 5 Boroughs
              </span>
              <p className="text-xs text-slate-300">
                Manhattan, Brooklyn, Queens, The Bronx & Staten Island routes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
