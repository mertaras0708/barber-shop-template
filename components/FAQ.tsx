'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '@/data/faq';
import SectionHeader from './SectionHeader';
import HeadlineHighlight from './HeadlineHighlight';
import clsx from 'clsx';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32">
            <SectionHeader
              title={
                <>
                  Häufige{' '}
                  <HeadlineHighlight>Fragen</HeadlineHighlight>.
                </>
              }
              description="Alles Wichtige zu Terminen, Leistungen und Ablauf, kompakt beantwortet. Noch eine Frage offen?"
            />
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2 text-eyebrow uppercase text-cream hover:text-copper transition-colors"
            >
              Direkt kontaktieren <span aria-hidden>→</span>
            </a>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ul className="border-t border-cream/10">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className="border-b border-cream/10">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group w-full flex items-start justify-between gap-6 py-6 text-left"
                    >
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className="numeric-marker italic text-sm flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-serif text-lg md:text-xl text-cream group-hover:text-copper transition-colors">
                          {f.question}
                        </span>
                      </div>
                      <span
                        className={clsx(
                          'flex h-7 w-7 flex-shrink-0 items-center justify-center border border-cream/20 transition-all duration-500',
                          isOpen ? 'rotate-45 border-copper bg-copper/10' : '',
                        )}
                        aria-hidden
                      >
                        <Plus className="h-3.5 w-3.5 text-cream" />
                      </span>
                    </button>
                    <div
                      className={clsx(
                        'grid transition-all duration-500 ease-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-7' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-cream/65 leading-relaxed pl-10 pr-10 max-w-2xl">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
