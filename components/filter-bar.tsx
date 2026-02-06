'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  filters?: Array<{
    name: string;
    label: string;
    options: FilterOption[];
  }>;
  searchPlaceholder?: string;
}

export function FilterBar({ onSearch, onFilterChange, filters, searchPlaceholder = 'Search...' }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string>>({});

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...selectedFilters, [filterName]: value };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedFilters({});
    onSearch?.('');
    onFilterChange?.({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent focus:bg-secondary/60"
          />
        </div>
        {(searchQuery || Object.keys(selectedFilters).length > 0) && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClear}
            className="h-10 border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {filters && filters.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {filters.map((filter) => (
            <Select key={filter.name} value={selectedFilters[filter.name] || ''} onValueChange={(value) => handleFilterChange(filter.name, value)}>
              <SelectTrigger className="w-40 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent focus:bg-secondary/60">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-lg">
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="hover:bg-secondary/50">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
