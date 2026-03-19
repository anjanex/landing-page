import { notFound } from 'next/navigation';

// Route disabled — code preserved below
export default function Variant2Page() {
  notFound();
}

/* ── Original page (disabled) ──
'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroVariant2 from '@/components/HeroVariant2';
import Footer from '@/components/Footer';

export default function Variant2PageOriginal() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroVariant2 preloaderDone={preloaderDone} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
*/
