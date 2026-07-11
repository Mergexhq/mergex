'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mobile-only floating hamburger button with a full-screen black
 * circle clip-path reveal animation. Replaces the bottom dock.
 */
export function MobileFullscreenMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isStudio = pathname === '/studio' || pathname === '/brands/mergex';

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const defaultLinks = [
        { label: 'About', href: '/about' },
        { label: 'Launches', href: '/launches' },
        { label: 'Studio', href: '/studio' },
        { label: 'Contact', href: '/contact' },
    ];

    const studioLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const links = isStudio ? studioLinks : defaultLinks;

    // The hamburger button is w-11 h-11 (44px) at top-5 right-5 (20px).
    // Clip origin = button center from top-left: x = 100% - 42px, y = 42px
    const CLIP_ORIGIN = 'calc(100% - 2.625rem) 2.625rem';

    return (
        <>
            {/* Floating Hamburger / Close Button */}
            <motion.button
                onClick={() => setIsOpen(prev => !prev)}
                animate={isOpen ? { backgroundColor: '#ffffff' } : { backgroundColor: '#ffffff' }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed top-5 right-5 z-[1350] w-11 h-11 rounded-full backdrop-blur-md border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center focus:outline-none"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <div className="relative w-5 h-5 flex items-center justify-center">
                    {/* Top bar */}
                    <motion.span
                        animate={isOpen
                            ? { rotate: 45, y: 0, width: '20px' }
                            : { rotate: 0, y: -4, width: '20px' }
                        }
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute h-[2px] bg-black rounded-full origin-center"
                        style={{ width: 20 }}
                    />
                    {/* Bottom bar */}
                    <motion.span
                        animate={isOpen
                            ? { rotate: -45, y: 0, width: '20px' }
                            : { rotate: 0, y: 4, width: '14px' }
                        }
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute h-[2px] bg-black rounded-full origin-center"
                        style={{ width: 14 }}
                    />
                </div>
            </motion.button>

            {/* Full-Screen Menu Overlay — circle clip-path expand from button */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-fullscreen-menu"
                        initial={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
                        animate={{ clipPath: `circle(170% at ${CLIP_ORIGIN})` }}
                        exit={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden fixed inset-0 z-[1300] bg-black flex flex-col items-start justify-end pb-24 px-8"
                    >
                        {/* Nav Links — stagger in from bottom */}
                        <nav className="flex flex-col items-start gap-1 w-full">
                            {links.map((link, i) => {
                                const isActive = link.href === '/'
                                    ? pathname === '/'
                                    : pathname?.startsWith(link.href);
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{
                                            delay: 0.1 + i * 0.06,
                                            duration: 0.4,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block font-questrial font-bold leading-none tracking-tight transition-colors duration-200 py-3 border-b border-white/10 w-full
                                                ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}
                                            `}
                                            style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)' }}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Bottom footer info */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                            className="mt-10 text-white/30 text-xs font-body tracking-wide"
                        >
                            © 2025-2026 MergeX
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
