import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import Marquee from '../components/Marquee'

interface HeroSectionProps {
  scrollTo: (target: string) => void
}

const rotatingWords = [
  'a unified restaurant ERP',
  'voice-first ordering',
  'smart QR menus',
  'kitchen-to-ledger control',
  'one connected OS',
]

const tickerItems = [
  'Fine Dining',
  'Quick Service',
  'Cafes',
  'Food Trucks',
  'Cloud Kitchens',
  'Hotels',
  'Bars \& Pubs',
  'Bakeries',
  'Chain Restaurants',
]

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const rotatingRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const dashboardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Rotating text animation
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (words.length === 0) return

    const tl = gsap.timeline({ repeat: -1 })
    const duration = 0.6
    const hold = 2.5

    words.forEach((word, i) => {
      const nextIndex = (i + 1) % words.length
      tl.fromTo(
        word,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration, ease: 'power2.inOut' }
      )
      tl.to(word, { yPercent: -100, opacity: 0, duration, ease: 'power2.inOut' }, `+=${hold}`)
      tl.fromTo(
        words[nextIndex],
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration, ease: 'power2.inOut' },
        `<`
      )
    })

    // Pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play()
        } else {
          tl.pause()
        }
      },
      { threshold: 0.1 }
    )

    if (rotatingRef.current) {
      observer.observe(rotatingRef.current)
    }

    return () => {
      tl.kill()
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Page load animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Badge
      tl.from('.hero-badge', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.out' })

      // Headline words
      tl.from('.hero-headline-word', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.2')

      // Description
      tl.from('.hero-desc', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')

      // Buttons
      tl.from('.hero-btn', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, '-=0.3')

      // Trust
      tl.from('.hero-trust', { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')

      // Dashboard
      tl.from(dashboardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      }, 0.5)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-primary pt-[72px]"
    >
      {/* Gradient orb behind dashboard */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/15 to-[#9C27B0]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-0 flex-1 flex items-center">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center w-full">
          {/* Left Column */}
          <div ref={contentRef} className="space-y-6">
            {/* Beta Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light border border-accent/20">
              <span className="text-lg">🚀</span>
              <span className="text-xs font-medium text-accent tracking-wide">
                Restaurant ERP — in active build
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
              <span className="hero-headline-word block">We don't do POS.</span>
              <span className="hero-headline-word block">We're building</span>
              <span className="hero-headline-word block h-[1.1em] overflow-hidden relative">
                <span ref={rotatingRef} className="relative block h-full">
                  {rotatingWords.map((word, i) => (
                    <span
                      key={word}
                      ref={(el) => { wordRefs.current[i] = el }}
                      className="absolute top-0 left-0 font-display italic gradient-text-shimmer"
                      style={{ opacity: i === 0 ? 1 : 0 }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="hero-headline-word block">for restaurants.</span>
            </h1>

            {/* Description */}
            <p className="hero-desc text-base text-text-secondary max-w-[480px] leading-relaxed">
              VoiceBite is the restaurant ERP we are building end to end: guest ordering, voice AI, kitchen, inventory, staff, CRM, and analytics — one codebase, one data model, designed for serious operators who have outgrown patchwork tools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#pricing')}
                className="hero-btn group flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white text-sm font-semibold hover:bg-[#C2185B] transition-all shadow-[0_0_40px_rgba(233,30,99,0.2)]"
              >
                Join the waitlist
                <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </button>
              <button
                onClick={() => scrollTo('#how-it-works')}
                className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-bg-card text-text-primary text-sm font-semibold hover:bg-bg-primary transition-colors"
              >
                See How It Works
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="hero-trust pt-2">
              <div className="flex items-center gap-3">
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {['V', 'R', 'S', 'A'].map((initial, i) => (
                    <div
                      key={initial}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-bg-primary"
                      style={{
                        backgroundColor: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5'][i],
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  <strong className="text-text-primary">Design partners</strong> wanted — help shape the ERP before public beta
                </span>
              </div>
              {/* Mini stats */}
              <div className="flex items-center gap-6 mt-3">
                {[
                  { value: '12+', label: 'ERP modules on the roadmap' },
                  { value: '1', label: 'Unified product vision' },
                  { value: 'Beta', label: 'Target: Sep 2026', accent: true },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${stat.accent ? 'text-accent' : 'text-text-primary'}`}>
                      {stat.value}
                    </span>
                    {stat.accent && stat.value !== 'Beta' && (
                      <TrendingUp className="w-3 h-3 text-accent" />
                    )}
                    <span className="text-xs text-text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={dashboardRef}
              className="relative animate-float"
              style={{ perspective: '1000px' }}
            >
              <img
                src="/assets/hero-dashboard.jpg"
                alt="Concept preview — restaurant ERP dashboard (in development)"
                className="w-full max-w-[480px] lg:max-w-[520px] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.12),0_0_80px_rgba(233,30,99,0.1)]"
                style={{ transform: 'rotateY(-5deg) rotateX(2deg)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Industry Ticker */}
      <div className="border-t border-border py-4 overflow-hidden">
        <Marquee speed={30}>
          {tickerItems.map((item, i) => (
            <span key={i} className="text-sm font-semibold text-text-muted uppercase tracking-wider mx-6">
              {item} <span className="text-accent mx-2">&#10022;</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
        <svg
          className="w-3 h-3 text-text-muted animate-bounce-arrow"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
