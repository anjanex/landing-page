'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';

/* ── Project data ── */
interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
  imageMobile?: string;
  imagePosition?: string;
  imagePositionMobile?: string;
  imageFit?: 'cover' | 'contain';
  imageFitMobile?: 'cover' | 'contain';
  mobileAspectRatio?: string;
  gradient: string;
  link: string;
  span: 'wide' | 'tall' | 'normal';
}

const PROJECTS: Project[] = [
  {
    id: 'folks',
    title: 'Folks — Therapy Platform',
    category: 'Health & Wellness',
    image: '/projects/folks.png',
    imageMobile: '/projects/folks-mobile.png',
    imagePosition: 'center top',
    imagePositionMobile: 'center top',
    imageFitMobile: 'contain',
    mobileAspectRatio: '0.9 / 1',
    gradient: 'linear-gradient(to bottom, #6b8f7b 60%, #8aad9a 100%)',
    link: 'https://folksmentalhealth.com/',
    span: 'wide',
  },
  {
    id: 'omsai',
    title: 'Om Sai Ashram',
    category: 'Brand Identity',
    image: '/projects/omsai.png',
    imagePosition: 'center 30%',
    gradient: 'linear-gradient(135deg, #d4cfc8, #b8b0a5)',
    link: 'https://om-sai-demo-web.netlify.app/',
    span: 'normal',
  },
  {
    id: 'farm',
    title: 'Eco Poultry Farm',
    category: 'Brand Identity',
    image: '/projects/farm.png',
    imagePosition: 'center center',
    imageFit: 'contain',
    imageFitMobile: 'contain',
    imagePositionMobile: 'center center',
    mobileAspectRatio: '1.19 / 1',
    gradient: '#A1875F',
    link: 'https://ecofarm.netlify.app/',
    span: 'normal',
  },
  {
    id: 'tractable',
    title: 'Tractable',
    category: 'AI & Automotive',
    image: '/projects/tractable.png',
    imageMobile: '/projects/tractable-mobile.png',
    imagePosition: 'center top',
    imagePositionMobile: 'center top',
    gradient: 'linear-gradient(135deg, #2a3a4a, #1a2a3a)',
    link: 'https://tractable.ai/',
    span: 'wide',
  },
];

/* ── Cursor-float hook ── */
function useCursorFloat(intensity: number) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 24 });
  const springY = useSpring(y, { stiffness: 120, damping: 24 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      x.set(dx * intensity);
      y.set(dy * intensity * 0.6);
    },
    [x, y, intensity]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { springX, springY, onMove, onLeave };
}

/* ── Single project card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isFine, setIsFine] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsFine(window.matchMedia('(pointer: fine)').matches);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Scroll reveal */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.92', 'start 0.62'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  /* Cursor parallax */
  const { springX, springY, onMove, onLeave } = useCursorFloat(12);

  const spanClass =
    project.span === 'wide'
      ? 'works-card--wide'
      : project.span === 'tall'
        ? 'works-card--tall'
        : '';

  return (
    <motion.div
      ref={cardRef}
      className={`works-card ${spanClass}`}
      style={{ opacity, y: translateY }}
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`works-card-link${(() => {
          const effectiveFit = isMobile && project.imageFitMobile ? project.imageFitMobile : (project.imageFit || 'cover');
          return effectiveFit === 'contain' ? ' works-card-link--contain' : '';
        })()}`}
        style={{
          background: project.gradient,
          x: isFine ? springX : 0,
          y: isFine ? springY : 0,
          ...(isMobile && project.mobileAspectRatio && (project.imageFitMobile === 'contain')
            ? { aspectRatio: project.mobileAspectRatio, minHeight: 'unset' } as React.CSSProperties
            : {}),
        }}
        onMouseMove={isFine ? onMove : undefined}
        onMouseLeave={isFine ? onLeave : undefined}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-hover
      >
        {project.image && !imgError && (() => {
          const imgSrc = (isMobile && project.imageMobile) ? project.imageMobile : project.image;
          const imgFit = (isMobile && project.imageFitMobile) ? project.imageFitMobile : (project.imageFit || 'cover');
          const imgPos = (isMobile && project.imagePositionMobile) ? project.imagePositionMobile : (project.imagePosition || 'center center');
          return (
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: imgFit,
                objectPosition: imgPos,
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          );
        })()}

        {/* Hover overlay */}
        <div className="works-card-overlay">
          <div className="works-card-info">
            <span className="works-card-category">{project.category}</span>
            <span className="works-card-name">{project.title}</span>
          </div>
          <span className="works-card-arrow">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 16L16 4M16 4H6M16 4V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ── Main section ── */
export default function WorksSection() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start 0.88', 'start 0.55'],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section className="works-section" id="work">
      <div className="container">
        <motion.div
          className="section-header section-header--center"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">
            Products that speak <em>for themselves.</em>
          </h2>
          <p className="section-desc">
            Real projects. Real results. Click any project to see it live.
          </p>
        </motion.div>

        <div className="works-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
