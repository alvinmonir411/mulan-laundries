import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sky" | "navy" | "green" | "amber" | "neutral" | "white";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "sky",
  className = "",
  icon
}) => {
  const variantStyles = {
    sky: "bg-sky-50 text-sky-700 border-sky-200",
    navy: "bg-slate-100 text-navy-900 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
    white: "bg-white/10 text-white border-white/20 backdrop-blur-sm"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
