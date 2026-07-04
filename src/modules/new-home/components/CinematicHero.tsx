"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project, worksData } from "../data/works";
import { TextSplitter } from "./TextSplitter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGlobalVideoObserver } from "@/lib/videoObserver";

const CarouselVideo = ({ src, isActive }: { src: string; isActive: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGlobalVideoObserver(videoRef, isActive);
  
  return (
    <video 
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const tl = useRef<gsap.core.Timeline>(null);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    const newNext = (activeIndex + 1) % worksData.slice(0, 4).length; // Only use first 4 for hero
    transitionToSlide(newNext, "next");
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const total = worksData.slice(0, 4).length;
    const newPrev = (activeIndex - 1 + total) % total;
    transitionToSlide(newPrev, "prev");
  };

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
    tl.current.to([currentText, currentSummary], {
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
    const nextText = nextSlide.querySelectorAll('.carousel-text .split-char');
    const nextSummary = nextSlide.querySelectorAll('.carousel-summary');
    gsap.set([nextText, nextSummary], { y: 20, opacity: 0 });
    
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

    // Scroll parallax for text and gradient to scroll up with the page
    gsap.to(".parallax-content", {
      y: () => -window.innerHeight,
      ease: "none",
      scrollTrigger: {
        trigger: document.querySelector(".showcase-feed-container"),
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const heroProjects = worksData.slice(0, 4);

  return (
    <div ref={containerRef} className="w-full">
      <section className="relative w-full aspect-video max-h-[70vh] md:max-h-[80vh]" ref={carouselRef}>
        <div className="relative w-full h-full overflow-hidden bg-[var(--bg-secondary)]">
          
          {heroProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 w-full h-full carousel-slide-${index}`}
              style={{
                zIndex: index === activeIndex ? 10 : 1,
                opacity: index === activeIndex || index === nextIndex ? 1 : 0,
              }}
            >
              <CarouselVideo 
                src={project.videoUrl} 
                isActive={index === activeIndex || index === nextIndex} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none parallax-content" />

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-end z-30 parallax-content">
                <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl carousel-text text-white">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest font-bold mb-2 md:mb-4 opacity-80 font-roboto text-[var(--primary-light)]">
                    {project.category}
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-clash leading-none mb-2 md:mb-4">
                    <TextSplitter text={project.title} />
                  </h1>
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl opacity-90 hidden md:block carousel-summary leading-relaxed font-light mt-4 md:mt-6">
                    {project.summary}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 md:gap-6 mt-4 md:mt-0 text-white">
                  <div className="text-sm font-roboto tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {String(heroProjects.length).padStart(2, '0')}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
                      aria-label="Previous Project"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
                      aria-label="Next Project"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </section>
    </div>
  );
};
