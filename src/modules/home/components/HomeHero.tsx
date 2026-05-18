'use client';

import { useEffect, useRef } from 'react';
import './HomeHero.css';

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hh-animate');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.18}s`;
    });
  }, []);

  return (
    <section ref={sectionRef} className="home-hero">
      <div className="hh-bg" aria-hidden="true" />
      <div className="hh-overlay" aria-hidden="true" />

      <div className="hh-content">
        <p className="hh-eyebrow hh-animate">The MergeX Company</p>

        <h1 className="hh-heading">
          <span className="hh-heading-line hh-animate">Scale is not luck.</span>
          <span className="hh-heading-accent hh-animate">It&apos;s structure.</span>
        </h1>

        <p className="hh-sub hh-animate">
          Infrastructure for businesses that intend to scale deliberately.
        </p>
      </div>
    </section>
  );
}
