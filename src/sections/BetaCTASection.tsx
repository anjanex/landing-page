import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'

export default function BetaCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2026-09-01T00:00:00').getTime()

    const updateCountdown = () => {
      const now = Date.now()
      const diff = targetDate - now

      if (diff <= 0) {
        setIsLive(true)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.beta-glass-card', {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-dark py-24 md:py-32 relative overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-[#9C27B0]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative flex justify-center">
        <div className="beta-glass-card glass-card rounded-3xl p-10 md:p-16 max-w-[640px] w-full text-center">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
            HELP US BUILD IT
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
            We are building more than a POS.{' '}
            <span className="font-display italic gradient-text">
              A full restaurant ERP.
            </span>
          </h2>
          <p className="mt-4 text-base text-text-light-muted max-w-[480px] mx-auto">
            VoiceBite is in active development — voice, QR, kitchen, inventory, staff, and analytics in one system. Get on the waitlist for design partner updates; first public beta target September 1st.
          </p>

          {/* Countdown */}
          {isLive ? (
            <div className="mt-8 py-4">
              <span className="text-3xl font-bold text-accent">Beta window open 🎉</span>
            </div>
          ) : (
            <div className="flex justify-center gap-3 mt-8">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-border-dark flex flex-col items-center justify-center"
                >
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-text-light-muted uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="https://wa.me/917977933565?text=Hello%2C%20I%27d%20like%20to%20join%20the%20VoiceBite%20waitlist%20for%20the%20restaurant%20ERP%20beta."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white text-sm font-semibold hover:bg-[#C2185B] transition-colors shadow-[0_0_40px_rgba(233,30,99,0.3)]"
            >
              Join the waitlist
              <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </a>
            <a
              href="https://wa.me/917977933565?text=Hello%2C%20I%27d%20like%20to%20talk%20about%20VoiceBite%20and%20the%20ERP%20roadmap."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-border-dark text-white text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Talk to the team
            </a>
          </div>

          <p className="mt-6 text-xs text-text-light-muted">
            No credit card to join the waitlist. Pricing will be simple and transparent when we launch.
          </p>
        </div>
      </div>
    </section>
  )
}
