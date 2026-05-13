"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const faqs = [
  {
    q: "What kind of products does Anjanex build?",
    a: "We work with startups, SMBs, and brands on web design, full-stack development, mobile apps, AI/ML products, brand identity, and digital marketing. Whether it\u2019s a SaaS dashboard, an agentic AI system, or a complete brand overhaul \u2014 if it lives in the digital world, we build it.",
  },
  {
    q: "Can you build AI/ML products?",
    a: "Absolutely. We build agentic AI workflows, RAG pipelines, computer vision systems, NLP chatbots, and LLM integrations. Our AI team has shipped production systems processing millions of requests for real businesses.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most products take 4\u20138 weeks from kickoff to launch. Simple marketing sites: 2\u20133 weeks. Complex web apps or AI systems: 10\u201312 weeks. We give you a clear timeline during our discovery call.",
  },
  {
    q: "Do you help with marketing too?",
    a: "Yes \u2014 brand strategy, SEO, social media, paid ads, and content marketing. Building a great product is half the battle. We fight the other half too.",
  },
  {
    q: "Can you take my offline business online?",
    a: "That\u2019s one of our specialties. From inventory systems to customer portals to online ordering \u2014 we digitize and automate your operations end-to-end so you can focus on growing.",
  },
  {
    q: "What does your pricing look like?",
    a: "Fixed-price quotes based on scope. No hourly billing surprises. After our discovery call, you get a detailed proposal \u2014 cost, timeline, deliverables. Transparent, no hidden fees.",
  },
];

function FaqTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.6"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.h2 className="faq-main-title" ref={ref} style={{ opacity, y }}>
      Frequently
      <br />
      Asked
    </motion.h2>
  );
}

function FaqItem({
  q,
  a,
  index,
  isOpen,
  toggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  toggle: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.75"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <motion.div
      ref={ref}
      className={`faq-item${isOpen ? " open" : ""}`}
      style={{ opacity, y }}
    >
      <button
        className="faq-q"
        aria-expanded={isOpen}
        onClick={() => toggle(index)}
      >
        <span>{q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">
        <p>{a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <FaqTitle />
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              q={faq.q}
              a={faq.a}
              index={i}
              isOpen={openIndex === i}
              toggle={toggleFaq}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
