'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LaunchesCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position as the top of LaunchesCTA reaches near the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "start 10%"]
  });

  // Map scroll progress to dark-to-light transitions
  const bgColor = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);
  const textColor = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#000000"]);
  const eyebrowColor = useTransform(scrollYProgress, [0, 1], ["#555555", "#999999"]);

  // Button style transitions
  const btnBg = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#000000"]);
  const btnText = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="w-full py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        {/* Eyebrow */}
        <motion.span 
          style={{ color: eyebrowColor }}
          className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase select-none"
        >
          Building something?
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="font-questrial font-bold tracking-tight leading-[1.05]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', color: textColor }}
        >
          Let&apos;s create software that&apos;s actually useful.
        </motion.h2>

        {/* CTA Button */}
        <Link href="/contact" className="no-underline">
          <motion.div
            style={{ backgroundColor: btnBg, color: btnText }}
            className="group relative flex items-center justify-center gap-2 overflow-hidden font-semibold text-sm md:text-base tracking-[0.06em] px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-md cursor-pointer"
          >
            <span>Start a Project</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
}
