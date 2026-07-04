"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksData } from "../data/works";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Variation4_ParallaxScattered = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate the scattered cards with different parallax speeds
    const cards = gsap.utils.toArray('.scatter-card');
    
    cards.forEach((card: any, i) => {
      // Speed multiplier based on index to create depth (some move faster than others)
      const speed = i % 2 === 0 ? 0.5 : 1.2;
      const yOffset = i % 3 === 0 ? -150 : 100;
      
      gsap.fromTo(card,
        { y: yOffset },
        {
          y: -yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  // Generate random-ish positioning classes based on index
  const getPositionClasses = (index: number) => {
    switch(index % 6) {
      case 0: return "col-start-1 md:col-start-2 col-span-12 md:col-span-8 mt-12 md:mt-24";
      case 1: return "col-start-1 md:col-start-8 col-span-12 md:col-span-5 mt-24 md:-mt-32";
      case 2: return "col-start-1 md:col-start-1 col-span-12 md:col-span-6 mt-24 md:mt-48";
      case 3: return "col-start-1 md:col-start-6 col-span-12 md:col-span-7 mt-24 md:mt-12";
      case 4: return "col-start-1 md:col-start-2 col-span-12 md:col-span-5 mt-24 md:mt-32";
      case 5: return "col-start-1 md:col-start-8 col-span-12 md:col-span-4 mt-24 md:-mt-16";
      default: return "col-span-12";
    }
  };

  return (
    <div ref={containerRef} className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-32 pb-64 px-4 md:px-8">
      
      <div className="max-w-[var(--max-width-content)] mx-auto text-center mb-32 md:mb-48">
        <h1 className="text-display-lg font-clash leading-none">Freeform Canvas</h1>
        <p className="text-title-md font-serif mt-6 text-[var(--text-secondary)]">An editorial approach to digital showcasing.</p>
      </div>

      <div className="w-full max-w-[var(--max-width-content)] mx-auto grid grid-cols-12 gap-x-4 md:gap-x-8">
        
        {worksData.map((project, index) => (
          <div 
            key={project.id} 
            className={`scatter-card relative group ${getPositionClasses(index)}`}
          >
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[60vh] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-secondary)] shadow-lg cursor-pointer">
              
              <video 
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h2 className="text-display-sm font-clash mb-2">{project.title}</h2>
                <p className="text-body-sm max-w-sm">{project.summary}</p>
              </div>

            </div>
            
            {/* External Meta */}
            <div className="mt-4 flex justify-between items-center px-2">
              <h3 className="text-title-md font-serif">{project.title}</h3>
              <span className="text-[11px] font-roboto uppercase tracking-widest text-[var(--text-tertiary)]">{project.category}</span>
            </div>
          </div>
        ))}
        
      </div>

    </div>
  );
};
