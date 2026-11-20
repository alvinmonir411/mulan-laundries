"use client";

// Client-side wrapper that lazily loads HeroSliderClient AFTER LCP.
// Must be a Client Component so that `ssr: false` is allowed.
import dynamic from "next/dynamic";

interface SlideData {
  id: number;
  image: string;
  alt: string;
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  isVideo?: boolean;
  videoSrc?: string;
}

const HeroSliderClient = dynamic(
  () => import("./HeroSliderClient").then((m) => m.HeroSliderClient),
  { ssr: false }
);

export function HeroSliderLazy({
  slides,
  posterImg,
  ctaPrimary,
  ctaSecondary,
}: {
  slides: SlideData[];
  posterImg: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}) {
  return (
    <HeroSliderClient
      slides={slides}
      posterImg={posterImg}
      ctaPrimary={ctaPrimary}
      ctaSecondary={ctaSecondary}
    />
  );
}
