'use client';

import { motion, useReducedMotion } from 'framer-motion';
import PhotoPlaceholder from './PhotoPlaceholder';
import { useOpenBooking } from '@/lib/booking-context';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

const benefits = [
  { label: 'Präzise Beratung', detail: 'Vor jedem Schnitt' },
  { label: 'Saubere Übergänge', detail: 'Millimetergenau' },
  { label: 'Ruhige Atmosphäre', detail: 'Keine Massenabfertigung' },
  { label: 'Hochwertige Produkte', detail: 'Layrite, Reuzel, Bevel' },
  { label: 'Einfache Online-Buchung', detail: '24/7 verfügbar' },
];

const stats = [
  { value: '300+', label: 'Bewertungen' },
  { value: '4,9', label: 'Sterne' },
  { value: '5J.', label: 'Erfahrung' },
];

export default function SignatureExperience() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-ink-800 py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Bild links */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5]">
              <PhotoPlaceholder
                src="/images/signature-experience.jpg"
                alt="Detailaufnahme einer Bartrasur mit Klinge"
                variant="gallery"
                caption="signature-experience.jpg"
                className="absolute inset-0"
              />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-6 right-6 md:left-10 md:right-10 lg:-right-12 lg:left-auto lg:w-[280px]">
              <div className="border border-cream/15 bg-ink/95 backdrop-blur-sm divide-y divide-cream/10">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between px-5 py-4"
                  >
                    <span className="font-serif text-2xl text-copper">
                      {s.value}
                    </span>
                    <span className="text-xs uppercase tracking-widest2 text-muted">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text rechts */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="col-span-12 lg:col-span-6 lg:pl-6"
          >
            <div className="flex items-center gap-3 text-eyebrow uppercase text-copper">
              <span className="h-px w-8 bg-copper/60" />
              Signature Experience
            </div>

            <h2 className="mt-6 font-display uppercase text-display-md text-cream">
              Mehr als ein <HeadlineHighlight>Haarschnitt</HeadlineHighlight>.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-cream/70 max-w-xl">
              Ein guter Schnitt beginnt nicht mit der Maschine, sondern mit
              einem Blick für Form, Stil und Persönlichkeit. Bei NOIR &amp;
              BLADE nehmen wir uns Zeit für Beratung, Details und ein
              Ergebnis, das auch nach Tagen noch sitzt.
            </p>

            <ul className="mt-10 space-y-px border-y border-cream/10">
              {benefits.map((b, i) => (
                <li
                  key={b.label}
                  className="flex items-center justify-between gap-6 py-4 border-b last:border-b-0 border-cream/10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="numeric-marker italic text-sm">
                      0{i + 1}
                    </span>
                    <span className="text-cream">{b.label}</span>
                  </div>
                  <span className="text-xs uppercase tracking-widest2 text-muted text-right">
                    {b.detail}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openBooking()}
              className="mt-10 inline-flex items-center gap-3 border-b border-copper pb-1 text-eyebrow uppercase text-copper hover:gap-4 transition-all"
            >
              Termin buchen
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
