'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock login - in production, this would call your auth API
    if (email && password) {
      setTimeout(() => {
        // Store mock user session
        localStorage.setItem('auth_token', 'mock-token-' + Date.now());
        router.push('/dashboard');
      }, 500);
    } else {
      setError('Please fill in all fields');
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-2xl bg-card border-border/50 rounded-xl">
      <div className="flex flex-col items-center gap-4 mb-8 accent-line-top pb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-accent via-accent to-[hsl(var(--accent-secondary))] rounded-xl flex items-center justify-center shadow-lg">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2">NGK HR Workforce Registry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
            <p className="font-500">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-500">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary/40 border-border/50 rounded-lg h-11 focus:border-accent focus:bg-secondary/60"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-500">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary/40 border-border/50 rounded-lg h-11 focus:border-accent focus:bg-secondary/60"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 bg-gradient-to-r from-accent via-accent to-[hsl(var(--accent-secondary))] hover:from-accent/90 hover:via-accent/90 hover:to-[hsl(var(--accent-secondary))/90] text-white font-500 rounded-lg mt-6" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          <span className="font-500 text-foreground">Demo credentials:</span>
          <br />
          Email: jane.kariuki@ngk.co.ke
          <br />
          Password: any password
        </p>
      </div>
    </Card>
  );
}
