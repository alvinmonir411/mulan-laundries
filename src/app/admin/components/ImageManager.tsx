"use client";

import React, { useState, useMemo } from "react";
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
  Info,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  X
} from "lucide-react";
import { SiteImage } from "@/lib/defaultImages";
import CLOUDINARY_MAPPINGS from "@/data/cloudinary_mappings.json";

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
  const [activeLibrarySlot, setActiveLibrarySlot] = useState<string | null>(null);
  const [librarySearch, setLibrarySearch] = useState("");
  const [showUrl, setShowUrl] = useState<Record<string, boolean>>({});
  const [copiedSlot, setCopiedSlot] = useState<string | null>(null);

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

  // Map slot_key or section into standardized categories
  const getCategory = (img: SiteImage) => {
    const s = (img.section || "").toLowerCase();
    const k = (img.slot_key || "").toLowerCase();

    if (k.includes("hero") || s === "hero") return "Homepage Hero";
    if (k.includes("about") || s === "about") return "About Us";
    if (
      k.includes("commercial") ||
      k.includes("gym") ||
      k.includes("hospital") ||
      k.includes("hotel") ||
      k.includes("school") ||
      k.includes("shelter") ||
      k.includes("health") ||
      k.includes("salon") ||
      s.includes("commercial")
    )
      return "Commercial Laundry";
    if (k.includes("wash_fold") || k.includes("rentals") || k.includes("residential") || s.includes("residential"))
      return "Residential Laundry";
    if (k.includes("service") || s === "services") return "Service Sections";
    if (k.includes("gallery")) return "Gallery";
    if (
      k.includes("banner") ||
      k.includes("promo") ||
      k.includes("pricing") ||
      k.includes("logo") ||
      s.includes("promotions") ||
      s.includes("branding") ||
      s.includes("dispatch")
    )
      return "Banners";
    return "Other";
  };

  const getDimensions = (img: SiteImage) => {
    const k = img.slot_key.toLowerCase();
    if (k.includes("hero")) return "1920 × 1080 px (16:9)";
    if (k.includes("logo")) return "400 × 120 px (SVG/WebP)";
    if (k.includes("banner") || k.includes("promo")) return "1200 × 600 px (Banner)";
    if (k.includes("facility") || k.includes("about")) return "1000 × 750 px (4:3)";
    return "800 × 600 px (Standard Card)";
  };

  // Convert cloudinary mappings into searchable library list
  const libraryAssets = useMemo(() => {
    return Object.entries(CLOUDINARY_MAPPINGS).map(([localPath, url]) => {
      const filename = localPath.split("/").pop() || "";
      const cleanName = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      return { path: localPath, url, name: cleanName, filename };
    });
  }, []);

  const filteredLibrary = useMemo(() => {
    if (!librarySearch.trim()) return libraryAssets;
    const q = librarySearch.toLowerCase();
    return libraryAssets.filter(
      (a) => a.name.toLowerCase().includes(q) || a.filename.toLowerCase().includes(q)
    );
  }, [libraryAssets, librarySearch]);

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

  const toggleUrl = (slotKey: string) => {
    setShowUrl((prev) => ({ ...prev, [slotKey]: !prev[slotKey] }));
  };

  const handlePickFromLibrary = async (slotKey: string, url: string) => {
    onImageFieldChange(slotKey, "image_url", url);
    setActiveLibrarySlot(null);
    await onSaveImageSlot(slotKey);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Direct Guidance */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-[#001D40] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-sky-300 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Visual Image Controller • No Technical URLs Required</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Visual Media Library ({images.length} Active Website Slots)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ছবি পরিবর্তন করতে কোনো লিংক বা URL দেখতে বা টাইপ করতে হবে না। যেকোনো ছবির ওপর ক্লিক করুন অথবা{" "}
              <strong className="text-white">"Change Photo"</strong> বাটনে চাপ দিয়ে আপনার কম্পিউটার থেকে ছবি সিলেক্ট করুন—স্বয়ংক্রিয়ভাবে ক্লাউডিনারিতে আপলোড হয়ে ওয়েবসাইটে বসে যাবে!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cloudinary CDN Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSection(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSection === cat
                  ? "bg-[#005BD3] text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or section..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Image Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => {
          const isSaving = savingSlot === img.slot_key;
          const isUploading = uploadingField === img.slot_key;
          const isUrlVisible = !!showUrl[img.slot_key];

          return (
            <div
              key={img.slot_key}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-subtle hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Interactive Image Preview Header */}
              <div className="relative h-56 w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                {img.image_url ? (
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No image assigned
                  </div>
                )}

                {/* Click-to-Upload Overlay */}
                <label
                  className="absolute inset-0 bg-navy-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-10 p-4 text-center backdrop-blur-xs"
                  title="Click to select new image from computer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                    <Upload className="w-6 h-6 text-sky-300" />
                  </div>
                  <span className="font-bold text-sm tracking-wide">Click to Change Image</span>
                  <span className="text-[11px] text-slate-200 mt-1 font-medium">
                    (কম্পিউটার বা ফোন থেকে ছবি সিলেক্ট করুন)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => onFileUpload(img.slot_key, true, e)}
                  />
                </label>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 bg-[#001D40]/85 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shadow pointer-events-none z-20">
                  {img.slot_key}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none z-20">
                  <span className="bg-blue-600/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase shadow">
                    {getCategory(img)}
                  </span>
                </div>

                {/* Live Active Badge on Bottom */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none z-20">
                  <div className="bg-emerald-500/95 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Live on Site</span>
                  </div>
                  <div className="bg-black/75 text-white px-2.5 py-1 rounded-full text-[10px] font-mono shadow-md">
                    {getDimensions(img)}
                  </div>
                </div>
              </div>

              {/* Card Controls */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-black text-navy-900 leading-snug">{img.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{img.section} Section Component</p>

                  {/* Primary Visual Actions: Upload New Photo OR Pick from Library */}
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <label
                      className={`cursor-pointer py-3 px-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm text-center ${
                        isUploading
                          ? "bg-blue-400 text-white"
                          : "bg-[#005BD3] hover:bg-[#004BB5] text-white hover:shadow-blue-500/25 hover:shadow-md"
                      }`}
                      title="Upload new image from your device"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Change Photo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => onFileUpload(img.slot_key, true, e)}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveLibrarySlot(img.slot_key);
                        setLibrarySearch("");
                      }}
                      className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 border border-slate-200/80 hover:border-slate-300"
                      title="Select from existing Cloudinary photos"
                    >
                      <ImageIcon className="w-4 h-4 text-[#005BD3]" />
                      <span>From Library</span>
                    </button>
                  </div>

                  {/* Google SEO Alt Text Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        Google SEO Description (Alt)
                      </label>
                      <span className="text-[10px] text-slate-400">Search ranking</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={img.alt_text}
                        onChange={(e) => onImageFieldChange(img.slot_key, "alt_text", e.target.value)}
                        placeholder="Describe what is in this photo..."
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none shadow-xs bg-slate-50/50 focus:bg-white"
                      />
                      <button
                        onClick={() => onSaveImageSlot(img.slot_key)}
                        disabled={isSaving}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs disabled:opacity-50"
                        title="Save SEO Description"
                      >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Technical Details for Power Users (Hidden by default) */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => toggleUrl(img.slot_key)}
                    className="text-[11px] font-medium text-slate-400 hover:text-slate-700 flex items-center justify-between w-full transition-colors py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Advanced: Technical CDN Link</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {isUrlVisible ? "Hide ▲" : "View ▼"}
                    </span>
                  </button>

                  {isUrlVisible && (
                    <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={img.image_url}
                          onChange={(e) => onImageFieldChange(img.slot_key, "image_url", e.target.value)}
                          className="flex-1 px-2.5 py-1.5 text-[11px] font-mono rounded-lg border border-slate-200 bg-white focus:border-[#005BD3] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof navigator !== "undefined") {
                              navigator.clipboard.writeText(img.image_url);
                              setCopiedSlot(img.slot_key);
                              setTimeout(() => setCopiedSlot(null), 2000);
                            }
                          }}
                          className="px-2.5 py-1.5 text-[11px] font-bold bg-white hover:bg-slate-100 text-navy-900 border border-slate-200 rounded-lg shrink-0 flex items-center gap-1"
                          title="Copy Link"
                        >
                          {copiedSlot === img.slot_key ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedSlot === img.slot_key ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Cloudinary CDN optimized link. Changes take effect across the entire website live.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cloudinary Media Library Modal Picker */}
      {activeLibrarySlot && (
        <div className="fixed inset-0 z-50 bg-navy-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-navy-900">
                    Pick from Cloudinary Media Library ({libraryAssets.length} Assets)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Assigning image to slot: <code className="font-bold text-[#005BD3]">{activeLibrarySlot}</code>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveLibrarySlot(null)}
                className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  placeholder="Filter images (e.g. hotel, hospital, towel, van, clean)..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Modal Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredLibrary.map((item) => (
                <div
                  key={item.path}
                  onClick={() => handlePickFromLibrary(activeLibrarySlot, item.url)}
                  className="group cursor-pointer rounded-2xl border border-slate-200/80 hover:border-[#005BD3] overflow-hidden bg-slate-50 hover:bg-blue-50/50 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="h-32 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#005BD3]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#005BD3] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
                        Use This Image
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-navy-900 truncate capitalize">{item.name}</p>
                    <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{item.filename}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Click any image to immediately assign it to this slot</span>
              <button
                type="button"
                onClick={() => setActiveLibrarySlot(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                To prevent broken layouts on the live site, active slots cannot be deleted. Instead, you can replace the photo with a new one from your computer or choose from the Media Library.
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
