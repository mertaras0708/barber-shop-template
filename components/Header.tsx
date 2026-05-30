'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import clsx from 'clsx';
import Logo from './Logo';
import { useOpenBooking } from '@/lib/booking-context';

const navItems = [
  { href: '#start', label: 'Start' },
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#preise', label: 'Preise' },
  { href: '#team', label: 'Team' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openBooking = useOpenBooking();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        id="top"
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-ink/85 backdrop-blur-md border-b border-cream/10'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <Logo />

          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[13px] tracking-wide text-cream/85 transition-colors hover:text-cream"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-copper transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+493012345678"
              className="hidden md:inline-flex items-center gap-2 text-[13px] tracking-wide text-cream/75 hover:text-cream transition-colors"
              aria-label="Anrufen"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">030 12345678</span>
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="
                group hidden md:inline-flex items-center gap-2
                bg-copper text-ink
                px-5 py-2.5 text-[12px] uppercase tracking-widest2 font-semibold
                transition-[transform,background-color]
                duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:bg-copper-soft hover:-translate-y-0.5
                motion-reduce:transform-none motion-reduce:hover:transform-none
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/60
                focus-visible:ring-offset-2 focus-visible:ring-offset-ink
              "
            >
              Termin buchen
              <span
                aria-hidden
                className="transition-transform duration-[280ms] group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden -mr-2 p-2 text-cream"
              aria-label="Menü öffnen"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] lg:hidden transition-all duration-500',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-ink"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={clsx(
            'relative h-full w-full bg-ink flex flex-col transition-transform duration-500',
            menuOpen ? 'translate-y-0' : '-translate-y-4',
          )}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream/10">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-mr-2 p-2 text-cream"
              aria-label="Menü schließen"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li
                  key={item.href}
                  className="border-b border-cream/10"
                  style={{
                    animation: menuOpen
                      ? `fadeUp 0.6s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1) both`
                      : 'none',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between py-5 font-serif text-3xl text-cream"
                  >
                    <span className="numeric-marker text-sm">
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                    <span className="text-copper text-base" aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 py-6 border-t border-cream/10 space-y-3">
            <a
              href="tel:+493012345678"
              className="flex items-center justify-center gap-2 border border-cream/20 py-3.5 text-sm tracking-wide text-cream"
            >
              <Phone className="h-4 w-4" /> 030 12345678
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openBooking();
              }}
              className="
                w-full flex items-center justify-center gap-2
                bg-copper text-ink py-3.5
                text-[12px] uppercase tracking-widest2 font-semibold
                transition-colors duration-300 hover:bg-copper-soft
              "
            >
              Termin buchen →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
