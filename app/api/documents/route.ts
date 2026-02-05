import { NextRequest, NextResponse } from 'next/server';
import { listDocuments } from '@/services/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const personId = searchParams.get('personId');

    const result = await listDocuments(personId || undefined);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
