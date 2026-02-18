# System Architecture & Implementation Guide

Complete technical documentation of the NGK HR system architecture, data models, API design, and implementation patterns.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Flow Architecture](#data-flow-architecture)
3. [API Design & Patterns](#api-design--patterns)
4. [Database Models](#database-models)
5. [Authentication & Security](#authentication--security)
6. [Frontend Architecture](#frontend-architecture)
7. [Performance Optimization](#performance-optimization)
8. [Deployment Architecture](#deployment-architecture)

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  (Browser - React Components, State Management)              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/HTTPS
┌──────────────────────────┴──────────────────────────────────┐
│                    NEXT.JS SERVER                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Route Handlers (/api/*)                                │ │
│  │ - Validate requests                                    │ │
│  │ - Check authentication                                 │ │
│  │ - Call database layer                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Server Components (Pages, Layouts)                     │ │
│  │ - Server-side rendering                                │ │
│  │ - Direct database access                               │ │
│  │ - Session management                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │ PostgreSQL Protocol
┌──────────────────────────┴──────────────────────────────────┐
│              SUPABASE BACKEND                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ PostgreSQL Database                                    │ │
│  │ - Tables: employees, documents, departments, etc.     │ │
│  │ - Indexes for performance                              │ │
│  │ - Row-Level Security (RLS) policies                    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Supabase Auth                                          │ │
│  │ - User management                                      │ │
│  │ - Session tokens                                       │ │
│  │ - OAuth providers (optional)                           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Storage Service (Optional)                             │ │
│  │ - Document uploads                                     │ │
│  │ - File management                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Principles

**Separation of Concerns**:
- Frontend (UI/UX) ← → Backend (Data/Business Logic)
- Client-side state ← → Server-side state
- Presentation ← → Data access

**Security by Design**:
- All data access through authenticated routes
- Server-side validation on every request
- Type-safe queries with TypeScript
- Environment variables for secrets

**Scalability**:
- Stateless server design
- Database query optimization
- Component-level code splitting
- CDN caching for static assets

---

## Data Flow Architecture

### User Authentication Flow

```
User visits /login
        ↓
    [Login Page]
        ↓
User enters credentials
        ↓
POST /api/auth/login
        ↓
[Next.js API Route]
├─ Validate input
├─ Check Supabase auth
└─ Return session token
        ↓
Browser stores session
(HTTP-only cookie)
        ↓
Redirect to /dashboard
        ↓
Protected routes verify session
        ↓
User logged in ✓
```

### Employee CRUD Flow

```
CREATE:
  User fills form → POST /api/people → Save to DB → Audit log
        ↓
  Response with new employee ID
        ↓
  UI updates with success message
        ↓
  Redirect to employee profile

READ:
  User navigates to /people → GET /api/people → Fetch from DB
        ↓
  Display in grid/table view

UPDATE:
  User clicks edit → PATCH /api/people/[id] → Update DB
        ↓
  Audit log entry created
        ↓
  UI reflects changes

DELETE:
  User clicks delete → DELETE /api/people/[id] → Soft delete
        ↓
  Audit log entry created
        ↓
  UI removes employee from view
```

### Search & Filter Flow

```
User Types Search Query
        ↓
Input debounced (300ms)
        ↓
Filter state updates in React
        ↓
Local filtering of mock data OR
        ↓
GET /api/people?search=query&filters=...
        ↓
Server-side filtering
        ↓
Return filtered results
        ↓
UI updates with results
```

---

## API Design & Patterns

### RESTful Conventions

```
Resource: /api/employees

GET    /api/people           → List all
POST   /api/people           → Create new
GET    /api/people/[id]      → Get one
PATCH  /api/people/[id]      → Update
DELETE /api/people/[id]      → Delete
```

### Response Format

**Success Response**:
```json
{
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe"
  },
  "success": true,
  "message": "Operation completed successfully"
}
```

**Error Response**:
```json
{
  "data": null,
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

### Request/Response Handling

```typescript
// API Route Handler Pattern
export async function POST(request: Request) {
  try {
    // 1. Check authentication
    const session = await getSession(request);
    if (!session) return response(401, 'Unauthorized');
    
    // 2. Parse request body
    const body = await request.json();
    
    // 3. Validate input
    const validation = validateInput(body);
    if (!validation.success) return response(400, validation.errors);
    
    // 4. Call database service
    const result = await createEmployee(body);
    
    // 5. Create audit log
    await logAudit('CREATE', 'employees', result.id, body, session.user.id);
    
    // 6. Return success response
    return response(201, result);
  } catch (error) {
    return response(500, 'Internal server error');
  }
}
```

### Query Parameters

```
GET /api/people?department=HR&status=active&search=john&limit=20&offset=0

department: string    - Filter by department
status: string       - Filter by employment status
search: string       - Search by name/email
limit: number        - Results per page (default: 20)
offset: number       - Pagination offset (default: 0)
sort: string         - Sort field (default: created_at)
order: asc|desc      - Sort order (default: desc)
```

---

## Database Models

### Entity Relationship Diagram

```
┌──────────────────┐         ┌──────────────────┐
│    EMPLOYEES     │         │   DEPARTMENTS    │
├──────────────────┤    ┌─-> ├──────────────────┤
│ id (PK)          │    │    │ id (PK)          │
│ first_name       │    │    │ name             │
│ last_name        │    │    │ description      │
│ email            │    │    │ head_of_dept     │
│ phone            │    │    │ budget           │
│ job_title        │    │    └──────────────────┘
│ department_id (FK)─────┘
│ faculty_id (FK)──┐
│ status           │    ┌──────────────────┐
│ start_date       │    │    FACULTIES     │
│ end_date         │    ├──────────────────┤
│ created_at       │    │ id (PK)          │
│ updated_at       │    │ name             │
└──────────────────┘    │ description      │
         ▲              │ department_id (FK)
         │              └──────────────────┘
         │
┌──────────────────┐
│    DOCUMENTS     │
├──────────────────┤
│ id (PK)          │
│ employee_id (FK)─┼─────┐
│ file_name        │     │
│ file_type        │     │
│ file_path        │     │
│ uploaded_at      │     │
│ uploaded_by (FK) │     │
└──────────────────┘     │
                         │
                 ┌──────────────────┐
                 │   AUTH.USERS     │
                 ├──────────────────┤
                 │ id (PK)          │
                 │ email            │
                 │ encrypted_pass   │
                 │ created_at       │
                 └──────────────────┘

┌──────────────────────┐
│    AUDIT_LOGS        │
├──────────────────────┤
│ id (PK)              │
│ entity_type          │
│ entity_id            │
│ action               │
│ changed_data (JSONB) │
│ changed_by (FK)      │
│ changed_at           │
└──────────────────────┘
```

### Table Schemas

**employees**:
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  position VARCHAR(255),
  department_id UUID REFERENCES departments(id),
  faculty_id UUID REFERENCES faculties(id),
  employment_status VARCHAR(50),
  start_date DATE,
  end_date DATE,
  salary_grade VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
```

**documents**:
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_path VARCHAR(500),
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  document_type VARCHAR(100)
);

CREATE INDEX idx_documents_employee ON documents(employee_id);
CREATE INDEX idx_documents_upload_date ON documents(uploaded_at);
```

---

## Authentication & Security

### Session Management

**How Sessions Work**:
```
1. User logs in
2. Supabase Auth generates session token
3. Token stored in HTTP-only cookie (secure)
4. Cookie sent with every request automatically
5. Server verifies token validity
6. Session expires after inactivity (14 days default)
7. User must re-authenticate after expiration
```

**Checking Session**:
```typescript
// In API routes
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  return response(401, 'Unauthorized');
}
```

### Row-Level Security (RLS)

```sql
-- Enable RLS on employees table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Users can view all employees (public data)
CREATE POLICY "Enable public read"
  ON employees FOR SELECT
  USING (true);

-- Only admins can modify employees
CREATE POLICY "Enable modification for admins"
  ON employees FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));
```

### Data Protection

- **Passwords**: Hashed with bcrypt (Supabase handles)
- **Sensitive data**: Encrypted at rest in Supabase
- **API keys**: Stored as environment variables
- **Session tokens**: HTTP-only, secure, sameSite cookies
- **HTTPS Only**: All communication encrypted

### Input Validation

All user inputs validated on both client and server:

```typescript
// Server-side validation
const schema = {
  firstName: { type: 'string', minLength: 2, maxLength: 100 },
  lastName: { type: 'string', minLength: 2, maxLength: 100 },
  email: { type: 'email', unique: true },
  phone: { type: 'phone', optional: true }
};

function validateInput(data: any, schema: any) {
  const errors: Record<string, string> = {};
  
  Object.entries(schema).forEach(([field, rules]: any) => {
    const value = data[field];
    
    if (!rules.optional && !value) {
      errors[field] = `${field} is required`;
    }
    if (value && rules.type === 'email' && !isValidEmail(value)) {
      errors[field] = 'Invalid email format';
    }
  });
  
  return { success: Object.keys(errors).length === 0, errors };
}
```

---

## Frontend Architecture

### Component Hierarchy

```
RootLayout
├── ThemeProvider
└── children
    ├── (auth) - Authentication routes
    │   ├── layout
    │   └── login
    │
    └── (app) - Protected routes
        ├── layout
        │   ├── Sidebar
        │   ├── Topbar
        │   └── children
        │
        ├── dashboard
        │   ├── KPI Cards
        │   ├── Charts
        │   └── Tables
        │
        ├── people
        │   ├── PersonCardGrid
        │   ├── FilterBar
        │   └── DataTable
        │
        ├── documents
        │   ├── FileSystem
        │   └── DocumentUploader
        │
        ├── reports
        │   ├── ReportGenerator
        │   └── ReportList
        │
        └── settings
            ├── DepartmentManager
            ├── FacultyManager
            ├── RoleManager
            └── StatusManager
```

### State Management

**Client-side State**:
- Filter selections (React useState)
- Form inputs (React setState)
- UI toggles (modal open/close)

**Server-side State**:
- User sessions
- Database records
- Audit logs

**No Global State Manager** - Keeps the app simple and performant

### Component Patterns

**Server Component**:
```typescript
// Page or Layout component
export default async function Page() {
  const data = await fetch('...');
  return <ClientComponent data={data} />;
}
```

**Client Component with Hooks**:
```typescript
'use client';

export function MyComponent() {
  const [state, setState] = useState();
  const handleClick = () => setState(value);
  return <button onClick={handleClick} />;
}
```

---

## Performance Optimization

### Frontend Optimization

**Code Splitting**:
```typescript
// Dynamic imports for large components
const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <Skeleton />,
});
```

**Image Optimization**:
```tsx
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

**CSS Optimization**:
- Tailwind purges unused styles in production
- Critical CSS inlined automatically
- CSS-in-JS avoided for performance

### Database Optimization

**Query Optimization**:
```typescript
// BAD: Fetches all columns
const employees = await db.select('*').from('employees');

// GOOD: Fetch only needed columns
const employees = await db
  .select('id', 'firstName', 'lastName', 'email')
  .from('employees')
  .limit(20);
```

**Indexing Strategy**:
```sql
-- Create indexes on frequently queried columns
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_documents_employee ON documents(employee_id);
```

**Pagination**:
```typescript
// Always paginate large datasets
const limit = 20;
const offset = (page - 1) * limit;

const results = await db
  .select()
  .from('employees')
  .limit(limit)
  .offset(offset);
```

### Caching Strategy

**Browser Cache** (Cache-Control headers):
```
Static assets: 1 year
HTML: No cache
API responses: No cache (always fresh)
```

**Database Cache** (Supabase):
- Indexes for fast lookups
- Connection pooling
- Query result caching (optional)

---

## Deployment Architecture

### Vercel Deployment

```
┌─────────────────────────────┐
│   GitHub Repository         │
│   └── Push to main branch   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Vercel Build & Deploy     │
│   ├── Install dependencies  │
│   ├── Build Next.js bundle  │
│   ├── Run tests (optional)  │
│   └── Deploy to edge network│
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Vercel Edge Network       │
│   ├── CDN for static assets │
│   ├── Serverless functions  │
│   └── Custom domains        │
└─────────────────────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Supabase Backend          │
│   ├── PostgreSQL database   │
│   └── Auth service          │
└─────────────────────────────┘
```

### Environment Configuration

**Development**:
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-key
SUPABASE_SERVICE_KEY=local-service-key
NODE_ENV=development
```

**Production**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://production-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=production-anon-key
SUPABASE_SERVICE_KEY=production-service-key
NODE_ENV=production
```

---

## Error Handling

### Frontend Error Handling

```typescript
try {
  const response = await fetch('/api/people', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    showError(error.message);
    return;
  }
  
  const result = await response.json();
  showSuccess('Employee created successfully');
} catch (error) {
  showError('Network error. Please try again.');
}
```

### Backend Error Handling

```typescript
export async function POST(request: Request) {
  try {
    // Logic here
  } catch (error) {
    if (error instanceof ValidationError) {
      return response(400, error.message);
    }
    if (error instanceof AuthError) {
      return response(401, 'Unauthorized');
    }
    // Log unexpected errors
    console.error('Unexpected error:', error);
    return response(500, 'Internal server error');
  }
}
```

---

## Monitoring & Observability

### Logging

- **Browser Console**: Development debugging
- **Server Logs**: Vercel logs dashboard
- **Database Logs**: Supabase monitoring
- **Audit Logs**: Application audit trail

### Error Tracking

Consider integrating:
- Sentry for error tracking
- DataDog for performance monitoring
- LogRocket for session replay

---

**Last Updated**: February 2025  
**Maintained By**: Development Team  
**Status**: Active Documentation
