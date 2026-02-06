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
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border accent-line-top">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">NGK HR</h1>
        </div>
        <p className="text-xs text-muted-foreground">Workforce Registry</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'
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
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <div className="px-3 py-2 text-xs text-muted-foreground">
          <p>Logged in as</p>
          <p className="font-500 text-sidebar-foreground mt-1">Admin User</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-primary hover:bg-sidebar-accent rounded-lg"
          onClick={() => {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
