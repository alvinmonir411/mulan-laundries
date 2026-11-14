const { neon } = require('@neondatabase/serverless');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const dbUrl = "postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

cloudinary.config({
  cloud_name: "dgaiqqh7k",
  api_key: "673182877555238",
  api_secret: "Lt98TBmqTdi3RGHIEr6xGv9KPxU",
  secure: true,
});

const DEFAULT_SLOTS = [
  {
    slot_key: "logo_header",
    title: "Header Main Brand Logo",
    section: "Branding",
    local_path: "public/images/new-logo.webp",
    alt_text: "Mulan Laundries"
  },
  {
    slot_key: "logo_footer",
    title: "Footer White Logo",
    section: "Branding",
    local_path: "public/images/new-logo-footer1.webp",
    alt_text: "Mulan Laundries"
  },
  {
    slot_key: "hero_main",
    title: "Hero Main Composition (Washing Machine & Basket)",
    section: "Hero",
    local_path: "public/images/laundry-hero-inspiration.jpg",
    alt_text: "Clean modern washing machine with colorful folded towels in wicker basket"
  },
  {
    slot_key: "service_wash_fold",
    title: "Services: Wash & Fold Card",
    section: "Services",
    local_path: "public/images/washfold.jpg",
    alt_text: "Wash and Fold regular laundry"
  },
  {
    slot_key: "service_commercial",
    title: "Services: Commercial Linen Card",
    section: "Services",
    local_path: "public/images/commercial-laundry.jpg",
    alt_text: "Commercial laundry services machinery"
  },
  {
    slot_key: "service_rotary_pressing",
    title: "Services: Rotary Pressing / Hotels Card",
    section: "Services",
    local_path: "public/images/hotels.jpg",
    alt_text: "Rotary pressing and hotel bedsheets"
  },
  {
    slot_key: "service_hospital",
    title: "Services: Hospital & Healthcare Card",
    section: "Services",
    local_path: "public/images/hospitals1.jpg",
    alt_text: "Hospital healthcare laundry sanitization"
  },
  {
    slot_key: "service_rentals",
    title: "Services: Short-Term Rentals & Airbnb Card",
    section: "Services",
    local_path: "public/images/residential-services.jpg",
    alt_text: "Short term residential apartment laundry"
  },
  {
    slot_key: "service_special_care",
    title: "Services: Special Care Items / B&B Card",
    section: "Services",
    local_path: "public/images/bedbreakfast.jpg",
    alt_text: "Specialty delicates and blankets"
  },
  {
    slot_key: "pricing_basket",
    title: "Rate Card: Folded Towel Basket",
    section: "Pricing",
    local_path: "public/images/washfold.jpg",
    alt_text: "Fresh folded towels in rate card basket"
  },
  {
    slot_key: "promo_basket",
    title: "20% OFF Offer: Promo Delivery Basket",
    section: "Promotions",
    local_path: "public/images/free-pickup.jpg",
    alt_text: "Promotional delivery basket"
  },
  {
    slot_key: "about_facility",
    title: "About Us: Facility Showcase Image",
    section: "About",
    local_path: "public/images/about-us.webp",
    alt_text: "Mulan Laundries NYC commercial facility"
  },
  {
    slot_key: "about_team",
    title: "About Us: Dedicated Workers & Staff",
    section: "About",
    local_path: "public/images/about-4.jpg",
    alt_text: "Mulan Laundries team of workers"
  },
  {
    slot_key: "pickup_banner",
    title: "Pickup Section: NYC Delivery Van",
    section: "Dispatch",
    local_path: "public/images/free-pickup.jpg",
    alt_text: "Mulan Laundries free pickup delivery van"
  },
  {
    slot_key: "service_gyms",
    title: "Commercial: Gyms & Fitness Centers",
    section: "Commercial Verticals",
    local_path: "public/images/gym.jpg",
    alt_text: "Gym workout towel service"
  },
  {
    slot_key: "service_health_clubs",
    title: "Commercial: Health Clubs & Wellness",
    section: "Commercial Verticals",
    local_path: "public/images/health-clubs.jpg",
    alt_text: "Health clubs laundry service"
  },
  {
    slot_key: "service_salons_spas",
    title: "Commercial: Salons & Spas Plush Towels",
    section: "Commercial Verticals",
    local_path: "public/images/salons-_-spas.jpg",
    alt_text: "Salons and spas plush towels"
  },
  {
    slot_key: "service_schools_dorms",
    title: "Commercial: Schools & Dormitories",
    section: "Commercial Verticals",
    local_path: "public/images/schools.jpg",
    alt_text: "Schools and student dorm laundry"
  },
  {
    slot_key: "service_shelter_homes",
    title: "Commercial: Shelter Homes & Facilities",
    section: "Commercial Verticals",
    local_path: "public/images/shelterHomes.jpg",
    alt_text: "Shelter homes bulk laundry care"
  }
];

async function run() {
  console.log("=== STARTING NEON DB & CLOUDINARY SYNC ===");
  const sql = neon(dbUrl);

  // 1. Ensure Table
  console.log("\n[STEP 1] Creating/Verifying table 'site_images' in Neon DB...");
  await sql`
    CREATE TABLE IF NOT EXISTS site_images (
      id SERIAL PRIMARY KEY,
      slot_key VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      section VARCHAR(100) NOT NULL,
      image_url TEXT NOT NULL,
      alt_text VARCHAR(255) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'site_images' is ready in Neon DB.");

  // 2. Upload images to Cloudinary and insert into Neon DB
  console.log("\n[STEP 2] Uploading images to Cloudinary and syncing to Neon DB...");
  const syncedMap = {};

  for (const item of DEFAULT_SLOTS) {
    const fullLocalPath = path.join(process.cwd(), item.local_path);
    let cloudinaryUrl = null;

    if (fs.existsSync(fullLocalPath)) {
      try {
        console.log(`  Uploading ${item.slot_key} (${item.local_path}) to Cloudinary...`);
        const uploadRes = await cloudinary.uploader.upload(fullLocalPath, {
          folder: "mulan-laundries",
          public_id: `${item.slot_key}`,
          overwrite: true,
          resource_type: "image",
        });
        cloudinaryUrl = uploadRes.secure_url;
        console.log(`  ✓ Cloudinary URL: ${cloudinaryUrl}`);
      } catch (err) {
        console.error(`  ✗ Cloudinary upload error for ${item.slot_key}:`, err.message);
        cloudinaryUrl = `/${item.local_path.replace('public/', '')}`;
      }
    } else {
      console.warn(`  ! File not found: ${fullLocalPath}, using fallback path.`);
      cloudinaryUrl = `/${item.local_path.replace('public/', '')}`;
    }

    // Upsert into Neon DB
    await sql`
      INSERT INTO site_images (slot_key, title, section, image_url, alt_text, updated_at)
      VALUES (${item.slot_key}, ${item.title}, ${item.section}, ${cloudinaryUrl}, ${item.alt_text}, CURRENT_TIMESTAMP)
      ON CONFLICT (slot_key)
      DO UPDATE SET
        title = ${item.title},
        section = ${item.section},
        image_url = ${cloudinaryUrl},
        alt_text = ${item.alt_text},
        updated_at = CURRENT_TIMESTAMP;
    `;

    syncedMap[item.slot_key] = {
      slot_key: item.slot_key,
      title: item.title,
      section: item.section,
      image_url: cloudinaryUrl,
      alt_text: item.alt_text,
      updated_at: new Date().toISOString(),
    };
  }

  // Also update local backup file
  const fallbackFile = path.join(process.cwd(), "src", "data", "site_images.json");
  fs.writeFileSync(fallbackFile, JSON.stringify(syncedMap, null, 2), "utf8");
  console.log("\n✓ Local fallback file updated with Cloudinary URLs.");

  // 3. Verify Neon DB records
  console.log("\n[STEP 3] Verifying records in live Neon DB...");
  const rows = await sql`
    SELECT id, slot_key, section, image_url, updated_at
    FROM site_images
    ORDER BY id;
  `;

  console.log(`✓ Total rows in Neon DB 'site_images': ${rows.length}`);
  rows.forEach((r) => {
    console.log(`  [${r.id}] ${r.slot_key} (${r.section}): ${r.image_url}`);
  });

  console.log("\n=== NEON DB & CLOUDINARY MIGRATION COMPLETED SUCCESSFULLY! ===");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
