"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Database,
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  Save,
  Search,
  Filter,
  Layers,
  Sparkles,
  Server,
  KeyRound,
  Eye,
  Check,
  LayoutDashboard,
  Type,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogOut,
  Lock,
  Globe,
  Settings,
  ShieldCheck,
  ChevronRight,
  Sliders,
  CloudLightning,
  Sparkle,
  FileCheck,
  MessageSquare,
  Inbox,
  Calendar,
  User,
  Tag,
  Trash2,
  PhoneCall,
  MailCheck,
  MessageCircle,
  Clock4,
  Shirt,
  FolderUp,
  CheckCheck,
  Star,
  HelpCircle
} from "lucide-react";
import { SiteImage } from "@/lib/defaultImages";
import { SiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/settingsTypes";
import { ContactSubmission } from "@/lib/submissionTypes";
import { SiteTestimonial, SiteFaq, SitePage } from "@/lib/cmsTypes";

// Specialized Sub-Components for 9 Modules
import { HomepageEditor } from "./components/HomepageEditor";
import { PagesManagement } from "./components/PagesManagement";
import { ImageManager } from "./components/ImageManager";
import { CallManagement } from "./components/CallManagement";
import { TestimonialsManager } from "./components/TestimonialsManager";
import { FaqManager } from "./components/FaqManager";
import { SeoSettings } from "./components/SeoSettings";
import { WebsiteSettings } from "./components/WebsiteSettings";
import { AllLeadsPage } from "./components/AllLeadsPage";

export type TabType =
  | "overview"
  | "leads"
  | "homepage"
  | "pages"
  | "images"
  | "calls"
  | "testimonials"
  | "faqs"
  | "seo"
  | "settings";

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Site Settings & Images State
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [pages, setPages] = useState<SitePage[]>([]);
  const [testimonials, setTestimonials] = useState<SiteTestimonial[]>([]);
  const [faqs, setFaqs] = useState<SiteFaq[]>([]);

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);

  // Notification Toasts
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Neon DB state
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; provider: string; message: string }>({
    connected: false,
    provider: "local_fallback",
    message: "Checking database status...",
  });
  const [customDbUrl, setCustomDbUrl] = useState("");
  const [testingDb, setTestingDb] = useState(false);
  const [dbTestResult, setDbTestResult] = useState<string | null>(null);

  // Check login state on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("mulan_admin_session");
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
    setAuthChecking(false);
  }, []);

  // Fetch initial data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Images
      const imgRes = await fetch("/api/admin/images");
      const imgData = await imgRes.json();
      if (imgData.success) {
        setImages(imgData.images || []);
        if (imgData.dbStatus) setDbStatus(imgData.dbStatus);
      }

      // 2. Fetch Settings
      const setRes = await fetch("/api/admin/settings");
      const setData = await setRes.json();
      if (setData.success) {
        setSettings(setData.settings || DEFAULT_SITE_SETTINGS);
      }

      // 3. Fetch Client Inquiries & Submissions
      const subRes = await fetch("/api/admin/submissions");
      const subData = await subRes.json();
      if (subData.success) {
        setSubmissions(subData.submissions || []);
      }

      // 4. Fetch Pages
      const pageRes = await fetch("/api/admin/pages");
      const pageData = await pageRes.json();
      if (pageData.success) {
        setPages(pageData.pages || []);
      }

      // 5. Fetch Testimonials
      const testRes = await fetch("/api/admin/testimonials");
      const testData = await testRes.json();
      if (testData.success) {
        setTestimonials(testData.testimonials || []);
      }

      // 6. Fetch FAQs
      const faqRes = await fetch("/api/admin/faqs");
      const faqData = await faqRes.json();
      if (faqData.success) {
        setFaqs(faqData.faqs || []);
      }
    } catch (err: any) {
      console.error("[DASHBOARD LOAD ERROR]", err);
      setErrorMessage("Error loading dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const refreshSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        setSuccessMessage("Inquiries refreshed from Neon DB!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (e) {
      setErrorMessage("Failed to refresh submissions");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleUpdateSubmissionStatus = async (
    reference_id: string,
    newStatus: ContactSubmission["status"]
  ) => {
    setUpdatingRef(reference_id);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference_id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.reference_id === reference_id ? { ...s, status: newStatus } : s))
        );
        setSuccessMessage(`✓ Status for ${reference_id} changed to "${newStatus}"!`);
        setTimeout(() => setSuccessMessage(null), 3500);
      } else {
        setErrorMessage(data.error || "Failed to update status");
      }
    } catch (e) {
      setErrorMessage("Network error updating status");
    } finally {
      setUpdatingRef(null);
    }
  };

  const refreshPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (data.success) setPages(data.pages || []);
    } catch (e) {}
  };

  const refreshFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success) setFaqs(data.faqs || []);
    } catch (e) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Auth Submit Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("mulan_admin_session", "authenticated");
        setSuccessMessage("Welcome back, Administrator! Control Panel Unlocked.");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setLoginError(data.error || "Invalid email or password.");
      }
    } catch (err: any) {
      setLoginError("Failed to reach authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (e) {}
    localStorage.removeItem("mulan_admin_session");
    setIsAuthenticated(false);
    setLoginPassword("");
  };

  // Setting Change Handlers
  const handleSettingChange = (field: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async (sectionName: string) => {
    setSavingSettings(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSettings(data.settings);
        setSuccessMessage(`✓ ${sectionName} updated successfully in Neon DB! Cache purged live.`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(data.error || `Failed to update ${sectionName}.`);
      }
    } catch (err: any) {
      setErrorMessage("Error communicating with settings API.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Image Slot Handlers
  const handleImageFieldChange = (slotKey: string, field: "image_url" | "alt_text", value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.slot_key === slotKey ? { ...img, [field]: value } : img))
    );
  };

  const handleSaveImageSlot = async (slotKey: string) => {
    const slot = images.find((i) => i.slot_key === slotKey);
    if (!slot) return;

    setSavingSlot(slotKey);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotKey: slot.slot_key,
          imageUrl: slot.image_url,
          altText: slot.alt_text,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(`✓ Slot '${slot.title}' updated in Neon DB! Website re-rendered.`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(data.error || "Failed to update image slot.");
      }
    } catch (err: any) {
      setErrorMessage("Error communicating with image update API.");
    } finally {
      setSavingSlot(null);
    }
  };

  const handleRestoreDefaultImage = async (slotKey: string, defaultUrl: string) => {
    handleImageFieldChange(slotKey, "image_url", defaultUrl);
    setSavingSlot(slotKey);
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotKey, imageUrl: defaultUrl }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`✓ Image slot restored to default photo in Neon DB!`);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to restore default image.");
      }
    } catch (e) {
      setErrorMessage("Failed to restore default image.");
    } finally {
      setSavingSlot(null);
    }
  };

  // File Upload Handler (Cloudinary + Local)
  const handleFileUpload = async (
    targetField: string,
    isSlot: boolean,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(targetField);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const uploadedUrl = data.url;

        if (isSlot) {
          handleImageFieldChange(targetField, "image_url", uploadedUrl);
          await fetch("/api/admin/images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slotKey: targetField,
              imageUrl: uploadedUrl,
            }),
          });
        } else {
          handleSettingChange(targetField as keyof SiteSettings, uploadedUrl);
          await fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              settings: { [targetField]: uploadedUrl },
            }),
          });
        }

        setSuccessMessage(`✓ Uploaded (${data.provider || "CDN"}) & live triggered!`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(data.error || "File upload failed.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Error uploading image file.");
    } finally {
      setUploadingField(null);
    }
  };

  // Pages CRUD
  const handleSavePage = async (page: SitePage) => {
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPages((prev) => prev.map((p) => (p.slug === page.slug ? data.page : p)));
        setSuccessMessage(`✓ Page '${page.title}' updated successfully!`);
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to update page");
      }
    } catch (e) {
      setErrorMessage("Error updating page");
    }
  };

  // Testimonials CRUD
  const handleSaveTestimonial = async (item: SiteTestimonial) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (item.id) {
          setTestimonials((prev) => prev.map((t) => (t.id === item.id ? data.testimonial : t)));
        } else {
          setTestimonials((prev) => [...prev, data.testimonial]);
        }
        setSuccessMessage("✓ Testimonial saved successfully!");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to save testimonial");
      }
    } catch (e) {
      setErrorMessage("Error saving testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setSuccessMessage("✓ Testimonial deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to delete testimonial");
      }
    } catch (e) {
      setErrorMessage("Error deleting testimonial");
    }
  };

  // FAQs CRUD
  const handleSaveFaq = async (faq: SiteFaq) => {
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (faq.id) {
          setFaqs((prev) => prev.map((f) => (f.id === faq.id ? data.faq : f)));
        } else {
          setFaqs((prev) => [...prev, data.faq]);
        }
        setSuccessMessage("✓ FAQ saved successfully!");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to save FAQ");
      }
    } catch (e) {
      setErrorMessage("Error saving FAQ");
    }
  };

  const handleDeleteFaq = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setSuccessMessage("✓ FAQ deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(data.error || "Failed to delete FAQ");
      }
    } catch (e) {
      setErrorMessage("Error deleting FAQ");
    }
  };

  // Test Neon DB connection
  const handleTestNeonDb = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestingDb(true);
    setDbTestResult(null);

    try {
      const res = await fetch("/api/admin/test-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          databaseUrl: customDbUrl,
          saveToEnv: true,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setDbTestResult(`✓ ${data.message}`);
        setDbStatus({
          connected: true,
          provider: "neon",
          message: data.message,
        });
        loadDashboardData();
      } else {
        setDbTestResult(`✗ ${data.error || "Connection failed"}`);
      }
    } catch (err: any) {
      setDbTestResult("✗ Network error testing Neon DB");
    } finally {
      setTestingDb(false);
    }
  };

  // Cache Purge
  const handlePurgeAllCaches = async () => {
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      setSuccessMessage("✓ Purged Next.js tags 'site-settings', 'site-images', 'site-pages'. Refreshed!");
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      setErrorMessage("Error purging cache.");
    }
  };

  // If loading session
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#005BD3]" />
      </div>
    );
  }

  // LOGIN SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00142D] via-[#0A192F] to-[#00224D] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#00224D] p-8 text-center text-white relative">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#005BD3] flex items-center justify-center shadow-lg border border-blue-400/30">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white">
              Mulan Laundries Admin
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              Secure Cloud Control Panel & Content Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold">{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@gmail.com"
                required
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter 5-digit passcode"
                required
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 px-4 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Admin Dashboard</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400">
              <span>Protected portal • Session locks automatically</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD (When Authenticated)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800">
      {/* 1. EXACT 9-LINK SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-[#001D40] text-slate-300 flex flex-col justify-between shrink-0 border-r border-blue-950/60 lg:min-h-screen">
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005BD3] text-white flex items-center justify-center font-black shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-tight">
                  Mulan Control
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  Admin-Only CMS
                </span>
              </div>
            </div>
          </div>

          {/* EXACT SIDEBAR NAVIGATION LINKS */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            {/* 1. Dashboard Overview */}
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* 2. All Leads & Inquiries (New Dedicated Page) */}
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "leads"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>All Leads & Forms</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {submissions.length} Leads
              </span>
            </button>

            {/* 3. Homepage Editor */}
            <button
              onClick={() => setActiveTab("homepage")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "homepage"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Homepage Editor</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* 3. Pages Management */}
            <button
              onClick={() => setActiveTab("pages")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "pages"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Pages Management</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                {pages.length} Pages
              </span>
            </button>

            {/* 4. Image Manager */}
            <button
              onClick={() => setActiveTab("images")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "images"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Image Manager</span>
              </div>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
                {images.length} Slots
              </span>
            </button>

            {/* 5. Call Management */}
            <button
              onClick={() => setActiveTab("calls")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "calls"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Management</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* 6. Testimonials & Google Reviews */}
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "testimonials"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Testimonials & Reviews</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {testimonials.length}
              </span>
            </button>

            {/* 7. FAQ Management */}
            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "faqs"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ Management</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                {faqs.length} FAQs
              </span>
            </button>

            {/* 8. SEO Settings */}
            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "seo"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4" />
                <span>SEO Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* 9. Website Settings */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-[#005BD3] text-white shadow-md font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Website Settings</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-blue-900/40 bg-[#001733]/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-xs font-black text-blue-200">
                A
              </div>
              <div>
                <span className="text-xs font-bold text-white block">admin@gmail.com</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Admin • Zero ERP Clutter</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
              title="Lock Admin Session"
            >
              <LogOut className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-lg font-extrabold text-navy-900 tracking-tight capitalize">
              {activeTab === "overview" && "Dashboard Overview & Operational Health"}
              {activeTab === "leads" && "All Client Leads & Form Submissions"}
              {activeTab === "homepage" && "Homepage Editor (Hero, Services, Features)"}
              {activeTab === "pages" && "Pages Management (Core & 9 Vertical Pages)"}
              {activeTab === "images" && "Image Manager (Visual Media Library)"}
              {activeTab === "calls" && "Call Management & Centralized Phone Sync"}
              {activeTab === "testimonials" && "Testimonials & Google Reviews"}
              {activeTab === "faqs" && "FAQ Management (Frequently Asked Questions)"}
              {activeTab === "seo" && "SEO Settings & Google Search Snippet Preview"}
              {activeTab === "settings" && "Website Settings & Neon DB Controls"}
            </h1>
            <p className="text-xs text-slate-500">
              Admin-Only CMS • Real-time Neon PostgreSQL persistence with instant cache purging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Neon Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                dbStatus.connected
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span>{dbStatus.connected ? "Neon DB Connected" : "Local Store Active"}</span>
            </div>

            <button
              onClick={handlePurgeAllCaches}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Purge Next.js in-memory & tag cache"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Purge Cache</span>
            </button>
          </div>
        </header>

        {/* Global Toast Alerts */}
        <div className="px-6 pt-4 space-y-2">
          {successMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
              <button onClick={() => setSuccessMessage(null)} className="text-emerald-500 hover:text-emerald-800">
                ✕
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 font-bold">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-800">
                ✕
              </button>
            </div>
          )}
        </div>

        {/* 9 TAB CONTENTS */}
        <main className="p-6 flex-1 max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 5 KPI Operational Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Database Connection
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-navy-900">
                    {dbStatus.connected ? "Neon Postgres" : "Local Sync"}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block">
                    {dbStatus.connected ? "AWS us-east-2 Active" : "Local JSON persistent"}
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("calls")}
                  className="bg-white p-5 rounded-2xl border border-blue-200 shadow-subtle space-y-2 cursor-pointer hover:border-blue-400 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Inquiries & Calls
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005BD3] flex items-center justify-center group-hover:bg-[#005BD3] group-hover:text-white transition-colors">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-navy-900">{submissions.length} Total</span>
                    {submissions.filter((s) => s.status === "New").length > 0 && (
                      <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
                        {submissions.filter((s) => s.status === "New").length} New
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold block">
                    Click to review inquiries →
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("images")}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Image Library
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005BD3] flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-navy-900">{images.length} Slots</div>
                  <span className="text-[11px] text-blue-600 font-semibold block">
                    Zero broken images
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("pages")}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Indexed Pages
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-navy-900">{pages.length} Routes</div>
                  <span className="text-[11px] text-sky-600 font-semibold block">
                    9 B2B Verticals Live
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab("faqs")}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-2 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      FAQs & Reviews
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-navy-900">{faqs.length + testimonials.length} Items</div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Active customer trust
                  </span>
                </div>
              </div>

              {/* Quick Jump 4 Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center mb-3">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900 mb-1">
                      Homepage Editor
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Current headline: <strong>&quot;{settings.hero_title_line1} {settings.hero_title_line2}&quot;</strong>. Live responsive preview & CTA controls.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("homepage")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005BD3] hover:underline"
                  >
                    <span>Open Homepage Editor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-subtle flex flex-col justify-between hover:border-sky-400 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-navy-900">
                        Visual Media Library
                      </h3>
                      <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                        Direct Upload
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Upload images directly from your computer for all 19 image slots with Cloudinary CDN delivery.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("images")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005BD3] hover:underline"
                  >
                    <span>Manage All Site Images</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900 mb-1">
                      Call Conversion Sync
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Synchronize <strong>{settings.phone}</strong> across all call-to-actions, mobile sticky dialer, and footer links.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("calls")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
                  >
                    <span>Configure Call Sync</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900 mb-1">
                      NYC Local SEO
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Per-page meta title and description editor with interactive Google SERP snippet previews.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("seo")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline"
                  >
                    <span>Optimize Search Tags</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Client Inquiries & Leads Management Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-900">
                        Client Inquiries & Pickup Requests
                      </h3>
                      <p className="text-xs text-slate-500">
                        Live Neon Database ({submissions.length} total received) • Search by Ref ID (e.g. ML-CT-412234-8969)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={refreshSubmissions}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingSubmissions ? "animate-spin" : ""}`} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Reference ID (e.g. ML-CT-412234-8969), Name, Email or Phone..."
                      className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 transition-all focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {["all", "New", "Contacted", "In Progress", "Completed"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                          statusFilter === st
                            ? "bg-[#005BD3] text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {st === "all" ? "All Leads" : st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submissions List */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {submissions
                    .filter((sub) => {
                      const matchesQuery =
                        !searchQuery ||
                        sub.reference_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sub.phone.includes(searchQuery) ||
                        (sub.promo_code && sub.promo_code.toLowerCase().includes(searchQuery.toLowerCase()));

                      const matchesStatus =
                        statusFilter === "all" || sub.status === statusFilter;

                      return matchesQuery && matchesStatus;
                    })
                    .map((sub) => (
                      <div
                        key={sub.reference_id}
                        className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs hover:border-blue-300 transition-all"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-navy-900">{sub.name}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                sub.type === "pickup"
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              {sub.type === "pickup" ? "Pickup Request" : "Contact Inquiry"}
                            </span>
                            <span className="text-[#005BD3] font-mono font-bold text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {sub.reference_id}
                            </span>
                            {sub.customer_type && (
                              <span className="text-slate-500 text-[11px] font-medium">
                                ({sub.customer_type})
                              </span>
                            )}
                            {sub.pickup_day && (
                              <span className="text-sky-700 font-semibold text-[11px] bg-sky-50 px-2 py-0.5 rounded">
                                Day: {sub.pickup_day}
                              </span>
                            )}
                          </div>

                          <p className="text-slate-700 leading-relaxed font-normal bg-white p-2.5 rounded-lg border border-slate-100">
                            {sub.message}
                          </p>

                          {/* Promo Code & Discount Highlight for Business Owner */}
                          {sub.promo_code ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 font-bold text-xs">
                              <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px] uppercase font-mono">
                                PROMO: {sub.promo_code}
                              </span>
                              <span>
                                {sub.discount_percent || 20}% DISCOUNT APPLIED TO INVOICE
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400">Standard Pricing (No discount code used)</span>
                          )}

                          <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-0.5">
                            <span>Received: {new Date(sub.created_at).toLocaleString()}</span>
                            <span>•</span>
                            <a href={`mailto:${sub.email}`} className="text-blue-600 hover:underline">
                              {sub.email}
                            </a>
                          </div>
                        </div>

                        {/* Status Switcher & Contact Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                          <a
                            href={`tel:${sub.phone}`}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <span>📞 Call {sub.phone}</span>
                          </a>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-slate-500">Status:</span>
                            <select
                              value={sub.status}
                              disabled={updatingRef === sub.reference_id}
                              onChange={(e) =>
                                handleUpdateSubmissionStatus(
                                  sub.reference_id,
                                  e.target.value as ContactSubmission["status"]
                                )
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none transition-all ${
                                sub.status === "New"
                                  ? "bg-amber-50 text-amber-900 border-amber-300"
                                  : sub.status === "Contacted"
                                  ? "bg-purple-50 text-purple-900 border-purple-300"
                                  : sub.status === "In Progress"
                                  ? "bg-blue-50 text-blue-900 border-blue-300"
                                  : "bg-emerald-50 text-emerald-900 border-emerald-300"
                              }`}
                            >
                              <option value="New">● New</option>
                              <option value="Contacted">● Contacted</option>
                              <option value="In Progress">● In Progress</option>
                              <option value="Completed">● Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                  {submissions.filter((sub) => {
                    const matchesQuery =
                      !searchQuery ||
                      sub.reference_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      sub.name.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus =
                      statusFilter === "all" || sub.status === statusFilter;
                    return matchesQuery && matchesStatus;
                  }).length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      No matching inquiries found. Try clearing your search query or filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ALL LEADS & SUBMISSIONS (Full Dedicated View) */}
          {activeTab === "leads" && (
            <AllLeadsPage
              submissions={submissions}
              loadingSubmissions={loadingSubmissions}
              onRefreshSubmissions={refreshSubmissions}
              onUpdateStatus={handleUpdateSubmissionStatus}
            />
          )}

          {/* TAB 2: HOMEPAGE EDITOR */}
          {activeTab === "homepage" && (
            <HomepageEditor
              settings={settings}
              images={images}
              savingSettings={savingSettings}
              uploadingField={uploadingField}
              onSettingChange={handleSettingChange}
              onSaveSettings={handleSaveSettings}
              onFileUpload={handleFileUpload}
              onRestoreDefaultImage={handleRestoreDefaultImage}
            />
          )}

          {/* TAB 3: PAGES MANAGEMENT */}
          {activeTab === "pages" && (
            <PagesManagement
              pages={pages}
              loadingPages={loading}
              onSavePage={handleSavePage}
              onRefreshPages={refreshPages}
            />
          )}

          {/* TAB 4: IMAGE MANAGER */}
          {activeTab === "images" && (
            <ImageManager
              images={images}
              savingSlot={savingSlot}
              uploadingField={uploadingField}
              onImageFieldChange={handleImageFieldChange}
              onSaveImageSlot={handleSaveImageSlot}
              onFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 5: CALL MANAGEMENT */}
          {activeTab === "calls" && (
            <CallManagement
              settings={settings}
              savingSettings={savingSettings}
              onSettingChange={handleSettingChange}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {/* TAB 6: TESTIMONIALS & REVIEWS */}
          {activeTab === "testimonials" && (
            <TestimonialsManager
              testimonials={testimonials}
              settings={settings}
              savingSettings={savingSettings}
              onSaveTestimonial={handleSaveTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
              onSettingChange={handleSettingChange}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {/* TAB 7: FAQ MANAGEMENT */}
          {activeTab === "faqs" && (
            <FaqManager
              faqs={faqs}
              loadingFaqs={loading}
              onSaveFaq={handleSaveFaq}
              onDeleteFaq={handleDeleteFaq}
              onRefreshFaqs={refreshFaqs}
            />
          )}

          {/* TAB 8: SEO SETTINGS */}
          {activeTab === "seo" && (
            <SeoSettings
              pages={pages}
              settings={settings}
              savingSettings={savingSettings}
              onSavePage={handleSavePage}
              onSettingChange={handleSettingChange}
              onSaveSettings={handleSaveSettings}
            />
          )}

          {/* TAB 9: WEBSITE SETTINGS */}
          {activeTab === "settings" && (
            <WebsiteSettings
              settings={settings}
              savingSettings={savingSettings}
              uploadingField={uploadingField}
              dbStatus={dbStatus}
              customDbUrl={customDbUrl}
              testingDb={testingDb}
              dbTestResult={dbTestResult}
              onSettingChange={handleSettingChange}
              onSaveSettings={handleSaveSettings}
              onFileUpload={handleFileUpload}
              onCustomDbUrlChange={setCustomDbUrl}
              onTestNeonDb={handleTestNeonDb}
              onPurgeAllCaches={handlePurgeAllCaches}
            />
          )}
        </main>
      </div>
    </div>
  );
}
