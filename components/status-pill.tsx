import { PersonStatus } from '@/types';
import { STATUS_CONFIG } from '@/lib/constants';

interface StatusPillProps {
  status: PersonStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusPill({ status, size = 'md' }: StatusPillProps) {
  const config = STATUS_CONFIG[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-block rounded-full font-medium ${sizeClasses[size]} ${config.bgColor} ${config.color}`}>
      {config.label}
    </span>
  );
}
