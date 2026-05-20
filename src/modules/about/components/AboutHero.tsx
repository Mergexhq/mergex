'use client';

import { useEffect, useRef } from 'react';

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hero-animate');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.1 + i * 0.12}s`;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-hero"
    >
      {/* Vertical rule */}
      <div className="hero-vline" />

      <p className="hero-eyebrow hero-animate">The MergeX Company — Est. 2025</p>

      <div className="hero-grid">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-tag hero-animate">About MergeX</div>
          <h1 className="hero-heading hero-animate">
            Structure<br />
            before<br />
            <em>everything.</em>
          </h1>
          <p className="hero-founding hero-animate">Founded 2025 · Chennai, India</p>
        </div>

        {/* Right */}
        <div className="hero-right">
          <p className="hero-para hero-animate">
            MergeX is a <strong>business consulting firm</strong>{' '}
            built for scaling companies. We don&apos;t prescribe solutions
            before understanding the problem. Every engagement begins with
            diagnosing the exact structural, operational, or strategic
            constraint limiting your growth.
            <br /><br />
            Most consulting firms sell advice. We identify the actual constraint
            first — then build only what resolves it.
          </p>
          <div className="hero-scroll hero-animate">
            <span className="hero-scroll-line" />
            Continue reading
          </div>
        </div>
      </div>
    </section>
  );
}
