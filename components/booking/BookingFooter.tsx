'use client';

import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { useBooking } from '@/lib/booking-context';
import { getCalLink } from '@/lib/cal-links';
import { STEP_COUNT } from './BookingProgress';

export default function BookingFooter() {
  const { state, back, next, canAdvance } = useBooking();

  const isFirst = state.step === 1;
  const isLast = state.step === STEP_COUNT; // Schritt 4: Cal.com-Terminwahl

  // Auf dem letzten Schritt steckt die Buchung im eingebetteten Cal.com-Kalender.
  // Der primäre Button dient hier nur noch als Fallback (in neuem Tab öffnen).
  const calUrl = getCalLink(state.barberId, state.serviceId);

  const handleNext = () => {
    if (!canAdvance) return;
    if (!isLast) {
      next();
      return;
    }
    // Fallback: Cal.com-Event in neuem Tab öffnen
    if (calUrl) {
      window.open(calUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const primaryDisabled = isLast ? !calUrl : !canAdvance;

  const primaryLabel = isLast
    ? 'In neuem Tab öffnen'
    : state.step === 3
      ? 'Weiter zur Terminwahl'
      : 'Weiter';

  return (
    <div className="border-t border-cream/10 bg-ink-800/60 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-4 md:py-5">
        <button
          type="button"
          onClick={back}
          disabled={isFirst}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-3 text-[12px] uppercase tracking-widest2 transition-colors',
            isFirst
              ? 'text-cream/25 cursor-not-allowed'
              : 'text-cream hover:text-copper',
          )}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Zurück
        </button>

        <div className="hidden sm:block text-xs text-muted tabular-nums">
          Schritt <span className="text-cream">{state.step}</span> / {STEP_COUNT}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={primaryDisabled}
          className={clsx(
            'inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 text-[12px] uppercase tracking-widest2 transition-all duration-300',
            primaryDisabled
              ? 'bg-cream/15 text-cream/40 cursor-not-allowed'
              : 'bg-cream text-ink hover:bg-cream/85',
          )}
        >
          {primaryLabel}
          {isLast ? (
            <ExternalLink className="h-4 w-4" aria-hidden />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}
