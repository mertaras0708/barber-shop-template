'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type PanInfo,
} from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';

const ease = [0.16, 1, 0.3, 1] as const;
const SWIPE_THRESHOLD = 60; // px

type Props = {
  services: Service[];
  onBook: (serviceId: string) => void;
};

/**
 * Premium 3D-Coverflow für Services.
 *
 * Desktop (lg+):
 *  - CSS-3D perspective: aktive Card mittig + frontal, Nachbarn mit rotateY ±35°,
 *    weiter entfernte Cards flacher und ausgeblendet.
 *  - Pfeil-Navigation, Pagination-Bullets, Keyboard (Arrow Left/Right),
 *    Drag/Swipe via Framer Motion.
 *  - prefers-reduced-motion respektiert.
 *
 * Mobile (<lg):
 *  - Native scroll-snap horizontal — keine 3D-Tricks, performant, premium.
 */
export default function ServiceCarousel({ services, onBook }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = services.length;
  const wrap = useCallback(
    (n: number) => ((n % total) + total) % total,
    [total],
  );
  const go = useCallback(
    (delta: number) => setActive((prev) => wrap(prev + delta)),
    [wrap],
  );
  const goTo = useCallback((i: number) => setActive(wrap(i)), [wrap]);

  // Keyboard navigation
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActive(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActive(total - 1);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [go, total]);

  // Drag/Swipe handler
  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 400) {
        go(offset.x > 0 ? -1 : 1);
      }
    },
    [go],
  );

  const activeService = services[active];

  return (
    <div className="relative">
      {/* === Desktop / Tablet: 3D-Coverflow === */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="Karussell"
        aria-label="Leistungen NOIR & BLADE"
        className="
          hidden lg:block relative outline-none
          focus-visible:ring-1 focus-visible:ring-copper/40 focus-visible:ring-offset-0
        "
        style={{ perspective: '1800px' }}
      >
        <motion.div
          className="relative mx-auto h-[560px] xl:h-[600px] w-full cursor-grab active:cursor-grabbing"
          drag={reduce ? false : 'x'}
          dragElastic={0.15}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {services.map((s, i) => {
            const offset = ((i - active + total) % total) - 0;
            // signed offset: -2, -1, 0, 1, 2 (kürzester Weg)
            const signed =
              offset > total / 2 ? offset - total : offset;
            const absOffset = Math.abs(signed);
            const isActive = absOffset < 0.5;
            const visible = absOffset <= 2;

            const translateX = signed * 280; // px
            const translateZ = -absOffset * 220;
            const rotateY = signed * -35;
            const scale = isActive ? 1 : 1 - Math.min(absOffset * 0.08, 0.18);
            const opacity = isActive
              ? 1
              : Math.max(0, 1 - absOffset * 0.45);
            const blurPx = isActive ? 0 : Math.min(absOffset * 2, 4);

            return (
              <motion.button
                type="button"
                key={s.id}
                onClick={() => (isActive ? onBook(s.id) : goTo(i))}
                aria-label={
                  isActive
                    ? `${s.title} buchen`
                    : `${s.title} in den Fokus rücken`
                }
                aria-current={isActive ? 'true' : undefined}
                animate={
                  reduce
                    ? { opacity: visible ? 1 : 0 }
                    : {
                        x: translateX,
                        z: translateZ,
                        rotateY,
                        scale,
                        opacity: visible ? opacity : 0,
                        filter: `blur(${blurPx}px)`,
                      }
                }
                transition={{ duration: 0.7, ease }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-280px',
                  marginLeft: '-200px',
                  transformStyle: 'preserve-3d',
                  pointerEvents: visible ? 'auto' : 'none',
                  zIndex: 10 - Math.round(absOffset * 10),
                }}
                className="
                  group block w-[400px] xl:w-[440px]
                  text-left outline-none
                  focus-visible:ring-1 focus-visible:ring-copper/60
                "
              >
                <ServiceCard service={s} isActive={isActive} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* === Arrow-Navigation === */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 xl:px-6">
          <NavButton
            direction="prev"
            onClick={() => go(-1)}
            label="Vorheriger Service"
          />
          <NavButton
            direction="next"
            onClick={() => go(1)}
            label="Nächster Service"
          />
        </div>
      </div>

      {/* === Bottom-Bar: Counter + Pagination + active CTA === */}
      <div className="mt-8 hidden lg:flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Zu Service ${s.index} springen`}
              aria-current={i === active}
              className="group relative h-[18px] flex items-center px-1"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ease-out ${
                  i === active
                    ? 'w-10 bg-copper'
                    : 'w-5 bg-cream/25 group-hover:bg-cream/55'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Inline-Recap der aktiven Card — feste Höhe verhindert Layout-Shift */}
        <div className="flex items-center justify-center gap-6 text-[11px] uppercase tracking-widest2 text-cream/55 min-h-[24px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`recap-${activeService.id}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease }}
              className="flex items-center gap-4"
            >
              <span className="font-display text-cream text-base tracking-[0.04em] normal-case">
                {String(active + 1).padStart(2, '0')}{' '}
                <span className="text-cream/40">/{' '}
                  {String(total).padStart(2, '0')}
                </span>
              </span>
              <span className="h-3 w-px bg-cream/20" />
              <span className="text-copper">{activeService.duration}</span>
              <span className="h-3 w-px bg-cream/20" />
              <span className="text-cream">{activeService.price}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* === Mobile: Scroll-Snap Horizontale Reihe === */}
      <MobileScroller
        services={services}
        onBook={onBook}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Service Card — Foto oben/zentral, Editorial-Block darunter    */
/* ─────────────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  isActive,
}: {
  service: Service;
  isActive: boolean;
}) {
  // Premium Hover nur auf aktiver Card. Inaktive Cards bleiben subdued —
  // sonst würde der Fokus zerrissen. Ease: exponential ease-out, 320ms.
  // Per @media (prefers-reduced-motion) werden alle transforms entschärft.
  return (
    <article
      data-active={isActive ? 'true' : undefined}
      className={`
        group/card relative h-[560px] xl:h-[600px] w-full overflow-hidden
        bg-charcoal text-cream
        border border-line
        transition-[transform,box-shadow,border-color]
        duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        motion-reduce:transition-none motion-reduce:transform-none
        ${
          isActive
            ? `
              border-line-strong cursor-pointer
              shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)]
              hover:-translate-y-1.5 hover:scale-[1.015]
              hover:border-cream/45
              hover:shadow-[0_80px_160px_-30px_rgba(0,0,0,0.95)]
            `
            : 'shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]'
        }
      `}
    >
      {/* Bild — füllt obere ~62 % */}
      <div className="relative h-[62%] w-full overflow-hidden bg-ink">
        <ServiceImage service={service} isActive={isActive} />

        {/* Hover-Layer: subtiles Brightness/Saturation-Lift via Overlay */}
        <div
          aria-hidden
          className={`
            pointer-events-none absolute inset-0
            transition-opacity duration-[420ms] ease-out
            ${isActive ? 'group-hover/card:opacity-100 opacity-0' : 'opacity-0'}
            bg-[radial-gradient(120%_80%_at_50%_20%,rgba(240,231,216,0.06),transparent_60%)]
          `}
        />

        {/* Top-Label: Kategorie + Index */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 z-10">
          <span className="text-[10px] uppercase tracking-widest2 text-cream/85 bg-black/30 backdrop-blur-sm px-2 py-1">
            {service.category}
          </span>
          <span className="font-display text-xl uppercase tracking-[0.02em] text-cream/85">
            {service.index}
          </span>
        </div>

        {/* Sanfter Bottom-Fade zum Editorial-Block */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* Editorial-Block */}
      <div className="relative flex h-[38%] flex-col justify-between gap-3 px-7 pb-7 pt-5">
        <div className="flex flex-col gap-2.5">
          <h3
            className={`
              font-display uppercase tracking-tight
              text-[clamp(1.5rem,2vw,2rem)] leading-[0.95] text-cream
              transition-colors duration-300
              ${isActive ? 'group-hover/card:text-cream' : ''}
            `}
          >
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-cream max-w-[34ch]">
            {service.short}
          </p>
        </div>

        <div
          className={`
            flex items-end justify-between gap-4 pt-4
            border-t transition-colors duration-300
            ${isActive ? 'border-line-strong group-hover/card:border-cream/40' : 'border-line'}
          `}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest2 text-cream/45">
              Ab
            </span>
            <span className="font-display text-2xl text-cream tracking-tight">
              {service.price.replace('ab ', '').replace(' €', '€')}
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[10px] uppercase tracking-widest2 text-cream/45">
              Dauer
            </span>
            <span className="font-display text-xl text-cream/85 tracking-tight">
              {service.duration}
            </span>
          </div>
        </div>

        {/* Bottom CTA — auf aktiver Card sichtbar, Pfeil läuft beim Hover nach rechts */}
        <div
          aria-hidden
          className={`
            mt-1 flex items-center justify-between text-[11px] uppercase tracking-widest2
            transition-opacity duration-500
            ${isActive ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <span className="text-copper">Buchen</span>
          <span className="flex items-center gap-2 text-cream/55 transition-colors duration-300 group-hover/card:text-cream">
            Tap zum Bestätigen
            <span
              aria-hidden
              className="inline-block transition-transform duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Service Image — echtes Foto + eleganter SVG-Fallback           */
/* ─────────────────────────────────────────────────────────────── */

function ServiceImage({
  service,
  isActive,
}: {
  service: Service;
  isActive: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!service.image) return;
    let alive = true;
    const probe = new window.Image();
    probe.onload = () => alive && setReady(true);
    probe.onerror = () => alive && setReady(false);
    probe.src = service.image;
    return () => {
      alive = false;
    };
  }, [service.image]);

  if (ready && service.image) {
    return (
      <Image
        src={service.image}
        alt={`${service.title} bei NOIR & BLADE`}
        fill
        sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, 86vw"
        className={`
          object-cover
          transition-[transform,filter]
          duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)]
          ${
            isActive
              ? 'scale-100 brightness-[0.92] group-hover/card:scale-[1.04] group-hover/card:brightness-100'
              : 'scale-105 brightness-75'
          }
        `}
      />
    );
  }

  return <ServiceFallback service={service} />;
}

function ServiceFallback({ service }: { service: Service }) {
  // Pro Kategorie eine eigene abstrakte Komposition
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-ink to-black overflow-hidden">
      <svg
        viewBox="0 0 440 360"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id={`fb-${service.id}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#C15A2A" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#C15A2A" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#050504" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`fb-line-${service.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#F0E7D8" stopOpacity="0" />
            <stop offset="50%" stopColor="#F0E7D8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F0E7D8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="440" height="360" fill={`url(#fb-${service.id})`} />
        {/* Geometrische Komposition variiert pro Kategorie */}
        {service.category === 'Cut' && (
          <g stroke="#F0E7D8" strokeOpacity="0.18" fill="none" strokeWidth="1">
            <ellipse cx="220" cy="170" rx="110" ry="90" />
            <path d="M 110 170 Q 220 70 330 170" />
            <line x1="40" y1="280" x2="400" y2="280" stroke="url(#fb-line-${service.id})" strokeWidth="0.8" />
          </g>
        )}
        {service.category === 'Beard' && (
          <g stroke="#F0E7D8" strokeOpacity="0.18" fill="none" strokeWidth="1">
            <path d="M 140 130 Q 220 240 300 130" />
            <path d="M 160 150 Q 220 220 280 150" strokeOpacity="0.12" />
            <line x1="60" y1="60" x2="380" y2="60" strokeOpacity="0.2" />
          </g>
        )}
        {service.category === 'Style' && (
          <g stroke="#F0E7D8" strokeOpacity="0.18" fill="none" strokeWidth="1">
            <circle cx="220" cy="180" r="60" />
            <circle cx="220" cy="180" r="100" strokeOpacity="0.12" />
            <line x1="40" y1="180" x2="400" y2="180" strokeOpacity="0.15" strokeDasharray="2 6" />
          </g>
        )}
      </svg>
      <div className="absolute bottom-3 right-3 text-[9px] uppercase tracking-widest2 text-cream/30 font-mono">
        {service.image?.replace('/images/', '') ?? 'service-placeholder'}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Navigation Button — Hero-CTA-Pattern                           */
/* ─────────────────────────────────────────────────────────────── */

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        pointer-events-auto group
        inline-flex h-14 w-14 items-center justify-center
        border border-cream/30 bg-ink/70 backdrop-blur-sm
        text-cream
        transition-[transform,background-color,border-color,color]
        duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:border-cream hover:bg-cream hover:text-ink
        active:scale-[0.96]
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-copper/60
        focus-visible:ring-offset-2 focus-visible:ring-offset-ink
      "
    >
      <Icon
        className={`h-5 w-5 transition-transform duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          direction === 'prev'
            ? 'group-hover:-translate-x-0.5'
            : 'group-hover:translate-x-0.5'
        }`}
        aria-hidden
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Mobile Scroller — scroll-snap, premium, performant             */
/* ─────────────────────────────────────────────────────────────── */

function MobileScroller({
  services,
  onBook,
  active,
  setActive,
}: {
  services: Service[];
  onBook: (id: string) => void;
  active: number;
  setActive: (n: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Sync scrollLeft → active index (für Pagination-Anzeige)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const cardW = el.firstElementChild
          ? (el.firstElementChild as HTMLElement).clientWidth
          : el.clientWidth;
        const idx = Math.round(el.scrollLeft / cardW);
        if (idx !== active && idx >= 0 && idx < services.length) {
          setActive(idx);
        }
        frame = null;
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [active, services.length, setActive]);

  return (
    <div className="lg:hidden">
      <div
        ref={ref}
        className="
          no-scrollbar
          flex snap-x snap-mandatory gap-4
          overflow-x-auto overscroll-x-contain
          px-5 pb-2 -mx-5
          [scroll-padding-inline:1.25rem]
        "
      >
        {services.map((s, i) => (
          <div
            key={s.id}
            className="snap-start shrink-0 w-[86vw] max-w-[420px]"
          >
            <button
              type="button"
              onClick={() => onBook(s.id)}
              aria-label={`${s.title} buchen`}
              className="block w-full text-left"
            >
              <ServiceCard service={s} isActive={i === active} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {services.map((s, i) => (
          <span
            key={s.id}
            aria-hidden
            className={`block h-[2px] transition-all duration-500 ${
              i === active ? 'w-8 bg-copper' : 'w-3 bg-cream/25'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
