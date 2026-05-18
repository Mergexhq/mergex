'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const whatWeDoColumns = [
    {
        title: 'Brand',
        items: [
            {
                label: 'MergeX',
                description: 'Operational scaling systems',
                href: '/brands/mergex',
            },
        ],
    },
    {
        title: 'Framework',
        items: [
            {
                label: 'Methodology',
                description: 'The S.C.A.L.E framework',
                href: '/methodology',
            },
        ],
    },
    {
        title: 'Start Here',
        items: [
            {
                label: 'Diagnostic',
                description: 'Start with clarity',
                href: '/diagnostic',
            },
        ],
    },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const [isWhatWeDoOpen, setIsWhatWeDoOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        const lenis = (window as any).lenis;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (lenis) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
            setIsWhatWeDoOpen(false);
        }

        return () => {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                        onClick={onClose}
                    />

                    {/* Menu Container */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-0 left-0 right-0 w-full h-[92dvh] bg-[#0a0a0a] z-[61] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 rounded-t-3xl overflow-hidden"
                    >
                        {/* Unified Header Row */}
                        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0 relative">
                            {/* Left spacer */}
                            <div className="w-8"></div>

                            {/* Center: Logo Icon */}
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                <Link href="/" onClick={onClose} className="flex items-center gap-1">
                                    <Image
                                        src="/logo/mergex-logo.png"
                                        alt="MergeX Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain brightness-0 invert"
                                    />
                                    <span
                                        className="font-clash font-bold text-2xl tracking-wide text-white"
                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                    >
                                        MERGEX
                                    </span>
                                </Link>
                            </div>

                            {/* Right: Close Button */}
                            <button
                                onClick={onClose}
                                className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
                                aria-label="Close menu"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Content Area */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 pb-12">
                            <div className="flex flex-col">
                                {/* Who We Are */}
                                <Link
                                    href="/about"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-2xl font-medium text-white tracking-tight group-hover:text-violet-400 transition-colors">
                                        Who We Are
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* What We Do — Accordion */}
                                <div className="border-b border-white/10">
                                    <button
                                        onClick={() => setIsWhatWeDoOpen(!isWhatWeDoOpen)}
                                        className="w-full flex items-center justify-between py-5 text-left group"
                                    >
                                        <span className={`text-2xl font-medium tracking-tight transition-colors ${isWhatWeDoOpen ? 'text-violet-400' : 'text-white group-hover:text-violet-400'}`}>
                                            What We Do
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isWhatWeDoOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg width="12" height="8" viewBox="0 0 10 6" fill="currentColor" className="text-violet-500">
                                                <polygon points="0,0 10,0 5,6" />
                                            </svg>
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isWhatWeDoOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-6 pb-6 pt-2">
                                                    <div className="bg-[#0f0f0f] rounded-xl p-6 border border-white/5">
                                                        <p className="text-white/60 text-sm mb-6">
                                                            Discover our portfolio – constantly evolving to keep pace with the ever-changing needs of scaling companies. We build operational systems that drive growth.
                                                        </p>
                                                        
                                                        {whatWeDoColumns.map((col, idx) => (
                                                            <div key={col.title} className={`${idx !== 0 ? 'mt-6 pt-6 border-t border-white/5' : ''}`}>
                                                                <h3 className="text-white/40 uppercase tracking-widest text-[10px] font-semibold mb-4">
                                                                    {col.title}
                                                                </h3>
                                                                <div className="flex flex-col gap-4">
                                                                    {col.items.map((item) => (
                                                                        <Link
                                                                            key={item.href}
                                                                            href={item.href}
                                                                            onClick={onClose}
                                                                            className="group/item flex flex-col"
                                                                        >
                                                                            <span className="text-white text-base font-medium group-hover/item:text-violet-400 transition-colors inline-flex items-center gap-2">
                                                                                {item.label}
                                                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-violet-400">
                                                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                            </span>
                                                                            <span className="text-white/40 text-xs mt-1">
                                                                                {item.description}
                                                                            </span>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Insights */}
                                <Link
                                    href="/insights"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-2xl font-medium text-white tracking-tight group-hover:text-violet-400 transition-colors">
                                        Insights
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Contact */}
                                <Link
                                    href="/contact"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5 border-b border-white/10"
                                >
                                    <span className="text-2xl font-medium text-white tracking-tight group-hover:text-violet-400 transition-colors">
                                        Contact
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>

                                {/* Login */}
                                <Link
                                    href="/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onClose}
                                    className="group flex items-center justify-between py-5"
                                >
                                    <span className="text-2xl font-medium text-white tracking-tight group-hover:text-violet-400 transition-colors">
                                        Login
                                    </span>
                                    <ArrowUpRight size={20} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                                </Link>
                            </div>


                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
