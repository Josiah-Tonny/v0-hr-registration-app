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
    <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">NGK HR</h1>
        <p className="text-xs text-slate-400 mt-1">Workforce Registry</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3"
                asChild
              >
                <span>
                  {iconMap[item.icon]}
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-300 hover:text-white"
          onClick={() => {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
