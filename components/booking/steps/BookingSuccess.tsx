'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, Mail, Phone } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import HeadlineHighlight from '@/components/HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Formatiert die von Cal.com gemeldeten ISO-Zeiten in deutsche Datums-/Zeit-Texte.
 * Gibt null zurück, wenn keine gültige Startzeit vorliegt (-> Fallback im UI).
 */
function formatBookedDateTime(startIso?: string, endIso?: string) {
  if (!startIso) return null;
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return null;

  const date = new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(start);

  const clock = (d: Date) =>
    new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);

  let time = `${clock(start)} Uhr`;
  if (endIso) {
    const end = new Date(endIso);
    if (!Number.isNaN(end.getTime())) {
      time = `${clock(start)} – ${clock(end)} Uhr`;
    }
  }
  return { date, time };
}

export default function BookingSuccess() {
  const { state, close, reset, open } = useBooking();
  const reduce = useReducedMotion();

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? 'nächster freier Barber'
      : team.find((b) => b.id === state.barberId)?.name ?? '-';

  const customerName = state.customer.name.trim();
  const customerEmail = state.customer.email.trim();

  // Von Cal.com gemeldete Termin-Details (Datum/Uhrzeit).
  const dateTime = formatBookedDateTime(
    state.booking?.startTime,
    state.booking?.endTime,
  );
  const serviceTitle = service?.title ?? state.booking?.title ?? 'Dein Termin';
  const mainLine =
    barber && barber !== '-' ? `${serviceTitle} bei ${barber}` : serviceTitle;

  // Recap dynamisch: Service & Barber immer, Name/E-Mail nur falls im State.
  const recap: Array<{ label: string; value: string; accent?: boolean }> = [
    { label: 'Service', value: service?.title ?? '-' },
    { label: 'Barber', value: barber, accent: true },
  ];
  if (customerName) recap.push({ label: 'Name', value: customerName });
  if (customerEmail) recap.push({ label: 'E-Mail', value: customerEmail });

  // „Fertig": Modal schließen und State nach kurzer Pause zurücksetzen.
  const handleClose = () => {
    close();
    setTimeout(reset, 400);
  };

  // „Neuen Termin buchen": State zurücksetzen und wieder bei Schritt 1 starten.
  const handleNew = () => {
    reset();
    open();
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="flex flex-col items-center justify-center text-center h-full py-6"
    >
      {/* Gold-Seal */}
      <motion.div
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="relative mb-8"
      >
        <span className="absolute inset-0 -m-3 rounded-full border border-copper/30 animate-ping" />
        <span className="absolute inset-0 -m-6 rounded-full border border-copper/15" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-copper text-ink">
          <Check className="h-9 w-9" strokeWidth={2.4} aria-hidden />
        </div>
      </motion.div>

      <div className="text-eyebrow uppercase text-copper mb-4">
        Termin gebucht
      </div>
      <h3 className="font-display tracking-tight text-3xl md:text-4xl text-cream leading-[1.05] max-w-md">
        Danke,{' '}
        <HeadlineHighlight case="inherit">
          {customerName.split(' ')[0] || 'wir freuen uns'}
        </HeadlineHighlight>
        .
      </h3>
      {/* Hauptinfo: was genau wurde gebucht */}
      <div className="mt-7 w-full max-w-md">
        <div className="border border-copper/30 bg-copper/[0.05] px-6 py-5 text-center">
          <p className="font-serif text-xl md:text-2xl text-cream leading-snug">
            {mainLine}
          </p>
          {dateTime ? (
            <div className="mt-3 space-y-1">
              <p className="text-sm text-cream/85 capitalize">{dateTime.date}</p>
              <p className="font-serif text-lg text-copper">{dateTime.time}</p>
            </div>
          ) : (
            // Fallback: Cal.com hat keine Zeitdaten im Event mitgegeben
            <p className="mt-3 text-sm text-cream/60 leading-relaxed">
              Die genaue Uhrzeit findest du in deiner Bestätigung per E-Mail.
            </p>
          )}
        </div>
      </div>

      {/* Mini-Recap als saubere Pills statt Dot-Kette */}
      <div
        className={`mt-8 grid grid-cols-2 ${recap.length > 2 ? 'sm:grid-cols-4' : ''} gap-px bg-cream/10 border border-cream/12 text-sm max-w-2xl mx-auto`}
      >
        {recap.map((cell) => (
          <RecapCell
            key={cell.label}
            label={cell.label}
            value={cell.value}
            accent={cell.accent}
          />
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm text-cream/70">
        <Mail className="h-4 w-4 text-copper flex-shrink-0" aria-hidden />
        Du erhältst gleich eine Bestätigung per E-Mail.
      </p>

      {/* Kontakt-Hint */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
        <a
          href="tel:+493012345678"
          className="inline-flex items-center gap-2 hover:text-cream transition-colors"
        >
          <Phone className="h-3 w-3" aria-hidden />
          030 12345678
        </a>
        <a
          href="mailto:hello@noirblade.de"
          className="inline-flex items-center gap-2 hover:text-cream transition-colors"
        >
          <Mail className="h-3 w-3" aria-hidden />
          hello@noirblade.de
        </a>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={handleClose}
          className="flex-1 bg-cream px-6 py-3.5 text-[12px] uppercase tracking-widest2 text-ink hover:bg-cream/85 transition-colors"
        >
          Fertig
        </button>
        <button
          type="button"
          onClick={handleNew}
          className="flex-1 border border-cream/25 px-6 py-3.5 text-[12px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
        >
          Neuen Termin buchen
        </button>
      </div>
    </motion.div>
  );
}

function RecapCell({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-ink px-4 py-3 text-left">
      <div className="text-eyebrow uppercase text-muted">{label}</div>
      <div
        className={`mt-1.5 truncate font-serif text-base ${accent ? 'text-copper' : 'text-cream'}`}
      >
        {value}
      </div>
    </div>
  );
}
