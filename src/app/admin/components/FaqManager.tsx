"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Plus,
  Save,
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Tag
} from "lucide-react";
import { SiteFaq } from "@/lib/cmsTypes";

interface FaqManagerProps {
  faqs: SiteFaq[];
  loadingFaqs: boolean;
  onSaveFaq: (faq: SiteFaq) => Promise<void>;
  onDeleteFaq: (id: number) => Promise<void>;
  onRefreshFaqs: () => Promise<void>;
}

export const FaqManager: React.FC<FaqManagerProps> = ({
  faqs,
  loadingFaqs,
  onSaveFaq,
  onDeleteFaq,
  onRefreshFaqs,
}) => {
  const [modalFaq, setModalFaq] = useState<SiteFaq | null>(null);
  const [savingFaq, setSavingFaq] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = faqs.filter(
    (f) => selectedCategory === "All" || f.category === selectedCategory
  );

  const handleOpenNew = () => {
    setModalFaq({
      category: "Commercial Services",
      question: "",
      answer: "",
      display_order: faqs.length + 1,
      active: true,
    });
  };

  const handleModalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFaq) return;
    setSavingFaq(true);
    try {
      await onSaveFaq(modalFaq);
      setModalFaq(null);
    } finally {
      setSavingFaq(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to permanently delete this FAQ?")) return;
    setDeletingId(id);
    try {
      await onDeleteFaq(id);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleExpand = (id?: number) => {
    if (!id) return;
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Category Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 tracking-tight">
                FAQ Management ({faqs.length} Questions Configured)
              </h2>
              <p className="text-xs text-slate-500">
                Frequently asked questions published across homepage, service verticals, and contact pages.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#005BD3] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div
              key={faq.id || faq.question}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden transition-all"
            >
              <div
                onClick={() => toggleExpand(faq.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#005BD3] font-mono text-xs flex items-center justify-center font-bold">
                    Q
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {faq.category} · Order #{faq.display_order}
                    </span>
                    <h4 className="text-sm font-bold text-navy-900">{faq.question}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      faq.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {faq.active ? "Active" : "Draft"}
                  </span>
                  <div className="p-1 rounded text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setModalFaq({ ...faq })}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#005BD3]" />
                      <span>Edit FAQ</span>
                    </button>

                    <button
                      onClick={() => handleDelete(faq.id)}
                      disabled={deletingId === faq.id}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {modalFaq && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-navy-900">
                  {modalFaq.id ? "Edit FAQ" : "Add New FAQ"}
                </h3>
              </div>
              <button
                onClick={() => setModalFaq(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={modalFaq.category}
                  onChange={(e) => setModalFaq({ ...modalFaq, category: e.target.value })}
                  placeholder="e.g., Commercial Services, Turnaround, Coverage"
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  value={modalFaq.question}
                  onChange={(e) => setModalFaq({ ...modalFaq, question: e.target.value })}
                  placeholder="What is your turnaround time?"
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Answer
                </label>
                <textarea
                  rows={4}
                  value={modalFaq.answer}
                  onChange={(e) => setModalFaq({ ...modalFaq, answer: e.target.value })}
                  placeholder="Provide clear, concise answer..."
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={modalFaq.display_order}
                    onChange={(e) =>
                      setModalFaq({ ...modalFaq, display_order: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="faqActiveToggle"
                    checked={modalFaq.active}
                    onChange={(e) => setModalFaq({ ...modalFaq, active: e.target.checked })}
                    className="w-4 h-4 text-[#005BD3] rounded focus:ring-blue-500"
                  />
                  <label htmlFor="faqActiveToggle" className="text-xs font-bold text-slate-700">
                    Active (Visible)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalFaq(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingFaq}
                  className="px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70 flex items-center gap-2"
                >
                  {savingFaq ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
