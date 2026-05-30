'use client';

import { useState } from 'react';
import { Calendar, Phone } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import clsx from 'clsx';
import { useBooking, useOpenBooking } from '@/lib/booking-context';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const { state } = useBooking();
  const openBooking = useOpenBooking();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 600);
  });

  // Verbergen, wenn Modal offen ist. Modal liegt darüber, doppelte CTA stört.
  const hide = state.isOpen;

  return (
    <div
      className={clsx(
        'lg:hidden fixed inset-x-0 bottom-0 z-40 transition-all duration-500',
        visible && !hide ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-px bg-cream/10 border-t border-cream/15">
        <a
          href="tel:+493012345678"
          className="flex items-center justify-center gap-2 bg-ink px-5 py-4 text-cream"
          aria-label="Anrufen"
        >
          <Phone className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex items-center justify-center gap-2 bg-cream py-4 text-[12px] uppercase tracking-widest2 text-ink"
        >
          <Calendar className="h-4 w-4" aria-hidden />
          Termin buchen
        </button>
      </div>
    </div>
  );
}
