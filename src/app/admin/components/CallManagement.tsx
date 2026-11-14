"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Save,
  Loader2,
  Smartphone,
  Phone,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  Info
} from "lucide-react";
import { SiteSettings } from "@/lib/settingsTypes";

interface CallManagementProps {
  settings: SiteSettings;
  savingSettings: boolean;
  onSettingChange: (field: keyof SiteSettings, value: string) => void;
  onSaveSettings: (sectionName: string) => Promise<void>;
}

export const CallManagement: React.FC<CallManagementProps> = ({
  settings,
  savingSettings,
  onSettingChange,
  onSaveSettings,
}) => {
  const currentPhone = settings.phone || "(917) 365-4366";
  const currentRawPhone = settings.phone_raw || "+19173654366";

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#001D40] to-[#005BD3] rounded-2xl p-7 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call-Based Conversion Strategy</span>
          </div>
          <h2 className="text-2xl font-black text-white">Centralized Phone & Direct Dial Management</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
            Mulan operates strictly on call-based customized quotes. Updating the phone number here immediately propagates across the Top Bar, Header, Mobile Sticky Call CTA, and Footer tel: protocols.
          </p>
        </div>

        <button
          onClick={() => onSaveSettings("Call Management & Phone Sync")}
          disabled={savingSettings}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#005BD3] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0 disabled:opacity-70"
        >
          {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save & Sync All Phone Links</span>
        </button>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Phone controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Primary Dispatch Numbers & Direct Dial
              </h3>
              <p className="text-xs text-slate-500">
                Synchronized across all 33 pages in Neon Serverless DB.
              </p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
              Live Synchronized
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Display Phone Number (Formatted for Humans)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={settings.phone || ""}
                  onChange={(e) => onSettingChange("phone", e.target.value)}
                  placeholder="(917) 365-4366"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none font-bold text-navy-900"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Visible in Header, Footer, Hero CTA buttons, and Contact Cards.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Raw Tel Protocol Link (e.g., +19173654366)
              </label>
              <div className="relative">
                <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={settings.phone_raw || ""}
                  onChange={(e) => onSettingChange("phone_raw", e.target.value)}
                  placeholder="+19173654366"
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-mono rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none text-navy-900"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Used for instant smartphone one-tap dialing: <code className="text-[#005BD3] font-bold">tel:{currentRawPhone}</code>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Call-to-Action Phone Text
              </label>
              <input
                type="text"
                value={settings.call_cta_text || "Call for Custom Quote / Tailored Rates"}
                onChange={(e) => onSettingChange("call_cta_text", e.target.value)}
                placeholder="Call for Custom Quote / Tailored Rates"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Displayed next to phone buttons enforcing the strictly quote-based policy (NO pricing clutter).
              </p>
            </div>

            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#001D40]">
                <Info className="w-4 h-4 text-[#005BD3]" />
                <span>Zero ERP & No Fixed Price Policy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mulan Laundries provides customized proposals based on commercial volume, frequency, and emergency turnaround. There is strictly no fixed cart or self-checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Right Preview: Mobile Sticky Button Simulator */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#005BD3]" />
                <h3 className="text-base font-bold text-navy-900">
                  Mobile Sticky Call Simulator
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Preview</span>
            </div>

            {/* Smartphone Wireframe */}
            <div className="mx-auto w-64 bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
              <div className="bg-slate-50 rounded-[2rem] h-96 overflow-hidden flex flex-col justify-between relative border border-slate-200">
                {/* Mobile top status bar */}
                <div className="bg-slate-900 text-white px-4 py-1.5 flex justify-between items-center text-[9px] font-mono">
                  <span>9:41</span>
                  <span>5G NYC</span>
                </div>

                {/* Content mockup */}
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  <div className="w-20 h-4 bg-blue-100 rounded" />
                  <div className="w-full h-8 bg-slate-200 rounded" />
                  <div className="w-3/4 h-3 bg-slate-200 rounded" />
                  <div className="w-full h-24 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[10px] text-blue-600 font-bold">
                    Clean Clothes, Fresh Life!
                  </div>
                </div>

                {/* Sticky Mobile Floating Call Bar */}
                <div className="p-3 bg-white border-t border-slate-200 shadow-lg">
                  <a
                    href={`tel:${currentRawPhone}`}
                    className="w-full py-2.5 px-3 bg-[#005BD3] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#0048A8] transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                    <span>Call {currentPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <a
              href={`tel:${currentRawPhone}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#005BD3] hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Test Click-to-Call Link ({currentRawPhone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
