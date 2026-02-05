'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/data-table';
import { StatusPill } from '@/components/status-pill';
import { mockPeople, mockDashboardMetrics } from '@/lib/mock-data';
import { Person } from '@/types';
import { Users, UserCheck, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';

const METRICS = [
  {
    label: 'Total Employees',
    value: mockDashboardMetrics.totalEmployees,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    label: 'Active',
    value: mockDashboardMetrics.activeEmployees,
    icon: UserCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    label: 'Contracts Ending',
    value: mockDashboardMetrics.contractsEnding,
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    label: 'Recently Added',
    value: mockDashboardMetrics.recentlyAdded,
    icon: Plus,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const peopleColumns: Column<Person>[] = [
  {
    key: 'firstName',
    label: 'Name',
    render: (_, row) => `${row.firstName} ${row.lastName}`,
  },
  {
    key: 'position',
    label: 'Position',
  },
  {
    key: 'department',
    label: 'Department',
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <StatusPill status={value} size="sm" />,
  },
];

const expiringPeople = mockPeople.filter((p) => p.status === 'contract_ending');
const recentlyAddedPeople = [...mockPeople].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s an overview of your workforce.</p>
        </div>
        <Link href="/people/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Person
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contracts Ending Soon */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contracts Ending Soon</h2>
          {expiringPeople.length > 0 ? (
            <DataTable columns={peopleColumns} data={expiringPeople} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No contracts ending soon</p>
            </div>
          )}
        </Card>

        {/* Recently Added */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Added</h2>
          {recentlyAddedPeople.length > 0 ? (
            <DataTable columns={peopleColumns} data={recentlyAddedPeople} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recently added people</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
