const { neon } = require('@neondatabase/serverless');

const dbUrl = "postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function update() {
  const sql = neon(dbUrl);
  await sql`
    UPDATE site_images 
    SET title = 'Turnaround & Logistics: Folded Towel Basket', 
        section = 'Logistics', 
        alt_text = 'Fresh folded towels in delivery basket' 
    WHERE slot_key = 'pricing_basket';
  `;
  console.log("Updated slot 'pricing_basket' metadata in Neon DB successfully.");
}

update();
