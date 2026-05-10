import { useState, useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  TreePine, Waves, Wifi, Car, Utensils, Flame,
  MapPin, Star, ChevronDown, Phone, Instagram, Menu, X as XIcon,
} from 'lucide-react'
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar'
import { BookingModal } from '@/components/BookingModal'
import { galleryPhotos } from '@/data/gallery'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// MUDANÇA AQUI: Coloque seu número entre as aspas (ex: '5511988887777')
const PROPERTY_NAME = 'Sitio L&G'
const PROPERTY_LOCATION = 'Itabira MG Brasil'
const WHATSAPP_NUMBER = '5521990193134' 

const amenities = [
  { icon: TreePine, label: 'Vista espetacular', desc: 'Uma visão confortante da natureza' },
  { icon: Waves, label: 'Piscina e Churrasco', desc: 'Área completa para lazer e diversão' },
  { icon: Wifi, label: 'Wifi', desc: 'Disponível em toda a propriedade' },
  { icon: Car, label: 'Estacionamento Grátis', desc: 'Vagas cobertas para até 4 carros' },
  { icon: Utensils, label: 'Cozinha Completa', desc: 'Fogão a lenha para refeições caseiras' },
  { icon: Flame, label: 'Mesa de Sinuca', desc: 'Diversão garantida para os hóspedes' },
]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Galeria', href: '#gallery' },
    { label: 'Comodidades', href: '#amenities' },
    { label: 'Disponibilidade', href: '#booking' },
    { label: 'Sobre', href: '#about' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'white' : 'transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold transition-colors"
          style={{
            fontFamily: 'var(--font-serif)',
            color: scrolled ? 'var(--color-forest)' : 'white',
          }}
        >
          {PROPERTY_NAME}
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: scrolled ? '#1A1A1A' : 'white' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'var(--color-forest)', color: 'white' }}
          >
            Ver Disponibilidade
          </a>
        </div>

        <button
          className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: scrolled ? '#1A1A1A' : 'white' }}
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-5 py-4 space-y-3 shadow-lg">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="block text-base font-medium text-stone-700 py-2"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="block text-center py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--color-forest)' }}
            onClick={() => setMobileOpen(false)}
          >
            Ver Disponibilidade
          </a>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={galleryPhotos[0].src}
          alt={PROPERTY_NAME}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }}
        />
      </div>

      <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto animate-fade-in-up">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-90">
          <MapPin size={16} />
          <span className="text-sm font-medium tracking-wider uppercase">{PROPERTY_LOCATION}</span>
        </div>
        <h1
          className="text-5xl md:text-7xl font-bold mb-5 leading-tight"
          style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          {PROPERTY_NAME}
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-xl mx-auto">
          Seu refúgio particular em meio à natureza. Relaxe, desconecte e crie memórias inesquecíveis.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'var(--color-forest)', color: 'white' }}
          >
            Ver Disponibilidade
          </a>
          <a
            href="#gallery"
            className="px-8 py-4 rounded-full text-base font-semibold border-2 border-white text-white transition-all hover:bg-white/10"
          >
            Ver Galeria
          </a>
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 px-5 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--color-terracotta)' }}>
          O Espaço
        </p>
        <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
          Cada Detalhe, Pensado para Você
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {galleryPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            className={`gallery-item overflow-hidden rounded-xl cursor-pointer relative ${
              photo.span === 'wide' ? 'col-span-2' :
              photo.span === 'tall' ? 'row-span-2' : ''
            }`}
            style={{ aspectRatio: photo.span === 'wide' ? '16/9' : photo.span === 'tall' ? '3/4' : '1/1' }}
            onClick={() => setLightbox(idx)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 px-5" style={{ background: 'var(--color-stone)' }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: 'var(--font-serif)' }}>Tudo que você precisa</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {amenities.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-6 text-center hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(45,80,22,0.1)' }}>
                <Icon size={22} style={{ color: 'var(--color-forest)' }} />
              </div>
              <h3 className="font-semibold text-sm mb-1">{label}</h3>
              <p className="text-xs text-stone-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BookingSection() {
  const [bookingDates, setBookingDates] = useState<{ checkIn: Date; checkOut: Date } | null>(null)

  return (
    <section id="booking" className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Verificar Disponibilidade</h2>
          <p className="text-stone-500 max-w-md mx-auto text-sm">
            Calendário sincronizado em tempo real. Datas em verde estão livres.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
          <AvailabilityCalendar onSelectDates={(checkIn, checkOut) => setBookingDates({ checkIn, checkOut })} />
          
          <div className="max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-5">Como Funciona a Reserva</h3>
            <div className="space-y-5">
              {[
                { num: '1', title: 'Escolha suas Datas', desc: 'Selecione no calendário os dias disponíveis.' },
                { num: '2', title: 'Termos de Garantia', desc: 'Pagamento antecipado de 30% para reservar (até 7 dias antes) ou valor total para datas próximas.' },
                { num: '3', title: 'WhatsApp', desc: 'Envie os detalhes da estadia diretamente para o proprietário.' },
              ].map(step => (
                <div key={step.num} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{ background: 'var(--color-forest)' }}>{step.num}</div>
                  <div>
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-stone-500 text-sm mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 flex items-center gap-2 text-sm font-medium"
  style={{ color: '#25D366' }}
>
  <Phone size={16} /> Falar com o proprietário no WhatsApp
</a>
          </div>
        </div>
      </div>

      {bookingDates && (
        <BookingModal
          checkIn={bookingDates.checkIn}
          checkOut={bookingDates.checkOut}
          onClose={() => setBookingDates(null)}
        />
      )}
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 px-5" style={{ background: 'var(--color-forest)', color: 'white' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Um refúgio onde o tempo para</h2>
        <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
          Localizado em {PROPERTY_LOCATION}, o {PROPERTY_NAME} é um escape desenhado para paz e conforto.
        </p>
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[ { num: '6', label: 'Hóspedes' }, { num: '3', label: 'Quartos' }, { num: '2', label: 'Banheiros' } ].map(stat => (
            <div key={stat.label}>
              <div className="text-4xl font-bold mb-1">{stat.num}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-5 border-t text-center text-sm text-stone-400">
      <p>© {new Date().getFullYear()} {PROPERTY_NAME}. Todos os direitos reservados.</p>
    </footer>
  )
}

function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <GallerySection />
      <AmenitiesSection />
      <BookingSection />
      <AboutSection />
      <Footer />
    </>
  )
}
