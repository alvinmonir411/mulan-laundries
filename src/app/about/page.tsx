import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, CheckCircle2, ShieldCheck, ArrowRight, MapPin, Sparkles, Truck } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Mulan Laundries | 18+ Years NYC Commercial & Residential Laundry",
  description:
    "Learn about Mulan Laundries: New York's trusted commercial laundry and residential wash & fold service. 18-year brand heritage, universal precautions, and coverage across all 5 boroughs.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const images = await getSiteImages();
  const facilityImg = images.about_facility?.image_url || "/images/about-us.webp";
  const facilityAlt = images.about_facility?.alt_text || "Mulan Laundries heritage";
  const rawTeamImg = images.about_team?.image_url;
  // Guard against any leftover screenshot or pricing card image
  const teamImg =
    rawTeamImg && !rawTeamImg.includes("screenshot")
      ? rawTeamImg
      : "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908916/mulan-laundries/3449.jpg";
  const teamAlt = images.about_team?.alt_text || "Mulan Laundries dedicated laundry specialists";

  return (
    <>
      {/* Subpage Header Banner */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={facilityImg}
            alt={facilityAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>18-Year Brand Heritage</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Mulan Laundry Services: Pick Up, Wash, Dry, Fold – Commercial & Residential
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              New York’s premier pick-up and delivery laundry provider. Delivering precision, hygiene, and stress-free service directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                <span>Our Heritage & Mission</span>
              </div>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Proud to Be a Part of an 18-Year-Old Brand Based in New York
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Mulan Laundries is a premium pick-up and delivery laundry service in New York City. We provide wash and fold (bulk) laundry pick-up services for Residential and Commercial customers. We professionally clean and finish your garments, linens, and textiles, then return them to you neatly folded in protective plastic bags or on hangers ready to be put away.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our expertise and commitment to customer care delivers value through service with a high level of precision and personalised attention. Our long-standing industry experience gives us the capability and capacity to handle large volumes as well as ensuring efficiency, reliability, cost-effectiveness, and hygiene.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We are committed to bringing unique, reliable, stress-free daily, weekly, or bi-weekly laundry services directly to your doorstep or commercial facility. We operate across New York City to meet our customer needs wherever you are located.
              </p>

              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 flex items-start gap-3 text-sm text-sky-900">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  We guarantee the satisfaction of our customers by providing the best full laundry service in New York City.
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100 group">
                <Image
                  src={teamImg}
                  alt={teamAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 left-2 sm:-bottom-6 sm:-left-6 bg-navy-950/95 backdrop-blur-md text-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-[calc(100%-1rem)] sm:max-w-xs border border-white/10">
                <span className="text-2xl font-bold text-sky-400 block">18+ Years</span>
                <span className="text-xs text-slate-300">Of trusted commercial linen expertise in New York.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Process Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Dedicated Staff"
            title="The Mulan Laundries Team"
            subtitle="Ours is a team of experts who make sure that linens are not only picked safely from your workplace or home, but also washed, dried, folded, and delivered with the utmost care."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Efficient Workers & Care</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our team makes sure that your linens are handled with the utmost care and sensitivity until the time they are safely returned under your supervision.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Hygiene & Precautions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utmost importance is placed on hygiene during the cleaning process, following universal precautions and strict sanitation timing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Punctual NYC Delivery</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Process timing, strict deadlines, and punctual door-to-door delivery across all 5 New York City boroughs are rigorously honored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Callout Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Partner with Mulan Laundries?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              We serve residential needs and full commercial account services. Let us take care of your business laundry so you can concentrate on running your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pickup-request"
                className="w-full sm:w-auto px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Schedule Pickup
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
