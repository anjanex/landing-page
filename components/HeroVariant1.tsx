'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroScenes from './HeroScenes';

/**
 * Variant 1 — Minimal Left Side
 * Removes: subtitle paragraph, "Start Building" CTA, "See Our Work" button
 * Keeps: badge, title, rotating text, trust bar
 * More whitespace, cleaner, premium feel
 */

interface HeroVariant1Props {
  preloaderDone: boolean;
}

const ROTATING_TEXTS = ['stunning websites', 'scalable products', 'AI-powered solutions', 'brand experiences'];
const SCENE_INTERVAL = 3800;
const SCENE_START_DELAY = 2800;

const entryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const lineEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroVariant1({ preloaderDone }: HeroVariant1Props) {
  const [activeText, setActiveText] = useState<number | null>(null);
  const [exitingText, setExitingText] = useState<number | null>(null);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef<number | null>(null);
  const animateState = preloaderDone ? 'visible' : 'hidden';

  activeRef.current = activeText;

  const cycleText = useCallback(() => {
    const current = activeRef.current;
    if (current === null) return;
    const next = (current + 1) % ROTATING_TEXTS.length;
    setExitingText(current);
    setActiveText(null);
    setTimeout(() => {
      setExitingText(null);
      setActiveText(next);
    }, 500);
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;
    const revealTimeout = setTimeout(() => {
      setActiveText(0);
      setAnimationsStarted(true);
    }, SCENE_START_DELAY);
    const cycleTimeout = setTimeout(() => {
      intervalRef.current = setInterval(cycleText, SCENE_INTERVAL);
    }, SCENE_START_DELAY + SCENE_INTERVAL);
    return () => {
      clearTimeout(revealTimeout);
      clearTimeout(cycleTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [preloaderDone, cycleText]);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
        <div className="hero-orb hero-orb--1"></div>
        <div className="hero-orb hero-orb--2"></div>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={animateState === 'visible' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: entryEase, delay: 0 }}
          >
            <span className="hero-badge-dot"></span>
            Available for Q2 2026
          </motion.div>
          <h1 className="hero-title" style={{ marginBottom: '48px' }}>
            <span className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ y: '100%' }}
                animate={animateState === 'visible' ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 1.6, ease: lineEase, delay: 0.4 }}
              >
                We don&apos;t build projects.
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ y: '100%' }}
                animate={animateState === 'visible' ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 1.6, ease: lineEase, delay: 0.55 }}
              >
                We ship
              </motion.span>
            </span>
            <span className="hero-line hero-line--accent">
              <span className="hero-rotating-wrap">
                {ROTATING_TEXTS.map((text, i) => (
                  <span
                    key={i}
                    className={`hero-rotating${activeText === i ? ' active' : ''}${exitingText === i ? ' exiting' : ''}`}
                    data-index={i}
                  >
                    {text}
                  </span>
                ))}
              </span>
            </span>
            <span className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ y: '100%' }}
                animate={animateState === 'visible' ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 1.6, ease: lineEase, delay: 0.7 }}
              >
                that make money.
              </motion.span>
            </span>
          </h1>

          {/* No subtitle paragraph, no CTA buttons — clean whitespace */}

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0, y: 20 }}
            animate={animateState === 'visible' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: entryEase, delay: 1.4 }}
          >
            <div className="hero-trust-avatars">
              <span className="hero-avatar" style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)' }}>R</span>
              <span className="hero-avatar" style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)' }}>S</span>
              <span className="hero-avatar" style={{ background: 'linear-gradient(135deg,#4facfe,#00f2fe)' }}>A</span>
              <span className="hero-avatar" style={{ background: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' }}>K</span>
            </div>
            <span className="hero-trust-label">Trusted by <strong>30+</strong> startups across 8 countries</span>
          </motion.div>
        </div>
        <motion.div
          className="hero-scenes"
          id="heroScenes"
          initial={{ opacity: 0 }}
          animate={animateState === 'visible' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.8, delay: 2.3 }}
        >
          <HeroScenes activeScene={animationsStarted ? activeText ?? 0 : 0} started={animationsStarted} />
        </motion.div>
      </div>
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={animateState === 'visible' ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
