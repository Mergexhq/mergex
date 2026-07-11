'use client';

import React from 'react';
import Link from 'next/link';

export default function LaunchesCTA() {
  return (
    <section className="w-full bg-white py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center border-t border-black/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        {/* Eyebrow */}
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[var(--text-tertiary)] select-none">
          Building something?
        </span>

        {/* Headline */}
        <h2
          className="font-questrial font-bold tracking-tight leading-[1.05] text-[var(--text-primary)]"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          Let&apos;s create software that&apos;s actually useful.
        </h2>

        {/* CTA Button */}
        <Link href="/contact" className="no-underline">
          <div className="group relative flex items-center justify-center gap-2 overflow-hidden bg-black text-white font-semibold text-sm md:text-base tracking-[0.06em] px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-md cursor-pointer">
            <span>Start a Project</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
