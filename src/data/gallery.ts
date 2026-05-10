export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  span?: 'wide' | 'tall' | 'normal'
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: '1', src: '/images/Screenshot_1.png', alt: 'Vista espetacular do sítio', span: 'wide' },
  { id: '2', src: '/images/Screenshot_2.png', alt: 'Quarto aconchegante', span: 'tall' },
  { id: '3', src: '/images/Screenshot_3.png', alt: 'Sala de estar iluminada' },
  { id: '4', src: '/images/Screenshot_4.png', alt: 'Área externa ao pôr do sol', span: 'wide' },
  { id: '5', src: '/images/Screenshot_5.png', alt: 'Piscina e espaço de lazer' },
  { id: '6', src: '/images/Screenshot_6.png', alt: 'Cozinha completa com fogão a lenha' },
  { id: '7', src: '/images/Screenshot_7.png', alt: 'Deck rodeado pela natureza' },
  { id: '8', src: '/images/Screenshot_8.png', alt: 'Área de convivência com lareira' },
  { id: '9', src: '/images/Screenshot_9.png', alt: 'Banheiro com iluminação natural' },
  { id: '10', src: '/images/Screenshot_10.png', alt: 'Ambiente interno decorado' },
  { id: '11', src: '/images/Screenshot_11.png', alt: 'Área externa ampla' },
  { id: '12', src: '/images/Screenshot_12.png', alt: 'Detalhes da sala de estar' },
  { id: '13', src: '/images/Screenshot_13.png', alt: 'Vista panorâmica da propriedade', span: 'wide' },
  { id: '14', src: '/images/Screenshot_14.png', alt: 'Espaço de lazer com sinuca' },
]
