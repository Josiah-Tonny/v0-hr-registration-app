import {
  Person,
  Department,
  Faculty,
  Document,
  AuditLog,
  TimelineEvent,
  StatusOption,
  User,
} from '@/types';

// Mock current user
export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Jane Kariuki',
  email: 'jane.kariuki@ngk.co.ke',
  role: 'HR_ADMIN',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
};

// Mock departments
export const mockDepartments: Department[] = [
  {
    id: 'dept-1',
    name: 'Human Resources',
    code: 'HR',
    description: 'Human Resources Department',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'dept-2',
    name: 'Finance',
    code: 'FIN',
    description: 'Finance Department',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'dept-3',
    name: 'Operations',
    code: 'OPS',
    description: 'Operations Department',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'dept-4',
    name: 'IT',
    code: 'IT',
    description: 'Information Technology',
    createdAt: new Date('2024-01-15').toISOString(),
  },
];

// Mock faculties
export const mockFaculties: Faculty[] = [
  {
    id: 'fac-1',
    name: 'Engineering',
    code: 'ENG',
    departmentId: 'dept-4',
    description: 'Engineering Faculty',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'fac-2',
    name: 'Finance & Accounting',
    code: 'FA',
    departmentId: 'dept-2',
    description: 'Finance & Accounting Faculty',
    createdAt: new Date('2024-01-15').toISOString(),
  },
];

// Mock statuses
export const mockStatuses: StatusOption[] = [
  { id: '1', name: 'active', color: 'green', description: 'Active employee' },
  { id: '2', name: 'inactive', color: 'gray', description: 'Inactive employee' },
  { id: '3', name: 'suspended', color: 'red', description: 'Suspended employee' },
  { id: '4', name: 'contract_ending', color: 'orange', description: 'Contract ending soon' },
  { id: '5', name: 'on_leave', color: 'blue', description: 'On leave' },
];

// Mock people
export const mockPeople: Person[] = [
  {
    id: 'person-1',
    firstName: 'Mwangi',
    lastName: 'Omondi',
    email: 'mwangi.omondi@ngk.co.ke',
    phoneNumber: '+254712345678',
    personalIdNumber: '12345678',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    nationality: 'Kenyan',
    status: 'active',
    department: 'IT',
    position: 'Senior Software Engineer',
    manager: 'Jane Kariuki',
    categoryDetails: {
      category: 'staff',
      staffNumber: 'STF-001',
    },
    engagementDates: {
      startDate: '2020-01-15',
    },
    emergencyContact: 'John Omondi',
    emergencyContactPhone: '+254723456789',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'HR-ADMIN',
  },
  {
    id: 'person-2',
    firstName: 'Susan',
    lastName: 'Kipchoge',
    email: 'susan.kipchoge@ngk.co.ke',
    phoneNumber: '+254712345679',
    personalIdNumber: '87654321',
    dateOfBirth: '1992-03-20',
    gender: 'female',
    nationality: 'Kenyan',
    status: 'active',
    department: 'Finance',
    faculty: 'Finance & Accounting',
    position: 'Financial Analyst',
    manager: 'Jane Kariuki',
    categoryDetails: {
      category: 'staff',
      staffNumber: 'STF-002',
    },
    engagementDates: {
      startDate: '2021-06-01',
    },
    emergencyContact: 'Mary Kipchoge',
    emergencyContactPhone: '+254723456790',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'HR-ADMIN',
  },
  {
    id: 'person-3',
    firstName: 'David',
    lastName: 'Kimani',
    email: 'david.kimani@ngk.co.ke',
    phoneNumber: '+254712345680',
    personalIdNumber: '11223344',
    dateOfBirth: '1988-11-08',
    gender: 'male',
    nationality: 'Kenyan',
    status: 'contract_ending',
    department: 'Operations',
    position: 'Operations Manager',
    manager: 'Jane Kariuki',
    categoryDetails: {
      category: 'contractor',
      contractorType: 'Management',
    },
    engagementDates: {
      startDate: '2023-01-01',
      expectedEndDate: '2025-12-31',
    },
    emergencyContact: 'Paul Kimani',
    emergencyContactPhone: '+254723456791',
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'HR-ADMIN',
  },
  {
    id: 'person-4',
    firstName: 'Alice',
    lastName: 'Wanjiru',
    email: 'alice.wanjiru@ngk.co.ke',
    phoneNumber: '+254712345681',
    personalIdNumber: '55667788',
    dateOfBirth: '1995-07-22',
    gender: 'female',
    nationality: 'Kenyan',
    status: 'active',
    department: 'HR',
    position: 'HR Coordinator',
    manager: 'Jane Kariuki',
    categoryDetails: {
      category: 'staff',
      staffNumber: 'STF-003',
    },
    engagementDates: {
      startDate: '2022-09-15',
    },
    emergencyContact: 'Robert Wanjiru',
    emergencyContactPhone: '+254723456792',
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'HR-ADMIN',
  },
  {
    id: 'person-5',
    firstName: 'Peter',
    lastName: 'Kamau',
    email: 'peter.kamau@ngk.co.ke',
    phoneNumber: '+254712345682',
    personalIdNumber: '99887766',
    dateOfBirth: '1993-02-10',
    gender: 'male',
    nationality: 'Kenyan',
    status: 'on_leave',
    department: 'IT',
    position: 'IT Support Specialist',
    manager: 'Mwangi Omondi',
    categoryDetails: {
      category: 'intern',
      internshipLevel: 'Senior',
    },
    engagementDates: {
      startDate: '2024-01-01',
      expectedEndDate: '2024-12-31',
    },
    emergencyContact: 'Grace Kamau',
    emergencyContactPhone: '+254723456793',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'HR-ADMIN',
  },
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    personId: 'person-1',
    fileName: 'Mwangi_ID.pdf',
    fileType: 'id_verification',
    fileSize: 245000,
    mimeType: 'application/pdf',
    status: 'approved',
    uploadedAt: new Date('2024-01-15').toISOString(),
    uploadedBy: 'Jane Kariuki',
    expiresAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'doc-2',
    personId: 'person-1',
    fileName: 'Employment_Contract.pdf',
    fileType: 'contract',
    fileSize: 384000,
    mimeType: 'application/pdf',
    status: 'approved',
    uploadedAt: new Date('2020-01-15').toISOString(),
    uploadedBy: 'HR-ADMIN',
  },
  {
    id: 'doc-3',
    personId: 'person-2',
    fileName: 'Susan_ID.pdf',
    fileType: 'id_verification',
    fileSize: 267000,
    mimeType: 'application/pdf',
    status: 'approved',
    uploadedAt: new Date('2024-01-20').toISOString(),
    uploadedBy: 'Jane Kariuki',
  },
  {
    id: 'doc-4',
    personId: 'person-3',
    fileName: 'Certificate_CPA.pdf',
    fileType: 'certificate',
    fileSize: 512000,
    mimeType: 'application/pdf',
    status: 'pending',
    uploadedAt: new Date('2024-02-01').toISOString(),
    uploadedBy: 'David Kimani',
  },
];

// Mock audit logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    personId: 'person-1',
    action: 'Profile Updated',
    changes: { position: 'Senior Software Engineer' },
    timestamp: new Date('2024-02-01').toISOString(),
    performedBy: 'Jane Kariuki',
  },
  {
    id: 'audit-2',
    personId: 'person-2',
    action: 'Status Changed',
    changes: { status: 'active' },
    timestamp: new Date('2024-01-30').toISOString(),
    performedBy: 'Jane Kariuki',
  },
  {
    id: 'audit-3',
    personId: 'person-1',
    action: 'Document Added',
    changes: { documentId: 'doc-1' },
    timestamp: new Date('2024-01-25').toISOString(),
    performedBy: 'HR-ADMIN',
  },
];

// Mock timeline events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    personId: 'person-1',
    eventType: 'status_change',
    title: 'Status Changed to Active',
    description: 'Employee status updated to active',
    timestamp: new Date('2024-02-01').toISOString(),
    performedBy: 'Jane Kariuki',
  },
  {
    id: 'event-2',
    personId: 'person-1',
    eventType: 'document_upload',
    title: 'Employment Contract Uploaded',
    description: 'Employment contract document added to profile',
    timestamp: new Date('2024-01-15').toISOString(),
    performedBy: 'HR-ADMIN',
  },
  {
    id: 'event-3',
    personId: 'person-1',
    eventType: 'profile_update',
    title: 'Profile Information Updated',
    description: 'Employee contact information was updated',
    timestamp: new Date('2024-01-10').toISOString(),
    performedBy: 'Mwangi Omondi',
  },
];

// Dashboard metrics
export const mockDashboardMetrics = {
  totalEmployees: 45,
  activeEmployees: 38,
  contractsEnding: 3,
  recentlyAdded: 2,
};
