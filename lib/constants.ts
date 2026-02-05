import { PersonStatus, PersonCategory, DocumentType, UserRole } from '@/types';

// Status configuration
export const STATUS_CONFIG: Record<PersonStatus, { label: string; color: string; bgColor: string }> = {
  active: { label: 'Active', color: 'text-green-700', bgColor: 'bg-green-50' },
  inactive: { label: 'Inactive', color: 'text-gray-700', bgColor: 'bg-gray-50' },
  suspended: { label: 'Suspended', color: 'text-red-700', bgColor: 'bg-red-50' },
  contract_ending: { label: 'Contract Ending', color: 'text-orange-700', bgColor: 'bg-orange-50' },
  on_leave: { label: 'On Leave', color: 'text-blue-700', bgColor: 'bg-blue-50' },
};

// Category configuration
export const CATEGORY_CONFIG: Record<PersonCategory, { label: string; color: string }> = {
  staff: { label: 'Staff', color: 'text-blue-700' },
  contractor: { label: 'Contractor', color: 'text-purple-700' },
  intern: { label: 'Intern', color: 'text-green-700' },
  consultant: { label: 'Consultant', color: 'text-indigo-700' },
};

// Document types
export const DOCUMENT_TYPES: Record<DocumentType, string> = {
  id_verification: 'ID Verification',
  contract: 'Employment Contract',
  certificate: 'Certificate/Qualification',
  other: 'Other Document',
};

// User roles
export const USER_ROLES: Record<UserRole, string> = {
  HR_ADMIN: 'HR Administrator',
  HR_OFFICER: 'HR Officer',
  SUPERVISOR: 'Supervisor',
  SECURITY_VIEW: 'Security Viewer',
  READ_ONLY_AUDITOR: 'Read-Only Auditor',
};

// Sidebar navigation items
export const NAVIGATION_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'Home' },
  { href: '/people', label: 'People', icon: 'Users' },
  { href: '/documents', label: 'Documents', icon: 'FileText' },
  { href: '/reports', label: 'Reports', icon: 'BarChart3' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
];

// Gender options
export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

// Form validation
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  PERSONAL_ID_MIN_LENGTH: 5,
  PASSWORD_MIN_LENGTH: 8,
};

// Wizard steps
export const PERSON_WIZARD_STEPS = [
  { id: 'identity', label: 'Identity', order: 1 },
  { id: 'category', label: 'Category Details', order: 2 },
  { id: 'engagement', label: 'Engagement Dates', order: 3 },
  { id: 'documents', label: 'Documents', order: 4 },
  { id: 'review', label: 'Review', order: 5 },
];

// Table columns
export const PEOPLE_TABLE_COLUMNS = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'position', label: 'Position', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const DOCUMENTS_TABLE_COLUMNS = [
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'fileType', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'uploadedAt', label: 'Upload Date', sortable: true },
  { key: 'uploadedBy', label: 'Uploaded By', sortable: true },
];
