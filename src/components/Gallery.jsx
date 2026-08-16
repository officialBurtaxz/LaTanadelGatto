import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InstagramIcon from './InstagramIcon'
import galleryData from '../data/gallery.json'
import { contacts } from '../data/contacts'
import { asset } from '../utils/asset'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )

      gsap.fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-gatto-900"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-gatto-gold uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold">
            Galleria
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gatto-cream mt-3">
            Dal nostro Instagram
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gatto-cream/70">
            Uno spaccato della Tana, tra forno, hamburger e serate in compagnia.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {galleryData.map((item, idx) => (
            <a
              key={item.file}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block overflow-hidden rounded-2xl border border-gatto-gold/10 hover:border-gatto-gold/40 transition-colors ${
                idx === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gatto-950/30 group-hover:bg-gatto-950/10 transition-colors" />
              <img
                src={asset(`/gallery/${item.file}`)}
                alt={item.caption}
                loading="lazy"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  idx === 0
                    ? 'aspect-square md:aspect-[4/3]'
                    : 'aspect-square'
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-gatto-950/95 via-gatto-950/55 to-transparent">
                <div className="flex items-center gap-2 text-gatto-cream">
                  <InstagramIcon
                    size={14}
                    className="text-gatto-gold shrink-0"
                  />
                  <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gatto-800 text-gatto-cream font-semibold rounded-full border border-gatto-gold/30 hover:bg-gatto-700 hover:border-gatto-gold/50 transition-colors"
          >
            <InstagramIcon size={20} />
            Seguici su Instagram
          </a>
        </div>
      </div>
    </section>
  )
}