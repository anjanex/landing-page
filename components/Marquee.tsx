"use client";

const ITEMS = [
  "Startups",
  "SaaS",
  "E-Commerce",
  "Fintech",
  "Healthcare",
  "Education",
  "AI & ML",
  "Real Estate",
  "Logistics",
];

export default function Marquee() {
  const content = ITEMS.map((item, i) => (
    <span key={i}>
      <span className="marquee-item">{item}</span>
      <span className="marquee-dot"></span>
    </span>
  ));

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {content}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <span key={`dup-${i}`}>
              <span className="marquee-item">{item}</span>
              <span className="marquee-dot"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
