'use client';

import { AlertTriangle, ArrowLeft, CalendarCheck, ExternalLink } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { getCalLink, getCalEmbedPath } from '@/lib/cal-links';
import StepFrame from '../StepFrame';
import CalEmbed from '../CalEmbed';
import HeadlineHighlight from '@/components/HeadlineHighlight';

export default function CalBookingStep() {
  const { state, goToStep } = useBooking();

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? null
      : team.find((b) => b.id === state.barberId);

  const calUrl = getCalLink(state.barberId, state.serviceId);
  const calPath = getCalEmbedPath(state.barberId, state.serviceId);

  const customerName = state.customer.name.trim();
  const customerEmail = state.customer.email.trim();
  const notes = state.customer.message.trim();

  return (
    <StepFrame
      current={4}
      stepLabel="Termin"
      title={
        <>
          Termin im{' '}
          <HeadlineHighlight case="inherit">Kalender</HeadlineHighlight> wählen.
        </>
      }
      description={
        service && barber
          ? `${service.title} bei ${barber.name} – wähle unten ein freies Datum und eine Uhrzeit. Die Buchung wird direkt im Kalender bestätigt.`
          : 'Wähle unten ein freies Datum und eine Uhrzeit. Die Buchung wird direkt im Kalender bestätigt.'
      }
    >
      {!calPath || !calUrl ? (
        // Fehlerhandling: keine passende Cal.com-Buchung hinterlegt
        <div className="flex flex-col items-center justify-center text-center py-10 px-4">
          <div className="flex h-14 w-14 items-center justify-center border border-copper/40 bg-copper/10 mb-6">
            <AlertTriangle className="h-6 w-6 text-copper" aria-hidden />
          </div>
          <p className="font-serif text-xl text-cream max-w-md leading-snug">
            Für diese Kombination aus Barber und Service ist aktuell keine
            Buchung verfügbar.
          </p>
          <p className="mt-3 text-sm text-cream/60 max-w-md leading-relaxed">
            Bitte wähle einen anderen Barber oder Service – oder kontaktiere uns
            direkt, wir finden einen passenden Termin für dich.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center justify-center gap-2 border border-cream/25 px-5 py-3 text-[12px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Barber ändern
            </button>
            <a
              href="tel:+493012345678"
              className="inline-flex items-center justify-center gap-2 bg-cream px-5 py-3 text-[12px] uppercase tracking-widest2 text-ink hover:bg-cream/85 transition-colors"
            >
              030 12345678
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Inline-Embed im bestehenden Modal */}
          <div className="border border-cream/12 bg-ink/40">
            <CalEmbed
              calPath={calPath}
              prefill={{
                name: customerName || undefined,
                email: customerEmail || undefined,
                notes: notes || undefined,
              }}
            />
          </div>

          {/* Fallback: in neuem Tab öffnen, falls der Embed nicht lädt */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="flex items-center gap-2 text-xs text-muted leading-relaxed">
              <CalendarCheck className="h-3.5 w-3.5 text-copper flex-shrink-0" aria-hidden />
              Datum und Uhrzeit werden final in Cal.com gewählt – der Termin
              wird automatisch im Kalender blockiert.
            </p>
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-cream/20 px-4 py-2.5 text-[12px] uppercase tracking-widest2 text-cream/85 hover:border-copper hover:text-copper transition-colors whitespace-nowrap"
            >
              In neuem Tab öffnen
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      )}
    </StepFrame>
  );
}
