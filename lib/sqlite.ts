import Database from 'better-sqlite3';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) {
    return db;
  }

  const dbPath = process.env.SQLITE_DB_PATH || join(process.cwd(), 'data', 'hr.db');
  const dbDir = join(process.cwd(), 'data');

  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');

  initializeSchema(db);
  return db;
}

function initializeSchema(database: Database.Database) {
  const tableExists = database
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='employees'")
    .get();

  if (!tableExists) {
    console.log('Initializing database schema...');
    const schemaPath = join(process.cwd(), 'scripts', 'init-sqlite.sql');
    
    if (existsSync(schemaPath)) {
      const schemaSql = readFileSync(schemaPath, 'utf-8');
      const statements = schemaSql.split(';').map(s => s.trim()).filter(s => s.length > 0);
      
      database.transaction(() => {
        for (const statement of statements) {
          database.exec(statement);
        }
     })();
      
      console.log('Database schema initialized successfully');
    } else {
      console.warn('Schema file not found at:', schemaPath);
    }
  }
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
