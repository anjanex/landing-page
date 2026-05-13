import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const paths = [
  {
    number: '0 \u2192 1',
    title: 'Launch on one ERP stack',
    description: 'Opening a new venue? We are building VoiceBite so you can start on a single digital core — guest ordering, QR menus, kitchen, and reporting — without buying a legacy POS and three add-ons on day one.',
    bullets: [
      'Guided setup (target: under an hour)',
      'QR flows designed for dine-in and takeaway',
      'Voice AI roadmap for counter and drive-thru',
      'Browser-first — minimal proprietary hardware',
    ],
  },
  {
    number: '1 \u2192 100',
    title: 'Grow without stack sprawl',
    description: 'Already running service? We are building VoiceBite to sit as the operating layer you add over time — same data for front-of-house and back office so you are not reconciling five systems at midnight.',
    bullets: [
      'Kitchen and service workflows in one graph',
      'AI-assisted upsell and menu intelligence (in development)',
      'Operational dashboards tied to live orders',
      'Multi-location controls on the roadmap',
    ],
  },
]

export default function TwoPathsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.path-card-left', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
      gsap.from('.path-card-right', {
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-primary py-24 md:py-32 relative overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #E91E63 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            OUR PROMISE
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            From zero to one.{' '}
            <span className="font-display italic gradient-text">Then one to a hundred.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {paths.map((path, i) => (
            <div
              key={path.number}
              className={`bg-bg-card rounded-2xl p-8 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] card-hover ${
                i === 0 ? 'path-card-left' : 'path-card-right'
              }`}
            >
              <span className="text-3xl md:text-4xl font-bold gradient-text">
                {path.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-text-primary">
                {path.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {path.description}
              </p>
              <ul className="mt-6 space-y-3">
                {path.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
