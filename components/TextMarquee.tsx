"use client";

export default function TextMarquee() {
  return (
    <div className="text-marquee">
      <div className="text-marquee-track">
        <div className="text-marquee-content">
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
        </div>
        <div className="text-marquee-content" aria-hidden="true">
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
          <span>Let&apos;s Build Together</span>
          <span className="text-marquee-star">✦</span>
        </div>
      </div>
    </div>
  );
}
