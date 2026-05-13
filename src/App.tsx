import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import StatsBar from './sections/StatsBar'
import FeaturesSection from './sections/FeaturesSection'
import TwoPathsSection from './sections/TwoPathsSection'
import ProductShowcase from './sections/ProductShowcase'
import HowItWorksSection from './sections/HowItWorksSection'
import TestimonialsSection from './sections/TestimonialsSection'
import WhyVoiceBiteSection from './sections/WhyVoiceBiteSection'
import MarqueeDivider from './sections/MarqueeDivider'
import BetaCTASection from './sections/BetaCTASection'
import FAQSection from './sections/FAQSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -80 })
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation scrollTo={scrollTo} />
      <main>
        <HeroSection scrollTo={scrollTo} />
        <StatsBar />
        <FeaturesSection />
        <TwoPathsSection />
        <ProductShowcase />
        <HowItWorksSection />
        <TestimonialsSection />
        <WhyVoiceBiteSection />
        <MarqueeDivider />
        <BetaCTASection />
        <FAQSection />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  )
}

export default App
