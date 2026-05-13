import { useEffect, useState, useCallback } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface NavigationProps {
  scrollTo: (target: string) => void
}

const navLinks = [
  { label: 'Features', target: '#features' },
  { label: 'How It Works', target: '#how-it-works' },
  { label: 'Pricing', target: '#pricing' },
  { label: 'FAQ', target: '#faq' },
]

export default function Navigation({ scrollTo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(`#${section.id}`),
        onEnterBack: () => setActiveSection(`#${section.id}`),
      })
    })
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
  }, [])

  const handleNavClick = useCallback((target: string) => {
    setMobileOpen(false)
    scrollTo(target)
  }, [scrollTo])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/85 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px] px-6 lg:px-12">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-0 group"
          >
            <span className="text-lg font-bold text-text-primary tracking-tight">
              ANJANE
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent -ml-0.5"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.target
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {activeSection === link.target && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#pricing')}
              className="px-5 py-2.5 rounded-full border border-border bg-bg-card text-text-primary text-sm font-semibold hover:bg-bg-primary transition-colors"
            >
              Join waitlist
            </button>
            <a
              href="https://wa.me/917977933565?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-dark text-white text-sm font-semibold hover:bg-[#1A1A2E] transition-colors"
            >
              Let's Talk
              <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className="text-2xl font-semibold text-text-primary hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => handleNavClick('#pricing')}
              className="px-8 py-3 rounded-full border border-border bg-bg-card text-text-primary text-base font-semibold"
            >
              Join waitlist
            </button>
            <a
              href="https://wa.me/917977933565?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-bg-dark text-white text-base font-semibold"
            >
              Let's Talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
