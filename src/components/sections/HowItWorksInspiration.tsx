import React from "react";
import { CalendarCheck, Truck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const HowItWorksInspiration: React.FC = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Book Your Order",
      desc: "Schedule a pickup through our website or call (917) 365-4366.",
      icon: CalendarCheck
    },
    {
      step: "Step 2",
      title: "We Pickup",
      desc: "Our team arrives on schedule to pick up your laundry for free.",
      icon: Truck
    },
    {
      step: "Step 3",
      title: "Expert Cleaning",
      desc: "Cleaned under universal precautions with eco-friendly ECOS detergents.",
      icon: Sparkles
    },
    {
      step: "Step 4",
      title: "Fast Delivery",
      desc: "We deliver fresh, pressed, and neatly folded or hung on time.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Decorative Accent */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#005BD3] block mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            4 Simple Steps
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-16 bg-blue-200" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#005BD3] bg-white" />
            <span className="h-px w-16 bg-blue-200" />
          </div>
        </div>

        {/* 4 Connected Step Cards (Matching Inspiration Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative flex items-center">
                <div className="w-full bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:shadow-card transition-all flex flex-col items-center text-center">
                  {/* Step Outline Icon */}
                  <div className="w-14 h-14 rounded-2xl border-2 border-blue-200 bg-blue-50/50 text-[#005BD3] flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#005BD3] block mb-1">
                    {s.step}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Arrow Connector (visible on desktop between cards) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-blue-200 items-center justify-center text-[#005BD3] shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
