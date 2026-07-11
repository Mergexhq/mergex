'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: "What does MergeX do?",
        answer: "MergeX creates software, AI solutions, and AI-powered creative productions for businesses. Every engagement is approached with a focus on solving real problems through thoughtful engineering, intelligent automation, and high-quality execution."
    },
    {
        question: "What types of businesses do you work with?",
        answer: "We work with startups, growing businesses, and established companies looking to build or improve their digital products, internal systems, AI capabilities, or creative assets. The industry matters less than the problem being solved."
    },
    {
        question: "What services does MergeX offer?",
        answer: "Rather than offering a long list of services, we focus on three core capabilities:\n\nSoftware Development\nAI Solutions\nAI Creative Production\n\nEach project is shaped around the client's objectives instead of predefined service packages."
    },
    {
        question: "Do you only build new products?",
        answer: "No. We also improve existing software, modernize digital platforms, integrate AI into current workflows, and produce creative assets that support business growth."
    },
    {
        question: "How do projects usually begin?",
        answer: "Every project starts with a conversation. We take time to understand the problem, define the objectives, and determine the most appropriate approach before any work begins."
    },
    {
        question: "Do you work with international clients?",
        answer: "Yes. MergeX collaborates with businesses across different regions through remote communication and structured project workflows."
    },
    {
        question: "What technologies do you use?",
        answer: "Technology is selected based on the needs of the project rather than personal preference. Our focus is choosing reliable, scalable, and maintainable solutions that fit the client's goals."
    },
    {
        question: "How can we start working together?",
        answer: "Simply reach out through the contact page with your project or idea. We'll discuss your requirements, understand the context, and determine the best way to move forward together."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 border-t border-black/5 relative overflow-hidden z-20">
            <div className="container mx-auto max-w-[1400px] px-6 md:px-8">
                
                {/* FAQ Header (Left-aligned, massive clamp size title) */}
                <div className="mb-16">
                    <h2 
                        className="font-questrial font-semibold tracking-wide text-black"
                        style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.1, letterSpacing: "0.02em" }}
                    >
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ Rows List with bottom borders and plus/minus icons */}
                <div className="border-t border-black/10 w-full">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="border-b border-black/10 w-full"
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full py-8 flex items-center justify-between gap-8 text-left focus:outline-none group"
                                >
                                    <span 
                                        className="text-xl md:text-2xl lg:text-3xl font-questrial font-medium text-black/90 tracking-wide leading-tight transition-colors duration-300 group-hover:text-black/60"
                                        style={{ letterSpacing: "0.015em" }}
                                    >
                                        {item.question}
                                    </span>
                                    
                                    {/* Animated Plus to Minus symbol */}
                                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0 text-black">
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
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
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
