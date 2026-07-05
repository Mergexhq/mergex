"use client";

import React, { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LogoScrollTransitionProps {
  heroContent: ReactNode;
  children: ReactNode;
  logoSrc: string;
}

export const LogoScrollTransition = ({
  heroContent,
  children,
  logoSrc,
}: LogoScrollTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const feedInnerRef = useRef<HTMLDivElement>(null);
  const initialLogoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      const createTimeline = (isMobile: boolean) => {
        // 1. Initial setups
        gsap.set(overlayRef.current, { "--hole-scale": 1 });

        // 2. Pin the entire container which holds both the hero overlay and the showcase feed
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isMobile ? "+=150%" : "+=300%",
            scrub: 1, // Smooth scrub
            pin: true,
            onLeave: () => {
              if (feedInnerRef.current) {
                gsap.set(feedInnerRef.current, { clearProps: "transform" });
              }
            }
          },
        });

        // Instantly fade out the solid logo to reveal the identically-sized mask hole
        tl.to(initialLogoRef.current, { opacity: 0, duration: 0.01 }, 0);

        // Animate the hole scale CSS variable to expand the hole
        tl.to(
          overlayRef.current,
          {
            "--hole-scale": 500, // massive zoom multiplier
            ease: "power3.inOut",
            duration: 1,
          },
          0.01
        );

        // 3D Parallax the showcase feed tilting up into place.
        // Pivot around the top edge so the hero (OUR WORKS + carousel) stays locked at the
        // top while the lower rails recede back into Z-space, then everything flattens and
        // docks — the heading ends exactly where it started, no vertical drift.
        gsap.set(feedInnerRef.current, { transformOrigin: "center top", transformPerspective: 900 });

        tl.fromTo(
          feedInnerRef.current,
          {
            z: -700,        // Pushed back, but the top edge stays near the camera
            rotationX: 32,  // Tilted back — floor/lower rails recede away
            y: isMobile ? "50dvh" : "100dvh",      // Start closer on mobile
            scale: 0.62,    // Slightly smaller with the distance
            opacity: 0.7,
          },
          {
            z: 0,
            rotationX: 0,   // Flattens out to match the screen (Y-axis)
            y: "0dvh",       // Docks perfectly at the top
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          0.01
        );

        // Completely hide the overlay at the end to ensure it doesn't block interactions
        tl.to(
          overlayRef.current,
          {
            autoAlpha: 0,
            duration: 0.01,
          },
          1.01
        );
      };

      mm.add("(max-width: 767px)", () => {
        createTimeline(true);
      });

      mm.add("(min-width: 768px)", () => {
        createTimeline(false);
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full showcase-feed-pinned-container">

      {/* 1. BACKGROUND: ShowcaseFeed (The content to reveal through the hole) */}
      <div className="w-full relative z-0">
        <div ref={feedInnerRef} className="w-full relative">

          {/* OUR WORKS heading sitting ABOVE the section */}
          {/* It uses bottom: 100% so it perfectly stacks on top of the feedInnerRef with a consistent responsive gap, never overlapping. */}
          <div className="absolute w-full flex justify-center pointer-events-none z-10" style={{ bottom: "100%", paddingBottom: "clamp(2rem, 5dvh, 4rem)" }}>
            <h1
              ref={textRef}
              className="text-[12vw] sm:text-[14vw] lg:text-[11vw] font-clash font-bold uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-none"
            >
              OUR WORKS
            </h1>
          </div>

          {children}
        </div>
      </div>

      {/* 2. FOREGROUND: HomeHero Overlay with an inverted mask (hole) */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 z-20 w-full h-dvh pointer-events-none"
        style={{
          WebkitMaskImage: `url(${logoSrc}), linear-gradient(black, black)`,
          maskImage: `url(${logoSrc}), linear-gradient(black, black)`,

          WebkitMaskPosition: `calc(50% + var(--logo-offset-x, 0px)) calc(50% + var(--logo-offset-y, -10dvh)), center center`,
          maskPosition: `calc(50% + var(--logo-offset-x, 0px)) calc(50% + var(--logo-offset-y, -10dvh)), center center`,

          WebkitMaskRepeat: `no-repeat, no-repeat`,
          maskRepeat: `no-repeat, no-repeat`,

          WebkitMaskSize: `calc(var(--hole-scale, 1) * var(--logo-width, clamp(200px, 45vw, 800px))), 100% 100%`,
          maskSize: `calc(var(--hole-scale, 1) * var(--logo-width, clamp(200px, 45vw, 800px))), 100% 100%`,

          WebkitMaskComposite: `destination-out`,
          maskComposite: `exclude`,
        }}
      >
        {/* CSS to drive the responsive variables */}
        <style>{`
          .showcase-feed-pinned-container {
            --logo-offset-x: 0px;
            --logo-offset-y: -10dvh;
            --logo-width: clamp(200px, 45vw, 800px);
          }
          @media (min-width: 1024px) {
            .showcase-feed-pinned-container {
              --logo-offset-x: -32vw;
              --logo-offset-y: 8dvh;
              --logo-width: clamp(200px, 22vw, 400px);
            }
          }
        `}</style>
        <div className="w-full h-dvh pointer-events-none bg-[var(--bg-primary)]">
          {heroContent}
        </div>
      </div>

      {/* 3. SOLID LOGO: Sits precisely over the hole initially */}
      <div className="absolute top-0 left-0 w-full h-dvh z-30 pointer-events-none">
        <img
          ref={initialLogoRef}
          src={logoSrc}
          alt="Mergex Logo"
          className="object-contain drop-shadow-2xl absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "var(--logo-width, clamp(200px, 45vw, 800px))",
            height: "auto",
            left: "calc(50% + var(--logo-offset-x, 0px))",
            top: "calc(50% + var(--logo-offset-y, -10dvh))"
          }}
        />
      </div>

    </div>
  );
};
