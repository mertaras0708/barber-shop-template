'use client';

import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import { useOpenBooking } from '@/lib/booking-context';
import HeadlineHighlight from './HeadlineHighlight';

const navColumns = [
  {
    title: 'Salon',
    links: [
      { href: '#start', label: 'Start' },
      { href: '#leistungen', label: 'Leistungen' },
      { href: '#team', label: 'Team' },
      { href: '#galerie', label: 'Galerie' },
    ],
  },
  {
    title: 'Buchen',
    links: [
      { href: '#preise', label: 'Preise' },
      { href: '#buchen', label: 'Termin buchen' },
      { href: '#kontakt', label: 'Standort' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
      { href: '/agb', label: 'AGB' },
    ],
  },
];

export default function Footer() {
  const openBooking = useOpenBooking();
  return (
    <footer className="relative bg-ink-900 border-t border-cream/10 pt-20 pb-8">
      <div className="mx-auto max-w-page px-6 md:px-10">
        {/* Top: Claim */}
        <div className="grid grid-cols-12 gap-10 pb-16 border-b border-cream/10">
          <div className="col-span-12 lg:col-span-5">
            <Logo variant="stacked" />
            <p className="mt-8 font-display text-3xl md:text-4xl uppercase tracking-tight text-cream leading-[1.05] max-w-md">
              Premium Cuts. <HeadlineHighlight>Clean Fades.</HeadlineHighlight>{' '}
              Sharp Details.
            </p>
            <p className="mt-6 text-sm text-cream/55 max-w-md leading-relaxed">
              Moderner Premium-Barbershop für präzise Fades, Herrenhaarschnitte,
              Bartpflege und Nassrasur. Mitten in Berlin.
            </p>

            <div className="mt-8 flex gap-3">
              <SocialLink href="https://instagram.com" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://facebook.com" label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://maps.google.com" label="Google Maps">
                <MapPin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Nav-Spalten */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.title}>
                <div className="text-eyebrow uppercase text-copper">
                  {col.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href === '#buchen' ? (
                        <button
                          type="button"
                          onClick={() => openBooking()}
                          className="text-sm text-cream/75 hover:text-cream transition-colors text-left"
                        >
                          {l.label}
                        </button>
                      ) : (
                        <a
                          href={l.href}
                          className="text-sm text-cream/75 hover:text-cream transition-colors"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Kontakt */}
          <div className="col-span-12 lg:col-span-3">
            <div className="text-eyebrow uppercase text-copper">Kontakt</div>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-cream/80">
                <MapPin className="h-3.5 w-3.5 mt-1 text-copper flex-shrink-0" aria-hidden />
                <span>
                  Musterstraße 24
                  <br />
                  10115 Berlin
                </span>
              </li>
              <li>
                <a
                  href="tel:+493012345678"
                  className="flex items-center gap-3 text-cream/80 hover:text-cream transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-copper" aria-hidden />
                  030 12345678
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@noirblade.de"
                  className="flex items-center gap-3 text-cream/80 hover:text-cream transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-copper" aria-hidden />
                  hello@noirblade.de
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-cream/10 pt-5 text-xs text-cream/55">
              <div className="text-eyebrow uppercase text-muted mb-2">
                Öffnungszeiten
              </div>
              Mo-Fr 10:00-20:00
              <br />
              Sa 10:00-18:00
              <br />
              So geschlossen
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-cream/55">
          <div>© {new Date().getFullYear()} NOIR &amp; BLADE. Alle Rechte vorbehalten.</div>
          <div className="flex items-center gap-2">
            <span>Template by</span>
            <a
              href="https://origami.studio"
              className="text-copper hover:text-cream transition-colors"
            >
              Origami Web Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-cream/15 text-cream/80 hover:bg-copper hover:text-ink hover:border-copper transition-colors"
    >
      {children}
    </a>
  );
}
