'use server'

import { supabase, type Database } from '@/lib/supabase'

// EMPLOYEES
export async function fetchEmployees(filters?: {
  department?: string
  status?: string
  searchQuery?: string
}) {
  try {
    let query = supabase
      .from('employees')
      .select(`
        *,
        department:departments(*),
        faculty:faculties(*),
        role:employee_roles(*),
        status:employee_statuses(*)
      `)

    if (filters?.department) {
      query = query.eq('department_id', filters.department)
    }

    if (filters?.status) {
      query = query.eq('status_id', filters.status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching employees:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching employees:', err)
    return { data: [], error: 'Failed to fetch employees' }
  }
}

export async function fetchEmployeeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        department:departments(*),
        faculty:faculties(*),
        role:employee_roles(*),
        status:employee_statuses(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching employee:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching employee:', err)
    return { data: null, error: 'Failed to fetch employee' }
  }
}

export async function createEmployee(employee: Database['public']['Tables']['employees']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert([employee])
      .select()
      .single()

    if (error) {
      console.error('Error creating employee:', error)
      return { data: null, error: error.message }
    }

    // Log the action
    await logAuditEntry({
      action: 'CREATE',
      entity_type: 'employee',
      entity_id: data.id,
      changes: employee
    })

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error creating employee:', err)
    return { data: null, error: 'Failed to create employee' }
  }
}

export async function updateEmployee(id: string, updates: Database['public']['Tables']['employees']['Update']) {
  try {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating employee:', error)
      return { data: null, error: error.message }
    }

    // Log the action
    await logAuditEntry({
      action: 'UPDATE',
      entity_type: 'employee',
      entity_id: id,
      changes: updates
    })

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error updating employee:', err)
    return { data: null, error: 'Failed to update employee' }
  }
}

export async function deleteEmployee(id: string) {
  try {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting employee:', error)
      return { data: null, error: error.message }
    }

    // Log the action
    await logAuditEntry({
      action: 'DELETE',
      entity_type: 'employee',
      entity_id: id,
      changes: null
    })

    return { data: { success: true }, error: null }
  } catch (err) {
    console.error('Unexpected error deleting employee:', err)
    return { data: null, error: 'Failed to delete employee' }
  }
}

// DOCUMENTS
export async function fetchDocuments(employeeId?: string) {
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching documents:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching documents:', err)
    return { data: [], error: 'Failed to fetch documents' }
  }
}

export async function uploadDocument(document: Database['public']['Tables']['documents']['Insert']) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([document])
      .select()
      .single()

    if (error) {
      console.error('Error uploading document:', error)
      return { data: null, error: error.message }
    }

    // Log the action
    await logAuditEntry({
      action: 'UPLOAD',
      entity_type: 'document',
      entity_id: data.id,
      changes: { file: document.file_name }
    })

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error uploading document:', err)
    return { data: null, error: 'Failed to upload document' }
  }
}

// DEPARTMENTS
export async function fetchDepartments() {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching departments:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching departments:', err)
    return { data: [], error: 'Failed to fetch departments' }
  }
}

// FACULTIES
export async function fetchFaculties() {
  try {
    const { data, error } = await supabase
      .from('faculties')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching faculties:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching faculties:', err)
    return { data: [], error: 'Failed to fetch faculties' }
  }
}

// STATUSES
export async function fetchEmployeeStatuses() {
  try {
    const { data, error } = await supabase
      .from('employee_statuses')
      .select('*')

    if (error) {
      console.error('Error fetching statuses:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching statuses:', err)
    return { data: [], error: 'Failed to fetch statuses' }
  }
}

// ROLES
export async function fetchEmployeeRoles() {
  try {
    const { data, error } = await supabase
      .from('employee_roles')
      .select('*')

    if (error) {
      console.error('Error fetching roles:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching roles:', err)
    return { data: [], error: 'Failed to fetch roles' }
  }
}

// AUDIT LOGS
export async function fetchAuditLogs(filters?: { entityType?: string; limit?: number }) {
  try {
    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.entityType) {
      query = query.eq('entity_type', filters.entityType)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching audit logs:', error)
      return { data: [], error: error.message }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error fetching audit logs:', err)
    return { data: [], error: 'Failed to fetch audit logs' }
  }
}

async function logAuditEntry(log: Database['public']['Tables']['audit_logs']['Insert']) {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert([log])

    if (error) {
      console.error('Error logging audit entry:', error)
    }
  } catch (err) {
    console.error('Unexpected error logging audit entry:', err)
  }
}
