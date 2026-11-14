import React from "react";
import { Star, Quote, CheckCircle, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Client Review"
          title="What Our New York Customers Say"
          subtitle="Honest, verified feedback from businesses and households who trust Mulan Laundries with their linen management."
          align="center"
        />

        <div className="max-w-3xl mx-auto">
          {BUSINESS_INFO.verifiedTestimonials.map((review) => (
            <div
              key={review.id}
              className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card text-center"
            >
              {/* Quote Icon */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <Quote className="w-7 h-7" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 mb-6 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl font-semibold text-navy-900 leading-snug tracking-tight mb-8">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              {/* Author & Verification */}
              <div className="border-t border-slate-200/70 pt-6 inline-flex flex-col items-center">
                <span className="font-bold text-base text-navy-900">{review.author}</span>
                <span className="text-xs text-slate-500 mt-0.5">{review.role}</span>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{review.source}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Satisfaction Guarantee Callout */}
          <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>We guarantee customer satisfaction with professional wash, fold, and pressing standards.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
