# Components Inventory & Usage Guide

Complete reference of all React components in the NGK HR system with usage examples and specifications.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Data Display Components](#data-display-components)
3. [Form Components](#form-components)
4. [Status & Badge Components](#status--badge-components)
5. [Utility Components](#utility-components)
6. [shadcn/ui Base Components](#shadcnui-base-components)

---

## Layout Components

### Sidebar

**File**: `components/sidebar.tsx`  
**Purpose**: Main navigation sidebar  
**Props**: None (uses route context)

**Features**:
- Logo with branding
- Navigation menu with active state
- User info section
- Logout button
- Sticky positioning

**Example**:
```tsx
import { Sidebar } from '@/components/sidebar';

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content */}
    </div>
  );
}
```

**Styling**:
- Dark background with blur effect
- Smooth transitions on hover
- Active state highlighting
- Professional spacing

---

### Topbar

**File**: `components/topbar.tsx`  
**Purpose**: Header with search and user menu  
**Props**: None

**Features**:
- Search bar with icon
- Notification bell
- User profile dropdown
- Logout option

**Example**:
```tsx
import { Topbar } from '@/components/topbar';

export default function Layout() {
  return (
    <>
      <Topbar />
      {/* Page content */}
    </>
  );
}
```

**Styling**:
- Glassmorphism effect with backdrop blur
- Subtle borders
- Smooth focus transitions
- Dropdown menu integration

---

## Data Display Components

### DataTable

**File**: `components/data-table.tsx`  
**Purpose**: Sortable, paginated data table

**Props**:
```typescript
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
}
```

**Example**:
```tsx
import { DataTable, Column } from '@/components/data-table';
import { StatusPill } from '@/components/status-pill';

const columns: Column<Employee>[] = [
  {
    key: 'firstName',
    label: 'First Name',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <StatusPill status={value} size="sm" />,
  },
];

export function EmployeeTable({ employees }: { employees: Employee[] }) {
  return (
    <DataTable
      columns={columns}
      data={employees}
      onRowClick={(emp) => navigate(`/people/${emp.id}`)}
    />
  );
}
```

**Features**:
- Column sorting by clicking headers
- Custom cell rendering
- Row click handlers
- Loading states
- Pagination ready

---

### PersonCardGrid

**File**: `components/person-card-grid.tsx`  
**Purpose**: Card-based employee display

**Props**:
```typescript
interface PersonCardGridProps {
  employees: EmployeeCard[];
  onViewDetails: (id: string) => void;
}
```

**Example**:
```tsx
import { PersonCardGrid } from '@/components/person-card-grid';

export function PeoplePage({ employees }: { employees: EmployeeCard[] }) {
  return (
    <PersonCardGrid
      employees={employees}
      onViewDetails={(id) => navigate(`/people/${id}`)}
    />
  );
}
```

**Features**:
- Responsive grid (1-4 columns)
- Employee card with avatar
- Quick info display
- Hover effects
- Action buttons

**Card Layout**:
- Avatar (48x48px)
- Name and title
- Department and status
- Contact info
- Join date
- View/Edit buttons

---

## Form Components

### FormWizard

**File**: `components/form-wizard.tsx`  
**Purpose**: Multi-step form with progress tracking

**Props**:
```typescript
interface FormWizardProps {
  steps: {
    title: string;
    description: string;
    component: ReactNode;
  }[];
  onComplete: (data: any) => void;
  onCancel: () => void;
}
```

**Example**:
```tsx
import { FormWizard } from '@/components/form-wizard';

const steps = [
  {
    title: 'Basic Information',
    description: 'Enter employee name and email',
    component: <BasicInfoStep />,
  },
  {
    title: 'Employment Details',
    description: 'Job title and department',
    component: <EmploymentStep />,
  },
  {
    title: 'Contract Information',
    description: 'Employment dates and status',
    component: <ContractStep />,
  },
];

export function NewEmployeePage() {
  return (
    <FormWizard
      steps={steps}
      onComplete={(data) => submitEmployee(data)}
      onCancel={() => navigate('/people')}
    />
  );
}
```

**Features**:
- Step progress indicator
- Previous/Next navigation
- Form validation
- Submit handler
- Cancel option

---

### DocumentUploader

**File**: `components/document-uploader.tsx`  
**Purpose**: Drag-and-drop file upload

**Props**:
```typescript
interface DocumentUploaderProps {
  onUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}
```

**Example**:
```tsx
import { DocumentUploader } from '@/components/document-uploader';

export function DocumentUploadSection() {
  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      await uploadDocument(file);
    }
  };

  return (
    <DocumentUploader
      onUpload={handleUpload}
      acceptedTypes={['.pdf', '.doc', '.docx', '.xlsx']}
      maxSize={10 * 1024 * 1024}
    />
  );
}
```

**Features**:
- Drag and drop zone
- File type validation
- Size validation
- Upload progress
- Error messages

---

## Status & Badge Components

### StatusPill

**File**: `components/status-pill.tsx`  
**Purpose**: Employment status indicator

**Props**:
```typescript
interface StatusPillProps {
  status: 'active' | 'inactive' | 'suspended' | 'contract_ending' | 'on_leave';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}
```

**Example**:
```tsx
import { StatusPill } from '@/components/status-pill';

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div>
      <h3>{employee.name}</h3>
      <StatusPill status={employee.status} size="sm" showIcon />
    </div>
  );
}
```

**Status Colors**:
- **Active** - Green (#10b981)
- **Inactive** - Gray (#6b7280)
- **Suspended** - Red (#ef4444)
- **Contract Ending** - Amber (#f59e0b)
- **On Leave** - Blue (#3b82f6)

---

### CategoryBadge

**File**: `components/category-badge.tsx`  
**Purpose**: Employee category indicator

**Props**:
```typescript
interface CategoryBadgeProps {
  category: 'staff' | 'contractor' | 'intern' | 'consultant';
  variant?: 'filled' | 'outline';
}
```

**Example**:
```tsx
import { CategoryBadge } from '@/components/category-badge';

export function EmployeeInfo({ employee }: { employee: Employee }) {
  return (
    <div>
      <CategoryBadge category={employee.category} variant="filled" />
    </div>
  );
}
```

---

## Utility Components

### FilterBar

**File**: `components/filter-bar.tsx`  
**Purpose**: Search and multi-select filtering

**Props**:
```typescript
interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  name: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  filters: Filter[];
  searchPlaceholder?: string;
}
```

**Example**:
```tsx
import { FilterBar } from '@/components/filter-bar';

const filters = [
  {
    name: 'department',
    label: 'Department',
    options: [
      { value: 'hr', label: 'Human Resources' },
      { value: 'it', label: 'Information Technology' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
];

export function PeoplePage() {
  const handleSearch = (query: string) => {
    // Filter results
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    // Apply filters
  };

  return (
    <FilterBar
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      filters={filters}
      searchPlaceholder="Search employees..."
    />
  );
}
```

**Features**:
- Debounced search input
- Multi-select dropdowns
- Clear filters button
- Real-time updates

---

### AuditTimeline

**File**: `components/audit-timeline.tsx`  
**Purpose**: Activity timeline visualization

**Props**:
```typescript
interface TimelineEvent {
  id: string;
  timestamp: Date;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  user: string;
  description: string;
  details?: Record<string, any>;
}

interface AuditTimelineProps {
  events: TimelineEvent[];
  maxItems?: number;
}
```

**Example**:
```tsx
import { AuditTimeline } from '@/components/audit-timeline';

export function EmployeeProfile({ employeeId }: { employeeId: string }) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    fetchAuditLog(employeeId).then(setEvents);
  }, [employeeId]);

  return <AuditTimeline events={events} maxItems={10} />;
}
```

**Features**:
- Vertical timeline layout
- Color-coded actions
- Timestamps
- User attribution
- Expandable details

---

### ModernCard

**File**: `components/modern-card.tsx`  
**Purpose**: Reusable card wrapper with styling

**Props**:
```typescript
interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  hoverable?: boolean;
  children: React.ReactNode;
}
```

**Example**:
```tsx
import { ModernCard } from '@/components/modern-card';
import { Users } from 'lucide-react';

export function DashboardSection() {
  return (
    <ModernCard
      title="Team Overview"
      icon={<Users />}
      hoverable
    >
      {/* Card content */}
    </ModernCard>
  );
}
```

**Features**:
- Customizable title
- Icon support
- Hover effects
- Professional styling
- Flexible content

---

## shadcn/ui Base Components

### Available Components

```
✅ Buttons           - Button, ButtonGroup
✅ Forms            - Input, Select, Checkbox, Radio, Toggle
✅ Data             - Table, Pagination, DataTable
✅ Feedback         - Alert, Toast, Dialog, Tooltip
✅ Navigation       - Breadcrumb, Tabs, NavigationMenu
✅ Layout           - Card, Separator, Collapse, Accordion
✅ Overlays         - Popover, Dropdown Menu, Context Menu, Drawer
✅ Media            - Avatar, Badge, Progress, Badge
✅ Typography       - Various text components
```

### Common Component Usage

**Button**:
```tsx
import { Button } from '@/components/ui/button';

<Button className="bg-accent hover:bg-accent/90 text-white">
  Primary Action
</Button>

<Button variant="outline" className="border-border/50">
  Secondary Action
</Button>
```

**Input**:
```tsx
import { Input } from '@/components/ui/input';

<Input
  type="text"
  placeholder="Enter text..."
  className="bg-secondary/40 border-border/40 focus:border-accent"
/>
```

**Card**:
```tsx
import { Card } from '@/components/ui/card';

<Card className="p-6 bg-card border-border/40 rounded-xl">
  {/* Content */}
</Card>
```

**Dialog**:
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Component Composition Pattern

### Example: Employee Card Component

```tsx
// components/employee-card.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { StatusPill } from '@/components/status-pill';
import { CategoryBadge } from '@/components/category-badge';
import { Mail, Phone, Calendar } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onViewProfile: (id: string) => void;
  onEdit: (id: string) => void;
}

export function EmployeeCard({
  employee,
  onViewProfile,
  onEdit,
}: EmployeeCardProps) {
  return (
    <Card className="p-4 hover:border-border/60 transition-all duration-250">
      {/* Header with Avatar */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>{employee.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
          </div>
        </div>
        <StatusPill status={employee.status} size="sm" />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Joined {formatDate(employee.joinDate)}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <CategoryBadge category={employee.category} />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          className="flex-1 h-8 text-xs"
          onClick={() => onViewProfile(employee.id)}
        >
          View Profile
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-8 text-xs"
          onClick={() => onEdit(employee.id)}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
```

---

## Styling Conventions

### Using Tailwind Classes

**Preferred**:
```tsx
className="p-4 gap-2 rounded-lg bg-card border border-border/40"
```

**Avoid**:
```tsx
className="p-[16px] gap-[8px] rounded-[12px]"
```

### Color Usage

```tsx
// Text
className="text-foreground"          // Primary text
className="text-muted-foreground"    // Secondary text

// Backgrounds
className="bg-card"                  // Card background
className="bg-secondary/40"          // Subtle background

// Borders
className="border border-border/40"  // Subtle border
className="border border-border/60"  // Stronger border

// Interactive
className="hover:bg-secondary/50"    // Hover state
className="focus:border-accent"      // Focus state
```

---

## Responsive Design

### Breakpoints

```tsx
// Mobile first
className="grid grid-cols-1"         // 1 column on mobile

// Tablet
className="md:grid-cols-2"           // 2 columns on tablet

// Desktop
className="lg:grid-cols-3"           // 3 columns on desktop

// Large screens
className="xl:grid-cols-4"           // 4 columns on large screens
```

---

## Accessibility

### Required for All Interactive Components

```tsx
// Button with label
<Button aria-label="Delete employee">
  <Trash2 className="w-4 h-4" />
</Button>

// Input with label
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// Focus management
className="focus:outline-none focus:ring-2 focus:ring-accent/50"
```

---

## Performance Tips

1. **Use React.memo** for frequently re-rendered components
2. **Lazy load** heavy components with dynamic()
3. **Avoid inline styles** - use Tailwind classes
4. **Memoize callbacks** - use useCallback for handlers
5. **Split large components** - keep under 300 lines

---

## Testing Components

```tsx
import { render, screen } from '@testing-library/react';
import { EmployeeCard } from '@/components/employee-card';

describe('EmployeeCard', () => {
  it('renders employee information', () => {
    const employee = { /* mock data */ };
    render(<EmployeeCard employee={employee} />);
    
    expect(screen.getByText(employee.firstName)).toBeInTheDocument();
  });
});
```

---

## Component Documentation

Each component should include:
- ✅ JSDoc comments with @param and @returns
- ✅ Props interface with descriptions
- ✅ Usage example
- ✅ Related components
- ✅ Accessibility notes

---

**Last Updated**: February 2025  
**Total Components**: 50+  
**Status**: Production Ready
