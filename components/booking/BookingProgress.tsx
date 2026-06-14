'use client';

import { useBooking } from '@/lib/booking-context';

export const STEP_LABELS = [
  'Service',
  'Barber',
  'Kontakt',
  'Termin',
] as const;

export const STEP_COUNT = STEP_LABELS.length;

export default function BookingProgress() {
  const { state } = useBooking();
  const pct = (state.step / STEP_COUNT) * 100;

  return (
    <div className="relative">
      <div className="h-px w-full bg-cream/10" />
      <div
        className="absolute inset-y-0 left-0 h-px bg-copper transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
