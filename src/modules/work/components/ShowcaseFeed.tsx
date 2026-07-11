"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worksData } from "../data/works";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * px the image shifts relative to its card boundary across the horizontal scroll.
 * Card moves left; image moves right to create the depth / floating-layer effect.
 */
const PARALLAX = 100;

export const ShowcaseFeed = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    const pinned = pinnedRef.current;
    if (!track || !section || !pinned) return;

    /** Distance the track must travel so the last card ends with matching gap on the right. */
    const getDistance = () => {
      const gap = pinned.offsetWidth * 0.04; // 4vw card gap
      return Math.max(0, track.scrollWidth - pinned.offsetWidth + gap);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinned,
        start: "top top",
        end: () => `+=${getDistance() + pinned.offsetHeight * 0.6}`, // Added scroll height for both start and end hold buffers (0.3 + 0.3 = 0.6)
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 1. Initial hold buffer at the start (takes 0.3 units of duration)
    tl.to({}, { duration: 0.3 });

    // Add label for synchronization
    tl.addLabel("worksScroll");

    // 2. The entire card track slides left (starts after the initial hold)
    tl.to(track, { x: () => -getDistance(), ease: "none", duration: 2 }, "worksScroll");

    // 3. Each image slides slowly rightward relative to its card wrapper (parallax with power2.out)
    gsap.utils.toArray<HTMLElement>(".works-card-img").forEach((img) => {
      tl.fromTo(
        img,
        { x: -(PARALLAX / 2) },
        { x: PARALLAX / 2, ease: "power2.out", duration: 2 },
        "worksScroll"
      );
    });

    // 4. Hold buffer at the end of scroll
    tl.to({}, { duration: 0.3 });
  }, { scope: sectionRef });

  return (
    <div id="works" ref={sectionRef} className="relative bg-white w-full">

      {/* ── Section header ── */}
      <header className="flex items-end justify-between px-8 md:px-[4vw] pt-24 pb-12 select-none bg-white">
        <h2
          className="font-questrial font-bold uppercase leading-none text-black"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.06em" }}
        >
          Works
        </h2>
        <span className="font-mono text-[11px] tracking-[0.28em] text-black/25 uppercase pb-1 select-none">
          {worksData.length}&nbsp;Projects
        </span>
      </header>

      {/* ── MOBILE: Vertical card stack (below md) ── */}
      <div className="md:hidden flex flex-col gap-5 px-4 pb-16">
        {worksData.map((project, index) => (
          <MobileWorkCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* ── DESKTOP: Pinned horizontal scroll (md and above) ── */}
      <div
        ref={pinnedRef}
        id="works-pinned"
        className="hidden md:flex h-screen w-full overflow-hidden items-center bg-white"
      >
        {/* ── Horizontal card track ── */}
        <div
          ref={trackRef}
          id="works-track"
          className="flex items-center h-full gap-[4vw] will-change-transform"
          style={{
            width: "max-content",
            paddingLeft: "4vw",
          }}
        >
          {/* Column 1: Card 1 (Giant) */}
          <WorkCard
            project={worksData[0]}
            index={0}
            total={worksData.length}
          />

          {/* Column 2: Twin Cards side-by-side */}
          <div className="flex items-center gap-[4vw]" style={{ width: "85vw" }}>
            <WorkCard
              project={worksData[1]}
              index={1}
              total={worksData.length}
              isTwin={true}
            />
            <WorkCard
              project={worksData[2]}
              index={2}
              total={worksData.length}
              isTwin={true}
            />
          </div>

          {/* Column 3: Card 4 (Giant) */}
          <WorkCard
            project={worksData[3]}
            index={3}
            total={worksData.length}
          />

          {/* Column 4: Card 5 (Giant) */}
          <WorkCard
            project={worksData[4]}
            index={4}
            total={worksData.length}
          />
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   MobileWorkCard - simplified vertical card for mobile
   ──────────────────────────────────────────────────────────────── */
const MobileWorkCard = ({ project, index }: { project: (typeof worksData)[number]; index: number }) => {
  const [showInfo, setShowInfo] = useState(false);
  const hasLink = Boolean(project.liveUrl && project.liveUrl.trim() !== "" && project.liveUrl !== "#");

  // Parallax: track card scroll position within the viewport
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  // Image shifts from -60px (card entering from bottom) to +60px (card leaving at top)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);

  return (
    <a
      ref={cardRef}
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full overflow-hidden rounded-2xl bg-neutral-900 text-white block cursor-pointer"
      style={{ height: '70vw', minHeight: '220px', maxHeight: '420px' }}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* Background Image with scroll-driven parallax */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.img
          className="absolute object-cover will-change-transform select-none"
          style={{
            width: '100%',
            height: '130%',
            top: '-15%',
            y: imageY,
          }}
          src={project.posterUrl}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          draggable={false}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent rounded-t-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 pointer-events-none">
        <div className="max-w-[85%]">
          <h3 className="text-white font-questrial font-bold tracking-[0.04em] leading-tight text-2xl">
            {project.title}
          </h3>
        </div>
        <div className="flex items-end justify-between w-full pointer-events-auto">
          <p className="font-questrial text-sm font-bold tracking-[0.06em] text-white/95 select-none max-w-[70%]">
            {project.category}
          </p>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#FAF9F6] text-black flex items-center justify-center shadow-lg z-30"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowInfo(!showInfo); }}
          >
            <span className="font-semibold text-xl leading-none select-none">+</span>
          </button>
        </div>
      </div>

      {/* Info Overlay */}
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-xl flex flex-col justify-between p-6 transition-all duration-500 z-20 rounded-2xl pointer-events-auto ${showInfo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <p className="text-white text-sm font-normal leading-relaxed mt-4">
          {project.summary}
        </p>
        <div className="flex items-end justify-between w-full">
          <p className="font-questrial text-sm font-bold tracking-[0.06em] text-white/95 max-w-[65%]">
            {project.category}
          </p>
          {hasLink && (
            <div className="flex items-center gap-2 rounded-full bg-[#FAF9F6] text-black px-5 py-2 font-semibold text-xs shadow-lg">
              <span>View Project</span>
              <ArrowUpRight size={12} />
            </div>
          )}
        </div>
      </div>
    </a>
  );
};


/* ────────────────────────────────────────────────────────────────
   WorkCard - desktop horizontal scroll card
   ──────────────────────────────────────────────────────────────── */
type CardProps = {
  project: (typeof worksData)[number];
  index: number;
  total: number;
  isTwin?: boolean;
};

const WorkCard = ({ project, index, total, isTwin = false }: CardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const hasLink = Boolean(project.liveUrl && project.liveUrl.trim() !== "" && project.liveUrl !== "#");

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="works-card group relative flex-none overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-neutral-900 text-white block cursor-pointer"
      style={{
        width: isTwin ? "40.5vw" : "85vw",
        height: "86vh",
      }}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* ── Background Image Layer (zoomed to prevent bleeding) ── */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-[1.5rem]">
        <img
          className="works-card-img absolute object-cover will-change-transform select-none"
          style={{
            width: "120%",
            height: "120%",
            top: "-10%",
            left: "-10%",
            maxWidth: "none",
            maxHeight: "none",
          }}
          src={project.posterUrl}
          alt={project.title}
          loading={index < 2 ? "eager" : "lazy"}
          draggable={false}
        />
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none rounded-2xl md:rounded-[1.5rem]" />

      {/* Gradients for text readability inside the rounded boundaries */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent pointer-events-none rounded-t-2xl md:rounded-t-[1.5rem]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent pointer-events-none rounded-b-2xl md:rounded-b-[1.5rem]" />

      {/* ── Overlaid Minimal Details (Title at top left, Category at bottom left) ── */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10 pointer-events-none">

        {/* Top-Left: Title Only (Even bigger + letter spacing) */}
        <div className="max-w-[85%] text-left mt-2">
          <h3 className="text-white font-questrial font-bold tracking-[0.04em] leading-tight text-3xl sm:text-4xl lg:text-5xl">
            {project.title}
          </h3>
        </div>

        {/* Bottom Row: Category (Bigger + letter spacing) & Info trigger button (right) */}
        <div className="flex items-end justify-between w-full pointer-events-auto">
          <p className="font-questrial text-sm sm:text-lg lg:text-xl font-bold tracking-[0.06em] text-white/95 select-none text-left max-w-[70%]">
            {project.category}
          </p>

          <button
            type="button"
            className="w-12 h-12 rounded-full bg-[#FAF9F6] text-black flex items-center justify-center transition-transform hover:scale-110 shadow-lg pointer-events-auto z-30 flex-none"
            onMouseEnter={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowInfo(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowInfo(!showInfo);
            }}
          >
            <span className="font-semibold text-2xl leading-none select-none">+</span>
          </button>
        </div>

      </div>

      {/* ── Hover Info Overlay (Blurs bg and shows project info, Image 4 style) ── */}
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-xl flex flex-col justify-between p-8 md:p-12 transition-all duration-500 z-20 rounded-2xl md:rounded-[1.5rem] pointer-events-auto ${showInfo ? "opacity-100 scale-100" : "opacity-0 scale-98 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 max-w-xl text-left mt-8 md:mt-12">
          <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* View Project CTA */}
        <div className="flex items-end justify-between w-full">
          <p className="font-questrial text-sm sm:text-lg lg:text-xl font-bold tracking-[0.06em] text-white/95 select-none text-left max-w-[70%]">
            {project.category}
          </p>
          {hasLink && (
            <div
              className="flex items-center gap-2 rounded-full bg-[#FAF9F6] text-black px-6 py-2.5 font-semibold text-xs transition-transform hover:scale-105 shadow-lg"
            >
              <span>View Project</span>
              <ArrowUpRight size={14} />
            </div>
          )}
        </div>
      </div>
    </a>
  );
};
