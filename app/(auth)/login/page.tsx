'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Building2 } from 'lucide-react';

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

    if (email && password) {
      setTimeout(() => {
        localStorage.setItem('auth_token', 'mock-token-' + Date.now());
        router.push('/dashboard');
      }, 500);
    } else {
      setError('Please fill in all fields');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md p-8 border border-border/30">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-700 text-foreground">NGK HR</h1>
            <p className="text-sm text-muted-foreground mt-1">Workforce Registry</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-600 text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-secondary/30 border-border/50 focus:border-primary"
              disabled={loading}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-600 text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 bg-secondary/30 border-border/50 focus:border-primary"
              disabled={loading}
            />
          </div>

          <Button 
            type="submit"
            className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center mb-3">
            <span className="font-600 text-foreground">Demo Credentials</span>
          </p>
          <div className="bg-secondary/20 rounded-lg p-3 space-y-2 text-xs text-muted-foreground">
            <p><span className="font-600 text-foreground">Email:</span> jane.kariuki@ngk.co.ke</p>
            <p><span className="font-600 text-foreground">Password:</span> any password</p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-6">© 2025 NGK. All rights reserved.</p>
    </div>
  );
}
