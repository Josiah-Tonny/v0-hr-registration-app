'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusPill } from '@/components/status-pill';
import { CategoryBadge } from '@/components/category-badge';
import { AuditTimeline } from '@/components/audit-timeline';
import { DataTable, Column } from '@/components/data-table';
import { Person, Document, TimelineEvent } from '@/types';
import { mockPeople, mockDocuments, mockTimelineEvents } from '@/lib/mock-data';
import { Edit2, Download, Mail, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const documentColumns: Column<Document>[] = [
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'fileType', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'uploadedAt', label: 'Upload Date', sortable: true, render: (v) => format(new Date(v), 'MMM dd, yyyy') },
];

export default function PersonDetailPage() {
  const params = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const foundPerson = mockPeople.find((p) => p.id === id);
    const relatedDocs = mockDocuments.filter((d) => d.personId === id);
    const relatedTimeline = mockTimelineEvents.filter((e) => e.personId === id);

    setPerson(foundPerson || null);
    setDocuments(relatedDocs);
    setTimeline(relatedTimeline);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!person) {
    return <div className="p-6">Person not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
              {person.firstName.charAt(0)}
              {person.lastName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {person.firstName} {person.lastName}
                </h1>
                <StatusPill status={person.status} />
                <CategoryBadge category={person.categoryDetails.category} />
              </div>
              <p className="text-gray-600 mt-1">{person.position}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {person.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {person.phoneNumber}
                </div>
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">{format(new Date(person.dateOfBirth), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium text-gray-900 capitalize">{person.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nationality</p>
                  <p className="font-medium text-gray-900">{person.nationality}</p>
                </div>
                <div>
                  <p className="text-gray-600">Personal ID Number</p>
                  <p className="font-medium text-gray-900">{person.personalIdNumber}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Employment Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{person.department}</p>
                </div>
                <div>
                  <p className="text-gray-600">Position</p>
                  <p className="font-medium text-gray-900">{person.position}</p>
                </div>
                {person.manager && (
                  <div>
                    <p className="text-gray-600">Manager</p>
                    <p className="font-medium text-gray-900">{person.manager}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(person.engagementDates.startDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {person.emergencyContact && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{person.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{person.emergencyContactPhone}</p>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Documents</h3>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
            {documents.length > 0 ? (
              <DataTable columns={documentColumns} data={documents} />
            ) : (
              <div className="text-center py-8 text-gray-500">No documents uploaded</div>
            )}
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-6">Activity Timeline</h3>
            <AuditTimeline events={timeline} />
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
            <div className="text-center py-8 text-gray-500">
              <p>No notes yet. Add a note to attach important information to this profile.</p>
            </div>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Audit Log</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900">Record Created</p>
                <p className="text-gray-600 text-xs mt-1">
                  {format(new Date(person.createdAt), 'MMM dd, yyyy HH:mm')} by {person.createdBy}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900">Last Updated</p>
                <p className="text-gray-600 text-xs mt-1">
                  {format(new Date(person.updatedAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
