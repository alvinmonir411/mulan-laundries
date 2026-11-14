import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
