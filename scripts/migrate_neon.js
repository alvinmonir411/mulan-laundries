const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = "postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(DATABASE_URL);

async function run() {
  console.log('[DB MIGRATION] Starting schema migration on Neon PostgreSQL...');

  // 1. site_testimonials
  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_testimonials (
      id SERIAL PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      role VARCHAR(255),
      quote TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      source VARCHAR(100) DEFAULT 'Google Review',
      display_order INTEGER DEFAULT 0,
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. site_faqs
  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_faqs (
      id SERIAL PRIMARY KEY,
      category VARCHAR(100) DEFAULT 'General',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. site_pages
  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_pages (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      meta_title VARCHAR(255),
      meta_description TEXT,
      heading VARCHAR(255),
      subheading TEXT,
      banner_image TEXT,
      content JSONB,
      status VARCHAR(50) DEFAULT 'published',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Update site_images with category, dimensions, in_use columns
  await sql.query(`
    ALTER TABLE site_images 
    ADD COLUMN IF NOT EXISTS category VARCHAR(100),
    ADD COLUMN IF NOT EXISTS dimensions VARCHAR(50),
    ADD COLUMN IF NOT EXISTS in_use BOOLEAN DEFAULT true;
  `);

  console.log('[DB MIGRATION] Tables verified/created successfully!');
  const tables = await sql.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
  console.log('[DB MIGRATION] Public tables in Neon:', tables.map(t => t.table_name));
}

run().catch(console.error);
