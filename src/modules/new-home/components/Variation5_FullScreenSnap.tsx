"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { worksData } from "../data/works";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

export const Variation5_FullScreenSnap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  useGSAP(() => {
    if (!containerRef.current) return;
    const sections = gsap.utils.toArray(".snap-section") as HTMLElement[];
    
    // Set initial states
    gsap.set(sections, { zIndex: (i) => sections.length - i });
    
    const gotoSection = (index: number, direction: number) => {
      if (isAnimating.current || index < 0 || index >= sections.length) return;
      isAnimating.current = true;
      
      const currentSection = sections[currentIndex];
      const nextSection = sections[index];
      
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(index);
          isAnimating.current = false;
        }
      });

      // Animate current section out
      if (direction > 0) { // scrolling down
        tl.to(currentSection, {
          yPercent: -100,
          duration: 1.2,
          ease: "power3.inOut"
        });
        
        gsap.fromTo(nextSection, 
          { yPercent: 100 },
          { yPercent: 0, duration: 1.2, ease: "power3.inOut" }
        );
      } else { // scrolling up
        tl.to(currentSection, {
          yPercent: 100,
          duration: 1.2,
          ease: "power3.inOut"
        });
        
        gsap.fromTo(nextSection, 
          { yPercent: -100 },
          { yPercent: 0, duration: 1.2, ease: "power3.inOut" }
        );
      }
      
      // Text animations
      const nextText = nextSection.querySelectorAll('.text-anim');
      gsap.fromTo(nextText, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.6 }
      );
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => gotoSection(currentIndex - 1, -1),
      onUp: () => gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true
    });

    return () => observer.kill();
  }, { scope: containerRef, dependencies: [currentIndex] });

  // Cleanup body overflow to prevent normal scrolling during this variation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* Navigation Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {worksData.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-white scale-150' : 'bg-white/30'}`}
          />
        ))}
      </div>

      {worksData.map((project, index) => (
        <section 
          key={project.id}
          className="snap-section absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ transform: index === 0 ? 'translateY(0%)' : 'translateY(100%)' }}
        >
          <video 
            src={project.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 w-full max-w-[var(--max-width-content)] mx-auto px-8 flex flex-col md:flex-row justify-between items-end">
            <div className="max-w-3xl">
              <span className="text-anim inline-block text-[11px] uppercase tracking-widest font-roboto mb-4 text-[var(--primary-light)]">
                {project.category}
              </span>
              <h1 className="text-anim text-[10vw] leading-none font-clash mb-6">
                {project.title}
              </h1>
              <p className="text-anim text-body-lg max-w-lg opacity-90 hidden md:block">
                {project.summary}
              </p>
            </div>
            
            <div className="text-anim mb-4 hidden md:block">
              <button className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                View
              </button>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
};
