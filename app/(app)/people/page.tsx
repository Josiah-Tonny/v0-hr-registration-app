'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/data-table';
import { FilterBar } from '@/components/filter-bar';
import { StatusPill } from '@/components/status-pill';
import { CategoryBadge } from '@/components/category-badge';
import { mockPeople, mockDepartments } from '@/lib/mock-data';
import { Person, PersonStatus, PersonCategory } from '@/types';
import { Plus } from 'lucide-react';

const personColumns: Column<Person>[] = [
  {
    key: 'firstName',
    label: 'First Name',
    sortable: true,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'position',
    label: 'Position',
    sortable: true,
  },
  {
    key: 'department',
    label: 'Department',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value: PersonStatus) => <StatusPill status={value} size="sm" />,
  },
];

export default function PeoplePage() {
  const [filteredData, setFilteredData] = useState(mockPeople);

  const handleSearch = (query: string) => {
    const filtered = mockPeople.filter(
      (person) =>
        person.firstName.toLowerCase().includes(query.toLowerCase()) ||
        person.lastName.toLowerCase().includes(query.toLowerCase()) ||
        person.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = mockPeople;

    if (filters.department) {
      filtered = filtered.filter((p) => p.department === filters.department);
    }

    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.categoryDetails.category === filters.category);
    }

    setFilteredData(filtered);
  };

  const filterOptions = [
    {
      name: 'department',
      label: 'Department',
      options: mockDepartments.map((d) => ({ value: d.name, label: d.name })),
    },
    {
      name: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'contract_ending', label: 'Contract Ending' },
        { value: 'on_leave', label: 'On Leave' },
      ],
    },
    {
      name: 'category',
      label: 'Category',
      options: [
        { value: 'staff', label: 'Staff' },
        { value: 'contractor', label: 'Contractor' },
        { value: 'intern', label: 'Intern' },
        { value: 'consultant', label: 'Consultant' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">People Registry</h1>
          <p className="text-gray-600 mt-1">Manage your workforce registry</p>
        </div>
        <Link href="/people/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Person
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <FilterBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filterOptions}
          searchPlaceholder="Search by name or email..."
        />
      </Card>

      {/* Data Table */}
      <Card className="p-6">
        <DataTable
          columns={personColumns}
          data={filteredData}
          onRowClick={(person) => {
            window.location.href = `/people/${person.id}`;
          }}
        />
      </Card>
    </div>
  );
}
