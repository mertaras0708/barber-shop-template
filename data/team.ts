export type Barber = {
  id: string;
  index: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  instagram?: string;
  rating: number;
};

export const team: Barber[] = [
  {
    id: 'malik',
    index: '01',
    name: 'Malik',
    role: 'Skin Fades & Taper Cuts',
    bio: 'Präzise Übergänge, klare Linien und moderne Herrenstyles. Malik liebt die Detailarbeit am Übergang, millimetergenau.',
    image: '/images/team-malik.jpg',
    instagram: '@malik.cuts',
    rating: 4.9,
  },
  {
    id: 'elias',
    index: '02',
    name: 'Elias',
    role: 'Bartpflege & Nassrasur',
    bio: 'Klassische Barber-Technik mit ruhiger Hand und Blick fürs Detail. Heißes Tuch, Klinge, Stille.',
    image: '/images/team-elias.jpg',
    instagram: '@elias.barber',
    rating: 4.8,
  },
  {
    id: 'noah',
    index: '03',
    name: 'Noah',
    role: 'Textured Cuts & Styling',
    bio: 'Moderne Schnitte, natürliche Bewegung und sauberes Finish, für Looks, die auch ohne Produkt sitzen.',
    image: '/images/team-noah.jpg',
    instagram: '@noah.style',
    rating: 4.9,
  },
];
