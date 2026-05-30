'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useOpenBooking } from '@/lib/booking-context';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Fullscreen Cinematic Hero — NOIR & BLADE
 *
 * Das Bild `barber-template-hero-image.png` füllt den gesamten Hero
 * (inklusive Header-Bereich, da der Header `fixed` mit transparentem
 * Background ist). Darüber liegt ein subtler Gradient-Overlay für
 * Lesbarkeit. Content (Eyebrow → Headline → Subline → CTA → Trust)
 * sitzt links unten/mittig.
 */
export default function Hero() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();

  return (
    <section
      id="start"
      aria-labelledby="hero-claim"
      className="relative min-h-screen overflow-hidden bg-black text-cream"
    >
      {/* === Background Video (md+, kein reduced-motion) mit Image-Fallback === */}
      <div className="absolute inset-0 z-0">
        {/* Poster-Image: immer gerendert — Mobile, reduced-motion und als
            Video-Fallback bis das Video bereit ist. */}
        <Image
          src="/images/barber-template-hero-image.png"
          alt="NOIR & BLADE Premium Barbershop — Trimmer im Studio-Licht"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="
            object-cover
            object-[50%_45%]
            md:object-center
          "
        />
        {/* Video-Layer: ab md sichtbar, deaktiviert bei prefers-reduced-motion */}
        {!reduce && (
          <video
            src="/videos/hero-barber.mp4"
            poster="/images/barber-template-hero-image.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="
              hidden md:block
              absolute inset-0 h-full w-full
              object-cover object-center
            "
          />
        )}
      </div>

      {/* === Cinematic Overlay ===
          Subtle vertical darken + stronger left-bottom for content area.
          Bewahrt Bildqualität, gibt Lesbarkeit. */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(180deg,rgba(5,5,4,0.55)_0%,rgba(5,5,4,0.15)_25%,rgba(5,5,4,0.25)_60%,rgba(5,5,4,0.85)_100%)]
        "
      />
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[radial-gradient(80%_100%_at_15%_85%,rgba(5,5,4,0.7),transparent_55%)]
          hidden md:block
        "
      />

      {/* === Content === */}
      <div className="relative z-20 flex min-h-screen flex-col">
        {/* Spacer für fixed header — Top-Bar bleibt eigenständig sichtbar */}
        <div className="h-20 md:h-24 lg:h-28" aria-hidden />

        {/* Editorial Top-Bar */}
        <div className="mx-auto w-full max-w-page px-5 md:px-10">
          <div className="hidden md:grid grid-cols-3 items-start gap-4 text-[11px] uppercase tracking-widest2 text-cream/75">
            <div className="flex flex-col leading-tight">
              <span className="text-cream/55">ESTD</span>
              <span className="text-cream">2024</span>
            </div>
            <div className="text-center"></div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-cream">Noir</span>
              <span className="text-cream/55">Blade</span>
            </div>
          </div>
        </div>

        {/* === Haupt-Content: linksbündig, vertikal nach unten gewichtet === */}
        <div className="mx-auto flex w-full max-w-page flex-1 items-end justify-between gap-10 px-5 pb-16 md:px-10 md:pb-20 lg:pb-24">
          {/* Linke Spalte: Haupt-Content */}
          <div className="w-full max-w-xl lg:max-w-2xl">
            {/* SEO-H1: visuell durch Headline darunter abgedeckt */}
            <h1 id="hero-claim" className="sr-only">
              Präzise Fades. Saubere Konturen. Dein neuer Look. NOIR &amp; BLADE
              Premium Barbershop in Berlin.
            </h1>

            {/* Eyebrow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="flex items-center gap-3 text-eyebrow uppercase text-copper"
            >
              <span className="h-px w-8 bg-copper/60" />
              <span>Premium Barbershop · Berlin Mitte</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              aria-hidden
              className="
                mt-6 font-display uppercase tracking-tight text-cream
                leading-[0.95]
                text-[clamp(2.6rem,7vw,5.5rem)]
              "
            >
              Präzise Fades.
              <br />
              <span className="text-cream/80">Saubere Konturen.</span>
              <br />
              <HeadlineHighlight>Dein neuer Look.</HeadlineHighlight>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="
                mt-7 max-w-lg text-base md:text-lg leading-relaxed text-cream/80
              "
            >
              Cuts, Bartpflege und Skin Fades in einem Barbershop, der Handwerk
              und Stil verbindet.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.5 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => openBooking()}
                className="
                  group inline-flex items-center justify-between gap-4
                  bg-copper text-ink
                  px-6 py-4 text-[12px] uppercase tracking-widest2 font-semibold
                  transition-[transform,background-color]
                  duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                  hover:bg-copper-soft hover:-translate-y-0.5
                  active:translate-y-0
                  motion-reduce:transform-none motion-reduce:hover:transform-none
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/60
                  focus-visible:ring-offset-2 focus-visible:ring-offset-black
                "
              >
                <span>Termin buchen</span>
                <span
                  aria-hidden
                  className="
                    inline-flex h-7 w-9 items-center justify-center
                    border border-ink/20
                    transition-transform duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </button>

              <a
                href="tel:+493012345678"
                className="
                  group inline-flex items-center gap-3
                  px-4 py-3 text-[12px] uppercase tracking-widest2 text-cream/85
                  hover:text-cream transition-colors
                "
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>030 12345678</span>
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.65 }}
              className="
                mt-10 flex flex-wrap items-center gap-x-5 gap-y-2
                border-t border-cream/15 pt-5
                text-[11px] uppercase tracking-widest2 text-cream/65
              "
            >
              <span className="text-copper">Walk-Ins willkommen</span>
              <span className="hidden sm:inline text-cream/30">·</span>
              <span>Mo – Sa · 10:00 – 20:00</span>
              <span className="hidden sm:inline text-cream/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-cream">4,9</span>
                <span className="text-cream/55">Google-Rating</span>
              </span>
            </motion.div>
          </div>

          {/* Rechte Spalte: editorial Module gestackt — CutsStrip oben (xl+), ServicesIndex unten (lg+) */}
          <div className="hidden lg:flex flex-col items-end gap-10 self-end pb-2">
            <HeroCutsStrip />
            <HeroServicesIndex />
          </div>
        </div>

        {/* Subtle scroll-hint, nur Desktop */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute bottom-6 right-6
            hidden lg:flex items-center gap-3
            text-[10px] uppercase tracking-widest2 text-cream/45
          "
        >
          <span className="h-px w-10 bg-cream/30" />
          Scroll
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HeroServicesIndex — editorial Services-Liste (rechts, lg+)     */
/* ─────────────────────────────────────────────────────────────── */

const HERO_SERVICES = [
  'Haarschnitte',
  'Bartpflege',
  'Nassrasur',
  'Konturen',
  'Styling',
];

function HeroServicesIndex() {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      aria-label="Leistungen Übersicht"
      initial={reduce ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.45 }}
      className="hidden lg:flex w-[200px] xl:w-[220px] flex-col gap-4 self-end pb-2"
    >
      <div className="flex items-center gap-3 text-eyebrow uppercase text-copper">
        <span className="h-px w-6 bg-copper/70" />
        <span>Leistungen</span>
      </div>
      <ul className="flex flex-col">
        {HERO_SERVICES.map((s) => (
          <li key={s}>
            <a
              href="#leistungen"
              className="
                group flex items-center justify-between
                border-t border-cream/15 py-2.5
                font-display uppercase tracking-[0.04em]
                text-[15px] xl:text-[16px] text-cream
                transition-[color,padding-left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:pl-1 hover:text-copper
              "
            >
              <span>{s}</span>
              <span
                aria-hidden
                className="
                  text-[12px] text-cream/0
                  transition-[color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                  group-hover:text-copper group-hover:translate-x-0.5
                "
              >
                →
              </span>
            </a>
          </li>
        ))}
        <li aria-hidden className="border-t border-cream/15" />
      </ul>
      <div className="mt-1 h-[2px] w-10 bg-copper" aria-hidden />
    </motion.aside>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HeroCutsStrip — kleine Editorial-Image-Strip (links, xl+)      */
/* ─────────────────────────────────────────────────────────────── */

function HeroCutsStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.aside
      aria-label="Echte Cuts, echte Menschen"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.35 }}
      className="hidden xl:flex max-w-[260px] flex-col gap-3"
    >
      <div className="text-[11px] uppercase leading-snug tracking-widest2 text-cream">
        Echte Cuts.
        <br />
        Echte Menschen.
      </div>

      <div className="relative flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            aria-hidden
            className="
              relative h-14 w-14 overflow-hidden
              border border-cream/20 bg-black/40 backdrop-blur-[2px]
            "
          >
            <svg viewBox="0 0 56 56" className="h-full w-full opacity-80">
              <defs>
                <linearGradient
                  id={`cuts-tile-${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1C1815" />
                  <stop offset="100%" stopColor="#050504" />
                </linearGradient>
              </defs>
              <rect width="56" height="56" fill={`url(#cuts-tile-${i})`} />
              <g
                stroke="#F0E7D8"
                strokeWidth="0.6"
                fill="none"
                opacity="0.85"
              >
                <circle cx="28" cy="24" r="10" />
                <path d="M16 24 Q28 12 40 24" />
                <path d="M17 30 Q28 38 39 30" />
                <path d="M16 34 L16 50" />
                <path d="M40 34 L40 50" />
              </g>
            </svg>
          </div>
        ))}

        {/* Editorial Slash-Mark als Copper-Akzent */}
        <svg
          aria-hidden
          viewBox="0 0 36 36"
          className="ml-1 h-6 w-6 text-copper"
        >
          <path
            d="M6 30 L30 6 M10 6 L30 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </motion.aside>
  );
}
