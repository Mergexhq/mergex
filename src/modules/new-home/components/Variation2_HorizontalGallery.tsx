"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksData } from "../data/works";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Variation2_HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const sections = gsap.utils.toArray(".gallery-item");
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const scrollWidth = scrollContainerRef.current.scrollWidth;

    // We animate the horizontal translation based on vertical scroll
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth scrubbing
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.6 },
          ease: "power1.inOut"
        },
        // Base the end distance on how wide the content actually is
        end: () => "+=" + scrollWidth,
      }
    });

    // Sub-animations for parallax inside the items
    sections.forEach((section: any) => {
      const video = section.querySelector("video");
      const textBlock = section.querySelector(".text-block");
      
      if (video) {
        gsap.fromTo(video, 
          { x: -50, scale: 1.1 },
          { 
            x: 50,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              containerAnimation: gsap.getById("horizontalScroll"),
              start: "left right",
              end: "right left",
              scrub: true
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] relative" ref={containerRef}>
      
      {/* Intro block */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none mix-blend-difference text-white">
        <h1 className="text-display-md font-clash leading-none tracking-tight">
          The<br/>Exhibition
        </h1>
        <p className="text-body-sm font-roboto tracking-widest uppercase mt-4 opacity-80">
          Scroll to explore
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex w-[600vw] h-screen items-center"
      >
        {worksData.map((project, index) => (
          <div 
            key={project.id} 
            className="gallery-item relative w-[100vw] h-screen flex items-center justify-center p-8 md:p-24 shrink-0"
          >
            {/* The massive card */}
            <div className="relative w-full max-w-[1200px] aspect-video md:aspect-[21/9] rounded-[var(--radius-xl)] overflow-hidden shadow-2xl group cursor-none">
              
              <video 
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover origin-center"
              />
              
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
              
              <div className="text-block absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[11px] font-roboto tracking-widest uppercase mb-2 block text-[var(--primary-light)]">
                      {project.category}
                    </span>
                    <h2 className="text-display-sm font-serif">
                      {project.title}
                    </h2>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-body-md max-w-sm opacity-90">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
