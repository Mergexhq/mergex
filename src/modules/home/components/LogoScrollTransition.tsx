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
      // 1. Initial setups
      gsap.set(overlayRef.current, { "--mask-size": "300px" });

      // 2. Pin the entire container which holds both the hero overlay and the showcase feed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1, // Smooth scrub
          pin: true,
        },
      });

      // Instantly fade out the solid logo to reveal the identically-sized mask hole
      tl.to(initialLogoRef.current, { opacity: 0, duration: 0.01 }, 0);

      // Animate the mask size CSS variable to expand the hole
      tl.to(
        overlayRef.current,
        {
          "--mask-size": "15000vw", // massive zoom
          ease: "power3.inOut",
          duration: 1,
        },
        0.01
      );

      // 3D Parallax the showcase feed up from Z-axis
      // We set transform origin so it scales correctly
      gsap.set(feedInnerRef.current, { transformOrigin: "center top", transformPerspective: 1000 });
      
      tl.fromTo(
        feedInnerRef.current,
        {
          y: "80vh",
          scale: 0.5,
          rotationX: 10,
        },
        {
          y: "0vh",
          scale: 1,
          rotationX: 0,
          ease: "power2.out",
          duration: 0.9,
        },
        0.01
      );

      // Completely hide the overlay at the end to ensure it doesn't block interactions
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.01,
        },
        1.01
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full showcase-feed-pinned-container">
      
      {/* 1. BACKGROUND: ShowcaseFeed (The content to reveal through the hole) */}
      <div className="w-full relative z-0">
         <div ref={feedInnerRef} className="w-full relative">
            
            {/* OUR WORKS heading sitting ABOVE the section */}
            {/* It is positioned at -30vh relative to the feed, so when the feed docks at top:0, this text is pushed above the screen and hidden! */}
            <div className="absolute w-full flex justify-center pointer-events-none z-10" style={{ top: "-30vh" }}>
              <h1
                ref={textRef}
                className="text-[12vw] sm:text-[14vw] font-clash font-bold uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
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
         className="absolute top-0 left-0 z-20 w-full h-screen pointer-events-none"
         style={{
           WebkitMaskImage: `linear-gradient(black, black), url(${logoSrc})`,
           WebkitMaskPosition: `center center, center center`,
           WebkitMaskRepeat: `no-repeat, no-repeat`,
           WebkitMaskSize: `auto, var(--mask-size)`,
           WebkitMaskComposite: `destination-out`,
           maskComposite: `exclude`,
         }}
      >
         <div className="w-full h-screen pointer-events-auto bg-[var(--bg-primary)]">
           {heroContent}
         </div>
      </div>

      {/* 3. SOLID LOGO: Sits precisely over the hole initially */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-30 pointer-events-none">
          <img 
            ref={initialLogoRef} 
            src={logoSrc} 
            alt="Mergex Logo"
            className="object-contain drop-shadow-2xl" 
            style={{ width: "300px", height: "auto" }} 
          />
      </div>

    </div>
  );
};
