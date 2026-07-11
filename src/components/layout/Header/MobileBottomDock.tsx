'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mobile-only floating bottom dock navigation.
 * - Default pages: About, Launches, Studio, Contact
 * - Studio (/studio) page: Home, About, Contact
 * - Fully rounded pill with frosted glass black background
 */
export function MobileBottomDock() {
    const pathname = usePathname();
    const isStudio = pathname === '/studio' || pathname === '/brands/mergex';

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

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname?.startsWith(href) ?? false;
    };

    return (
        // Only shown on mobile (lg:hidden)
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-[1200] flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isStudio ? 'studio-dock' : 'default-dock'}
                    initial={{ opacity: 0, y: 24, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-black/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10"
                >
                    {links.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    relative px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.14em] uppercase
                                    transition-all duration-300 ease-out
                                    ${active
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
