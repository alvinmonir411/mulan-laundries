export interface SiteImage {
  id?: number;
  slot_key: string;
  title: string;
  section: string;
  image_url: string;
  alt_text: string;
  updated_at?: string;
}

export const DEFAULT_SITE_IMAGES: SiteImage[] = [
  {
    slot_key: "logo_header",
    title: "Header Main Brand Logo",
    section: "Branding",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908949/mulan-laundries/new-logo.webp",
    alt_text: "Mulan Laundries"
  },
  {
    slot_key: "logo_footer",
    title: "Footer White Logo",
    section: "Branding",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908949/mulan-laundries/new-logo-footer1.webp",
    alt_text: "Mulan Laundries"
  },
  {
    slot_key: "hero_main",
    title: "Hero Main Composition (Washing Machine & Basket)",
    section: "Hero",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908947/mulan-laundries/laundry-hero-inspiration.jpg",
    alt_text: "Clean modern washing machine with colorful folded towels in wicker basket"
  },
  {
    slot_key: "service_wash_fold",
    title: "Services: Wash & Fold Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908960/mulan-laundries/washfold.jpg",
    alt_text: "Wash and Fold regular laundry"
  },
  {
    slot_key: "service_commercial",
    title: "Services: Commercial Linen Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908930/mulan-laundries/commercial-laundry.jpg",
    alt_text: "High-capacity commercial laundry automated processing plant"
  },
  {
    slot_key: "service_rotary_pressing",
    title: "Services: Rotary Pressing / Hotels Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908942/mulan-laundries/hotels.jpg",
    alt_text: "Rotary pressing and hotel bedsheets"
  },
  {
    slot_key: "service_hospital",
    title: "Services: Hospital & Healthcare Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908941/mulan-laundries/hospital-loundry-img.jpg",
    alt_text: "Hospital healthcare laundry sanitization"
  },
  {
    slot_key: "service_rentals",
    title: "Services: Short-Term Rentals & Airbnb Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908950/mulan-laundries/residential-services.jpg",
    alt_text: "Short term residential apartment laundry"
  },
  {
    slot_key: "service_special_care",
    title: "Services: Special Care Items / B&B Card",
    section: "Services",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908922/mulan-laundries/bedbreakfast.jpg",
    alt_text: "Luxury bed linens, duvet and specialty blanket care"
  },
  {
    slot_key: "pricing_basket",
    title: "Turnaround & Logistics: Folded Towel Basket",
    section: "Logistics",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908960/mulan-laundries/washfold.jpg",
    alt_text: "Fresh folded towels in delivery basket"
  },
  {
    slot_key: "promo_basket",
    title: "20% OFF Offer: Promo Delivery Basket",
    section: "Promotions",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908931/mulan-laundries/free-pickup.jpg",
    alt_text: "Promotional delivery basket"
  },
  {
    slot_key: "about_facility",
    title: "About Us: Facility Showcase Image",
    section: "About",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908922/mulan-laundries/about-us.webp",
    alt_text: "Mulan Laundries NYC commercial facility"
  },
  {
    slot_key: "about_team",
    title: "About Us: Dedicated Workers & Staff",
    section: "About",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908916/mulan-laundries/3449.jpg",
    alt_text: "Dedicated Mulan Laundries professional laundry specialists"
  },
  {
    slot_key: "pickup_banner",
    title: "Pickup Section: NYC Delivery Van",
    section: "Dispatch",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908931/mulan-laundries/free-pickup.jpg",
    alt_text: "Mulan Laundries free pickup delivery van"
  },
  {
    slot_key: "service_gyms",
    title: "Commercial: Gyms & Fitness Centers",
    section: "Commercial Verticals",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908936/mulan-laundries/gym.jpg",
    alt_text: "Gym workout towel service"
  },
  {
    slot_key: "service_health_clubs",
    title: "Commercial: Health Clubs & Wellness",
    section: "Commercial Verticals",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908936/mulan-laundries/health-clubs.jpg",
    alt_text: "Health clubs and luxury wellness plush towels laundry"
  },
  {
    slot_key: "service_salons_spas",
    title: "Commercial: Salons & Spas Plush Towels",
    section: "Commercial Verticals",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908951/mulan-laundries/salons-_-spas.jpg",
    alt_text: "Salons and spas plush towels"
  },
  {
    slot_key: "service_schools_dorms",
    title: "Commercial: Schools & Dormitories",
    section: "Commercial Verticals",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908952/mulan-laundries/schools.jpg",
    alt_text: "Schools and student dorm laundry"
  },
  {
    slot_key: "service_shelter_homes",
    title: "Commercial: Shelter Homes & Facilities",
    section: "Commercial Verticals",
    image_url: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1794908953/mulan-laundries/shelterHomes.jpg",
    alt_text: "Shelter homes bulk laundry care"
  }
];
