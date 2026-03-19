'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const animateRing = useCallback(() => {
    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08;
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
    }

    rafId.current = requestAnimationFrame(animateRing);
  }, []);

  useEffect(() => {
    const match = window.matchMedia('(pointer: fine)');
    setHasFinePointer(match.matches);

    if (!match.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-hover]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [cursorX, cursorY, animateRing]);

  if (!hasFinePointer) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        id="cursorDot"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${isHovering ? ' hover' : ''}`}
        id="cursorRing"
      />
    </>
  );
}
