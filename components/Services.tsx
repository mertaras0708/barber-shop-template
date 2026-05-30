'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { services } from '@/data/services';
import { useOpenBooking } from '@/lib/booking-context';
import ServiceCarousel from './ServiceCarousel';
import HeadlineHighlight from './HeadlineHighlight';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const openBooking = useOpenBooking();
  const reduce = useReducedMotion();

  return (
    <section
      id="leistungen"
      className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-36"
    >
      {/* Sehr subtile texturierte Tiefe — passt zur Hero-Wall */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-page px-5 md:px-10">
        {/* === Section-Header: kompakt, Editorial === */}
        <header className="grid grid-cols-12 gap-6 items-end max-w-page">
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 text-eyebrow uppercase text-copper"
            >
              <span className="h-px w-8 bg-copper/60" />
              <span>Leistungen</span>
            </motion.div>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: 0.08 }}
              className="mt-6 font-display uppercase text-display-md text-cream leading-[0.95]"
            >
              Sechs Services.{' '}
              <HeadlineHighlight>Ein Anspruch.</HeadlineHighlight>
            </motion.h2>
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="col-span-12 lg:col-span-4 lg:col-start-9 text-base leading-relaxed text-muted-cream max-w-md"
          >
            Wische, klicke oder navigiere durch unsere Signature-Services. Jeder
            Schnitt eine ruhige Geste, jedes Finish eine bewusste Entscheidung.
          </motion.p>
        </header>

        {/* === Premium 3D-Coverflow === */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease, delay: 0.18 }}
          className="mt-16 md:mt-20 lg:mt-24"
        >
          <ServiceCarousel
            services={services}
            onBook={(id) => openBooking({ serviceId: id })}
          />
        </motion.div>
      </div>
    </section>
  );
}
