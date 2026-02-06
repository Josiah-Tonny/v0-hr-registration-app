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
    color: 'text-accent',
    bgColor: 'bg-gradient-to-br from-accent/20 to-accent/10',
    accentColor: 'from-accent to-accent-secondary',
  },
  {
    label: 'Active',
    value: mockDashboardMetrics.activeEmployees,
    icon: UserCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/10',
    accentColor: 'from-emerald-400 to-emerald-500',
  },
  {
    label: 'Contracts Ending',
    value: mockDashboardMetrics.contractsEnding,
    icon: AlertCircle,
    color: 'text-amber-400',
    bgColor: 'bg-gradient-to-br from-amber-500/20 to-amber-500/10',
    accentColor: 'from-amber-400 to-amber-500',
  },
  {
    label: 'Recently Added',
    value: mockDashboardMetrics.recentlyAdded,
    icon: Plus,
    color: 'text-violet-400',
    bgColor: 'bg-gradient-to-br from-violet-500/20 to-violet-500/10',
    accentColor: 'from-violet-400 to-violet-500',
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
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s an overview of your workforce.</p>
        </div>
        <Link href="/people/new">
          <Button className="bg-gradient-to-r from-accent to-accent-secondary hover:from-accent/90 hover:to-accent-secondary/90 text-white rounded-lg gap-2 px-6">
            <Plus className="w-4 h-4" />
            Add New Person
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-6 bg-card border-border/50 hover:border-border/80 hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-500">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contracts Ending Soon */}
        <Card className="p-6 bg-card border-border/50 hover:border-border/80 rounded-xl transition-all duration-300">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Contracts Ending Soon
          </h2>
          {expiringPeople.length > 0 ? (
            <DataTable columns={peopleColumns} data={expiringPeople} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No contracts ending soon</p>
            </div>
          )}
        </Card>

        {/* Recently Added */}
        <Card className="p-6 bg-card border-border/50 hover:border-border/80 rounded-xl transition-all duration-300">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            Recently Added
          </h2>
          {recentlyAddedPeople.length > 0 ? (
            <DataTable columns={peopleColumns} data={recentlyAddedPeople} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No recently added people</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
