const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function addPromoColumns() {
  console.log("Migrating contact_submissions table to support promo codes & discounts...");
  
  await sql`
    ALTER TABLE contact_submissions 
    ADD COLUMN IF NOT EXISTS promo_code VARCHAR(50),
    ADD COLUMN IF NOT EXISTS discount_percent INTEGER DEFAULT 0;
  `;

  console.log("SUCCESS: Added promo_code and discount_percent columns to contact_submissions!");
}

addPromoColumns().catch(console.error);
