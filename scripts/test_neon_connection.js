const { neon } = require('@neondatabase/serverless');

const dbUrl = "postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function test() {
  console.log("Connecting to Neon DB...");
  try {
    const sql = neon(dbUrl);
    const result = await sql`SELECT 1 as test, current_database(), current_user, version();`;
    console.log("Neon DB Connection Successful!");
    console.log("Result:", result);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();
