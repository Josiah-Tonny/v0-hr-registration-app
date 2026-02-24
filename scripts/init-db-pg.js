const { config } = require('dotenv');
const { resolve, join } = require('path');
const { readFileSync } = require('fs');
const { Pool } = require('pg');

config({ path: resolve(process.cwd(), '.env.local') });

async function initDatabase() {
  const client = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL,
  });
  
  try {
    console.log('🚀 Starting database initialization...\n');
    
    await client.connect();
    console.log('✅ Connected to database\n');
    
    // Read and execute schema
    const schemaPath = join(process.cwd(), 'scripts', 'init-database.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    
    console.log('📝 Executing schema...');
    
    // Split and execute statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    let successCount = 0;
    let skipCount = 0;
    
    for (const statement of statements) {
      if (statement) {
        try {
          await client.query(statement);
          successCount++;
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            skipCount++;
          } else if (!error.message.includes('auth.')) {
            console.log('⚠️  Skipped:', statement.substring(0,  60) + '...');
            console.log('   Reason:', error.message.substring(0, 100));
          }
        }
      }
    }
    
    console.log(`✅ Executed scripts\init-db.js{successCount} statements (scripts\init-db.js{skipCount} already existed)\n`);
    
    // Verify tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('📋 Tables in database:');
    result.rows.forEach(t => console.log(`  - scripts\init-db.js{t.table_name}`));
    
    console.log('\n✅ Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0);
  }
}

initDatabase();
