"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck, 
  AlertCircle, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Ticket
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export default function TrackOrderPage() {
  const [refInput, setRefInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // If URL has ?ref=ML-..., pre-fill and trigger search
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryRef = urlParams.get("ref");
      if (queryRef) {
        setRefInput(queryRef);
        handleTrackSearch(queryRef);
      }
    }
  }, []);

  const handleTrackSearch = async (trackingRef?: string) => {
    const idToSearch = (trackingRef || refInput).trim();
    if (!idToSearch) {
      setError("Please enter your Tracking Reference ID (e.g. ML-CT-412234-8969).");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(idToSearch)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data.record);
      } else {
        setError(data.error || "Tracking reference not found.");
      }
    } catch (e) {
      setError("Network error while searching for reference ID.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "New":
        return 1;
      case "Contacted":
        return 2;
      case "In Progress":
        return 3;
      case "Completed":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#005BD3] text-xs font-bold uppercase tracking-wider mb-3">
            <Search className="w-3.5 h-3.5" />
            Live Client Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            Track Your Inquiry & Pickup Status
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Enter your Reference ID (e.g. <span className="font-mono font-bold text-slate-800">ML-CT-412234-8969</span> or <span className="font-mono font-bold text-slate-800">ML-PU-782311-7951</span>) to check the real-time status of your request.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrackSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="Enter Reference ID (e.g. ML-CT-412234-8969)"
                className="w-full pl-12 pr-4 py-3.5 text-sm uppercase font-mono font-bold tracking-wider rounded-xl border border-slate-300 focus:border-[#005BD3] focus:ring-2 focus:ring-blue-100 transition-all focus:outline-none text-navy-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#005BD3] hover:bg-[#0048A8] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span>SEARCHING...</span>
              ) : (
                <>
                  <span>TRACK STATUS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Not Found</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Card When Found */}
        {result && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 animate-in fade-in duration-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Tracking Reference ID
                </span>
                <div className="text-2xl font-black text-[#005BD3] font-mono mt-0.5">
                  {result.reference_id}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  result.status === "New"
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : result.status === "Contacted"
                    ? "bg-purple-100 text-purple-800 border border-purple-300"
                    : result.status === "In Progress"
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}>
                  ● {result.status}
                </span>
              </div>
            </div>

            {/* 4-Step Progress Bar */}
            <div className="py-4">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { step: 1, label: "Received", desc: "Submitted to NYC Dispatch" },
                  { step: 2, label: "Contacted", desc: "Representative Assigned" },
                  { step: 3, label: "In Progress", desc: "Route / Wash Processing" },
                  { step: 4, label: "Completed", desc: "Delivered & Invoiced" }
                ].map((s) => {
                  const currentStep = getStatusStep(result.status);
                  const isDone = currentStep >= s.step;
                  const isCurrent = currentStep === s.step;

                  return (
                    <div key={s.step} className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                        isDone 
                          ? "bg-[#005BD3] text-white shadow-sm" 
                          : "bg-slate-100 text-slate-400"
                      }`}>
                        {isDone ? "✓" : s.step}
                      </div>
                      <span className={`font-bold ${isCurrent ? "text-[#005BD3]" : isDone ? "text-slate-800" : "text-slate-400"}`}>
                        {s.label}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                        {s.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="relative mt-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#005BD3] transition-all duration-500 rounded-full"
                  style={{ width: `${(getStatusStep(result.status) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Request Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Request Details
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client Name:</span>
                  <span className="font-semibold text-slate-800">{result.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Request Type:</span>
                  <span className="font-semibold capitalize text-slate-800">{result.type} Request</span>
                </div>
                {result.customer_type && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Type:</span>
                    <span className="font-semibold text-slate-800">{result.customer_type}</span>
                  </div>
                )}
                {result.pickup_day && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scheduled Day:</span>
                    <span className="font-semibold text-blue-700">{result.pickup_day}</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Promotions & Benefits
                </span>
                {result.promo_code ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                      <Ticket className="w-4 h-4 text-emerald-600" />
                      <span>Promo Applied: {result.promo_code}</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                      ✓ {result.discount_percent || 20}% discount is verified and will be deducted from your final billing statement.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-500 text-xs">
                    No promo code applied. Call dispatch if you have a promotional voucher.
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between text-slate-500 text-xs">
                  <span>Logged at:</span>
                  <span>{new Date(result.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Assistance Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">Need immediate assistance or want to reschedule?</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-[#005BD3] font-bold hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call NYC Dispatch: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
