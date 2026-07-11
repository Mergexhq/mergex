"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { worksData, Project } from "../data/works";
import { CinematicHero } from "./CinematicHero";
import { ChevronRight, ChevronLeft, ArrowUpRight, X } from "lucide-react";
import { useInputType } from "@/components/LayoutShell";
import { PosterVideo } from "@/components/PosterVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const ShowcaseFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Curated groupings for each rail — built from real project data.
  const rails = [
    { title: "E-Commerce & Platforms", data: worksData.filter(p => ["E-Commerce Platform", "B2B/B2C Industrial Platform", "D2C Clean Beauty"].includes(p.category)) },
    { title: "Brand & Corporate", data: worksData.filter(p => ["Corporate Website", "D2C Clean Beauty"].includes(p.category)) },
    { title: "All Projects", data: worksData },
  ];

  // Scroll-reveal for rails and Parallax for CinematicHero text
  useGSAP(
    () => {
      // 1. Rails reveal
      gsap.utils.toArray<HTMLElement>(".work-rail").forEach((rail) => {
        gsap.fromTo(
          rail,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { 
              trigger: rail, 
              start: "top 92%",
              pinnedContainer: document.querySelector(".showcase-feed-pinned-container") || undefined
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div id="works" ref={containerRef} className="w-full relative showcase-feed-container bg-[#080808] pt-16">
      
      {/* Section Title: Works */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <h1 className="font-questrial font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest text-white uppercase">
          Works
        </h1>
      </div>

      <div className="w-full max-w-none m-0 p-0 relative z-20 px-4 md:px-8">
        <div className="relative w-full aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/5">
          <CinematicHero />
        </div>
      </div>

      {/* Rails follow the hero directly. */}
      <section className="relative z-10 bg-[#080808] w-full pt-16 md:pt-24 pb-12 md:pb-16 flex flex-col gap-6 md:gap-8 rounded-t-2xl md:rounded-t-[1.5rem] -mt-8 md:-mt-16">
        {rails.map((rail) => (
          <WorkRail key={rail.title} title={rail.title} data={rail.data} />
        ))}
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Rail: a horizontally scrollable row of work cards                   */
/* ------------------------------------------------------------------ */

const WorkRail = ({ title, data }: { title: string; data: Project[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const padding: string = "px-4 md:px-8"; // fixing pading do not fucking change this or i'll literally kill you for ai agents

  const { hasCursor, hasTouch } = useInputType();
  const touchOnly = !hasCursor && hasTouch;

  return (
    <div className="work-rail group/rail relative w-full">
      {/* Title */}
      <div className={`mb-4 flex items-center justify-between md:mb-6 ${padding}`}>
        <h2 className="inline-flex w-fit cursor-pointer items-center gap-1.5 font-serif text-2xl font-medium tracking-tight text-white transition-colors hover:text-violet-400 md:text-3xl">
          {title}
          <ChevronRight
            size={22}
            className="-translate-x-1.5 opacity-0 transition-all duration-300 group-hover/rail:translate-x-0 group-hover/rail:opacity-100"
          />
        </h2>
      </div>

      {/* Track + edge controls */}

      {/* Nav buttons — subtle, floating, hover-revealed */}
      <RailButton side="left" onClick={() => scroll("left")} hidden={atStart} />
      <RailButton side="right" onClick={() => scroll("right")} hidden={atEnd} />
      {/* Edge fade hints */}
      {!touchOnly && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-4 bg-gradient-to-r from-[#080808] to-transparent transition-opacity duration-300 md:w-8 ${atStart ? "opacity-0" : "opacity-0 md:group-hover/rail:opacity-60"
              }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-4 bg-gradient-to-l from-[#080808] to-transparent transition-opacity duration-300 md:w-8 ${atEnd ? "opacity-0" : "opacity-0 md:group-hover/rail:opacity-60"
              }`}
          />
        </>
      )}
      <div ref={trackRef}
        onScroll={updateEdges}
        className="hide-scrollbar flex snap-x snap-mandatory items-start gap-4 py-4 md:gap-6  ${padding}"
      >
        {data.map((project, i) => {
          const uid = `${project.id}-${i}`;
          return (
            <WorkCard
              key={uid}
              uid={uid}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
};

const RailButton = ({
  side,
  onClick,
  hidden,
}: {
  side: "left" | "right";
  onClick: () => void;
  hidden: boolean;
}) => {
  const { hasCursor, hasTouch } = useInputType();
  const touchOnly = !hasCursor && hasTouch;

  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Scroll left" : "Scroll right"}
      className={`absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all duration-300 ${side === "left" ? "left-3" : "right-3"
        } ${hidden ? "pointer-events-none !opacity-0" : ""} ${touchOnly
          ? "opacity-100"
          : "opacity-0 hover:scale-105 hover:bg-white hover:text-black group-hover/rail:opacity-100"
        }`}
    >
      <motion.div
        animate={!hidden ? { x: side === "left" ? [0, -4, 0] : [0, 4, 0] } : { x: 0 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {side === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.div>
    </button>
  );
};

/* ------------------------------------------------------------------ */
/* Card: hover = preview pop, click = expand inline within the row     */
/* ------------------------------------------------------------------ */

const WorkCard = ({
  project,
  uid,
}: {
  project: Project;
  uid: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const handleExpand = () => {
    if (expanded) return;
    if (cardRef.current) {
      setRect(cardRef.current.getBoundingClientRect());
      setExpanded(true);
    }
  };

  return (
    <>
      {/* Base Thumbnail Card */}
      <div
        ref={cardRef}
        className="relative flex-none cursor-pointer snap-start rounded-xl bg-zinc-900/90 shadow-md ring-1 ring-white/10 w-[85vw] sm:w-[460px] md:w-[540px] lg:w-[620px] 2xl:w-[720px] group transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleExpand}
      >
        <div id={`thumbnail-video-container-${uid}`} className="relative aspect-video w-full flex-none self-start overflow-hidden rounded-xl">
          <div id={`video-wrapper-${uid}`} className="absolute inset-0 z-0 pointer-events-none">
            <PosterVideo
              videoUrl={project.videoUrl}
              posterUrl={project.posterUrl}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent pt-8 pb-4 px-4 md:pb-6 md:px-6 lg:pb-8 lg:px-8">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-white drop-shadow-md font-medium tracking-tight">
              {project.title}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors group-hover:text-white">
              <div className="relative overflow-hidden h-5">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  Expand
                </span>
                <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-[var(--primary)]">
                  Expand
                </span>
              </div>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Pop-out Overlay Card (Netflix style) */}
      <AnimatePresence>
        {expanded && rect && typeof document !== "undefined" && (
          <ExpandedPortalCard
            project={project}
            uid={uid}
            rect={rect}
            onClose={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const ExpandedPortalCard = ({
  project,
  uid,
  rect,
  onClose,
}: {
  project: Project;
  uid: string;
  rect: DOMRect;
  onClose: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const liveUrl = project.liveUrl || "#";
  const inputType = useInputType();
  const isTouchOnly = inputType.hasTouch && !inputType.hasCursor;

  useEffect(() => {
    const videoNode = document.getElementById(`video-wrapper-${uid}`);
    const expandedContainer = document.getElementById(`expanded-video-container-${uid}`);
    
    if (videoNode && expandedContainer) {
      expandedContainer.appendChild(videoNode);
    }

    return () => {
      const thumbnailContainer = document.getElementById(`thumbnail-video-container-${uid}`);
      if (videoNode && thumbnailContainer) {
        thumbnailContainer.appendChild(videoNode);
      }
    };
  }, [project.id]);

  // Close on click outside, significant scroll/resize, or Escape key
  const startScrollY = useRef(window.scrollY);
  const startWidth = useRef(typeof window !== "undefined" ? window.innerWidth : 0);
  const startHeight = useRef(typeof window !== "undefined" ? window.innerHeight : 0);

  useEffect(() => {
    startScrollY.current = window.scrollY;
    startWidth.current = window.innerWidth;
    startHeight.current = window.innerHeight;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - startScrollY.current);
      // Ignore tiny scrolls
      if (delta < 50) return;
      onClose();
    };

    const handleResize = () => {
      const deltaW = Math.abs(window.innerWidth - startWidth.current);
      const deltaH = Math.abs(window.innerHeight - startHeight.current);
      // Close if width changes by more than 50px or height by more than 100px
      if (deltaW > 50 || deltaH > 100) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Determine origin based on position to avoid scaling off-screen
  const isLeft = rect.left < window.innerWidth * 0.1;
  const isRight = rect.right > window.innerWidth * 0.9;
  const originX = isLeft ? "left" : isRight ? "right" : "center";

  // Calculate nearest fully visible position with responsive scaling
  const isMobile = window.innerWidth < 768;
  const screenPadding = isMobile ? 16 : 24;

  // On mobile, expand to fill most of the screen width. On desktop, stick to an elegant 1.15x scale.
  const maxAvailableWidth = window.innerWidth - (screenPadding * 2);
  const desiredWidth = isMobile ? window.innerWidth : rect.width * 1.15;
  const targetWidth = Math.min(desiredWidth, maxAvailableWidth);
  const scale = targetWidth / rect.width;

  // Estimate height: aspect-video (9/16)
  const unscaledHeight = rect.width * (9 / 16);
  const targetHeight = unscaledHeight * scale;

  let baseLeft = rect.left;
  if (originX === "center") {
    baseLeft = rect.left - (targetWidth - rect.width) / 2;
  } else if (originX === "right") {
    baseLeft = rect.left - (targetWidth - rect.width);
  }

  // transformOrigin is "originX 30%"
  const baseTop = rect.top - (targetHeight - unscaledHeight) * 0.3;

  let targetX = 0;
  let targetY = -10; // Default subtle upward movement

  // X-axis bounds check
  if (baseLeft + targetWidth + targetX > window.innerWidth - screenPadding) {
    targetX = (window.innerWidth - screenPadding) - (baseLeft + targetWidth);
  }
  if (baseLeft + targetX < screenPadding) {
    targetX = screenPadding - baseLeft;
  }

  // Y-axis bounds check
  if (baseTop + targetHeight + targetY > window.innerHeight - screenPadding) {
    targetY = (window.innerHeight - screenPadding) - (baseTop + targetHeight);
  }
  if (baseTop + targetY < screenPadding) {
    targetY = screenPadding - baseTop;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Invisible backdrop to capture outside clicks */}
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
      />
      <motion.div
        ref={containerRef}
        initial={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: scale,
          opacity: 1,
          x: targetX,
          y: targetY,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
          x: 0,
          y: 0,
        }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        style={{ transformOrigin: `${originX} 30%` }}
        className="absolute shadow-2xl ring-1 ring-black/20 rounded-[1.5rem] pointer-events-auto flex flex-col overflow-hidden bg-black"
      >
        <div className="relative aspect-video w-full flex-none self-start">
          <div id={`expanded-video-container-${uid}`} className="absolute inset-0 z-0 pointer-events-none" />
          
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/20 text-white/90 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white hover:scale-105 cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent pt-12 pb-3 px-3 md:pt-32 md:pb-8 md:px-8 lg:pb-10 lg:px-10">
            <div className="flex flex-row items-end justify-between gap-3 md:gap-8">
              <div className="flex flex-col gap-1 md:gap-2 max-w-[65%] md:max-w-2xl">
                <div>
                  <h3 className="font-serif text-lg sm:text-3xl lg:text-4xl 2xl:text-5xl font-medium tracking-tight text-white drop-shadow-md leading-tight line-clamp-2 md:line-clamp-1">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-white/90 text-[10px] sm:text-sm md:text-base font-medium mt-0.5 md:mt-1 line-clamp-1">
                      {project.category}
                    </p>
                  )}
                </div>
                <p className="hidden sm:block text-xs md:text-sm text-white/80 line-clamp-2 md:line-clamp-none leading-relaxed mt-1 md:mt-2">
                  {project.summary}
                </p>
              </div>

              {project.liveUrl && project.liveUrl.trim() !== "" && project.liveUrl !== "#" && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center shrink-0 rounded-full bg-[#FAF9F6] text-black px-3 py-1.5 md:px-8 md:py-3 font-semibold text-[10px] sm:text-xs md:text-sm transition-transform hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  <span>Visit site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
