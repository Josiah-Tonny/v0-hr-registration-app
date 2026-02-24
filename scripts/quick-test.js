const { config } = require('dotenv');
const { resolve } = require('path');
const { neon } = require('@netlify/neon');

config({ path: resolve(process.cwd(), '.env.local') });
const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('No DATABASE_URL found');
  process.exit(1);
}

console.log('Testing connection...');
const sql = neon(databaseUrl);

sql`SELECT NOW() as time`
  .then(r => { console.log('✅ Connected:', r[0].time); process.exit(0); })
  .catch(e => { console.error('❌ Error:', e.message); process.exit(1); });

setTimeout(() => { console.error('Timeout'); process.exit(1); }, 15000);
