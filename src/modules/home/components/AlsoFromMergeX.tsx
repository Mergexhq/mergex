'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

interface BrandItem {
    id: string;
    title: string;
    description: string;
    ctaText: string;
    href: string;
    logo?: React.ReactNode;
}

export function AlsoFromMergeX() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const brands: BrandItem[] = [
        {
            id: 'mergex',
            title: 'MergeX',
            description: 'Operational systems for businesses ready to scale.',
            ctaText: 'Explore MergeX',
            href: '/brands/mergex',
            logo: null
        },
        {
            id: 'ovrn-studios',
            title: 'OVRN Studios',
            description: 'Creative production for modern brands.',
            ctaText: 'Explore OVRN',
            href: '/brands/ovrn-studios',
            logo: null
        },
        {
            id: 'mergex-academy',
            title: 'MergeX Academy',
            description: 'Practical education for founders and creators.',
            ctaText: 'Explore Academy',
            href: '/brands/academy',
            logo: null
        }
    ];

    // Stagger containers
    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1] // easeOutExpo
            }
        }
    };

    return (
        <section className="py-24 md:py-36 px-6 bg-background relative border-t border-border/80">
            {/* Minimal Noise Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
                }} 
            />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* ── Editorial Header ── */}
                <div className="mb-20 md:mb-28">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
                        ECOSYSTEM
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16">
                        <h2 
                            className="font-serif text-3xl md:text-5xl font-normal leading-[1.12] text-foreground lg:w-[50%] tracking-[0.01em]"
                        >
                            The MergeX Ecosystem
                        </h2>
                        <p className="text-sm md:text-base text-foreground-muted lg:w-[45%] lg:pt-3 font-body leading-relaxed max-w-xl">
                            Three specialized brands. One shared philosophy: build the right foundation first.
                        </p>
                    </div>
                </div>

                {/* ── Horizontal Brand Rails ── */}
                <div className="border-t border-border/80">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col w-full"
                    >
                        {brands.map((brand, index) => {
                            const isHovered = hoveredIndex === index;
                            const isAnyHovered = hoveredIndex !== null;
                            const isDimmed = isAnyHovered && !isHovered;

                            return (
                                <motion.div
                                    key={brand.id}
                                    variants={itemVariants}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    animate={{ 
                                        opacity: isDimmed ? 0.45 : 1
                                    }}
                                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    className="border-b border-border/80"
                                >
                                    <Link 
                                        href={brand.href} 
                                        className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 w-full transition-all duration-300"
                                    >
                                        {/* Column 1: Logo + Brand Name */}
                                        <div className="flex items-center gap-6 md:w-[35%] mb-4 md:mb-0">
                                            {brand.logo && (
                                                <motion.div 
                                                    animate={{ 
                                                        scale: isHovered ? 1.08 : 1
                                                    }}
                                                    transition={{ 
                                                        type: 'spring', 
                                                        stiffness: 260, 
                                                        damping: 22 
                                                    }}
                                                    className="text-foreground shrink-0"
                                                >
                                                    {brand.logo}
                                                </motion.div>
                                            )}
                                            <h3 
                                                className="font-clash text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300"
                                                style={{ fontFamily: "'Clash Display', sans-serif" }}
                                            >
                                                {brand.title}
                                            </h3>
                                        </div>

                                        {/* Column 2: Short Punchy Description */}
                                        <div className="md:w-[50%] mb-6 md:mb-0">
                                            <p className="text-sm md:text-base text-foreground-muted group-hover:text-foreground transition-colors duration-300 font-body leading-relaxed max-w-xl">
                                                {brand.description}
                                            </p>
                                        </div>

                                        {/* Column 3: Custom Premium Explore Circle Button */}
                                        <div className="md:w-[15%] flex md:justify-end items-center">
                                            <motion.div 
                                                animate={{
                                                    borderColor: isHovered ? 'var(--primary)' : 'var(--border)',
                                                    backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.05)' : 'rgba(0, 0, 0, 0)'
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border"
                                            >
                                                <motion.svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    animate={{ x: isHovered ? 4 : 0 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                    className={`stroke-[2.2px] ${isHovered ? 'text-primary' : 'text-foreground-muted'}`}
                                                >
                                                    <path
                                                        d="M3 8h10M9 3l5 5-5 5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </motion.svg>
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* ── Bottom Centered View All Brands Button ── */}
                <div className="flex justify-center mt-20 md:mt-24">
                    <Link
                        href="/brands"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>View all brands</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            className="stroke-current transform group-hover:translate-x-0.5 transition-transform stroke-[2px]"
                        >
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
