'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/filter-bar';
import { PersonCardGrid } from '@/components/person-card-grid';
import { Plus, List, Grid3x3 } from 'lucide-react';

export default function PeoplePage() {
  const [filteredData, setFilteredData] = useState(mockPeople);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-700 text-foreground">Employee Registry</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and view all employees</p>
        </div>
        <Link href="/people/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-10">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filter and View Controls */}
      <div className="space-y-4">
        <Card className="p-4 bg-card border-border/40">
          <FilterBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filterOptions}
            searchPlaceholder="Search employees..."
          />
        </Card>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-500">
            {filteredData.length} of {mockPeople.length} employees
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`h-9 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground border-primary' : 'border-border/40'}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-9 ${viewMode === 'list' ? 'bg-primary text-primary-foreground border-primary' : 'border-border/40'}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <PersonCardGrid
          employees={filteredData.map((p) => ({
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            phone: p.phone,
            department: p.department,
            faculty: p.faculty,
            jobTitle: p.position,
            status: p.status,
            joinDate: p.joinDate,
            avatar: p.avatar,
          }))}
          onViewDetails={(id) => {
            window.location.href = `/people/${id}`;
          }}
        />
      )}

      {/* List View (fallback) */}
      {viewMode === 'list' && (
        <Card className="p-6 bg-card border-border/40">
          <p className="text-muted-foreground text-center py-8 text-sm">List view coming soon</p>
        </Card>
      )}
    </div>
  );
}
