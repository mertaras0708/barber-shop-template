export type Package = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: 'fresh-cut',
    name: 'Fresh Cut',
    description: 'Haarschnitt, Beratung und Styling.',
    price: '25',
    duration: '30 Min.',
    includes: ['Beratung', 'Haarschnitt', 'Wash & Style'],
  },
  {
    id: 'signature-fade',
    name: 'Signature Fade',
    description: 'Skin Fade, Konturen und Finish.',
    price: '35',
    duration: '45 Min.',
    includes: ['Skin Fade', 'Saubere Konturen', 'Wash & Style', 'Finish'],
    featured: true,
  },
  {
    id: 'full-experience',
    name: 'Full Experience',
    description: 'Haarschnitt, Bartpflege, Konturen und Styling.',
    price: '50',
    duration: '60 Min.',
    includes: ['Haarschnitt', 'Bartkontur', 'Heißes Tuch', 'Styling', 'Finish'],
  },
];

export type PriceItem = {
  service: string;
  duration: string;
  price: string;
};

export const priceList: PriceItem[] = [
  { service: 'Herrenhaarschnitt', duration: '30 Min.', price: 'ab 25 €' },
  { service: 'Skin Fade', duration: '45 Min.', price: 'ab 30 €' },
  { service: 'Bart trimmen', duration: '20 Min.', price: 'ab 15 €' },
  { service: 'Haare & Bart', duration: '60 Min.', price: 'ab 40 €' },
  { service: 'Nassrasur', duration: '30 Min.', price: 'ab 25 €' },
  { service: 'Styling', duration: '15 Min.', price: 'ab 10 €' },
];
