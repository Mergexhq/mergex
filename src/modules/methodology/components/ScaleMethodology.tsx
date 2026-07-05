'use client';

import React, { useRef, Fragment } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LETTERS = [
  {
    id: 'S',
    name: 'Scan',
    desc: 'Map the full business system - revenue, sales motion, operations, and leadership capacity.',
    direction: 'bottom' as const,
  },
  {
    id: 'C',
    name: 'Compress',
    desc: 'Identify the single root constraint holding everything else back.',
    direction: 'top' as const,
  },
  {
    id: 'A',
    name: 'Architect',
    desc: 'Design the precise operational system needed to resolve the constraint.',
    direction: 'bottom' as const,
  },
  {
    id: 'L',
    name: 'Launch',
    desc: 'Execute against the blueprint - sequenced, intentional, and measured.',
    direction: 'top' as const,
  },
  {
    id: 'E',
    name: 'Embed',
    desc: 'Transfer full system ownership to the founder and their team.',
    direction: 'bottom' as const,
  },
];

export function ScaleMethodology() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=450%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state
      gsap.set('.scale-annotation-line', { scaleY: 0, opacity: 0 });
      gsap.set('.scale-annotation-dot', { scale: 0, opacity: 0 });
      gsap.set('.scale-annotation-text', { opacity: 0, y: 8 });

      // Phase 1: Expand layout smoothly (novel solution to spacing)
      tl.add('expand');
      tl.to('.scale-header-container', {
        y: '6vh',
        duration: 1,
        ease: 'power2.inOut'
      }, 'expand');
      tl.to('.scale-giant-container', {
        y: '18vh', // Smoothly pushes giant text down, eating into the large bottom padding
        duration: 1,
        ease: 'power2.inOut'
      }, 'expand');

      tl.to({}, { duration: 0.2 }); // small pause

      // Step through each letter
      LETTERS.forEach((letter, i) => {
        const wrapperEl = `.scale-annotation-${letter.id}`;
        const lineEl = `${wrapperEl} .scale-annotation-line`;
        const dotEl = `${wrapperEl} .scale-annotation-dot`;
        const textEl = `${wrapperEl} .scale-annotation-text`;
        const letterEl = `.scale-big-letter-${letter.id}`;

        // Activate letter + annotation
        tl.to(
          letterEl,
          { opacity: 1, duration: 0.5, ease: 'power2.out' },
          `activate${i}`
        );
        tl.to(
          lineEl,
          { scaleY: 1, opacity: 0.35, duration: 0.8, ease: 'expo.out' },
          `activate${i}`
        );
        tl.to(
          dotEl,
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
          `activate${i}+=0.2`
        );
        tl.to(
          textEl,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          `activate${i}+=0.3`
        );

        // Hold
        tl.to({}, { duration: 1.5 });

        // Deactivate (except last)
        if (i < LETTERS.length - 1) {
          tl.to(
            letterEl,
            { opacity: 0.15, duration: 0.5, ease: 'power2.inOut' },
            `deactivate${i}`
          );
          tl.to(
            [lineEl, dotEl, textEl],
            { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
            `deactivate${i}`
          );
        }
      });

      // Final - all letters full opacity
      tl.to(
        '.scale-big-letter',
        { opacity: 1, duration: 1, ease: 'power2.inOut' },
        'final'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="scale-sticky-viewport relative w-full bg-background flex flex-col overflow-hidden pb-[20vh] md:pb-[25vh] lg:pb-[30vh]"
      style={{ 
        fontFamily: 'var(--font-manrope, sans-serif)',
      }}
    >
      {/* Top area: Static Section Header */}
      <div className="w-full flex flex-col justify-start z-20 pointer-events-none">
        <div className="scale-header-container relative w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 md:px-14 pt-4 md:pt-8 lg:pt-10 shrink-0 pointer-events-auto">
          {/* Stage counter - top right */}
          <div className="absolute top-4 right-6 md:top-8 md:right-14 lg:top-10 z-20 hidden md:block">
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-foreground-muted)',
              }}
            >
              Scroll to reveal
            </p>
          </div>
          
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
            Our Framework
          </span>
          <h2 
            className="font-clash font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider"
            style={{ color: 'var(--color-foreground)', lineHeight: 1.1 }}
          >
            THE S.C.A.L.E. METHODOLOGY
          </h2>
        </div>
      </div>

      {/* Center area: Animation Viewport */}
      <div className="scale-giant-container relative w-full flex flex-col items-center justify-center bg-transparent mt-8 md:mt-12 lg:mt-16">

        {/* Giant S.C.A.L.E centrepiece */}
        <div className="relative w-full flex items-center justify-center z-10 py-12 md:py-16">
          <div
            className="flex items-baseline justify-center px-4"
            style={{
              gap: 'clamp(8px, 2vw, 32px)',
              fontSize: 'clamp(80px, 16vw, 220px)',
              lineHeight: 1,
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontWeight: 400,
              color: 'var(--color-foreground)',
            }}
          >
            {LETTERS.map((item, index) => (
              <Fragment key={item.id}>
                {/* Letter + annotation wrapper */}
                <div className="relative flex flex-col items-center">

                  {/* TOP annotation (C and L) */}
                  {item.direction === 'top' && (
                    <div
                      className={`absolute bottom-full flex flex-col items-center scale-annotation-${item.id}`}
                      style={{ marginBottom: '8px' }}
                    >
                      {/* Text */}
                      <div
                        className="scale-annotation-text text-center"
                        style={{
                          marginBottom: '8px',
                          width: 'clamp(80px, 10vw, 160px)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(9px, 0.9vw, 13px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-foreground)',
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: 'clamp(8px, 0.75vw, 11px)',
                            color: 'var(--color-foreground-muted)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            fontWeight: 400,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      {/* Connector: dot → line */}
                      <div className="flex flex-col items-center">
                        <div
                          className="scale-annotation-dot rounded-full"
                          style={{
                            width: 'clamp(4px, 0.5vw, 8px)',
                            height: 'clamp(4px, 0.5vw, 8px)',
                            background: 'var(--color-foreground)',
                          }}
                        />
                        <div
                          className="scale-annotation-line origin-top"
                          style={{
                            width: '1px',
                            height: 'clamp(16px, 3vw, 48px)',
                            background: 'var(--color-foreground)',
                            marginTop: '4px',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* The letter itself */}
                  <span
                    className={`scale-big-letter scale-big-letter-${item.id} relative z-10`}
                    style={{
                      display: 'inline-block',
                      opacity: 0.12,
                      fontStyle: 'italic',
                    }}
                  >
                    {item.id}
                  </span>

                  {/* BOTTOM annotation (S, A, E) */}
                  {item.direction === 'bottom' && (
                    <div
                      className={`absolute top-full flex flex-col items-center scale-annotation-${item.id}`}
                      style={{ marginTop: '8px' }}
                    >
                      {/* Connector: line → dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className="scale-annotation-line origin-top"
                          style={{
                            width: '1px',
                            height: 'clamp(16px, 3vw, 48px)',
                            background: 'var(--color-foreground)',
                            marginBottom: '4px',
                          }}
                        />
                        <div
                          className="scale-annotation-dot rounded-full"
                          style={{
                            width: 'clamp(4px, 0.5vw, 8px)',
                            height: 'clamp(4px, 0.5vw, 8px)',
                            background: 'var(--color-foreground)',
                          }}
                        />
                      </div>
                      {/* Text */}
                      <div
                        className="scale-annotation-text text-center"
                        style={{
                          marginTop: '8px',
                          width: 'clamp(80px, 10vw, 160px)',
                        }}
                      >
                        <p
                          style={{
                            fontSize: 'clamp(9px, 0.9vw, 13px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-foreground)',
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: 'clamp(8px, 0.75vw, 11px)',
                            color: 'var(--color-foreground-muted)',
                            lineHeight: 1.5,
                            fontFamily: 'var(--font-manrope, sans-serif)',
                            fontWeight: 400,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dot separator between letters */}
                {index < LETTERS.length - 1 && (
                  <span
                    style={{
                      display: 'inline-block',
                      opacity: 0.1,
                      color: 'var(--color-foreground)',
                      fontSize: 'clamp(40px, 8vw, 120px)',
                      fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                      lineHeight: 1,
                      alignSelf: 'flex-end',
                      paddingBottom: '0.15em',
                    }}
                  >
                    .
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
