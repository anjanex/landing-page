"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.5"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section className="cta-section" id="contact">
      <motion.div className="cta-container" ref={ref} style={{ opacity, y }}>
        <span className="section-tag section-tag--light">Ready to build?</span>
        <h2 className="cta-title">
          Your idea deserves more than a quote.
          <br />
          <em>It deserves a partner.</em>
        </h2>
        <p className="cta-desc">
          Tell us what you&apos;re building. Whether it&apos;s day one or day
          one thousand &mdash; we&apos;ll show you exactly how we&apos;d make it
          happen.
        </p>
        <div className="cta-actions">
          <a
            href="https://wa.me/917977933565?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
            target="_blank"
            rel="noopener noreferrer"
            aria-label='BuildTogether'
            className="btn btn--primary btn--large"
            data-hover
            data-magnetic
          >
            <span className="btn-text">Let&apos;s Build Together</span>
            <span className="btn-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 16L16 4M16 4H6M16 4V14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <a
            href="https://wa.me/917977933565?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
            target="_blank"
            rel="noopener noreferrer"
            aria-label='BookCall'
            className="btn btn--ghost-light" data-hover
          >
            <span className="btn-text">Book a Free Strategy Call</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
