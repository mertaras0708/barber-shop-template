export type Testimonial = {
  quote: string;
  name: string;
  service: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Bester Fade, den ich bisher hatte. Sauber gearbeitet und entspannte Atmosphäre, ich gehe nirgendwo anders mehr hin.',
    name: 'Mehmet K.',
    service: 'Skin Fade',
  },
  {
    quote:
      'Online gebucht, pünktlich drangekommen, Schnitt genau wie gewünscht. Genau so soll ein Barberbesuch laufen.',
    name: 'Daniel S.',
    service: 'Herrenhaarschnitt',
  },
  {
    quote:
      'Bart und Haare perfekt. Man merkt, dass hier auf Details geachtet wird. Klare Empfehlung.',
    name: 'Jonas M.',
    service: 'Haare & Bart',
  },
  {
    quote:
      'Sehr moderner Shop, gute Beratung und top Ergebnis. Habe seit Jahren keinen so guten Schnitt mehr gehabt.',
    name: 'Arman T.',
    service: 'Signature Fade',
  },
];
