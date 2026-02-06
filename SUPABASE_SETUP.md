# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the NGK HR System.

## Prerequisites

- Supabase account and project created
- Environment variables configured (already done in Vercel)
- Supabase CLI installed (optional, for local testing)

## Setup Steps

### 1. Run Database Migrations

The SQL schema file is located at `scripts/init-database.sql`. You need to execute this SQL in your Supabase project.

#### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section
3. Click **New Query**
4. Copy the entire contents of `scripts/init-database.sql`
5. Paste it into the query editor
6. Click **Run**

#### Option B: Using Supabase CLI

```bash
# Login to Supabase
supabase login

# Navigate to your project
cd /path/to/v0-hr-registration-app

# Run the migration
supabase db push scripts/init-database.sql
```

### 2. Verify Tables Were Created

After running the migration, verify that all tables were created:

In the Supabase Dashboard:
1. Go to **Table Editor**
2. You should see the following tables:
   - `users` - User accounts and authentication
   - `employees` - Employee/Person records
   - `departments` - Department listings
   - `faculties` - Faculty listings
   - `employee_statuses` - Status types (Active, Inactive, etc.)
   - `employee_roles` - Role types (Manager, Developer, etc.)
   - `documents` - Uploaded documents
   - `audit_logs` - System audit trail

### 3. Test the Connection

The application uses the database service layer automatically. To test the connection:

```bash
# Start the development server
npm run dev

# Try accessing the application
# The app will connect to Supabase automatically using the environment variables
```

## Database Schema Overview

### Users Table
Stores user accounts for system access.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true
);
```

### Employees Table
Main table for employee/person records.

```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  avatar_url TEXT,
  department_id UUID REFERENCES departments,
  faculty_id UUID REFERENCES faculties,
  role_id UUID REFERENCES employee_roles,
  status_id UUID REFERENCES employee_statuses,
  hire_date DATE NOT NULL,
  contract_end_date DATE,
  manager_id UUID REFERENCES employees
);
```

### Documents Table
Stores uploaded documents for employees.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES users
);
```

### Audit Logs Table
Tracks all system changes for compliance.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  changes JSONB
);
```

## API Integration

The application automatically uses Supabase through the database service layer:

- **Location**: `services/database.ts`
- **API Routes**: `/app/api/people/*`, `/app/api/documents/*`, `/app/api/audit/*`

All API routes automatically use Supabase for data storage and retrieval.

## Security

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Users**: Users can view their own profile; admins can view all
- **Employees**: Authenticated users can view; admins can create/update
- **Documents**: Authenticated users can view; uploaders can manage their documents
- **Audit Logs**: Only admins can view

### Authentication

The system uses Supabase Auth through environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key for client access
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side role for admin operations

## Troubleshooting

### "Database connection failed"
- Verify environment variables are set in Vercel project settings
- Check that Supabase project is active
- Ensure RLS policies are properly configured

### "Table does not exist"
- Re-run the migration script
- Check SQL Editor for any errors during migration
- Verify all tables appear in the Table Editor

### "Permission denied"
- Check RLS policies are correctly set
- Verify user has appropriate role (admin, user)
- Review audit logs for access attempts

## Next Steps

1. The database is now ready for production use
2. All API endpoints are connected and working
3. User data will be stored in Supabase
4. Audit logs track all changes automatically

For more information, visit: https://supabase.com/docs
