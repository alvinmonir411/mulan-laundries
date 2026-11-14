import React from "react";
import Link from "next/link";
import { Star, ExternalLink, MapPin, CheckCircle2 } from "lucide-react";
import { fetchAllTestimonials } from "@/lib/cmsData";
import { getSiteSettings } from "@/lib/settings";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Mulan+Laundries/@40.7911231,-73.9454053,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2590b25cfa8d3:0x79bbf3629678f0e2!8m2!3d40.7911231!4d-73.9454053!16s%2Fg%2F11pprs7bcr";

export const TestimonialInspiration: React.FC = async () => {
  const [testimonials, settings] = await Promise.all([
    fetchAllTestimonials(),
    getSiteSettings(),
  ]);

  const activeReviews = testimonials.filter((t) => t.active);
  const mapsUrl = settings.google_maps_url || GOOGLE_MAPS_URL;

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Decorative Accent */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#005BD3] uppercase tracking-wider mb-3">
            <span className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </span>
            <span>Google Maps Verified Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] tracking-tight">
            What NYC Clients Say on Google
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Real feedback from our commercial and residential laundry customers across New York City.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-16 bg-blue-200" />
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#005BD3] bg-white" />
            <span className="h-px w-16 bg-blue-200" />
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeReviews.map((r, i) => (
            <div
              key={r.id || i}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars + Google Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    {r.source || "Google Review"}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{r.author}</h4>
                  <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">
                    {r.role}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  {r.author.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Profile Action */}
        <div className="mt-12 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-sm shadow-sm hover:border-blue-500 hover:text-[#005BD3] hover:shadow transition-all"
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>View Mulan Laundries on Google Maps (179 E 105th St, NYC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
