"use client";

import React, { useState } from "react";
import {
  Globe,
  Save,
  Loader2,
  ExternalLink,
  Search,
  Eye,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { SitePage } from "@/lib/cmsTypes";
import { SiteSettings } from "@/lib/settingsTypes";

interface SeoSettingsProps {
  pages: SitePage[];
  settings: SiteSettings;
  savingSettings: boolean;
  onSavePage: (page: SitePage) => Promise<void>;
  onSettingChange: (field: keyof SiteSettings, value: string) => void;
  onSaveSettings: (sectionName: string) => Promise<void>;
}

export const SeoSettings: React.FC<SeoSettingsProps> = ({
  pages,
  settings,
  savingSettings,
  onSavePage,
  onSettingChange,
  onSaveSettings,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>("/");
  const [savingPage, setSavingPage] = useState(false);
  const [pageEdits, setPageEdits] = useState<Record<string, { meta_title?: string; meta_description?: string }>>({});

  const activePage = pages.find((p) => p.slug === selectedSlug) || pages[0] || {
    slug: "/",
    title: "Homepage",
    meta_title: settings.site_title || "Mulan Laundries NYC",
    meta_description: settings.hero_subtitle || "Premier laundry and linen services in NYC.",
    status: "published",
  };

  const currentMetaTitle = pageEdits[activePage.slug]?.meta_title !== undefined
    ? pageEdits[activePage.slug].meta_title
    : (activePage.meta_title || "");

  const currentMetaDesc = pageEdits[activePage.slug]?.meta_description !== undefined
    ? pageEdits[activePage.slug].meta_description
    : (activePage.meta_description || "");

  const handleFieldChange = (field: "meta_title" | "meta_description", val: string) => {
    setPageEdits((prev) => ({
      ...prev,
      [activePage.slug]: {
        ...prev[activePage.slug],
        [field]: val,
      },
    }));
  };

  const handleSavePageSeo = async () => {
    setSavingPage(true);
    try {
      const updated: SitePage = {
        ...activePage,
        meta_title: currentMetaTitle,
        meta_description: currentMetaDesc,
      };
      await onSavePage(updated);
    } finally {
      setSavingPage(false);
    }
  };

  // Character counters
  const titleLen = currentMetaTitle?.length || 0;
  const descLen = currentMetaDesc?.length || 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#001D40] to-[#005BD3] rounded-2xl p-7 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Search Engine Optimization</span>
          </div>
          <h2 className="text-2xl font-black text-white">NYC Local SEO & Meta Tags Manager</h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
            Customize page-by-page meta titles, meta descriptions, and OpenGraph tags with live Google Search result snippet simulation.
          </p>
        </div>

        <button
          onClick={handleSavePageSeo}
          disabled={savingPage}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#005BD3] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0 disabled:opacity-70"
        >
          {savingPage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Page SEO</span>
        </button>
      </div>

      {/* Main Grid: Page Selector & Google Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Select page and edit meta */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Page to Optimize
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-bold text-navy-900 rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            >
              {pages.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title} ({p.slug})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Title Tag
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    titleLen > 60 ? "text-amber-600" : "text-slate-400"
                  }`}
                >
                  {titleLen} / 60 chars {titleLen > 60 && "(Long)"}
                </span>
              </div>
              <input
                type="text"
                value={currentMetaTitle}
                onChange={(e) => handleFieldChange("meta_title", e.target.value)}
                placeholder="e.g., Commercial Laundry Services NYC | Mulan Laundries"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Optimal length: 50–60 characters. Appears as the headline link in search results.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description Tag
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    descLen > 160 ? "text-amber-600" : "text-slate-400"
                  }`}
                >
                  {descLen} / 160 chars {descLen > 160 && "(Long)"}
                </span>
              </div>
              <textarea
                rows={4}
                value={currentMetaDesc}
                onChange={(e) => handleFieldChange("meta_description", e.target.value)}
                placeholder="Write compelling summary describing this service page in NYC..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Optimal length: 140–160 characters. Encourages click-throughs from Google searchers.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Canonical URL
              </label>
              <input
                type="text"
                disabled
                value={`https://mulanlaundries.com${activePage.slug}`}
                className="w-full px-4 py-2.5 text-xs font-mono rounded-xl bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Right Preview: Google SERP Mockup */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#005BD3]" />
              <h3 className="text-base font-bold text-navy-900">
                Google SERP Snippet Preview
              </h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Google Mobile / Desktop</span>
          </div>

          {/* Google Search Card Preview */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#001D40] text-white flex items-center justify-center text-[10px] font-bold">
                M
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block leading-tight">Mulan Laundries</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  https://mulanlaundries.com{activePage.slug}
                </span>
              </div>
            </div>

            <h4 className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug pt-1">
              {currentMetaTitle || "Mulan Laundries | NYC Commercial Laundry & Linen Management"}
            </h4>

            <p className="text-xs text-[#4d5156] leading-relaxed">
              {currentMetaDesc || "Professional commercial laundry and wash & fold delivery service across NYC. Universal precautions hygiene and 24/7 on-time delivery."}
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2 text-xs text-emerald-800">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>NYC Local SEO Checklist:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-emerald-700">
              <li>Includes primary target borough keywords (NYC, Bronx, Manhattan)</li>
              <li>Clear value proposition: Universal precautions hygiene & 24/7 service</li>
              <li>Direct call-based quoting incentive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
