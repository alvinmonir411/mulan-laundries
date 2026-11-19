"use client";

import React, { useState } from "react";
import {
  Settings,
  Save,
  Loader2,
  Upload,
  Database,
  CloudLightning,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  RefreshCw,
  Server,
  FolderUp,
  CheckCircle2
} from "lucide-react";
import { SiteSettings } from "@/lib/settingsTypes";

interface WebsiteSettingsProps {
  settings: SiteSettings;
  savingSettings: boolean;
  uploadingField: string | null;
  dbStatus: { connected: boolean; provider: string; message: string };
  customDbUrl: string;
  testingDb: boolean;
  dbTestResult: string | null;
  onSettingChange: (field: keyof SiteSettings, value: string) => void;
  onSaveSettings: (sectionName: string) => Promise<void>;
  onFileUpload: (targetField: string, isSlot: boolean, e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onCustomDbUrlChange: (url: string) => void;
  onTestNeonDb: (e: React.FormEvent) => Promise<void>;
  onPurgeAllCaches: () => Promise<void>;
}

export const WebsiteSettings: React.FC<WebsiteSettingsProps> = ({
  settings,
  savingSettings,
  uploadingField,
  dbStatus,
  customDbUrl,
  testingDb,
  dbTestResult,
  onSettingChange,
  onSaveSettings,
  onFileUpload,
  onCustomDbUrlChange,
  onTestNeonDb,
  onPurgeAllCaches,
}) => {
  const [showUrl, setShowUrl] = useState<Record<string, boolean>>({});
  const toggleUrl = (k: string) => setShowUrl((p) => ({ ...p, [k]: !p[k] }));
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 tracking-tight">
                Website Settings & Infrastructure
              </h2>
              <p className="text-xs text-slate-500">
                General branding, logos, operating hours, dispatch addresses, and cloud database controls.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onSaveSettings("General Website Settings")}
          disabled={savingSettings}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0 disabled:opacity-70"
        >
          {savingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Save All Settings</span>
        </button>
      </div>

      {/* 1. BRANDING & LOGOS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-navy-900">
              Brand Identity: Header Logo, Footer Logo & Favicon
            </h3>
            <p className="text-xs text-slate-500">
              Upload graphics directly from your computer. Changes reflect on navigation bars and tabs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Header Logo */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Header Brand Logo
              </span>
              <p className="text-[11px] text-slate-500 mb-3">
                Displayed on the light top navigation bar.
              </p>

              <div className="relative h-24 w-full bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 mb-3">
                {settings.logo_header ? (
                  <img
                    src={settings.logo_header}
                    alt="Header Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo</span>
                )}
              </div>

              {/* Collapsible CDN Link */}
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleUrl("logo_header")}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center justify-between w-full py-1"
                >
                  <span>⚙️ Advanced: CDN Link</span>
                  <span>{showUrl.logo_header ? "Hide ▲" : "View ▼"}</span>
                </button>
                {showUrl.logo_header && (
                  <input
                    type="text"
                    value={settings.logo_header || ""}
                    onChange={(e) => onSettingChange("logo_header", e.target.value)}
                    placeholder="/images/new-logo.webp"
                    className="w-full px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-200 outline-none focus:border-[#005BD3] mt-1"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="cursor-pointer w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#005BD3]" />
                <span>{uploadingField === "logo_header" ? "Uploading..." : "Upload New Header Logo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFileUpload("logo_header", false, e)}
                />
              </label>
            </div>
          </div>

          {/* Footer Logo */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Footer Brand Logo
              </span>
              <p className="text-[11px] text-slate-500 mb-3">
                Optimized for the dark navy footer.
              </p>

              <div className="relative h-24 w-full bg-[#001D40] rounded-xl border border-blue-900 flex items-center justify-center p-2 mb-3">
                {settings.logo_footer ? (
                  <img
                    src={settings.logo_footer}
                    alt="Footer Logo"
                    className="max-h-full max-w-full object-contain filter brightness-0 invert"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo</span>
                )}
              </div>

              {/* Collapsible CDN Link */}
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleUrl("logo_footer")}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center justify-between w-full py-1"
                >
                  <span>⚙️ Advanced: CDN Link</span>
                  <span>{showUrl.logo_footer ? "Hide ▲" : "View ▼"}</span>
                </button>
                {showUrl.logo_footer && (
                  <input
                    type="text"
                    value={settings.logo_footer || ""}
                    onChange={(e) => onSettingChange("logo_footer", e.target.value)}
                    placeholder="/images/new-logo-footer1.webp"
                    className="w-full px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-200 outline-none focus:border-[#005BD3] mt-1"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="cursor-pointer w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#005BD3]" />
                <span>{uploadingField === "logo_footer" ? "Uploading..." : "Upload New Footer Logo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFileUpload("logo_footer", false, e)}
                />
              </label>
            </div>
          </div>

          {/* Browser Favicon */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Browser Tab Favicon
              </span>
              <p className="text-[11px] text-slate-500 mb-3">
                Displayed as the browser icon.
              </p>

              <div className="relative h-24 w-full bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 mb-3">
                {settings.favicon_url ? (
                  <img
                    src={settings.favicon_url}
                    alt="Favicon"
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No icon</span>
                )}
              </div>

              {/* Collapsible CDN Link */}
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleUrl("favicon_url")}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center justify-between w-full py-1"
                >
                  <span>⚙️ Advanced: CDN Link</span>
                  <span>{showUrl.favicon_url ? "Hide ▲" : "View ▼"}</span>
                </button>
                {showUrl.favicon_url && (
                  <input
                    type="text"
                    value={settings.favicon_url || ""}
                    onChange={(e) => onSettingChange("favicon_url", e.target.value)}
                    placeholder="/images/new-logo.webp"
                    className="w-full px-2.5 py-1 text-[11px] font-mono rounded-lg border border-slate-200 outline-none focus:border-[#005BD3] mt-1"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="cursor-pointer w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#005BD3]" />
                <span>{uploadingField === "favicon_url" ? "Uploading..." : "Upload New Favicon"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFileUpload("favicon_url", false, e)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BUSINESS DETAILS & DISPATCH */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-navy-900">
              Business Information, Headquarters & Operating Hours
            </h3>
            <p className="text-xs text-slate-500">
              Contact points synchronized across top bar, footer, and schema.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Customer Support Phone
            </label>
            <input
              type="text"
              value={settings.phone || ""}
              onChange={(e) => onSettingChange("phone", e.target.value)}
              placeholder="(917) 365-4366"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Primary Inquiries Email
            </label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => onSettingChange("email", e.target.value)}
              placeholder="mulanlaundries@gmail.com"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Headquarters Facility Address
            </label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => onSettingChange("address", e.target.value)}
              placeholder="New York City, Bronx, NY"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Operating Schedule & Working Hours
            </label>
            <input
              type="text"
              value={settings.operating_hours || ""}
              onChange={(e) => onSettingChange("operating_hours", e.target.value)}
              placeholder="24 Hours a Day / 7 Days a Week"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. NEON POSTGRESQL & SYSTEM CACHE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-subtle space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900">
                Neon Serverless PostgreSQL Database & Cache
              </h3>
              <p className="text-xs text-slate-500">
                Connection Status: <strong>{dbStatus.message}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onPurgeAllCaches}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Purge Site Cache</span>
          </button>
        </div>

        <form onSubmit={onTestNeonDb} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Neon Connection String (DATABASE_URL)
            </label>
            <input
              type="password"
              value={customDbUrl}
              onChange={(e) => onCustomDbUrlChange(e.target.value)}
              placeholder="postgresql://neondb_owner:***@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require"
              className="w-full px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Dual-persistence: Neon live PostgreSQL 18 with local JSON fallback in <code className="text-[#005BD3]">src/data/</code>.
            </p>
          </div>

          {dbTestResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-800">
              {dbTestResult}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={testingDb}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70"
            >
              {testingDb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5" />}
              <span>Test Neon DB Connection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
