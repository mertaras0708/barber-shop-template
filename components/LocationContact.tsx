'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

const hours = [
  ['Montag - Freitag', '10:00 - 20:00'],
  ['Samstag', '10:00 - 18:00'],
  ['Sonntag', 'Geschlossen'],
];

export default function LocationContact() {
  const reduce = useReducedMotion();
  return (
    <section
      id="kontakt"
      className="relative bg-ink-800 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Linke Spalte – Info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="text-eyebrow uppercase text-copper flex items-center gap-3">
              <span className="h-px w-8 bg-copper/60" />
              Standort
            </div>

            <h2 className="mt-6 font-display uppercase text-display-md text-cream">
              Besuch uns im <HeadlineHighlight>Studio</HeadlineHighlight>.
            </h2>

            <div className="mt-10 space-y-px border-t border-cream/10">
              <ContactRow Icon={MapPin} label="Adresse">
                <a
                  href="https://maps.google.com/?q=Musterstraße+24+10115+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-copper text-cream"
                >
                  Musterstraße 24
                  <br />
                  10115 Berlin
                </a>
              </ContactRow>
              <ContactRow Icon={Phone} label="Telefon">
                <a href="tel:+493012345678" className="link-copper text-cream">
                  030 12345678
                </a>
              </ContactRow>
              <ContactRow Icon={Mail} label="E-Mail">
                <a
                  href="mailto:hello@noirblade.de"
                  className="link-copper text-cream"
                >
                  hello@noirblade.de
                </a>
              </ContactRow>
              <ContactRow Icon={Clock} label="Öffnungszeiten">
                <ul className="space-y-1.5 text-cream">
                  {hours.map(([day, time]) => (
                    <li key={day} className="flex justify-between gap-6">
                      <span className="text-cream/70">{day}</span>
                      <span className={time === 'Geschlossen' ? 'text-muted' : ''}>
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </ContactRow>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Musterstraße+24+10115+Berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-cream px-6 py-3.5 text-[12px] uppercase tracking-widest2 text-ink hover:bg-cream/85 transition-colors"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Route starten
              </a>
              <a
                href="tel:+493012345678"
                className="inline-flex items-center justify-center gap-2 border border-cream/25 px-6 py-3.5 text-[12px] uppercase tracking-widest2 text-cream hover:border-copper hover:text-copper transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Anrufen
              </a>
            </div>
          </motion.div>

          {/* Rechte Spalte – Map */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="col-span-12 lg:col-span-7"
          >
            <MapPlaceholder />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-6 py-6 border-b border-cream/10">
      <div className="flex items-center gap-3 min-w-[110px]">
        <Icon className="h-3.5 w-3.5 text-copper" aria-hidden />
        <span className="text-eyebrow uppercase text-muted">{label}</span>
      </div>
      <div className="flex-1 text-cream not-italic leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[5/6] border border-cream/15 overflow-hidden bg-ink">
      {/* Subtle map-like grid */}
      <svg
        viewBox="0 0 600 700"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-60"
        aria-hidden
      >
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0E7D8" strokeOpacity="0.05" strokeWidth="0.5" />
          </pattern>
          <pattern id="map-grid-big" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#F0E7D8" strokeOpacity="0.08" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="600" height="700" fill="url(#map-grid)" />
        <rect width="600" height="700" fill="url(#map-grid-big)" />

        {/* Streets */}
        <path d="M 0 200 Q 200 180 600 240" stroke="#F0E7D8" strokeOpacity="0.18" strokeWidth="2" fill="none" />
        <path d="M 0 380 L 600 360" stroke="#F0E7D8" strokeOpacity="0.18" strokeWidth="2.5" fill="none" />
        <path d="M 0 520 Q 300 540 600 510" stroke="#F0E7D8" strokeOpacity="0.14" strokeWidth="1.5" fill="none" />
        <path d="M 180 0 Q 200 350 220 700" stroke="#F0E7D8" strokeOpacity="0.18" strokeWidth="2" fill="none" />
        <path d="M 420 0 Q 400 350 380 700" stroke="#F0E7D8" strokeOpacity="0.16" strokeWidth="2" fill="none" />

        {/* Park blob */}
        <ellipse cx="120" cy="500" rx="90" ry="60" fill="#C15A2A" fillOpacity="0.04" />
        {/* Building blocks */}
        <rect x="240" y="270" width="80" height="60" fill="#F0E7D8" fillOpacity="0.03" />
        <rect x="450" y="430" width="100" height="80" fill="#F0E7D8" fillOpacity="0.03" />
        <rect x="260" y="430" width="60" height="50" fill="#F0E7D8" fillOpacity="0.03" />
      </svg>

      {/* Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <span className="absolute inset-0 -m-6 rounded-full bg-copper/20 animate-ping" />
          <span className="absolute inset-0 -m-3 rounded-full bg-copper/30" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-copper text-ink shadow-lg">
            <MapPin className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-5 left-5 right-5 md:left-8 md:right-auto md:max-w-[280px] border border-cream/15 bg-ink/90 backdrop-blur-md p-5">
        <div className="text-eyebrow uppercase text-copper">NOIR &amp; BLADE</div>
        <div className="mt-1 font-serif text-lg text-cream">
          Musterstraße 24
        </div>
        <div className="text-sm text-cream/55 mt-0.5">10115 Berlin · Mitte</div>
        <div className="mt-4 flex items-center gap-2 text-xs text-cream/75">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Jetzt geöffnet · bis 20:00
        </div>
      </div>
    </div>
  );
}
