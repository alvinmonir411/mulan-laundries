"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Search,
  Upload,
  Save,
  Loader2,
  Trash2,
  AlertTriangle,
  FolderUp,
  CheckCircle2,
  Tag,
  Eye,
  Info
} from "lucide-react";
import { SiteImage } from "@/lib/defaultImages";

interface ImageManagerProps {
  images: SiteImage[];
  savingSlot: string | null;
  uploadingField: string | null;
  onImageFieldChange: (slotKey: string, field: "image_url" | "alt_text", value: string) => void;
  onSaveImageSlot: (slotKey: string) => Promise<void>;
  onFileUpload: (targetField: string, isSlot: boolean, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ImageManager: React.FC<ImageManagerProps> = ({
  images,
  savingSlot,
  uploadingField,
  onImageFieldChange,
  onSaveImageSlot,
  onFileUpload,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [safeDeleteTarget, setSafeDeleteTarget] = useState<SiteImage | null>(null);

  const categories = [
    "All",
    "Homepage Hero",
    "About Us",
    "Commercial Laundry",
    "Residential Laundry",
    "Service Sections",
    "Gallery",
    "Banners",
    "Other",
  ];

  // Map slot_key or section into the 8 standardized categories
  const getCategory = (img: SiteImage) => {
    const s = (img.section || "").toLowerCase();
    const k = (img.slot_key || "").toLowerCase();

    if (k.includes("hero") || s === "hero") return "Homepage Hero";
    if (k.includes("about") || s === "about") return "About Us";
    if (k.includes("commercial") || k.includes("gym") || k.includes("hospital") || k.includes("hotel") || k.includes("school") || k.includes("shelter") || k.includes("health") || k.includes("salon") || s.includes("commercial")) return "Commercial Laundry";
    if (k.includes("wash_fold") || k.includes("rentals") || k.includes("residential") || s.includes("residential")) return "Residential Laundry";
    if (k.includes("service") || s === "services") return "Service Sections";
    if (k.includes("gallery")) return "Gallery";
    if (k.includes("banner") || k.includes("promo") || k.includes("pricing") || k.includes("logo") || s.includes("promotions") || s.includes("branding") || s.includes("dispatch")) return "Banners";
    return "Other";
  };

  // Dimensions lookup helper
  const getDimensions = (img: SiteImage) => {
    const k = img.slot_key.toLowerCase();
    if (k.includes("hero")) return "1920 × 1080 px (16:9)";
    if (k.includes("logo")) return "400 × 120 px (SVG/WebP)";
    if (k.includes("banner") || k.includes("promo")) return "1200 × 600 px (Banner)";
    if (k.includes("facility") || k.includes("about")) return "1000 × 750 px (4:3)";
    return "800 × 600 px (Standard Card)";
  };

  const filteredImages = images.filter((img) => {
    const cat = getCategory(img);
    const matchCategory = selectedSection === "All" || cat === selectedSection || img.section === selectedSection;
    const matchQ =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.slot_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQ;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 tracking-tight">
                Visual Media Library ({images.length} Dynamic Image Slots)
              </h2>
              <p className="text-xs text-slate-500">
                Direct computer file upload, instant Cloudinary CDN delivery, alt-text accessibility editor, and safe-deletion guards.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cloudinary CDN & Local Sync Active</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSection(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedSection === cat
                  ? "bg-[#005BD3] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search image slot..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
          />
        </div>
      </div>

      {/* Image Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => {
          const isSaving = savingSlot === img.slot_key;
          const isUploading = uploadingField === img.slot_key;

          return (
            <div
              key={img.slot_key}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              {/* Image Preview Header */}
              <div className="relative h-48 w-full bg-slate-100 border-b border-slate-100 group">
                {img.image_url ? (
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No image
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-[#001D40]/80 text-white backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow">
                  {img.slot_key}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="bg-blue-600/90 text-white backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow">
                    {getCategory(img)}
                  </span>
                  <span className="bg-white/95 text-navy-900 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow">
                    {img.section}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <div className="bg-emerald-500/95 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>In Active Use</span>
                  </div>
                  <div className="bg-black/75 text-white px-2 py-0.5 rounded text-[10px] font-mono shadow">
                    {getDimensions(img)}
                  </div>
                </div>
              </div>

              {/* Inputs & Controls */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-navy-900 mb-2">{img.title}</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Image URL / Cloudinary CDN Link
                      </label>
                      <input
                        type="text"
                        value={img.image_url}
                        onChange={(e) => onImageFieldChange(img.slot_key, "image_url", e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 focus:border-[#005BD3] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Alt Accessibility Description (SEO)
                      </label>
                      <input
                        type="text"
                        value={img.alt_text}
                        onChange={(e) => onImageFieldChange(img.slot_key, "alt_text", e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-[#005BD3] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Direct Upload & Safe Guard Actions */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSaveImageSlot(img.slot_key)}
                      disabled={isSaving}
                      className="flex-1 py-2.5 px-3 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 shadow-sm"
                    >
                      {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Slot</span>
                    </button>

                    <label
                      className="cursor-pointer py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-[#005BD3] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 border border-blue-200"
                      title="Upload new image from computer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? "..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFileUpload(img.slot_key, true, e)}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setSafeDeleteTarget(img)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                      title="Safe Delete Guard"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe Deletion Guard Modal */}
      {safeDeleteTarget && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-navy-900">
                Safe-Delete Protection Guard
              </h3>
              <p className="text-xs text-slate-500">
                This image slot (<code className="text-[#005BD3] font-bold">{safeDeleteTarget.slot_key}</code>) is actively rendered on the live website.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div><strong>Slot Title:</strong> {safeDeleteTarget.title}</div>
              <div><strong>Section:</strong> {safeDeleteTarget.section}</div>
              <p className="text-[11px] text-slate-500 pt-1">
                To prevent broken layouts on the live site, active slots cannot be deleted. Instead, you can replace the photo with a new one from your computer or restore the default asset.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSafeDeleteTarget(null)}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
