import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  MapPin,
  X,
  MessageCircle,
  Utensils,
  Leaf,
  Flame,
  Star,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import menuData from '../data/menu.json'
import { contacts } from '../data/contacts'

function formatPrice(value) {
  const n = parseFloat(value)
  if (Number.isNaN(n)) return value
  return n.toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function flattenSections(nodes, parentName = null) {
  const sections = []
  for (const node of nodes) {
    const categoryName = parentName || node.name
    if (node.items?.length > 0) {
      sections.push({
        id: node.id,
        name: node.name,
        category: categoryName,
        description: node.description,
        items: node.items,
      })
    }
    if (node.subcategories?.length > 0) {
      sections.push(...flattenSections(node.subcategories, categoryName))
    }
  }
  return sections
}

function groupByCategory(sections) {
  const map = new Map()
  for (const s of sections) {
    if (!map.has(s.category)) map.set(s.category, [])
    map.get(s.category).push(s)
  }
  return Array.from(map.entries()).map(([category, sections]) => ({
    category,
    sections,
  }))
}

const categoryDescriptions = new Map()
for (const cat of menuData) {
  if (cat.description) categoryDescriptions.set(cat.name, cat.description)
}

/**
 * Badge taxonomy — caratteristiche del piatto, mappate a uno stile fisso.
 * Ogni badge noto ha icona + classe colore semantica coerente.
 * Un valore non presente nella mappa NON viene renderizzato: questo costringe
 * ad aggiungere qui ogni nuova caratteristica, invece di usare stringhe a caso.
 *
 *   Veg      -> piatto senza carne/pesce       (verde, foglia)
 *   Piccante -> contiene 'nduja/spianata/picc. (rosso, fiamma)
 *   Premium  -> taglio/ingrediente di pregio  (oro, stella)
 */
const BADGE_STYLES = {
  Veg: { icon: Leaf, className: 'bg-gatto-basil/15 text-gatto-basil border-gatto-basil/30' },
  Piccante: { icon: Flame, className: 'bg-gatto-tom/15 text-gatto-tom border-gatto-tom/30' },
  Premium: { icon: Star, className: 'bg-gatto-gold/15 text-gatto-gold border-gatto-gold/30' },
}

function Badge({ value }) {
  const conf = BADGE_STYLES[value]
  if (!conf) return null
  const Icon = conf.icon
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border ${conf.className}`}
    >
      <Icon size={11} className="shrink-0" />
      {value}
    </span>
  )
}

/**
 * Chip porzione — attributo di quantità, distinto dal badge di caratteristica.
 * Stile neutro (sage) per differenziarlo dalle caratteristiche alimentari.
 */
function PortionChip({ value }) {
  if (!value) return null
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full border border-gatto-sage/30 bg-gatto-sage/10 text-gatto-sage">
      {value}
    </span>
  )
}

function ProductCard({ item }) {
  return (
    <div className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gatto-950/50 border border-gatto-gold/10 hover:border-gatto-gold/30 hover:bg-gatto-950 transition-all">
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-gatto-cream leading-tight">
              {item.name}
            </h3>
          </div>
          {item.badge || item.portion ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {item.badge ? <Badge value={item.badge} /> : null}
              {item.portion ? <PortionChip value={item.portion} /> : null}
            </div>
          ) : null}
          {item.description ? (
            <p className="mt-2 text-xs sm:text-sm text-gatto-cream/60 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 min-w-[80px] border-t sm:border-t-0 border-gatto-gold/10 pt-2 sm:pt-0 mt-1 sm:mt-0">
        {item.prices && item.prices.length > 0 ? (
          item.prices.map((p, idx) => (
            <div key={idx} className="text-right">
              {p.info ? (
                <span className="block text-[10px] sm:text-xs text-gatto-cream/50">
                  {p.info}
                </span>
              ) : null}
              <span className="block font-bold text-gatto-gold text-sm sm:text-base md:text-lg">
                € {formatPrice(p.price)}
              </span>
            </div>
          ))
        ) : (
          <span className="text-xs text-gatto-cream/40">Su richiesta</span>
        )}
      </div>
    </div>
  )
}

export default function MenuPage() {
  const sections = useMemo(() => flattenSections(menuData), [])
  const grouped = useMemo(() => groupByCategory(sections), [sections])
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    if (!mainRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.dataset.sectionId))
          }
        })
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    )
    const targets = mainRef.current.querySelectorAll('[data-section-id]')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [sections])

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [mobileNavOpen])

  const scrollTo = (id) => {
    const el = document.getElementById(`section-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
      setMobileNavOpen(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gatto-950 pt-16 sm:pt-20">
        {/* Header */}
        <div className="relative bg-gatto-900 border-b border-gatto-gold/20">
          <div className="absolute inset-0 bg-texture opacity-70" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-gatto-gold hover:text-gatto-cream transition-colors mb-4"
            >
              <ChevronLeft size={18} />
              Torna alla home
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream">
              Il nostro menu
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gatto-cream/70 max-w-2xl">
              Pizze classiche e speciali, hamburger, carne, friggitoria,
              insalatone e bibite. Il listino può variare stagionalmente.
            </p>

            {/* Legenda caratteristiche */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-gatto-cream/40 font-semibold">
                Legenda
              </span>
              <Badge value="Veg" />
              <Badge value="Piccante" />
              <Badge value="Premium" />
              <PortionChip value="porzione" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gatto-gold font-bold mb-4">
                  Categorie
                </h2>
                <nav className="space-y-5">
                  {grouped.map(({ category, sections }) => (
                    <div key={category}>
                      <span className="block text-sm font-semibold text-gatto-cream mb-2">
                        {category}
                      </span>
                      <ul className="space-y-1 border-l border-gatto-gold/20 pl-3">
                        {sections.map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              onClick={() => scrollTo(s.id)}
                              className={`text-left text-sm w-full py-1 transition-colors ${
                                activeId === s.id
                                  ? 'text-gatto-gold font-semibold'
                                  : 'text-gatto-cream/60 hover:text-gatto-cream'
                              }`}
                            >
                              {s.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Mobile categories button */}
            <div className="lg:hidden sticky top-20 z-30 -mx-4 px-4 py-3 bg-gatto-950/95 border-b border-gatto-gold/10 backdrop-blur">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-gatto-900 text-gatto-cream border border-gatto-gold/20"
              >
                <span className="text-sm font-medium">
                  Categoria:{' '}
                  <span className="text-gatto-gold">
                    {sections.find((s) => s.id === activeId)?.name}
                  </span>
                </span>
                <span className="text-xs uppercase tracking-wider text-gatto-cream/60">
                  Cambia
                </span>
              </button>
            </div>

            {/* Menu sections */}
            <div ref={mainRef} className="flex-1 space-y-14 sm:space-y-20">
              {grouped.map(({ category, sections }) => (
                <div key={category}>
                  {categoryDescriptions.get(category) ? (
                    <p className="mb-2 text-sm text-gatto-cream/50 italic">
                      {categoryDescriptions.get(category)}
                    </p>
                  ) : null}
                  {sections.map((section) => (
                    <section
                      key={section.id}
                      id={`section-${section.id}`}
                      data-section-id={section.id}
                      className="scroll-target mb-10 sm:mb-14 last:mb-0"
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-gatto-gold/20">
                        <div>
                          {section.category !== section.name ? (
                            <span className="text-xs uppercase tracking-[0.2em] text-gatto-gold/80 font-semibold">
                              {section.category}
                            </span>
                          ) : null}
                          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gatto-cream mt-1">
                            {section.name}
                          </h2>
                        </div>
                        <span className="text-xs sm:text-sm text-gatto-cream/50">
                          {section.items.length}{' '}
                          {section.items.length === 1 ? 'voce' : 'voci'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {section.items.map((item, idx) => (
                          <ProductCard
                            key={`${section.id}-${item.name}-${idx}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </section>
                  ))}

                  {category === 'Pizze' || category === 'Hamburger & Panini' ? (
                    <p className="mt-6 text-xs sm:text-sm text-gatto-cream/50 italic">
                      * Coperto 1,80 € a persona. Menu soggetto a variazioni
                      stagionali.
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile category drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-gatto-950/98 backdrop-blur transition-opacity duration-300 ${
            mobileNavOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col h-full max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-gatto-cream">
                Categorie
              </h2>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-2 text-gatto-cream hover:text-gatto-gold"
                aria-label="Chiudi"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <nav className="space-y-6">
                {grouped.map(({ category, sections }) => (
                  <div key={category}>
                    <span className="block text-sm font-bold text-gatto-gold uppercase tracking-wider mb-2">
                      {category}
                    </span>
                    <ul className="space-y-1">
                      {sections.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => scrollTo(s.id)}
                            className={`text-left w-full py-2 px-3 rounded-lg text-base transition-colors ${
                              activeId === s.id
                                ? 'bg-gatto-gold text-gatto-950 font-semibold'
                                : 'text-gatto-cream hover:bg-gatto-900'
                            }`}
                          >
                            {s.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* CTA footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="p-6 sm:p-8 rounded-2xl bg-gatto-900 border border-gatto-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gatto-cream">
                Ti è venuta fame?
              </h3>
              <p className="text-sm sm:text-base text-gatto-cream/70">
                Prenota un tavolo su WhatsApp o vieni a trovarci a Carpi.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={contacts.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gatto-gold text-gatto-950 font-bold rounded-full hover:bg-gatto-cream transition-colors"
              >
                <MessageCircle size={18} />
                Prenota
              </a>
              <Link
                to="/#location"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gatto-900 text-gatto-cream font-semibold rounded-full border border-gatto-gold/30 hover:bg-gatto-800 transition-colors"
              >
                <MapPin size={18} />
                Dove siamo
              </Link>
              <a
                href={contacts.theforkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gatto-900 text-gatto-cream font-semibold rounded-full border border-gatto-gold/30 hover:bg-gatto-800 transition-colors"
              >
                <Utensils size={18} />
                TheFork
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}