'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useBooking } from '@/lib/booking-context';

const STORAGE_KEY = 'noirblade-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { state } = useBooking();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* SSR / privacy mode */
    }
  }, []);

  const handle = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  return (
    <div
      className={clsx(
        'fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-30 transition-all duration-500',
        visible && !state.isOpen
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 pointer-events-none',
      )}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-hidden={!visible || state.isOpen}
    >
      <div className="relative border border-cream/15 bg-ink/95 backdrop-blur-md p-5 mb-16 lg:mb-0">
        <button
          type="button"
          onClick={() => handle('essential')}
          className="absolute top-3 right-3 text-cream/60 hover:text-cream"
          aria-label="Banner schließen"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-eyebrow uppercase text-copper mb-2">
          Cookies &amp; Privatsphäre
        </div>
        <p id="cookie-title" className="text-sm text-cream/75 leading-relaxed pr-6">
          Wir nutzen Cookies für Statistik und ein besseres Erlebnis. Mehr in
          unserer{' '}
          <a href="/datenschutz" className="link-copper text-cream">
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => handle('all')}
            className="flex-1 bg-cream px-4 py-2.5 text-[11px] uppercase tracking-widest2 text-ink hover:bg-cream/85 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={() => handle('essential')}
            className="flex-1 border border-cream/25 px-4 py-2.5 text-[11px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
