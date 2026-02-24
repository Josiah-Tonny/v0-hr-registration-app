import { NextResponse } from 'next/server';
import { fetchFaculties } from '@/services/database';

export async function GET() {
  try {
    const { data, error } = await fetchFaculties();

    if (error) {
      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculties' },
      { status: 500 }
    );
  }
}