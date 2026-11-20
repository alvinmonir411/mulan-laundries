import React from "react";
import { Truck, Clock, Leaf, Headphones, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

interface TopBarProps {
  phone?: string;
  phoneRaw?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  phone = BUSINESS_INFO.phone,
  phoneRaw = BUSINESS_INFO.phoneRaw,
}) => {
  return (
    <div className="hidden md:block bg-[#005BD3] text-white text-xs py-2 px-4 border-b border-blue-400/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: 3 Value Proposition Badges */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-1.5 font-medium">
            <Truck className="w-3.5 h-3.5 text-blue-200" />
            <span>Free Pickup & Delivery in NYC</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-blue-200" />
            <span>Express Delivery in 24 Hours</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>Eco Friendly ECOS Cleaning</span>
          </div>
        </div>

        {/* Right: Customer Support Phone */}
        <div className="flex items-center gap-2">
          <Headphones className="w-3.5 h-3.5 text-blue-200" />
          <span className="text-blue-100 hidden sm:inline">Customer Support:</span>
          <a
            href={`tel:${phoneRaw}`}
            className="font-bold text-white hover:text-blue-100 transition-colors inline-flex items-center gap-1"
          >
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
