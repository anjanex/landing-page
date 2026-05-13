import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Quote } from 'lucide-react'

const operatorInsights = [
  {
    quote:
      'We run seven brands off five systems. If someone ships a single ERP that actually covers guest ordering, kitchen, and inventory without duct tape, we will move.',
    name: 'Head of Ops',
    role: 'Multi-brand group, western India',
    initial: 'H',
    color: '#E91E63',
    highlighted: false,
  },
  {
    quote:
      'Voice plus QR only matters if it lands in the same ticket and inventory truth as the pass. We are tired of "integrations" that break every festival weekend.',
    name: 'Kitchen Director',
    role: 'Full-service group, Bangalore',
    initial: 'K',
    color: '#9C27B0',
    highlighted: true,
  },
  {
    quote:
      'Give us one ledger for covers, waste, and labor — built with AI from day one, not bolted on in year three. That is the bar for the next ERP we adopt.',
    name: 'Founding Partner',
    role: 'Fast-casual chain, Delhi NCR',
    initial: 'F',
    color: '#673AB7',
    highlighted: false,
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-primary border-t border-border py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            FIELD NOTES
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            What we hear while{' '}
            <span className="font-display italic gradient-text">building the stack.</span>
          </h2>
          <p className="mt-3 text-sm text-text-secondary max-w-[640px] mx-auto">
            Paraphrased themes from interviews with operators — not product claims or paid endorsements.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {operatorInsights.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card rounded-2xl p-8 border shadow-[0_4px_24px_rgba(0,0,0,0.06)] card-hover ${
                t.highlighted
                  ? 'bg-accent/5 border-accent/30 border-t-2'
                  : 'bg-bg-card border-border'
              }`}
            >
              <Quote className="w-8 h-8 text-accent/80 mb-4" />

              <p className="text-sm text-text-primary leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
