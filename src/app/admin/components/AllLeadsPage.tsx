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
  FileText
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
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl leading-relaxed">
            Complete database of every customer contact message, pickup request, promo voucher, and status progression stored in Neon Serverless PostgreSQL.
          </p>
        </div>

        <button
          onClick={onRefreshSubmissions}
          disabled={loadingSubmissions}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all self-start md:self-auto shrink-0 disabled:opacity-70"
        >
          <RefreshCw className={`w-4 h-4 ${loadingSubmissions ? "animate-spin" : ""}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div 
          onClick={() => { setStatusFilter("all"); setTypeFilter("all"); }}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "all" && typeFilter === "all"
              ? "bg-white border-[#005BD3] shadow-md ring-2 ring-blue-100"
              : "bg-white border-slate-200/80 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Leads</span>
          <div className="text-2xl font-black text-navy-900 mt-1">{totalCount}</div>
          <span className="text-[11px] text-slate-500 font-medium">All Submissions</span>
        </div>

        <div 
          onClick={() => setStatusFilter("New")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "New"
              ? "bg-amber-50/80 border-amber-400 shadow-md ring-2 ring-amber-100"
              : "bg-white border-slate-200/80 hover:border-amber-200"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">New / Unread</span>
          <div className="text-2xl font-black text-amber-900 mt-1">{newCount}</div>
          <span className="text-[11px] text-amber-700 font-medium">Needs Attention</span>
        </div>

        <div 
          onClick={() => setStatusFilter("Contacted")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "Contacted"
              ? "bg-purple-50/80 border-purple-400 shadow-md ring-2 ring-purple-100"
              : "bg-white border-slate-200/80 hover:border-purple-200"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Contacted</span>
          <div className="text-2xl font-black text-purple-900 mt-1">{contactedCount}</div>
          <span className="text-[11px] text-purple-700 font-medium">Rep Called / Emailed</span>
        </div>

        <div 
          onClick={() => setStatusFilter("In Progress")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "In Progress"
              ? "bg-blue-50/80 border-blue-400 shadow-md ring-2 ring-blue-100"
              : "bg-white border-slate-200/80 hover:border-blue-200"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">In Progress</span>
          <div className="text-2xl font-black text-blue-900 mt-1">{progressCount}</div>
          <span className="text-[11px] text-blue-700 font-medium">Pickup Scheduled</span>
        </div>

        <div 
          onClick={() => setStatusFilter("Completed")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "Completed"
              ? "bg-emerald-50/80 border-emerald-400 shadow-md ring-2 ring-emerald-100"
              : "bg-white border-slate-200/80 hover:border-emerald-200"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Completed</span>
          <div className="text-2xl font-black text-emerald-900 mt-1">{completedCount}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Delivered & Invoiced</span>
        </div>

        <div 
          onClick={() => setSearchQuery("WELCOME20")}
          className="p-4 rounded-xl border bg-white border-slate-200/80 hover:border-emerald-300 cursor-pointer transition-all"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Promo Used</span>
          <div className="text-2xl font-black text-emerald-800 mt-1 flex items-center gap-1">
            <span>{promoCount}</span>
            <Ticket className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">20% Welcome Offer</span>
        </div>
      </div>

      {/* 3. Search & Comprehensive Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Ref ID (e.g. ML-CT-412234-8969), Name, Email, Phone, Promo Code, or Message..."
              className="w-full pl-10 pr-9 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 transition-all focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Form Type Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            {[
              { id: "all", label: "All Types" },
              { id: "pickup", label: "Pickup Requests" },
              { id: "contact", label: "Contact Messages" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  typeFilter === t.id
                    ? "bg-[#001D40] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
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
          <span className="ml-auto text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredSubmissions.length}</strong> of {totalCount} leads
          </span>
        </div>
      </div>

      {/* 4. Complete Leads Detailed Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Tracking ID & Date</th>
                <th className="py-3.5 px-4">Client Contact</th>
                <th className="py-3.5 px-4">Type & Account</th>
                <th className="py-3.5 px-4">Promo & Pricing</th>
                <th className="py-3.5 px-4">Message / Request</th>
                <th className="py-3.5 px-4 text-center">Status Action</th>
                <th className="py-3.5 px-4 text-right">Direct Dial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((sub) => (
                <tr 
                  key={sub.reference_id} 
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  onClick={() => setSelectedSub(sub)}
                >
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

                  {/* Direct Call Button */}
                  <td className="py-4 px-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`tel:${sub.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-blue-600 font-bold text-xs hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </td>
                </tr>
              ))}

              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
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
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lead Inspection
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
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
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
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Contact Information
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <a href={`tel:${selectedSub.phone}`} className="font-bold text-blue-600 hover:underline">
                    {selectedSub.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a href={`mailto:${selectedSub.email}`} className="font-semibold text-slate-800 hover:underline">
                    {selectedSub.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Received:</span>
                  <span className="text-slate-600">{new Date(selectedSub.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Service Request Details
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Request Type:</span>
                  <span className="font-bold capitalize text-slate-800">{selectedSub.type} Form</span>
                </div>
                {selectedSub.customer_type && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer Category:</span>
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
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedSub.message}
              </div>
            </div>

            {/* Status & Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Lead Status:</span>
                <select
                  value={selectedSub.status}
                  onChange={(e) => {
                    const st = e.target.value as ContactSubmission["status"];
                    onUpdateStatus(selectedSub.reference_id, st);
                    setSelectedSub({ ...selectedSub, status: st });
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 focus:outline-none"
                >
                  <option value="New">● New</option>
                  <option value="Contacted">● Contacted</option>
                  <option value="In Progress">● In Progress</option>
                  <option value="Completed">● Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedSub.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedSub.phone}</span>
                </a>
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
    </div>
  );
};
