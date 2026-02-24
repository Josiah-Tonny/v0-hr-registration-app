import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/services/database';

export async function GET() {
  try {
    const healthy = await checkDatabaseHealth();

    return NextResponse.json({
      status: healthy ? 'healthy' : 'unhealthy',
      database: healthy ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'unhealthy', database: 'error' },
      { status: 500 }
    );
  }
}