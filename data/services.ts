export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  /** Kurzform für Carousel-Cards (1 Zeile, max ~80 Zeichen) */
  short: string;
  price: string;
  /** Preisindikator als Zahl in EUR (für Buchung & Summary) */
  priceFrom: number;
  duration: string;
  /** Dauer in Minuten (für Buchung) */
  durationMinutes: number;
  category: 'Cut' | 'Beard' | 'Style';
  /** Hero-Bild für das Service-Carousel. Wird per HEAD-Probe geprüft;
   *  fehlt die Datei, rendert die Card eine elegante SVG-Silhouette. */
  image?: string;
};

export const services: Service[] = [
  {
    id: 'herrenhaarschnitt',
    index: '01',
    title: 'Herrenhaarschnitt',
    description:
      'Klassischer Schnitt, moderne Styles und persönliche Beratung, abgestimmt auf Kopfform, Haartyp und Alltag.',
    short: 'Klassischer Cut. Beratung, Schere, Klinge.',
    price: 'ab 25 €',
    priceFrom: 25,
    duration: '30 Min.',
    durationMinutes: 30,
    category: 'Cut',
    image: '/images/service-herrenhaarschnitt.jpg',
  },
  {
    id: 'skin-fade',
    index: '02',
    title: 'Skin Fade',
    description:
      'Saubere Übergänge bis auf Hautlevel, präzise Konturen und makelloses Finish mit Klinge und Trimmer.',
    short: 'Übergang bis Hautlevel. Präzise Konturen.',
    price: 'ab 30 €',
    priceFrom: 30,
    duration: '45 Min.',
    durationMinutes: 45,
    category: 'Cut',
    image: '/images/service-skin-fade.jpg',
  },
  {
    id: 'haare-bart',
    index: '03',
    title: 'Haare & Bart',
    description:
      'Das komplette Paket: Haarschnitt, Bartkontur und Finish, für einen gepflegten Auftritt aus einer Hand.',
    short: 'Komplettes Paket. Cut, Bart, Finish.',
    price: 'ab 40 €',
    priceFrom: 40,
    duration: '60 Min.',
    durationMinutes: 60,
    category: 'Cut',
    image: '/images/service-haare-bart.jpg',
  },
  {
    id: 'bart-trimmen',
    index: '04',
    title: 'Bart trimmen',
    description:
      'Form, Kontur und Pflege für einen klaren Bartlook, mit Trimmer, Schere und einer ruhigen Hand.',
    short: 'Form, Kontur, Pflege. Mit ruhiger Hand.',
    price: 'ab 15 €',
    priceFrom: 15,
    duration: '20 Min.',
    durationMinutes: 20,
    category: 'Beard',
    image: '/images/service-bart-trimmen.jpg',
  },
  {
    id: 'nassrasur',
    index: '05',
    title: 'Nassrasur',
    description:
      'Traditionelle Rasur mit heißem Tuch, hochwertigem Schaum und Klinge. Ein Ritual, kein Service.',
    short: 'Heißes Tuch, Schaum, Klinge. Ein Ritual.',
    price: 'ab 25 €',
    priceFrom: 25,
    duration: '30 Min.',
    durationMinutes: 30,
    category: 'Beard',
    image: '/images/service-nassrasur.jpg',
  },
  {
    id: 'styling-finish',
    index: '06',
    title: 'Styling & Finish',
    description:
      'Finish, Produktauswahl und Styling für deinen Alltag. Damit der Look auch zuhause sitzt.',
    short: 'Finish und Produktauswahl für jeden Tag.',
    price: 'ab 10 €',
    priceFrom: 10,
    duration: '15 Min.',
    durationMinutes: 15,
    category: 'Style',
    image: '/images/service-styling-finish.jpg',
  },
];
