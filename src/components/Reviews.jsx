import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ExternalLink } from 'lucide-react'
import { contacts } from '../data/contacts'

gsap.registerPlugin(ScrollTrigger)

export default function Reviews() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const ratingRef = useRef(null)
  const cardsRef = useRef(null)

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )

      gsap.fromTo(
        ratingRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: ratingRef.current, start: 'top 90%' },
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
          stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gatto-950"
    >
      <div className="absolute inset-0 bg-texture opacity-70" />
      <div className="relative max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-gatto-gold uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
            Recensioni
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream mt-3">
            Dicono di noi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gatto-cream/70">
            Le parole dei nostri clienti, talmente genuine che sembrano sfornate
            dal forno a legna.
          </p>
        </div>

        <div
          ref={ratingRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gatto-900/80 border border-gatto-gold/20">
            <span className="font-display text-3xl sm:text-4xl font-bold text-gatto-gold">
              {contacts.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-0.5 text-gatto-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-gatto-gold stroke-gatto-gold"
                />
              ))}
            </span>
            <span className="text-gatto-cream/70 text-sm sm:text-base">
              {contacts.reviewsCount} recensioni
            </span>
          </div>
          <a
            href={contacts.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gatto-cream/70 hover:text-gatto-gold transition-colors text-sm"
          >
            <ExternalLink size={15} />
            Vedi tutte su Google
          </a>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {contacts.reviews.map((review, idx) => (
            <figure
              key={idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-gatto-900/70 border border-gatto-gold/10 hover:border-gatto-gold/30 transition-colors"
            >
              <span className="absolute -top-4 left-6 font-display text-6xl leading-none text-gatto-gold/30 select-none">
                &ldquo;
              </span>
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gatto-gold stroke-gatto-gold"
                  />
                ))}
              </div>
              <blockquote className="relative font-display text-lg sm:text-xl text-gatto-cream/90 leading-relaxed italic">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 text-xs text-gatto-cream/50">
                <span className="inline-block w-6 h-px bg-gatto-gold/40" />
                Recensione verificata su Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}