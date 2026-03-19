"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Icon } from "@iconify/react";

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  side: "left" | "right";
  iconName: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Listen & Understand",
    desc: "We start by understanding YOUR business — your market, your users, your competition, your dream. Not just a brief.",
    side: "left",
    iconName: "lucide:eye",
  },
  {
    num: "02",
    title: "Plan & Architect",
    desc: "Wireframes, user flows, tech stack decisions, project roadmap — every detail meticulously planned before a single line of code.",
    side: "right",
    iconName: "lucide:layers",
  },
  {
    num: "03",
    title: "Design & Prototype",
    desc: "High-fidelity designs and clickable prototypes. We iterate until you say \"that's exactly it.\" No guesswork.",
    side: "left",
    iconName: "lucide:pen-tool",
  },
  {
    num: "04",
    title: "Develop & Test",
    desc: "Production-grade code with modern frameworks. Rigorous testing. Every edge case handled. Every device perfect.",
    side: "right",
    iconName: "lucide:code-2",
  },
  {
    num: "05",
    title: "Launch & Deploy",
    desc: "We launch WITH you — deployment, monitoring, performance tuning, the nervous first 48 hours. We're right there.",
    side: "left",
    iconName: "lucide:rocket",
  },
  {
    num: "06",
    title: "Scale & Grow Together",
    desc: "Post-launch support, analytics, iteration, marketing systems. We're not vendors — we're your growth partners. Always.",
    side: "right",
    iconName: "lucide:trending-up",
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isLeft = step.side === "left";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.55"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [isLeft ? -70 : 70, 0]
  );
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  const cardInner = (
    <div className="process-card-inner">
      <div className="process-card-icon">
        <Icon icon={step.iconName} width={24} height={24} color="var(--accent)" />
      </div>
      <span className="process-card-num">{step.num}</span>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );

  const connector = (
    <div className="process-connector">
      <div className="process-connector-dot"></div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      className={`process-card process-card--${step.side}${isInView ? " active" : ""}`}
      data-step=""
      style={{ opacity, x, y }}
    >
      {isLeft ? (
        <>
          {cardInner}
          {connector}
        </>
      ) : (
        <>
          {connector}
          {cardInner}
        </>
      )}
    </motion.div>
  );
}

export default function Process() {
  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start 0.88", "start 0.55"],
  });
  const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
  const headerY = useTransform(headerScroll, [0, 1], [50, 0]);

  const gridRef = useRef(null);
  const { scrollYProgress: gridScroll } = useScroll({
    target: gridRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const lineHeight = useTransform(gridScroll, [0, 1], ["0%", "100%"]);

  return (
    <section className="process-section" id="process">
      <div className="container">
        <motion.div
          className="section-header section-header--center"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag">How we work</span>
          <h2 className="section-title">
            From thought to launch.
            <br />
            <em>A process built for clarity.</em>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Six steps. Zero confusion. Every milestone visible. Every decision
            intentional.
          </p>
        </motion.div>
        <div className="process-grid" ref={gridRef}>
          <div className="process-center-line">
            <motion.div
              className="process-center-fill"
              id="processLineFill"
              style={{ height: lineHeight }}
            />
          </div>

          {PROCESS_STEPS.map((step) => (
            <ProcessCard key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
