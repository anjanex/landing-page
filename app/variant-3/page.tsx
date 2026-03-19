import { notFound } from 'next/navigation';

// Route disabled — code preserved below
export default function Variant3Page() {
  notFound();
}

/* ── Original page (disabled) ──
'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroVariant3 from '@/components/HeroVariant3';
import Footer from '@/components/Footer';

export default function Variant3PageOriginal() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroVariant3 preloaderDone={preloaderDone} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
*/
