"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, worksData } from "../data/works";
import { TextSplitter } from "./TextSplitter";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Variation1_CinematicCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
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
    const nextIndex = (activeIndex + 1) % worksData.length;
    transitionToSlide(nextIndex, "next");
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const prevIndex = (activeIndex - 1 + worksData.length) % worksData.length;
    transitionToSlide(prevIndex, "prev");
  };

  const transitionToSlide = (newIndex: number, direction: "next" | "prev") => {
    setIsAnimating(true);
    
    // We animate out the current slide text and clip-path the new slide in
    const currentSlide = document.querySelector(`.carousel-slide-${activeIndex}`);
    const nextSlide = document.querySelector(`.carousel-slide-${newIndex}`);
    
    if (!currentSlide || !nextSlide) {
      setActiveIndex(newIndex);
      setIsAnimating(false);
      return;
    }

    const currentText = currentSlide.querySelectorAll('.carousel-text .split-char');
    const currentSummary = currentSlide.querySelectorAll('.carousel-summary');
    
    tl.current = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
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
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" }
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

    // Grid scroll trigger animations
    if (gridRef.current) {
      const cards = gsap.utils.toArray('.grid-card');
      
      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i % 2 === 0 ? 0 : 0.1
          }
        );
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      
      {/* HERO CAROUSEL */}
      <section className="relative w-full h-[70vh] md:h-[80vh] px-4 md:px-8 pt-24 pb-8" ref={carouselRef}>
        <div className="relative w-full h-full rounded-[var(--radius-xl)] overflow-hidden bg-[var(--bg-secondary)] shadow-[var(--shadow-lg)]">
          
          {worksData.map((project, index) => (
            <div 
              key={project.id}
              className={`absolute inset-0 w-full h-full carousel-slide-${index}`}
              style={{
                zIndex: index === activeIndex ? 10 : 1,
                opacity: index === activeIndex ? 1 : (isAnimating ? 1 : 0),
              }}
            >
              {/* Video Background */}
              <video 
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end z-30">
                <div className="max-w-2xl carousel-text text-white">
                  <p className="text-[11px] uppercase tracking-widest font-bold mb-4 opacity-80 font-roboto">
                    {project.category}
                  </p>
                  <h1 className="text-display-sm md:text-display-md font-clash leading-none mb-4">
                    <TextSplitter text={project.title} />
                  </h1>
                  <p className="text-body-md opacity-90 max-w-md hidden md:block carousel-summary">
                    {project.summary}
                  </p>
                </div>
                
                {/* Meta & Navigation */}
                <div className="flex flex-col items-end gap-6 mt-8 md:mt-0 text-white">
                  <div className="text-sm font-roboto tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {String(worksData.length).padStart(2, '0')}
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

      {/* PROJECT GRID */}
      <section className="w-full max-w-[var(--max-width-content)] mx-auto px-4 md:px-8 py-20" ref={gridRef}>
        <div className="mb-12 flex justify-between items-end">
          <h2 className="text-display-sm font-clash">Selected Works</h2>
          <p className="text-body-md text-[var(--text-secondary)]">Explore the archive</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {worksData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      
    </div>
  );
};

// Extracted Card Component for Hover Animations
const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    const overlay = cardRef.current.querySelector('.card-overlay');
    const textChars = cardRef.current.querySelectorAll('.split-char');
    const summary = cardRef.current.querySelector('.grid-card-summary');
    
    gsap.killTweensOf([cardRef.current, overlay, textChars, summary]);
    
    gsap.to(cardRef.current, { scale: 0.98, duration: 0.4, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.fromTo(textChars, 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.015, duration: 0.4, ease: "power2.out" }
    );
    gsap.fromTo(summary, 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
    );
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const overlay = cardRef.current.querySelector('.card-overlay');
    const textChars = cardRef.current.querySelectorAll('.split-char');
    const summary = cardRef.current.querySelector('.grid-card-summary');
    
    gsap.killTweensOf([cardRef.current, overlay, textChars, summary]);
    
    gsap.to(cardRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(textChars, { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(summary, { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <div 
      ref={cardRef}
      className={`grid-card relative w-full aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer bg-[var(--bg-secondary)] shadow-sm`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        src={project.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* Default minimal footer */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent text-white z-10 transition-opacity duration-300 card-default-footer">
        <h3 className="text-title-md font-clash">{project.title}</h3>
      </div>
      
      {/* Hover Glass Overlay */}
      <div className="card-overlay absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 flex flex-col justify-center items-center text-white p-8 text-center z-20">
        <h3 className="text-display-sm font-clash mb-3">
          <TextSplitter text={project.title} />
        </h3>
        <p className="text-body-sm max-w-sm mb-6 grid-card-summary">
          {project.summary}
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-[11px] tracking-wider uppercase font-roboto">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
