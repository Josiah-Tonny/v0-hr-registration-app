'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PersonDetailPage() {
  const params = useParams();
  const id = params.id as string;

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
          <h1 className="text-4xl font-bold text-foreground">Person Details</h1>
          <p className="text-muted-foreground mt-2">Employee ID: {id}</p>
        </div>
      </div>

      <Card className="p-6 bg-card border-border/50 rounded-xl">
        <div className="text-center py-12 text-muted-foreground">
          <p>Employee details loading...</p>
        </div>
      </Card>
    </div>
  );
}
