'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Linke Spalte – Headline + Summary */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="font-display uppercase text-display-md text-cream">
              Das sagen <HeadlineHighlight>unsere</HeadlineHighlight> Kunden.
            </h2>

            <div className="mt-10 border-y border-cream/10 py-8 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-6xl text-copper leading-none">
                  4,9
                </span>
                <span className="font-serif text-2xl text-cream/60">/ 5</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-copper text-copper"
                    aria-hidden
                  />
                ))}
                <span className="ml-3 text-sm text-cream/65">
                  Basierend auf 300+ Bewertungen
                </span>
              </div>
            </div>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-eyebrow uppercase text-cream hover:text-copper transition-colors"
            >
              Alle Bewertungen auf Google <span aria-hidden>→</span>
            </a>
          </div>

          {/* Rechte Spalte – Reviews */}
          <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-8">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group relative border border-cream/10 p-8 md:p-10 hover:border-copper/30 transition-colors"
              >
                <div className="absolute -top-3 left-8 bg-ink px-2 numeric-marker text-sm italic">
                  0{i + 1}
                </div>

                <div className="flex items-center gap-1 mb-5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-copper text-copper"
                      aria-hidden
                    />
                  ))}
                </div>

                <blockquote className="font-serif text-xl md:text-2xl leading-snug text-cream">
                  „{t.quote}"
                </blockquote>

                <figcaption className="mt-6 flex items-center justify-between border-t border-cream/10 pt-5">
                  <div>
                    <div className="text-cream">{t.name}</div>
                    <div className="text-xs uppercase tracking-widest2 text-muted mt-1">
                      Verifizierter Kunde
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest2 text-copper">
                    {t.service}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
