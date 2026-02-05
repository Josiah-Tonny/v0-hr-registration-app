'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { mockDepartments, mockFaculties } from '@/lib/mock-data';

export default function SettingsPage() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [faculties, setFaculties] = useState(mockFaculties);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your organization structure and configurations</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="faculties">Faculties</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="statuses">Statuses</TabsTrigger>
        </TabsList>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Departments</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            </div>

            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
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
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Faculties</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Faculty
              </Button>
            </div>

            <div className="space-y-3">
              {faculties.map((fac) => (
                <div key={fac.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{fac.name}</h3>
                    <p className="text-sm text-gray-600">{fac.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
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
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">User Roles</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'HR Administrator', description: 'Full access to all features', permissions: 5 },
                { name: 'HR Officer', description: 'Can manage people and documents', permissions: 3 },
                { name: 'Supervisor', description: 'Can view team information', permissions: 2 },
              ].map((role, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{role.permissions} permissions</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
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
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Statuses</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Status
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Active', color: 'bg-green-100', textColor: 'text-green-700' },
                { name: 'Inactive', color: 'bg-gray-100', textColor: 'text-gray-700' },
                { name: 'Suspended', color: 'bg-red-100', textColor: 'text-red-700' },
                { name: 'On Leave', color: 'bg-blue-100', textColor: 'text-blue-700' },
              ].map((status, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <h3 className="font-medium text-gray-900">{status.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
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
