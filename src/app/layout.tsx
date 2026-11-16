import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCall } from "@/components/layout/MobileStickyCall";
import { BUSINESS_INFO } from "@/data/business";
import { getSiteImages } from "@/lib/images";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mulanlaundries.com"),
  title: {
    default: "Laundry Service in New York City (NYC) | Mulan Laundries",
    template: "%s | Mulan Laundries NYC",
  },
  description:
    "New York's premier commercial laundry and linen management company. 24/7/365 pickup and delivery across Manhattan, Brooklyn, Queens, Bronx, and Staten Island. 1,000,000+ lbs processed annually.",
  keywords: [
    "Commercial laundry service nyc",
    "laundry services new york city",
    "laundry service bronx",
    "linen management new york",
    "hotel laundry service nyc",
    "hospital laundry new york",
    "wash and fold laundry nyc",
    "pickup laundry service new york",
    "gym laundry service nyc",
    "airbnb laundry service new york"
  ],
  authors: [{ name: "Mulan Laundries" }],
  creator: "Mulan Laundries",
  publisher: "Mulan Laundries",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mulanlaundries.com",
    siteName: "Mulan Laundries",
    title: "Laundry Service in New York City (NYC) | Mulan Laundries",
    description:
      "Best-in-class commercial laundry service & linen management in New York. 24/7 pickup and delivery across all 5 NYC boroughs.",
    images: [
      {
        url: "/images/commercial-laundry.jpg",
        width: 1200,
        height: 630,
        alt: "Mulan Laundries Commercial Laundry Services New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry Service in New York City (NYC) | Mulan Laundries",
    description:
      "Commercial laundry and linen management in NYC. Processing 1,000,000+ lbs/yr. Operating 24/7, 365 days a year.",
    images: ["/images/commercial-laundry.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/new-logo.webp",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [images, settings] = await Promise.all([getSiteImages(), getSiteSettings()]);
  const headerLogo = images.logo_header?.image_url || settings.logo_header || "/images/new-logo.webp";
  const headerLogoAlt = images.logo_header?.alt_text || settings.site_title || "Mulan Laundries";
  const footerLogo = images.logo_footer?.image_url || settings.logo_footer || "/images/new-logo-footer1.webp";
  const footerLogoAlt = images.logo_footer?.alt_text || settings.site_title || "Mulan Laundries";
  const faviconUrl = settings.favicon_url || "/images/new-logo.webp";
  const phone = settings.phone || BUSINESS_INFO.phone;
  const phoneRaw = settings.phone_raw || BUSINESS_INFO.phoneRaw;
  const email = settings.email || BUSINESS_INFO.email;
  const address = settings.address || BUSINESS_INFO.fullAddress;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    name: settings.site_title || BUSINESS_INFO.name,
    legalName: "Mulan Laundries",
    url: "https://www.mulanlaundries.com",
    logo: `https://www.mulanlaundries.com${headerLogo}`,
    image: "https://www.mulanlaundries.com/images/commercial-laundry.jpg",
    telephone: phoneRaw,
    email: email,
    priceRange: "$$",
    description:
      "New York's premier commercial laundry and linen management company. 24/7 assistance, universal precautions, and pickup & delivery across all 5 NYC boroughs.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bronx",
      addressLocality: "New York City",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.8448,
      longitude: -73.8648,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: BUSINESS_INFO.serviceAreas.map((borough) => ({
      "@type": "AdministrativeArea",
      name: borough,
    })),
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-navy-900 flex flex-col min-h-screen">
        <TopBar phone={phone} phoneRaw={phoneRaw} />
        <Navbar logoUrl={headerLogo} logoAlt={headerLogoAlt} phone={phone} phoneRaw={phoneRaw} />
        <main className="flex-1">{children}</main>
        <Footer
          logoUrl={footerLogo}
          logoAlt={footerLogoAlt}
          phone={phone}
          phoneRaw={phoneRaw}
          email={email}
          address={address}
        />
        <MobileStickyCall phone={phone} phoneRaw={phoneRaw} />
      </body>
    </html>
  );
}
