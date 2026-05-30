'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, Mail, Phone } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import HeadlineHighlight from '@/components/HeadlineHighlight';

const MONTHS = [
  'Jan.',
  'Feb.',
  'März',
  'Apr.',
  'Mai',
  'Juni',
  'Juli',
  'Aug.',
  'Sept.',
  'Okt.',
  'Nov.',
  'Dez.',
];
const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

function shortDate(iso: string | null) {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]}`;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function BookingSuccess() {
  const { state, close, reset } = useBooking();
  const reduce = useReducedMotion();

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? 'nächster freier Barber'
      : team.find((b) => b.id === state.barberId)?.name ?? '-';

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
        Termin angefragt
      </div>
      <h3 className="font-display tracking-tight text-3xl md:text-4xl text-cream leading-[1.05] max-w-md">
        Danke,{' '}
        <HeadlineHighlight case="inherit">
          {state.customer.name.split(' ')[0] || 'wir freuen uns'}
        </HeadlineHighlight>
        .
      </h3>
      <p className="mt-5 text-cream/70 max-w-md leading-relaxed">
        Deine Terminanfrage wurde vorbereitet. In der finalen Version erhält
        der Barber automatisch eine Benachrichtigung und der Termin wird im
        Kalender blockiert.
      </p>

      {/* Mini-Recap als saubere Pills statt Dot-Kette */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-cream/10 border border-cream/12 text-sm max-w-2xl mx-auto">
        <RecapCell label="Service" value={service?.title ?? '-'} />
        <RecapCell label="Barber" value={barber} />
        <RecapCell label="Datum" value={shortDate(state.date)} />
        <RecapCell label="Uhrzeit" value={state.time ?? '-'} accent />
      </div>

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

      <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          type="button"
          onClick={() => {
            close();
            // Nach kurzer Pause Reset, damit kein „Flash" beim Schließen
            setTimeout(reset, 400);
          }}
          className="flex-1 bg-cream px-6 py-3.5 text-[12px] uppercase tracking-widest2 text-ink hover:bg-cream/85 transition-colors"
        >
          Schließen
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
