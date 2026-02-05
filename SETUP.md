# Quick Start Guide

## Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
- **Main App**: http://localhost:3000/login
- **API**: http://localhost:3000/api/*

## Demo Login

The application uses **mock authentication**. Any credentials work:
- **Email**: jane.kariuki@ngk.co.ke (or any email)
- **Password**: any password

After login, you'll be redirected to the dashboard.

## Project Architecture

### Folder Structure
```
/app                  - Next.js App Router pages and layouts
  /(auth)             - Public authentication pages
  /(app)              - Protected app pages
  /api                - Route handlers and API endpoints

/components           - React components
  /ui                 - shadcn/ui components (pre-installed)

/types                - TypeScript interfaces and types

/services             - API service functions

/lib                  - Utilities, constants, and mock data
  /mock-data.ts       - Sample data (5 employees, documents, etc.)
  /constants.ts       - App configuration

/hooks                - Custom React hooks
```

### Key Files to Know
- `types/index.ts` - All TypeScript types and interfaces
- `lib/mock-data.ts` - Sample data used throughout the app
- `lib/constants.ts` - Configuration (colors, roles, navigation)
- `services/api.ts` - API functions and business logic
- `app/api/**` - Route handlers (API endpoints)

## Features Ready to Use

✅ **Dashboard** - KPI cards, metrics tables
✅ **People Registry** - Full CRUD with search and filters
✅ **Person Profiles** - Multi-tab detailed view
✅ **Documents** - Document list and management
✅ **Reports** - Report generator interface
✅ **Settings** - Organization structure management
✅ **Registration Wizard** - Multi-step employee onboarding
✅ **Responsive UI** - Mobile-friendly design
✅ **Data Tables** - Sortable, paginated tables
✅ **Authorization UI** - Role-based navigation structure

## Mock Data Overview

The app comes with sample data:
- **5 Employees**: Different statuses and categories
- **2 Documents**: Various statuses (pending, approved)
- **4 Departments**: Engineering, Finance, Operations, HR
- **Dashboard Metrics**: Total, active, contracts ending

All mock data is in `lib/mock-data.ts` - easily replaceable.

## Common Tasks

### Adding a New Page
1. Create folder: `app/(app)/new-page/`
2. Add `page.tsx`:
```tsx
export default function NewPage() {
  return <div>Page content</div>
}
```

### Modifying Mock Data
Edit `lib/mock-data.ts`:
```typescript
export const mockPeople: Person[] = [
  // Add or modify employee records
]
```

### Customizing Colors & Labels
Edit `lib/constants.ts`:
```typescript
export const STATUS_CONFIG = {
  active: { label: 'Active', color: 'text-green-700', bgColor: 'bg-green-50' },
  // Customize as needed
}
```

### Using API Routes
All API functions are in `services/api.ts`. Route handlers call them:

```typescript
// services/api.ts
export async function listPeople() { /* ... */ }

// app/api/people/route.ts
export async function GET() {
  const result = await listPeople()
  return NextResponse.json(result)
}
```

## Database Integration (Next Steps)

Currently using mock data. To connect a real database:

### Option 1: Supabase (Recommended)
```bash
npm install @supabase/supabase-js
```
Then update `services/api.ts` to use Supabase client instead of mock data.

### Option 2: Direct PostgreSQL
Replace mock calls with database queries:
```typescript
import { pool } from '@/lib/db'

export async function listPeople() {
  const result = await pool.query('SELECT * FROM people')
  return result.rows
}
```

### Option 3: Other Databases
- Neon (PostgreSQL serverless)
- PlanetScale (MySQL)
- AWS RDS
- Any provider with Node.js driver

**Key Step**: Replace mock data imports in `services/api.ts` with real database calls.

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Deploy to Other Platforms
The app is a standard Next.js 14 app and works on any Node.js hosting.

## Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm run dev
```

### TypeScript Errors
Ensure all types are imported from `types/index.ts`

### Mock Data Not Showing
Check `lib/mock-data.ts` is properly exported and imported

### API Routes Not Working
Verify files are in `app/api/` directory with `route.ts` extension

## Building for Production

```bash
npm run build
npm run start
```

## Project Statistics

- **Pages**: 8 (Login, Dashboard, People, Documents, Reports, Settings, New Person, Person Detail)
- **Components**: 13+ reusable components
- **API Routes**: 4 main endpoints
- **TypeScript Types**: 15+ interfaces
- **Mock Data Records**: 20+ sample items
- **Lines of Code**: 3000+

## Next: Real Database

When ready to add a database:
1. Choose provider (Supabase recommended)
2. Create database schema from `types/index.ts`
3. Update `services/api.ts` to use real queries
4. Update environment variables
5. Remove localStorage auth, implement real auth
6. Test all features with real data

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` - When using Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase API key
- `DATABASE_URL` - Direct database connection
- `AUTH_SECRET` - For session encryption

## Support

Refer to inline code comments and TypeScript definitions for detailed documentation. Each component includes JSDoc comments explaining props and usage.
