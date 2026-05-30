'use client';

import { Check, Star, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { team } from '@/data/team';
import { useBooking } from '@/lib/booking-context';
import StepFrame from '../StepFrame';
import PhotoPlaceholder from '../../PhotoPlaceholder';
import HeadlineHighlight from '@/components/HeadlineHighlight';

export default function BarberSelector() {
  const { state, setBarber } = useBooking();

  return (
    <StepFrame
      current={2}
      stepLabel="Barber"
      title={
        <>
          Bei wem möchtest du{' '}
          <HeadlineHighlight case="inherit">buchen</HeadlineHighlight>?
        </>
      }
      description={`Jeder Barber hat seinen eigenen Stil, oder wähle „Beliebig" und wir teilen dich dem nächsten freien Barber zu.`}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {team.map((b) => {
          const selected = state.barberId === b.id;
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => setBarber(b.id)}
                aria-pressed={selected}
                className={clsx(
                  'group relative w-full text-left flex gap-4 p-3 md:p-4 border transition-all duration-300',
                  selected
                    ? 'border-copper bg-copper/[0.06]'
                    : 'border-cream/12 hover:border-cream/35',
                )}
              >
                <div className="relative h-24 w-20 sm:h-28 sm:w-24 flex-shrink-0 overflow-hidden">
                  <PhotoPlaceholder
                    src={b.image}
                    alt={`Portrait von ${b.name}`}
                    variant="portrait"
                    className="absolute inset-0"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif text-xl text-cream leading-tight">
                        {b.name}
                      </h4>
                      <span
                        className={clsx(
                          'flex h-5 w-5 items-center justify-center border transition-all flex-shrink-0',
                          selected
                            ? 'bg-copper border-copper text-ink'
                            : 'border-cream/25 text-transparent',
                        )}
                        aria-hidden
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                    </div>
                    <div className="text-eyebrow uppercase text-copper mt-1.5">
                      {b.role}
                    </div>
                    <p className="mt-2 text-xs text-cream/60 leading-relaxed line-clamp-2">
                      {b.bio}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="h-3 w-3 fill-copper text-copper" aria-hidden />
                    <span className="text-xs text-cream/80">
                      {b.rating.toFixed(1).replace('.', ',')}
                    </span>
                    <span className="text-xs text-muted">
                      · top bewertet
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}

        {/* Beliebig */}
        <li className="sm:col-span-2">
          <button
            type="button"
            onClick={() => setBarber('any')}
            aria-pressed={state.barberId === 'any'}
            className={clsx(
              'group relative w-full text-left flex items-center gap-5 p-4 md:p-5 border transition-all duration-300',
              state.barberId === 'any'
                ? 'border-copper bg-copper/[0.06]'
                : 'border-cream/12 border-dashed hover:border-cream/35',
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center border border-cream/15 flex-shrink-0">
              <Sparkles className="h-5 w-5 text-copper" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-lg text-cream">
                Beliebig, nächster freier Barber
              </h4>
              <p className="text-xs text-cream/60 mt-1">
                Wir teilen dich automatisch dem nächsten verfügbaren Barber zu.
              </p>
            </div>
            <span
              className={clsx(
                'flex h-5 w-5 items-center justify-center border transition-all flex-shrink-0',
                state.barberId === 'any'
                  ? 'bg-copper border-copper text-ink'
                  : 'border-cream/25 text-transparent',
              )}
              aria-hidden
            >
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
          </button>
        </li>
      </ul>
    </StepFrame>
  );
}
