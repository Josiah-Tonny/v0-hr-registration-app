'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCurrentUser } from '@/lib/mock-data';

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search people, documents..." className="pl-10" />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{mockCurrentUser.name}</p>
            <p className="text-xs text-gray-500">{mockCurrentUser.role.replace(/_/g, ' ')}</p>
          </div>
          <Avatar>
            <AvatarImage src={mockCurrentUser.avatar || "/placeholder.svg"} alt={mockCurrentUser.name} />
            <AvatarFallback>{mockCurrentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
