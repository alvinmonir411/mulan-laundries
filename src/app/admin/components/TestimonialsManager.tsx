"use client";

import React, { useState } from "react";
import {
  Star,
  Plus,
  Save,
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Globe,
  X,
  Quote
} from "lucide-react";
import { SiteTestimonial } from "@/lib/cmsTypes";
import { SiteSettings } from "@/lib/settingsTypes";

interface TestimonialsManagerProps {
  testimonials: SiteTestimonial[];
  settings: SiteSettings;
  savingSettings: boolean;
  onSaveTestimonial: (item: SiteTestimonial) => Promise<void>;
  onDeleteTestimonial: (id: number) => Promise<void>;
  onSettingChange: (field: keyof SiteSettings, value: string) => void;
  onSaveSettings: (sectionName: string) => Promise<void>;
}

export const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({
  testimonials,
  settings,
  savingSettings,
  onSaveTestimonial,
  onDeleteTestimonial,
  onSettingChange,
  onSaveSettings,
}) => {
  const [modalItem, setModalItem] = useState<SiteTestimonial | null>(null);
  const [savingItem, setSavingItem] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleOpenNew = () => {
    setModalItem({
      author: "",
      role: "Verified NYC Customer",
      quote: "",
      rating: 5,
      source: "Google Review",
      display_order: testimonials.length + 1,
      active: true,
    });
  };

  const handleModalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem) return;
    setSavingItem(true);
    try {
      await onSaveTestimonial(modalItem);
      setModalItem(null);
    } finally {
      setSavingItem(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to permanently delete this testimonial?")) return;
    setDeletingId(id);
    try {
      await onDeleteTestimonial(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Google Reviews Sync */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 tracking-tight">
                Testimonials & Google Reviews ({testimonials.length} Active)
              </h2>
              <p className="text-xs text-slate-500">
                Manage 5-star Google review cards and verified customer reviews on the homepage.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Google Review Direct Link & CTA Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#005BD3]" />
            <h3 className="text-sm font-bold text-navy-900">
              Google Place ID & Public Review Link Sync
            </h3>
          </div>
          <button
            onClick={() => onSaveSettings("Google Reviews Link")}
            disabled={savingSettings}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all disabled:opacity-70"
          >
            {savingSettings ? "Saving..." : "Save Link"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Google Review Direct Link (URL)
            </label>
            <input
              type="text"
              value={settings.google_reviews_url || "https://maps.google.com/?q=Mulan+Laundries+Bronx+NY"}
              onChange={(e) => onSettingChange("google_reviews_url", e.target.value)}
              placeholder="https://g.page/r/.../review"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Testimonials Section Heading Badge
            </label>
            <input
              type="text"
              value={settings.testimonials_badge || "Verified Client Review"}
              onChange={(e) => onSettingChange("testimonials_badge", e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id || item.author}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.active ? "Active" : "Hidden"}
                  </span>
                  <span className="text-[10px] font-bold bg-blue-50 text-[#005BD3] px-2 py-0.5 rounded">
                    {item.source}
                  </span>
                </div>
              </div>

              <blockquote className="text-xs text-slate-700 italic leading-relaxed mb-4">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-navy-900 block">{item.author}</span>
                <span className="text-[11px] text-slate-400">{item.role || "Customer"}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalItem({ ...item })}
                  className="p-2 text-slate-500 hover:text-[#005BD3] hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Review"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
                  <Quote className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-navy-900">
                  {modalItem.id ? "Edit Testimonial" : "Add New Testimonial"}
                </h3>
              </div>
              <button
                onClick={() => setModalItem(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Client / Reviewer Name
                </label>
                <input
                  type="text"
                  value={modalItem.author}
                  onChange={(e) => setModalItem({ ...modalItem, author: e.target.value })}
                  required
                  placeholder="e.g., Charles N. Rock"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Client Role or Business Context
                </label>
                <input
                  type="text"
                  value={modalItem.role || ""}
                  onChange={(e) => setModalItem({ ...modalItem, role: e.target.value })}
                  placeholder="e.g., Boutique Hotel General Manager, Manhattan"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Review Text / Quote
                </label>
                <textarea
                  rows={4}
                  value={modalItem.quote}
                  onChange={(e) => setModalItem({ ...modalItem, quote: e.target.value })}
                  required
                  placeholder="Enter customer feedback here..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rating (1-5 Stars)
                  </label>
                  <select
                    value={modalItem.rating}
                    onChange={(e) => setModalItem({ ...modalItem, rating: parseInt(e.target.value, 10) })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Source Tag
                  </label>
                  <input
                    type="text"
                    value={modalItem.source}
                    onChange={(e) => setModalItem({ ...modalItem, source: e.target.value })}
                    placeholder="Google Review"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeReviewToggle"
                  checked={modalItem.active}
                  onChange={(e) => setModalItem({ ...modalItem, active: e.target.checked })}
                  className="w-4 h-4 text-[#005BD3] rounded focus:ring-blue-500"
                />
                <label htmlFor="activeReviewToggle" className="text-xs font-bold text-slate-700">
                  Active (Visible on public website)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70 flex items-center gap-2"
                >
                  {savingItem ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
