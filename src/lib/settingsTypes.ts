export interface SiteSettings {
  site_title: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_badge: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_video_url?: string;
  phone: string;
  phone_raw: string;
  email: string;
  address: string;
  operating_hours: string;
  favicon_url: string;
  logo_header: string;
  logo_footer: string;
  [key: string]: string | undefined;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_title: "Mulan Laundries",
  hero_title_line1: "Clean Clothes,",
  hero_title_line2: "Fresh Life!",
  hero_subtitle:
    "Professional laundry & commercial linen management service with care, universal precautions hygiene & 24/7 on-time delivery across New York City.",
  hero_badge: "New York Premier Laundry & Linen Management",
  hero_cta_primary: "Book a Free Pickup",
  hero_cta_secondary: "How It Works",
  hero_video_url: "/images/slide1.webp",
  phone: "(917) 365-4366",
  phone_raw: "+19173654366",
  email: "mulanlaundries@gmail.com",
  address: "New York City, Bronx, NY",
  operating_hours: "24 Hours a Day / 7 Days a Week",
  favicon_url: "/images/new-logo.webp",
  logo_header: "/images/new-logo.webp",
  logo_footer: "/images/new-logo-footer1.webp",
};
