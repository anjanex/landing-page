"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Promise() {
  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start 0.88", "start 0.55"],
  });
  const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1]);
  const headerY = useTransform(headerScroll, [0, 1], [50, 0]);

  const leftRef = useRef(null);
  const { scrollYProgress: leftScroll } = useScroll({
    target: leftRef,
    offset: ["start 0.85", "start 0.55"],
  });
  const leftOpacity = useTransform(leftScroll, [0, 1], [0, 1]);
  const leftX = useTransform(leftScroll, [0, 1], [-70, 0]);

  const rightRef = useRef(null);
  const { scrollYProgress: rightScroll } = useScroll({
    target: rightRef,
    offset: ["start 0.85", "start 0.55"],
  });
  const rightOpacity = useTransform(rightScroll, [0, 1], [0, 1]);
  const rightX = useTransform(rightScroll, [0, 1], [70, 0]);

  const leftNumRef = useRef(null);
  const { scrollYProgress: leftNumScroll } = useScroll({
    target: leftNumRef,
    offset: ["start 0.85", "start 0.55"],
  });
  const leftNumScale = useTransform(leftNumScroll, [0, 1], [0.7, 1]);
  const leftNumOpacity = useTransform(leftNumScroll, [0, 1], [0, 1]);

  const rightNumRef = useRef(null);
  const { scrollYProgress: rightNumScroll } = useScroll({
    target: rightNumRef,
    offset: ["start 0.85", "start 0.55"],
  });
  const rightNumScale = useTransform(rightNumScroll, [0, 1], [0.7, 1]);
  const rightNumOpacity = useTransform(rightNumScroll, [0, 1], [0, 1]);

  return (
    <section className="promise-section" id="promise">
      <div className="container">
        <motion.div
          className="section-header section-header--center"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag">Our Promise</span>
          <h2 className="section-title">
            From zero to one.
            <br />
            <em>Then one to a hundred.</em>
          </h2>
        </motion.div>
        <div className="promise-grid">
          <motion.div
            className="promise-card promise-card--left"
            ref={leftRef}
            style={{ opacity: leftOpacity, x: leftX }}
          >
            <motion.div
              className="promise-num"
              ref={leftNumRef}
              style={{ scale: leftNumScale, opacity: leftNumOpacity }}
            >
              0 &rarr; 1
            </motion.div>
            <h3>Build From Scratch</h3>
            <p>
              You have an idea. Maybe just a thought. We turn it into a
              designed, developed, tested, and launched digital product — ready
              for real users, real revenue, real growth.
            </p>
            <ul className="promise-list">
              <li>Idea validation &amp; strategy</li>
              <li>MVP design &amp; development</li>
              <li>Launch &amp; first users</li>
            </ul>
          </motion.div>
          <div className="promise-divider">
            <div className="promise-divider-line"></div>
            <div className="promise-divider-dot"></div>
          </div>
          <motion.div
            className="promise-card promise-card--right"
            ref={rightRef}
            style={{ opacity: rightOpacity, x: rightX }}
          >
            <motion.div
              className="promise-num"
              ref={rightNumRef}
              style={{ scale: rightNumScale, opacity: rightNumOpacity }}
            >
              1 &rarr; 100
            </motion.div>
            <h3>Scale &amp; Dominate</h3>
            <p>
              Already have a product? We scale it. Performance optimization, AI
              automation, new features, marketing systems — everything to go from
              &quot;it works&quot; to &quot;it dominates.&quot;
            </p>
            <ul className="promise-list">
              <li>Performance &amp; scaling</li>
              <li>AI-powered automation</li>
              <li>Growth marketing &amp; analytics</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
