"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    name: "Web Design & Development",
    desc: "Pixel-perfect websites and web apps built with React, Next.js, and modern frameworks. Fast, responsive, conversion-optimized.",
    tags: ["React", "Next.js", "UI/UX"],
  },
  {
    num: "02",
    name: "Mobile App Development",
    desc: "Native and cross-platform mobile apps that your users actually want to open every day. iOS, Android, everywhere.",
    tags: ["React Native", "Flutter", "iOS"],
  },
  {
    num: "03",
    name: "AI & Intelligent Automation",
    desc: "Agentic AI, RAG pipelines, LLM integrations, computer vision, NLP \u2014 we build AI that works in the real world, not just demos.",
    tags: ["Agentic AI", "RAG", "LLM"],
  },
  {
    num: "04",
    name: "Brand Identity & Design Systems",
    desc: "Logos, typography, color systems, and design languages that make your brand instantly recognizable and impossible to forget.",
    tags: ["Logo", "Brand Book", "Design System"],
  },
  {
    num: "05",
    name: "Digital Marketing & Growth",
    desc: "SEO, social media, paid campaigns, content strategy \u2014 we don\u2019t just build your product, we make sure the world finds it.",
    tags: ["SEO", "Paid Ads", "Content"],
  },
  {
    num: "06",
    name: "Digital Transformation",
    desc: "Taking your business from offline to online. We build the systems, automate workflows, and digitize operations end-to-end.",
    tags: ["Automation", "SaaS", "Cloud"],
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.65"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const match = window.matchMedia("(pointer: fine)");
    setHasFinePointer(match.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateY: x * 6,
      rotateX: -yPos * 4,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className="service-card"
      data-service=""
      style={{
        opacity,
        y,
        transformPerspective: 1000,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transition: "rotateX 0.15s ease-out, rotateY 0.15s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="service-num">{service.num}</span>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-desc">{service.desc}</p>
      <div className="service-tags">
        {service.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 0.88", "start 0.55"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          className="section-header"
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="section-tag">What we do</span>
          <h2 className="section-title">
            We design & build <em>digital products</em> that actually work.
          </h2>
          <p className="section-desc">
            From concept to launch, we handle every layer of your product —
            design, code, AI, brand, and growth. One team. Zero gaps.
          </p>
        </motion.div>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
