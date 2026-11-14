# SEO Audit & Migration Strategy — Mulan Laundries

**Audit Date:** November 13, 2026  
**Auditor:** SEO Specialist (Agent 5)

---

## 1. Executive Summary of Current SEO State

The existing website suffers from severe on-page and technical SEO deficiencies that cripple its search engine visibility in the ultra-competitive New York City commercial laundry market:

| SEO Factor | Existing Status | Critical Vulnerability | Severity |
| :--- | :--- | :--- | :--- |
| **Meta Descriptions** | Missing on 13 of 16 pages | Search engines generate random snippet previews | **Critical** |
| **Page Titles** | Duplicate generic `"Mulan Laundries"` on 5 pages | Cannot rank for high-intent keywords | **Critical** |
| **Canonical Tags** | 0% implemented (Missing on 16/16 pages) | Self-cannibalization between `/` and `/index.php` | **Critical** |
| **Open Graph (OG) Tags** | 0% implemented (Missing on 16/16 pages) | Social shares display broken cards with no preview | **High** |
| **Structured Data (Schema)** | None (0% JSON-LD / Microdata) | Zero rich snippets; misses Google Maps Local Pack | **Critical** |
| **XML Sitemap** | Stale since Feb 21, 2020; misses 9 service pages | Google does not discover specialized service pages | **Critical** |
| **Robots.txt** | Minimal standard file; references stale sitemap | Sub-optimal crawler budget | **Medium** |
| **Heading Hierarchy** | Multiple H4s used for body text; illogical skips | Weak semantic structure for crawl algorithms | **Medium** |
| **Local SEO (NAP)** | Inconsistent phone numbers (212 vs 917); no geo-coordinates | Harmful to Google Local Pack rankings | **High** |

---

## 2. Page-by-Page SEO Metadata Inventory

| Existing URL | Live Title Tag | Live Meta Description | Evaluated Flaws & Recommended Action |
| :--- | :--- | :--- | :--- |
| `/` | `Laundry service in New York City (NYC)- Mulan Laundries` | `Wash and fold laundry service. Equipped with the latest technology. Best linen company at your doorstep. 24*7 Assistance available. Well Qualified staff. We use quality in exchange Quality. Call Now` (206 chars) | Description exceeds 160 char cutoff; awkward phrasing ("We use quality in exchange Quality"). Optimize to concise, high-converting commercial & residential pitch. |
| `/index.php` | Same as `/` | Same as `/` | Duplicate content. Must 301 redirect to `/`. |
| `/about.php` | `Mulan Laundries` | *(Empty / Missing)* | Generic title. Optimize to: `About Mulan Laundries | NYC Commercial Laundry Specialists`. |
| `/commercial-laundry.php` | `Mulan Laundries` | *(Empty / Missing)* | Generic title. Optimize to: `Commercial Laundry Services NYC | Linen Management | Mulan Laundries`. |
| `/wash-fold.php` | `Mulan Laundries` | *(Empty / Missing)* | Generic title. Optimize to: `Wash & Fold Laundry Pickup NYC | Mulan Laundries`. |
| `/contact.php` | `Mulan Laundries` | *(Empty / Missing)* | Generic title. Optimize to: `Contact Mulan Laundries | Commercial Quote & Inquiries | NYC`. |
| `/pickuprequest.php` | `Mulan Laundries` | *(Empty / Missing)* | Generic title. Optimize to: `Schedule Laundry Pickup | Mulan Laundries New York`. |
| `/hospital-laundry-services.php` | `Hospital Laundry Services \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write targeted meta description focusing on healthcare sanitation, JCAHO/OSHA compliance. |
| `/laundry-services-short-term-residential-buildings.php` | `Laundry Solutions for New York’s Short-Term Residential Buildings \| Mulan Laundries` | `Maintain high standards for Airbnb, serviced apartments, or rentals with timely, hygienic laundry. Contact Mulan Laundries today.` (117 chars) | Title and description are solid. Preserve and enhance with local NYC terms. |
| `/laundry-services-health-clubs.php` | `Laundry Solutions For Health Clubs \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting fitness clubs and wellness centers in NYC. |
| `/laundry-services-schools-dorms.php` | `Reliable Laundry Services for Schools and Dorms \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting universities and student dorms. |
| `/laundry-services-shelter-homes.php` | `Professional Laundry Services for Shelter Homes \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting non-profit shelters and community facilities. |
| `/laundry-services-salons-spas.php` | `Specialized Laundry Services for Salons and Spas \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting beauty salons and luxury day spas. |
| `/laundry-services-gyms.php` | `Reliable Laundry Services for Gyms \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting gyms and boxing/CrossFit studios. |
| `/hotel-laundry-services.php` | `Laundry Services for Hotels \| Mulan Laundries` | `Hotels trust Mulan Laundries for timely, professional laundry and linen management. Schedule your service now.` (93 chars) | Title and description are present. Enhance length to ~155 chars for better CTR. |
| `/bed-and-breakfast-laundry-services.php` | `Laundry Services for Bed & Breakfast \| Mulan Laundries` | *(Empty / Missing)* | Title is good. Write meta description targeting boutique inns and B&Bs. |

---

## 3. Structured Data (Schema.org) Strategy

To secure Google Rich Snippets, Local Knowledge Graph placement, and Google Maps Local Pack authority, the rebuild will inject semantic JSON-LD structured data on all pages:

### 3.1. Organization & LocalBusiness JSON-LD (Global):
```json
{
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  "name": "Mulan Laundries",
  "legalName": "Mulan Laundries LLC",
  "url": "https://www.mulanlaundries.com",
  "logo": "https://www.mulanlaundries.com/images/new-logo.webp",
  "image": "https://www.mulanlaundries.com/images/commercial-laundry.jpg",
  "telephone": "+1-917-365-4366",
  "email": "info@mulanlaundries.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bronx",
    "addressLocality": "New York City",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Manhattan" },
    { "@type": "AdministrativeArea", "name": "Brooklyn" },
    { "@type": "AdministrativeArea", "name": "Queens" },
    { "@type": "AdministrativeArea", "name": "The Bronx" },
    { "@type": "AdministrativeArea", "name": "Staten Island" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "priceRange": "$$",
  "sameAs": []
}
```

### 3.2. Service Schema on Dedicated Landing Pages:
Each commercial service page will output `@type: "Service"` linked directly to Mulan Laundries as the provider, defining the service type, area served, and offers.

---

## 4. Robots.txt and Dynamic XML Sitemap Plan

### Next.js `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.mulanlaundries.com/sitemap.xml',
  };
}
```

### Next.js `app/sitemap.ts`:
Dynamic generation including all 16 canonical pages with proper priorities:
- Homepage: `priority: 1.0`, `changefreq: 'weekly'`
- Commercial Hub & Wash & Fold: `priority: 0.9`, `changefreq: 'weekly'`
- 9 Commercial Service Verticals: `priority: 0.8`, `changefreq: 'monthly'`
- About, Contact, Pickup Request: `priority: 0.7`, `changefreq: 'monthly'`
