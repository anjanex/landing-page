import { ArrowUpRight, Mail } from 'lucide-react'
import Marquee from './Marquee'

interface FooterProps {
  scrollTo: (target: string) => void
}

const footerNavLinks = [
  { label: 'Features', target: '#features' },
  { label: 'How It Works', target: '#how-it-works' },
  { label: 'Pricing', target: '#pricing' },
  { label: 'FAQ', target: '#faq' },
]

export default function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-bg-dark">
      {/* CTA Section */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-16 text-center">
        <span className="text-xs font-medium tracking-[0.1em] uppercase text-accent">
          CO-BUILD WITH US
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
          We are building more than a POS.{' '}
          <span className="font-display italic gradient-text">
            A full restaurant ERP.
          </span>
        </h2>
        <p className="mt-4 text-text-light-muted max-w-[560px] mx-auto text-base">
          VoiceBite is in active development. Join the waitlist to follow releases, pilot the stack, and help prioritize what ships next.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://wa.me/917977933565?text=Hello%2C%20I%27d%20like%20to%20join%20the%20VoiceBite%20waitlist%20for%20the%20restaurant%20ERP%20beta."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white text-sm font-semibold hover:bg-[#C2185B] transition-colors shadow-[0_0_40px_rgba(233,30,99,0.3)]"
          >
            Join the waitlist
            <ArrowUpRight className="w-4 h-4 btn-arrow" />
          </a>
          <a
            href="https://wa.me/917977933565?text=Hello%2C%20I%27d%20like%20to%20talk%20about%20VoiceBite%20and%20the%20ERP%20roadmap."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-border-dark text-white text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Talk to the team
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-b border-border-dark py-6 overflow-hidden">
        <Marquee speed={25}>
          <span className="text-2xl font-semibold text-text-light-muted whitespace-nowrap">
            Co-building the restaurant ERP <span className="text-accent mx-4">&#10022;</span>
          </span>
        </Marquee>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-white tracking-tight">Anjanex</span>
            <p className="text-sm text-text-light-muted mt-1">We build products, not slide decks.</p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerNavLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-sm text-text-light-muted hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@anjanex.com"
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-light-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/anjanex"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-light-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/anjanex"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-light-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-light-muted text-center mt-12">
          &copy; 2026 Anjanex. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
