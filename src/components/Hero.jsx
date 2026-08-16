import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircle, Utensils, Star } from 'lucide-react'
import { contacts } from '../data/contacts'

export default function Hero() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const ratingRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        eyebrowRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9 },
          '-=0.2'
        )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          descRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.55'
        )
        .fromTo(
          ratingRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.14 },
          '-=0.45'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gatto-950 via-gatto-900 to-gatto-950" />
      <div className="absolute inset-0 bg-texture opacity-80" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gatto-gold via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gatto-gold/70 to-transparent" />

      {/* Floating embers */}
      <span className="pointer-events-none absolute left-[14%] top-[28%] h-1.5 w-1.5 rounded-full bg-gatto-ember/80 blur-[1px] animate-ember-flicker" />
      <span className="pointer-events-none absolute right-[16%] top-[36%] h-1 w-1 rounded-full bg-gatto-gold/80 blur-[1px] animate-ember-flicker [animation-delay:1.2s]" />
      <span className="pointer-events-none absolute left-[26%] bottom-[22%] h-1 w-1 rounded-full bg-gatto-ember/70 blur-[1px] animate-ember-flicker [animation-delay:2.4s]" />
      <span className="pointer-events-none absolute right-[24%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-gatto-tom/70 blur-[1px] animate-ember-flicker [animation-delay:3.3s]" />
      <span className="pointer-events-none absolute left-[50%] top-[18%] h-1 w-1 rounded-full bg-gatto-gold/60 blur-[1px] animate-ember-flicker [animation-delay:0.6s]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <p
          ref={eyebrowRef}
          className="font-accent text-2xl sm:text-3xl text-gatto-gold leading-none mb-4 sm:mb-5"
        >
          Forno a legna · dal cuore di Carpi
        </p>

        <div ref={logoRef} className="relative mb-6 sm:mb-8">
          <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-gatto-gold/30 animate-spin-slow" />
          <img
            src="/logo.jpg"
            alt="La Tana del Gatto"
            className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-gatto-gold shadow-2xl shadow-black/50"
          />
        </div>

        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gatto-cream leading-tight"
        >
          La Tana del Gatto
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-gatto-gold font-light tracking-[0.2em] uppercase"
        >
          Pizzeria · Hamburgeria
        </p>

        <p
          ref={descRef}
          className="mt-4 text-base sm:text-lg text-gatto-cream/75 max-w-xl leading-relaxed"
        >
          Pizza cotta nel forno a legna, hamburger succulenti e impasti a lunga
          lievitazione. Il tuo rifugio goloso in Via Guido Fassi, a Carpi.
        </p>

        <div
          ref={ratingRef}
          className="mt-6 flex items-center justify-center"
        >
          <a
            href={contacts.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gatto-900/70 border border-gatto-gold/20 hover:border-gatto-gold/50 transition-colors"
          >
            <span className="flex items-center gap-0.5 text-gatto-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={15}
                  className="fill-gatto-gold stroke-gatto-gold"
                />
              ))}
            </span>
            <span className="text-gatto-cream font-semibold">
              {contacts.rating.toFixed(1)}
            </span>
            <span className="text-gatto-cream/60 text-sm">
              · {contacts.reviewsCount} recensioni su Google
            </span>
          </a>
        </div>

        <div
          ref={ctaRef}
          className="mt-8 sm:mt-10 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={contacts.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gatto-gold text-gatto-950 font-bold rounded-full hover:bg-gatto-cream transition-colors shadow-lg shadow-black/25"
          >
            <MessageCircle size={20} />
            Prenota un tavolo
          </a>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gatto-tom text-gatto-cream font-bold rounded-full hover:bg-gatto-ember transition-colors"
          >
            <Utensils size={20} />
            Il nostro menu
          </Link>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gatto-cream/60 hover:text-gatto-gold transition-colors animate-bounce"
        aria-label="Scorri giù"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  )
}