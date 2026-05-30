'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Star } from 'lucide-react';
import { team } from '@/data/team';
import { useOpenBooking } from '@/lib/booking-context';
import SectionHeader from './SectionHeader';
import PhotoPlaceholder from './PhotoPlaceholder';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Team() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();

  return (
    <section id="team" className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <SectionHeader
          title={
            <>
              Wähle deinen{' '}
              <HeadlineHighlight>Barber</HeadlineHighlight>.
            </>
          }
          description="Jeder Barber hat seinen eigenen Stil. Wähle den Menschen, der zu deinem Look passt, oder lass dich beraten."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((b, i) => (
            <motion.article
              key={b.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <PhotoPlaceholder
                  src={b.image}
                  alt={`Portrait von ${b.name}, ${b.role}`}
                  variant="portrait"
                  caption={b.image.split('/').pop()}
                  className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
              </div>

              {/* Name + Role unterhalb des Bildes, nicht overlay */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream leading-tight">
                    {b.name}
                  </h3>
                  <div className="mt-1.5 text-eyebrow uppercase text-copper">
                    {b.role}
                  </div>
                </div>
                {b.instagram && (
                  <a
                    href={`https://instagram.com/${b.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center border border-cream/25 text-cream/80 hover:bg-copper hover:text-ink hover:border-copper transition-colors flex-shrink-0"
                    aria-label={`Instagram von ${b.name}`}
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-cream/75">
                <Star className="h-3.5 w-3.5 fill-copper text-copper" aria-hidden />
                <span>{b.rating.toFixed(1).replace('.', ',')}</span>
                <span className="text-muted">top bewertet</span>
              </div>

              <p className="mt-4 text-cream/65 leading-relaxed">{b.bio}</p>

              <button
                type="button"
                onClick={() => openBooking({ barberId: b.id })}
                className="mt-6 inline-flex items-center justify-between border-t border-cream/15 pt-4 text-eyebrow uppercase text-cream group-hover:text-copper transition-colors w-full"
              >
                Bei {b.name} buchen
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
