'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HomeHero.css';

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Staggered fade-in for text elements
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hh-animate');
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.18}s`;
    });
  }, []);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Raw transforms - scale the sticky container down, not padding
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.985]);
  const radiusRaw = useTransform(scrollYProgress, [0, 0.5], [0, 12]);

  // Convert numeric radius to px string for borderRadius
  const borderRadius = useTransform(radiusRaw, (v: number) => `${v}px`);

  return (
    <section ref={sectionRef} className="home-hero-scroll-wrapper">
      {/* Sticky layer - stays pinned; scale drives the "card pull-away" */}
      <motion.div
        className="home-hero"
        style={{
          scale,
          borderRadius,
          transformOrigin: 'center center',
          willChange: 'transform, border-radius',
        }}
      >

        {/* ── CONTENT BLOCK ── */}
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
      </motion.div>
    </section>
  );
}
