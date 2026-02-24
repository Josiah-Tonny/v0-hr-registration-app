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

const REPORT_TYPES = [
  { value: 'employee_census', label: 'Employee Census' },
  { value: 'department_summary', label: 'Department Summary' },
  { value: 'contract_expiry', label: 'Contract Expiry Report' },
  { value: 'status_breakdown', label: 'Status Breakdown' },
  { value: 'engagement_dates', label: 'Engagement Dates Report' },
];

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="accent-line-top pb-6">
        <h1 className="text-4xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">Generate and export workforce reports</p>
      </div>

      {/* Report Generator */}
      <Card className="p-6 bg-card border-border/50 hover:border-border/80 rounded-xl">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" />
          Generate Report
        </h2>

        <div className="space-y-4">
          {/* Report Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="report-type" className="text-foreground font-500">Report Type</Label>
              <Select>
                <SelectTrigger id="report-type" className="mt-2 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-lg">
                  {REPORT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="hover:bg-secondary/50">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <Label htmlFor="department" className="text-foreground font-500">Department (Optional)</Label>
              <Select>
                <SelectTrigger id="department" className="mt-2 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border rounded-lg">
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id} className="hover:bg-secondary/50">
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
              <Label htmlFor="start-date" className="text-foreground font-500">Start Date (Optional)</Label>
              <Input id="start-date" type="date" className="mt-2 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent" />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-foreground font-500">End Date (Optional)</Label>
              <Input id="end-date" type="date" className="mt-2 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="bg-gradient-to-r from-accent via-accent to-[hsl(var(--accent-secondary))] hover:from-accent/90 hover:via-accent/90 hover:to-[hsl(var(--accent-secondary))/90] text-white rounded-lg gap-2">
              <Filter className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6 bg-card border-border/50 hover:border-border/80 rounded-xl">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-accent" />
          Recent Reports
        </h2>

        <div className="space-y-3">
          {[
            { name: 'Employee Census Report', date: '2024-02-01', type: 'employee_census' },
            { name: 'Department Summary', date: '2024-01-30', type: 'department_summary' },
            { name: 'Contract Expiry Alert', date: '2024-01-28', type: 'contract_expiry' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 rounded-lg border border-border/30 transition-colors">
              <div>
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="text-sm text-muted-foreground">{report.date}</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
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
