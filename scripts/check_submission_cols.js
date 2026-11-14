const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_9z8xEsBRFHwG@ep-weathered-sky-be0pyjvn-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function checkCols() {
  const cols = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'contact_submissions';`;
  console.log('COLUMNS:', cols.map(c => c.column_name));
}

checkCols().catch(console.error);
