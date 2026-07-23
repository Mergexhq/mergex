'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '@/knowledge/faq';

/**
 * FAQ - Frequently Asked Questions accordion.
 *
 * Accessibility:
 *   - Each trigger is a <button> with aria-expanded and aria-controls.
 *   - Each answer panel has a matching id and role="region".
 *   - Focus is managed natively by the browser via the button element.
 *   - Keyboard: Tab to reach a button, Enter or Space to toggle.
 *
 * Data:
 *   - Content is imported from @/knowledge/faq - do not hardcode items here.
 *
 * SEO / GEO:
 *   - The FAQPage JSON-LD structured data is rendered in src/app/page.tsx,
 *     not here, to keep this component a pure UI concern.
 */
export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section
            aria-labelledby="faq-heading"
            className="bg-white py-20 border-t border-black/5 relative overflow-hidden z-20"
        >
            <div className="container mx-auto max-w-[1400px] px-6 md:px-8">

                {/* FAQ Header */}
                <div className="mb-16">
                    <h2
                        id="faq-heading"
                        className="font-questrial font-semibold tracking-wide text-black"
                        style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '0.02em' }}
                    >
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="border-t border-black/10 w-full">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = activeIndex === index;
                        const panelId = `faq-panel-${index}`;
                        const triggerId = `faq-trigger-${index}`;

                        return (
                            <div
                                key={index}
                                className="border-b border-black/10 w-full"
                            >
                                <button
                                    id={triggerId}
                                    onClick={() => toggleIndex(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    className="w-full py-8 flex items-center justify-between gap-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 rounded-sm group"
                                >
                                    <span
                                        className="text-xl md:text-2xl lg:text-3xl font-questrial font-medium text-black/90 tracking-wide leading-tight transition-colors duration-300 group-hover:text-black/60"
                                        style={{ letterSpacing: '0.015em' }}
                                    >
                                        {item.question}
                                    </span>

                                    {/* Animated plus / minus icon */}
                                    <div
                                        aria-hidden="true"
                                        className="relative flex items-center justify-center w-6 h-6 shrink-0 text-black"
                                    >
                                        <motion.span
                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                            className="absolute w-5 h-0.5 bg-current"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                        <motion.span
                                            animate={{ rotate: isOpen ? 0 : 90 }}
                                            className="absolute w-5 h-0.5 bg-current"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={triggerId}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="pb-8 pr-12 text-base md:text-lg leading-relaxed text-black/70 font-light font-body whitespace-pre-line max-w-4xl">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
