'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useAnimate } from 'framer-motion';

const SCENE_COUNT = 4;

interface HeroScenesProps {
  activeScene: number;
  started: boolean;
}

export default function HeroScenes({ activeScene, started }: HeroScenesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevSceneRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  const [scope0, animate0] = useAnimate();
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();

  const scopesRef = useRef([scope0, scope1, scope2, scope3]);
  const animatorsRef = useRef([animate0, animate1, animate2, animate3]);

  // Keep refs in sync
  scopesRef.current = [scope0, scope1, scope2, scope3];
  animatorsRef.current = [animate0, animate1, animate2, animate3];

  // Scene transition animations — driven by parent
  useEffect(() => {
    if (!started) return;

    const prev = prevSceneRef.current;

    // First time: just show scene 0 with a gentle fade-in
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const firstScope = scopesRef.current[0];
      const firstAnimate = animatorsRef.current[0];
      if (firstScope.current) {
        firstScope.current.style.opacity = '0';
        firstScope.current.style.filter = 'blur(4px)';
        firstAnimate(firstScope.current, {
          opacity: 1,
          filter: 'blur(0px)',
        }, {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        });
      }
      return;
    }

    if (prev === activeScene) return;

    const scopes = scopesRef.current;
    const animators = animatorsRef.current;

    const prevScope = scopes[prev];
    const nextScope = scopes[activeScene];
    const prevAnimate = animators[prev];
    const nextAnimate = animators[activeScene];

    // Exit animation for previous scene
    if (prevScope.current) {
      prevAnimate(prevScope.current, {
        rotateY: -18,
        z: -120,
        scale: 0.92,
        opacity: 0,
        filter: 'blur(4px)',
      }, {
        duration: 0.9,
        ease: [0.45, 0, 0.55, 1],
      });
    }

    // Enter animation for next scene
    if (nextScope.current) {
      // Set initial state
      nextScope.current.style.transform = 'rotateY(18deg) translateZ(-120px) scale(0.92)';
      nextScope.current.style.opacity = '0';
      nextScope.current.style.filter = 'blur(4px)';

      nextAnimate(nextScope.current, {
        rotateY: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      }, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.35,
      });
    }

    prevSceneRef.current = activeScene;
  }, [activeScene, started]);

  // Mouse parallax (pointer: fine only)
  const handleParallax = useCallback(() => {
    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.06;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.06;

    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector('.scene--active');
      if (activeEl) {
        const layers = activeEl.querySelectorAll('.scene-layer');
        layers.forEach((layer) => {
          const depth = parseFloat((layer as HTMLElement).dataset.depth || '0');
          const moveX = smoothRef.current.x * 20 * depth;
          const moveY = smoothRef.current.y * 14 * depth;
          (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      }
    }

    rafRef.current = requestAnimationFrame(handleParallax);
  }, []);

  useEffect(() => {
    const isFineMouse = window.matchMedia('(pointer: fine)').matches;
    if (!isFineMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(handleParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleParallax]);

  return (
    <div className="scene-perspective" ref={containerRef}>
      {/* Scene 0: "stunning websites" - Browser Mockup */}
      <div
        ref={scope0}
        className={`scene${activeScene === 0 ? ' scene--active' : ''}`}
        data-scene="0"
        style={{ opacity: 0 }}
      >
        <div className="scene-layer" data-depth="0.2">
          <div className="scene-blob scene-blob--1"></div>
          <div className="scene-blob scene-blob--2"></div>
        </div>
        <div className="scene-layer" data-depth="0.5">
          <div className="mockup-browser">
            <div className="mockup-bar">
              <span className="mockup-dot" style={{ background: '#ff5f57' }}></span>
              <span className="mockup-dot" style={{ background: '#ffbd2e' }}></span>
              <span className="mockup-dot" style={{ background: '#28ca41' }}></span>
              <div className="mockup-url"></div>
            </div>
            <div className="mockup-body">
              <div className="mockup-nav">
                <div className="mockup-block" style={{ width: '40px', height: '8px', borderRadius: '4px', background: 'var(--accent)' }}></div>
                <div className="mockup-nav-links">
                  <div className="mockup-block" style={{ width: '24px', height: '4px' }}></div>
                  <div className="mockup-block" style={{ width: '24px', height: '4px' }}></div>
                  <div className="mockup-block" style={{ width: '24px', height: '4px' }}></div>
                </div>
              </div>
              <div className="mockup-hero-area">
                <div className="mockup-block" style={{ width: '70%', height: '12px', borderRadius: '6px' }}></div>
                <div className="mockup-block" style={{ width: '50%', height: '8px', borderRadius: '4px', opacity: 0.4 }}></div>
                <div className="mockup-block mockup-btn-block"></div>
              </div>
              <div className="mockup-cards">
                <div className="mockup-card">
                  <div className="mockup-card-img"></div>
                  <div className="mockup-block" style={{ width: '60%', height: '5px', marginTop: '6px' }}></div>
                </div>
                <div className="mockup-card">
                  <div className="mockup-card-img" style={{ background: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' }}></div>
                  <div className="mockup-block" style={{ width: '60%', height: '5px', marginTop: '6px' }}></div>
                </div>
                <div className="mockup-card">
                  <div className="mockup-card-img" style={{ background: 'linear-gradient(135deg,#4facfe,#00f2fe)' }}></div>
                  <div className="mockup-block" style={{ width: '60%', height: '5px', marginTop: '6px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scene-layer" data-depth="0.9">
          <div className="scene-float scene-float--perf">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>99 Performance</span>
          </div>
          <div className="scene-float scene-float--code">&lt;/&gt;</div>
          <div className="scene-float scene-float--responsive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scene 1: "scalable products" - Dashboard + Metrics */}
      <div
        ref={scope1}
        className={`scene${activeScene === 1 ? ' scene--active' : ''}`}
        data-scene="1"
        style={{ opacity: 0 }}
      >
        <div className="scene-layer" data-depth="0.2">
          <div className="scene-blob scene-blob--3"></div>
          <div className="scene-rings"></div>
        </div>
        <div className="scene-layer" data-depth="0.5">
          <div className="mockup-dashboard">
            <div className="dash-sidebar">
              <div className="mockup-block" style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'var(--accent)', marginBottom: '16px' }}></div>
              <div className="mockup-block" style={{ width: '100%', height: '4px', marginBottom: '8px' }}></div>
              <div className="mockup-block" style={{ width: '80%', height: '4px', marginBottom: '8px', opacity: 0.4 }}></div>
              <div className="mockup-block" style={{ width: '90%', height: '4px', marginBottom: '8px', opacity: 0.3 }}></div>
              <div className="mockup-block" style={{ width: '70%', height: '4px', opacity: 0.3 }}></div>
            </div>
            <div className="dash-main">
              <div className="dash-stats">
                <div className="dash-stat-card">
                  <span className="dash-stat-num">12.4k</span>
                  <span className="dash-stat-label">Users</span>
                  <div className="dash-stat-bar">
                    <div className="dash-stat-bar-fill" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <span className="dash-stat-num">$48k</span>
                  <span className="dash-stat-label">Revenue</span>
                  <div className="dash-stat-bar">
                    <div className="dash-stat-bar-fill" style={{ width: '62%', background: 'var(--purple)' }}></div>
                  </div>
                </div>
              </div>
              <div className="dash-chart">
                <svg viewBox="0 0 200 60" className="dash-chart-svg">
                  <polyline className="dash-chart-line" points="0,50 25,42 50,45 75,30 100,35 125,20 150,22 175,10 200,5" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,50 25,42 50,45 75,30 100,35 125,20 150,22 175,10 200,5 200,60 0,60" fill="url(#chartGrad)" opacity="0.15" />
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="scene-layer" data-depth="0.9">
          <div className="scene-float scene-float--growth">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28ca41" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span>+340% Growth</span>
          </div>
          <div className="scene-float scene-float--users">10k+ Users</div>
        </div>
      </div>

      {/* Scene 2: "AI-powered solutions" - Neural Network */}
      <div
        ref={scope2}
        className={`scene${activeScene === 2 ? ' scene--active' : ''}`}
        data-scene="2"
        style={{ opacity: 0 }}
      >
        <div className="scene-layer" data-depth="0.2">
          <div className="scene-blob scene-blob--ai"></div>
        </div>
        <div className="scene-layer" data-depth="0.5">
          <div className="mockup-ai">
            <svg viewBox="0 0 300 240" className="ai-network" fill="none">
              <line className="ai-line" x1="150" y1="120" x2="60" y2="40" stroke="rgba(233,30,99,0.2)" strokeWidth="1.5" />
              <line className="ai-line" x1="150" y1="120" x2="240" y2="40" stroke="rgba(124,77,255,0.2)" strokeWidth="1.5" />
              <line className="ai-line" x1="150" y1="120" x2="60" y2="200" stroke="rgba(233,30,99,0.15)" strokeWidth="1.5" />
              <line className="ai-line" x1="150" y1="120" x2="240" y2="200" stroke="rgba(124,77,255,0.15)" strokeWidth="1.5" />
              <line className="ai-line" x1="150" y1="120" x2="30" y2="120" stroke="rgba(233,30,99,0.15)" strokeWidth="1.5" />
              <line className="ai-line" x1="150" y1="120" x2="270" y2="120" stroke="rgba(124,77,255,0.15)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="60" cy="40" r="18" fill="rgba(255,255,255,0.6)" stroke="rgba(233,30,99,0.3)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="240" cy="40" r="18" fill="rgba(255,255,255,0.6)" stroke="rgba(124,77,255,0.3)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="60" cy="200" r="18" fill="rgba(255,255,255,0.6)" stroke="rgba(233,30,99,0.3)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="240" cy="200" r="18" fill="rgba(255,255,255,0.6)" stroke="rgba(124,77,255,0.3)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="30" cy="120" r="14" fill="rgba(255,255,255,0.5)" stroke="rgba(233,30,99,0.2)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--outer" cx="270" cy="120" r="14" fill="rgba(255,255,255,0.5)" stroke="rgba(124,77,255,0.2)" strokeWidth="1.5" />
              <circle className="ai-node ai-node--center" cx="150" cy="120" r="30" fill="rgba(233,30,99,0.08)" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="150" cy="120" r="10" fill="var(--accent)" opacity="0.6" />
              <text x="60" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-heading)" fontWeight="600">NLP</text>
              <text x="240" y="44" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-heading)" fontWeight="600">RAG</text>
              <text x="60" y="204" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-heading)" fontWeight="600">CV</text>
              <text x="240" y="204" textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-heading)" fontWeight="600">LLM</text>
            </svg>
            <div className="ai-pulse"></div>
          </div>
        </div>
        <div className="scene-layer" data-depth="0.9">
          <div className="scene-float scene-float--ai-tag">Agentic AI</div>
          <div className="scene-float scene-float--ai-tag2">GPT Integration</div>
          <div className="scene-float scene-float--ai-chat">
            <div className="ai-chat-bubble">How can I help?</div>
          </div>
        </div>
      </div>

      {/* Scene 3: "brand experiences" - Design Composition */}
      <div
        ref={scope3}
        className={`scene${activeScene === 3 ? ' scene--active' : ''}`}
        data-scene="3"
        style={{ opacity: 0 }}
      >
        <div className="scene-layer" data-depth="0.2">
          <div className="scene-blob scene-blob--brand"></div>
        </div>
        <div className="scene-layer" data-depth="0.5">
          <div className="mockup-brand">
            <div className="brand-logo-mark">
              <div className="brand-logo-shape"></div>
              <div className="brand-logo-grid"></div>
            </div>
            <div className="brand-palette">
              <span className="brand-swatch" style={{ background: '#E91E63' }}></span>
              <span className="brand-swatch" style={{ background: '#7C4DFF' }}></span>
              <span className="brand-swatch" style={{ background: '#0c0c14' }}></span>
              <span className="brand-swatch" style={{ background: '#f0f0f5' }}></span>
              <span className="brand-swatch" style={{ background: '#28ca41' }}></span>
            </div>
          </div>
        </div>
        <div className="scene-layer" data-depth="0.9">
          <div className="scene-float scene-float--type">
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px' }}>Aa</span>
            <span style={{ fontSize: '9px', opacity: 0.5 }}>Space Grotesk</span>
          </div>
          <div className="scene-float scene-float--type2">
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '18px' }}>Aa</span>
            <span style={{ fontSize: '9px', opacity: 0.5 }}>Playfair Display</span>
          </div>
          <div className="scene-float scene-float--bcard">
            <div className="bcard-inner">
              <div className="mockup-block" style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--accent)' }}></div>
              <div className="mockup-block" style={{ width: '40px', height: '4px', marginTop: '6px' }}></div>
              <div className="mockup-block" style={{ width: '30px', height: '3px', marginTop: '3px', opacity: 0.4 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
