'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCurrentUser } from '@/lib/mock-data';

export function Topbar() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 accent-line-top">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search people, documents..." 
            className="pl-10 h-10 bg-secondary/40 border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:border-accent focus:bg-secondary/60 focus:ring-1 focus:ring-accent/50" 
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg"
        >
          <Bell className="w-5 h-5" />
        </Button>

        <div className="h-6 w-px bg-border/50" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-500 text-foreground">{mockCurrentUser.name}</p>
            <p className="text-xs text-muted-foreground">{mockCurrentUser.role.replace(/_/g, ' ')}</p>
          </div>
          <Avatar className="border border-border/50 bg-secondary/50">
            <AvatarImage src={mockCurrentUser.avatar || "/placeholder.svg"} alt={mockCurrentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-accent to-accent-secondary text-white font-bold">{mockCurrentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
