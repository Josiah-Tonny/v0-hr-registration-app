'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/filter-bar';
import { PersonCardGrid } from '@/components/person-card-grid';
import { mockPeople, mockDepartments } from '@/lib/mock-data';
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
      <div className="flex items-center justify-between accent-line-top pb-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground">People Registry</h1>
          <p className="text-muted-foreground mt-2">Manage your workforce registry</p>
        </div>
        <Link href="/people/new">
          <Button className="bg-gradient-to-r from-accent via-accent to-[hsl(var(--accent-secondary))] hover:from-accent/90 hover:via-accent/90 hover:to-[hsl(var(--accent-secondary))/90] text-white rounded-lg gap-2 px-6">
            <Plus className="w-4 h-4" />
            Add Person
          </Button>
        </Link>
      </div>

      {/* Filter and View Controls */}
      <div className="space-y-4">
        <Card className="p-4 bg-card border-border/50 rounded-xl">
          <FilterBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filterOptions}
            searchPlaceholder="Search by name or email..."
          />
        </Card>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {mockPeople.length} employees
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`rounded-lg ${viewMode === 'grid' ? 'bg-accent text-white border-accent' : 'border-border/50'}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-lg ${viewMode === 'list' ? 'bg-accent text-white border-accent' : 'border-border/50'}`}
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
        <Card className="p-6 bg-card border-border/50 rounded-xl">
          <p className="text-muted-foreground text-center py-8">List view coming soon</p>
        </Card>
      )}
    </div>
  );
}
