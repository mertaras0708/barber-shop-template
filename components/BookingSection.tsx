'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useOpenBooking } from '@/lib/booking-context';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  ['01', 'Service wählen', 'Schnitt, Bart oder Komplettpaket'],
  ['02', 'Barber wählen', 'Oder beliebig, wir teilen ein'],
  ['03', 'Datum & Uhrzeit', 'Freie Slots werden direkt angezeigt'],
  ['04', 'Bestätigung erhalten', 'Per SMS oder E-Mail'],
] as const;

export default function BookingSection() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();

  return (
    <section
      id="buchen"
      className="relative bg-ink-800 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Linke Spalte */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="text-eyebrow uppercase text-copper flex items-center gap-3">
              <span className="h-px w-8 bg-copper/60" />
              Online buchen
            </div>
            <h2 className="mt-6 font-display uppercase text-display-md text-cream">
              Buche deinen Termin in <HeadlineHighlight>Sekunden</HeadlineHighlight>.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-cream/70 max-w-md">
              Wähle Service, Barber und Wunschzeit. Wir bestätigen deinen
              Termin schnellstmöglich, meist innerhalb weniger Stunden.
            </p>

            <ul className="mt-10 space-y-5 border-t border-cream/10 pt-8">
              {steps.map(([num, title, sub]) => (
                <li key={num} className="flex items-start gap-5">
                  <span className="numeric-marker italic text-base mt-1">
                    {num}
                  </span>
                  <div>
                    <div className="text-cream">{title}</div>
                    <div className="text-sm text-cream/55 mt-0.5">{sub}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 border-t border-cream/10 pt-6 text-xs uppercase tracking-widest2 text-muted max-w-md">
              Demo-Buchungsflow. In der finalen Website werden Termine direkt
              in den Kalender des Barbers übertragen (z.&nbsp;B. Treatwell,
              Fresha, Google Calendar oder eigene API).
            </div>
          </motion.div>

          {/* CTA-Card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease, delay: 0.12 }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="relative border border-cream/12 bg-ink p-7 md:p-10">
              {/* Top Badge */}
              <div className="absolute -top-px left-8">
                <div className="bg-cream px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink">
                  Live verfügbar
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-px bg-cream/10 border border-cream/10">
                <Stat Icon={Calendar} label="Heute frei" value="6 Slots" />
                <Stat Icon={Clock} label="Nächster Slot" value="14:30" />
                <Stat Icon={Sparkles} label="Auswahl" value="3 Barber" />
              </div>

              {/* Headline */}
              <h3 className="mt-10 font-display uppercase text-2xl md:text-3xl text-cream leading-tight tracking-tight">
                Buchung in unter <HeadlineHighlight>60 Sekunden</HeadlineHighlight>.
              </h3>
              <p className="mt-4 text-sm text-cream/65 leading-relaxed max-w-sm">
                Sechs einfache Schritte, klare Verfügbarkeit, sofortige
                Bestätigung. Keine Anrufschleifen.
              </p>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => openBooking()}
                className="mt-8 group w-full inline-flex items-center justify-center gap-3 bg-cream px-7 py-4 text-[12px] uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-cream"
              >
                <Calendar className="h-4 w-4" aria-hidden />
                Termin buchen
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </button>

              {/* Secondary actions */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href="tel:+493012345678"
                  className="inline-flex items-center justify-center gap-2 border border-cream/20 px-4 py-3 text-[12px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Anrufen
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center gap-2 border border-cream/20 px-4 py-3 text-[12px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
                >
                  Standort
                </a>
              </div>

              <div className="mt-6 flex items-start gap-2 text-xs text-muted leading-relaxed">
                <ShieldCheck
                  className="h-3.5 w-3.5 mt-0.5 text-copper flex-shrink-0"
                  aria-hidden
                />
                <span>
                  Kostenlos stornierbar bis 6 Std. vor Termin. Keine
                  Kreditkarte erforderlich.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-ink px-3 py-4 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-eyebrow uppercase text-muted">
        <Icon className="h-3 w-3 text-copper" aria-hidden />
        <span className="truncate">{label}</span>
      </div>
      <div className="font-serif text-lg text-cream leading-none">
        {value}
      </div>
    </div>
  );
}
