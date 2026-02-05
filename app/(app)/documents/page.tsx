'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/data-table';
import { FilterBar } from '@/components/filter-bar';
import { mockDocuments } from '@/lib/mock-data';
import { Document } from '@/types';
import { DOCUMENT_TYPES } from '@/lib/constants';
import { Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

const documentColumns: Column<Document>[] = [
  {
    key: 'fileName',
    label: 'File Name',
    sortable: true,
  },
  {
    key: 'fileType',
    label: 'Type',
    sortable: true,
    render: (value) => DOCUMENT_TYPES[value] || value,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
        value === 'approved' ? 'bg-green-100 text-green-700' :
        value === 'pending' ? 'bg-yellow-100 text-yellow-700' :
        value === 'rejected' ? 'bg-red-100 text-red-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    ),
  },
  {
    key: 'uploadedAt',
    label: 'Upload Date',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'uploadedBy',
    label: 'Uploaded By',
    sortable: true,
  },
];

export default function DocumentsPage() {
  const [filteredData, setFilteredData] = useState(mockDocuments);

  const handleSearch = (query: string) => {
    const filtered = mockDocuments.filter((doc) =>
      doc.fileName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = mockDocuments;

    if (filters.type) {
      filtered = filtered.filter((d) => d.fileType === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter((d) => d.status === filters.status);
    }

    setFilteredData(filtered);
  };

  const filterOptions = [
    {
      name: 'type',
      label: 'Document Type',
      options: Object.entries(DOCUMENT_TYPES).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      name: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'archived', label: 'Archived' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents Center</h1>
        <p className="text-gray-600 mt-1">Browse and manage all documents</p>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <FilterBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filterOptions}
          searchPlaceholder="Search by file name..."
        />
      </Card>

      {/* Data Table */}
      <Card className="p-6">
        <DataTable
          columns={documentColumns}
          data={filteredData}
          onRowClick={(doc) => {
            console.log('Viewing document:', doc.fileName);
          }}
        />
      </Card>
    </div>
  );
}
