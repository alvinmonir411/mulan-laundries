"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  RefreshCw, 
  Phone, 
  Mail, 
  Calendar, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Filter, 
  ExternalLink,
  ChevronDown,
  User,
  FileText,
  AlertTriangle,
  Loader2,
  CheckSquare,
  Square
} from "lucide-react";
import { ContactSubmission } from "@/lib/submissionTypes";

interface AllLeadsPageProps {
  submissions: ContactSubmission[];
  loadingSubmissions: boolean;
  onRefreshSubmissions: () => Promise<void>;
  onUpdateStatus: (reference_id: string, newStatus: ContactSubmission["status"]) => Promise<void>;
  onDeleteSubmission?: (reference_id: string) => Promise<void>;
}

export const AllLeadsPage: React.FC<AllLeadsPageProps> = ({
  submissions,
  loadingSubmissions,
  onRefreshSubmissions,
  onUpdateStatus,
  onDeleteSubmission,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);

  // Deletion States
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);
  const [selectedRefs, setSelectedRefs] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState(false);

  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      sub.reference_id.toLowerCase().includes(q) ||
      sub.name.toLowerCase().includes(q) ||
      sub.email.toLowerCase().includes(q) ||
      sub.phone.includes(q) ||
      (sub.customer_type && sub.customer_type.toLowerCase().includes(q)) ||
      (sub.promo_code && sub.promo_code.toLowerCase().includes(q)) ||
      sub.message.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesType = typeFilter === "all" || sub.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === "New").length;
  const contactedCount = submissions.filter((s) => s.status === "Contacted").length;
  const progressCount = submissions.filter((s) => s.status === "In Progress").length;
  const completedCount = submissions.filter((s) => s.status === "Completed").length;
  const promoCount = submissions.filter((s) => !!s.promo_code).length;

  // Selection Handlers
  const handleToggleSelectAll = () => {
    if (selectedRefs.size === filteredSubmissions.length) {
      setSelectedRefs(new Set());
    } else {
      setSelectedRefs(new Set(filteredSubmissions.map((s) => s.reference_id)));
    }
  };

  const handleToggleSelect = (ref: string) => {
    setSelectedRefs((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) {
        next.delete(ref);
      } else {
        next.add(ref);
      }
      return next;
    });
  };

  // Single Deletion
  const confirmSingleDelete = async () => {
    if (!deleteTarget || !onDeleteSubmission) return;
    setIsDeleting(true);
    try {
      await onDeleteSubmission(deleteTarget.reference_id);
      setSelectedRefs((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget.reference_id);
        return next;
      });
      setDeleteTarget(null);
      if (selectedSub?.reference_id === deleteTarget.reference_id) {
        setSelectedSub(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Batch Deletion
  const confirmBatchDelete = async () => {
    if (selectedRefs.size === 0 || !onDeleteSubmission) return;
    setIsDeleting(true);
    try {
      for (const ref of Array.from(selectedRefs)) {
        await onDeleteSubmission(ref);
      }
      setSelectedRefs(new Set());
      setBatchDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Header Banner */}
      <div className="bg-[#001D40] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card border border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-400/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Central Lead Management Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            All Inquiries & Form Submissions
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Complete database of every customer contact message, pickup request, promo voucher, and status progression stored in Neon Serverless PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onRefreshSubmissions()}
            disabled={loadingSubmissions}
            className="px-4 py-2.5 bg-[#005BD3] hover:bg-[#0048A8] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${loadingSubmissions ? "animate-spin" : ""}`} />
            <span>Refresh Database</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Leads</span>
          <div className="text-2xl font-black text-navy-900 mt-1">{totalCount}</div>
          <span className="text-[11px] text-slate-500">All Submissions</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">New / Unread</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{newCount}</div>
          <span className="text-[11px] text-amber-800">Needs Attention</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-purple-200 bg-purple-50/20 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Contacted</span>
          <div className="text-2xl font-black text-purple-700 mt-1">{contactedCount}</div>
          <span className="text-[11px] text-purple-900">Rep Called / Emailed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">In Progress</span>
          <div className="text-2xl font-black text-blue-700 mt-1">{progressCount}</div>
          <span className="text-[11px] text-blue-900">Pickup Scheduled</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Completed</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">{completedCount}</div>
          <span className="text-[11px] text-emerald-900">Delivered & Invoiced</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-300 bg-emerald-500/10 shadow-subtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Promo Used</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">
            <span>{promoCount}</span>
            <Ticket className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[11px] text-emerald-800 font-bold">20% Welcome Offer</span>
        </div>
      </div>

      {/* 3. Filters & Multi-Select Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Tracking ID (e.g. ML-PU-...), client name, email, phone, or promo code..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#005BD3] outline-none"
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

          {/* Type Filters */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Type:</span>
            </span>
            {["all", "pickup", "contact"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  typeFilter === t
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t === "all" ? "All Types" : t === "pickup" ? "Pickup Requests" : "Contact Messages"}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills & Multi-Delete Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 mr-1">Status:</span>
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
                {st === "all" ? "All Statuses" : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {selectedRefs.size > 0 && onDeleteSubmission && (
              <button
                onClick={() => setBatchDeleteConfirm(true)}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all animate-in fade-in"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedRefs.size})</span>
              </button>
            )}

            <span className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{filteredSubmissions.length}</strong> of {totalCount} leads
            </span>
          </div>
        </div>
      </div>

      {/* 4. Complete Leads Detailed Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {onDeleteSubmission && (
                  <th className="py-3.5 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={filteredSubmissions.length > 0 && selectedRefs.size === filteredSubmissions.length}
                      onChange={handleToggleSelectAll}
                      className="w-4 h-4 rounded text-[#005BD3] focus:ring-0 cursor-pointer"
                      title="Select All"
                    />
                  </th>
                )}
                <th className="py-3.5 px-4">Tracking ID & Date</th>
                <th className="py-3.5 px-4">Client Contact</th>
                <th className="py-3.5 px-4">Type & Account</th>
                <th className="py-3.5 px-4">Promo & Pricing</th>
                <th className="py-3.5 px-4">Message / Request</th>
                <th className="py-3.5 px-4 text-center">Status Action</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((sub) => {
                const isSelected = selectedRefs.has(sub.reference_id);

                return (
                  <tr 
                    key={sub.reference_id} 
                    className={`hover:bg-blue-50/40 transition-colors cursor-pointer group ${
                      isSelected ? "bg-blue-50/60" : ""
                    }`}
                    onClick={() => setSelectedSub(sub)}
                  >
                    {/* Checkbox */}
                    {onDeleteSubmission && (
                      <td className="py-4 px-3 text-center align-top" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(sub.reference_id)}
                          className="w-4 h-4 rounded text-[#005BD3] focus:ring-0 cursor-pointer mt-1"
                        />
                      </td>
                    )}

                    {/* Tracking ID & Date */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-mono font-bold text-xs text-[#005BD3] group-hover:underline">
                        {sub.reference_id}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{new Date(sub.created_at).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
                      </div>
                    </td>

                    {/* Client Contact */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-sm text-navy-900">{sub.name}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{sub.email}</div>
                      <div className="text-slate-600 font-semibold text-[11px] mt-0.5">{sub.phone}</div>
                    </td>

                    {/* Type & Account */}
                    <td className="py-4 px-4 align-top">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          sub.type === "pickup"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {sub.type === "pickup" ? "Pickup" : "Contact"}
                      </span>
                      {sub.customer_type && (
                        <div className="text-slate-600 font-medium text-[11px] mt-1">
                          {sub.customer_type}
                        </div>
                      )}
                      {sub.pickup_day && (
                        <div className="text-sky-700 font-bold text-[11px] mt-0.5">
                          Day: {sub.pickup_day}
                        </div>
                      )}
                    </td>

                    {/* Promo & Pricing Notice */}
                    <td className="py-4 px-4 align-top">
                      {sub.promo_code ? (
                        <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800">
                          <div className="flex items-center gap-1 font-mono font-bold text-[11px]">
                            <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{sub.promo_code}</span>
                          </div>
                          <div className="text-[10px] font-black text-emerald-700 mt-0.5">
                            {sub.discount_percent || 20}% OFF INVOICE
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Standard quote
                        </span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="py-4 px-4 align-top max-w-xs">
                      <p className="text-slate-700 line-clamp-2 leading-relaxed font-normal">
                        {sub.message}
                      </p>
                      <span className="text-[10px] text-blue-600 font-bold mt-1 inline-block group-hover:underline">
                        Click to view full inquiry →
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={sub.status}
                        disabled={updatingRef === sub.reference_id}
                        onChange={(e) => {
                          onUpdateStatus(
                            sub.reference_id,
                            e.target.value as ContactSubmission["status"]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none transition-all cursor-pointer ${
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
                    </td>

                    {/* Actions: Call & Delete */}
                    <td className="py-4 px-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${sub.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-blue-600 font-bold text-xs hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                          title={`Call ${sub.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        {onDeleteSubmission && (
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(sub)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                            title={`Delete Lead ${sub.reference_id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">No submissions match your search or filter.</p>
                    <p className="text-xs mt-1">Try resetting the filter or search query above.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Detailed Submission Drawer / Modal (When clicking a row) */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lead Details & Inspection
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="text-xl font-black text-navy-900">{selectedSub.name}</h3>
                  <span className="font-mono font-bold text-xs bg-blue-50 text-[#005BD3] px-2 py-0.5 rounded border border-blue-200">
                    {selectedSub.reference_id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Promo Highlight in Modal */}
            {selectedSub.promo_code ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono font-bold text-emerald-900 text-sm">
                    <Ticket className="w-4 h-4 text-emerald-600" />
                    <span>Promo Applied: {selectedSub.promo_code}</span>
                  </div>
                  <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-full uppercase">
                    {selectedSub.discount_percent || 20}% OFF INVOICE
                  </span>
                </div>
                <p className="text-xs text-emerald-800">
                  Owner Note: Deduct {selectedSub.discount_percent || 20}% from this customer's initial bill when quoting or billing.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500">
                Standard Pricing: Customer did not apply any promo voucher code.
              </div>
            )}

            {/* Grid of Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Contact Information
                </span>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-slate-800">{selectedSub.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedSub.email}`} className="text-blue-600 hover:underline">
                    {selectedSub.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${selectedSub.phone}`} className="font-semibold text-slate-800 hover:underline">
                    {selectedSub.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Request Metadata
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Submission Type:</span>
                  <span className="font-bold uppercase text-navy-900">{selectedSub.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date Received:</span>
                  <span className="font-medium text-slate-700">{new Date(selectedSub.created_at).toLocaleString()}</span>
                </div>
                {selectedSub.customer_type && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Type:</span>
                    <span className="font-semibold text-slate-800">{selectedSub.customer_type}</span>
                  </div>
                )}
                {selectedSub.pickup_day && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Requested Pickup Day:</span>
                    <span className="font-bold text-sky-700">{selectedSub.pickup_day}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Full Message Text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block mb-2">
                Full Message & Special Instructions
              </span>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedSub.message}
              </div>
            </div>

            {/* Status & Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Status:</span>
                <select
                  value={selectedSub.status}
                  onChange={(e) => {
                    const st = e.target.value as ContactSubmission["status"];
                    onUpdateStatus(selectedSub.reference_id, st);
                    setSelectedSub({ ...selectedSub, status: st });
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 focus:outline-none"
                >
                  <option value="New">● New</option>
                  <option value="Contacted">● Contacted</option>
                  <option value="In Progress">● In Progress</option>
                  <option value="Completed">● Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`tel:${selectedSub.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedSub.phone}</span>
                </a>

                {onDeleteSubmission && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(selectedSub)}
                    className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs transition-colors flex items-center gap-1.5"
                    title="Delete this lead permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Delete Lead</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Single Lead Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-navy-900">
                Permanently Delete Lead?
              </h3>
              <p className="text-xs text-slate-500">
                This inquiry will be permanently deleted from the Neon Serverless PostgreSQL database. This action cannot be undone.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div><strong>Tracking ID:</strong> <span className="font-mono text-[#005BD3]">{deleteTarget.reference_id}</span></div>
              <div><strong>Client Name:</strong> {deleteTarget.name}</div>
              <div><strong>Phone:</strong> {deleteTarget.phone}</div>
              <div><strong>Email:</strong> {deleteTarget.email}</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSingleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Batch Delete Confirmation Modal */}
      {batchDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-navy-900">
                Delete {selectedRefs.size} Selected Leads?
              </h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently delete all {selectedRefs.size} selected leads from the database?
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBatchDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmBatchDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete All {selectedRefs.size}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
