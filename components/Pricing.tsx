'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { packages, priceList } from '@/data/pricing';
import { useOpenBooking } from '@/lib/booking-context';
import SectionHeader from './SectionHeader';
import HeadlineHighlight from './HeadlineHighlight';
import clsx from 'clsx';

// Mapping: Paket-ID → vorausgewählte Service-ID im Booking-Modal
const PACKAGE_TO_SERVICE: Record<string, string> = {
  'fresh-cut': 'herrenhaarschnitt',
  'signature-fade': 'skin-fade',
  'full-experience': 'haare-bart',
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Pricing() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();
  return (
    <section id="preise" className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <SectionHeader
          title={
            <>
              Klare Preise. <HeadlineHighlight>Saubere</HeadlineHighlight>{' '}
              Ergebnisse.
            </>
          }
          description="Unsere drei Signature-Pakete decken alles ab, von der schnellen Auffrischung bis zum vollen Pflege-Erlebnis."
        />

        {/* Pakete */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-px bg-cream/10 border border-cream/10">
          {packages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className={clsx(
                'relative flex flex-col gap-6 bg-ink p-8 md:p-10',
                p.featured && 'lg:scale-[1.02] lg:-my-px lg:-mx-px lg:z-10 lg:border lg:border-copper/40',
              )}
            >
              {p.featured && (
                <div className="absolute -top-px left-8 md:left-10">
                  <div className="bg-cream px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink font-medium">
                    Empfohlen
                  </div>
                </div>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-display uppercase tracking-tight text-3xl text-cream">{p.name}</h3>
                <span className="text-xs uppercase tracking-widest2 text-muted">
                  {p.duration}
                </span>
              </div>

              <p className="text-cream/65 leading-relaxed">{p.description}</p>

              <div className="flex items-baseline gap-2 border-y border-cream/10 py-5">
                <span className="text-eyebrow uppercase text-muted">ab</span>
                <span
                  className={clsx(
                    'font-display tracking-tight text-6xl',
                    p.featured ? 'text-copper' : 'text-cream',
                  )}
                >
                  {p.price}
                </span>
                <span className="font-display text-3xl text-cream/70">€</span>
              </div>

              <ul className="space-y-3">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-cream/80"
                  >
                    <Check
                      className="h-4 w-4 mt-0.5 flex-shrink-0 text-copper"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  openBooking({ serviceId: PACKAGE_TO_SERVICE[p.id] ?? null })
                }
                className={clsx(
                  'mt-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-[12px] uppercase tracking-widest2 transition-all duration-300',
                  p.featured
                    ? 'bg-cream text-ink hover:bg-cream/85'
                    : 'border border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink',
                )}
              >
                {p.name} buchen <span aria-hidden>→</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Detail-Preisliste */}
        <div className="mt-20 md:mt-24 grid grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-eyebrow uppercase text-copper flex items-center gap-3">
              <span className="h-px w-8 bg-copper/60" />
              Alle Leistungen
            </div>
            <h3 className="mt-5 font-display uppercase tracking-tight text-3xl md:text-4xl text-cream">
              Komplette Preisliste
            </h3>
            <p className="mt-5 text-cream/65 leading-relaxed">
              Preise verstehen sich inkl. MwSt. Trinkgeld optional. Bei
              komplexeren Wünschen sprechen wir vor Beginn über den finalen
              Preis. Keine Überraschungen.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ul className="border-t border-cream/10">
              {priceList.map((item) => (
                <li
                  key={item.service}
                  className="group flex items-center justify-between gap-4 border-b border-cream/10 py-5 hover:bg-ink-800 px-2 transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-serif text-xl md:text-2xl text-cream truncate">
                      {item.service}
                    </span>
                    <span className="hidden sm:inline-block flex-1 h-px bg-cream/10" />
                  </div>
                  <div className="flex items-baseline gap-5 whitespace-nowrap">
                    <span className="text-xs uppercase tracking-widest2 text-muted">
                      {item.duration}
                    </span>
                    <span className="font-serif text-lg text-copper">
                      {item.price}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
