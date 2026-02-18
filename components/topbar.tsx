'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCurrentUser } from '@/lib/mock-data';

export function Topbar() {
  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border/30 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
          <Input 
            placeholder="Search people, documents..." 
            className="pl-10 h-10 bg-secondary/25 border border-border/40 rounded-lg text-sm placeholder:text-muted-foreground focus:border-accent/60 focus:bg-secondary/40 focus:ring-0 transition-all duration-200" 
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg h-10 w-10 transition-colors duration-200"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <div className="h-6 w-px bg-border/25" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-500 text-foreground leading-tight">{mockCurrentUser.name}</p>
            <p className="text-xs text-muted-foreground">{mockCurrentUser.role.replace(/_/g, ' ')}</p>
          </div>
          <Avatar className="h-9 w-9 border border-border/40 cursor-pointer hover:border-border/60 transition-colors">
            <AvatarImage src={mockCurrentUser.avatar || "/placeholder.svg"} alt={mockCurrentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-accent to-[hsl(var(--accent-secondary))] text-white text-xs font-bold">{mockCurrentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
