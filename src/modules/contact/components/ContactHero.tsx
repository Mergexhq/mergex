'use client';

import { motion } from 'framer-motion';
import { CONTACT_HERO } from '../content/contact';

export function ContactHero() {
    return (
        <section className="bg-[var(--bg-primary)] pt-40 pb-8">
            <div className="container mx-auto max-w-content px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full mb-16 lg:-ml-12"
                >
                    <h1 className="mb-16 text-5xl md:text-7xl lg:text-[6.5vw] font-questrial font-bold leading-[1.05] tracking-tight text-[var(--text-primary)]">
                        {CONTACT_HERO.headline}
                    </h1>

                    {/* Image 1 inspired layout - Flex row closely packed to the left */}
                    <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 lg:gap-16 pt-8 border-t border-[var(--border-primary)]/40">
                        {/* Location Column */}
                        <div className="space-y-3 min-w-[100px]">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)] block font-questrial">
                                {CONTACT_HERO.location.label}
                            </span>
                            <p className="text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                                {CONTACT_HERO.location.city}
                                <br />
                                {CONTACT_HERO.location.country}
                            </p>
                        </div>

                        {/* Contact Column */}
                        <div className="space-y-3 min-w-[140px]">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)] block font-questrial">
                                {CONTACT_HERO.contact.label}
                            </span>
                            <a 
                                href={`mailto:${CONTACT_HERO.contact.email}`}
                                className="text-base md:text-lg text-[var(--text-primary)] font-medium hover:underline inline-block transition-colors duration-200"
                            >
                                {CONTACT_HERO.contact.email}
                            </a>
                        </div>

                        {/* Founders Column */}
                        <div className="space-y-3 min-w-[280px]">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)] block font-questrial">
                                {CONTACT_HERO.founders.label}
                            </span>
                            <div className="flex flex-row flex-wrap gap-x-12 gap-y-4">
                                {CONTACT_HERO.founders.list.map((founder, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="font-semibold text-[var(--text-primary)] text-[15px] md:text-base font-questrial">
                                            {founder.name}
                                        </p>
                                        <p className="text-[11px] text-[var(--text-tertiary)] font-light uppercase tracking-wider leading-none">
                                            {founder.role}
                                        </p>
                                        <a 
                                            href={`mailto:${founder.email}`}
                                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium hover:underline inline-block mt-1"
                                        >
                                            {founder.email}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <hr className="border-[var(--border-primary)] opacity-50 mb-0 lg:-ml-12" />
            </div>
        </section>
    );
}

