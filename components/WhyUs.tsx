"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WHY_CARDS = [
  {
    title: "Products, Not Projects",
    desc: "We think like co-founders. We ship products built for profit, not just deliverables.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "7+ Years Per Head",
    desc: "No juniors learning on your dime. Every team member has deep domain expertise.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Capability",
    desc: "Design, develop, AI, marketing, launch \u2014 one team covers everything. Zero handoff gaps.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: "AI-First Thinking",
    desc: "We automate before we hire. Agentic AI, RAG, LLMs \u2014 built into every solution.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Growth Partnership",
    desc: "We succeed when you succeed. We don\u2019t disappear after launch \u2014 we grow together.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: "Startup-Native",
    desc: "We understand burn rates, MVPs, pivots, and speed. Built for the startup pace.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

function WhyCard({ card }: { card: (typeof WHY_CARDS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.68"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div ref={ref} className="why-card" style={{ opacity, y }}>
      <div className="why-icon">{card.icon}</div>
      <h4>{card.title}</h4>
      <p>{card.desc}</p>
    </motion.div>
  );
}

export default function WhyUs() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 0.88", "start 0.55"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section className="why-section">
      <div className="container">
        <motion.div
          className="section-header section-header--center"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag">The difference</span>
          <h2 className="section-title">
            Why 30+ startups <em>chose us.</em>
          </h2>
        </motion.div>
        <div className="why-grid">
          {WHY_CARDS.map((card) => (
            <WhyCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
