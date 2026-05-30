import { faqs } from '@/data/faq';
import { services } from '@/data/services';

export default function JsonLd() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': 'https://noirblade.de/#salon',
    name: 'NOIR & BLADE',
    description:
      'Premium Barbershop für präzise Fades, Herrenhaarschnitte, Bartpflege und Nassrasur in Berlin Mitte.',
    image: 'https://noirblade.de/images/hero-barber.jpg',
    url: 'https://noirblade.de',
    telephone: '+49 30 12345678',
    email: 'hello@noirblade.de',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 24',
      addressLocality: 'Berlin',
      postalCode: '10115',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.5301,
      longitude: 13.385,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://instagram.com/noirblade.berlin',
      'https://facebook.com/noirblade.berlin',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
        price: s.price.replace(/[^\d]/g, ''),
        priceCurrency: 'EUR',
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
