"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { worksData } from "../data/works";
import { TextSplitter } from "./TextSplitter";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PosterVideo } from "@/components/PosterVideo";

// The hero carousel showcases only the first few flagship projects.
const HERO_PROJECTS = worksData.slice(0, 4);

export const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const tl = useRef<gsap.core.Timeline>(null);

  const transitionToSlide = (newIndex: number, direction: "next" | "prev") => {
    setIsAnimating(true);
    setNextIndex(newIndex);
    
    const currentSlide = document.querySelector(`.carousel-slide-${activeIndex}`);
    const nextSlide = document.querySelector(`.carousel-slide-${newIndex}`);
    
    if (!currentSlide || !nextSlide) {
      setActiveIndex(newIndex);
      setNextIndex(null);
      setIsAnimating(false);
      return;
    }

    const currentCategory = currentSlide.querySelectorAll('.carousel-category');
    const currentText = currentSlide.querySelectorAll('.carousel-text .split-char');
    const currentSummary = currentSlide.querySelectorAll('.carousel-summary');
    
    tl.current = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        setNextIndex(null);
        setIsAnimating(false);
        gsap.set(nextSlide, { zIndex: 10 });
        gsap.set(currentSlide, { zIndex: 1, clipPath: 'inset(0% 0% 0% 0%)' });
      }
    });

    // Animate out current text
    tl.current.to([...currentCategory, ...currentText, ...currentSummary], {
      y: -20,
      opacity: 0,
      stagger: 0.01,
      duration: 0.4,
      ease: "power2.in",
    });

    // Bring next slide to front
    gsap.set(nextSlide, { zIndex: 20, clipPath: direction === 'next' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)' });
    
    // Reveal next slide with clip-path
    tl.current.to(nextSlide, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2");

    // Animate in next text
    const nextCategory = nextSlide.querySelectorAll('.carousel-category');
    const nextText = nextSlide.querySelectorAll('.carousel-text .split-char');
    const nextSummary = nextSlide.querySelectorAll('.carousel-summary');
    gsap.set([...nextCategory, ...nextText, ...nextSummary], { y: 20, opacity: 0 });
    
    tl.current.to(nextCategory, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    tl.current.to(nextText, {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
    
    tl.current.to(nextSummary, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
  };

  const handleNext = () => {
    if (isAnimating) return;
    const newNext = (activeIndex + 1) % HERO_PROJECTS.length;
    transitionToSlide(newNext, "next");
  };

  // Auto-advance the carousel while idle.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isAnimating]);

  useGSAP(() => {
    // Initial entry animation for the hero
    gsap.fromTo(carouselRef.current, 
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" }
    );

    // Initial text reveal for active slide
    const activeText = document.querySelectorAll(`.carousel-slide-${activeIndex} .carousel-text .split-char`);
    const activeSummary = document.querySelectorAll(`.carousel-slide-${activeIndex} .carousel-summary`);
    if (activeText.length > 0) {
      gsap.fromTo(activeText,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
    if (activeSummary.length > 0) {
      gsap.fromTo(activeSummary,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );
    }

    // Removed parallax animation for text as it conflicts with the parent's 3D scroll animation and causes overlaps.
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full">
      <section className="relative w-full h-full md:aspect-[16/9] md:max-h-[100svh]" ref={carouselRef}>
        <div className="relative w-full h-full overflow-hidden bg-neutral-900">

          {HERO_PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 w-full h-full carousel-slide-${index}`}
              style={{
                zIndex: index === activeIndex ? 10 : 1,
                opacity: index === activeIndex || index === nextIndex ? 1 : 0,
              }}
            >
              <PosterVideo
                videoUrl={project.videoUrl}
                posterUrl={project.posterUrl}
                shouldPlay={index === activeIndex || index === nextIndex}
                priority={100 - index}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none parallax-content" />
            </div>
          ))}
          
        </div>
      </section>
    </div>
  );
};
