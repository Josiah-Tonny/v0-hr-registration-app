import React from 'react';
import { Card } from '@/components/ui/card';

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  hoverable?: boolean;
}

export function ModernCard({
  children,
  title,
  icon,
  hoverable = true,
  className = '',
  ...props
}: ModernCardProps) {
  return (
    <Card
      className={`
        p-6 bg-card border-border/50 rounded-xl
        ${hoverable ? 'hover:border-border/80 hover:shadow-lg transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
          {icon && <div className="text-xl">{icon}</div>}
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
      )}
      {children}
    </Card>
  );
}
