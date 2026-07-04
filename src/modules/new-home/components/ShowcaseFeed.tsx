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
import { useGlobalVideoObserver } from "@/lib/videoObserver";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const HOVER_INTENT_MS = 400;

export const ShowcaseFeed = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Curated groupings for each rail.
  const rails = [
    { title: "Brand Identity & Experiences", data: worksData.slice(0, 6) },
    { title: "Trending in Fintech", data: worksData.slice(4, 10).reverse() },
    { title: "Because you watched Vanguard", data: worksData.slice(2, 8) },
  ];

  // Scroll-reveal only — transform/opacity, no layout properties.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".work-rail").forEach((rail) => {
        gsap.fromTo(
          rail,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: rail, start: "top 92%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full pb-32">
      <CinematicHero />

      <section className="w-full mt-12 flex flex-col gap-12 md:gap-20">
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
    <div className="work-rail group/rail w-full">
      {/* Title */}
      <div className={`mb-4 flex items-center justify-between md:mb-6 ${padding}`}>
        <h2 className="inline-flex w-fit cursor-pointer items-center gap-1.5 font-clash text-2xl font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--primary)] md:text-3xl">
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
            className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-4 bg-gradient-to-r from-[var(--bg-primary)] to-transparent transition-opacity duration-300 md:w-8 ${atStart ? "opacity-0" : "opacity-0 md:group-hover/rail:opacity-60"
              }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-4 bg-gradient-to-l from-[var(--bg-primary)] to-transparent transition-opacity duration-300 md:w-8 ${atEnd ? "opacity-0" : "opacity-0 md:group-hover/rail:opacity-60"
              }`}
          />
        </>
      )}
      <div ref={trackRef}
        onScroll={updateEdges}
        className="relative overflow-x-auto hide-scrollbar"
      >                                         {/* Scroll track*/}
        {/* scroll container */}
        <div
          className={`hide-scrollbar flex snap-x snap-mandatory items-start gap-4 py-4 md:gap-6  ${padding}`}
        >
          {data.map((project, i) => {
            const uid = `${project.id}-${i}`;
            return (
              <WorkCard
                key={uid}
                project={project}
              />
            );
          })}
        </div>
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
      className={`absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/80 text-[var(--text-primary)] shadow-lg backdrop-blur-md transition-all duration-300 ${side === "left" ? "left-3" : "right-3"
        } ${hidden ? "pointer-events-none !opacity-0" : ""} ${touchOnly
          ? "opacity-100"
          : "opacity-0 hover:scale-105 hover:bg-white group-hover/rail:opacity-100"
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
}: {
  project: Project;
}) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useGlobalVideoObserver(videoRef);

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
        className="relative flex-none cursor-pointer snap-start rounded-xl bg-[var(--bg-secondary)] shadow-md ring-1 ring-black/5 w-[85vw] sm:w-[460px] md:w-[540px] lg:w-[620px] 2xl:w-[720px] group transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleExpand}
      >
        <div className="relative aspect-video w-full flex-none self-start overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent pt-8 pb-4 px-4 md:pb-6 md:px-6 lg:pb-8 lg:px-8">
            <h3 className="font-clash text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-white drop-shadow-md">
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
              <ArrowUpRight
                size={16}
                className="w-4 h-4 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--primary)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pop-out Overlay Card (Netflix style) */}
      <AnimatePresence>
        {expanded && rect && typeof document !== "undefined" && (
          <ExpandedPortalCard
            project={project}
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
  rect,
  onClose,
}: {
  project: Project;
  rect: DOMRect;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const liveUrl = project.liveUrl || "#";
  const inputType = useInputType();
  const isTouchOnly = inputType.hasTouch && !inputType.hasCursor;

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => { });
    }
  }, []);

  // Close on click outside or any scroll
  const startScrollY = useRef(window.scrollY);

  useEffect(() => {
    startScrollY.current = window.scrollY;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - startScrollY.current);

      // Ignore tiny scrolls
      if (delta < 50) return; // adjust threshold (e.g. 30, 50, 100)

      onClose();
    };

    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, {
        capture: true,
      });
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
  const desiredWidth = isMobile ? maxAvailableWidth : rect.width * 1.15;
  const targetWidth = Math.min(desiredWidth, maxAvailableWidth);
  const scale = targetWidth / rect.width;

  // Estimate height: aspect-video (9/16) + detail drawer (~130px)
  const unscaledHeight = rect.width * (9 / 16) + 130;
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
        className="absolute bg-[var(--bg-secondary)] shadow-2xl ring-1 ring-black/20 rounded-xl pointer-events-auto flex flex-col"
      >
        <div className="relative aspect-video w-full flex-none self-start overflow-hidden rounded-t-xl">
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/20 text-white/90 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white hover:scale-105 cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent pt-8 pb-4 px-4 md:pb-6 md:px-6 lg:pb-8 lg:px-8">
            <div className="flex items-center gap-3 md:gap-4 mb-1">
              <h3 className="font-clash text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-white drop-shadow-md">
                {project.title}
              </h3>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 h-7 md:h-8 overflow-hidden"
                aria-label="Visit site"
              >
                <span className={`whitespace-nowrap font-medium uppercase tracking-widest text-[9px] md:text-[10px] transition-all duration-300 ease-out overflow-hidden flex items-center ${isTouchOnly
                  ? 'max-w-[80px] opacity-100 pl-3'
                  : 'max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:pl-3'
                  }`}>
                  {isTouchOnly ? 'Visit site' : 'View site'}
                </span>
                <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 flex items-center justify-center rounded-full">
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Detail Drawer */}
        <div className="w-full rounded-b-xl bg-[var(--bg-secondary)] overflow-hidden">
          <div className="flex flex-col gap-3 px-4 py-4 md:px-6 md:py-5">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {project.summary}
            </p>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
