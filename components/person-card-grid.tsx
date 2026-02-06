'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Mail, Phone, Building, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  faculty?: string;
  jobTitle: string;
  status: string;
  joinDate: string;
  avatar?: string;
}

interface PersonCardGridProps {
  employees: Employee[];
  onViewDetails: (id: string) => void;
  isLoading?: boolean;
}

export function PersonCardGrid({
  employees,
  onViewDetails,
  isLoading = false,
}: PersonCardGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="p-6 bg-card border-border/30 rounded-xl animate-pulse h-80" />
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No employees found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'suspended':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          className="p-6 bg-card border-border/50 hover:border-border/80 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer group"
          onMouseEnter={() => setHoveredCard(employee.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onViewDetails(employee.id)}
        >
          {/* Header with more options */}
          <div className="flex items-start justify-between mb-4">
            <Avatar className="w-12 h-12 border border-border/50 bg-secondary/50">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-accent via-accent to-[hsl(var(--accent-secondary))] text-white font-bold">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Name */}
          <div className="mb-3">
            <h3 className="text-sm font-bold text-foreground truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{employee.jobTitle}</p>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <Badge variant="outline" className={`text-xs ${getStatusColor(employee.status)}`}>
              {employee.status}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4 text-xs">
            {employee.email && (
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </div>
            )}
            {employee.phone && (
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{employee.phone}</span>
              </div>
            )}
          </div>

          {/* Department */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 bg-secondary/30 rounded-lg p-2">
            <Building className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{employee.department}</span>
          </div>

          {/* Join Date */}
          <p className="text-xs text-muted-foreground mb-4">
            Joined {new Date(employee.joinDate).toLocaleDateString()}
          </p>

          {/* Action Button */}
          <Link href={`/people/${employee.id}`}>
            <Button className="w-full h-9 bg-accent hover:bg-accent/90 text-white rounded-lg text-xs font-500">
              View Profile
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}
