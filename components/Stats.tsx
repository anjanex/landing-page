"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";

function StatNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, target]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return (
    <span className="stat-num" data-count={target} ref={ref}>
      {display}
    </span>
  );
}

const STATS = [
  { target: 50, suffix: "+", label: "Products Shipped" },
  { target: 30, suffix: "+", label: "Startups Scaled" },
  { target: 7, suffix: "+", label: "Years Avg. Experience" },
  { target: 3, suffix: "x", label: "Avg. Revenue Lift" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.60"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <motion.div className="stats-grid" style={{ opacity, y }}>
          {STATS.map((stat, i) => (
            <div key={i} className="stat-col">
              {i > 0 && <div className="stat-line" />}
              <div className="stat">
                <div className="stat-value">
                  <StatNumber target={stat.target} />
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
