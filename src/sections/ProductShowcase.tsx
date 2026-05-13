import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const showcases = [
  {
    image: '/assets/showcase-pos.jpg',
    category: 'Point of Sale',
    title: 'The Counter, Reimagined',
    size: 'large',
  },
  {
    image: '/assets/showcase-qr.jpg',
    category: 'Customer Experience',
    title: 'Scan. Browse. Order.',
    size: 'small',
  },
  {
    image: '/assets/showcase-voice.jpg',
    category: 'Voice AI',
    title: 'Speak to Order',
    size: 'small',
  },
  {
    image: '/assets/showcase-kitchen.jpg',
    category: 'Kitchen',
    title: 'Kitchen, Organized',
    size: 'large',
  },
]

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.showcase-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-dark py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            PRODUCT VISION
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Designing for{' '}
            <span className="font-display italic gradient-text">every</span>{' '}
            corner of{' '}
            <span className="font-display italic gradient-text">your restaurant.</span>
          </h2>
          <p className="mt-4 text-base text-text-light-muted max-w-[480px] mx-auto">
            Early UI explorations for the ERP: counter, guest devices, voice, and kitchen — one experience model, shipping iteratively.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Row 1: POS (3 cols) + QR (2 cols) */}
          <div className="showcase-card md:col-span-3 group relative overflow-hidden rounded-3xl h-[350px] md:h-[400px]">
            <img
              src={showcases[0].image}
              alt={showcases[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs font-medium tracking-wide text-accent uppercase">
                {showcases[0].category}
              </span>
              <h4 className="mt-1 text-lg font-semibold text-white">{showcases[0].title}</h4>
            </div>
          </div>

          <div className="showcase-card md:col-span-2 group relative overflow-hidden rounded-3xl h-[350px] md:h-[400px]">
            <img
              src={showcases[1].image}
              alt={showcases[1].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs font-medium tracking-wide text-accent uppercase">
                {showcases[1].category}
              </span>
              <h4 className="mt-1 text-lg font-semibold text-white">{showcases[1].title}</h4>
            </div>
          </div>

          {/* Row 2: Voice (2 cols) + Kitchen (3 cols) */}
          <div className="showcase-card md:col-span-2 group relative overflow-hidden rounded-3xl h-[300px] md:h-[350px]">
            <img
              src={showcases[2].image}
              alt={showcases[2].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs font-medium tracking-wide text-accent uppercase">
                {showcases[2].category}
              </span>
              <h4 className="mt-1 text-lg font-semibold text-white">{showcases[2].title}</h4>
            </div>
          </div>

          <div className="showcase-card md:col-span-3 group relative overflow-hidden rounded-3xl h-[300px] md:h-[350px]">
            <img
              src={showcases[3].image}
              alt={showcases[3].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs font-medium tracking-wide text-accent uppercase">
                {showcases[3].category}
              </span>
              <h4 className="mt-1 text-lg font-semibold text-white">{showcases[3].title}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
