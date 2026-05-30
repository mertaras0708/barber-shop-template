import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Playfair_Display,
  Anton,
  Permanent_Marker,
} from 'next/font/google';
import Providers from './providers';
import './globals.css';

// Body / UI
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Eleganter Italic-Akzent (z. B. einzelne Wörter)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Editorial Barber Display – breite, kräftige Headlines
const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  weight: '400',
});

// Handschriftlicher Akzent (z. B. "Stay Sharp" Scribble)
const marker = Permanent_Marker({
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'NOIR & BLADE | Premium Barbershop & Herrenhaarschnitte',
  description:
    'Premium Barbershop für präzise Fades, Herrenhaarschnitte, Bartpflege und Nassrasur. Buche deinen Termin online bei NOIR & BLADE.',
  keywords: [
    'Barbershop Berlin',
    'Herrenhaarschnitt',
    'Skin Fade',
    'Bartpflege',
    'Nassrasur',
    'Premium Barber',
  ],
  authors: [{ name: 'NOIR & BLADE' }],
  openGraph: {
    title: 'NOIR & BLADE | Premium Barbershop',
    description:
      'Präzise Fades. Saubere Konturen. Online Termin buchen.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'NOIR & BLADE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOIR & BLADE | Premium Barbershop',
    description: 'Präzise Fades. Saubere Konturen. Online Termin buchen.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://noirblade.de',
    languages: {
      'de-DE': 'https://noirblade.de',
      'en-US': 'https://noirblade.de/en',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0A09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} ${anton.variable} ${marker.variable}`}
    >
      <body className="bg-ink text-cream antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
