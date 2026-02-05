// Role types
export type UserRole = 'HR_ADMIN' | 'HR_OFFICER' | 'SUPERVISOR' | 'SECURITY_VIEW' | 'READ_ONLY_AUDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Person/Employee types
export type PersonStatus = 'active' | 'inactive' | 'suspended' | 'contract_ending' | 'on_leave';
export type PersonCategory = 'staff' | 'contractor' | 'intern' | 'consultant';

export interface CategoryDetails {
  category: PersonCategory;
  staffNumber?: string;
  contractorType?: string;
  internshipLevel?: string;
  consultantDomain?: string;
}

export interface EngagementDates {
  startDate: string;
  endDate?: string;
  expectedEndDate?: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  personalIdNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  
  status: PersonStatus;
  department: string;
  faculty?: string;
  position: string;
  manager?: string;
  
  categoryDetails: CategoryDetails;
  engagementDates: EngagementDates;
  
  emergencyContact?: string;
  emergencyContactPhone?: string;
  
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Organization types
export interface Department {
  id: string;
  name: string;
  code: string;
  manager?: string;
  description?: string;
  createdAt: string;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  description?: string;
  createdAt: string;
}

export interface StatusOption {
  id: string;
  name: PersonStatus;
  color: string;
  description?: string;
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: string[];
}

// Document types
export type DocumentType = 'id_verification' | 'contract' | 'certificate' | 'other';
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'archived';

export interface Document {
  id: string;
  personId: string;
  fileName: string;
  fileType: DocumentType;
  fileSize: number;
  mimeType: string;
  status: DocumentStatus;
  uploadedAt: string;
  uploadedBy: string;
  expiresAt?: string;
  notes?: string;
  url?: string;
}

// Audit & Timeline types
export interface AuditLog {
  id: string;
  personId: string;
  action: string;
  changes?: Record<string, any>;
  timestamp: string;
  performedBy: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface TimelineEvent {
  id: string;
  personId: string;
  eventType: 'status_change' | 'document_upload' | 'profile_update' | 'note_added' | 'status_check';
  title: string;
  description?: string;
  timestamp: string;
  performedBy: string;
}

// Form/Wizard types
export interface PersonFormData {
  identity: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    personalIdNumber: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    nationality: string;
  };
  categoryDetails: CategoryDetails;
  engagementDates: EngagementDates;
  organizationDetails: {
    department: string;
    faculty?: string;
    position: string;
    manager?: string;
  };
  documents: File[];
  emergency: {
    contactName?: string;
    contactPhone?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
