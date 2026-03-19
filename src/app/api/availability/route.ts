import { NextResponse } from 'next/server';
import { dbFetch } from '@/lib/db';
import { generateSlots } from '@/lib/slots';
import { format, getDay } from 'date-fns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');
  const date = searchParams.get('date');

  if (!serviceId || !date) {
    return NextResponse.json({ error: 'Missing serviceId or date' }, { status: 400 });
  }

  try {
    // 1. Get Service Info
    const [service] = await dbFetch<any>('SELECT duration_minutes FROM services WHERE id = ?', [serviceId]);
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    // 2. Get Day of Week
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = days[getDay(new Date(date))];

    // 3. Get Working Hours
    const [config] = await dbFetch<any>('SELECT start_time, end_time, is_closed FROM availability_config WHERE day_of_week = ?', [dayName]);
    if (!config || config.is_closed) {
      return NextResponse.json({ slots: [], message: 'Closed on this day' });
    }

    // 4. Get Existing Bookings
    const booked = await dbFetch<any>(
      'SELECT start_time as start, end_time as end FROM appointments WHERE appointment_date = ? AND status != "cancelled"', 
      [date]
    );

    // 5. Generate Slots
    const slots = generateSlots(
      config.start_time, 
      config.end_time, 
      service.duration_minutes, 
      10, // 10 min buffer
      booked
    );

    return NextResponse.json(slots);

  } catch (error) {
    console.error('Availability API Error:', error);
    return NextResponse.json({ error: 'System busy, try again.' }, { status: 500 });
  }
}
