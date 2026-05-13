import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const features = [
  {
    number: '01',
    title: 'Voice AI Ordering',
    description: 'We are building natural voice ordering so guests can speak modifications, confirm items, and complete orders without downloading an app — tuned for noisy dining rooms and multiple languages.',
    tags: ['NLP', 'Voice Recognition', 'Multilingual'],
    color: '#E91E63',
  },
  {
    number: '02',
    title: 'Smart QR Menus',
    description: 'We are building browser-first menus with live availability, dietary filters, and reorder flows so scanning a QR code becomes the start of a guided experience, not a PDF on a phone.',
    tags: ['QR Codes', 'Mobile-First', 'Real-Time'],
    color: '#9C27B0',
  },
  {
    number: '03',
    title: 'AI Recommendations',
    description: 'We are building an engine that suggests pairings and upsells from context — time of day, basket composition, and popularity — so operators get a lever for average check size, not another bolt-on widget.',
    tags: ['Machine Learning', 'Upselling', 'Personalization'],
    color: '#673AB7',
  },
  {
    number: '04',
    title: 'Kitchen Display System',
    description: 'We are building real-time tickets with priorities, prep timers, and coursing so the kitchen sees the same truth as the floor — part of the same ERP, not a siloed screen.',
    tags: ['Real-Time', 'Order Tracking', 'KDS'],
    color: '#3F51B5',
  },
  {
    number: '05',
    title: 'Analytics & Insights',
    description: 'We are building dashboards for sales, labor, and menu performance so leaders can decide from one system instead of exporting spreadsheets from five vendors.',
    tags: ['Dashboards', 'Reports', 'AI Insights'],
    color: '#2196F3',
  },
  {
    number: '06',
    title: 'Complete Restaurant ERP',
    description: 'We are wiring inventory, scheduling, tables, and CRM into the same platform as ordering — the big bet is one operational graph for the whole restaurant, not another narrow POS.',
    tags: ['Inventory', 'Staff Mgmt', 'CRM'],
    color: '#E91E63',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="bg-bg-primary py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            WHAT WE&apos;RE BUILDING
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            One ERP.{' '}
            <span className="font-display italic gradient-text">Every</span>{' '}
            department{' '}
            <span className="font-display italic gradient-text">connected.</span>
          </h2>
          <p className="mt-4 text-base text-text-secondary max-w-[560px] mx-auto">
            VoiceBite is the restaurant operating system we are building: front-of-house ordering, voice AI, kitchen, back office, and analytics — designed to replace a stack of disconnected tools.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="feature-card bg-bg-card rounded-2xl p-8 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] card-hover"
              style={{ borderTop: `3px solid ${feature.color}`, boxShadow: `inset 0 2px 8px ${feature.color}15, 0 4px 24px rgba(0,0,0,0.06)` }}
            >
              <span className="text-xs font-medium" style={{ color: feature.color }}>
                {feature.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-accent-light text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
