import { MapPin, Phone, Clock, MessageCircle, Utensils } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { contacts } from '../data/contacts'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gatto-950 border-t border-gatto-gold/20 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left max-w-xs">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <img
                src="/logo.jpg"
                alt="La Tana del Gatto"
                className="w-12 h-12 rounded-full object-cover border-2 border-gatto-gold"
              />
              <span className="font-display text-xl font-bold text-gatto-cream">
                La Tana del Gatto
              </span>
            </div>
            <p className="text-gatto-cream/60 text-sm leading-relaxed">
              Pizzeria & Hamburgeria nel cuore di Carpi. Pizza del forno a legna,
              hamburger e passione in ogni impasto.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gatto-cream/70">
            <a
              href={contacts.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gatto-gold transition-colors"
            >
              <MapPin size={16} />
              {contacts.address}
            </a>
            <a
              href={contacts.phoneHref}
              className="flex items-center gap-2 hover:text-gatto-gold transition-colors"
            >
              <Phone size={16} />
              {contacts.phone}
            </a>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              Lun chiuso · Mar–Dom 19:00–24:00 (solo cena)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={contacts.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-gatto-800 text-gatto-cream hover:bg-gatto-gold hover:text-gatto-950 transition-colors"
              aria-label="Prenota su WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href={contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-gatto-800 text-gatto-cream hover:bg-gatto-gold hover:text-gatto-950 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={contacts.theforkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-gatto-800 text-gatto-cream hover:bg-gatto-gold hover:text-gatto-950 transition-colors"
              aria-label="TheFork"
            >
              <Utensils size={20} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gatto-gold/10 text-center text-xs text-gatto-cream/50">
          © {currentYear} La Tana del Gatto — Via Guido Fassi 9, Carpi (MO).
          Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}