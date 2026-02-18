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
        p-6 bg-card/60 backdrop-blur-sm border border-border/40 rounded-xl
        ${hoverable ? 'hover:bg-card/80 hover:border-border/60 hover:shadow-sm transition-all duration-250' : ''}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/25">
          {icon && (
            <div className="text-lg text-accent/80 flex-shrink-0">
              {icon}
            </div>
          )}
          <h2 className="text-lg font-600 text-foreground tracking-tight">{title}</h2>
        </div>
      )}
      {children}
    </Card>
  );
}
