import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flame, Pizza, Beef, Bike, PawPrint, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  {
    icon: Flame,
    title: 'Forno a legna',
    text: 'Impasti a lunga lievitazione, cotti nel nostro forno a legna per una pizza profumata e digeribile.',
  },
  {
    icon: Pizza,
    title: 'Pizze & Speciali',
    text: 'Dalla classica Margherita alle creazioni gourmet della casa, sempre con ingredienti freschi.',
  },
  {
    icon: Beef,
    title: 'Hamburger',
    text: 'Carne di manzo selezionata, pane di focaccia e salse preparate alla Tana.',
  },
  {
    icon: Bike,
    title: 'Asporto & Delivery',
    text: 'Ritira la tua pizza o ricevila a domicilio anche con Deliveroo.',
  },
  {
    icon: PawPrint,
    title: 'Cani ammessi',
    text: 'Il tuo amico a quattro zampe è sempre il benvenuto, dentro e fuori.',
  },
  {
    icon: Clock,
    title: 'Pranzo & Cena',
    text: 'Aperti a cena tutti i giorni e a pranzo da martedì a venerdì. Chiusi il lunedì.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      gsap.fromTo(
        cardsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gatto-950"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-gatto-gold uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
            Il Locale
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream mt-3">
            Dove la legna scalda ogni pizza
          </h2>
          <p ref={textRef} className="mt-5 text-base sm:text-lg text-gatto-cream/75 leading-relaxed">
            La Tana del Gatto è la vostra pizzeria e hamburgeria nel cuore di
            Carpi. Ogni pizza nasce da impasti a lunga lievitazione e viene
            cotta nel forno a legna, per un impasto croccante fuori e
            scioglievole dentro. Accanto ai classici troverete le nostre
            specialità, hamburger succulenti e una cantina di birre e cocktail
            pensati per i momenti di convivialità.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group p-5 sm:p-6 rounded-2xl bg-gatto-900/70 border border-gatto-gold/10 hover:border-gatto-gold/40 hover:bg-gatto-900 transition-all"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gatto-gold/10 text-gatto-gold mb-4 group-hover:scale-110 group-hover:bg-gatto-tom/20 transition-transform">
                <item.icon size={22} />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-gatto-cream mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gatto-cream/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}