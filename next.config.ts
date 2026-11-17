import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,

  // ─── Bundle size: tree-shake lucide-react & other heavy libs ───────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@neondatabase/serverless",
    ],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year – immutable Next images
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about.php',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/commercial-laundry.php',
        destination: '/commercial-laundry',
        permanent: true,
      },
      {
        source: '/wash-fold.php',
        destination: '/wash-fold',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pickuprequest.php',
        destination: '/pickup-request',
        permanent: true,
      },
      {
        source: '/hospital-laundry-services.php',
        destination: '/services/hospital-laundry',
        permanent: true,
      },
      {
        source: '/laundry-services-short-term-residential-buildings.php',
        destination: '/services/short-term-rentals',
        permanent: true,
      },
      {
        source: '/laundry-services-health-clubs.php',
        destination: '/services/health-clubs',
        permanent: true,
      },
      {
        source: '/laundry-services-schools-dorms.php',
        destination: '/services/schools-dorms',
        permanent: true,
      },
      {
        source: '/laundry-services-shelter-homes.php',
        destination: '/services/shelter-homes',
        permanent: true,
      },
      {
        source: '/laundry-services-salons-spas.php',
        destination: '/services/salons-spas',
        permanent: true,
      },
      {
        source: '/laundry-services-gyms.php',
        destination: '/services/gyms',
        permanent: true,
      },
      {
        source: '/hotel-laundry-services.php',
        destination: '/services/hotel-laundry',
        permanent: true,
      },
      {
        source: '/bed-and-breakfast-laundry-services.php',
        destination: '/services/bed-and-breakfast',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // ── Security headers on every route ────────────────────────────────────
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Instruct browsers to upgrade insecure requests
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Restrict access to sensitive browser APIs not needed by this site
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
      // ── Long-lived cache for all static assets (images, fonts, videos) ─────
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          // Accept-Ranges allows byte-range requests (critical for video seek)
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ── Explicitly instruct browsers to preconnect to Next image CDN ──────
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '<https://res.cloudinary.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
