import { Pool } from "@neondatabase/serverless";
import { Person, Department, Faculty, Document, TimelineEvent, AuditLog } from "@/types";

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL,
});

type DbResponse<T> = { data: T | null; error: string | null };

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

function parseCategoryDetails(json: string | null): any {
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to parse category_details:", e);
    return {};
  }
}

export async function fetchPeople(filters?: {
  department?: string;
  status?: string;
  category?: string;
  search?: string;
}): Promise<DbResponse<Person[]>> {
  try {
    let query = "SELECT * FROM employees WHERE 1=1";
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.department) {
      query += ` AND department_id = $${paramCount++}`;
      params.push(filters.department);
    }
    if (filters?.status) {
      query += ` AND status = $${paramCount++}`;
      params.push(filters.status);
    }
    if (filters?.category) {
      query += ` AND category = $${paramCount++}`;
      params.push(filters.category);
    }
    if (filters?.search) {
      query += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount + 1} OR employee_id ILIKE $${paramCount + 2})`;
      const searchParam = "%" + filters.search + "%";
      params.push(searchParam, searchParam, searchParam);
      paramCount += 3;
    }

    query += " ORDER BY created_at DESC";
    const result = await pool.query(query, params);
    const people = result.rows.map(dbRowToPerson);
    return { data: people, error: null };
  } catch (error: any) {
    console.error("Error fetching people:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchPersonById(id: string): Promise<DbResponse<Person>> {
  try {
    const result = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return { data: null, error: "Person not found" };
    }
    return { data: dbRowToPerson(result.rows[0]), error: null };
  } catch (error: any) {
    console.error("Error fetching person:", error);
    return { data: null, error: error.message };
  }
}

export async function createPerson(person: Omit<Person, "id" | "createdAt" | "updatedAt">): Promise<DbResponse<Person>> {
  try {
    const sql = `INSERT INTO employees (
      employee_id, first_name, last_name, email, phone_number, date_of_birth, gender, nationality, 
      id_number, department_id, faculty_id, position, status, category_details, start_date, 
      end_date, expected_end_date, emergency_contact, emergency_contact_phone, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
    RETURNING id`;

    const result = await pool.query(sql, [
      `EMP-${Date.now()}`, person.firstName, person.lastName, person.email, person.phoneNumber,
      person.dateOfBirth, person.gender, person.nationality, person.personalIdNumber,
      person.department, person.faculty, person.position, person.status,
      JSON.stringify(person.categoryDetails || {}), person.engagementDates.startDate,
      person.engagementDates.endDate, person.engagementDates.expectedEndDate,
      person.emergencyContact, person.emergencyContactPhone, person.createdBy
    ]);

    return fetchPersonById(result.rows[0].id);
  } catch (error: any) {
    console.error("Error creating person:", error);
    return { data: null, error: error.message };
  }
}

export async function updatePerson(id: string, updates: Partial<Person>): Promise<DbResponse<Person>> {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (key === "id" || key === "created_at" || key === "updated_at") return;
      if (key === "categoryDetails") {
        fields.push(`category_details = $${paramCount++}`);
        values.push(JSON.stringify(updates.categoryDetails));
      } else {
        fields.push(`${key} = $${paramCount++}`);
        values.push((updates as any)[key]);
      }
    });

    if (fields.length === 0) {
      return fetchPersonById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    
    const query = `UPDATE employees SET ${fields.join(", ")} WHERE id = $${paramCount}`;
    await pool.query(query, values);
    return fetchPersonById(id);
  } catch (error: any) {
    console.error("Error updating person:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchDepartments(): Promise<DbResponse<Department[]>> {
  try {
    const result = await pool.query("SELECT * FROM departments ORDER BY name");
    return { data: result.rows as Department[], error: null };
  } catch (error: any) {
    console.error("Error fetching departments:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchFaculties(): Promise<DbResponse<Faculty[]>> {
  try {
    const result = await pool.query("SELECT * FROM faculties ORDER BY name");
    return { data: result.rows as Faculty[], error: null };
  } catch (error: any) {
    console.error("Error fetching faculties:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchDocumentsByPersonId(personId: string): Promise<DbResponse<Document[]>> {
  try {
    const result = await pool.query(
      "SELECT * FROM documents WHERE employee_id = $1 ORDER BY created_at DESC",
      [personId]
    );
    return { data: result.rows as Document[], error: null };
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchDocuments(filters?: {
  personId?: string;
  type?: string;
}): Promise<DbResponse<Document[]>> {
  try {
    let query = "SELECT * FROM documents WHERE 1=1";
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.personId) {
      query += ` AND employee_id = $${paramCount++}`;
      params.push(filters.personId);
    }
    if (filters?.type) {
      query += ` AND category = $${paramCount++}`;
      params.push(filters.type);
    }

    query += " ORDER BY created_at DESC";
    const result = await pool.query(query, params);
    return { data: result.rows as Document[], error: null };
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    return { data: null, error: error.message };
  }
}

export async function uploadDocument(doc: Omit<Document, "id" | "created_at" | "updated_at">): Promise<DbResponse<Document>> {
  try {
    const sql = `INSERT INTO documents (employee_id, title, category, file_name, file_url, file_size, file_type, uploaded_by) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const result = await pool.query(sql, [
      doc.person_id, doc.title || "Untitled", doc.type || "general", doc.file_name,
      doc.file_path, doc.file_size, doc.file_type || "application/octet-stream",
      doc.uploaded_by || "system"
    ]);
    
    return { data: result.rows[0] as Document, error: null };
  } catch (error: any) {
    console.error("Error uploading document:", error);
    return { data: null, error: error.message };
  }
}

export async function fetchTimelineEventsByPersonId(personId: string): Promise<DbResponse<TimelineEvent[]>> {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = "timeline_events"
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { data: [], error: null };
    }
    
    const result = await pool.query(
      "SELECT * FROM timeline_events WHERE person_id = $1 ORDER BY event_date DESC",
      [personId]
    );
    return { data: result.rows as TimelineEvent[], error: null };
  } catch (error: any) {
    console.error("Error fetching timeline events:", error);
    return { data: [], error: null };
  }
}

export async function fetchAuditLogs(filters?: {
  personId?: string;
  action?: string;
  performedBy?: string;
}): Promise<DbResponse<AuditLog[]>> {
  try {
    let query = "SELECT * FROM audit_logs WHERE 1=1";
    const params: any[] = [];
    let paramCount = 1;

    if (filters?.personId) {
      query += ` AND entity_id = $${paramCount++}`;
      params.push(filters.personId);
    }
    if (filters?.action) {
      query += ` AND action = $${paramCount++}`;
      params.push(filters.action);
    }
    if (filters?.performedBy) {
      query += ` AND user_id = $${paramCount++}`;
      params.push(filters.performedBy);
    }

    query += " ORDER BY created_at DESC";
    const result = await pool.query(query, params);
    return { data: result.rows as AuditLog[], error: null };
  } catch (error: any) {
    console.error("Error fetching audit logs:", error);
    return { data: null, error: error.message };
  }
}

export async function logAudit(params: {
  personId: string | null;
  action: string;
  changes: any;
  performedBy: string;
}): Promise<DbResponse<boolean>> {
  try {
    const sql = `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, changes) 
      VALUES ($1, $2, $3, $4, $5)`;

    await pool.query(sql, [
      params.performedBy, params.action, "employee", params.personId, params.changes
    ]);

    return { data: true, error: null };
  } catch (error: any) {
    console.error("Error logging audit:", error);
    return { data: null, error: error.message };
  }
}

export function getCurrentUser() {
  return {
    id: "user-1",
    name: "System Administrator",
    role: "HR_ADMIN",
    email: "admin@company.com",
  };
}

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

export { pool };
