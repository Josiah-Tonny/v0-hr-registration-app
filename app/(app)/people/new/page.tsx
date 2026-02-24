'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewPersonPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4 accent-line-top pb-6">
        <Link href="/people">
          <Button variant="outline" size="sm" className="rounded-lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Add New Person</h1>
          <p className="text-muted-foreground mt-2">Register a new employee in the system</p>
        </div>
      </div>

      <Card className="p-6 bg-card border-border/50 rounded-xl">
        <div className="text-center py-12 text-muted-foreground">
          <p>Registration form coming soon</p>
        </div>
      </Card>
    </div>
  );
}