import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  TreePine, Waves, Wifi, Car, Utensils, Flame,
  MapPin, Menu, X as XIcon, Music, Mic
} from 'lucide-react'
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar'
import { BookingModal } from '@/components/BookingModal'
import { galleryPhotos } from '@/data/gallery'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const PROPERTY_NAME = 'Sítio L&G'
const PROPERTY_LOCATION = 'Itabira MG Brasil'
const WHATSAPP_NUMBER = '5521990193134'

const amenities = [
  { icon: TreePine, label: 'Vista espetacular', desc: 'Uma visão confortante da natureza' },
  { icon: Waves, label: 'Piscina e Churrasco', desc: 'Área completa para lazer e diversão' },
  { icon: Wifi, label: 'Wifi', desc: 'Disponível em toda a propriedade' },
  { icon: Car, label: 'Estacionamento Grátis', desc: 'Vagas cobertas para até 4 carros' },
  { icon: Utensils, label: 'Cozinha Completa', desc: 'Fogão à lenha para refeições caseiras' },
  { icon: Flame, label: 'Mesa de Sinuca', desc: 'Diversão garantida para os hóspedes' },
  { icon: Music, label: 'Proibido som automotivo', desc: 'Apenas caixa de som com música ambiente' },
  { icon: Mic, label: 'Liberado contratação de artistas', desc: 'Cantores, bandas e etc' },
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
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'white' : 'transparent',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.08)' : 'none',
      }}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold transition-colors"
          style={{
            fontFamily: 'var(--font-serif)',
            color: scrolled ? 'var(--color-primary)' : 'white',
          }}>
          {PROPERTY_NAME}
        </a>
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: scrolled ? '#1A1A1A' : 'white' }}>
              {l.label}
            </a>
          ))}
          <a href="#booking"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'var(--color-forest)', color: 'white' }}>
            Ver Disponibilidade
          </a>
        </div>
        <button className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: scrolled ? '#1A1A1A' : 'white' }}
          onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-5 py-4 space-y-3 shadow-lg">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="block text-base font-medium text-stone-700 py-2"
              onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#booking"
            className="block text-center py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--color-forest)' }}
            onClick={() => setMobileOpen(false)}>
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
        <img src={galleryPhotos[0].src} alt={PROPERTY_NAME}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }} />
      </div>
      <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto animate-fade-in-up">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-90">
          <MapPin size={16} />
          <span className="text-sm font-medium tracking-wider uppercase">{PROPERTY_LOCATION}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight"
          style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          {PROPERTY_NAME}
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-xl mx-auto">
          Seu refúgio particular em meio à natureza. Relaxe, desconecte e crie memórias inesquecíveis.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#booking"
            className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'var(--color-forest)', color: 'white' }}>
            Ver Disponibilidade
          </a>
          <a href="#gallery"
            className="px-8 py-4 rounded-full text-base 
