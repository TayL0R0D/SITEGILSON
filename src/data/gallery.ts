export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  span?: 'wide' | 'tall' | 'normal'
}

// Replace these with your actual property photos.
// Tip: Upload photos to the /public/photos/ folder and reference them as /photos/filename.jpg
// Or connect a Google Drive folder by replacing these URLs.
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    alt: 'Mountain view from the property',
    span: 'wide',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=800&q=80',
    alt: 'Cozy master bedroom',
    span: 'tall',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    alt: 'Open concept living room',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    alt: 'Property exterior at golden hour',
    span: 'wide',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    alt: 'Outdoor area with pool',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    alt: 'Fully equipped gourmet kitchen',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=800&q=80',
    alt: 'Deck with natural surroundings',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&q=80',
    alt: 'Fireplace and lounge area',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1520637736862-4d197d17aca5?w=800&q=80',
    alt: 'Serene bathroom with natural light',
  },
]
