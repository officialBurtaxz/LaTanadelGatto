import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageCircle,
  Utensils,
} from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { contacts } from '../data/contacts'

gsap.registerPlugin(ScrollTrigger)

function todayIndex() {
  const d = new Date().getDay()
  return (d + 6) % 7
}

function toMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return (h === 24 ? 24 : h) * 60 + (m || 0)
}

function openStatus() {
  const idx = todayIndex()
  const today = contacts.hours[idx]
  if (!today || today.closed) return { open: false }
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  for (const range of today.slots.split(' · ')) {
    const [start, end] = range.split('–')
    const s = toMinutes(start.trim())
    const e = toMinutes(end.trim())
    if (e > s ? nowMin >= s && nowMin < e : nowMin >= s || nowMin < e) {
      return { open: true }
    }
  }
  return { open: false }
}

export default function Location() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const mapRef = useRef(null)
  const status = openStatus()
  const idx = todayIndex()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        mapRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gatto-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <div ref={contentRef} className="flex flex-col justify-center">
            <span className="text-gatto-gold uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
              Dove Siamo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream mt-3 mb-4">
              Vieni a trovarci a Carpi
            </h2>
            <p className="text-base sm:text-lg text-gatto-cream/75 leading-relaxed mb-8">
              Siamo in Via Guido Fassi 9, a due passi dal centro. Prenota un
              tavolo, passa a ritirare o fatti consegnare a casa: il forno è
              sempre acceso.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <a
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-gatto-900/60 border border-gatto-gold/10 hover:border-gatto-gold/40 transition-colors"
              >
                <MapPin className="text-gatto-gold shrink-0 mt-0.5" size={22} />
                <div>
                  <span className="block text-gatto-cream font-medium">
                    Indirizzo
                  </span>
                  <span className="text-gatto-cream/70">
                    {contacts.address}
                  </span>
                </div>
              </a>

              <a
                href={contacts.phoneHref}
                className="flex items-start gap-4 p-4 rounded-xl bg-gatto-900/60 border border-gatto-gold/10 hover:border-gatto-gold/40 transition-colors"
              >
                <Phone className="text-gatto-gold shrink-0 mt-0.5" size={22} />
                <div>
                  <span className="block text-gatto-cream font-medium">
                    Telefono
                  </span>
                  <span className="text-gatto-cream/70">{contacts.phone}</span>
                </div>
              </a>

              <a
                href={contacts.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-gatto-900/60 border border-gatto-gold/10 hover:border-gatto-gold/40 transition-colors"
              >
                <MessageCircle
                  className="text-gatto-gold shrink-0 mt-0.5"
                  size={22}
                />
                <div>
                  <span className="block text-gatto-cream font-medium">
                    WhatsApp
                  </span>
                  <span className="text-gatto-cream/70">Prenota in chat</span>
                </div>
              </a>

              <a
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-gatto-900/60 border border-gatto-gold/10 hover:border-gatto-gold/40 transition-colors"
              >
                <InstagramIcon
                  className="text-gatto-gold shrink-0 mt-0.5"
                  size={22}
                />
                <div>
                  <span className="block text-gatto-cream font-medium">
                    Instagram
                  </span>
                  <span className="text-gatto-cream/70">
                    {contacts.instagramHandle}
                  </span>
                </div>
              </a>
            </div>

            {/* Opening hours */}
            <div className="p-5 rounded-xl bg-gatto-900/60 border border-gatto-gold/10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <Clock className="text-gatto-gold" size={20} />
                  <span className="text-gatto-cream font-medium">Orari</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    status.open
                      ? 'bg-gatto-gold/15 text-gatto-gold'
                      : 'bg-gatto-tom/15 text-gatto-tom'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status.open ? 'bg-gatto-gold animate-pulse' : 'bg-gatto-tom'
                    }`}
                  />
                  {status.open ? 'Aperto ora' : 'Chiuso ora'}
                </span>
              </div>
              {contacts.hoursNote ? (
                <p className="mb-4 -mt-1 text-xs text-gatto-gold/90 font-medium">
                  {contacts.hoursNote}
                </p>
              ) : null}
              <ul className="space-y-1.5">
                {contacts.hours.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm ${
                      i === idx
                        ? 'bg-gatto-gold/10 text-gatto-cream'
                        : 'text-gatto-cream/70'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {h.day}
                      {i === idx ? (
                        <span className="text-[10px] uppercase tracking-wider text-gatto-gold font-semibold">
                          Oggi
                        </span>
                      ) : null}
                    </span>
                    {h.closed ? (
                      <span className="text-gatto-tom text-xs">Chiuso</span>
                    ) : (
                      <span className="tabular-nums">{h.slots}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gatto-gold text-gatto-950 font-bold rounded-full hover:bg-gatto-cream transition-colors"
              >
                <ExternalLink size={18} />
                Apri in Google Maps
              </a>
              <a
                href={contacts.theforkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gatto-900 text-gatto-cream font-semibold rounded-full border border-gatto-gold/30 hover:bg-gatto-800 transition-colors"
              >
                <Utensils size={18} />
                Prenota su TheFork
              </a>
            </div>
          </div>

          <div
            ref={mapRef}
            className="relative w-full h-72 sm:h-96 lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-gatto-gold/20 shadow-2xl shadow-black/30"
          >
            <iframe
              title="Mappa La Tana del Gatto"
              src={contacts.embedMap}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: 'grayscale(0.2) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}