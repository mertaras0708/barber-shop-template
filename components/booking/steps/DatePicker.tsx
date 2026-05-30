'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useBooking } from '@/lib/booking-context';
import { isClosed, hasAvailability } from '@/data/availability';
import StepFrame from '../StepFrame';
import HeadlineHighlight from '@/components/HeadlineHighlight';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
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

const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const startOfDay = (d: Date) => {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
};

type Cell = {
  iso: string;
  day: number;
  inMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  isClosed: boolean;
  hasSlots: boolean;
};

function buildMonth(year: number, month: number, barberId: string): Cell[] {
  const today = startOfDay(new Date());
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (first.getDay() + 6) % 7; // Mo = 0

  const cells: Cell[] = [];

  // Vorlauf-Tage (aus Vormonat)
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({
      iso: toISO(d),
      day: d.getDate(),
      inMonth: false,
      isPast: true,
      isToday: false,
      isClosed: true,
      hasSlots: false,
    });
  }

  // Tage des Monats
  for (let day = 1; day <= lastDay; day++) {
    const d = new Date(year, month, day);
    const iso = toISO(d);
    const isPast = startOfDay(d).getTime() < today.getTime();
    const closed = isClosed(iso);
    cells.push({
      iso,
      day,
      inMonth: true,
      isPast,
      isToday: startOfDay(d).getTime() === today.getTime(),
      isClosed: closed,
      hasSlots: !isPast && !closed && hasAvailability(iso, barberId),
    });
  }

  // Nachlauf-Tage bis zur nächsten vollen Woche (mind. 6 Reihen für stabile Höhe)
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const idx = cells.length - (firstWeekday + lastDay) + 1;
    const d = new Date(year, month + 1, idx);
    cells.push({
      iso: toISO(d),
      day: d.getDate(),
      inMonth: false,
      isPast: false,
      isToday: false,
      isClosed: true,
      hasSlots: false,
    });
    if (cells.length >= 42) break;
  }

  return cells;
}

export default function DatePicker() {
  const { state, setDate } = useBooking();
  const today = startOfDay(new Date());
  const [view, setView] = useState<{ y: number; m: number }>({
    y: today.getFullYear(),
    m: today.getMonth(),
  });

  const cells = useMemo(
    () => buildMonth(view.y, view.m, state.barberId ?? 'any'),
    [view, state.barberId],
  );

  // Nur nach vorne navigierbar bis +3 Monate
  const minView = { y: today.getFullYear(), m: today.getMonth() };
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 1);
  const canPrev = view.y > minView.y || view.m > minView.m;
  const canNext =
    new Date(view.y, view.m + 1, 1).getTime() <= maxDate.getTime();

  const move = (dir: -1 | 1) => {
    setView((v) => {
      const next = new Date(v.y, v.m + dir, 1);
      return { y: next.getFullYear(), m: next.getMonth() };
    });
  };

  return (
    <StepFrame
      current={3}
      stepLabel="Datum"
      title={
        <>
          Wann passt es dir{' '}
          <HeadlineHighlight case="inherit">am besten</HeadlineHighlight>?
        </>
      }
      description="Wähle einen Tag mit freien Slots. Sonntags geschlossen. Verfügbarkeit wird im nächsten Schritt detailliert angezeigt."
    >
      <div className="border border-cream/12 bg-ink/40 p-4 md:p-6">
        {/* Monats-Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => canPrev && move(-1)}
            disabled={!canPrev}
            aria-label="Vorheriger Monat"
            className={clsx(
              'inline-flex h-9 w-9 items-center justify-center border transition-colors',
              canPrev
                ? 'border-cream/20 text-cream hover:border-copper hover:text-copper'
                : 'border-cream/10 text-cream/25 cursor-not-allowed',
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="text-center">
            <div className="text-eyebrow uppercase text-copper mb-1">
              {view.y}
            </div>
            <div className="font-serif text-2xl md:text-3xl text-cream">
              {MONTHS[view.m]}
            </div>
          </div>

          <button
            type="button"
            onClick={() => canNext && move(1)}
            disabled={!canNext}
            aria-label="Nächster Monat"
            className={clsx(
              'inline-flex h-9 w-9 items-center justify-center border transition-colors',
              canNext
                ? 'border-cream/20 text-cream hover:border-copper hover:text-copper'
                : 'border-cream/10 text-cream/25 cursor-not-allowed',
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Wochentage */}
        <div className="mt-6 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="text-[10px] uppercase tracking-widest2 text-muted py-2"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Tage */}
        <div
          className="grid grid-cols-7 gap-1"
          role="grid"
          aria-label="Kalender"
        >
          {cells.map((c, i) => {
            const disabled = !c.inMonth || c.isPast || c.isClosed || !c.hasSlots;
            const selected = state.date === c.iso && c.inMonth;

            return (
              <button
                key={`${c.iso}-${i}`}
                type="button"
                role="gridcell"
                disabled={disabled}
                onClick={() => !disabled && setDate(c.iso)}
                aria-label={`${c.day}. ${MONTHS[view.m]} ${view.y}`}
                aria-selected={selected}
                className={clsx(
                  'group relative aspect-square flex flex-col items-center justify-center border transition-all duration-200',
                  !c.inMonth && 'opacity-0 pointer-events-none',
                  disabled && c.inMonth && 'opacity-30 cursor-not-allowed border-transparent',
                  !disabled && !selected &&
                    'border-cream/10 text-cream hover:border-copper hover:bg-copper/[0.06]',
                  c.isToday && !selected && 'border-copper/40',
                  selected && 'bg-copper border-copper text-ink',
                )}
              >
                <span
                  className={clsx(
                    'text-sm md:text-base',
                    selected ? 'font-medium' : '',
                  )}
                >
                  {c.day}
                </span>
                {c.hasSlots && !selected && (
                  <span
                    className={clsx(
                      'absolute bottom-1 h-1 w-1 rounded-full',
                      'bg-copper',
                    )}
                    aria-hidden
                  />
                )}
                {c.isClosed && c.inMonth && !c.isPast && (
                  <span className="absolute bottom-1 text-[8px] uppercase tracking-widest2 text-muted">
                    zu
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legende */}
        <div className="mt-6 border-t border-cream/10 pt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            Frei
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 border border-copper/60" />
            Heute
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 bg-copper" />
            Ausgewählt
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="text-cream/40">zu</span>
            Geschlossen
          </span>
        </div>
      </div>
    </StepFrame>
  );
}
