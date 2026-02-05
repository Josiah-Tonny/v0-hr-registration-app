# NGK HR - Workforce Registry System

A modern Next.js 14+ TypeScript web application for managing HR user registration and workforce registry for Kenyan companies.

## Features

- **Login System** - Simple authentication UI (mock auth ready for integration)
- **Dashboard** - KPI metrics, contracts ending soon, recently added employees
- **People Registry** - Complete workforce list with search, filters, and sorting
- **Person Profiles** - Detailed employee profiles with documents, timeline, and audit logs
- **Document Management** - Central hub for managing employee documents
- **Reports** - Generate and export workforce reports
- **Settings** - Admin area for managing departments, faculties, roles, and statuses
- **Multi-step Registration Wizard** - Streamlined onboarding process for new employees
- **Role-Based Navigation** - Support for multiple user roles (HR_ADMIN, HR_OFFICER, SUPERVISOR, etc.)

## Project Structure

```
├── app/
│   ├── (auth)/              # Public authentication routes
│   │   └── login/
│   ├── (app)/               # Protected application routes
│   │   ├── dashboard/
│   │   ├── people/
│   │   ├── documents/
│   │   ├── reports/
│   │   └── settings/
│   ├── api/                 # Route handlers and API endpoints
│   │   ├── people/
│   │   ├── documents/
│   │   └── audit/
│   └── layout.tsx           # Root layout
│
├── components/              # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   ├── sidebar.tsx
│   ├── topbar.tsx
│   ├── data-table.tsx
│   ├── filter-bar.tsx
│   ├── status-pill.tsx
│   ├── category-badge.tsx
│   ├── person-card.tsx
│   ├── document-uploader.tsx
│   ├── form-wizard.tsx
│   └── audit-timeline.tsx
│
├── lib/
│   ├── constants.ts         # Application constants and config
│   ├── mock-data.ts         # Mock data for development
│   └── utils.ts
│
├── services/
│   └── api.ts               # Typed API service functions
│
├── types/
│   └── index.ts             # TypeScript type definitions
│
└── hooks/                   # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone and setup**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit `http://localhost:3000`
   - Login page: `http://localhost:3000/login`
   - Use any email/password combination (demo mode)

## Mock Data

The application includes pre-configured mock data for:
- 5 sample employees across different departments
- 4 documents with various statuses
- Mock audit logs and timeline events
- Department and faculty structure
- Dashboard metrics

Mock data is stored in `lib/mock-data.ts` and can be easily replaced with real data from a backend API.

## API Routes

### People Management
- `GET /api/people` - List all people (paginated)
- `POST /api/people` - Create new person
- `GET /api/people/[id]` - Get person details
- `PATCH /api/people/[id]` - Update person

### Documents
- `GET /api/documents` - List documents (with optional personId filter)

### Audit & Timeline
- `GET /api/audit?personId=[id]&type=timeline|logs` - Get timeline events or audit logs

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Database Ready**: Configured for Supabase/PostgreSQL integration

## Key Components

### DataTable
Sortable, clickable table component with configurable columns and loading states.

### FilterBar
Search and multi-select filtering component for data pages.

### FormWizard
Multi-step form wizard with progress tracking for employee registration.

### AuditTimeline
Visual timeline component displaying activity history with timestamps.

### DocumentUploader
Drag-and-drop file upload component with format validation.

## Next Steps: Database Integration

To connect a real database (currently using mock data):

### 1. Choose Your Database
- **Supabase** (PostgreSQL) - Recommended, includes Auth
- **Neon** (PostgreSQL)
- **AWS RDS**
- **PlanetScale** (MySQL)

### 2. Update API Services
Replace mock data calls in `services/api.ts` with real database queries:
```typescript
// Instead of: return mockPeople.slice(start, end)
// Use:
const { data, error } = await supabase
  .from('people')
  .select('*')
  .range(start, end);
```

### 3. Implement Authentication
Currently using mock localStorage auth. Integrate with:
- Supabase Auth
- Auth.js (NextAuth)
- Custom JWT implementation

### 4. Setup Database Schema
Create tables based on types in `types/index.ts`:
```sql
CREATE TABLE people (
  id UUID PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  status VARCHAR NOT NULL,
  ... (see database schema in docs)
);
```

### 5. Enable Row Level Security (RLS)
If using Supabase, add RLS policies:
```sql
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own records"
  ON people FOR SELECT
  USING (auth.uid() = user_id);
```

### 6. Update Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
DATABASE_URL=your_connection_string
```

## User Roles

The system supports the following roles (ready for role-based authorization):
- **HR_ADMIN** - Full system access, can manage all settings
- **HR_OFFICER** - Can manage people and documents
- **SUPERVISOR** - Can view team information
- **SECURITY_VIEW** - Limited read access for security purposes
- **READ_ONLY_AUDITOR** - Audit log viewing only

## Configuration

### Application Constants
Edit `lib/constants.ts` to customize:
- Status colors and labels
- Category configurations
- Document types
- User roles
- Navigation structure
- Pagination settings
- Form validation rules

### Mock Data
Customize mock data in `lib/mock-data.ts`:
- Employee records
- Departments and faculties
- Documents
- Audit logs
- Timeline events

## Styling & Theming

The app uses Tailwind CSS with shadcn/ui components. Customize theming in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles
- Component-level overrides in each component file

## Performance Considerations

- DataTable includes sorting and pagination UI ready for backend integration
- All API calls are typed and follow REST conventions
- Mock data can be replaced with SWR or React Query for caching
- Components are optimized with React.memo where appropriate

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## License

Proprietary - NGK

## Support & Next Steps

This is a fully functional skeleton ready for:
1. Database integration (Supabase recommended)
2. Real authentication implementation
3. Production deployment to Vercel
4. Custom business logic implementation
5. Role-based access control (RBAC) setup

For questions or implementation help, refer to the code comments and TypeScript types which document all expected data structures.
