'use client';

import { Pencil } from 'lucide-react';
import { useBooking, type BookingStep } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import StepFrame from '../StepFrame';
import HeadlineHighlight from '@/components/HeadlineHighlight';

const MONTHS = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];
const WEEKDAYS = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

function formatDate(iso: string | null) {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

type Row = { label: string; value: string; jumpTo?: BookingStep };

export default function BookingSummary() {
  const { state, goToStep } = useBooking();

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? { name: 'Beliebig, nächster freier Barber', role: '-' }
      : team.find((b) => b.id === state.barberId);

  const rows: Row[] = [
    { label: 'Service', value: service?.title ?? '-', jumpTo: 1 },
    { label: 'Barber', value: barber?.name ?? '-', jumpTo: 2 },
    { label: 'Datum', value: formatDate(state.date), jumpTo: 3 },
    { label: 'Uhrzeit', value: state.time ?? '-', jumpTo: 4 },
    { label: 'Dauer', value: service?.duration ?? '-' },
    { label: 'Preis', value: service?.price ?? '-' },
  ];

  const customerRows: Row[] = [
    { label: 'Name', value: state.customer.name || '-', jumpTo: 5 },
    { label: 'Telefon', value: state.customer.phone || '-', jumpTo: 5 },
    { label: 'E-Mail', value: state.customer.email || '-', jumpTo: 5 },
  ];

  return (
    <StepFrame
      current={6}
      stepLabel="Bestätigung"
      title={
        <>
          Alles{' '}
          <HeadlineHighlight case="inherit">korrekt</HeadlineHighlight>?
        </>
      }
      description="Bitte prüfe deine Angaben. Mit dem Absenden geht eine verbindliche Anfrage an den Barber. Du erhältst eine Bestätigung per E-Mail."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SummaryCard
          title="Termin"
          rows={rows}
          onJump={(s) => s && goToStep(s)}
        />
        <SummaryCard
          title="Kontakt"
          rows={customerRows}
          onJump={(s) => s && goToStep(s)}
          extra={
            state.customer.message ? (
              <div className="border-t border-cream/10 pt-4 mt-4">
                <div className="text-eyebrow uppercase text-muted mb-2">
                  Nachricht
                </div>
                <p className="text-sm text-cream/75 leading-relaxed">
                  {state.customer.message}
                </p>
              </div>
            ) : null
          }
        />
      </div>

      <p className="mt-6 text-xs text-muted leading-relaxed border-t border-cream/10 pt-5 max-w-2xl">
        <span className="text-copper">Hinweis:</span> Dies ist ein Demo-Flow. In
        der finalen Version wird der Termin automatisch im Kalender des Barbers
        eingetragen und du erhältst eine Bestätigung per E-Mail.
      </p>
    </StepFrame>
  );
}

function SummaryCard({
  title,
  rows,
  onJump,
  extra,
}: {
  title: string;
  rows: Row[];
  onJump: (step: BookingStep | undefined) => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="border border-cream/12 bg-ink/40 p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-eyebrow uppercase text-copper">{title}</div>
      </div>
      <ul className="divide-y divide-cream/10">
        {rows.map((r) => (
          <li
            key={r.label}
            className="group flex items-center justify-between py-2.5"
          >
            <span className="text-xs uppercase tracking-widest2 text-muted">
              {r.label}
            </span>
            <span className="flex items-center gap-3">
              <span className="text-cream text-right">{r.value}</span>
              {r.jumpTo && (
                <button
                  type="button"
                  onClick={() => onJump(r.jumpTo)}
                  aria-label={`${r.label} ändern`}
                  className="text-muted hover:text-copper transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  );
}
