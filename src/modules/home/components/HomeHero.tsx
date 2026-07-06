'use client';

import { useEffect, useRef } from 'react';
import './HomeHero.css';

export function HomeHero() {
  const wrapperRef = useRef<HTMLElement>(null);

  // Staggered fade-in for text elements on mount
  useEffect(() => {
    const items = wrapperRef.current?.querySelectorAll('.hh-animate');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.18}s`;
    });
  }, []);

  return (
    <section ref={wrapperRef} className="home-hero-scroll-wrapper">
      {/* ── HERO LAYER ── */}
      <div className="home-hero">
        {/* ── HERO CONTENT ── */}
        <div className="hh-content">
          <div className="hh-push-up flex flex-col items-center">
            <div>
              <p className="hh-eyebrow hh-animate">SCALING INFRASTRUCTURE COMPANY</p>
            </div>
            <div className="hh-top-content">
              <h1 className="hh-heading">
                <span className="hh-heading-line hh-animate">Scale is not luck.</span>
                <span className="hh-heading-accent hh-animate">It&apos;s structure.</span>
              </h1>
            </div>
          </div>

          <div className="hh-bottom-content">
            <p className="hh-sub hh-animate">
              Infrastructure for businesses that intend to scale deliberately,<br />
              with systems built to reduce friction and support scalable execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
