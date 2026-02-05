# Quick Reference Card

## Start Here

```bash
npm install        # Install dependencies
npm run dev        # Start server at http://localhost:3000
npm run build      # Production build
npm run start      # Run production build
npm run lint       # Check code quality
```

## Demo Access

```
URL: http://localhost:3000/login
Email: jane.kariuki@ngk.co.ke (or any email)
Password: anything
```

## File Map

| Need | File |
|------|------|
| Add Type | `types/index.ts` |
| Mock Data | `lib/mock-data.ts` |
| Colors/Config | `lib/constants.ts` |
| API Logic | `services/api.ts` |
| Component | `components/*.tsx` |
| Page | `app/(app)/name/page.tsx` |
| Endpoint | `app/api/name/route.ts` |

## Pages at a Glance

```
/login               Login form
/dashboard           KPI cards, tables
/people              Registry list, search, filter
/people/new          5-step wizard
/people/[id]         Profile with 5 tabs
/documents           Document center
/reports             Report generator
/settings            Admin settings
```

## Common Tasks

### Add New Page
```bash
mkdir -p app/(app)/mypage
# Create file: app/(app)/mypage/page.tsx
```

### Add New Component
```bash
# Create: components/my-component.tsx
# Use in pages with: import { MyComponent } from '@/components/my-component'
```

### Add to Mock Data
Edit `lib/mock-data.ts`:
```typescript
export const mockPeople = [
  // Add new person object here
]
```

### Update API Service
Edit `services/api.ts`:
```typescript
export async function newFunction() {
  return { success: true, data: [] }
}
```

### Create API Route
```bash
# Create: app/api/endpoint/route.ts
```

## Component Imports

```typescript
// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Custom Components
import { DataTable } from '@/components/data-table'
import { FilterBar } from '@/components/filter-bar'
import { StatusPill } from '@/components/status-pill'
import { CategoryBadge } from '@/components/category-badge'
import { DocumentUploader } from '@/components/document-uploader'
import { FormWizard } from '@/components/form-wizard'
import { AuditTimeline } from '@/components/audit-timeline'

// Utilities
import { cn } from '@/lib/utils'

// Constants
import { STATUS_CONFIG, CATEGORY_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants'

// Types
import { Person, Document, Department } from '@/types'

// Mock Data
import { mockPeople, mockDocuments } from '@/lib/mock-data'

// API Services
import { listPeople, createPerson, getPersonById } from '@/services/api'
```

## Tailwind Classes Quick List

```
Spacing: p-4, m-2, gap-3, px-2, py-4
Display: flex, grid, hidden, block
Size: w-full, h-screen, max-w-md
Color: text-gray-900, bg-blue-50, border-red-200
Rounding: rounded, rounded-lg, rounded-full
Shadow: shadow, shadow-md, shadow-lg
Border: border, border-l, border-t
Opacity: opacity-50, opacity-100
Hover: hover:bg-gray-100, hover:shadow-lg
Responsive: md:grid-cols-2, lg:text-xl, sm:hidden
```

## Type Examples

```typescript
// Person
const person: Person = {
  id: 'id-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  status: 'active',
  // ... see types/index.ts
}

// API Response
const response: ApiResponse<Person> = {
  success: true,
  data: person
}

// Paginated
const paginated: PaginatedResponse<Person> = {
  data: [person],
  total: 100,
  page: 1,
  pageSize: 10,
  totalPages: 10
}
```

## API Call Pattern

```typescript
// In page.tsx
'use client'
import { useEffect, useState } from 'react'
import { listPeople } from '@/services/api'

export default function Page() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    listPeople().then(result => {
      setData(result.data)
    })
  }, [])
  
  return <div>{/* render data */}</div>
}
```

## Component Pattern

```typescript
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  onClick?: () => void
}

export function MyComponent({ title, onClick }: Props) {
  return <Button onClick={onClick}>{title}</Button>
}
```

## Page Pattern

```typescript
'use client' // if using state/effects

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MyPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Title</h1>
      <Card className="p-6">
        {/* content */}
      </Card>
    </div>
  )
}
```

## Database Integration Checklist

- [ ] Choose database (Supabase recommended)
- [ ] Create tables from DATABASE_SCHEMA.md
- [ ] Get connection string
- [ ] Install driver: `npm install @supabase/supabase-js`
- [ ] Update `services/api.ts` with real queries
- [ ] Add environment variables
- [ ] Test API endpoints
- [ ] Remove mock auth from login page
- [ ] Implement real authentication
- [ ] Test role-based access

## Icons Available (Lucide)

```typescript
import {
  Home, Users, FileText, BarChart3, Settings,
  LogOut, Bell, Search, Download, Upload, Edit2,
  Trash2, ChevronUp, ChevronDown, Plus, X, LogIn,
  AlertCircle, UserCheck, Archive, Eye, Zap
} from 'lucide-react'

// Usage
<Home className="w-5 h-5" />
```

## Shadows & Effects

```
shadow          - Normal shadow
shadow-md       - Medium shadow
shadow-lg       - Large shadow
shadow-none     - No shadow
opacity-50      - 50% opacity
opacity-0       - Hidden but takes space
rounded         - 4px radius
rounded-lg      - 8px radius
rounded-full    - Circular
border          - 1px border
border-2        - 2px border
hover:          - On hover
focus:          - On focus
disabled:       - When disabled
```

## Testing URLs

```
http://localhost:3000/login        - Login
http://localhost:3000/dashboard    - Dashboard
http://localhost:3000/people       - People list
http://localhost:3000/people/1     - Person detail
http://localhost:3000/people/new   - Registration
http://localhost:3000/documents    - Documents
http://localhost:3000/reports      - Reports
http://localhost:3000/settings     - Settings

http://localhost:3000/api/people          - GET: list, POST: create
http://localhost:3000/api/people/[id]     - GET: detail, PATCH: update
http://localhost:3000/api/documents       - GET: documents
http://localhost:3000/api/audit           - GET: audit logs
```

## Status Values

```typescript
type PersonStatus = 'active' | 'inactive' | 'suspended' | 'contract_ending' | 'on_leave'
```

## Category Values

```typescript
type PersonCategory = 'staff' | 'contractor' | 'intern' | 'consultant'
```

## User Roles

```typescript
type UserRole = 'HR_ADMIN' | 'HR_OFFICER' | 'SUPERVISOR' | 'SECURITY_VIEW' | 'READ_ONLY_AUDITOR'
```

## Document Types

```typescript
type DocumentType = 'id_verification' | 'contract' | 'certificate' | 'other'
type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'archived'
```

## Useful URLs

```
Next.js Docs:     https://nextjs.org/docs
React Docs:       https://react.dev
Tailwind:         https://tailwindcss.com
shadcn/ui:        https://ui.shadcn.com
Lucide Icons:     https://lucide.dev
TypeScript:       https://typescriptlang.org
date-fns:         https://date-fns.org
Supabase:         https://supabase.com
Vercel:           https://vercel.com
```

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| Module not found | Check import path, use `@/components` |
| Type error | Verify import from `types/index.ts` |
| Port 3000 in use | `PORT=3001 npm run dev` |
| Page not rendering | Check `'use client'` if using hooks |
| Component not showing | Verify component export/import |
| Styling not working | Check Tailwind classes, check globals.css |

## Build & Deploy

```bash
# Local build
npm run build
npm run start

# Deploy to Vercel
vercel deploy

# Preview before deploy
vercel --prod
```

## Environment Variables Template

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
AUTH_SECRET=your_secure_key
```

---

**Last Updated**: 2/5/2026
**Version**: 1.0.0
**Status**: Production Ready
