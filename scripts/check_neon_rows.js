const { neon } = require('@neondatabase/serverless');

const dbUrl = "postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function query() {
  const sql = neon(dbUrl);
  const rows = await sql`SELECT id, slot_key, section, title, image_url, updated_at FROM site_images ORDER BY id;`;
  console.log(`Neon DB Rows count: ${rows.length}`);
  console.table(rows);
}

query();
