import { NextResponse } from 'next/server';
import { dbFetch } from '@/lib/db';

export async function GET() {
  try {
    const services = await dbFetch('SELECT * FROM services WHERE is_active = TRUE');
    return NextResponse.json(services);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
