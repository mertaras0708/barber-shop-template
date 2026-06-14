export type GalleryItem = {
  id: string;
  label: 'Fade' | 'Bart' | 'Styling' | 'Rasur' | 'Salon' | 'Vorher/Nachher';
  caption: string;
  image: string;
  span?: 'wide' | 'tall' | 'normal';
};

export const gallery: GalleryItem[] = [
  {
    id: '01',
    label: 'Fade',
    caption: 'Mid Fade, millimetergenauer Übergang',
    image: '/images/gallery-fade.png',
    span: 'tall',
  },
  {
    id: '02',
    label: 'Bart',
    caption: 'Bartkontur mit Klinge',
    image: '/images/gallery-beard.png',
    span: 'normal',
  },
  {
    id: '03',
    label: 'Styling',
    caption: 'Textured Crop, natürliche Bewegung',
    image: '/images/gallery-styling.png',
    span: 'normal',
  },
  {
    id: '04',
    label: 'Salon',
    caption: 'Im Studio, ruhige Arbeitsatmosphäre',
    image: '/images/gallery-salon.png',
    span: 'wide',
  },
  {
    id: '05',
    label: 'Rasur',
    caption: 'Heißes Tuch, klassische Klinge',
    image: '/images/gallery-shave.png',
    span: 'normal',
  },
  {
    id: '06',
    label: 'Vorher/Nachher',
    caption: 'Vorher · Nachher',
    image: '/images/gallery-before-after.png',
    span: 'normal',
  },
];
