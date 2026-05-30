import { MapPin, Clock, Star, CalendarCheck } from 'lucide-react';

const items = [
  {
    Icon: MapPin,
    label: 'Standort',
    value: 'Zentral gelegen',
    detail: 'Berlin Mitte',
  },
  {
    Icon: Clock,
    label: 'Öffnungszeiten',
    value: 'Mo-Sa geöffnet',
    detail: '10:00 - 20:00',
  },
  {
    Icon: Star,
    label: 'Bewertung',
    value: '4,9 Google-Rating',
    detail: '300+ Reviews',
  },
  {
    Icon: CalendarCheck,
    label: 'Buchung',
    value: 'Online buchen',
    detail: 'Rund um die Uhr',
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Auf einen Blick"
      className="relative bg-ink border-b border-cream/10"
    >
      <div className="mx-auto max-w-page px-6 md:px-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cream/10 border-x border-cream/10">
          {items.map(({ Icon, label, value, detail }) => (
            <li
              key={label}
              className="group flex flex-col gap-3 px-5 py-7 md:px-7 md:py-9 transition-colors hover:bg-ink-800"
            >
              <div className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                <Icon className="h-3.5 w-3.5 text-copper" aria-hidden />
                {label}
              </div>
              <div className="font-serif text-xl md:text-2xl text-cream leading-tight">
                {value}
              </div>
              <div className="text-xs md:text-sm text-cream/55">
                {detail}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
