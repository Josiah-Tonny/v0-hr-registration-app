'use client';

import React from "react"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVIGATION_ITEMS } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar/80 backdrop-blur-sm border-r border-sidebar-border/50 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border/40">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent to-[hsl(var(--accent-secondary))] flex items-center justify-center shadow-lg shadow-accent/20">
            <span className="text-white text-sm font-bold tracking-tight">N</span>
          </div>
          <div>
            <h1 className="text-base font-700 text-sidebar-foreground tracking-tight">NGK HR</h1>
            <p className="text-xs text-muted-foreground font-400">Workforce Registry</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-lg h-9 transition-all duration-200 ${
                  isActive
                    ? 'bg-sidebar-accent/80 text-sidebar-primary hover:bg-sidebar-accent'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-primary'
                }`}
                asChild
              >
                <span>
                  {iconMap[item.icon]}
                  <span className="text-sm font-500">{item.label}</span>
                </span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border/40 space-y-3">
        <div className="px-3 py-2 text-xs">
          <p className="text-muted-foreground font-400">Logged in as</p>
          <p className="font-600 text-sidebar-foreground mt-1">Admin User</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg h-9 transition-all duration-200"
          onClick={() => {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-500">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
