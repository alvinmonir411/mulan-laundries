import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { ContactSubmission, INITIAL_DEMO_SUBMISSIONS } from "./submissionTypes";

export type { ContactSubmission };
export { INITIAL_DEMO_SUBMISSIONS };

const LOCAL_SUBMISSIONS_FILE = path.join(process.cwd(), "src", "data", "contact_submissions.json");

function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url || url.trim() === "" || url.includes("YOUR_PASSWORD")) {
    return null;
  }
  return url.trim();
}

function readLocalSubmissions(): ContactSubmission[] {
  try {
    if (fs.existsSync(LOCAL_SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(LOCAL_SUBMISSIONS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[SUBMISSIONS LOCAL READ ERROR]", err);
  }
  return [...INITIAL_DEMO_SUBMISSIONS];
}

function writeLocalSubmissions(submissions: ContactSubmission[]) {
  try {
    const dir = path.dirname(LOCAL_SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf8");
  } catch (err) {
    console.error("[SUBMISSIONS LOCAL WRITE ERROR]", err);
  }
}

let schemaInitialized = false;

export async function initializeSubmissionsSchema(sql: any) {
  if (schemaInitialized) return;
  try {
    const tableExists = await sql`
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'contact_submissions';
    `;

    if (!tableExists || tableExists.length === 0) {
      await sql`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          reference_id VARCHAR(50) UNIQUE NOT NULL,
          type VARCHAR(30) DEFAULT 'contact',
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          customer_type VARCHAR(100) DEFAULT 'General',
          pickup_day VARCHAR(50),
          subject VARCHAR(255),
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'New',
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    }
    schemaInitialized = true;

    const countRes = await sql`SELECT count(*) as count FROM contact_submissions;`;
    const count = parseInt(countRes[0]?.count || "0", 10);

    if (count === 0) {
      console.log("[NEON DB] Seeding initial contact_submissions...");
      for (const item of INITIAL_DEMO_SUBMISSIONS) {
        await sql`
          INSERT INTO contact_submissions (
            reference_id, type, name, email, phone, customer_type, pickup_day, subject, message, status, notes, created_at
          ) VALUES (
            ${item.reference_id},
            ${item.type},
            ${item.name},
            ${item.email},
            ${item.phone},
            ${item.customer_type || "General"},
            ${item.pickup_day || null},
            ${item.subject || null},
            ${item.message},
            ${item.status},
            ${item.notes || null},
            ${item.created_at}
          ) ON CONFLICT (reference_id) DO NOTHING;
        `;
      }
    }
  } catch (err: any) {
    if (err.message && err.message.includes("duplicate key value")) {
      schemaInitialized = true;
      return;
    }
    console.warn("[NEON DB SUBMISSIONS INIT WARNING]", err);
  }
}

export async function fetchAllSubmissions(): Promise<ContactSubmission[]> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSubmissionsSchema(sql);

      const rows = await sql`
        SELECT 
          id, reference_id, type, name, email, phone, customer_type, 
          pickup_day, subject, message, promo_code, discount_percent, status, notes, 
          created_at::text as created_at
        FROM contact_submissions 
        ORDER BY created_at DESC;
      `;

      if (rows && rows.length > 0) {
        const mapped = rows.map((r: any) => ({
          id: r.id,
          reference_id: r.reference_id,
          type: r.type || "contact",
          name: r.name,
          email: r.email,
          phone: r.phone,
          customer_type: r.customer_type,
          pickup_day: r.pickup_day,
          subject: r.subject,
          message: r.message,
          promo_code: r.promo_code || undefined,
          discount_percent: Number(r.discount_percent) || 0,
          status: r.status || "New",
          notes: r.notes,
          created_at: r.created_at || new Date().toISOString(),
        }));
        writeLocalSubmissions(mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("[SUBMISSIONS DB FETCH FAILED, FALLING BACK TO LOCAL]", err);
    }
  }

  return readLocalSubmissions();
}

export async function createSubmission(
  submissionData: Omit<ContactSubmission, "id" | "created_at">
): Promise<ContactSubmission> {
  const now = new Date().toISOString();
  const newSubmission: ContactSubmission = {
    ...submissionData,
    status: submissionData.status || "New",
    created_at: now,
  };

  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSubmissionsSchema(sql);

      const res = await sql`
        INSERT INTO contact_submissions (
          reference_id, type, name, email, phone, customer_type, pickup_day, subject, message, promo_code, discount_percent, status, notes, created_at
        ) VALUES (
          ${newSubmission.reference_id},
          ${newSubmission.type},
          ${newSubmission.name},
          ${newSubmission.email},
          ${newSubmission.phone},
          ${newSubmission.customer_type || "General"},
          ${newSubmission.pickup_day || null},
          ${newSubmission.subject || null},
          ${newSubmission.message},
          ${newSubmission.promo_code || null},
          ${newSubmission.discount_percent || 0},
          ${newSubmission.status},
          ${newSubmission.notes || null},
          ${now}
        )
        RETURNING id, reference_id, created_at::text as created_at;
      `;

      if (res && res[0]) {
        newSubmission.id = res[0].id;
        newSubmission.created_at = res[0].created_at;
      }
    } catch (err) {
      console.error("[SUBMISSIONS DB INSERT FAILED, WRITING LOCAL]", err);
    }
  }

  // Always update local fallback cache
  const localList = readLocalSubmissions();
  localList.unshift(newSubmission);
  writeLocalSubmissions(localList);

  return newSubmission;
}

export async function updateSubmissionStatus(
  reference_id: string,
  status: ContactSubmission["status"],
  notes?: string
): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  let dbSuccess = false;

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSubmissionsSchema(sql);

      if (notes !== undefined) {
        await sql`
          UPDATE contact_submissions
          SET status = ${status}, notes = ${notes}
          WHERE reference_id = ${reference_id};
        `;
      } else {
        await sql`
          UPDATE contact_submissions
          SET status = ${status}
          WHERE reference_id = ${reference_id};
        `;
      }
      dbSuccess = true;
    } catch (err) {
      console.error("[SUBMISSIONS DB UPDATE FAILED]", err);
    }
  }

  // Update local
  const localList = readLocalSubmissions();
  const idx = localList.findIndex((item) => item.reference_id === reference_id);
  if (idx !== -1) {
    localList[idx].status = status;
    if (notes !== undefined) localList[idx].notes = notes;
    writeLocalSubmissions(localList);
    return true;
  }

  return dbSuccess;
}

export async function deleteSubmission(reference_id: string): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initializeSubmissionsSchema(sql);
      await sql`
        DELETE FROM contact_submissions
        WHERE reference_id = ${reference_id};
      `;
    } catch (err) {
      console.error("[SUBMISSIONS DB DELETE FAILED]", err);
    }
  }

  const localList = readLocalSubmissions().filter((item) => item.reference_id !== reference_id);
  writeLocalSubmissions(localList);
  return true;
}
