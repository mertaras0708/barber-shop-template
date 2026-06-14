'use client';

import clsx from 'clsx';
import { Phone, ShieldCheck } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { STEP_LABELS } from './BookingProgress';

export default function BookingSidebar() {
  const { state, goToStep } = useBooking();

  const service = services.find((s) => s.id === state.serviceId);
  const barber =
    state.barberId === 'any'
      ? { name: 'Beliebig', role: 'Nächster freier Barber' }
      : team.find((b) => b.id === state.barberId);

  return (
    <aside className="h-full flex flex-col">
      {/* Step Nav */}
      <nav aria-label="Buchungsschritte" className="flex-1">
        <div className="text-eyebrow uppercase text-muted mb-5">
          Buchungsablauf
        </div>
        <ol className="space-y-px">
          {STEP_LABELS.map((label, i) => {
            const stepNum = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6;
            const active = state.step === stepNum;
            const done = state.step > stepNum;
            const reachable = stepNum < state.step; // nur bereits besuchte Schritte
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => reachable && goToStep(stepNum)}
                  disabled={!reachable && !active}
                  className={clsx(
                    'group flex items-center gap-4 w-full text-left py-3 transition-colors',
                    active && 'text-cream',
                    done && !active && 'text-cream/75 hover:text-cream',
                    !done && !active && 'text-cream/35 cursor-default',
                  )}
                >
                  <span
                    className={clsx(
                      'numeric-marker italic text-base w-6 flex-shrink-0',
                      active && 'text-copper',
                      done && !active && 'text-cream/55',
                      !done && !active && 'text-cream/25',
                    )}
                  >
                    {String(stepNum).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm uppercase tracking-widest2">
                    {label}
                  </span>
                  {active && (
                    <span className="h-px w-6 bg-copper" aria-hidden />
                  )}
                  {done && !active && (
                    <span className="text-copper text-xs" aria-hidden>
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Auswahl-Summary */}
      <div className="mt-8 border-t border-cream/10 pt-6 space-y-4">
        <div className="text-eyebrow uppercase text-copper">Deine Auswahl</div>

        <SummaryLine label="Service" value={service?.title} />
        <SummaryLine
          label="Barber"
          value={barber?.name}
          sub={barber?.role}
        />
        <SummaryLine
          label="Termin"
          value={state.step >= 4 ? 'Im Kalender wählen' : null}
        />

        {service && (
          <div className="border-t border-cream/10 pt-4 mt-4 flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-widest2 text-muted">
              Preis ab
            </span>
            <span className="font-serif text-xl text-copper">
              {service.price}
            </span>
          </div>
        )}
      </div>

      {/* Help */}
      <div className="mt-8 border-t border-cream/10 pt-6">
        <div className="text-eyebrow uppercase text-muted mb-3">
          Brauchst du Hilfe?
        </div>
        <a
          href="tel:+493012345678"
          className="flex items-center gap-3 text-sm text-cream hover:text-copper transition-colors"
        >
          <Phone className="h-3.5 w-3.5 text-copper" aria-hidden />
          030 12345678
        </a>
        <div className="mt-4 flex items-start gap-2 text-xs text-muted leading-relaxed">
          <ShieldCheck className="h-3.5 w-3.5 mt-0.5 text-copper flex-shrink-0" aria-hidden />
          <span>
            Kostenlos stornierbar bis 6 Std. vor Termin. Daten verschlüsselt
            übertragen.
          </span>
        </div>
      </div>
    </aside>
  );
}

function SummaryLine({
  label,
  value,
  sub,
}: {
  label: string;
  value?: string | null;
  sub?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs uppercase tracking-widest2 text-muted flex-shrink-0">
        {label}
      </span>
      <span className="text-right text-sm">
        {value ? (
          <span className="text-cream">{value}</span>
        ) : (
          <span className="text-cream/30">-</span>
        )}
        {sub && value && (
          <span className="block text-xs text-cream/45 mt-0.5">{sub}</span>
        )}
      </span>
    </div>
  );
}
