export interface SiteTestimonial {
  id?: number;
  author: string;
  role?: string;
  quote: string;
  rating: number;
  source: string;
  display_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteFaq {
  id?: number;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SitePage {
  id?: number;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  heading?: string;
  subheading?: string;
  banner_image?: string;
  content?: any;
  status: "published" | "draft" | "archived";
  updated_at?: string;
}

export const DEFAULT_TESTIMONIALS: SiteTestimonial[] = [
  {
    author: "Charles N. Rock",
    role: "Commercial & Residential Client",
    quote: "Absolutely the best in town! The clothes are returned neatly folded, clean and smelling great.",
    rating: 5,
    source: "Google Review",
    display_order: 1,
    active: true,
  },
  {
    author: "Elena Rostova",
    role: "Boutique Hotel General Manager, Manhattan",
    quote: "Mulan Laundries handles our entire hotel linen rotation with zero downtime. Reliable, pristine pressing, and emergency deliveries when occupancy peaks.",
    rating: 5,
    source: "Verified Customer Review",
    display_order: 2,
    active: true,
  },
  {
    author: "Dr. Marcus Vance",
    role: "Clinical Director, NYC Medical Center",
    quote: "Universal precautions hygiene adherence is second to none. Lab coats and scrubs arrive sanitized, spotless, and individually wrapped.",
    rating: 5,
    source: "Google Review",
    display_order: 3,
    active: true,
  },
  {
    author: "David Kim",
    role: "Fitness Club Operator, Brooklyn",
    quote: "Our members expect soft, fresh workout towels daily. Mulan never misses a pickup and turnaround is lightning fast.",
    rating: 5,
    source: "Google Review",
    display_order: 4,
    active: true,
  }
];

export const DEFAULT_FAQS: SiteFaq[] = [
  {
    category: "Commercial Services",
    question: "How do commercial laundry accounts and customized pricing work?",
    answer: "Every commercial facility has unique volume, turnaround, and linen requirements. We provide tailored, call-based custom proposals with no hidden fees. Call us at (917) 365-4366 for a customized quote.",
    display_order: 1,
    active: true,
  },
  {
    category: "Turnaround & Timing",
    question: "What is your standard turnaround time?",
    answer: "Standard wash & fold is returned within 24 to 48 hours. For urgent commercial linen or hospitality needs, we offer express 12-hour and emergency same-day turnaround across New York City.",
    display_order: 2,
    active: true,
  },
  {
    category: "Coverage & Delivery",
    question: "Which areas of New York City do you cover?",
    answer: "We provide full door-to-door pickup and delivery across all five NYC boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island, 24 hours a day, 7 days a week.",
    display_order: 3,
    active: true,
  },
  {
    category: "Hygiene & Standards",
    question: "What sanitization and hygiene protocols do you follow?",
    answer: "We adhere strictly to universal precautions, OSHA regulations, and healthcare standards. All commercial and medical textiles are processed at high thermal temperatures with eco-friendly hospital-grade detergents.",
    display_order: 4,
    active: true,
  },
  {
    category: "Pickup & Ordering",
    question: "How do I schedule a pickup?",
    answer: "You can book directly through our online Book a Free Pickup form or call our dispatch desk at (917) 365-4366 anytime 24/7.",
    display_order: 5,
    active: true,
  }
];

export const DEFAULT_PAGES: SitePage[] = [
  {
    slug: "/",
    title: "Homepage",
    meta_title: "Mulan Laundries | Commercial Laundry & Linen Management NYC",
    meta_description: "Premier 24/7 commercial laundry, wash & fold, and linen service in NYC. Universal precautions hygiene, fast pickup & delivery across all 5 boroughs.",
    heading: "Clean Clothes, Fresh Life!",
    subheading: "Professional laundry & commercial linen management service with care, universal precautions hygiene & 24/7 on-time delivery across New York City.",
    banner_image: "/images/laundry-hero-inspiration.jpg",
    status: "published",
  },
  {
    slug: "/about",
    title: "About Us",
    meta_title: "About Mulan Laundries | 18+ Years NYC Laundry Excellence",
    meta_description: "Learn about Mulan Laundries' 18-year legacy in NYC, modern commercial facility in the Bronx, universal precautions hygiene, and dedicated staff.",
    heading: "18+ Years of NYC Laundry Excellence",
    subheading: "Trusted by top hospitals, luxury hotels, salons, and thousands of New York residents.",
    banner_image: "/images/about-us.webp",
    status: "published",
  },
  {
    slug: "/commercial-laundry",
    title: "Commercial Laundry Services",
    meta_title: "Commercial Laundry NYC | Mulan Laundries Linen Management",
    meta_description: "Commercial laundry and linen management for hotels, medical centers, Airbnb rentals, gyms, and spas across NYC. Call for custom business quotes.",
    heading: "Commercial Laundry & Linen Management",
    subheading: "Dedicated account management, universal precautions hygiene, and scalable capacity for New York enterprises.",
    banner_image: "/images/commercial-laundry.jpg",
    status: "published",
  },
  {
    slug: "/wash-fold",
    title: "Wash & Fold",
    meta_title: "Wash & Fold Laundry Service NYC | Free Pickup & Delivery",
    meta_description: "Professional wash, dry, and fold laundry service in New York City. Premium hypoallergenic detergents, neat folding, and convenient doorstep pickup.",
    heading: "Professional Wash & Fold Services",
    subheading: "Reclaim your free time with premium residential laundry pickup and delivery.",
    banner_image: "/images/washfold.jpg",
    status: "published",
  },
  {
    slug: "/pickup-request",
    title: "Schedule Free Pickup",
    meta_title: "Schedule Laundry Pickup NYC | Mulan Laundries",
    meta_description: "Schedule your free laundry pickup in NYC. Fast doorstep collection and prompt 24-48h turnaround.",
    heading: "Schedule Your Free Laundry Pickup",
    subheading: "Quick, convenient doorstep pickup across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.",
    banner_image: "/images/free-pickup.jpg",
    status: "published",
  },
  {
    slug: "/contact",
    title: "Contact Us",
    meta_title: "Contact Mulan Laundries | 24/7 NYC Laundry Dispatch",
    meta_description: "Contact Mulan Laundries 24/7 at (917) 365-4366 or info@mulanlaundries.com. NYC laundry and commercial linen specialists ready to assist.",
    heading: "We're Here 24/7 for Your Laundry Needs",
    subheading: "Call, email, or visit us. Our dispatch team is always available.",
    banner_image: "/images/about-4.jpg",
    status: "published",
  },
  {
    slug: "/services/hospital-laundry",
    title: "Hospital & Healthcare Laundry",
    meta_title: "Hospital Laundry Services NYC | Clinical Linen Sanitization",
    meta_description: "Universal precautions, OSHA and Joint Commission adherence for hospital laundry, scrubs, patient gowns, and surgical linens in NYC.",
    heading: "Hospital & Healthcare Linen Sanitization",
    subheading: "Strict pathogen elimination and hygienic linen management for medical clinics and hospitals.",
    banner_image: "/images/hospitals1.jpg",
    status: "published",
  },
  {
    slug: "/services/hotel-laundry",
    title: "Hotel & Hospitality Laundry",
    meta_title: "Hotel Laundry Services NYC | Luxury Linen & Rotary Pressing",
    meta_description: "High-volume hotel linen laundering, rotary iron pressing, and rapid room turnover support for NYC hospitality.",
    heading: "Luxury Hotel Laundry & Linen Services",
    subheading: "Crisp linens, plush bath towels, and scheduled 24/7 deliveries.",
    banner_image: "/images/hotels.jpg",
    status: "published",
  },
  {
    slug: "/services/short-term-rentals",
    title: "Airbnb & Short-Term Rentals",
    meta_title: "Airbnb & Short-Term Rental Laundry NYC | Fast Turnover",
    meta_description: "Reliable turnover laundry service for NYC Airbnb hosts and vacation rental property managers.",
    heading: "Short-Term Rental & Airbnb Linen Care",
    subheading: "Keep 5-star host ratings with spotless guest linens and quick turnovers.",
    banner_image: "/images/residential-services.jpg",
    status: "published",
  },
  {
    slug: "/services/gyms",
    title: "Gyms & Fitness Centers",
    meta_title: "Gym Towel Laundry Service NYC | Fitness Center Linens",
    meta_description: "Commercial towel laundering for gyms, yoga studios, and athletic clubs throughout New York City.",
    heading: "Fitness Center & Gym Towel Solutions",
    subheading: "High-temperature wash, sanitized fresh towels, reliable daily deliveries.",
    banner_image: "/images/gym.jpg",
    status: "published",
  },
  {
    slug: "/services/salons-spas",
    title: "Salons & Spas",
    meta_title: "Salon & Spa Towel Laundry NYC | Gentle Plush Linens",
    meta_description: "Professional towel and robe laundering for NYC salons and spas. Stain treatment for oils and dyes.",
    heading: "Spa & Salon Towel Laundry Services",
    subheading: "Plush, odor-free towels and robes treated for massage oils and treatment products.",
    banner_image: "/images/salons-_-spas.jpg",
    status: "published",
  },
  {
    slug: "/services/schools-dorms",
    title: "Schools & Dormitories",
    meta_title: "School & Dormitory Laundry NYC | Bulk Student Linens",
    meta_description: "Bulk student linen and campus laundry solutions for NYC schools, academies, and dormitories.",
    heading: "Campus & Dormitory Bulk Laundry",
    subheading: "Dependable bulk laundering for boarding schools, universities, and student housing.",
    banner_image: "/images/schools.jpg",
    status: "published",
  },
  {
    slug: "/services/shelter-homes",
    title: "Shelter Homes & Non-Profits",
    meta_title: "Shelter Home Bulk Laundry NYC | Compassionate Linen Care",
    meta_description: "High-capacity hygienic laundry services for shelter homes, residential facilities, and community organizations in NYC.",
    heading: "Shelter Homes & Community Facility Laundry",
    subheading: "Compassionate, high-volume laundry care adhering to strict sanitation standards.",
    banner_image: "/images/shelterHomes.jpg",
    status: "published",
  },
  {
    slug: "/services/bed-and-breakfast",
    title: "Bed & Breakfast Laundry",
    meta_title: "Bed & Breakfast Laundry NYC | Boutique Inn Linens",
    meta_description: "Custom linen laundering and rotary pressing tailored for boutique NYC inns and bed and breakfast establishments.",
    heading: "Boutique Bed & Breakfast Linen Services",
    subheading: "Attentive care for delicate duvet covers, luxury bedsheets, and plush towels.",
    banner_image: "/images/bedbreakfast.jpg",
    status: "published",
  },
  {
    slug: "/services/health-clubs",
    title: "Health Clubs & Wellness Centers",
    meta_title: "Health Club Linen Laundry NYC | Premium Spa & Bath Linens",
    meta_description: "Specialized laundry solutions for health clubs, wellness centers, and hydrotherapy spas in NYC.",
    heading: "Health Clubs & Wellness Laundry Solutions",
    subheading: "Thermal sanitization and hygienic freshness for premier wellness clubs.",
    banner_image: "/images/health-clubs.jpg",
    status: "published",
  }
];
