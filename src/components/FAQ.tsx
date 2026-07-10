'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
        <section className="bg-background py-16 md:py-24 border-t border-black/5 relative overflow-hidden z-20">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                {/* FAQ Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold tracking-[0.25em] text-[#8B5CF6] uppercase block mb-3 font-clash">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-clash font-bold text-black tracking-tight leading-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ Accordions */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div 
                                key={index} 
                                className="border border-black/5 rounded-2xl bg-white/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-black/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full py-5 px-6 md:py-6 md:px-8 flex items-center justify-between gap-4 text-left font-clash focus:outline-none"
                                >
                                    <span className="text-lg md:text-xl font-medium text-black/90 tracking-wide">
                                        {item.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-black/40 shrink-0 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center"
                                    >
                                        <ChevronDown size={18} />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="pb-6 px-6 md:pb-8 md:px-8 pt-0 text-sm md:text-base leading-relaxed text-black/70 font-light font-body whitespace-pre-line">
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
