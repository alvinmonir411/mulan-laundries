import { COMMERCIAL_SERVICES } from "./services";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    isMegaMenu: true,
    sections: [
      {
        category: "Residential Services",
        badge: "Everyday Laundry",
        overviewHref: "/wash-fold",
        overviewLabel: "Residential Hub",
        items: [
          {
            name: "Wash & Fold (Drop-Off & Pickup)",
            href: "/wash-fold",
            desc: "Regular everyday laundry, whites & colors separated, bundled in poly-wrap",
          },
          {
            name: "Bedding, Linens & Comforters",
            href: "/wash-fold#pricing",
            desc: "Duvets, heavy comforters, sheets & pillowcases gentle thermal wash",
          },
          {
            name: "Eco-Friendly / Hypoallergenic Care",
            href: "/wash-fold",
            desc: "Free & clear, perfume-free detergents safe for sensitive skin & infants",
          },
          {
            name: "Door-to-Door Pickup & Delivery",
            href: "/pickup-request",
            desc: "Free 24/7 scheduled pickup across Manhattan, Brooklyn, Queens & NYC",
          },
        ],
      },
      {
        category: "Commercial Service Divisions",
        badge: "Institutional & Bulk",
        overviewHref: "/commercial-laundry",
        overviewLabel: "Commercial Overview →",
        items: [
          {
            name: "Commercial Laundry Overview",
            href: "/commercial-laundry",
            desc: "1,000,000+ lbs annual capacity & OSHA/JCAHO regulated facility",
          },
          ...COMMERCIAL_SERVICES.map((s) => ({
            name: s.title,
            href: `/services/${s.slug}`,
            desc: s.tagline,
          })),
        ],
      },
    ],
  },
  { name: "Wash & Fold", href: "/wash-fold" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: [
    { name: "All Services Catalog", href: "/services" },
    { name: "Residential Wash & Fold", href: "/wash-fold" },
    { name: "Commercial Laundry Overview", href: "/commercial-laundry" },
    { name: "Hospital Laundry Services", href: "/services/hospital-laundry" },
    { name: "Short-Term Residential & Airbnb", href: "/services/short-term-rentals" },
    { name: "Hotels & Hospitality", href: "/services/hotel-laundry" },
    { name: "Gyms & Fitness Centers", href: "/services/gyms" },
    { name: "Health Clubs & Wellness", href: "/services/health-clubs" },
    { name: "Salons & Spas", href: "/services/salons-spas" },
    { name: "Schools & Dorms", href: "/services/schools-dorms" },
    { name: "Shelter Homes & Facilities", href: "/services/shelter-homes" },
    { name: "Bed & Breakfast Laundry", href: "/services/bed-and-breakfast" },
  ],
  company: [
    { name: "About Mulan Laundries", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Schedule a Pickup", href: "/pickup-request" },
    { name: "Track Request Status", href: "/track" },
    { name: "Contact Our NYC Team", href: "/contact" }
  ],
  legal: [
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" }
  ]
};
