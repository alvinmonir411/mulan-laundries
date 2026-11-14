import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200/80 shadow-subtle text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-50 text-sky-600 font-black text-2xl">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-navy-900">Page Not Found</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you are looking for may have been moved, updated, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-sm rounded-xl transition-all"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>Call NYC Dispatch: {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
