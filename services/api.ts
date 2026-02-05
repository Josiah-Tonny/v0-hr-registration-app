import {
  Person,
  Document,
  AuditLog,
  TimelineEvent,
  Department,
  Faculty,
  ApiResponse,
  PaginatedResponse,
} from '@/types';
import {
  mockPeople,
  mockDocuments,
  mockAuditLogs,
  mockTimelineEvents,
  mockDepartments,
  mockFaculties,
} from '@/lib/mock-data';

// People endpoints
export async function listPeople(page = 1, pageSize = 10): Promise<PaginatedResponse<Person>> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: mockPeople.slice(start, end),
    total: mockPeople.length,
    page,
    pageSize,
    totalPages: Math.ceil(mockPeople.length / pageSize),
  };
}

export async function getPersonById(id: string): Promise<ApiResponse<Person>> {
  const person = mockPeople.find((p) => p.id === id);
  return {
    success: !!person,
    data: person,
    error: person ? undefined : 'Person not found',
  };
}

export async function createPerson(data: Partial<Person>): Promise<ApiResponse<Person>> {
  const newPerson: Person = {
    id: `person-${Date.now()}`,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phoneNumber: data.phoneNumber || '',
    personalIdNumber: data.personalIdNumber || '',
    dateOfBirth: data.dateOfBirth || '',
    gender: data.gender || 'other',
    nationality: data.nationality || '',
    status: data.status || 'active',
    department: data.department || '',
    position: data.position || '',
    categoryDetails: data.categoryDetails || { category: 'staff' },
    engagementDates: data.engagementDates || { startDate: new Date().toISOString().split('T')[0] },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'current-user',
  };

  return {
    success: true,
    data: newPerson,
    message: 'Person created successfully',
  };
}

export async function updatePerson(id: string, data: Partial<Person>): Promise<ApiResponse<Person>> {
  const person = mockPeople.find((p) => p.id === id);
  if (!person) {
    return {
      success: false,
      error: 'Person not found',
    };
  }

  const updated = { ...person, ...data, updatedAt: new Date().toISOString() };
  return {
    success: true,
    data: updated,
    message: 'Person updated successfully',
  };
}

export async function changePersonStatus(id: string, status: string): Promise<ApiResponse<Person>> {
  const person = mockPeople.find((p) => p.id === id);
  if (!person) {
    return {
      success: false,
      error: 'Person not found',
    };
  }

  person.status = status as any;
  return {
    success: true,
    data: person,
    message: 'Status updated successfully',
  };
}

// Documents endpoints
export async function listDocuments(personId?: string): Promise<ApiResponse<Document[]>> {
  const docs = personId ? mockDocuments.filter((d) => d.personId === personId) : mockDocuments;

  return {
    success: true,
    data: docs,
  };
}

export async function uploadDocument(personId: string, file: File): Promise<ApiResponse<Document>> {
  const newDocument: Document = {
    id: `doc-${Date.now()}`,
    personId,
    fileName: file.name,
    fileType: 'other',
    fileSize: file.size,
    mimeType: file.type,
    status: 'pending',
    uploadedAt: new Date().toISOString(),
    uploadedBy: 'current-user',
  };

  return {
    success: true,
    data: newDocument,
    message: 'Document uploaded successfully',
  };
}

// Audit logs endpoints
export async function listAuditLogs(personId: string): Promise<ApiResponse<AuditLog[]>> {
  const logs = mockAuditLogs.filter((log) => log.personId === personId);

  return {
    success: true,
    data: logs,
  };
}

// Timeline events
export async function getTimelineEvents(personId: string): Promise<ApiResponse<TimelineEvent[]>> {
  const events = mockTimelineEvents.filter((e) => e.personId === personId);

  return {
    success: true,
    data: events,
  };
}

// Organization endpoints
export async function listDepartments(): Promise<ApiResponse<Department[]>> {
  return {
    success: true,
    data: mockDepartments,
  };
}

export async function listFaculties(): Promise<ApiResponse<Faculty[]>> {
  return {
    success: true,
    data: mockFaculties,
  };
}

export async function createDepartment(data: Partial<Department>): Promise<ApiResponse<Department>> {
  const newDept: Department = {
    id: `dept-${Date.now()}`,
    name: data.name || '',
    code: data.code || '',
    description: data.description,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: newDept,
    message: 'Department created successfully',
  };
}

export async function createFaculty(data: Partial<Faculty>): Promise<ApiResponse<Faculty>> {
  const newFac: Faculty = {
    id: `fac-${Date.now()}`,
    name: data.name || '',
    code: data.code || '',
    departmentId: data.departmentId || '',
    description: data.description,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: newFac,
    message: 'Faculty created successfully',
  };
}
