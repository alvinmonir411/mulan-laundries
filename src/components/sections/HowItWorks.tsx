import React from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: ClipboardCheck,
      subtitle: "ORDER",
      title: "We Receive Your Order",
      description: "Place your order online in seconds or call our NYC dispatch at (917) 365-4366. We confirm your details instantly and schedule a pickup window that fits your schedule."
    },
    {
      num: "02",
      icon: Truck,
      subtitle: "PICKUP",
      title: "We Pick Up Your Clothes",
      description: "Our professional, uniformed team arrives at your doorstep, office, or commercial facility on schedule to securely collect your linens and garments."
    },
    {
      num: "03",
      icon: Sparkles,
      subtitle: "DELIVERY",
      title: "Delivered To Your Door",
      description: "After expert washing under universal precautions, drying, and rotary pressing or neat folding, your items return cleanly sealed in protective packaging ready to use."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Effortless Logistics"
          title="How It Works: In 3 Easy Steps"
          subtitle="From commercial contracts to residential wash and fold, our seamless 3-step workflow makes laundry completely hassle-free."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                      STEP {step.num} • {step.subtitle}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-sky-600 group-hover:text-white text-navy-800 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>24/7 NYC Dispatch Support</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below steps */}
        <div className="mt-12 text-center">
          <Link
            href="/pickup-request"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>CLICK HERE TO ORDER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
