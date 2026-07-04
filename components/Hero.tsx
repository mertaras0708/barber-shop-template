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
 * Das Bild `barber-hero.png` füllt den gesamten Hero
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
      {/* === Background Image === */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/barber-hero.png"
          alt="NOIR & BLADE Premium Barbershop — Trimmer im Studio-Licht"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="
            object-cover
            object-[50%_45%]
            md:object-center
            lg:object-[40%_center]
          "
        />
      </div>

      {/* === Cinematic Overlay ===
          Dezenter vertikaler Verlauf für Tiefe + horizontaler Links-Verlauf,
          der den Headline-Bereich links abdunkelt (Lesbarkeit) und rechts
          (Barber Chair) bewusst hell/atmosphärisch lässt. */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(180deg,rgba(5,5,4,0.5)_0%,rgba(5,5,4,0.12)_28%,rgba(5,5,4,0.2)_62%,rgba(5,5,4,0.78)_100%)]
        "
      />
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(90deg,rgba(5,5,4,0.68)_0%,rgba(5,5,4,0.34)_38%,rgba(5,5,4,0.06)_70%,transparent_100%)]
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

        {/* === Haupt-Content ===
            Mobile/Tablet: nach unten gewichtet (unverändert).
            Desktop (lg+): oben-mittig, ins obere Drittel gezogen und
            horizontal Richtung Bildmitte versetzt — der Blick startet am
            Leuchtkreis, fällt auf die Headline und läuft zum CTA. */}
        <div className="mx-auto flex w-full max-w-page flex-1 items-end lg:items-start justify-between gap-10 xl:gap-16 px-5 pb-16 md:px-10 md:pb-20 lg:pb-24 lg:pt-[5vh] xl:pt-[6.5vh] 2xl:pt-[8.5vh]">
          {/* Linke Spalte: Haupt-Content (~6–7 Spalten) — links-mittig verankert,
              klar begrenzte Breite, damit die Headline nicht in die rechte Box läuft. */}
          <div className="w-full max-w-xl lg:max-w-[600px] xl:max-w-[720px] 2xl:max-w-[820px]">
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
                mt-6 md:mt-9 font-display uppercase tracking-tight text-cream
                leading-[0.92]
                text-[clamp(2.7rem,9vw,3.75rem)]
                md:text-[clamp(3.6rem,7vw,5.75rem)]
                lg:text-[clamp(4.75rem,5.6vw,6rem)]
                2xl:text-[6.75rem]
              "
            >
              Präzise Fades.
              <br />
              <span className="text-cream/80">Saubere Konturen.</span>
              <br />
              <HeadlineHighlight className="lg:whitespace-nowrap">Dein neuer Look.</HeadlineHighlight>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="
                mt-7 md:mt-10 lg:mt-11 max-w-lg md:max-w-xl
                text-base md:text-xl lg:text-[1.35rem] leading-relaxed text-cream/80
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
              className="mt-9 md:mt-12 lg:mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
            >
              <button
                type="button"
                onClick={() => openBooking()}
                className="
                  group inline-flex items-center justify-between gap-4
                  bg-copper text-ink
                  px-6 py-3.5 md:px-10 md:py-4 lg:px-12 lg:py-[1.1rem]
                  text-[12px] md:text-[13px] uppercase tracking-widest2 font-semibold
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
                    inline-flex h-7 w-9 md:h-8 md:w-11 items-center justify-center
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
                mt-10 md:mt-14 lg:mt-16 flex flex-wrap items-center gap-x-5 gap-y-2
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

          {/* Rechte Spalte: editorial Module gestackt — CutsStrip oben (xl+), ServicesIndex unten (lg+).
              Bewusst dezent skaliert & abgesenkte Opacity, damit die Box als
              hochwertiges Detail wirkt und nicht mit der Headline konkurriert.
              Vertikal oben verankert (self-start), sodass die Box auf visueller
              Höhe des linken Hero-Contents sitzt — leichter Top-Offset für Balance. */}
          <div className="hidden lg:flex flex-col items-end gap-9 self-start lg:pt-[8vh] xl:pt-[10vh] 2xl:pt-[12vh] opacity-80 scale-90 xl:scale-[0.92] origin-top-right">
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
                border-t border-cream/10 py-2.5
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
        <li aria-hidden className="border-t border-cream/10" />
      </ul>
      <div className="mt-1 h-[2px] w-10 bg-copper" aria-hidden />
    </motion.aside>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HeroCutsStrip — kleine Editorial-Image-Strip (links, xl+)      */
/* ─────────────────────────────────────────────────────────────── */

const HERO_CUTS = [
  { src: '/images/echte-cuts-1.png', alt: 'Frischer Haarschnitt bei NOIR & BLADE' },
  { src: '/images/echte-cuts-2.png', alt: 'Sauberer Skin Fade von unseren Barbern' },
  { src: '/images/echte-cuts-3.png', alt: 'Gepflegter Bart-Look nach dem Termin' },
];

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
        {HERO_CUTS.map((cut) => (
          <div
            key={cut.src}
            className="
              group relative h-12 w-12 overflow-hidden
              border border-cream/12 bg-black/40
            "
          >
            <Image
              src={cut.src}
              alt={cut.alt}
              fill
              quality={70}
              sizes="48px"
              className="
                object-cover grayscale-[0.35]
                transition-[transform,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                group-hover:grayscale-0 group-hover:scale-105
              "
            />
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
