"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle2,
  FileText,
  Save,
  Loader2,
  X,
  Globe,
  Tag
} from "lucide-react";
import { SitePage } from "@/lib/cmsTypes";

interface PagesManagementProps {
  pages: SitePage[];
  loadingPages: boolean;
  onSavePage: (page: SitePage) => Promise<void>;
  onRefreshPages: () => Promise<void>;
}

export const PagesManagement: React.FC<PagesManagementProps> = ({
  pages,
  loadingPages,
  onSavePage,
  onRefreshPages,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [activeDrawerPage, setActiveDrawerPage] = useState<SitePage | null>(null);
  const [savingDrawer, setSavingDrawer] = useState(false);

  const filteredPages = pages.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.heading && p.heading.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const handleDrawerSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDrawerPage) return;
    setSavingDrawer(true);
    try {
      await onSavePage(activeDrawerPage);
      setActiveDrawerPage(null);
    } finally {
      setSavingDrawer(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Banner & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 tracking-tight">
                Pages Management ({pages.length} Pages Indexed)
              </h2>
              <p className="text-xs text-slate-500">
                Core static landing pages and all 9 specialized B2B commercial vertical routes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {["All", "published", "draft"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  statusFilter === st
                    ? "bg-white text-[#005BD3] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search page or slug..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Page Title & Slug</th>
                <th className="px-6 py-4">Hero Heading</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">SEO Title</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredPages.map((page) => (
                <tr key={page.slug} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-navy-900 text-sm">{page.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-slate-600">
                    {page.heading || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        page.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          page.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <span>{page.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                    {page.meta_title || "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setActiveDrawerPage({ ...page })}
                        className="px-3 py-1.5 bg-[#005BD3] hover:bg-[#0048A8] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <Link
                        href={page.slug}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View live page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Drawer Modal */}
      {activeDrawerPage && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005BD3] flex items-center justify-center font-bold">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">
                      Edit Page: {activeDrawerPage.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{activeDrawerPage.slug}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDrawerPage(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Form */}
              <form id="drawer-form" onSubmit={handleDrawerSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Internal Page Title
                  </label>
                  <input
                    type="text"
                    value={activeDrawerPage.title}
                    onChange={(e) =>
                      setActiveDrawerPage({ ...activeDrawerPage, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Page Hero Heading (H1)
                  </label>
                  <input
                    type="text"
                    value={activeDrawerPage.heading || ""}
                    onChange={(e) =>
                      setActiveDrawerPage({ ...activeDrawerPage, heading: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Page Subheading / Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={activeDrawerPage.subheading || ""}
                    onChange={(e) =>
                      setActiveDrawerPage({ ...activeDrawerPage, subheading: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-[#005BD3]" />
                    <span>SEO & Metadata Controls</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Meta Title (Browser Tab)
                    </label>
                    <input
                      type="text"
                      value={activeDrawerPage.meta_title || ""}
                      onChange={(e) =>
                        setActiveDrawerPage({ ...activeDrawerPage, meta_title: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Meta Description (Search Snippet)
                    </label>
                    <textarea
                      rows={3}
                      value={activeDrawerPage.meta_description || ""}
                      onChange={(e) =>
                        setActiveDrawerPage({ ...activeDrawerPage, meta_description: e.target.value })
                      }
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={activeDrawerPage.status}
                    onChange={(e) =>
                      setActiveDrawerPage({
                        ...activeDrawerPage,
                        status: e.target.value as "published" | "draft" | "archived",
                      })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
                  >
                    <option value="published">Published (Visible to NYC visitors)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Drawer Actions */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
              <button
                type="button"
                onClick={() => setActiveDrawerPage(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                form="drawer-form"
                type="submit"
                disabled={savingDrawer}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all disabled:opacity-70"
              >
                {savingDrawer ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save & Update Neon DB</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
