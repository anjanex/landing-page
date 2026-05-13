import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CheckCircle, Brain, Layers, Smartphone, Zap, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: CheckCircle,
    title: 'Product craft, not shelfware',
    description: 'We are shaping VoiceBite like a consumer-grade product — clear flows, strong defaults, and documentation we will ship alongside the ERP.',
  },
  {
    icon: Brain,
    title: 'AI inside the core',
    description: 'Voice, recommendations, and forecasting are not optional plugins on our roadmap — they share the same operational data model as POS, kitchen, and inventory.',
  },
  {
    icon: Layers,
    title: 'One graph for the whole house',
    description: 'Ordering, kitchen, inventory, staff, and CRM are being wired as one system so events in the dining room propagate to purchasing and labor without CSV bridges.',
  },
  {
    icon: Smartphone,
    title: 'Hardware-light footprint',
    description: 'We are optimizing for browsers on devices you already own — guest phones, iPads, kitchen screens — so capital spend stays in food and people, not proprietary terminals.',
  },
  {
    icon: Zap,
    title: 'Ship learning loops weekly',
    description: 'We intend to release iteratively with partner feedback, automated deploys, and tight instrumentation so each week teaches us what the ERP must do next.',
  },
  {
    icon: TrendingUp,
    title: 'Pricing that tracks usage',
    description: 'We are designing commercial terms that scale with throughput, not seat count, so small teams are not punished for growing covers.',
  },
]

export default function WhyVoiceBiteSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.value-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="bg-bg-primary py-20 md:py-28 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            WHY THIS ERP
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            Why operators are{' '}
            <span className="font-display italic gradient-text">watching this build.</span>
          </h2>
        </div>

        {/* Value Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={i}
                className="value-card bg-bg-card rounded-2xl p-6 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary">{v.title}</h4>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
