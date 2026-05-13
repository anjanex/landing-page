import Marquee from '../components/Marquee'

export default function MarqueeDivider() {
  return (
    <section className="bg-bg-dark border-t border-b border-border-dark py-6 overflow-hidden">
      <Marquee speed={25}>
        <span className="text-2xl font-semibold text-text-light-muted whitespace-nowrap mx-4">
          Join the waitlist <span className="text-accent">&#10022;</span> Public beta target Sep 2026 <span className="text-accent">&#10022;</span> Restaurant ERP in development <span className="text-accent">&#10022;</span> Design partners welcome <span className="text-accent">&#10022;</span>
        </span>
      </Marquee>
    </section>
  )
}
