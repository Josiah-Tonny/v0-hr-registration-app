'use client';

import { useState } from 'react';
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
import { DocumentUploader } from '@/components/document-uploader';
import { FormWizard, WizardStep } from '@/components/form-wizard';
import { mockDepartments, mockFaculties } from '@/lib/mock-data';

const identityStep = (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="firstName">First Name *</Label>
        <Input id="firstName" placeholder="First name" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name *</Label>
        <Input id="lastName" placeholder="Last name" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="email@example.com" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" placeholder="+254712345678" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="idNumber">Personal ID Number *</Label>
        <Input id="idNumber" placeholder="ID number" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="dob">Date of Birth *</Label>
        <Input id="dob" type="date" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="gender">Gender *</Label>
        <Select>
          <SelectTrigger id="gender" className="mt-2">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="nationality">Nationality *</Label>
        <Input id="nationality" placeholder="Nationality" className="mt-2" />
      </div>
    </div>
  </div>
);

const categoryStep = (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="category">Employment Category *</Label>
        <Select>
          <SelectTrigger id="category" className="mt-2">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="contractor">Contractor</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
            <SelectItem value="consultant">Consultant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="staffNumber">Staff Number</Label>
        <Input id="staffNumber" placeholder="e.g., STF-001" className="mt-2" />
      </div>
    </div>
  </div>
);

const engagementStep = (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Dates</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="startDate">Start Date *</Label>
        <Input id="startDate" type="date" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="endDate">End Date (if applicable)</Label>
        <Input id="endDate" type="date" className="mt-2" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <Label htmlFor="department">Department *</Label>
        <Select>
          <SelectTrigger id="department" className="mt-2">
            <SelectValue placeholder="Select department" />
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
      <div>
        <Label htmlFor="position">Position *</Label>
        <Input id="position" placeholder="Job title" className="mt-2" />
      </div>
    </div>
  </div>
);

const documentsStep = (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Documents</h3>
    <DocumentUploader />
  </div>
);

const reviewStep = (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Review Information</h3>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
      Please review all information before submitting. Once submitted, the person record will be created.
    </div>
    <div className="space-y-3 mt-4">
      <div className="p-3 bg-gray-50 rounded">
        <p className="text-xs text-gray-600">All information will be stored in the system.</p>
      </div>
    </div>
  </div>
);

const wizardSteps: WizardStep[] = [
  { id: 'identity', label: 'Identity', component: identityStep },
  { id: 'category', label: 'Category', component: categoryStep },
  { id: 'engagement', label: 'Engagement', component: engagementStep },
  { id: 'documents', label: 'Documents', component: documentsStep },
  { id: 'review', label: 'Review', component: reviewStep },
];

export default function NewPersonPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Person</h1>
        <p className="text-gray-600 mt-1">Register a new person in the workforce registry</p>
      </div>

      {/* Form Wizard */}
      <Card className="p-6">
        <FormWizard
          steps={wizardSteps}
          onComplete={() => {
            alert('Person added successfully!');
            window.location.href = '/people';
          }}
          onStepChange={(step) => {
            console.log('Step changed to:', step);
          }}
        />
      </Card>
    </div>
  );
}
