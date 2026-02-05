import { NextRequest, NextResponse } from 'next/server';
import { listAuditLogs, getTimelineEvents } from '@/services/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const personId = searchParams.get('personId');
    const type = searchParams.get('type');

    if (!personId) {
      return NextResponse.json(
        { error: 'personId is required' },
        { status: 400 }
      );
    }

    if (type === 'timeline') {
      const result = await getTimelineEvents(personId);
      return NextResponse.json(result);
    }

    const result = await listAuditLogs(personId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
