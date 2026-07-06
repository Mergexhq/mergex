'use client';

import React, { useRef, Fragment } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShowcaseFeed } from '@/modules/new-home/components/ShowcaseFeed';

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
  const sectionRef = useRef<HTMLElement>(null);
  const feedInnerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const grayFrameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        const isMobile = window.innerWidth < 768;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=800%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              if (feedInnerRef.current) gsap.set(feedInnerRef.current, { clearProps: "transform" });
            },
            onEnterBack: () => {
              if (feedInnerRef.current) gsap.set(feedInnerRef.current, { transformOrigin: "center top", transformPerspective: 900 });
            }
          },
        });

        // Setup ShowcaseFeed 3D state
        gsap.set(feedInnerRef.current, { transformOrigin: "center top", transformPerspective: 900 });

        // Initial state for annotations
        gsap.set('.scale-annotation-line', { scaleY: 0, opacity: 0 });
        gsap.set('.scale-annotation-dot', { scale: 0, opacity: 0 });
        gsap.set('.scale-annotation-text', { opacity: 0, y: 8 });

        // Initial buffer
        tl.to({}, { duration: 1.5 });

        // Step through each letter
        LETTERS.forEach((letter, i) => {
          const wrapperEl = `.scale-annotation-${letter.id}`;
          const lineEl = `${wrapperEl} .scale-annotation-line`;
          const dotEl = `${wrapperEl} .scale-annotation-dot`;
          const textEl = `${wrapperEl} .scale-annotation-text`;
          const letterEls = `.scale-big-letter-${letter.id}`;

          // Activate letter + annotation
          tl.to(letterEls, { opacity: 1, duration: 0.5, ease: 'power2.out' }, `activate${i}`);
          tl.to(lineEl, { scaleY: 1, opacity: 0.35, duration: 0.8, ease: 'expo.out' }, `activate${i}`);
          tl.to(dotEl, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }, `activate${i}+=0.2`);
          tl.to(textEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, `activate${i}+=0.3`);

          // Hold
          tl.to({}, { duration: 1.5 });

          // Deactivate (except last)
          if (i < LETTERS.length - 1) {
            tl.to(letterEls, { opacity: 0.15, duration: 0.5, ease: 'power2.inOut' }, `deactivate${i}`);
            tl.to([lineEl, dotEl, textEl], { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, `deactivate${i}`);
          }
        });

        // Final - all letters full opacity
        tl.to('.scale-big-letter', { opacity: 1, duration: 1, ease: 'power2.inOut' }, 'final');

        // ZOOM TRANSITION
        tl.to({}, { duration: 1 }); // buffer before zoom starts
        
        const zoomStart = 'zoom_start';

        // 1. Fade out the Gray Frame (Top/Bottom) to reveal the full ShowcaseFeed background
        tl.to(grayFrameRef.current, { opacity: 0, duration: 2, ease: 'power2.inOut' }, zoomStart);

        // 2. Fade out all annotations, dots, and everything except the main letters
        tl.to('.scale-annotation-text, .scale-annotation-dot, .scale-annotation-line, .scale-dot', { 
            opacity: 0, duration: 1, ease: 'power2.inOut' 
        }, zoomStart);

        // 3. Massive Zoom of the text container into the 'A' hole
        tl.to('.scale-giant-container', {
            scale: 2500, // Massive zoom
            ease: 'power3.inOut',
            duration: 4,
            transformOrigin: "49.5% 58%" // Targets the empty space (counter) inside the letter A
        }, zoomStart);

        // 4. Parallax ShowcaseFeed into place
        tl.fromTo(
            feedInnerRef.current,
            {
              z: -700,
              rotationX: 32,
              y: isMobile ? "50dvh" : "90dvh",
              scale: 0.62,
              opacity: 0.7,
              x: '10%'
            },
            {
              z: 0,
              rotationX: 0,
              y: "0dvh",
              scale: 1,
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 4,
            },
            zoomStart
        );

        // Clean up the text layer at the very end to allow interaction
        tl.to(textLayerRef.current, { autoAlpha: 0, duration: 0.1 }, "+=0.1");
      });

    },
    { scope: sectionRef }
  );

  const giantTextFontSize = 'clamp(44px, 14vw, 220px)';
  const giantTextGap = 'clamp(2px, 1vw, 32px)';
  const dotFontSize = 'clamp(24px, 6vw, 120px)';

  const sharedTextContainerStyle: React.CSSProperties = {
    gap: giantTextGap,
    fontSize: giantTextFontSize,
    lineHeight: 1,
    fontFamily: 'var(--font-playfair-display, Georgia, serif)',
    fontWeight: 400,
  };

  const sharedLetterBaseStyle: React.CSSProperties = {
    display: 'inline-block', 
    opacity: 0.12, 
    fontStyle: 'italic'
  };

  const sharedDotBaseStyle: React.CSSProperties = {
    display: 'inline-block',
    opacity: 0.1,
    fontSize: dotFontSize,
    fontFamily: 'var(--font-playfair-display, Georgia, serif)',
    lineHeight: 1,
    alignSelf: 'flex-end',
    paddingBottom: '0.15em',
  };

  return (
    <section
      id="methodology"
      ref={sectionRef}
      className="scale-sticky-viewport relative w-full showcase-feed-pinned-container"
      style={{ fontFamily: 'var(--font-manrope, sans-serif)', backgroundColor: 'transparent' }}
    >
      {/* LAYER 0: ShowcaseFeed Background */}
      <div className="absolute inset-0 z-0">
        <div ref={feedInnerRef} className="w-full relative h-full flex flex-col justify-center">
          <div className="absolute w-full flex justify-center pointer-events-none z-10" style={{ top: "10%", transform: "translateY(-50%)" }}>
            <h1 className="text-[12vw] sm:text-[14vw] lg:text-[11vw] font-clash font-bold uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-none">
              OUR WORKS
            </h1>
          </div>
          <ShowcaseFeed />
        </div>
      </div>

      {/* LAYER 1: Gray Frame with Transparent Center Window */}
      <div ref={grayFrameRef} className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        {/* Top Solid Gray */}
        <div className="w-full bg-background pt-[100px] md:pt-[120px] pointer-events-auto shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <div className="scale-header-container relative w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 md:px-14 shrink-0 pb-12">
            <div className="absolute top-4 right-6 md:top-8 md:right-14 lg:top-10 z-20 hidden md:block">
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-foreground-muted)' }}>
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

        {/* Center Transparent Area */}
        <div className="relative w-full flex-1 bg-transparent pointer-events-none"></div>

        {/* Bottom Solid Gray */}
        <div className="w-full h-[15vh] bg-background pointer-events-auto shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"></div>
      </div>

      {/* LAYER 2: Text Container that ZOOMS into the hole of 'A' */}
      <div ref={textLayerRef} className="absolute inset-0 z-20 flex flex-col pointer-events-none overflow-hidden">
        {/* Invisible spacer matching Top Gray area */}
        <div className="w-full pt-[100px] md:pt-[120px] shrink-0 opacity-0 pointer-events-none">
          <div className="relative w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 md:px-14 shrink-0 pb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block">&nbsp;</span>
            <h2 className="font-clash font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider" style={{ lineHeight: 1.1 }}>&nbsp;</h2>
          </div>
        </div>

        {/* Center area: Animation Viewport */}
        <div className="scale-giant-container relative w-full flex-1 flex flex-col items-center justify-center bg-transparent min-h-0 pointer-events-auto">
          <div className="relative w-full flex items-center justify-center py-4">
            <div
              className="flex items-baseline justify-center px-4"
              style={{
                ...sharedTextContainerStyle,
                color: 'var(--color-foreground)',
              }}
            >
              {LETTERS.map((item, index) => (
                <Fragment key={item.id}>
                  {/* Letter + annotation wrapper */}
                  <div className="relative flex flex-col items-center">

                    {/* TOP annotation (C and L) */}
                    {item.direction === 'top' && (
                      <div className={`absolute bottom-full flex flex-col items-center scale-annotation-${item.id}`} style={{ marginBottom: '8px' }}>
                        <div className="scale-annotation-text text-center" style={{ marginBottom: '8px', width: 'clamp(72px, 10vw, 160px)' }}>
                          <p style={{ fontSize: 'clamp(9px, 0.9vw, 13px)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontFamily: 'var(--font-manrope, sans-serif)', marginBottom: '4px' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: 'clamp(8px, 0.75vw, 11px)', color: 'var(--color-foreground-muted)', lineHeight: 1.5, fontFamily: 'var(--font-manrope, sans-serif)', fontWeight: 400 }}>
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="scale-annotation-dot rounded-full" style={{ width: 'clamp(4px, 0.5vw, 8px)', height: 'clamp(4px, 0.5vw, 8px)', background: 'var(--color-foreground)' }} />
                          <div className="scale-annotation-line origin-top" style={{ width: '1px', height: 'clamp(16px, 3vw, 48px)', background: 'var(--color-foreground)', marginTop: '4px' }} />
                        </div>
                      </div>
                    )}

                    {/* The letter itself */}
                    <span
                      className={`scale-big-letter scale-big-letter-${item.id} relative z-10`}
                      style={sharedLetterBaseStyle}
                    >
                      {item.id}
                    </span>

                    {/* BOTTOM annotation (S, A, E) */}
                    {item.direction === 'bottom' && (
                      <div className={`absolute top-full flex flex-col items-center scale-annotation-${item.id}`} style={{ marginTop: '8px' }}>
                        <div className="flex flex-col items-center">
                          <div className="scale-annotation-line origin-top" style={{ width: '1px', height: 'clamp(16px, 3vw, 48px)', background: 'var(--color-foreground)', marginBottom: '4px' }} />
                          <div className="scale-annotation-dot rounded-full" style={{ width: 'clamp(4px, 0.5vw, 8px)', height: 'clamp(4px, 0.5vw, 8px)', background: 'var(--color-foreground)' }} />
                        </div>
                        <div className={`scale-annotation-text ${ item.id === 'S' ? 'text-left sm:text-center' : item.id === 'E' ? 'text-right sm:text-center' : 'text-center' }`} style={{ marginTop: '8px', width: 'clamp(72px, 10vw, 160px)', transform: item.id === 'S' ? 'translateX(10%)' : (item.id === 'E' ? 'translateX(-10%)' : 'none') }}>
                          <p style={{ fontSize: 'clamp(9px, 0.9vw, 13px)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontFamily: 'var(--font-manrope, sans-serif)', marginBottom: '4px' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: 'clamp(8px, 0.75vw, 11px)', color: 'var(--color-foreground-muted)', lineHeight: 1.5, fontFamily: 'var(--font-manrope, sans-serif)', fontWeight: 400 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dot separator between letters */}
                  {index < LETTERS.length - 1 && (
                    <span
                      className="scale-dot"
                      style={{
                        ...sharedDotBaseStyle,
                        color: 'var(--color-foreground)',
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

        {/* Invisible spacer matching Bottom Gray area */}
        <div className="w-full h-[15vh] shrink-0 opacity-0 pointer-events-none"></div>
      </div>
    </section>
  );
}
