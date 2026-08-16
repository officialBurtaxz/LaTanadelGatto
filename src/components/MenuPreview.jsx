import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Utensils } from 'lucide-react'
import menuData from '../data/menu.json'

gsap.registerPlugin(ScrollTrigger)

function countItems(node) {
  let count = node.items?.length || 0
  for (const sub of node.subcategories || []) {
    count += countItems(sub)
  }
  return count
}

const previews = menuData.filter((cat) => countItems(cat) > 0).slice(0, 6)

export default function MenuPreview() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 bg-gatto-900"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-gatto-gold uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
            Menu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream mt-3">
            Pizza, hamburger e tanto altro
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gatto-cream/70">
            Sfoglia il listino completo della Tana: pizze classiche e speciali,
            hamburger, panini, fritti, dolci e bevande.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {previews.map((cat) => {
            const total = countItems(cat)
            return (
              <Link
                key={cat.id}
                to="/menu"
                className="group p-4 sm:p-5 rounded-xl bg-gatto-950/60 border border-gatto-gold/10 hover:border-gatto-gold/40 hover:bg-gatto-950 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <Utensils
                    size={18}
                    className="text-gatto-gold opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <ArrowRight
                    size={16}
                    className="text-gatto-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-gatto-cream group-hover:text-gatto-gold transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gatto-cream/50">
                  {total} {total === 1 ? 'voce' : 'voci'}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gatto-gold text-gatto-950 font-bold rounded-full hover:bg-gatto-cream transition-colors shadow-lg shadow-black/25"
          >
            <Utensils size={20} />
            Vedi il menu completo
          </Link>
        </div>
      </div>
    </section>
  )
}