# Image Asset Inventory — Mulan Laundries

**Audit Date:** November 13, 2026  
**Auditor:** UI/UX Design Architect (Agent 3) & Frontend Architect (Agent 4)

---

## 1. Image Discovery & Asset Overview

During the discovery phase, **46 distinct image assets** were extracted from the live production site and downloaded into the local archive (`crawler/images/`). The legacy website utilized a mix of modern WebP images, standard JPEGs, and PNG sprites.

| Asset Category | File Count | Formats Found | Primary Purpose | Quality Assessment |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Identity** | 2 | WebP | Header & Footer Logos | Sharp vector-rendered WebP graphics; ready for Next.js `<Image />` |
| **Industry Service Heroes** | 10 | JPG | Dedicated landing page headers for all commercial verticals | High-relevance photography; good resolution (~300KB-450KB) |
| **Feature & Step Icons** | 6 | PNG | "Why Choose Us" & "How It Works" icons | Clean transparent PNGs; can be augmented with modern SVG Lucide icons |
| **Slider Backgrounds** | 5 | WebP, JPG | Revolution Slider desktop background slides | Decent quality; legacy slider animation requires modern CSS transition |
| **Decorative Sprites** | 18 | PNG | Bubble and glow effects for Revolution Slider | Legacy animated artifacts; can be replaced with lightweight modern CSS blur/gradient effects |
| **Content Story Imagery** | 5 | WebP, JPG | About page and callout banners | Clean real-world laundry and delivery imagery |

---

## 2. Complete Asset Catalog

| # | Filename | Size (Bytes) | Format | Original Source URL | Context / Pages Displayed | Alt Text on Live Site |
|---|---|---|---|---|---|---|
| 1 | `new-logo.webp` | 6,798 | WebP | `images/new-logo.webp` | Global Header Navigation | `"Mulan Laundries"` |
| 2 | `new-logo-footer1.webp` | 4,268 | WebP | `images/new-logo-footer1.webp` | Global Footer | `""` (Missing) |
| 3 | `about-us.webp` | 56,716 | WebP | `images/about-us.webp` | Homepage & About Page | `"About Us"` |
| 4 | `about-4.jpg` | 34,294 | JPG | `images/about-4.jpg` | About Page Team Section | `""` (Missing) |
| 5 | `commercial-laundry.jpg` | 269,237 | JPG | `images/commercial-laundry.jpg` | Commercial Laundry Page | `""` (Missing) |
| 6 | `washfold.jpg` | 353,087 | JPG | `images/washfold.jpg` | Wash & Fold Page | `""` (Missing) |
| 7 | `free-pickup.jpg` | 60,924 | JPG | `images/free-pickup.jpg` | Homepage & Service Banners | `"Free Cleanup"` (Typo in original) |
| 8 | `hospitals1.jpg` | 396,737 | JPG | `images/hospitals1.jpg` | Hospital Laundry Services | `""` (Missing) |
| 9 | `hospital-loundry-img.jpg` | 26,107 | JPG | `images/hospital-loundry-img.jpg` | Hospital Laundry Page | `""` (Missing) |
| 10 | `residential-services.jpg` | 346,320 | JPG | `images/residential-services.jpg` | Short-Term Rentals Page | `""` (Missing) |
| 11 | `health-clubs.jpg` | 419,258 | JPG | `images/health-clubs.jpg` | Health Clubs Page | `""` (Missing) |
| 12 | `schools.jpg` | 304,787 | JPG | `images/schools.jpg` | Schools & Dorms Page | `""` (Missing) |
| 13 | `shelterHomes.jpg` | 382,364 | JPG | `images/shelterHomes.jpg` | Shelter Homes Page | `""` (Missing) |
| 14 | `salons-_-spas.jpg` | 266,818 | JPG | `images/salons-_-spas.jpg` | Salons & Spas Page | `""` (Missing) |
| 15 | `gym.jpg` | 298,550 | JPG | `images/gym.jpg` | Gyms Page | `""` (Missing) |
| 16 | `hotels.jpg` | 269,756 | JPG | `images/hotels.jpg` | Hotel Laundry Services | `""` (Missing) |
| 17 | `bedbreakfast.jpg` | 435,398 | JPG | `images/bedbreakfast.jpg` | Bed & Breakfast Page | `""` (Missing) |
| 18 | `3449.jpg` | 373,912 | JPG | `images/3449.jpg` | Service Pages & Gallery | `""` (Missing) |
| 19 | `6144.jpg` | 379,763 | JPG | `images/6144.jpg` | Service Pages & Gallery | `""` (Missing) |
| 20 | `img_icon_01.png` | 6,489 | PNG | `images/img_icon_01.png` | Personalized Experience Icon | `""` (Missing) |
| 21 | `img_icon_02.png` | 5,596 | PNG | `images/img_icon_02.png` | Affordable Pricing Icon | `""` (Missing) |
| 22 | `img_icon_03.png` | 4,224 | PNG | `images/img_icon_03.png` | Convenience Icon | `""` (Missing) |
| 23 | `img_icon_04.png` | 4,541 | PNG | `images/img_icon_04.png` | Quality Icon | `""` (Missing) |
| 24 | `img_icon_05.png` | 4,377 | PNG | `images/img_icon_05.png` | Express Delivery Icon | `""` (Missing) |
| 25 | `img_icon_06.png` | 4,212 | PNG | `images/img_icon_06.png` | Instant Order Update Icon | `""` (Missing) |
| 26 | `slide1.webp` | 104,504 | WebP | `images/slider/slide1.webp` | Hero Slide 1 (Machinery & Linens) | `"slide1"` |
| 27 | `slide1-1.webp` | 21,176 | WebP | `images/slider/slide1-1.webp` | Hero Slide 1 Overlay | `""` (Missing) |
| 28 | `slide1-2.webp` | 70,958 | WebP | `images/slider/slide1-2.webp` | Hero Slide 1 Laundry Basket | `""` (Missing) |
| 29 | `slide2.webp` | 56,202 | WebP | `images/slider/slide2.webp` | Hero Slide 2 (Hotel & Commercial) | `"slide1"` |
| 30 | `slide3.jpg` | 94,006 | JPG | `images/slider/slide3.jpg` | Hero Slide 3 (Folded Towels) | `"slide1"` |
| 31 | `slide4.webp` | 85,514 | WebP | `images/slider/slide4.webp` | Hero Slide 4 (Delivery Van / Staff) | `"slide1"` |
| 32–46 | `bubble-*.png` / `glow-*.png` | ~5KB–22KB | PNG | `images/slider/...` | Slider decorative bubble particles | `""` (Decorative) |

---

## 3. Critical Accessibility & Performance Deficiencies in Existing Assets

1. **Missing or Broken Alt Attributes:** Over 75% of images on the existing website completely lack `alt` text (empty `alt=""`), and several images have generic or misleading text such as `alt="slide1"` or `alt="Free Cleanup"` (instead of Free Pickup).
2. **Missing Width and Height Attributes:** Images on the legacy site lack explicit width and height dimensions, triggering significant Cumulative Layout Shift (CLS) during browser rendering.
3. **No Responsive `srcset` / Modern Sizing:** Desktop users and mobile users are served the exact same 450KB unscaled JPEG files, wasting bandwidth and slowing mobile page speeds.
4. **Heavy Animation Sprites:** 18 separate PNG bubble and glow image files were downloaded on every page load to power Revolution Slider animations, incurring 18 redundant HTTP requests.

---

## 4. Rebuild Asset Strategy (Next.js 16+ Image Optimization)

1. **Retain and Relocate Verified Assets:** Copy all verified photography (`hotels.jpg`, `hospitals1.jpg`, `washfold.jpg`, `commercial-laundry.jpg`, `new-logo.webp`, etc.) directly into `public/images/`.
2. **Implement Next.js `<Image />`:**
   - Automatic WebP/AVIF generation at build and request time.
   - Exact `width`, `height`, and `sizes` attributes for zero CLS.
   - Descriptive, accessible `alt` text adhering to WCAG 2.1 AA standards.
3. **Replace Sprites with Tailwind CSS:** Replace all 18 PNG bubble and glow sprites with ultra-lightweight, hardware-accelerated CSS animations (`backdrop-blur`, subtle pulse and gradient effects) saving ~250KB in payload and 18 HTTP requests.
4. **High-DPI SVG Iconography:** Pair verified PNG icons with modern vector icons (Lucide Icons) for crisp display on Retina and 4K displays.
