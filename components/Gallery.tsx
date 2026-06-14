'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { gallery } from '@/data/gallery';
import { useOpenBooking } from '@/lib/booking-context';
import SectionHeader from './SectionHeader';
import PhotoPlaceholder from './PhotoPlaceholder';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

const spanClasses = {
  normal: 'md:col-span-4',
  tall: 'md:col-span-4 md:row-span-2',
  wide: 'md:col-span-8',
} as const;

const aspectClasses = {
  normal: 'aspect-[4/5]',
  tall: 'aspect-[3/8]',
  wide: 'aspect-[16/9]',
} as const;

export default function Gallery() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();

  return (
    <section
      id="galerie"
      className="relative bg-ink-800 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <SectionHeader
          title={
            <>
              Looks, die{' '}
              <HeadlineHighlight>überzeugen</HeadlineHighlight>.
            </>
          }
          description="Echte Inspiration für deinen nächsten Schnitt. Direkt aus dem Studio, ohne Filter, ohne Retusche."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(200px,auto)] gap-4 md:gap-5">
          {gallery.map((g, i) => {
            const span = g.span ?? 'normal';
            return (
              <motion.figure
                key={g.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
                className={`group flex flex-col ${spanClasses[span]}`}
              >
                <div
                  className={`relative w-full overflow-hidden ${aspectClasses[span]}`}
                >
                  <PhotoPlaceholder
                    src={g.image}
                    alt={g.caption}
                    variant={span === 'wide' ? 'wide' : 'gallery'}
                    sizes={span === 'wide' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                    className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                  />
                </div>
                {/* Caption unterhalb des Bildes statt als Overlay */}
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-serif text-base md:text-lg text-cream leading-snug">
                    {g.caption}
                  </span>
                  <span className="text-eyebrow uppercase text-muted whitespace-nowrap">
                    {g.label}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-cream/10 pt-8">
          <p className="text-cream/55 max-w-md text-sm leading-relaxed">
            Mehr Looks &amp; Behind-the-Scenes findest du auf{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-copper text-cream hover:text-copper"
            >
              @noirblade.berlin
            </a>
          </p>
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 text-eyebrow uppercase text-cream hover:text-copper transition-colors"
          >
            Termin buchen <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
