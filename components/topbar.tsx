'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCurrentUser } from '@/lib/mock-data';

export function Topbar() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search employees..." 
            className="pl-10 h-9 bg-secondary/40 border-border rounded-lg text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-0" 
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary/40"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-border/40" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-600 text-foreground">{mockCurrentUser.name}</p>
            <p className="text-xs text-muted-foreground">{mockCurrentUser.role.replace(/_/g, ' ')}</p>
          </div>
          <Avatar className="h-8 w-8 border border-border/40">
            <AvatarImage src={mockCurrentUser.avatar || "/placeholder.svg"} alt={mockCurrentUser.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-600">{mockCurrentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
