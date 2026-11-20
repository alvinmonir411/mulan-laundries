import React from "react";
import dynamic from "next/dynamic";
import { HeroInspiration } from "@/components/sections/HeroInspiration";
import { ServicesGridInspiration } from "@/components/sections/ServicesGridInspiration";
import { HowItWorksInspiration } from "@/components/sections/HowItWorksInspiration";
import { PromoOfferBanner } from "@/components/sections/PromoOfferBanner";
import { TrustBadgesBar } from "@/components/sections/TrustBadgesBar";
import { BusinessIntro } from "@/components/sections/BusinessIntro";
import { CommercialFeature } from "@/components/sections/CommercialFeature";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ContactSnippet } from "@/components/sections/ContactSnippet";
import { getSiteImages } from "@/lib/images";
import { getSiteSettings } from "@/lib/settings";
import { fetchAllTestimonials } from "@/lib/cmsData";

const TestimonialInspiration = dynamic(
  () => import("@/components/sections/TestimonialInspiration").then((mod) => mod.TestimonialInspiration),
  { ssr: true }
);

export const revalidate = 60;

export default async function HomePage() {
  const [siteImages, siteSettings, testimonials] = await Promise.all([
    getSiteImages(),
    getSiteSettings(),
    fetchAllTestimonials(),
  ]);

  return (
    <>
      {/* 1. Hero Section matching Design Inspiration with Motion Video & Fallback Poster */}
      <HeroInspiration
        heroImage={siteImages.hero_main?.image_url}
        heroAlt={siteImages.hero_main?.alt_text}
        heroVideo={siteSettings.hero_video_url || "/images/slide1.webp"}
        videoPoster={siteImages.hero_main?.image_url || "/images/slide1.webp"}
        titleLine1={siteSettings.hero_title_line1}
        titleLine2={siteSettings.hero_title_line2}
        subtitle={siteSettings.hero_subtitle}
        badge={siteSettings.hero_badge}
        ctaPrimary={siteSettings.hero_cta_primary}
        ctaSecondary={siteSettings.hero_cta_secondary}
      />

      {/* 2. Services Grid (6 Cards with Circular Category Icons) */}
      <ServicesGridInspiration images={siteImages} />

      {/* 3. How It Works (4 Simple Connected Steps) */}
      <HowItWorksInspiration />

      {/* 5. Promotional Offer Banner (Get 20% OFF with code WELCOME20) */}
      <PromoOfferBanner
        promoImage={siteImages.promo_basket?.image_url}
        promoAlt={siteImages.promo_basket?.alt_text}
      />

      {/* 6. Trust & Quality Badges Bar (5 Horizontal Guarantees) */}
      <TrustBadgesBar />

      {/* 7. What Our Clients Say (5-Star Verified Google Testimonials Slider) */}
      <TestimonialInspiration testimonials={testimonials} />

      {/* 8. Business Heritage & Mission Overview (18+ Years NYC) */}
      <BusinessIntro
        aboutImage={siteImages.about_facility?.image_url}
        aboutAlt={siteImages.about_facility?.alt_text}
      />

      {/* 9. High-Volume Commercial Operations (1,000,000+ Lbs/Yr & OSHA/JCAHO) */}
      <CommercialFeature
        commercialImage={siteImages.service_commercial?.image_url}
        commercialAlt={siteImages.service_commercial?.alt_text}
      />

      {/* 10. All 9 B2B Commercial Verticals Grid */}
      <IndustriesGrid images={siteImages} />

      {/* 11. Contact Details & Interactive Message Form */}
      <ContactSnippet
        phone={siteSettings.phone}
        phoneRaw={siteSettings.phone_raw}
        email={siteSettings.email}
        address={siteSettings.address}
        hours={siteSettings.operating_hours}
      />
    </>
  );
}
