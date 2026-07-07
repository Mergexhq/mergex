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
    mobileHeight: '3vh',
    desktopHeight: '3vw',
  },
  {
    id: 'C',
    name: 'Compress',
    desc: 'Identify the single root constraint holding everything else back.',
    direction: 'top' as const,
    mobileHeight: '3vh',
    desktopHeight: '3vw',
  },
  {
    id: 'A',
    name: 'Architect',
    desc: 'Design the precise operational system needed to resolve the constraint.',
    direction: 'bottom' as const,
    mobileHeight: '20vh', 
    desktopHeight: '3vw',
  },
  {
    id: 'L',
    name: 'Launch',
    desc: 'Execute against the blueprint - sequenced, intentional, and measured.',
    direction: 'top' as const,
    mobileHeight: '18vh', 
    desktopHeight: '3vw',
  },
  {
    id: 'E',
    name: 'Embed',
    desc: 'Transfer full system ownership to the founder and their team.',
    direction: 'bottom' as const,
    mobileHeight: '3vh',
    desktopHeight: '3vw',
  },
];

export function ScaleMethodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const feedInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%',
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

        // Flatten border radius as it reaches top
        gsap.to(sectionRef.current, {
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });

        // Move hero text up ONLY when the methodology section hits its bottom edge (with added gap)
        const hhPushUp = document.querySelector('.hh-push-up') as HTMLElement;
        if (hhPushUp) {
          const gap = 80; // Added gap between text and incoming section
          
          const getUnscrolledBottom = (el: HTMLElement) => {
            const currentTransform = el.style.transform;
            el.style.transform = 'none';
            const bottom = el.getBoundingClientRect().bottom;
            el.style.transform = currentTransform;
            return bottom;
          };

          gsap.to(hhPushUp, {
            y: () => -(getUnscrolledBottom(hhPushUp) + gap),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top ${getUnscrolledBottom(hhPushUp) + gap}px`,
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            }
          });
        }

        // Initial buffer
        tl.to({}, { duration: 1.5 });

        // Hide header instantly when the first letter 'S' starts animating (desktop only)
        if (isDesktop) {
            tl.to('.scale-header-container', { opacity: 0, duration: 0.1 }, 'activate0');
        }

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
          tl.to({}, { duration: 0.8 });

          // Deactivate (except last)
          if (i < LETTERS.length - 1) {
            tl.to(letterEls, { opacity: 0.15, duration: 0.5, ease: 'power2.inOut' }, `deactivate${i}`);
            tl.to([lineEl, dotEl, textEl], { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, `deactivate${i}`);
          }
        });

        // Final - all letters full opacity and all annotations visible
        tl.to('.scale-big-letter', { opacity: 1, duration: 1, ease: 'power2.inOut' }, 'final');
        tl.to('.scale-annotation-text, .scale-annotation-dot', { opacity: 1, duration: 1, ease: 'power2.inOut' }, 'final');
        tl.to('.scale-annotation-line', { opacity: 0.35, duration: 1, ease: 'power2.inOut' }, 'final');

        // Hold so the user can read all the abbreviations before the next scroll triggers the zoom fade-out
        // Reduced duration to require less scrolling
        tl.to({}, { duration: 1.5 });

        // ZOOM TRANSITION
        const preZoom = 'pre_zoom';

        // 1. First, quickly fade out the text UI (header, annotations, dots) to unclutter the screen BEFORE zooming
        tl.to('.scale-header-container, .scale-annotation-text, .scale-annotation-dot, .scale-annotation-line, .scale-dot', { 
            opacity: 0, duration: 0.5, ease: 'power2.inOut' 
        }, preZoom);

        // Also fade IN the scroll indicator to prompt the user to keep scrolling
        tl.to('.scale-scroll-indicator', { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, preZoom);

        tl.to({}, { duration: 1.0 }); // short buffer (increased slightly to allow the indicator to be seen)
        
        const zoomStart = 'zoom_start';

        // Fade OUT the scroll indicator as soon as the zoom begins
        tl.to('.scale-scroll-indicator', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, zoomStart);

        // 2. Fade out the global overlay background to reveal ShowcaseFeed
        tl.to('.scale-overlay-bg', { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, zoomStart);

        // 3. Zoom the text wrapper directly from the center of the screen
        tl.to('.scale-text-wrapper', {
            scale: 150, 
            ease: 'power2.in', 
            duration: 3,
            transformOrigin: "center center" // Zoom uniformly outwards
        }, zoomStart);

        // 3b. Fade out the text wrapper smoothly during the zoom
        // Faster fade out ensures the black strokes vanish before they can block the screen!
        tl.to('.scale-text-wrapper', {
            opacity: 0,
            duration: 0.8,
            ease: 'power1.inOut'
        }, zoomStart + "+=0.2");

        // 4. Parallax ShowcaseFeed into place behind the transparent window
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
              duration: 3,
            },
            zoomStart
        );

        // Clean up: Fade out the ENTIRE Layer 1 overlay so ShowcaseFeed is completely interactive and uncovered
        tl.to('.layer-1-overlay', { autoAlpha: 0, duration: 0.5 }, "-=0.5");
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
    // removed fontStyle: 'italic' so the 'A' is symmetric, making the hole mathematically perfectly centered
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
      className="scale-sticky-viewport relative w-full showcase-feed-pinned-container z-10"
      style={{ 
        fontFamily: 'var(--font-manrope, sans-serif)', 
        backgroundColor: 'var(--bg-primary)',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        overflow: 'hidden'
      }}
    >
      {/* LAYER 0: ShowcaseFeed Background (Restored to correct flow height layout) */}
      <div className="w-full relative z-0">
        <div ref={feedInnerRef} className="w-full relative">
          <div className="absolute w-full flex justify-center pointer-events-none z-10" style={{ bottom: "100%", paddingBottom: "clamp(2rem, 5dvh, 4rem)" }}>
            <h1 className="text-[12vw] sm:text-[14vw] lg:text-[11vw] font-clash font-bold uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-none">
              OUR WORKS
            </h1>
          </div>
          <ShowcaseFeed />
        </div>
      </div>

      {/* LAYER 1: Full Screen Pinned Overlay */}
      {/* Must be absolute top-0 left-0 w-full h-[100dvh] to stick to screen viewport while section is pinned */}
      <div className="layer-1-overlay absolute top-0 left-0 w-full h-[100dvh] z-10 flex flex-col pointer-events-none overflow-hidden">
        
        {/* Global Background for the overlay (Replacing split gray frames) */}
        <div className="scale-overlay-bg absolute inset-0 bg-background pointer-events-none z-0"></div>

        {/* Top Header - Relative on mobile to push content down, Absolute on desktop to center content in full screen */}
        <div className="scale-header-container w-full px-4 xl:px-6 pb-6 pt-24 sm:pt-28 z-50 shrink-0 max-md:relative md:absolute md:top-0 md:left-0 md:right-0">
          <div className="flex flex-col items-start w-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
              Our Framework
            </span>
            <h2
              className="font-clash font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-left"
              style={{ color: 'var(--color-foreground)', lineHeight: 1.1 }}
            >
              THE S.C.A.L.E. METHODOLOGY
            </h2>
          </div>
        </div>

        {/* Center Window */}
        {/* min-h ensures it doesn't get completely crushed on extremely short screens */}
        <div className="relative w-full flex-1 pointer-events-auto flex flex-col z-30 min-h-[400px]">

          {/* Zooming Text Container */}
          {/* my-auto is crucial here: it centers the item vertically, but natively prevents overlapping upwards out of the container when space is tight! */}
          <div className="scale-giant-container relative w-full flex items-center justify-center py-4 z-10 pointer-events-none my-auto">
            <div
              className="scale-text-wrapper flex items-baseline justify-center"
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
                        <style>{`
                          .scale-annotation-line-${item.id} { height: ${item.mobileHeight}; }
                          @media (min-width: 768px) { .scale-annotation-line-${item.id} { height: ${item.desktopHeight}; } }
                        `}</style>
                        <div className="scale-annotation-text text-center" style={{ marginBottom: '8px', width: 'clamp(150px, 20vw, 240px)' }}>
                          <p style={{ fontSize: 'clamp(13px, 1.5vw, 20px)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontFamily: 'var(--font-manrope, sans-serif)', marginBottom: '4px' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: 'clamp(12px, 1.2vw, 16px)', color: 'var(--color-foreground-muted)', lineHeight: 1.5, fontFamily: 'var(--font-manrope, sans-serif)', fontWeight: 400 }}>
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="scale-annotation-dot rounded-full" style={{ width: 'clamp(4px, 0.5vw, 8px)', height: 'clamp(4px, 0.5vw, 8px)', background: 'var(--color-foreground)' }} />
                          <div className={`scale-annotation-line scale-annotation-line-${item.id} origin-top`} style={{ width: '1px', background: 'var(--color-foreground)', marginTop: '4px' }} />
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
                        <style>{`
                          .scale-annotation-line-${item.id} { height: ${item.mobileHeight}; }
                          @media (min-width: 768px) { .scale-annotation-line-${item.id} { height: ${item.desktopHeight}; } }
                        `}</style>
                        <div className="flex flex-col items-center">
                          <div className={`scale-annotation-line scale-annotation-line-${item.id} origin-top`} style={{ width: '1px', background: 'var(--color-foreground)', marginBottom: '4px' }} />
                          <div className="scale-annotation-dot rounded-full" style={{ width: 'clamp(4px, 0.5vw, 8px)', height: 'clamp(4px, 0.5vw, 8px)', background: 'var(--color-foreground)' }} />
                        </div>
                        <div className="scale-annotation-text text-center" style={{ marginTop: '8px', width: 'clamp(150px, 20vw, 240px)' }}>
                          <p style={{ fontSize: 'clamp(13px, 1.5vw, 20px)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontFamily: 'var(--font-manrope, sans-serif)', marginBottom: '4px' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: 'clamp(12px, 1.2vw, 16px)', color: 'var(--color-foreground-muted)', lineHeight: 1.5, fontFamily: 'var(--font-manrope, sans-serif)', fontWeight: 400 }}>
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

        {/* Scroll Indicator (Only visible during the pause before zooming) */}
        <div className="scale-scroll-indicator absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 pointer-events-none opacity-0">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground-muted/60">
            Keep Scrolling
          </span>
          <svg className="w-4 h-4 text-foreground-muted/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
