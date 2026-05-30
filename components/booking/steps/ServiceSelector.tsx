'use client';

import { Check } from 'lucide-react';
import clsx from 'clsx';
import { services } from '@/data/services';
import { useBooking } from '@/lib/booking-context';
import StepFrame from '../StepFrame';
import HeadlineHighlight from '@/components/HeadlineHighlight';

export default function ServiceSelector() {
  const { state, setService } = useBooking();

  return (
    <StepFrame
      current={1}
      stepLabel="Service"
      title={
        <>
          Welcher{' '}
          <HeadlineHighlight case="inherit">Service</HeadlineHighlight>?
        </>
      }
      description="Wähle den Service, der zu dir passt. Du kannst die Auswahl im nächsten Schritt jederzeit ändern."
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {services.map((s) => {
          const selected = state.serviceId === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setService(s.id)}
                aria-pressed={selected}
                className={clsx(
                  'group relative w-full text-left p-5 md:p-6 border transition-all duration-300',
                  selected
                    ? 'border-copper bg-copper/[0.06]'
                    : 'border-cream/12 hover:border-cream/35',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={clsx(
                        'numeric-marker italic text-base',
                        selected ? 'text-copper' : 'text-cream/40',
                      )}
                    >
                      {s.index}
                    </span>
                    <h4 className="font-serif text-xl md:text-2xl text-cream leading-tight">
                      {s.title}
                    </h4>
                  </div>

                  <span
                    className={clsx(
                      'flex h-6 w-6 items-center justify-center border transition-all duration-300 flex-shrink-0',
                      selected
                        ? 'bg-copper border-copper text-ink'
                        : 'border-cream/25 text-transparent',
                    )}
                    aria-hidden
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>

                <p className="mt-3 text-sm text-cream/65 leading-relaxed line-clamp-2">
                  {s.description}
                </p>

                <div className="mt-5 flex items-baseline justify-between border-t border-cream/10 pt-4">
                  <span className="text-xs uppercase tracking-widest2 text-muted">
                    {s.duration}
                  </span>
                  <span
                    className={clsx(
                      'font-serif text-lg',
                      selected ? 'text-copper' : 'text-cream',
                    )}
                  >
                    {s.price}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </StepFrame>
  );
}
