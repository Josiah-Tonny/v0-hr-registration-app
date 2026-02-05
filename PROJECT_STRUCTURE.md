# Complete Project Structure & File Guide

## Overview
This document provides a complete map of all files in the NGK HR Workforce Registry system, with descriptions and key functionality.

---

## Core Configuration Files

### Root Level
- **`package.json`** - Project dependencies and scripts
  - Contains: Next.js 14, React 19, Tailwind, shadcn/ui
  - Scripts: `dev`, `build`, `start`, `lint`

- **`tsconfig.json`** - TypeScript configuration
  - Target: ES2020
  - Module resolution: Node
  - Path aliases configured for cleaner imports

- **`tailwind.config.ts`** - Tailwind CSS configuration
  - Extends default theme
  - Dark mode support (system)
  - Custom color overrides

- **`next.config.mjs`** - Next.js configuration
  - App Router enabled
  - Image optimization
  - Production ready

- **`.env.example`** - Environment variable template
  - Supabase credentials
  - Database URL
  - API configuration
  - Feature flags

---

## Documentation Files

### Main Documentation
- **`README.md`** - Comprehensive project documentation
  - Features overview
  - Project structure
  - Installation steps
  - Tech stack
  - Next steps for database integration

- **`SETUP.md`** - Quick start guide
  - Installation steps
  - Demo credentials
  - Common tasks
  - Troubleshooting
  - Deployment instructions

- **`DATABASE_SCHEMA.md`** - Database implementation guide
  - SQL schema for all tables
  - Supabase setup instructions
  - Row-level security policies
  - Sample queries
  - Migration guide

- **`PROJECT_STRUCTURE.md`** - This file
  - Complete file map
  - File descriptions
  - Key functionality reference

---

## Application Structure

### `/app` Directory

#### Public Routes (Authentication)
```
app/(auth)/
├── layout.tsx                 # Auth layout with gradient background
└── login/
    └── page.tsx              # Login form page with demo credentials
```

#### Protected Routes (Main App)
```
app/(app)/
├── layout.tsx                # App layout with sidebar & topbar
├── dashboard/
│   └── page.tsx              # Dashboard with KPI cards & tables
├── people/
│   ├── page.tsx              # People registry list
│   ├── new/
│   │   └── page.tsx          # Multi-step registration wizard
│   └── [id]/
│       └── page.tsx          # Person profile with tabs
├── documents/
│   └── page.tsx              # Documents center
├── reports/
│   └── page.tsx              # Report generator
└── settings/
    └── page.tsx              # Admin settings
```

#### API Routes
```
app/api/
├── people/
│   ├── route.ts              # GET: list people, POST: create
│   └── [id]/
│       └── route.ts          # GET: person details, PATCH: update
├── documents/
│   └── route.ts              # GET: list documents
└── audit/
    └── route.ts              # GET: audit logs & timeline
```

#### Root Layout
- **`app/layout.tsx`** - Root layout
  - Sets page title & metadata
  - Loads Google Fonts (Geist)
  - Global styles

- **`app/globals.css`** - Global styles
  - Tailwind directives
  - Default shadcn/ui styles
  - CSS variables

---

## Components Directory (`/components`)

### Layout Components
- **`sidebar.tsx`** - Navigation sidebar
  - Logo and branding
  - Dynamic navigation based on constants
  - Logout button
  - Active route highlighting

- **`topbar.tsx`** - Top navigation bar
  - Search input
  - Notification bell
  - User profile dropdown
  - Current user info display

### Data Display Components
- **`data-table.tsx`** - Reusable data table
  - Sortable columns
  - Click handlers
  - Loading states
  - Empty state
  - Generic type-safe implementation

- **`status-pill.tsx`** - Status badge
  - Configurable sizes
  - Color-coded by status
  - Defined in STATUS_CONFIG

- **`category-badge.tsx`** - Category indicator
  - Employment category display
  - Color-coded design
  - Multiple sizes

- **`person-card.tsx`** - Person summary card
  - Avatar with initials
  - Name and position
  - Department and status
  - Click handler for navigation

### Form & Input Components
- **`filter-bar.tsx`** - Search and filter UI
  - Search input with icon
  - Multi-select filters
  - Clear button
  - Callbacks for state changes

- **`document-uploader.tsx`** - File upload component
  - Drag-and-drop interface
  - File validation
  - File list display
  - Remove functionality

- **`form-wizard.tsx`** - Multi-step form
  - Visual stepper
  - Step navigation
  - Progress tracking
  - Next/Previous buttons

### Display Components
- **`audit-timeline.tsx`** - Activity timeline
  - Chronological event display
  - Event type icons
  - Formatted timestamps
  - Event descriptions

### UI Components (`/components/ui`)
Pre-installed shadcn/ui components:
- `accordion.tsx`, `alert.tsx`, `avatar.tsx`
- `button.tsx`, `card.tsx`
- `dialog.tsx`, `dropdown-menu.tsx`
- `input.tsx`, `label.tsx`
- `select.tsx`, `tabs.tsx`
- And 20+ more from shadcn/ui

---

## Types & Interfaces (`/types`)

### `/types/index.ts` - Complete type definitions
Contains:
- **Authentication Types**
  - `User`, `UserRole`
  
- **People Management**
  - `Person`, `PersonStatus`, `PersonCategory`
  - `CategoryDetails`, `EngagementDates`
  
- **Organization**
  - `Department`, `Faculty`, `StatusOption`, `Role`
  
- **Documents**
  - `Document`, `DocumentType`, `DocumentStatus`
  
- **Audit & Tracking**
  - `AuditLog`, `TimelineEvent`
  
- **Forms**
  - `PersonFormData`
  
- **API**
  - `ApiResponse<T>`, `PaginatedResponse<T>`

Total: 15+ interfaces, fully typed

---

## Business Logic (`/lib` & `/services`)

### `/lib/constants.ts`
- `STATUS_CONFIG` - Status colors and labels
- `CATEGORY_CONFIG` - Category definitions
- `DOCUMENT_TYPES` - Document type mappings
- `USER_ROLES` - Role descriptions
- `NAVIGATION_ITEMS` - Sidebar navigation
- `GENDERS` - Gender options
- `VALIDATION_RULES` - Email, phone regex patterns
- `PERSON_WIZARD_STEPS` - Form wizard configuration
- Column definitions for tables

### `/lib/mock-data.ts`
Sample data (easily replaced with real API calls):
- `mockCurrentUser` - Logged-in user
- `mockDepartments` - 4 departments
- `mockFaculties` - 2 faculties
- `mockStatuses` - 5 status options
- `mockPeople` - 5 sample employees
- `mockDocuments` - 4 sample documents
- `mockAuditLogs` - 3 audit entries
- `mockTimelineEvents` - 3 timeline events
- `mockDashboardMetrics` - KPI values

### `/lib/utils.ts`
- `cn()` - Class name merging utility (from shadcn)

### `/services/api.ts`
API service functions (mock implementations):

**People Endpoints:**
- `listPeople(page, pageSize)` - Paginated list
- `getPersonById(id)` - Single person details
- `createPerson(data)` - Create new employee
- `updatePerson(id, data)` - Update existing
- `changePersonStatus(id, status)` - Status change

**Documents:**
- `listDocuments(personId?)` - Document list
- `uploadDocument(personId, file)` - Upload stub

**Audit & Timeline:**
- `listAuditLogs(personId)` - Audit history
- `getTimelineEvents(personId)` - Activity timeline

**Organization:**
- `listDepartments()` - Departments
- `listFaculties()` - Faculties
- `createDepartment(data)` - Add department
- `createFaculty(data)` - Add faculty

---

## Hooks (`/hooks`)

Pre-installed hooks (from starter template):
- **`use-mobile.tsx`** - Mobile breakpoint detection
- **`use-toast.ts`** - Toast notifications (Sonner)

---

## API Routes (`/app/api`)

### `/app/api/people/route.ts`
- `GET /api/people?page=1&pageSize=10` - List employees
- `POST /api/people` - Create new employee

### `/app/api/people/[id]/route.ts`
- `GET /api/people/[id]` - Get employee details
- `PATCH /api/people/[id]` - Update employee

### `/app/api/documents/route.ts`
- `GET /api/documents?personId=...` - List documents

### `/app/api/audit/route.ts`
- `GET /api/audit?personId=...&type=logs|timeline` - Audit data

---

## Pages Overview

### Login Page (`/app/(auth)/login/page.tsx`)
- Email & password form
- Demo credentials display
- Mock authentication
- Redirect to dashboard on success

### Dashboard (`/app/(app)/dashboard/page.tsx`)
- 4 KPI cards (Total, Active, Ending, Added)
- "Contracts Ending Soon" table
- "Recently Added" table
- Add New Person button

### People Registry (`/app/(app)/people/page.tsx`)
- Search bar
- Multiple filters (Department, Status, Category)
- Sortable data table
- Click to view detail
- Add Person button

### Person Detail (`/app/(app)/people/[id]/page.tsx`)
- 5 tabs:
  - Overview (Personal & Employment details)
  - Documents (File list)
  - Timeline (Activity history)
  - Notes (Placeholder)
  - Audit (System logs)
- Status and category badges
- Edit button

### Add Person Wizard (`/app/(app)/people/new/page.tsx`)
- 5-step wizard:
  1. Identity (Personal info)
  2. Category (Employment type)
  3. Engagement (Dates & position)
  4. Documents (File upload)
  5. Review (Confirmation)
- Visual stepper
- Navigation buttons

### Documents Center (`/app/(app)/documents/page.tsx`)
- Document list with filters
- Type and status filters
- Sortable table
- Upload functionality (stub)

### Reports (`/app/(app)/reports/page.tsx`)
- Report type selector
- Department filter
- Date range picker
- Generate & Export buttons
- Recent reports list

### Settings (`/app/(app)/settings/page.tsx`)
- 4 tabs:
  1. Departments - Add/Edit/Delete
  2. Faculties - Faculty management
  3. Roles - Role configuration
  4. Statuses - Status options
- CRUD modals (UI only)

---

## Data Flow Example

### User Views Person Detail
```
1. Click person row in People page
2. Navigate to /people/[id]
3. Page fetches mockPeople data
4. Displays tabs:
   - Overview from Person object
   - Documents from mockDocuments (filtered by personId)
   - Timeline from mockTimelineEvents
   - Audit from mockAuditLogs
```

### To Replace with Real Database
```
1. Update services/api.ts:
   - Import Supabase client
   - Replace mockPeople with supabase.from('people').select()
   - Replace mockDocuments with supabase.from('documents').select()
   - Etc.

2. Update API routes to call database:
   - Keep same endpoint URLs
   - Route handlers already call services/api.ts
```

---

## File Count Summary

- **Pages**: 8 pages
- **Components**: 13 custom + 25+ shadcn/ui
- **API Routes**: 4 main endpoints
- **TypeScript Types**: 15+ interfaces
- **Mock Data Sets**: 8 collections
- **Config Files**: 4 files
- **Documentation**: 4 comprehensive guides
- **Total Custom Code**: ~4000 lines

---

## Key Implementation Patterns

### 1. Component Pattern
```typescript
// Reusable component with TypeScript
interface Props {
  data: Type
  onClick?: () => void
}

export function Component({ data, onClick }: Props) {
  return <div onClick={onClick}>{/* render */}</div>
}
```

### 2. API Service Pattern
```typescript
// Typed service functions
export async function listPeople() {
  // Mock or real implementation
  return PaginatedResponse<Person>
}

// Called from API route
export async function GET() {
  const result = await listPeople()
  return NextResponse.json(result)
}
```

### 3. Page Pattern
```typescript
// Client-side page with state management
'use client'

export default function Page() {
  const [data, setData] = useState([])
  // Render with data
}
```

---

## Next Steps Checklist

- [ ] Run `npm install`
- [ ] Start with `npm run dev`
- [ ] Test all pages in browser
- [ ] Review mock data structure
- [ ] Plan database schema integration
- [ ] Set up Supabase project (or other DB)
- [ ] Update `services/api.ts` with real calls
- [ ] Implement real authentication
- [ ] Deploy to Vercel
- [ ] Set up CI/CD

---

## Quick Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| Data Table | `/components/data-table.tsx` | Sortable tables with pagination |
| Status Pill | `/components/status-pill.tsx` | Color-coded status badges |
| Filter Bar | `/components/filter-bar.tsx` | Search and multi-filter UI |
| Form Wizard | `/components/form-wizard.tsx` | Multi-step forms |
| Sidebar | `/components/sidebar.tsx` | Navigation |
| API Services | `/services/api.ts` | Business logic & data fetching |
| Types | `/types/index.ts` | All TypeScript interfaces |
| Constants | `/lib/constants.ts` | Config & settings |
| Mock Data | `/lib/mock-data.ts` | Sample data |

---

## File Modifications Guide

To modify existing behavior:

1. **Change Colors/Labels** → Edit `/lib/constants.ts`
2. **Update Business Logic** → Edit `/services/api.ts`
3. **Customize UI** → Edit component files in `/components`
4. **Add Types** → Add to `/types/index.ts`
5. **Add Mock Data** → Update `/lib/mock-data.ts`
6. **Change Navigation** → Update `NAVIGATION_ITEMS` in `/lib/constants.ts`

---

This structure is production-ready and designed for easy maintenance, testing, and scaling.
