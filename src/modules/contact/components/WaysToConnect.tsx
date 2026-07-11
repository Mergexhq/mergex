'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { WAYS_TO_CONNECT, BOTTOM_CARDS } from '../content/contact';

export function WaysToConnect() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="bg-[var(--bg-primary)] py-16 border-t border-[var(--border-primary)]/20 z-20 relative">
            <div className="container mx-auto max-w-[1400px] px-6 md:px-8">
                
                {/* Header */}
                <div className="mb-12">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] block mb-3 font-questrial">
                        Engagement
                    </span>
                    <h2 className="text-2xl md:text-3xl font-questrial font-bold tracking-tight text-[var(--text-primary)]">
                        Different ways to engage.
                    </h2>
                </div>

                {/* Table List Layout for Launches & Studio */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="border-t border-[var(--border-primary)]/40 w-full"
                >
                    {WAYS_TO_CONNECT.map((path) => {
                        const isEmail = path.actionType === 'email';
                        
                        const buttonContent = (
                            <>
                                <span>{path.actionLabel}</span>
                                {isEmail ? (
                                    <ArrowUpRight size={13} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                ) : (
                                    <ArrowRight size={13} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                )}
                            </>
                        );

                        return (
                            <motion.div
                                key={path.title}
                                variants={itemVariants}
                                className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[var(--border-primary)]/40 gap-4 group"
                            >
                                {/* Left: Action Title */}
                                <div className="md:w-1/4">
                                    <h3 className="font-questrial font-bold text-xl md:text-2xl text-[var(--text-primary)] tracking-tight">
                                        {path.title}
                                    </h3>
                                </div>

                                {/* Center: Description text */}
                                <div className="md:w-1/2 md:max-w-xl">
                                    <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                                        {path.description}
                                    </p>
                                </div>

                                {/* Right: Action Outline Button */}
                                <div className="md:w-1/4 flex md:justify-end items-center">
                                    {isEmail ? (
                                        <a
                                            href={`mailto:${path.target}`}
                                            className="inline-flex items-center justify-center rounded-full border border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-questrial"
                                        >
                                            {buttonContent}
                                        </a>
                                    ) : (
                                        <Link
                                            href={path.target}
                                            className="inline-flex items-center justify-center rounded-full border border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-questrial"
                                        >
                                            {buttonContent}
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 2 Side-by-side cards at the bottom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full">
                    {BOTTOM_CARDS.map((card, idx) => (
                        <div 
                            key={idx}
                            className="relative w-full rounded-[16px] overflow-hidden min-h-[560px] md:min-h-[700px] border border-black/5 dark:border-white/5 flex flex-col justify-between p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                        >
                            {/* Background Image Layer */}
                            <div 
                                className="absolute inset-0 z-0 bg-no-repeat bg-bottom transition-transform duration-700 group-hover:scale-[1.02]"
                                style={{
                                    backgroundImage: `url('${card.bgImage}')`,
                                    backgroundSize: 'cover',
                                }}
                            />
                            
                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between items-start flex-1">
                                <div className="space-y-3">
                                    <h3 className="text-xl md:text-2xl font-bold font-questrial text-[var(--text-primary)] tracking-tight leading-tight max-w-[85%]">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-[95%]">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="pt-8">
                                    <a
                                        href={card.target}
                                        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 font-questrial shadow-sm"
                                    >
                                        <span>{card.actionLabel}</span>
                                        <ArrowUpRight size={13} className="ml-1.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
