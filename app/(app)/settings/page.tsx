'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function SettingsPage() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [faculties, setFaculties] = useState(mockFaculties);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="accent-line-top pb-6">
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your organization structure and configurations</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/30 border border-border/30 rounded-lg p-1">
          <TabsTrigger value="departments" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-white">Departments</TabsTrigger>
          <TabsTrigger value="faculties" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-white">Faculties</TabsTrigger>
          <TabsTrigger value="roles" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-white">Roles</TabsTrigger>
          <TabsTrigger value="statuses" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-white">Statuses</TabsTrigger>
        </TabsList>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <Card className="p-6 bg-card border-border/50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Departments</h2>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-lg gap-2">
                <Plus className="w-4 h-4" />
                Add Department
              </Button>
            </div>

            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-4 border border-border/30 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors">
                  <div>
                    <h3 className="font-medium text-foreground">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Faculties Tab */}
        <TabsContent value="faculties" className="space-y-4">
          <Card className="p-6 bg-card border-border/50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Faculties</h2>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-lg gap-2">
                <Plus className="w-4 h-4" />
                Add Faculty
              </Button>
            </div>

            <div className="space-y-3">
              {faculties.map((fac) => (
                <div key={fac.id} className="flex items-center justify-between p-4 border border-border/30 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors">
                  <div>
                    <h3 className="font-medium text-foreground">{fac.name}</h3>
                    <p className="text-sm text-muted-foreground">{fac.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card className="p-6 bg-card border-border/50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">User Roles</h2>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-lg gap-2">
                <Plus className="w-4 h-4" />
                Add Role
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'HR Administrator', description: 'Full access to all features', permissions: 5 },
                { name: 'HR Officer', description: 'Can manage people and documents', permissions: 3 },
                { name: 'Supervisor', description: 'Can view team information', permissions: 2 },
              ].map((role, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border/30 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors">
                  <div>
                    <h3 className="font-medium text-foreground">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{role.permissions} permissions</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Statuses Tab */}
        <TabsContent value="statuses" className="space-y-4">
          <Card className="p-6 bg-card border-border/50 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Employee Statuses</h2>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-lg gap-2">
                <Plus className="w-4 h-4" />
                Add Status
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Active', color: 'bg-emerald-500/20', textColor: 'text-emerald-400' },
                { name: 'Inactive', color: 'bg-gray-500/20', textColor: 'text-gray-400' },
                { name: 'Suspended', color: 'bg-destructive/20', textColor: 'text-destructive' },
                { name: 'On Leave', color: 'bg-blue-500/20', textColor: 'text-blue-400' },
              ].map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border/30 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <h3 className="font-medium text-foreground">{status.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
