import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Headphones, LayoutGrid, Layers, Code2, Rocket, HeartHandshake } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Join the waitlist',
    description: 'Tell us about your format, locations, and pain points. We are onboarding a small circle of design partners as we harden the ERP.',
    icon: Headphones,
    side: 'left',
  },
  {
    number: '02',
    title: 'Model your menu & floor',
    description: 'Planned flow: load items, photos, modifiers, and service zones so the system mirrors how you actually run service — the AI layer will learn from this structure.',
    icon: LayoutGrid,
    side: 'right',
  },
  {
    number: '03',
    title: 'Generate table & QR flows',
    description: 'We are building one-click QR deployment per table or service line so guests land in the right menu and service context every time.',
    icon: Layers,
    side: 'left',
  },
  {
    number: '04',
    title: 'Pilot voice ordering',
    description: 'Voice paths for phone, counter, or table are on the roadmap; pilots will start in controlled environments before we widen languages and noise profiles.',
    icon: Code2,
    side: 'right',
  },
  {
    number: '05',
    title: 'Go live on beta',
    description: 'Target rollout: staged go-live with kitchen display, order routing, and admin monitoring in one dashboard — not a big-bang cutover.',
    icon: Rocket,
    side: 'left',
  },
  {
    number: '06',
    title: 'Co-build the roadmap',
    description: 'Inventory, labor, CRM, and advanced analytics ship in waves. Early partners help prioritize what lands next in the ERP.',
    icon: HeartHandshake,
    side: 'right',
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        )
      }

      // Cards animate in
      steps.forEach((_, i) => {
        const card = document.querySelector(`.step-card-${i}`)
        const dot = document.querySelector(`.step-dot-${i}`)
        if (!card) return

        const fromX = i % 2 === 0 ? -40 : 40

        gsap.from(card, {
          x: fromX,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
          },
        })

        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-bg-primary py-24 md:py-32 relative overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] rounded-full bg-gradient-to-b from-accent/10 to-[#9C27B0]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            HOW IT WORKS
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            From waitlist to{' '}
            <span className="font-display italic gradient-text">first pilot</span>
            — a path we are validating with operators.
          </h2>
          <p className="mt-4 text-base text-text-secondary max-w-[480px] mx-auto">
            Six stages we are designing with early partners. Timelines flex by concept, but the goal is the same: one ERP backbone instead of a pile of plugins.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line origin-top"
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = step.side === 'left'

              return (
                <div key={step.number} className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className={`step-card-${i} flex-1 ml-10 md:ml-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`bg-bg-card rounded-2xl p-6 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] card-hover inline-block w-full md:w-auto md:max-w-[380px] ${isLeft ? 'md:ml-auto' : ''}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <span className="text-xs font-medium text-accent">{step.number}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-text-primary">{step.title}</h4>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className={`step-dot-${i} absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-bg-primary -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(233,30,99,0.4)]`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
