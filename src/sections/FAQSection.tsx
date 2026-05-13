import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'What is VoiceBite?',
    a: 'VoiceBite is the restaurant ERP we are building at Anjanex: guest ordering (including QR and voice), kitchen display, inventory, staff scheduling, CRM, and analytics — architected as one platform instead of stitched-together SaaS.',
  },
  {
    q: 'Will guests need an app?',
    a: 'No app download is planned for diners. The experience is browser-first: scan a QR code or follow a link, order in the flow we ship, and pay according to the payment rails we integrate in each market.',
  },
  {
    q: 'How will voice AI work?',
    a: 'We are training conversational flows for noisy restaurants, multilingual guests, and complex modifiers. Voice becomes another input channel into the same order graph as tap ordering — not a sidecar product.',
  },
  {
    q: 'How long will onboarding take?',
    a: 'We are still validating timelines with design partners. Early targets point to a guided setup measured in hours, not weeks, once menu and service models are imported — not the "30 minutes live" marketing line until we prove it.',
  },
  {
    q: 'What hardware should we plan for?',
    a: 'Plan for modern browsers on tablets, phones, and kitchen screens you already use. We are not designing around proprietary terminals; any hardware budget should stay focused on hospitality, not licensing dongles.',
  },
  {
    q: 'How will VoiceBite be priced?',
    a: 'Commercial terms are in design. Expect transparent usage-based pricing aligned with order volume rather than arbitrary per-seat fees. Beta and pilot programs will be disclosed directly to waitlist partners.',
  },
  {
    q: 'Will it support multiple locations?',
    a: 'Yes — multi-site operations are a first-class requirement. We are building centralized policy, per-location menus, consolidated reporting, and role-aware access so finance and ops see one ERP, not one spreadsheet per store.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="bg-bg-primary py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
              Frequently
              <br />
              Asked
            </h2>
          </div>

          {/* Right - Accordion */}
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className={`text-base font-medium transition-colors ${
                    openIndex === i ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  }`}>
                    {faq.q}
                  </span>
                  <Plus className={`w-5 h-5 flex-shrink-0 ml-4 transition-all duration-300 ${
                    openIndex === i ? 'text-accent rotate-45' : 'text-text-muted'
                  }`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-text-secondary leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
