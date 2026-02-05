'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';
import { mockDepartments } from '@/lib/mock-data';

const REPORT_TYPES = [
  { value: 'employee_census', label: 'Employee Census' },
  { value: 'department_summary', label: 'Department Summary' },
  { value: 'contract_expiry', label: 'Contract Expiry Report' },
  { value: 'status_breakdown', label: 'Status Breakdown' },
  { value: 'engagement_dates', label: 'Engagement Dates Report' },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and export workforce reports</p>
      </div>

      {/* Report Generator */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Generate Report</h2>

        <div className="space-y-4">
          {/* Report Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type" className="mt-2">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <Label htmlFor="department">Department (Optional)</Label>
              <Select>
                <SelectTrigger id="department" className="mt-2">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date (Optional)</Label>
              <Input id="start-date" type="date" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="end-date">End Date (Optional)</Label>
              <Input id="end-date" type="date" className="mt-2" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>

        <div className="space-y-3">
          {[
            { name: 'Employee Census Report', date: '2024-02-01', type: 'employee_census' },
            { name: 'Department Summary', date: '2024-01-30', type: 'department_summary' },
            { name: 'Contract Expiry Alert', date: '2024-01-28', type: 'contract_expiry' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">{report.name}</p>
                <p className="text-sm text-gray-500">{report.date}</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
