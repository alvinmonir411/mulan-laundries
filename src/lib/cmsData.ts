import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import {
  SiteTestimonial,
  SiteFaq,
  SitePage,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
  DEFAULT_PAGES,
} from "./cmsTypes";

const TESTIMONIALS_FALLBACK = path.join(process.cwd(), "src", "data", "site_testimonials.json");
const FAQS_FALLBACK = path.join(process.cwd(), "src", "data", "site_faqs.json");
const PAGES_FALLBACK = path.join(process.cwd(), "src", "data", "site_pages.json");

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`[JSON FALLBACK READ ERROR] ${filePath}:`, err);
  }
  return defaultData;
}

function writeJsonFile<T>(filePath: string, data: T) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`[JSON FALLBACK WRITE ERROR] ${filePath}:`, err);
  }
}

// -------------------------------------------------------------
// TESTIMONIALS
// -------------------------------------------------------------
let testimonialsInit = false;
async function initTestimonialsTable(sql: any) {
  if (testimonialsInit) return;
  try {
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
    testimonialsInit = true;

    const countRes = await sql.query("SELECT count(*) as count FROM site_testimonials;");
    const count = parseInt(countRes[0]?.count || "0", 10);
    if (count === 0) {
      console.log("[NEON DB] Seeding default site_testimonials...");
      for (const t of DEFAULT_TESTIMONIALS) {
        await sql.query(
          `INSERT INTO site_testimonials (author, role, quote, rating, source, display_order, active)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [t.author, t.role || "", t.quote, t.rating, t.source, t.display_order, t.active]
        );
      }
    }
  } catch (e) {
    console.error("[INIT TESTIMONIALS ERROR]", e);
  }
}

export async function fetchAllTestimonials(): Promise<SiteTestimonial[]> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initTestimonialsTable(sql);
      const rows = await sql.query(`
        SELECT id, author, role, quote, rating, source, display_order, active, created_at, updated_at
        FROM site_testimonials
        ORDER BY display_order ASC, id ASC;
      `);
      if (rows && rows.length > 0) {
        const formatted: SiteTestimonial[] = rows.map((r: any) => ({
          id: r.id,
          author: r.author,
          role: r.role || "",
          quote: r.quote,
          rating: Number(r.rating) || 5,
          source: r.source || "Google Review",
          display_order: Number(r.display_order) || 0,
          active: Boolean(r.active),
          created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
          updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
        }));
        writeJsonFile(TESTIMONIALS_FALLBACK, formatted);
        return formatted;
      }
    } catch (err) {
      console.error("[NEON DB TESTIMONIALS FETCH ERROR]", err);
    }
  }
  return readJsonFile<SiteTestimonial[]>(TESTIMONIALS_FALLBACK, DEFAULT_TESTIMONIALS);
}

export async function saveTestimonial(testimonial: SiteTestimonial): Promise<SiteTestimonial> {
  const dbUrl = getDatabaseUrl();
  let saved: SiteTestimonial = { ...testimonial };

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initTestimonialsTable(sql);

      if (testimonial.id) {
        const rows = await sql.query(
          `UPDATE site_testimonials
           SET author = $1, role = $2, quote = $3, rating = $4, source = $5, display_order = $6, active = $7, updated_at = CURRENT_TIMESTAMP
           WHERE id = $8
           RETURNING *;`,
          [testimonial.author, testimonial.role || "", testimonial.quote, testimonial.rating || 5, testimonial.source || "Google Review", testimonial.display_order || 0, testimonial.active !== false, testimonial.id]
        );
        if (rows && rows[0]) {
          const r = rows[0];
          saved = {
            id: r.id,
            author: r.author,
            role: r.role || "",
            quote: r.quote,
            rating: Number(r.rating) || 5,
            source: r.source || "Google Review",
            display_order: Number(r.display_order) || 0,
            active: Boolean(r.active),
            created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
            updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        }
      } else {
        const rows = await sql.query(
          `INSERT INTO site_testimonials (author, role, quote, rating, source, display_order, active)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *;`,
          [testimonial.author, testimonial.role || "", testimonial.quote, testimonial.rating || 5, testimonial.source || "Google Review", testimonial.display_order || 0, testimonial.active !== false]
        );
        if (rows && rows[0]) {
          const r = rows[0];
          saved = {
            id: r.id,
            author: r.author,
            role: r.role || "",
            quote: r.quote,
            rating: Number(r.rating) || 5,
            source: r.source || "Google Review",
            display_order: Number(r.display_order) || 0,
            active: Boolean(r.active),
            created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
            updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        }
      }
    } catch (err) {
      console.error("[NEON DB SAVE TESTIMONIAL ERROR]", err);
    }
  }

  // Update fallback file
  const current = readJsonFile<SiteTestimonial[]>(TESTIMONIALS_FALLBACK, DEFAULT_TESTIMONIALS);
  if (saved.id) {
    const idx = current.findIndex((t) => t.id === saved.id);
    if (idx >= 0) current[idx] = saved;
    else current.push(saved);
  } else {
    saved.id = Date.now();
    current.push(saved);
  }
  writeJsonFile(TESTIMONIALS_FALLBACK, current);

  return saved;
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await sql.query(`DELETE FROM site_testimonials WHERE id = $1;`, [id]);
    } catch (err) {
      console.error("[NEON DB DELETE TESTIMONIAL ERROR]", err);
    }
  }
  const current = readJsonFile<SiteTestimonial[]>(TESTIMONIALS_FALLBACK, DEFAULT_TESTIMONIALS);
  const filtered = current.filter((t) => t.id !== id);
  writeJsonFile(TESTIMONIALS_FALLBACK, filtered);
  return true;
}

// -------------------------------------------------------------
// FAQS
// -------------------------------------------------------------
let faqsInit = false;
async function initFaqsTable(sql: any) {
  if (faqsInit) return;
  try {
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
    faqsInit = true;

    const countRes = await sql.query("SELECT count(*) as count FROM site_faqs;");
    const count = parseInt(countRes[0]?.count || "0", 10);
    if (count === 0) {
      console.log("[NEON DB] Seeding default site_faqs...");
      for (const f of DEFAULT_FAQS) {
        await sql.query(
          `INSERT INTO site_faqs (category, question, answer, display_order, active)
           VALUES ($1, $2, $3, $4, $5)`,
          [f.category, f.question, f.answer, f.display_order, f.active]
        );
      }
    }
  } catch (e) {
    console.error("[INIT FAQS ERROR]", e);
  }
}

export async function fetchAllFaqs(): Promise<SiteFaq[]> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initFaqsTable(sql);
      const rows = await sql.query(`
        SELECT id, category, question, answer, display_order, active, created_at, updated_at
        FROM site_faqs
        ORDER BY display_order ASC, id ASC;
      `);
      if (rows && rows.length > 0) {
        const formatted: SiteFaq[] = rows.map((r: any) => ({
          id: r.id,
          category: r.category || "General",
          question: r.question,
          answer: r.answer,
          display_order: Number(r.display_order) || 0,
          active: Boolean(r.active),
          created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
          updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
        }));
        writeJsonFile(FAQS_FALLBACK, formatted);
        return formatted;
      }
    } catch (err) {
      console.error("[NEON DB FAQS FETCH ERROR]", err);
    }
  }
  return readJsonFile<SiteFaq[]>(FAQS_FALLBACK, DEFAULT_FAQS);
}

export async function saveFaq(faq: SiteFaq): Promise<SiteFaq> {
  const dbUrl = getDatabaseUrl();
  let saved: SiteFaq = { ...faq };

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initFaqsTable(sql);

      if (faq.id) {
        const rows = await sql.query(
          `UPDATE site_faqs
           SET category = $1, question = $2, answer = $3, display_order = $4, active = $5, updated_at = CURRENT_TIMESTAMP
           WHERE id = $6
           RETURNING *;`,
          [faq.category || "General", faq.question, faq.answer, faq.display_order || 0, faq.active !== false, faq.id]
        );
        if (rows && rows[0]) {
          const r = rows[0];
          saved = {
            id: r.id,
            category: r.category || "General",
            question: r.question,
            answer: r.answer,
            display_order: Number(r.display_order) || 0,
            active: Boolean(r.active),
            created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
            updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        }
      } else {
        const rows = await sql.query(
          `INSERT INTO site_faqs (category, question, answer, display_order, active)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;`,
          [faq.category || "General", faq.question, faq.answer, faq.display_order || 0, faq.active !== false]
        );
        if (rows && rows[0]) {
          const r = rows[0];
          saved = {
            id: r.id,
            category: r.category || "General",
            question: r.question,
            answer: r.answer,
            display_order: Number(r.display_order) || 0,
            active: Boolean(r.active),
            created_at: r.created_at ? new Date(r.created_at).toISOString() : undefined,
            updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
          };
        }
      }
    } catch (err) {
      console.error("[NEON DB SAVE FAQ ERROR]", err);
    }
  }

  const current = readJsonFile<SiteFaq[]>(FAQS_FALLBACK, DEFAULT_FAQS);
  if (saved.id) {
    const idx = current.findIndex((f) => f.id === saved.id);
    if (idx >= 0) current[idx] = saved;
    else current.push(saved);
  } else {
    saved.id = Date.now();
    current.push(saved);
  }
  writeJsonFile(FAQS_FALLBACK, current);

  return saved;
}

export async function deleteFaq(id: number): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await sql.query(`DELETE FROM site_faqs WHERE id = $1;`, [id]);
    } catch (err) {
      console.error("[NEON DB DELETE FAQ ERROR]", err);
    }
  }
  const current = readJsonFile<SiteFaq[]>(FAQS_FALLBACK, DEFAULT_FAQS);
  const filtered = current.filter((f) => f.id !== id);
  writeJsonFile(FAQS_FALLBACK, filtered);
  return true;
}

// -------------------------------------------------------------
// PAGES
// -------------------------------------------------------------
let pagesInit = false;
async function initPagesTable(sql: any) {
  if (pagesInit) return;
  try {
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
    pagesInit = true;

    const countRes = await sql.query("SELECT count(*) as count FROM site_pages;");
    const count = parseInt(countRes[0]?.count || "0", 10);
    if (count === 0) {
      console.log("[NEON DB] Seeding default site_pages...");
      for (const p of DEFAULT_PAGES) {
        await sql.query(
          `INSERT INTO site_pages (slug, title, meta_title, meta_description, heading, subheading, banner_image, content, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (slug) DO NOTHING;`,
          [p.slug, p.title, p.meta_title || "", p.meta_description || "", p.heading || "", p.subheading || "", p.banner_image || "", JSON.stringify(p.content || {}), p.status || "published"]
        );
      }
    }
  } catch (e) {
    console.error("[INIT PAGES ERROR]", e);
  }
}

export async function fetchAllPages(): Promise<SitePage[]> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initPagesTable(sql);
      const rows = await sql.query(`
        SELECT id, slug, title, meta_title, meta_description, heading, subheading, banner_image, content, status, updated_at
        FROM site_pages
        ORDER BY slug ASC;
      `);
      if (rows && rows.length > 0) {
        const formatted: SitePage[] = rows.map((r: any) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          meta_title: r.meta_title || "",
          meta_description: r.meta_description || "",
          heading: r.heading || "",
          subheading: r.subheading || "",
          banner_image: r.banner_image || "",
          content: r.content || {},
          status: (r.status as "published" | "draft" | "archived") || "published",
          updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
        }));
        writeJsonFile(PAGES_FALLBACK, formatted);
        return formatted;
      }
    } catch (err) {
      console.error("[NEON DB PAGES FETCH ERROR]", err);
    }
  }
  return readJsonFile<SitePage[]>(PAGES_FALLBACK, DEFAULT_PAGES);
}

export async function savePage(page: SitePage): Promise<SitePage> {
  const dbUrl = getDatabaseUrl();
  let saved: SitePage = { ...page };

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initPagesTable(sql);

      const rows = await sql.query(
        `INSERT INTO site_pages (slug, title, meta_title, meta_description, heading, subheading, banner_image, content, status, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
         ON CONFLICT (slug)
         DO UPDATE SET
           title = EXCLUDED.title,
           meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description,
           heading = EXCLUDED.heading,
           subheading = EXCLUDED.subheading,
           banner_image = EXCLUDED.banner_image,
           content = EXCLUDED.content,
           status = EXCLUDED.status,
           updated_at = CURRENT_TIMESTAMP
         RETURNING *;`,
        [
          page.slug,
          page.title,
          page.meta_title || "",
          page.meta_description || "",
          page.heading || "",
          page.subheading || "",
          page.banner_image || "",
          JSON.stringify(page.content || {}),
          page.status || "published",
        ]
      );
      if (rows && rows[0]) {
        const r = rows[0];
        saved = {
          id: r.id,
          slug: r.slug,
          title: r.title,
          meta_title: r.meta_title || "",
          meta_description: r.meta_description || "",
          heading: r.heading || "",
          subheading: r.subheading || "",
          banner_image: r.banner_image || "",
          content: r.content || {},
          status: (r.status as "published" | "draft" | "archived") || "published",
          updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : undefined,
        };
      }
    } catch (err) {
      console.error("[NEON DB SAVE PAGE ERROR]", err);
    }
  }

  const current = readJsonFile<SitePage[]>(PAGES_FALLBACK, DEFAULT_PAGES);
  const idx = current.findIndex((p) => p.slug === saved.slug);
  if (idx >= 0) current[idx] = saved;
  else current.push(saved);
  writeJsonFile(PAGES_FALLBACK, current);

  return saved;
}

export async function deletePage(slug: string): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await sql.query(`DELETE FROM site_pages WHERE slug = $1;`, [slug]);
    } catch (err) {
      console.error("[NEON DB DELETE PAGE ERROR]", err);
    }
  }
  const current = readJsonFile<SitePage[]>(PAGES_FALLBACK, DEFAULT_PAGES);
  const filtered = current.filter((p) => p.slug !== slug);
  writeJsonFile(PAGES_FALLBACK, filtered);
  return true;
}
