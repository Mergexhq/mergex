'use client';

import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "MergeX delivered exactly what we needed with exceptional attention to detail.",
    author: "Founder",
    role: "Core Team",
    company: "Neidhal FC",
  },
  {
    quote: "The AI system they built handles our entire customer intake process. Flawless.",
    author: "CTO",
    role: "Engineering",
    company: "HeyProData",
  },
  {
    quote: "Working with MergeX felt like having a world-class product team embedded in our company.",
    author: "CEO",
    role: "Founder",
    company: "Cedar Elevators",
  },
  {
    quote: "They shipped a full SaaS platform in 6 weeks. We couldn't believe the quality.",
    author: "Founder",
    role: "Core Founder",
    company: "Cinnastra",
  },
  {
    quote: "MergeX's attention to UI detail is unmatched. Our users noticed immediately.",
    author: "Co-Founder",
    role: "Product Lead",
    company: "Committe Platforms",
  },
  {
    quote: "The voice AI they deployed cut our receptionist load by 80%.",
    author: "Operations Lead",
    role: "Ops Director",
    company: "CorpoRating",
  },
];

// Split testimonials into 3 columns for the masonry scroll
const col1 = [testimonials[0], testimonials[3], testimonials[1], testimonials[0], testimonials[3], testimonials[1]];
const col2 = [testimonials[1], testimonials[4], testimonials[2], testimonials[1], testimonials[4], testimonials[2]];
const col3 = [testimonials[2], testimonials[5], testimonials[0], testimonials[2], testimonials[5], testimonials[0]];

export default function ClientVoices() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 md:px-8">
        {/* Dark Bento-style Card Wrapper for Testimonials */}
        <div className="relative w-full bg-black text-white rounded-2xl md:rounded-[24px] overflow-hidden p-8 md:p-16 border border-white/5 shadow-2xl z-10">
          
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/35">
                Client Voices
              </span>
              <h2
                className="font-questrial font-bold text-white leading-none animate-fade-in"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                What people are saying
              </h2>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                Clean, functional systems that drive actual business outcomes.
              </p>
            </div>

            {/* Masonry Infinite Scroll Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] overflow-hidden relative w-full mask-y">
              {/* Column 1 (Slow Scroll) */}
              <div className="flex flex-col gap-6 animate-scroll-up-slow">
                {col1.map((item, idx) => (
                  <TestimonialCard key={`col1-${idx}`} item={item} />
                ))}
              </div>

              {/* Column 2 (Medium Scroll) */}
              <div className="hidden md:flex flex-col gap-6 animate-scroll-down-medium">
                {col2.map((item, idx) => (
                  <TestimonialCard key={`col2-${idx}`} item={item} />
                ))}
              </div>

              {/* Column 3 (Fast Scroll) */}
              <div className="hidden md:flex flex-col gap-6 animate-scroll-up-fast">
                {col3.map((item, idx) => (
                  <TestimonialCard key={`col3-${idx}`} item={item} />
                ))}
              </div>

              {/* Fallback layout for mobile: since col2/3 are hidden, col1 is duplicated and wraps nicely */}
              <div className="md:hidden flex flex-col gap-6 animate-scroll-up-slow">
                {col1.map((item, idx) => (
                  <TestimonialCard key={`col1-mob-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled JSX for the infinite loop animation and y-axis gradient fading */}
      <style jsx global>{`
        .mask-y {
          mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up-slow {
          animation: scrollUp 28s linear infinite;
        }
        .animate-scroll-down-medium {
          animation: scrollDown 24s linear infinite;
        }
        .animate-scroll-up-fast {
          animation: scrollUp 20s linear infinite;
        }
        /* Pause on hover to allow reading */
        .animate-scroll-up-slow:hover,
        .animate-scroll-down-medium:hover,
        .animate-scroll-up-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="bg-[#0b0b0b] border border-white/8 rounded-xl p-6 md:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-white/20 select-none cursor-grab active:cursor-grabbing">
      <p className="text-white text-base md:text-lg font-light leading-relaxed font-body">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="flex flex-col gap-1">
        <h4 className="text-white font-questrial font-bold text-sm tracking-wide">
          {item.author}
        </h4>
        <p className="text-white/40 text-xs font-mono tracking-wider uppercase">
          {item.company}
        </p>
      </div>
    </div>
  );
}
