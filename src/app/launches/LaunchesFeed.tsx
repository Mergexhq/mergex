"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { worksData } from "@/modules/work";
import { PosterVideo } from "@/components/PosterVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LaunchesFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const children = gsap.utils.toArray<HTMLElement>(".launches-parallax-child");
    children.forEach((child) => {
      gsap.fromTo(
        child,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: child.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-32 md:space-y-48">
      {worksData.map((project, index) => {
        const slug = project.title
          .toLowerCase()
          .replace(/'/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return (
          <div
            key={project.id}
            id={slug}
            className="flex flex-col gap-8 md:gap-12 group scroll-mt-24"
          >
            {/* Large Visual Section with Parallax Wrapper */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-black/5 shadow-sm">
              <div className="launches-parallax-child absolute inset-x-0 w-full h-[120%] -top-[10%] will-change-transform">
                <PosterVideo
                  videoUrl={project.videoUrl}
                  posterUrl={project.posterUrl}
                  shouldPlay={true}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start px-2">
              <div className="lg:col-span-4">
                <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-mono block mb-1">
                  Launch {project.id}
                </span>
                <h2 className="text-2xl md:text-3xl font-questrial font-bold tracking-tight text-[var(--text-primary)]">
                  {project.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1 font-light">
                  {project.category}
                </p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-base text-[var(--text-secondary)] leading-relaxed font-light">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-3 lg:text-right flex flex-wrap gap-2 lg:justify-end">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-black/10 hover:border-black/30 rounded-lg text-xs font-medium tracking-wide transition-colors bg-white/50 backdrop-blur-sm"
                  >
                    Visit Platform
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
