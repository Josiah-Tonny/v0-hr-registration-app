'use client';

import { Person } from '@/types';
import { Card } from '@/components/ui/card';
import { StatusPill } from '@/components/status-pill';
import { CategoryBadge } from '@/components/category-badge';
import { User } from 'lucide-react';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  return (
    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {person.firstName} {person.lastName}
              </h3>
              <p className="text-sm text-gray-600 truncate">{person.position}</p>
            </div>
            <StatusPill status={person.status} size="sm" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-gray-500">{person.department}</p>
            <CategoryBadge category={person.categoryDetails.category} size="sm" />
          </div>
        </div>
      </div>
    </Card>
  );
}
