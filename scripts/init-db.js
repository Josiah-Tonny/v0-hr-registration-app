const { config } = require('dotenv');
const { resolve, join } = require('path');
const { readFileSync } = require('fs');
const { neon } = require('@netlify/neon');

config({ path: resolve(process.cwd(), '.env.local') });

async function initDatabase() {
  try {
    console.log('🚀 Starting database initialization...\n');
    
    const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('❌ DATABASE_URL not found in .env.local');
      process.exit(1);
    }
    
    console.log('📊 Connecting to database...');
    const sql = neon(databaseUrl);
    
    // Test connection
    await sql`SELECT NOW()`;
    console.log('✅ Connected successfully\n');
    
    // Read schema file
    const schemaPath = join(process.cwd(), 'scripts', 'init-database.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    console.log('📝 Executing schema...');
    
    // Remove RLS statements (not compatible with plain Neon)
    const cleanedSchema = schema
      .replace(/ALTER TABLE .* ENABLE ROW LEVEL SECURITY;/g, '')
      .replace(/CREATE POLICY .* ON .*\n(.*\n)*/gm, '');
    
    // Split by semicolon and execute each statement
    const statements = cleanedSchema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement) {
        try {
          await sql(statement);
        } catch (error) {
          if (!error.message.includes('already exists')) {
            console.error('Error on statement:', statement.substring(0, 60) + '...');
            console.error('Error:', error.message);
          }
        }
      }
    }
    
    console.log('✅ Schema executed\n');
    
    // Verify tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    console.log('📋 Tables in database:');
    tables.forEach(t => console.log(`  - scripts\quick-test.js{t.table_name}`));
    
    console.log('\n✅ Database initialization complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initDatabase();
