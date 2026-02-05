# Database Schema Guide

This document provides the SQL schema for implementing the NGK HR system with a real database. These schemas align with the TypeScript types defined in `types/index.ts`.

## Setup Instructions

### For Supabase Users
1. Go to your Supabase project
2. Open SQL Editor
3. Create a new query and paste each schema below
4. Run the queries in order

### For Direct PostgreSQL
Use the provided SQL in your PostgreSQL client:
```bash
psql -U username -d database_name -f schema.sql
```

## Users Table

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'HR_OFFICER',
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
```

## Organizations Table (Departments)

```sql
CREATE TABLE departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_name ON departments(name);
```

## Faculties Table

```sql
CREATE TABLE faculties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faculties_department ON faculties(department_id);
```

## Employee Statuses Table

```sql
CREATE TABLE employee_statuses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL UNIQUE,
  display_label VARCHAR(100) NOT NULL,
  color_code VARCHAR(20),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employee_statuses (status_name, display_label, color_code) VALUES
  ('active', 'Active', 'green'),
  ('inactive', 'Inactive', 'gray'),
  ('suspended', 'Suspended', 'red'),
  ('contract_ending', 'Contract Ending', 'orange'),
  ('on_leave', 'On Leave', 'blue');
```

## Employee Categories Table

```sql
CREATE TABLE employee_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE,
  display_label VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employee_categories (category_name, display_label) VALUES
  ('staff', 'Staff'),
  ('contractor', 'Contractor'),
  ('intern', 'Intern'),
  ('consultant', 'Consultant');
```

## People Table (Main Employee Records)

```sql
CREATE TABLE people (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  personal_id_number VARCHAR(50) UNIQUE NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  nationality VARCHAR(100),
  
  -- Employment Information
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  department_id UUID NOT NULL REFERENCES departments(id),
  faculty_id UUID REFERENCES faculties(id),
  position VARCHAR(255) NOT NULL,
  manager_id UUID REFERENCES people(id) ON DELETE SET NULL,
  
  -- Category Details
  category VARCHAR(50) NOT NULL,
  staff_number VARCHAR(50),
  contractor_type VARCHAR(100),
  internship_level VARCHAR(100),
  consultant_domain VARCHAR(100),
  
  -- Engagement Dates
  start_date DATE NOT NULL,
  end_date DATE,
  expected_end_date DATE,
  
  -- Emergency Contact
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  
  -- Audit Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  
  FOREIGN KEY (status) REFERENCES employee_statuses(status_name),
  FOREIGN KEY (category) REFERENCES employee_categories(category_name)
);

CREATE INDEX idx_people_email ON people(email);
CREATE INDEX idx_people_department ON people(department_id);
CREATE INDEX idx_people_status ON people(status);
CREATE INDEX idx_people_created ON people(created_at);
```

## Documents Table

```sql
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  file_name VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  storage_path VARCHAR(500),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  
  -- Dates
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  uploaded_by UUID NOT NULL REFERENCES users(id),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional
  notes TEXT,
  url VARCHAR(500),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_person ON documents(person_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_uploaded ON documents(uploaded_at);
```

## Audit Logs Table

```sql
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  changes JSONB,
  
  -- Metadata
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  performed_by UUID NOT NULL REFERENCES users(id),
  ip_address INET,
  user_agent VARCHAR(500),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_person ON audit_logs(person_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
```

## Timeline Events Table

```sql
CREATE TABLE timeline_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  performed_by UUID NOT NULL REFERENCES users(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_timeline_events_person ON timeline_events(person_id);
CREATE INDEX idx_timeline_events_timestamp ON timeline_events(timestamp);
```

## Roles Table

```sql
CREATE TABLE roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name, description) VALUES
  ('HR_ADMIN', 'Full system access'),
  ('HR_OFFICER', 'Can manage people and documents'),
  ('SUPERVISOR', 'Can view team information'),
  ('SECURITY_VIEW', 'Limited read access for security'),
  ('READ_ONLY_AUDITOR', 'Audit log viewing only');
```

## Enable Row Level Security (Supabase Only)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow HR_ADMIN full access
CREATE POLICY "HR_ADMIN full access" ON people
  USING (auth.jwt() ->> 'role' = 'HR_ADMIN');

-- Allow HR_OFFICER to view and create
CREATE POLICY "HR_OFFICER view" ON people
  FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('HR_ADMIN', 'HR_OFFICER'));

-- Allow users to view their own data
CREATE POLICY "Users view own documents" ON documents
  FOR SELECT
  USING (
    (SELECT person_id FROM people WHERE id = auth.uid()) = person_id
    OR auth.jwt() ->> 'role' IN ('HR_ADMIN', 'HR_OFFICER')
  );
```

## Migrations (TypeORM/Prisma Compatible)

### For Prisma Users

Create schema.prisma:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      String
  people    Person[]
  documents Document[]
  
  @@index([email])
}

model Person {
  id              String   @id @default(cuid())
  firstName       String
  lastName        String
  email           String   @unique
  status          String
  departmentId    String
  createdAt       DateTime @default(now())
  documents       Document[]
  
  @@index([email])
  @@index([status])
}

// ... continue with other models
```

## Sample Queries

### Get Active Employees
```sql
SELECT * FROM people 
WHERE status = 'active' 
ORDER BY created_at DESC;
```

### Get Contracts Ending Soon
```sql
SELECT * FROM people 
WHERE status = 'contract_ending' 
AND expected_end_date < CURRENT_DATE + INTERVAL '30 days'
ORDER BY expected_end_date;
```

### Get Employee with Documents
```sql
SELECT p.*, d.* 
FROM people p
LEFT JOIN documents d ON p.id = d.person_id
WHERE p.id = $1;
```

### Get Audit Trail for Person
```sql
SELECT * FROM audit_logs 
WHERE person_id = $1 
ORDER BY timestamp DESC;
```

## Backup & Restore

### Backup Supabase Database
```bash
pg_dump "postgresql://..." > backup.sql
```

### Restore
```bash
psql "postgresql://..." < backup.sql
```

## Migration from Mock Data

To migrate existing mock data to real database:

1. Export mock data to CSV/JSON
2. Create import script:
```typescript
import { mockPeople } from '@/lib/mock-data'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

async function importData() {
  for (const person of mockPeople) {
    await supabase
      .from('people')
      .insert(person)
  }
}
```

## Performance Optimization

### Add Indexes for Common Queries
```sql
-- Department lookups
CREATE INDEX idx_people_department_status 
ON people(department_id, status);

-- Date range queries
CREATE INDEX idx_people_created_at 
ON people(created_at DESC);

-- Document searches
CREATE INDEX idx_documents_person_status 
ON documents(person_id, status);
```

### Create Views for Common Reports
```sql
CREATE VIEW employee_census AS
SELECT 
  d.name as department,
  COUNT(*) as total_employees,
  SUM(CASE WHEN p.status = 'active' THEN 1 ELSE 0 END) as active_count
FROM people p
JOIN departments d ON p.department_id = d.id
GROUP BY d.name;
```

## Notes

- All IDs use UUID for better security and distribution
- Timestamps use `TIMESTAMP WITH TIME ZONE` for international support
- JSONB field in audit_logs allows flexible change tracking
- Indexes on frequently queried columns improve performance
- Consider archiving old records periodically
- Enable RLS for production security
- Regular backups are recommended
