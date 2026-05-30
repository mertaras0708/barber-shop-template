'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { Clock, CalendarDays } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { getSlotsForDay } from '@/data/availability';
import { team } from '@/data/team';
import StepFrame from '../StepFrame';
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

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]}`;
}

function groupByDaypart(slots: { time: string; available: boolean }[]) {
  const groups = {
    Vormittag: [] as typeof slots,
    Nachmittag: [] as typeof slots,
    Abend: [] as typeof slots,
  };
  slots.forEach((s) => {
    const h = parseInt(s.time.slice(0, 2), 10);
    if (h < 12) groups.Vormittag.push(s);
    else if (h < 17) groups.Nachmittag.push(s);
    else groups.Abend.push(s);
  });
  return groups;
}

export default function TimeSlotSelector() {
  const { state, setTime } = useBooking();

  const slots = useMemo(() => {
    if (!state.date || !state.barberId) return [];
    return getSlotsForDay(state.date, state.barberId);
  }, [state.date, state.barberId]);

  const groups = useMemo(() => groupByDaypart(slots), [slots]);
  const freeCount = slots.filter((s) => s.available).length;

  const barberName =
    state.barberId === 'any'
      ? 'Beliebig'
      : team.find((b) => b.id === state.barberId)?.name ?? '-';

  return (
    <StepFrame
      current={4}
      stepLabel="Uhrzeit"
      title={
        <>
          Wähle deine{' '}
          <HeadlineHighlight case="inherit">Uhrzeit</HeadlineHighlight>.
        </>
      }
      description={`${freeCount} freie Slots am ${state.date ? formatDate(state.date) : '-'}. Belegte Zeiten sind ausgegraut.`}
    >
      {/* Selection Recap */}
      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 border border-cream/12 bg-ink/40 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-sm text-cream/85">
          <CalendarDays className="h-3.5 w-3.5 text-copper" aria-hidden />
          {state.date ? formatDate(state.date) : '-'}
        </span>
        <span className="text-muted">·</span>
        <span className="text-sm text-cream/85">Barber: {barberName}</span>
      </div>

      {slots.length === 0 ? (
        <div className="border border-cream/12 bg-ink/40 p-8 text-center">
          <p className="text-cream/65">
            Für diesen Tag sind aktuell keine Slots verfügbar. Bitte wähle
            einen anderen Tag.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(Object.keys(groups) as Array<keyof typeof groups>).map((label) => {
            const list = groups[label];
            if (list.length === 0) return null;
            return (
              <section key={label}>
                <div className="flex items-center gap-3 text-eyebrow uppercase text-muted mb-3">
                  <Clock className="h-3 w-3 text-copper" aria-hidden />
                  <span>{label}</span>
                  <span className="h-px flex-1 bg-cream/10" />
                  <span className="text-cream/55">
                    {list.filter((s) => s.available).length} frei
                  </span>
                </div>
                <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {list.map((s) => {
                    const selected = state.time === s.time;
                    return (
                      <li key={s.time}>
                        <button
                          type="button"
                          disabled={!s.available}
                          onClick={() => s.available && setTime(s.time)}
                          aria-pressed={selected}
                          className={clsx(
                            'relative w-full py-3 text-sm tabular-nums border transition-all duration-200',
                            !s.available &&
                              'border-cream/8 text-cream/25 line-through cursor-not-allowed',
                            s.available && !selected &&
                              'border-cream/15 text-cream hover:border-copper hover:bg-copper/[0.06]',
                            selected &&
                              'bg-copper border-copper text-ink font-medium',
                          )}
                        >
                          {s.time}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </StepFrame>
  );
}
