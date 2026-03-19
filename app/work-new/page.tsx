import { notFound } from 'next/navigation';

// Route disabled — code preserved below
export default function WorkNewPage() {
  notFound();
}

/* ── Original page (disabled) ──
'use client';

import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import WorkOriginal from '@/components/WorkOriginal';
import Footer from '@/components/Footer';

export default function WorkNewPageOriginal() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <main>
        <WorkOriginal />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
*/
