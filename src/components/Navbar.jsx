import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Star } from 'lucide-react'
import gsap from 'gsap'
import { contacts } from '../data/contacts'
import { asset } from '../utils/asset'

const navLinks = [
  { label: 'Home', to: { pathname: '/', hash: '#home' } },
  { label: 'Il Locale', to: { pathname: '/', hash: '#about' } },
  { label: 'Menu', to: '/menu' },
  { label: 'Recensioni', to: { pathname: '/', hash: '#reviews' } },
  { label: 'Dove Siamo', to: { pathname: '/', hash: '#location' } },
]

function NavItem({ link, onClick, className }) {
  const baseClassName =
    className ||
    'text-sm uppercase tracking-widest text-gatto-cream/80 hover:text-gatto-gold transition-colors'
  return (
    <Link to={link.to} className={baseClassName} onClick={onClick}>
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'bg-gatto-950/95 border-gatto-gold/20'
          : 'bg-gatto-950/70 border-transparent'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={asset('/logo.jpg')}
              alt="La Tana del Gatto"
              className="shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border-2 border-gatto-gold group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg sm:text-xl font-bold text-gatto-cream tracking-tight">
                La Tana del Gatto
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-gatto-gold/80 mt-0.5">
                Pizzeria · Hamburgeria
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
            <a
              href={contacts.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gatto-gold text-gatto-950 text-sm font-semibold rounded-full hover:bg-gatto-cream transition-colors"
            >
              <Star size={15} className="fill-gatto-950" />
              Prenota
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden relative z-[70] p-2 text-gatto-cream hover:text-gatto-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen nav */}
      <div
        className={`md:hidden fixed inset-0 z-[60] h-screen w-screen bg-gatto-950 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-6 sm:gap-8 px-4">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onClick={closeMenu}
              className="font-display text-3xl sm:text-4xl font-bold text-gatto-cream hover:text-gatto-gold transition-colors"
            />
          ))}
          <a
            href={contacts.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center gap-2 px-7 py-3 bg-gatto-gold text-gatto-950 text-lg font-bold rounded-full hover:bg-gatto-cream transition-colors"
          >
            <Star size={20} className="fill-gatto-950" />
            Prenota un tavolo
          </a>
          <a
            href={contacts.phoneHref}
            onClick={closeMenu}
            className="text-gatto-cream/70 hover:text-gatto-cream transition-colors text-sm tracking-wide"
          >
            {contacts.phone}
          </a>
        </div>
      </div>
    </nav>
  )
}