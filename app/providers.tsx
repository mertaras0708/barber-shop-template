'use client';

import { BookingProvider } from '@/lib/booking-context';
import BookingModal from '@/components/booking/BookingModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      {children}
      <BookingModal />
    </BookingProvider>
  );
}
