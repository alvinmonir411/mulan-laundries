"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200/80 shadow-subtle text-center space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-navy-900">Something Went Wrong</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            We encountered an unexpected error processing your request. Please try again or reach our team directly.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-sm rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="text-xs text-slate-500 hover:text-sky-600 font-medium"
          >
            Call 24/7 Support: {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
