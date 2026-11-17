import { COMMERCIAL_SERVICES } from "./services";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "All Services Overview", href: "/services", desc: "Browse full commercial & residential laundry catalog" },
      { name: "Residential Wash & Fold", href: "/wash-fold", desc: "Regular washing, drying & bundle folding" },
      { name: "Commercial Laundry Overview", href: "/commercial-laundry", desc: "1,000,000+ lbs capacity & OSHA/JCAHO standards" },
      ...COMMERCIAL_SERVICES.map(s => ({
        name: s.title,
        href: `/services/${s.slug}`,
        desc: s.tagline
      }))
    ]
  },
  { name: "Wash & Fold", href: "/wash-fold" },
  {
    name: "Commercial Laundry",
    href: "/commercial-laundry",
    dropdown: [
      { name: "Commercial Laundry Overview", href: "/commercial-laundry", desc: "1,000,000+ lbs capacity & institutional coverage" },
      ...COMMERCIAL_SERVICES.map(s => ({
        name: s.title,
        href: `/services/${s.slug}`,
        desc: s.tagline
      }))
    ]
  },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" }
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
