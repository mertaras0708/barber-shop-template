'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useBooking } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { submitBooking, type BookingData } from '@/lib/submit-booking';

export default function BookingFooter() {
  const { state, back, next, canAdvance, setPhase } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFirst = state.step === 1;
  const isLast = state.step === 6;

  const handleNext = async () => {
    if (!canAdvance) return;
    if (!isLast) {
      next();
      return;
    }

    // Submit
    setError(null);
    setSubmitting(true);
    setPhase('submitting');

    const service = services.find((s) => s.id === state.serviceId);
    const barberName =
      state.barberId === 'any'
        ? 'Beliebig'
        : team.find((b) => b.id === state.barberId)?.name ?? '-';

    const data: BookingData = {
      serviceId: state.serviceId!,
      serviceName: service?.title ?? '-',
      duration: service?.durationMinutes ?? 0,
      priceFrom: service?.priceFrom ?? 0,
      barberId: state.barberId!,
      barberName,
      date: state.date!,
      time: state.time!,
      customerName: state.customer.name.trim(),
      customerPhone: state.customer.phone.trim(),
      customerEmail: state.customer.email.trim(),
      message: state.customer.message.trim() || undefined,
      privacyAccepted: state.customer.privacyAccepted,
    };

    const result = await submitBooking(data);
    setSubmitting(false);
    if (result.ok) {
      setPhase('success');
    } else {
      setError(result.error);
      setPhase('form');
    }
  };

  return (
    <div className="border-t border-cream/10 bg-ink-800/60 backdrop-blur-sm">
      {error && (
        <div className="px-6 md:px-10 py-3 border-b border-copper/40 bg-copper/10 text-sm text-cream">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-4 md:py-5">
        <button
          type="button"
          onClick={back}
          disabled={isFirst || submitting}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-3 text-[12px] uppercase tracking-widest2 transition-colors',
            isFirst || submitting
              ? 'text-cream/25 cursor-not-allowed'
              : 'text-cream hover:text-copper',
          )}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Zurück
        </button>

        <div className="hidden sm:block text-xs text-muted tabular-nums">
          Schritt <span className="text-cream">{state.step}</span> / 6
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance || submitting}
          className={clsx(
            'inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 text-[12px] uppercase tracking-widest2 transition-all duration-300',
            !canAdvance || submitting
              ? 'bg-cream/15 text-cream/40 cursor-not-allowed'
              : 'bg-cream text-ink hover:bg-cream/85',
          )}
        >
          {submitting && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          )}
          {isLast
            ? submitting
              ? 'Wird gesendet …'
              : 'Termin verbindlich anfragen'
            : 'Weiter'}
          {!isLast && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
