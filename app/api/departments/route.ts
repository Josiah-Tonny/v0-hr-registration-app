import { NextResponse } from 'next/server';
import { fetchDepartments } from '@/services/database';

export async function GET() {
  try {
    const { data, error } = await fetchDepartments();

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
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}