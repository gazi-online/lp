import { format, addMinutes, parse, isBefore, isAfter, isEqual } from 'date-fns';

export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

export const generateSlots = (
  dayStart: string, 
  dayEnd: string, 
  duration: number, 
  buffer: number = 5,
  bookedSlots: { start: string, end: string }[]
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let current = parse(dayStart, 'HH:mm:ss', new Date());
  const end = parse(dayEnd, 'HH:mm:ss', new Date());

  while (isBefore(current, end)) {
    const slotEnd = addMinutes(current, duration);
    if (isAfter(slotEnd, end)) break;

    const slotStartStr = format(current, 'HH:mm:ss');
    const slotEndStr = format(slotEnd, 'HH:mm:ss');

    // Check availability
    const isBooked = bookedSlots.some(booked => {
        // Simple overlap check
        // (StartA < EndB) && (EndA > StartB)
        return (slotStartStr < booked.end) && (slotEndStr > booked.start);
    });

    slots.push({
      start: format(current, 'HH:mm'),
      end: format(slotEnd, 'HH:mm'),
      isAvailable: !isBooked
    });

    current = addMinutes(slotEnd, buffer); // Add buffer
  }

  return slots;
};
