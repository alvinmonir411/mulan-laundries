"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  Loader2,
  ExternalLink,
  Eye,
  Type,
  Shirt,
  Sparkles,
  Phone,
  FolderUp,
  Sliders,
  CheckCircle2,
  Upload,
  Video,
  ImageIcon,
  RefreshCw
} from "lucide-react";
import { SiteSettings } from "@/lib/settingsTypes";
import { SiteImage } from "@/lib/defaultImages";

interface HomepageEditorProps {
  settings: SiteSettings;
  images: SiteImage[];
  savingSettings: boolean;
  uploadingField: string | null;
  onSettingChange: (field: keyof SiteSettings, value: string) => void;
  onSaveSettings: (sectionName: string) => Promise<void>;
  onFileUpload: (targetField: string, isSlot: boolean, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onRestoreDefaultImage: (slotKey: string, defaultUrl: string) => Promise<void>;
}

export const HomepageEditor: React.FC<HomepageEditorProps> = ({
  settings,
  images,
  savingSettings,
  uploadingField,
  onSettingChange,
  onSaveSettings,
  onFileUpload,
  onRestoreDefaultImage,
}) => {
  const [subTab, setSubTab] = useState<"hero" | "services" | "features">("hero");

  const serviceCards = [
    {
      slotKey: "service_wash_fold",
      number: "01",
      title: "Wash & Fold",
      desc: "Regular everyday laundry, whites & colors separated.",
      href: "/wash-fold",
      defaultImg: "/images/washfold.jpg",
    },
    {
      slotKey: "service_commercial",
      number: "02",
      title: "Commercial Linen",
      desc: "Hotels, restaurants, motels & commercial facilities.",
      href: "/commercial-laundry",
      defaultImg: "/images/commercial-laundry.jpg",
    },
    {
      slotKey: "service_rotary_pressing",
      number: "03",
      title: "Rotary Pressing",
      desc: "Industrial ironing for crisp bedsheets & napkins.",
      href: "/services/hotel-laundry",
      defaultImg: "/images/hotels.jpg",
    },
    {
      slotKey: "service_hospital",
      number: "04",
      title: "Hospital Laundry",
      desc: "OSHA & clinical sanitization for patient gowns & scrubs.",
      href: "/services/hospital-laundry",
      defaultImg: "/images/hospitals1.jpg",
    },
    {
      slotKey: "service_rentals",
      number: "05",
      title: "Laundry for Rentals",
      desc: "Fast turnover linens for Airbnb & rental apartments.",
      href: "/services/short-term-rentals",
      defaultImg: "/images/residential-services.jpg",
    },
    {
      slotKey: "service_special_care",
      number: "06",
      title: "Special Care Items",
      desc: "Gentle specialty care for comforters, duvets & blankets.",
      href: "/services/bed-and-breakfast",
      defaultImg: "/images/bedbreakfast.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Section Nav Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab("hero")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              subTab === "hero"
                ? "bg-[#005BD3] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Hero Headline & CTAs</span>
          </button>

          <button
            onClick={() => setSubTab("services")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              subTab === "services"
                ? "bg-[#005BD3] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>6 Services Cards</span>
          </button>

          <button
            onClick={() => setSubTab("features")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              subTab === "features"
                ? "bg-[#005BD3] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Features & Value Prop</span>
          </button>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#001D40] text-xs font-bold rounded-xl transition-all"
        >
          <span>Live Homepage</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#005BD3]" />
        </Link>
      </div>

      {/* SUB-TAB 1: HERO */}
      {subTab === "hero" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Editor */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900">
                  Hero Section Copy & Action Triggers
                </h3>
                <p className="text-xs text-slate-500">
                  Changes update the primary landing experience instantly.
                </p>
              </div>
              <button
                onClick={() => onSaveSettings("Hero Section")}
                disabled={savingSettings}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70"
              >
                {savingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Top Pill Badge
                </label>
                <input
                  type="text"
                  value={settings.hero_badge || ""}
                  onChange={(e) => onSettingChange("hero_badge", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title_line1 || ""}
                    onChange={(e) => onSettingChange("hero_title_line1", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Headline Line 2 (Accent)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title_line2 || ""}
                    onChange={(e) => onSettingChange("hero_title_line2", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settings.hero_subtitle || ""}
                  onChange={(e) => onSettingChange("hero_subtitle", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_primary || ""}
                    onChange={(e) => onSettingChange("hero_cta_primary", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_secondary || ""}
                    onChange={(e) => onSettingChange("hero_cta_secondary", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>

              {/* Hero Background Video / Media Upload & Quick Select */}
              <div className="pt-4 border-t border-slate-200 space-y-3 bg-slate-50 p-4 rounded-xl border">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#005BD3]" />
                    <span>Hero Media (Video or Image Background)</span>
                  </label>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Direct Upload or Instant Pick
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={settings.hero_video_url || "/videos/laundry-drum-washing.mp4"}
                    onChange={(e) => onSettingChange("hero_video_url", e.target.value)}
                    placeholder="/videos/laundry-drum-washing.mp4"
                    className="flex-1 px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200 bg-white focus:border-[#005BD3] outline-none shadow-sm"
                  />

                  {/* Direct Upload Button for Video / Image */}
                  <label
                    className="cursor-pointer py-2.5 px-4 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
                    title="Upload video or image from computer"
                  >
                    {uploadingField === "hero_video_url" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="video/*,image/*"
                      className="hidden"
                      disabled={uploadingField === "hero_video_url"}
                      onChange={(e) => onFileUpload("hero_video_url", false, e)}
                    />
                  </label>
                </div>

                {/* Quick Presets / Selection Pill Buttons */}
                <div>
                  <span className="block text-[11px] font-bold text-slate-600 mb-1.5">
                    Click to Use Any Laundry Media:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      {
                        label: "🌀 Drum Wash (Video)",
                        url: "/videos/laundry-drum-washing.mp4",
                        type: "video",
                      },
                      {
                        label: "🏭 Facility Machines (Video)",
                        url: "/videos/laundry-facility-machines.mp4",
                        type: "video",
                      },
                      {
                        label: "🧺 Fast Drum Loop (Video)",
                        url: "/videos/mulan-laundry-hero.mp4",
                        type: "video",
                      },
                      {
                        label: "🖼️ High-Res Laundry Poster (Image Only)",
                        url: "/images/laundry-hero-inspiration.jpg",
                        type: "image",
                      },
                      {
                        label: "🏢 Commercial Facility (Image Only)",
                        url: "/images/commercial-laundry.jpg",
                        type: "image",
                      },
                    ].map((item) => (
                      <button
                        key={item.url}
                        type="button"
                        onClick={() => onSettingChange("hero_video_url", item.url)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                          settings.hero_video_url === item.url
                            ? "bg-[#005BD3] text-white border-[#005BD3] shadow-sm font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Select or upload any video (MP4/WebM) or image (JPG/PNG). Whatever you choose will automatically be used in the full hero background.
                </p>
              </div>
            </div>
          </div>

          {/* Live Mockup Preview */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#001D40] to-[#002A5C] text-white rounded-2xl p-7 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Live Preview</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  Real-Time
                </span>
              </div>

              <span className="text-[11px] font-bold text-sky-300 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4 border border-white/10">
                {settings.hero_badge || "New York Premier Laundry & Linen"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                {settings.hero_title_line1 || "Clean Clothes,"}{" "}
                <span className="text-sky-400">{settings.hero_title_line2 || "Fresh Life!"}</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {settings.hero_subtitle || "Professional laundry & commercial linen management service with care across NYC."}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 bg-[#005BD3] text-white rounded-lg text-xs font-bold shadow">
                  {settings.hero_cta_primary || "Book a Free Pickup"}
                </div>
                <div className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg text-xs font-bold">
                  {settings.hero_cta_secondary || "How It Works"}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-slate-400">
              <span>Universal Precautions Hygiene</span>
              <span className="text-emerald-400 font-semibold">24/7 NYC Dispatch</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SERVICES 6 CARDS DIRECT UPLOAD */}
      {subTab === "services" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#001D40] to-[#005BD3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white">Homepage Services Cards (Direct Image Upload)</h2>
              <p className="text-xs text-blue-100 mt-1 max-w-2xl">
                Non-technical friendly: click any card to replace photo directly from your computer. No URLs needed.
              </p>
            </div>
            <Link
              href="/#services"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#005BD3] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0"
            >
              <span>View On Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => {
              const currentSlot = images.find((i) => i.slot_key === card.slotKey);
              const activeImg = currentSlot?.image_url || card.defaultImg;
              const isUploading = uploadingField === card.slotKey;

              return (
                <div
                  key={card.slotKey}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#005BD3] font-black text-xs flex items-center justify-center">
                        {card.number}
                      </span>
                      <h4 className="text-sm font-bold text-navy-900">{card.title}</h4>
                    </div>
                    <Link
                      href={card.href}
                      target="_blank"
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 group">
                      <Image
                        src={activeImg}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-sm text-white text-[10px] font-bold flex items-center gap-1.5 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live on Website</span>
                      </div>

                      {isUploading && (
                        <div className="absolute inset-0 bg-[#001D40]/80 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                          <span>Uploading & Updating...</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>

                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id={`hp-upload-${card.slotKey}`}
                        disabled={isUploading}
                        className="hidden"
                        onChange={(e) => onFileUpload(card.slotKey, true, e)}
                      />
                      <label
                        htmlFor={`hp-upload-${card.slotKey}`}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                          isUploading
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "bg-[#005BD3] hover:bg-[#0048A8] text-white hover:shadow"
                        }`}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving to Neon DB...</span>
                          </>
                        ) : (
                          <>
                            <FolderUp className="w-4 h-4" />
                            <span>Upload from Computer</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[150px]">{activeImg.split("/").pop()}</span>
                    <button
                      type="button"
                      onClick={() => onRestoreDefaultImage(card.slotKey, card.defaultImg)}
                      disabled={isUploading || activeImg === card.defaultImg}
                      className="font-medium text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Restore Default
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FEATURES & VALUE PROPOSITION */}
      {subTab === "features" && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Features, Hygiene Accreditations & Guarantees
              </h3>
              <p className="text-xs text-slate-500">
                Core guarantees displayed across the homepage and trust badges.
              </p>
            </div>
            <button
              onClick={() => onSaveSettings("Homepage Features")}
              disabled={savingSettings}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70"
            >
              {savingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#005BD3] flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-sm font-bold text-navy-900">Universal Precautions Hygiene</h4>
              <p className="text-xs text-slate-500">
                Strict medical-grade sanitization protocols across all healthcare, hotel, and residential textiles.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-sm font-bold text-navy-900">24/7/365 On-Demand Pickup</h4>
              <p className="text-xs text-slate-500">
                Door-to-door delivery throughout all 5 NYC boroughs: Manhattan, Brooklyn, Queens, Bronx, Staten Island.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-sm font-bold text-navy-900">Call-Based Custom Quoting</h4>
              <p className="text-xs text-slate-500">
                No rigid generic pricing packages; personalized commercial quotes matching laundry poundage & schedule.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
