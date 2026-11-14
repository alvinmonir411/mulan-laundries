import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 p-6 shadow-subtle ${
        hoverEffect ? "transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:border-sky-100" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
