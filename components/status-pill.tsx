import { PersonStatus } from '@/types';
import { STATUS_CONFIG } from '@/lib/constants';

interface StatusPillProps {
  status: PersonStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const config = STATUS_CONFIG[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-600',
    md: 'px-3 py-1.5 text-sm font-600',
    lg: 'px-4 py-2 text-base font-600',
  };

  return (
    <span className={`inline-block rounded-full ${sizeClasses[size]} ${config.bgColor} ${config.color} border border-current/20`}>
      {config.label}
    </span>
  );
}
