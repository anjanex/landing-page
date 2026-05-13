"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

const Stars = () => (
  <div className="testimonial-stars">
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
  </div>
);

const TESTIMONIALS = [
  {
    quote:
      "\u201CAnjanex didn\u2019t just build our website \u2014 they understood our vision and translated it into something that actually converts.\u201D",
    name: "Rahul Mehta",
    role: "Founder, FinFlow",
    initial: "R",
    gradient: "linear-gradient(135deg,#667eea,#764ba2)",
    featured: false,
  },
  {
    quote:
      "\u201CZero to a fully funded product in 8 weeks. They handled brand, design, development \u2014 while I focused on the business. They feel like an extension of our team.\u201D",
    name: "Sarah Chen",
    role: "CEO, Pulse Health",
    initial: "S",
    gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
    featured: true,
  },
  {
    quote:
      "\u201CConversion rate jumped 68% after the redesign. Great taste with solid engineering. Would recommend to anyone serious about their web presence.\u201D",
    name: "Alex Rivera",
    role: "Head of Marketing, Nomad",
    initial: "A",
    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
    featured: false,
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.55"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={ref}
      className={`testimonial-card${testimonial.featured ? " testimonial-card--featured" : ""}`}
      style={{ opacity, y, scale }}
    >
      <Stars />
      <blockquote>{testimonial.quote}</blockquote>
      <div className="testimonial-author">
        <div
          className="testimonial-avatar"
          style={{ background: testimonial.gradient }}
        >
          {testimonial.initial}
        </div>
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials" id="about">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-tag">What clients say</span>
          <h2 className="section-title">
            We don&apos;t have clients.
            <br />
            <em>We have success stories.</em>
          </h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
