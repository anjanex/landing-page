'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface WorkItemData {
  num: string;
  badge: string;
  title: string;
  desc: string;
  tags: string[];
  result: string;
  resultText: string;
  gradient: string;
  link: string;
  reverse?: boolean;
}

const WORK_ITEMS: WorkItemData[] = [
  {
    num: '01',
    badge: 'Web App',
    title: 'FinFlow Dashboard',
    desc: 'Real-time analytics dashboard for a fintech startup. Clean data viz, dark mode, responsive.',
    tags: ['React', 'D3.js', 'UI/UX'],
    result: '4.2x',
    resultText: 'user engagement increase',
    gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    link: 'https://finflow.example.com',
  },
  {
    num: '02',
    badge: 'Brand + Web',
    title: 'Verdant Brand System',
    desc: 'Complete brand identity and marketing site for a sustainable agriculture platform.',
    tags: ['Branding', 'Web Design', 'Webflow'],
    result: '220%',
    resultText: 'increase in qualified leads',
    gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
    link: 'https://verdant.example.com',
    reverse: true,
  },
  {
    num: '03',
    badge: 'SaaS Platform',
    title: 'Pulse Health Platform',
    desc: 'End-to-end telehealth SaaS — patient portal, doctor dashboard, and booking system.',
    tags: ['Next.js', 'Node.js', 'Product Design'],
    result: '$2.4M',
    resultText: 'raised post-launch',
    gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    link: 'https://pulse.example.com',
  },
  {
    num: '04',
    badge: 'E-Commerce',
    title: 'Nomad Outdoor Gear',
    desc: 'Premium e-commerce for a DTC outdoor brand. Custom Shopify theme with storytelling UX.',
    tags: ['Shopify', 'E-Commerce', 'Animation'],
    result: '68%',
    resultText: 'improvement in conversion rate',
    gradient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    link: 'https://nomad.example.com',
    reverse: true,
  },
];

/* ── Cursor-based floating parallax ── */
function useParallaxFloat(intensity: number = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);

      x.set(dx * intensity);
      y.set(dy * (intensity * 0.7));
      rotateY.set(dx * 4);
      rotateX.set(-dy * 3);
    },
    [x, y, rotateX, rotateY, intensity]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [x, y, rotateX, rotateY]);

  return {
    style: {
      x: springX,
      y: springY,
      rotateX: springRotateX,
      rotateY: springRotateY,
    },
    onMouseMove,
    onMouseLeave,
  };
}

/* ── Single Work Card ── */
function WorkItem({ item }: { item: WorkItemData }) {
  const ref = useRef<HTMLDivElement>(null);
  const isReverse = !!item.reverse;
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  /* scroll-linked reveal */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'start 0.55'],
  });

  const imgX = useTransform(scrollYProgress, [0, 1], [isReverse ? 80 : -80, 0]);
  const infoX = useTransform(scrollYProgress, [0, 1], [isReverse ? -80 : 80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* scroll parallax on image */
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgScroll } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgYPercent = useTransform(imgScroll, [0, 1], [5, -5]);

  /* cursor-based floating parallax */
  const parallax = useParallaxFloat(16);

  return (
    <motion.div
      ref={ref}
      className={`work-orig-item${isReverse ? ' work-orig-item--reverse' : ''}`}
      style={{ opacity }}
    >
      <motion.div
        className="work-orig-img"
        ref={imgRef}
        style={{
          background: item.gradient,
          x: imgX,
          y: imgYPercent,
          ...(isFinePointer
            ? {
                translateX: parallax.style.x,
                translateY: parallax.style.y,
                rotateX: parallax.style.rotateX,
                rotateY: parallax.style.rotateY,
              }
            : {}),
        }}
        onMouseMove={isFinePointer ? parallax.onMouseMove : undefined}
        onMouseLeave={isFinePointer ? parallax.onMouseLeave : undefined}
        data-hover
      >
        <span className="work-orig-badge">{item.badge}</span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="work-orig-img-link"
          aria-label={`Visit ${item.title}`}
        >
          <span className="work-orig-img-link-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H6M16 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </motion.div>
      <motion.div className="work-orig-info" style={{ x: infoX }}>
        <span className="work-orig-num">{item.num}</span>
        <h3>
          <a href={item.link} target="_blank" rel="noopener noreferrer" data-hover>
            {item.title}
          </a>
        </h3>
        <p>{item.desc}</p>
        <div className="work-orig-tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="work-orig-result">
          <strong>{item.result}</strong> {item.resultText}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function WorkOriginal() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start 0.88', 'start 0.55'],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section className="work-orig-section" id="work">
      <div className="container">
        <motion.div
          className="section-header"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag section-tag--light">Selected Work</span>
          <h2 className="section-title section-title--light">
            Products that speak <em>for themselves.</em>
          </h2>
        </motion.div>
        <div className="work-orig-grid">
          {WORK_ITEMS.map((item) => (
            <WorkItem key={item.num} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
