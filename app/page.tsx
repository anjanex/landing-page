'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Promise from '@/components/Promise';
import WorksSection from '@/components/WorksSection';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import TextMarquee from '@/components/TextMarquee';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero preloaderDone={preloaderDone} />
        <Marquee />
        <Stats />
        <Services />
        <Promise />
        <WorksSection />
        <Process />
        <Testimonials />
        <WhyUs />
        <TextMarquee />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
