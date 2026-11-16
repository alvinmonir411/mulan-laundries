export interface ServiceItem {
  id: string;
  slug: string;
  legacyUrl: string;
  title: string;
  tagline: string;
  shortDesc: string;
  heroImage: string;
  badge: string;
  fullOverview: string[];
  linensHandled: {
    category: string;
    items: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  keyBenefits: {
    title: string;
    desc: string;
  }[];
  standards: string[];
}

export const COMMERCIAL_SERVICES: ServiceItem[] = [
  {
    id: "hospital-laundry",
    slug: "hospital-laundry",
    legacyUrl: "/hospital-laundry-services.php",
    title: "Hospital Laundry Services",
    tagline: "Precision Cleaning & Hygienic Linen Management for Healthcare Facilities",
    shortDesc: "Universal precautions, soil-level sorting to prevent cross-contamination, and 24/7/365 coverage for New York hospitals and surgical centers.",
    heroImage: "/images/hospital-loundry-img.jpg",
    badge: "Healthcare & Clinical Sanitation",
    fullOverview: [
      "At Mulan Laundries, we understand the critical pressures hospitals face. Clean linens, patient gowns, towels, and staff uniforms are essential to smooth operations, staff efficiency, and patient comfort.",
      "Our New York-based team ensures every item is spotless, pressed, and delivered on time, so your medical staff can focus on what matters most: patient care.",
      "Hospital laundry requires meticulous handling, strict timing, and hygiene standards that cannot be compromised. Mulan Laundries follows a structured process for every load, operating under universal precautions to adhere to OSHA and Joint Commission (JCAHO) regulated standards."
    ],
    linensHandled: [
      { category: "Patient Apparel", items: "Patient gowns, pediatric gowns, examination capes", description: "Hygienically washed with gentle, non-irritating, hypoallergenic agents." },
      { category: "Bedding & Linens", items: "Fitted & flat hospital sheets, thermal blankets, pillowcases", description: "High-temperature wash and thermal drying to ensure total pathogen elimination." },
      { category: "Staff & Surgical Wear", items: "Medical scrubs, surgical coats, lab coats, warm-up jackets", description: "Deep stain treatment to remove biological fluids while preserving textile longevity." },
      { category: "Towels & Bath Linens", items: "Patient towels, washcloths, bath blankets", description: "Ultra-absorbent, soft-finish washing dried promptly to reduce wrinkling." }
    ],
    processSteps: [
      { step: "01", title: "Careful Sorting", desc: "Patient gowns, sheets, blankets, and uniforms are separated by type, color, and level of soil to prevent cross-contamination." },
      { step: "02", title: "Advanced Stain Treatment & Precision Wash", desc: "High-performance industrial machines and tailored solutions remove stubborn soils while preserving textile strength." },
      { step: "03", title: "Professional Drying & Protective Packaging", desc: "Linens are dried, wrinkle-pressed, and sealed in customized protective poly-wrap for safe transport and immediate usability." }
    ],
    keyBenefits: [
      { title: "24/7/365 Emergency Availability", desc: "Hospitals never pause, and neither do we. We support sudden surges in patient load, holidays, and emergency linen shortages." },
      { title: "Universal Infection Control", desc: "Strict adherence to universal precautions in processing to safeguard patients and hospital staff." },
      { title: "Dedicated Healthcare Account Manager", desc: "A personal specialist works directly with your facility team to ensure your linen supply is predictable and stress-free." },
      { title: "Coverage Across All 5 NYC Boroughs", desc: "Reliable dispatch throughout Manhattan, Brooklyn, Queens, The Bronx, and Staten Island." }
    ],
    standards: [
      "Universal Precautions adherence",
      "OSHA regulated standards compliance",
      "Joint Commission (JCAHO) sanitization procedures",
      "Hypoallergenic & non-toxic sanitizing formulas"
    ]
  },
  {
    id: "short-term-rentals",
    slug: "short-term-rentals",
    legacyUrl: "/laundry-services-short-term-residential-buildings.php",
    title: "Short-Term Residential & Airbnb Laundry",
    tagline: "Turnaround-Ready Linens for New York's Serviced Apartments & Vacation Rentals",
    shortDesc: "Maintain high standards for Airbnb, serviced apartments, and residential buildings with fast, hygienic turnover laundry.",
    heroImage: "/images/residential-services.jpg",
    badge: "Turnover & Property Management",
    fullOverview: [
      "Short-term residential buildings operate on tight schedules, and every hour counts between check-outs and check-ins. Mulan Laundries provides timely service across New York to keep your units guest-ready without delays.",
      "We coordinate around your turnover schedules to minimize disruption. For last-minute bookings or unexpected guest changes, we can expedite cleaning and delivery within hours.",
      "Property managers receive instant notifications at every stage, from pickup to delivery, ensuring transparency and complete peace of mind."
    ],
    linensHandled: [
      { category: "Bedding Sets", items: "Fitted sheets, duvet covers, pillowcases, mattress protectors", description: "Crisply ironed and organized by bed size for fast turnover housekeeping." },
      { category: "Bath Linens", items: "Plush bath towels, hand towels, washcloths, bath mats", description: "Fluffy, pristine white towels that make an immediate positive impression." },
      { category: "Kitchen & Dining", items: "Kitchen tea towels, dish cloths, dining placemats", description: "Treated for food and grease stains with fabric-safe degreasing formulas." },
      { category: "Decorative & Throws", items: "Throw blankets, decorative pillow shams, cushions", description: "Gentle specialty cleaning preserving softness and colors." }
    ],
    processSteps: [
      { step: "01", title: "Order & Schedule", desc: "Submit your request online or by phone. We coordinate precisely with your check-in/check-out windows." },
      { step: "02", title: "Punctual Pickup", desc: "Uniformed drivers arrive on schedule, collecting used linens with secure tagging and tracking." },
      { step: "03", title: "Unit-Ready Delivery", desc: "Returned freshly laundered, pressed, and neatly bundled in clear plastic bags ready for instant bed making." }
    ],
    keyBenefits: [
      { title: "Fast Turnover Cycles", desc: "Same-day rush options designed specifically for tight check-out/check-in windows." },
      { title: "Five-Star Guest Quality", desc: "Spotless, crisp sheets and fluffy towels that boost 5-star reviews and guest ratings." },
      { title: "Real-Time Tracking", desc: "Instant SMS/email updates so property managers always know delivery status." },
      { title: "Bulk & Multi-Property Pricing", desc: "Affordable volume rates for portfolio managers and building operators." }
    ],
    standards: [
      "Rigorous stain inspection before washing",
      "Unit-ready poly-wrap bundling",
      "Hypoallergenic, skin-safe detergents",
      "Express same-day dispatch available"
    ]
  },
  {
    id: "health-clubs",
    slug: "health-clubs",
    legacyUrl: "/laundry-services-health-clubs.php",
    title: "Health Clubs & Wellness Laundry",
    tagline: "High-Performance Laundry Solutions That Keep Wellness Centers at Peak Quality",
    shortDesc: "Continuous towel replenishment, odor elimination, and flexible pickup schedules tailored to health clubs and wellness spas.",
    heroImage: "/images/health-clubs.jpg",
    badge: "Athletics & Wellness",
    fullOverview: [
      "In New York, health clubs and wellness centers demand hygiene, precision, and high standards. Every towel, uniform, and mat reflects your facility's commitment to members.",
      "One missed delivery or a pile of unwashed towels can disrupt classes, frustrate staff, and leave members unimpressed. Mulan Laundries steps in to handle the laundry so you can focus on creating an extraordinary member experience.",
      "We provide a professional, reliable, and fast laundry service designed to keep every towel, uniform, and mat ready for action, no matter how busy your class schedules get."
    ],
    linensHandled: [
      { category: "Workout Towels", items: "Hand sweat towels, bench towels, microfiber fitness cloths", description: "Washed with deep odor-neutralizing enzymes to destroy perspiration residues." },
      { category: "Locker Room Linens", items: "Luxury bath towels, hand towels, bath mats, sauna wraps", description: "Ultra-absorbent, plush finish dried at exact temperatures." },
      { category: "Facility & Mat Covers", items: "Yoga mat covers, massage table towels, stretch table sheets", description: "Sanitized to eliminate skin bacteria and oils." },
      { category: "Staff Apparel", items: "Trainer polos, front desk apparel, maintenance uniforms", description: "Cleaned and pressed to maintain a sharp brand appearance." }
    ],
    processSteps: [
      { step: "01", title: "Scheduled Order", desc: "Place request online or setup automated daily/bi-weekly pickup cycles." },
      { step: "02", title: "Off-Peak Collection", desc: "Our team collects soiled linens during off-peak hours to avoid disruption to members." },
      { step: "03", title: "Fresh Delivery", desc: "Linens return clean, pressed, and stacked for effortless locker room distribution." }
    ],
    keyBenefits: [
      { title: "Surge & Emergency Readiness", desc: "Prioritized loads for unexpected class attendance surges or special fitness events." },
      { title: "Odor Neutralization", desc: "Specialized formulas eliminate tough workout sweat odors and bacteria completely." },
      { title: "Continuous Supply", desc: "Flexible swap programs ensure your towel bins are never empty." },
      { title: "All NYC Boroughs Serviced", desc: "Dependable dispatch throughout Manhattan, Brooklyn, Queens, Bronx, and Staten Island." }
    ],
    standards: [
      "High-temp thermal bacteria elimination",
      "Odor-targeting enzymatic formulas",
      "Consistent folded bundle counts",
      "24/7 customer service support"
    ]
  },
  {
    id: "schools-dorms",
    slug: "schools-dorms",
    legacyUrl: "/laundry-services-schools-dorms.php",
    title: "Schools, Colleges & Dorms Laundry",
    tagline: "Reliable High-Volume Laundry Services for Academic Institutions & Student Housing",
    shortDesc: "Scalable bulk laundry for boarding schools, college dormitories, dining halls, and athletics departments across NYC.",
    heroImage: "/images/schools.jpg",
    badge: "Education & Campus Living",
    fullOverview: [
      "Managing student dormitories and school facilities in New York requires reliable logistical support. Mulan Laundries delivers high-volume laundry capacity built specifically for campus housing and academic departments.",
      "Whether handling regular semester bedding swaps, dining hall tablecloths, or athletic team jerseys, our experienced team ensures prompt turnaround and hygienic wash processes.",
      "We work closely with facility directors and campus housing coordinators to establish dependable schedules that align with academic calendars and break periods."
    ],
    linensHandled: [
      { category: "Student Bedding", items: "Twin XL sheets, comforters, blankets, pillowcases", description: "Cleaned with allergy-free detergents to protect sensitive student skin." },
      { category: "Campus Dining Linens", items: "Tablecloths, cloth napkins, apron sets, kitchen towels", description: "Treated for food and beverage stains with commercial stain-lifting agents." },
      { category: "Athletic Departments", items: "Jerseys, practice pinnies, team warm-ups, workout towels", description: "Washed with color-safe detergents preserving team logos and numbers." },
      { category: "Communal Housing Linens", items: "Shower curtains, communal lounge covers, bath mats", description: "Thoroughly disinfected to maintain healthy dorm environments." }
    ],
    processSteps: [
      { step: "01", title: "Campus Logistics Plan", desc: "We coordinate designated drop-off and pickup locations across campus buildings." },
      { step: "02", title: "Organized Sorting", desc: "Items are segregated by department, residence hall, or student group." },
      { step: "03", title: "Bundled Return", desc: "Delivered neatly packaged, labeled, and ready for immediate distribution." }
    ],
    keyBenefits: [
      { title: "High-Volume Capacity", desc: "Capable of handling massive batch sizes during semester move-ins and move-outs." },
      { title: "Hypoallergenic Formats", desc: "ECOS eco-friendly and allergy-free detergents safe for all students." },
      { title: "Academic Calendar Scheduling", desc: "Custom pickup frequencies tailored to semester schedules and holidays." },
      { title: "Institutional Account Management", desc: "Centralized invoicing and dedicated institutional account support." }
    ],
    standards: [
      "Rigid item accounting and tracking",
      "Non-toxic, allergy-free washing agents",
      "Punctual scheduled campus delivery",
      "Adherence to campus safety protocols"
    ]
  },
  {
    id: "shelter-homes",
    slug: "shelter-homes",
    legacyUrl: "/laundry-services-shelter-homes.php",
    title: "Shelter Homes & Non-Profit Facilities",
    tagline: "Compassionate, Dependable Bulk Laundry Care for Community Housing & Shelters",
    shortDesc: "Universal precautions, heavy-duty thermal sanitation, and cost-effective bulk pricing for transitional housing and shelter facilities.",
    heroImage: "/images/shelterHomes.jpg",
    badge: "Community & Non-Profit Services",
    fullOverview: [
      "Shelter homes and transitional housing organizations perform indispensable work across New York City. Clean, fresh bedding and clothing are vital to providing dignity, comfort, and health to residents.",
      "Managing a shelter leaves little room for complicated processes. Mulan Laundries takes on the heavy lifting with dependable, discreet, and respectful bulk laundry services.",
      "We operate under strict universal precautions to ensure total hygiene and pathogen elimination, while offering compassionate, budget-friendly rates for non-profit and municipal community facilities."
    ],
    linensHandled: [
      { category: "Bedding & Blankets", items: "Heavy-duty blankets, sheets, pillowcases, waterproof mattress covers", description: "High-temperature wash cycles ensuring deep sanitization and pest elimination." },
      { category: "Resident Personal Items", items: "Wash & fold clothing, personal garments, jackets", description: "Sorted by resident bag or tag, gently cleaned, dried, and bundled." },
      { category: "Bath Linens", items: "Bath towels, hand towels, washcloths", description: "Sanitized and dried to a clean, fresh, absorbent finish." },
      { category: "Facility Linens", items: "Dining room napery, kitchen towels, cleaning rags", description: "Treated to meet sanitary municipal housing guidelines." }
    ],
    processSteps: [
      { step: "01", title: "Respectful Pickup", desc: "Uniformed drivers collect bagged bulk laundry directly from your facility on schedule." },
      { step: "02", title: "Thermal Sanitization", desc: "Industrial high-heat washing eliminates bacteria, allergens, and bedbugs completely." },
      { step: "03", title: "Organized Delivery", desc: "Clean linens are sealed in protective poly-wrap and returned ready for immediate resident assignment." }
    ],
    keyBenefits: [
      { title: "Budget-Conscious Pricing", desc: "Special non-profit contract structures designed to maximize social service budgets." },
      { title: "Universal Hygiene Precautions", desc: "Medical-grade sanitation safeguarding vulnerable residents and facility staff." },
      { title: "Reliable Route Schedules", desc: "Consistent pickups that shelter managers can depend on without fail." },
      { title: "Citywide Reach", desc: "Serving shelters across Manhattan, Brooklyn, Queens, Bronx, and Staten Island." }
    ],
    standards: [
      "Universal precautions in processing",
      "High-heat thermal sanitation",
      "Discreet, courteous logistical support",
      "Transparent weight-based billing"
    ]
  },
  {
    id: "salons-spas",
    slug: "salons-spas",
    legacyUrl: "/laundry-services-salons-spas.php",
    title: "Salons & Spas Laundry Services",
    tagline: "Luxurious Softness & Deep Stain Removal for NYC's Premier Beauty Studios",
    shortDesc: "Specialized removal of massage oils, cosmetic dyes, and facial treatments while preserving towel softness and color vibrancy.",
    heroImage: "/images/salons-_-spas.jpg",
    badge: "Beauty & Day Spas",
    fullOverview: [
      "In luxury spas and top-tier beauty salons, clients expect immaculate cleanliness and plush comfort. Soft, fresh-smelling towels and pristine massage sheets are essential to the relaxation experience.",
      "However, spa linens face severe challenges from massage oils, chemical hair colorants, waxes, and facial masks that degrade fabrics and cause unpleasant odors if improperly washed.",
      "Mulan Laundries uses specialized oil-lifting formulas and gentle, eco-friendly detergents that dissolve stubborn residue while preserving the fluffy texture and vibrant colors of your salon linens."
    ],
    linensHandled: [
      { category: "Facial & Esthetician Towels", items: "Steamer towels, micro-facial cloths, headband wraps", description: "Hypoallergenic, ultra-soft cleaning free from irritating fragrances." },
      { category: "Massage Linens", items: "Massage table fitted sheets, flat drape sheets, fleece pads", description: "Deep oil-stripping wash preventing rancid oil build-up." },
      { category: "Salon Apparel & Drapes", items: "Stylist capes, shampoo neck towels, cutting drapes", description: "Color-safe stain removal for tints, bleaches, and hair products." },
      { category: "Luxury Robes & Slippers", items: "Plush spa robes, waffle-weave wraps, spa slippers", description: "Fluffed and folded to give your clients a five-star spa journey." }
    ],
    processSteps: [
      { step: "01", title: "Effortless Request", desc: "Schedule pickups based on your salon's appointment flow and peak weekend demand." },
      { step: "02", title: "Targeted Oil Extraction", desc: "Specialized wash chemistry strips away deep cosmetic and massage oil residues." },
      { step: "03", title: "Silky Soft Delivery", desc: "Towels return velvety soft, odor-free, and neatly stacked for immediate treatment room setup." }
    ],
    keyBenefits: [
      { title: "Oil & Dye Elimination", desc: "Proprietary wash formulas break down massage oils without degrading fabric fibers." },
      { title: "Ultra-Soft Finish", desc: "Conditioning rinses ensure towels stay luxurious and gentle against delicate facial skin." },
      { title: "Weekend Surge Support", desc: "Fast turnaround so you never run out of clean towels during busy Friday-Sunday bookings." },
      { title: "Eco-Friendly Chemistry", desc: "ECOS and non-toxic detergents aligned with modern wellness and clean-beauty values." }
    ],
    standards: [
      "Targeted oil and wax removal cycles",
      "Hypoallergenic skin-contact formulations",
      "Pristine, lint-free folding",
      "Preservation of dark and branded towel colors"
    ]
  },
  {
    id: "gyms",
    slug: "gyms",
    legacyUrl: "/laundry-services-gyms.php",
    title: "Gyms & Fitness Centers Laundry",
    tagline: "Industrial Laundry That Powers New York's Busiest Fitness Facilities",
    shortDesc: "Fast-turnaround sweat towel service, equipment wiper washing, and staff uniform laundering across all NYC boroughs.",
    heroImage: "/images/gym.jpg",
    badge: "Fitness Centers & Athletics",
    fullOverview: [
      "Running a gym is tough enough without worrying about the laundry pile. From sweaty workout towels and yoga mat covers to staff uniforms, fitness centers generate continuous laundry volume.",
      "Mulan Laundries specializes in professional laundry solutions for gyms and fitness centers across New York. We know gym traffic fluctuates—peak hours, weekend morning classes, and seasonal fitness spikes create unpredictable demands.",
      "We adapt to your rhythm, delivering clean, fresh, odor-free towels and linens that empower your members and eliminate stress for your floor staff."
    ],
    linensHandled: [
      { category: "Workout & Sweat Towels", items: "Hand sweat towels, machine wiping towels, bench towels", description: "Treated with anti-microbial wash cycles that destroy sweat odors." },
      { category: "Shower & Locker Linens", items: "Full-size bath sheets, hand towels, shower floor mats", description: "Plush, absorbent, and washed at high temperatures to kill bacteria." },
      { category: "Floor Mats & Covers", items: "Yoga mat covers, stretching pad towels, boxing ring cloths", description: "Sanitized thoroughly to maintain clean workout environments." },
      { category: "Staff & Trainer Gear", items: "Trainer shirts, front desk uniforms, maintenance rags", description: "Crisply cleaned to keep your staff looking professional." }
    ],
    processSteps: [
      { step: "01", title: "Online / Phone Order", desc: "Set up daily towel swaps, weekly uniform cycles, or on-demand bulk pickups." },
      { step: "02", title: "Scheduled Pickup", desc: "Uniformed drivers collect soiled bins with GPS-tracked route dispatch." },
      { step: "03", title: "Crisp On-Time Delivery", desc: "Returned clean, pressed, and neatly packaged in bundles ready for towel racks." }
    ],
    keyBenefits: [
      { title: "No More Towel Shortages", desc: "Never face member complaints about empty towel shelves during peak workout rush." },
      { title: "Deep Sweat Odor Removal", desc: "Enzymatic formulas destroy persistent body odor and bacteria at the molecular level." },
      { title: "Flexible Route Scheduling", desc: "Pickups scheduled around your peak morning and evening class times." },
      { title: "Serving All 5 Boroughs", desc: "Manhattan, Brooklyn, Queens, Bronx, and Staten Island gyms all receive reliable routes." }
    ],
    standards: [
      "Sanitizing high-temperature wash",
      "Enzyme-based odor neutralization",
      "Neat, standardized pack counts",
      "Same-day rush emergency service"
    ]
  },
  {
    id: "hotel-laundry",
    slug: "hotel-laundry",
    legacyUrl: "/hotel-laundry-services.php",
    title: "Hotel Laundry Services",
    tagline: "Impeccable Linen Management That Elevates New York Hotel Guest Experiences",
    shortDesc: "Take the stress out of hotel laundry. Industrial rotary pressing, crisp sheeting, and 24/7 linen support for NYC hotels.",
    heroImage: "/images/hotels.jpg",
    badge: "Hospitality & Boutique Hotels",
    fullOverview: [
      "As a hotel owner or general manager in New York, you know that the smallest details make or break a guest's experience. Clean, crisp linens, plush towels, and immaculate table settings leave lasting impressions.",
      "That's where Mulan Laundries delivers. We handle every step of your hotel's laundry needs with precision, reliability, and efficiency, so your housekeeping staff can focus on guest care.",
      "From boutique hotels in Manhattan to full-service properties across the boroughs, we provide structured, proven linen management that ensures consistency, hygiene, and luxury presentation."
    ],
    linensHandled: [
      { category: "Bedding Solutions", items: "High-thread-count sheets, duvet covers, pillowcases, mattress pads", description: "Rotary ironed to silky, wrinkle-free perfection with crisp folds." },
      { category: "Towels & Bath Linens", items: "Luxury bath sheets, hand towels, washcloths, plush bathrobes", description: "Bright white, ultra-soft, and packaged in matched sets." },
      { category: "Food & Beverage Linens", items: "Banquet tablecloths, dinner napkins, bar aprons, tray liners", description: "Heavy stain treatment for red wine, grease, and coffee spills." },
      { category: "Staff & Uniforms", items: "Front desk suits, housekeeping tunics, bellhop uniforms", description: "Professionally cleaned and pressed on hangers ready to wear." }
    ],
    processSteps: [
      { step: "01", title: "Custom Pickup Cadence", desc: "Scheduled according to your hotel's housekeeping turnover and delivery docks." },
      { step: "02", title: "Sorting & Rotary Pressing", desc: "Advanced stain treatment followed by industrial ironing and precision folding." },
      { step: "03", title: "Neatly Bundled Delivery", desc: "Packaged cleanly for easy housekeeping storage and immediate room staging." }
    ],
    keyBenefits: [
      { title: "Industrial Rotary Pressing", desc: "Wrinkle-free, hotel-grade finish that gives guests an unmistakably luxurious sleep." },
      { title: "Emergency Surge Support", desc: "On-demand laundry when unexpected occupancy surges or conference bookings occur." },
      { title: "Extended Linen Life", desc: "Gentle chemical wash formulas formulated to prolong expensive linen textile lifespans." },
      { title: "Dedicated Hospitality Specialist", desc: "A personal account rep dedicated to your hotel's par levels and delivery needs." }
    ],
    standards: [
      "Universal precautions & OSHA adherence",
      "Industrial temperature sanitation",
      "Precision computerized rotary pressing",
      "Unit-packed protective wrapping"
    ]
  },
  {
    id: "bed-and-breakfast",
    slug: "bed-and-breakfast",
    legacyUrl: "/bed-and-breakfast-laundry-services.php",
    title: "Bed & Breakfast Laundry Services",
    tagline: "Boutique Care That Lets Your Historical Inn & B&B Shine",
    shortDesc: "Boutique linen care for B&Bs and historic inns. Gentle wash cycles for delicate fabrics, high-thread-count bedding, and dining linens.",
    heroImage: "/images/bedbreakfast.jpg",
    badge: "Boutique Inns & B&Bs",
    fullOverview: [
      "When guests walk into a New York bed & breakfast, they notice everything: crisp sheets, fluffy towels, and spotless dining linens that radiate charm and warmth.",
      "Managing a B&B leaves little time for laundry headaches. Mulan Laundries takes that weight off your shoulders, delivering fresh, perfectly pressed linens on a schedule that fits your property.",
      "We combine cutting-edge technology with meticulous personal care to ensure your bed & breakfast linens always look inviting, smell fresh, and feel luxurious."
    ],
    linensHandled: [
      { category: "Boutique Bedding", items: "Heirloom quilts, high-thread-count sheets, duvet covers, pillow shams", description: "Washed with gentle, fabric-safe agents that preserve intricate stitching and colors." },
      { category: "Plush Bath Linens", items: "Fluffy bath towels, hand towels, organic washcloths, bath mats", description: "Pristine white and scented only with clean, fresh freshness." },
      { category: "Breakfast & Dining", items: "Fine dining tablecloths, cloth napkins, bread basket linens", description: "Treated for fruit, coffee, and egg stains with delicate stain-lifting formulas." },
      { category: "Delicate & Specialty Fabrics", items: "Lace trims, embroidered pillowcases, decorative throws", description: "Individual attention and low-heat drying to avoid snagging or shrinking." }
    ],
    processSteps: [
      { step: "01", title: "Personalized Order", desc: "Place order online or by phone. We schedule pickups that harmonize with your check-in rhythms." },
      { step: "02", title: "Careful Collection", desc: "Our team collects your linens with utmost care, whether daily, weekly, or for special events." },
      { step: "03", title: "Pristine Return", desc: "Returned fresh, clean, and perfectly organized, ready for immediate room preparation." }
    ],
    keyBenefits: [
      { title: "Gentle Care for Delicates", desc: "Special handling for heirloom quilts, fine cottons, and decorative fabrics." },
      { title: "Always on Time", desc: "Dependable delivery ensuring rooms are flawless before guests arrive on doorstep." },
      { title: "Stress-Free Scheduling", desc: "Flexible frequencies that adapt smoothly to seasonal tourism peaks and quiet weeks." },
      { title: "Local New York Expertise", desc: "Prompt citywide transit navigating NYC logistics smoothly." }
    ],
    standards: [
      "Gentle cycle fabric preservation",
      "Allergy-safe, non-irritating detergents",
      "Individual piece inspection",
      "Wrinkle-reducing prompt folding"
    ]
  }
];

export const COMMERCIAL_HUB_DATA = {
  title: "Commercial Laundry Services in New York",
  subtitle: "We Specialize in Hotel Laundry and Also Service Institutional, Commercial, and Industrial Facilities Across NYC",
  heroImage: "/images/commercial-laundry.jpg",
  annualVolume: "1,000,000+ lbs processed annually",
  standardsHeadline: "Operating Under Universal Precautions Adhering to OSHA & Joint Commission (JCAHO) Regulated Standards",
  narrative: [
    "Processing over 1,000,000 pounds per year, Mulan Commercial Laundry New York operates under universal precautions in processing to adhere to OSHA and Joint Commission regulated standards.",
    "We use only quality products in our processes and we are constantly in search of new and improved products to extend the life of our customer's linen while providing a clean, white, and fresh-smelling product.",
    "Through experience spanning over 18 years, we have perfected our laundry processes to provide outstanding cleaning while extending textile life. We offer commercial account services to all industries, specializing in hotels, restaurants, gyms, motels, spas, salons, and short-term rentals.",
    "Each commercial account is handled by our experienced account specialist who monitors par levels, manages logistics, and ensures your operations never experience linen downtime."
  ],
  stats: [
    { label: "Annual Volume Processed", value: "1,000,000+ lbs" },
    { label: "Industry Heritage", value: "18+ Years" },
    { label: "Operational Coverage", value: "24/7/365" },
    { label: "Boroughs Serviced", value: "All 5 NYC" }
  ]
};

export const WASH_FOLD_DATA = {
  title: "Wash & Fold Laundry Services in New York",
  subtitle: "Premium Residential Pick-Up and Delivery Laundry Across New York City",
  heroImage: "/images/washfold.jpg",
  narrative: [
    "Give us your dirty laundry, we'll wash it, fold it, and package it up for you. What could be easier?",
    "All clothes are separated into white and colored loads and washed separately. We use only the highest quality detergents, bleaches, and fabric softeners.",
    "We offer environment-friendly ECOS detergent, all Allergy-free formulas, and OXI-CLEAN non-chlorine bleach upon request. Your items will then be dried at controlled temperatures, promptly folded, and neatly bundled to reduce wrinkling.",
    "Your freshly laundered garments and linens are returned in protective, clear plastic packaging or on hangers ready to be put away."
  ],
  itemPolicy: {
    notice: "Specialty & Oversized Item Notice",
    description: "Large or time-consuming items (such as blankets, comforters/duvets, pillows, and rugs/mats) require dedicated individual washing and drying cycles and are subject to additional charges."
  },
  processSteps: [
    { step: "01", title: "White & Color Separation", desc: "Every garment is sorted to protect vibrant colors and keep whites bright." },
    { step: "02", title: "Premium & Eco Wash", desc: "Washed with top-tier detergents or eco-friendly ECOS and non-chlorine Oxi-Clean upon request." },
    { step: "03", title: "Prompt Folding & Packaging", desc: "Dried to prevent shrinkage, folded immediately to eliminate wrinkles, and sealed in poly-wrap." }
  ]
};
