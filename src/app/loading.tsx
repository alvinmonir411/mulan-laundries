import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white p-6">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Loading Mulan Laundries...
        </span>
      </div>
    </div>
  );
}
