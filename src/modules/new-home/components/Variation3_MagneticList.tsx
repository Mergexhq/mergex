"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { worksData, Project } from "../data/works";

export const Variation3_MagneticList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Custom cursor movement
  useEffect(() => {
    if (!cursorRef.current) return;
    
    // QuickSetter for performance
    const xSetter = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySetter = gsap.quickSetter(cursorRef.current, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the cursor
      xSetter(e.clientX - 200); 
      ySetter(e.clientY - 150);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useGSAP(() => {
    // Initial reveal
    gsap.from(".list-item", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  const handleMouseEnter = (project: Project) => {
    setActiveProject(project);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative overflow-hidden flex flex-col justify-center py-32"
    >
      
      {/* Magnetic Cursor Video Reveal (Fixed to viewport) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[300px] rounded-[var(--radius-lg)] overflow-hidden pointer-events-none z-0 opacity-0 scale-50 shadow-2xl origin-center"
      >
        {activeProject && (
          <video 
            key={activeProject.id} // force remount/reload on change
            src={activeProject.videoUrl}
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div className="w-full max-w-[var(--max-width-content)] mx-auto px-4 md:px-8 z-10 relative">
        <div className="flex flex-col w-full border-t border-[var(--border-primary)]">
          
          {worksData.map((project, index) => (
            <div 
              key={project.id}
              className="list-item group flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b border-[var(--border-primary)] cursor-none hover:bg-[var(--bg-secondary)] transition-colors duration-500 px-4 -mx-4"
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-6 md:gap-12">
                <span className="text-body-lg font-roboto text-[var(--text-tertiary)] hidden md:block">
                  {project.id}
                </span>
                <h2 className="text-display-sm md:text-[8vw] font-clash leading-none tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300 mix-blend-difference">
                  {project.title}
                </h2>
              </div>
              
              <div className="mt-4 md:mt-0 text-left md:text-right mix-blend-difference">
                <p className="text-title-md font-serif opacity-90">{project.category}</p>
                <div className="flex gap-2 mt-2 md:justify-end">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[11px] uppercase tracking-widest font-roboto opacity-70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};
