# NGK HR - Workforce Registry System

A modern, enterprise-grade HR management platform built with Next.js 16, React 19, and Supabase. Designed for scalable workforce management with a focus on professional UX, robust backend integration, and comprehensive reporting capabilities.

**Status**: Production Ready | **Version**: 1.0.0 | **Last Updated**: February 2025

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Project Architecture](#project-architecture)
5. [Installation & Setup](#installation--setup)
6. [System Workflow](#system-workflow)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Component Guide](#component-guide)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## System Overview

NGK HR is a complete workforce management solution combining a polished dark-theme interface with enterprise-grade backend architecture. The system enables HR teams to efficiently manage employee records, track contracts, handle documentation, and generate insights through comprehensive reporting.

### Core Objectives

- Streamline employee lifecycle management from onboarding to offboarding
- Provide real-time visibility into workforce metrics and compliance
- Simplify document management with organized, searchable file storage
- Enable data-driven decision making through reporting and analytics
- Maintain complete audit trail for compliance and accountability

---

## Key Features

### 1. Dashboard & Analytics
- **Real-time KPIs**: Total employees, active count, contracts expiring, recent additions
- **Workforce Metrics**: Visual representation of organizational structure
- **Quick Actions**: Direct access to common tasks (add person, generate report)
- **Trending Data**: Historical metrics and workforce trends

### 2. Employee Management
- **Registry System**: Complete employee database with advanced search and filtering
- **Card-Based UI**: Modern grid view of employees with quick actions
- **Detailed Profiles**: Multi-tab interface showing overview, documents, timeline, notes, audit history
- **Registration Wizard**: 5-step guided process for onboarding new employees
- **Batch Operations**: Manage multiple employees simultaneously

### 3. Document Management
- **File System Interface**: Familiar folder/file navigation paradigm
- **Drag-and-Drop Upload**: Intuitive file management with drag-drop support
- **Organization**: Hierarchical folder structure for document categorization
- **Search & Retrieve**: Full-text search across documents
- **Version Control**: Track document versions and changes

### 4. Reports & Insights
- **Pre-built Reports**: Employee census, departmental summaries, contract alerts
- **Custom Filters**: Filter by date range, department, status, category
- **Export Functions**: Download reports in CSV format for further analysis
- **Report History**: Quick access to recently generated reports

### 5. Configuration & Administration
- **Department Management**: Create and organize organizational departments
- **Faculty Structure**: Define faculty groupings within departments
- **Role Definition**: Configure user roles and permission levels
- **Status Categories**: Define employment status options (Active, Inactive, On Leave, etc.)
- **Real-time Updates**: Changes apply immediately across the system

### 6. Audit & Compliance
- **Complete Audit Trail**: Log all system changes with timestamps
- **Change History**: View who changed what and when
- **Activity Timeline**: Visual representation of employee-related activities
- **Compliance Ready**: Maintain records for audits and regulatory requirements

---

## Technology Stack

```
Frontend Layer:
├── Next.js 16+          # App Router, Server Components, Edge Functions
├── React 19.2+          # Latest features, concurrent rendering
├── TypeScript 5.7+      # Full type safety across codebase
├── Tailwind CSS 3.4+    # Utility-first styling
└── shadcn/ui            # High-quality component library

Backend Layer:
├── Supabase (PostgreSQL)  # Database & authentication
├── Edge Functions         # Serverless API endpoints
├── Real-time DB           # Live data subscriptions
└── RLS Policies           # Row-level security

Styling & UI:
├── Modern Dark Theme      # Professional appearance
├── Design Tokens          # Semantic color system
├── Responsive Grid/Flex   # Mobile-first design
└── Smooth Animations      # Polished interactions

Developer Tools:
├── pnpm                 # Fast package manager
├── Vercel               # Deployment & hosting
├── GitHub               # Version control
└── TypeScript ESLint    # Code quality
```

---

## Project Architecture

### Directory Structure

```
/vercel/share/v0-project/
│
├── app/                              # Next.js application root
│   ├── (app)/                       # Protected routes (requires auth)
│   │   ├── dashboard/page.tsx       # Main dashboard with KPIs
│   │   ├── people/
│   │   │   ├── page.tsx            # Employee registry (grid view)
│   │   │   ├── new/page.tsx        # Employee registration wizard
│   │   │   └── [id]/page.tsx       # Individual employee profile
│   │   ├── documents/page.tsx       # Document management interface
│   │   ├── reports/page.tsx         # Report generation interface
│   │   ├── settings/page.tsx        # Admin configuration
│   │   └── layout.tsx              # Protected layout wrapper
│   │
│   ├── (auth)/                      # Public routes (no auth required)
│   │   ├── login/page.tsx          # Authentication page
│   │   └── layout.tsx              # Auth layout wrapper
│   │
│   ├── api/                         # Backend API endpoints
│   │   ├── people/
│   │   │   ├── route.ts            # GET (list), POST (create)
│   │   │   └── [id]/route.ts       # GET, PATCH, DELETE
│   │   ├── documents/
│   │   │   ├── route.ts            # GET (list), POST (upload)
│   │   │   └── [id]/route.ts       # DELETE
│   │   └── audit/route.ts          # GET audit logs
│   │
│   ├── globals.css                 # Global styles & design tokens
│   ├── layout.tsx                  # Root layout (Dark mode enabled)
│   └── page.tsx                    # Root page (redirects to auth/app)
│
├── components/                      # Reusable React components
│   ├── ui/                         # shadcn/ui base components
│   │   ├── button.tsx, card.tsx, etc.
│   │   └── [40+ UI components]
│   ├── sidebar.tsx                 # Main navigation sidebar
│   ├── topbar.tsx                  # Header with search & profile
│   ├── data-table.tsx              # Sortable/filterable data table
│   ├── person-card-grid.tsx        # Card-based employee display
│   ├── filter-bar.tsx              # Search & filtering UI
│   ├── form-wizard.tsx             # Multi-step registration
│   ├── document-uploader.tsx       # Drag-drop file upload
│   ├── status-pill.tsx             # Status badge component
│   ├── audit-timeline.tsx          # Activity timeline
│   ├── modern-card.tsx             # Modern card wrapper
│   └── category-badge.tsx          # Category label component
│
├── lib/                            # Utilities & configurations
│   ├── supabase.ts                # Supabase client & types
│   ├── constants.ts               # System constants
│   ├── mock-data.ts               # Development mock data
│   ├── utils.ts                   # Helper functions
│   └── cn.ts                      # Tailwind className merger
│
├── services/                       # Business logic layer
│   ├── api.ts                     # Original API service (mock)
│   └── database.ts                # Supabase database operations
│
├── types/                         # TypeScript type definitions
│   └── index.ts                   # All interfaces & types
│
├── scripts/                        # Setup & maintenance
│   ├── init-database.sql          # Database schema
│   └── seed-database.ts           # Sample data generator
│
├── public/                        # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-user.jpg
│   └── placeholder.svg
│
├── hooks/                         # Custom React hooks
│   ├── use-mobile.tsx             # Mobile detection
│   └── use-toast.ts               # Toast notifications
│
└── Configuration Files
    ├── package.json               # Dependencies & scripts
    ├── tsconfig.json              # TypeScript config
    ├── tailwind.config.ts         # Tailwind CSS config
    ├── next.config.mjs            # Next.js config
    ├── postcss.config.mjs         # PostCSS config
    └── .env.example               # Environment variables template
```

### Data Flow Architecture

```
User Action (UI)
    ↓
React Component
    ↓
API Route Handler (/api/*)
    ↓
Database Service (lib/supabase.ts)
    ↓
Supabase Client
    ↓
PostgreSQL Database
    ↓
(Response returns through same path)
    ↓
State Update → UI Re-render
```

---

## Installation & Setup

### Prerequisites

- **Node.js**: 18.17 or higher
- **pnpm**: 8.0 or higher (package manager)
- **Supabase Account**: Free tier at https://supabase.com
- **Git**: For version control

### Step 1: Clone Repository

```bash
git clone https://github.com/Josiah-Tonny/v0-hr-registration-app.git
cd v0-hr-registration-app
git checkout v0/tonnyjosiah0-7267-d628c5ec
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This installs all required packages listed in `package.json`.

### Step 3: Environment Configuration

Create `.env.local` file in project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get these from Supabase**:
1. Go to https://app.supabase.com/projects
2. Select your project
3. Settings → API → Project API Keys
4. Copy URL and keys into `.env.local`

### Step 4: Database Setup

Option A: **Use Mock Data (Development)**
```bash
pnpm dev
# Application starts with mock data
# No database configuration needed
```

Option B: **Connect Supabase (Production)**

1. **Run Database Migration**:
   - Open Supabase SQL Editor
   - Copy contents of `scripts/init-database.sql`
   - Execute in SQL Editor
   - Tables created: `employees`, `documents`, `departments`, etc.

2. **Seed Sample Data** (Optional):
   ```bash
   pnpm run seed
   ```
   Populates database with 100+ sample employees

### Step 5: Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

### Demo Credentials

```
Email:    jane.kariuki@ngk.co.ke
Password: any-password
```

Note: Uses mock data initially. Connect Supabase for persistence.

---

## System Workflow

### User Authentication Flow

```
1. User visits /login
2. Enters email & password
3. LocalStorage check (mock) or Supabase Auth (production)
4. Session established
5. Redirect to /dashboard
6. Protected routes accessible
```

### Employee Registration Workflow

```
Dashboard/People → Add Person Button
    ↓
5-Step Wizard:
  1. Basic Information (name, email, phone)
  2. Employment Details (position, department, faculty)
  3. Contract Information (start date, end date, status)
  4. Category & Notes (contractor type, notes)
  5. Review & Confirm
    ↓
POST /api/people
    ↓
Database.createEmployee()
    ↓
Audit Log Entry Created
    ↓
Success → Redirect to profile
```

### Data Filtering & Search

```
User enters search query or selects filters
    ↓
FilterBar Component captures input
    ↓
React State updates with criteria
    ↓
DataTable re-renders with filtered data
    ↓
Results displayed immediately (client-side)
    ↓
Optional: POST to API for server-side filtering
```

### Document Management Workflow

```
Documents Page
    ↓
User drags file into uploader
    ↓
DocumentUploader validates file
    ↓
POST /api/documents (with FormData)
    ↓
Supabase storage: File uploaded
    ↓
Database: Document record created
    ↓
File appears in document list
    ↓
Associated with employee record
```

### Report Generation

```
Reports Page → Select report type
    ↓
Choose filters (date range, department, etc.)
    ↓
Click "Generate Report"
    ↓
GET /api/people (with filters)
    ↓
Database.fetchEmployees(filters)
    ↓
Server aggregates data
    ↓
Report formatted & displayed
    ↓
User can export as CSV
```

---

## API Documentation

### Authentication

All API endpoints (except `/api/auth/*`) require valid Supabase session:

```typescript
// Session checked automatically via middleware
// Invalid/missing session → 401 Unauthorized
```

### People Management Endpoints

#### `GET /api/people`

List employees with optional filtering.

**Query Parameters**:
```
department: string (optional)    # Filter by department
status: string (optional)        # Filter by employment status
searchQuery: string (optional)   # Search name/email
```

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "department": "string",
      "status": "active|inactive|suspended|contract_ending|on_leave"
    }
  ],
  "success": true
}
```

#### `POST /api/people`

Create new employee.

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "position": "string",
  "department": "string",
  "faculty": "string",
  "startDate": "2025-02-18",
  "endDate": "2026-02-18",
  "status": "active"
}
```

**Response**: `201 Created`
```json
{
  "data": { "id": "uuid", ...employee data },
  "success": true
}
```

#### `GET /api/people/[id]`

Get specific employee details.

**Response**:
```json
{
  "data": {
    "id": "uuid",
    "firstName": "string",
    ...full employee object
  },
  "success": true
}
```

#### `PATCH /api/people/[id]`

Update employee information.

**Request Body**: Partial employee object (any fields to update)

**Response**: Updated employee object

#### `DELETE /api/people/[id]`

Archive/delete employee.

**Response**:
```json
{
  "data": "Deleted",
  "success": true
}
```

### Document Endpoints

#### `GET /api/documents`

List documents, optionally filtered by employee.

**Query Parameters**:
```
employeeId: string (optional)
```

#### `POST /api/documents`

Upload new document.

**Content-Type**: `multipart/form-data`

**Fields**:
- `file`: File object
- `employeeId`: UUID string
- `documentType`: string

#### `DELETE /api/documents/[id]`

Remove document.

### Audit Endpoints

#### `GET /api/audit`

Retrieve audit logs.

**Query Parameters**:
```
entityType: string (optional)   # employees|documents|settings
limit: number (optional)        # Default: 50
```

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "entityType": "employees",
      "entityId": "uuid",
      "action": "CREATE|UPDATE|DELETE",
      "changedData": {...},
      "changedAt": "2025-02-18T10:30:00Z",
      "changedBy": "uuid"
    }
  ],
  "success": true
}
```

---

## Database Schema

### Core Tables

#### `employees`
Primary table for employee records.

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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_employees_email ON employees(email);
```

#### `departments`
Organization structure.

```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  head_of_department VARCHAR(255),
  budget NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `documents`
Document storage records.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_path VARCHAR(500),
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  document_type VARCHAR(100)
);

CREATE INDEX idx_documents_employee ON documents(employee_id);
```

#### `audit_logs`
Complete audit trail.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  changed_data JSONB,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(changed_at);
```

### Relationships Diagram

```
employees
  ├─ department_id → departments(id)
  ├─ faculty_id → faculties(id)
  └─ (has many) documents

documents
  ├─ employee_id → employees(id)
  └─ uploaded_by → auth.users(id)

audit_logs
  └─ changed_by → auth.users(id)
```

---

## Component Guide

### Layout Components

#### Sidebar (`components/sidebar.tsx`)
- Navigation menu with active route highlighting
- Logo and branding
- User info and logout button
- Sticky positioning for constant access

#### Topbar (`components/topbar.tsx`)
- Search bar for global search
- Notifications bell
- User profile dropdown
- Settings access

### Data Display Components

#### DataTable (`components/data-table.tsx`)
- Configurable columns with custom rendering
- Sortable columns (click header)
- Pagination controls
- Loading states
- Click handlers for row interactions

**Usage**:
```typescript
const columns: Column<Employee>[] = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'status', label: 'Status', render: (value) => <StatusPill status={value} /> }
];

<DataTable columns={columns} data={employees} onRowClick={handleRowClick} />
```

#### PersonCardGrid (`components/person-card-grid.tsx`)
- Card-based employee display
- Responsive grid layout (1-4 columns depending on screen size)
- Quick action buttons
- Status indicators

#### FilterBar (`components/filter-bar.tsx`)
- Search input with debouncing
- Multi-select filter dropdowns
- Clear filters button
- Real-time updates

### Form Components

#### FormWizard (`components/form-wizard.tsx`)
- Multi-step form interface
- Step validation
- Progress indication
- Previous/Next navigation
- Submit handler

**5 Steps for Employee Registration**:
1. Basic Information
2. Employment Details
3. Contract Information
4. Category & Notes
5. Review & Confirm

#### DocumentUploader (`components/document-uploader.tsx`)
- Drag-and-drop zone
- File type validation
- Upload progress indicator
- Error handling

### Status & Badge Components

#### StatusPill (`components/status-pill.tsx`)
Employment status display with color coding:
- Active (green)
- Inactive (gray)
- Suspended (red)
- Contract Ending (amber)
- On Leave (blue)

#### CategoryBadge (`components/category-badge.tsx`)
Employee type badges:
- Staff
- Contractor
- Intern
- Consultant

### Timeline Component

#### AuditTimeline (`components/audit-timeline.tsx`)
- Vertical timeline display
- Activity entries with timestamps
- Action type icons
- User information

---

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   - Push code to GitHub
   - Connect repository to Vercel (vercel.com)
   - Vercel auto-detects Next.js

2. **Set Environment Variables**:
   - In Vercel dashboard: Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`, etc.

3. **Deploy**:
   ```bash
   vercel deploy --prod
   ```

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://production-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=production-anon-key
SUPABASE_SERVICE_KEY=production-service-key
NODE_ENV=production
```

### Build & Start Locally

```bash
pnpm build      # Create production bundle
pnpm start      # Start production server
```

---

## Troubleshooting

### Build Errors

**"Cannot find module" errors**:
```bash
rm -rf .next node_modules
pnpm install
pnpm dev
```

**CSS parsing errors**:
- Check `app/globals.css` for `@import` at top
- Verify Tailwind config paths
- Clear cache: `rm -rf .next`

### Database Issues

**Connection errors**:
- Verify Supabase URL & keys in `.env.local`
- Check Supabase project is active
- Ensure IP is whitelisted (Supabase firewall)

**Tables don't exist**:
- Run `scripts/init-database.sql` in Supabase SQL Editor
- Verify migrations completed successfully

### Performance Issues

**Slow page loads**:
- Enable Next.js Image optimization
- Check database query indexes
- Review bundle size: `next/bundle-analyzer`

**Large build size**:
- Remove unused dependencies
- Split code into dynamic imports
- Analyze: `ANALYZE=true pnpm build`

---

## Contributing Guidelines

### Code Standards

- Use TypeScript for all new code
- Follow Tailwind CSS conventions
- Component names in PascalCase
- Keep components under 300 lines

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
refactor: Refactor code
style: Update styling
test: Add tests
```

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Guide**: https://nextjs.org/docs
- **React 19**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org/docs

---

## License & Credits

Proprietary software for NGK. All rights reserved.

**Built with**: Next.js, React, TypeScript, Supabase, Tailwind CSS  
**Deployed on**: Vercel  
**Version**: 1.0.0  
**Last Updated**: February 2025
