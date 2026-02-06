import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah',
  'Charles', 'Karen', 'Christopher', 'Nancy', 'Donald', 'Lisa', 'Matthew', 'Betty',
  'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley', 'Paul', 'Kimberly',
  'Andrew', 'Donna', 'Joshua', 'Carol', 'Kenneth', 'Michelle', 'Kevin', 'Amanda',
  'Brian', 'Melissa', 'George', 'Deborah', 'Edward', 'Stephanie', 'Ronald', 'Rebecca',
  'Anthony', 'Sharon', 'Frank', 'Laura', 'Ryan', 'Cynthia', 'Gary', 'Kathleen'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Peterson', 'Phillips', 'Campbell',
  'Parker', 'Evans', 'Edwards', 'Collins', 'Reeves', 'Stewart', 'Morris', 'Morales',
  'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson'
];

const jobTitles = [
  'Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst', 'Project Manager',
  'Business Analyst', 'DevOps Engineer', 'QA Engineer', 'System Administrator', 'Network Engineer',
  'HR Manager', 'Recruiter', 'Finance Manager', 'Accountant', 'Sales Executive',
  'Marketing Manager', 'Content Writer', 'Graphic Designer', 'Operations Manager', 'IT Support',
  'Senior Manager', 'Director', 'Executive', 'Coordinator', 'Assistant'
];

const departments = [
  'Engineering', 'Product', 'Design', 'Operations', 'Finance',
  'Human Resources', 'Sales', 'Marketing', 'Support', 'Administration'
];

const faculties = [
  'Technology', 'Business', 'Design', 'Operations', 'Finance'
];

const statuses = ['active', 'inactive', 'on_leave', 'suspended'];

const categories = ['staff', 'contractor', 'intern', 'consultant'];

function getRandomElement(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string) {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ngk.co.ke`;
}

function generatePhone() {
  return `+254 ${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 90000000 + 10000000)}`;
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedDatabase() {
  console.log('Starting database seeding...');

  const employees = [];

  // Generate 100 employees
  for (let i = 0; i < 100; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);

    employees.push({
      first_name: firstName,
      last_name: lastName,
      email: generateEmail(firstName, lastName),
      phone: generatePhone(),
      job_title: getRandomElement(jobTitles),
      department: getRandomElement(departments),
      faculty: getRandomElement(faculties),
      status: getRandomElement(statuses),
      category: getRandomElement(categories),
      join_date: getRandomDate(new Date('2018-01-01'), new Date()).toISOString().split('T')[0],
      contract_end_date: Math.random() > 0.7 ? getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] : null,
    });
  }

  try {
    // Insert employees
    const { error: employeeError } = await supabase
      .from('employees')
      .insert(employees);

    if (employeeError) {
      console.error('Error inserting employees:', employeeError);
      return;
    }

    console.log(`Successfully inserted ${employees.length} employees`);

    // Fetch all employees to get their IDs
    const { data: insertedEmployees, error: fetchError } = await supabase
      .from('employees')
      .select('id, email')
      .limit(100);

    if (fetchError) {
      console.error('Error fetching employees:', fetchError);
      return;
    }

    // Create audit log entries for each employee
    const auditLogs = insertedEmployees?.map((emp: any) => ({
      entity_type: 'employee',
      entity_id: emp.id,
      action: 'created',
      description: `Employee ${emp.email} created`,
      changes: JSON.stringify({ status: 'created' }),
    })) || [];

    const { error: auditError } = await supabase
      .from('audit_logs')
      .insert(auditLogs);

    if (auditError) {
      console.error('Error inserting audit logs:', auditError);
      return;
    }

    console.log(`Successfully inserted ${auditLogs.length} audit log entries`);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seedDatabase();
