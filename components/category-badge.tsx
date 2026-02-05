import { PersonCategory } from '@/types';
import { CATEGORY_CONFIG } from '@/lib/constants';

interface CategoryBadgeProps {
  category: PersonCategory;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category];
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-block rounded border border-current ${sizeClasses[size]} ${config.color} bg-opacity-10`}>
      {config.label}
    </span>
  );
}
