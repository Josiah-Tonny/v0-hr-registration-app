'use client';

import React from "react"

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({ columns, data, isLoading, onRowClick }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
    } else {
      setSortConfig(null);
    }
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden bg-secondary/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/40 border-b border-border/50 hover:bg-secondary/40">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="font-600 text-foreground h-12">
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    {column.label}
                    {sortConfig?.key === column.key && (
                      <>{sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</>
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-border/30 ${onRowClick ? 'cursor-pointer hover:bg-secondary/50 transition-colors' : ''}`}
              >
                {columns.map((column) => (
                  <TableCell key={String(column.key)} className="text-foreground/80 py-3">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
