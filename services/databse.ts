import Database from 'better-sqlite3';
import path from 'path';
import { Person, Department, Faculty, Document, TimelineEvent, AuditLog } from '@/types';

const dbPath = path.join(process.cwd(), 'data', 'hr-system.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Helper type for database responses
type DbResponse<T> = { data: T | null; error: string | null };

// Helper function to convert database row to Person object
function dbRowToPerson(row: any): Person {
  return {
    id: row.id,
    employee_id: row.employee_id,
    first_name: row.first_name,
    middle_name: row.middle_name,
    last_name: row.last_name,
    email: row.email,
    secondary_email: row.secondary_email,
    phone_number: row.phone_number,
    secondary_phone_number: row.secondary_phone_number,
    date_of_birth: row.date_of_birth,
    gender: row.gender,
    nationality: row.nationality,
    id_number: row.id_number,
    passport_number: row.passport_number,
    residential_address: row.residential_address,
    postal_code: row.postal_code,
    city: row.city,
    country: row.country,
    department_id: row.department_id,
    faculty_id: row.faculty_id,
    position: row.position,
    position_grade: row.position_grade,
    work_location: row.work_location,
    shift_information: row.shift_information,
    status: row.status,
    category: row.category,
    categoryDetails: parseCategoryDetails(row.category_details),
    start_date: row.start_date,
    end_date: row.end_date,
    expected_end_date: row.expected_end_date,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Helper to parse category details JSON
function parseCategoryDetails(json: string | null): any {
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse category_details:', e);
    return {};
  }
}

// Fetch people with optional filters
export function fetchPeople(filters?: {
  department?: string;
  status?: string;
  category?: string;
  search?: string;
}): DbResponse<Person[]> {
  try {
    let query = 'SELECT * FROM people WHERE 1=1';
    const params: any[] = [];

    if (filters?.department) {
      query += ' AND department_id = ?';
      params.push(filters.department);
    }

    if (filters?.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters?.search) {
      query += ' AND (first_name LIKE ? OR last_name LIKE ? OR employee_id LIKE ?)';
      const searchParam = '%' + filters.search + '%';
      params.push(searchParam, searchParam, searchParam);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params);
    const people = rows.map(dbRowToPerson);

    return { data: people, error: null };
  } catch (error: any) {
    console.error('Error fetching people:', error);
    return { data: null, error: error.message };
  }
}

// Fetch single person by ID
export function fetchPersonById(id: string): DbResponse<Person> {
  try {
    const stmt = db.prepare('SELECT * FROM people WHERE id = ?');
    const row = stmt.get(id);

    if (!row) {
      return { data: null, error: 'Person not found' };
    }

    return { data: dbRowToPerson(row), error: null };
  } catch (error: any) {
    console.error('Error fetching person:', error);
    return { data: null, error: error.message };
  }
}

// Create new person
export function createPerson(person: Omit<Person, 'id' | 'created_at' | 'updated_at'>): DbResponse<Person> {
  try {
    const sql = 'INSERT INTO people (' +
      'employee_id, first_name, middle_name, last_name, email, secondary_email, ' +
      'phone_number, secondary_phone_number, date_of_birth, gender, nationality, ' +
      'id_number, passport_number, residential_address, postal_code, city, country, ' +
      'department_id, faculty_id, position, position_grade, work_location, ' +
      'shift_information, status, category, category_details, start_date, ' +
      'end_date, expected_end_date' +
      ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const stmt = db.prepare(sql);
    const result = stmt.run(
      person.employee_id,
      person.first_name,
      person.middle_name,
      person.last_name,
      person.email,
      person.secondary_email,
      person.phone_number,
      person.secondary_phone_number,
      person.date_of_birth,
      person.gender,
      person.nationality,
      person.id_number,
      person.passport_number,
      person.residential_address,
      person.postal_code,
      person.city,
      person.country,
      person.department_id,
      person.faculty_id,
      person.position,
      person.position_grade,
      person.work_location,
      person.shift_information,
      person.status,
      person.category,
      JSON.stringify(person.categoryDetails || {}),
      person.start_date,
      person.end_date,
      person.expected_end_date
    );

    return fetchPersonById(result.lastInsertRowid.toString());
  } catch (error: any) {
    console.error('Error creating person:', error);
    return { data: null, error: error.message };
  }
}

// Update person
export function updatePerson(id: string, updates: Partial<Person>): DbResponse<Person> {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    // Build dynamic update query
    Object.keys(updates).forEach((key) => {
      if (key === 'id' || key === 'created_at' || key === 'updated_at') return;
      
      if (key === 'categoryDetails') {
        fields.push('category_details = ?');
        values.push(JSON.stringify(updates.categoryDetails));
      } else {
        fields.push(key + ' = ?');
        values.push((updates as any)[key]);
      }
    });

    if (fields.length === 0) {
      return fetchPersonById(id);
    }

    values.push(id);
    const query = 'UPDATE people SET ' + fields.join(', ') + ', updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    
    const stmt = db.prepare(query);
    stmt.run(...values);

    return fetchPersonById(id);
  } catch (error: any) {
    console.error('Error updating person:', error);
    return { data: null, error: error.message };
  }
}

// Fetch departments
export function fetchDepartments(): DbResponse<Department[]> {
  try {
    const stmt = db.prepare('SELECT * FROM departments ORDER BY name');
    const rows = stmt.all() as Department[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching departments:', error);
    return { data: null, error: error.message };
  }
}

// Fetch faculties
export function fetchFaculties(): DbResponse<Faculty[]> {
  try {
    const stmt = db.prepare('SELECT * FROM faculties ORDER BY name');
    const rows = stmt.all() as Faculty[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching faculties:', error);
    return { data: null, error: error.message };
  }
}

// Fetch documents by person ID
export function fetchDocumentsByPersonId(personId: string): DbResponse<Document[]> {
  try {
    const stmt = db.prepare('SELECT * FROM documents WHERE person_id = ? ORDER BY uploaded_at DESC');
    const rows = stmt.all(personId) as Document[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return { data: null, error: error.message };
  }
}

// Fetch all documents with optional filters
export function fetchDocuments(filters?: {
  personId?: string;
  type?: string;
}): DbResponse<Document[]> {
  try {
    let query = 'SELECT * FROM documents WHERE 1=1';
    const params: any[] = [];

    if (filters?.personId) {
      query += ' AND person_id = ?';
      params.push(filters.personId);
    }

    if (filters?.type) {
      query += ' AND type = ?';
      params.push(filters.type);
    }

    query += ' ORDER BY uploaded_at DESC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as Document[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    return { data: null, error: error.message };
  }
}

// Upload document
export function uploadDocument(doc: Omit<Document, 'id' | 'uploaded_at'>): DbResponse<Document> {
  try {
    const sql = 'INSERT INTO documents (person_id, type, file_name, file_path, file_size, status) ' +
      'VALUES (?, ?, ?, ?, ?, ?)';

    const stmt = db.prepare(sql);
    const result = stmt.run(
      doc.person_id,
      doc.type,
      doc.file_name,
      doc.file_path,
      doc.file_size,
      doc.status
    );

    const getStmt = db.prepare('SELECT * FROM documents WHERE id = ?');
    const newDoc = getStmt.get(result.lastInsertRowid) as Document;
    
    return { data: newDoc, error: null };
  } catch (error: any) {
    console.error('Error uploading document:', error);
    return { data: null, error: error.message };
  }
}

// Fetch timeline events by person ID
export function fetchTimelineEventsByPersonId(personId: string): DbResponse<TimelineEvent[]> {
  try {
    const stmt = db.prepare('SELECT * FROM timeline_events WHERE person_id = ? ORDER BY event_date DESC');
    const rows = stmt.all(personId) as TimelineEvent[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching timeline events:', error);
    return { data: null, error: error.message };
  }
}

// Fetch audit logs
export function fetchAuditLogs(filters?: {
  personId?: string;
  action?: string;
  performedBy?: string;
}): DbResponse<AuditLog[]> {
  try {
    let query = 'SELECT * FROM audit_logs WHERE 1=1';
    const params: any[] = [];

    if (filters?.personId) {
      query += ' AND person_id = ?';
      params.push(filters.personId);
    }

    if (filters?.action) {
      query += ' AND action = ?';
      params.push(filters.action);
    }

    if (filters?.performedBy) {
      query += ' AND performed_by = ?';
      params.push(filters.performedBy);
    }

    query += ' ORDER BY performed_at DESC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as AuditLog[];
    return { data: rows, error: null };
  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    return { data: null, error: error.message };
  }
}

// Log audit entry
export function logAudit(params: {
  personId: string | null;
  action: string;
  changes: any;
  performedBy: string;
}): DbResponse<boolean> {
  try {
    const sql = 'INSERT INTO audit_logs (person_id, action, changes, performed_by) ' +
      'VALUES (?, ?, ?, ?)';

    const stmt = db.prepare(sql);
    stmt.run(
      params.personId,
      params.action,
      JSON.stringify(params.changes),
      params.performedBy
    );

    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error logging audit:', error);
    return { data: null, error: error.message };
  }
}

// Get current user (mock for now)
export function getCurrentUser() {
  return {
    id: 'user-1',
    name: 'System Administrator',
    role: 'HR_ADMIN',
    email: 'admin@company.com',
  };
}