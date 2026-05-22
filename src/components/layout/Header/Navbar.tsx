'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MobileNav } from '@/components/layout/Header/MobileNav';

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

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [forceHidden, setForceHidden] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        if (latest > (typeof window !== 'undefined' ? window.innerHeight - 80 : 800)) {
            setIsPastHero(true);
        } else {
            setIsPastHero(false);
        }

        const previous = scrollY.getPrevious() ?? 0;
        // Hide on scroll down after 150px, show on scroll up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const isLightPage =
        (pathname === '/' && isPastHero) ||
        pathname?.startsWith('/insights') ||
        pathname?.startsWith('/systems') ||
        pathname?.startsWith('/legal') ||
        pathname?.startsWith('/partner') ||
        pathname === '/pricing' ||
        pathname?.startsWith('/contact') ||
        pathname === '/about' ||
        pathname === '/careers' ||
        pathname === '/sitemap' ||
        pathname?.startsWith('/brands') ||
        pathname?.startsWith('/methodology') ||
        pathname?.startsWith('/diagnostic');

    const textColorClass = isLightPage && !isDropdownOpen ? 'text-black' : 'text-white';
    const navItemColorClass = isLightPage && !isDropdownOpen
        ? 'text-black/80 hover:text-violet-600'
        : 'text-white/80 hover:text-white';
    
    // Dropdown open: force dark bg to blend with mega menu.
    // Light page + scrolled: solid white.
    // Everything else (including hero scroll): stay transparent.
    const cardBgClass = isDropdownOpen
        ? 'bg-black rounded-xl border border-white/10 shadow-2xl'
        : (isScrolled && isLightPage
            ? 'bg-[#F3F3F3] border-b border-gray-200/50 border-t-transparent border-l-transparent border-r-transparent rounded-none shadow-none'
            : 'bg-transparent border border-transparent rounded-none shadow-none');

    const openDropdown = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsDropdownOpen(true);
    };

    const closeDropdown = () => {
        timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 120);
    };

    useEffect(() => {
        const handleToggleNavbar = (e: CustomEvent<{ hidden: boolean }>) => {
            setForceHidden(e.detail.hidden);
        };
        window.addEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
        return () => {
            window.removeEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Also close dropdown on path change
    useEffect(() => {
        setIsDropdownOpen(false);
    }, [pathname]);

    // Notify AskMergeXWidget when mobile menu state changes
    useEffect(() => {
        const event = new CustomEvent('mergex:mobile-menu', {
            detail: { open: isMobileMenuOpen }
        });
        window.dispatchEvent(event);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Desktop Navbar */}
            <motion.div
                className="hidden lg:block w-full fixed top-0 left-0 right-0 z-50 pointer-events-none"
                initial={{ y: -100 }}
                animate={{ y: forceHidden || hidden ? '-100%' : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className={`w-full transition-all duration-500 ease-in-out ${isDropdownOpen ? 'p-2 lg:p-3' : 'p-0'}`}>
                    <div className={`w-full relative transition-all duration-500 ease-in-out overflow-hidden ${cardBgClass}`}>
                        <nav className="w-full h-16 pl-6 pr-8 flex items-center justify-center relative pointer-events-auto bg-transparent z-10">
                            {/* Logo — absolute left */}
                            <div className="absolute left-6 h-full flex items-center">
                                <Link href="/" className="flex items-center gap-0">
                                    <Image
                                        src="/logo/mergex-logo.png"
                                        alt="MergeX Logo"
                                        width={60}
                                        height={60}
                                        className={`object-contain transition-all duration-300 ${isDropdownOpen ? 'brightness-0 invert' : (isLightPage ? '' : 'brightness-0 invert')}`}
                                    />
                                    <span
                                        className={`font-clash font-bold text-2xl tracking-wide ml-1.5 mt-1 flex items-center gap-1.5 ${textColorClass} transition-colors duration-300`}
                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                    >
                                        <span>MERGEX</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Login — absolute right */}
                            <div className="absolute right-6 h-full flex items-center">
                                <Link
                                    href="/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-300 ${navItemColorClass}`}
                                >
                                    Login
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 mt-0.5">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Center Menu */}
                            <div className="flex items-center gap-8 h-full">
                                <Link
                                    href="/about"
                                    className={`relative h-full flex items-center px-1 text-base font-medium transition-colors duration-300 ${navItemColorClass}`}
                                >
                                    Who We Are
                                </Link>

                                {/* What We Do Mega Dropdown Trigger */}
                                <div
                                    ref={dropdownRef}
                                    className="h-full flex items-center"
                                    onMouseEnter={openDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    <button
                                        className={`relative flex items-center gap-1.5 px-1 text-base font-medium transition-colors duration-300 ${navItemColorClass}`}
                                        aria-expanded={isDropdownOpen}
                                        aria-haspopup="true"
                                    >
                                        What We Do
                                        <motion.svg
                                            width="8"
                                            height="5"
                                            viewBox="0 0 10 6"
                                            fill="currentColor"
                                            className="text-violet-500"
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <polygon points="0,0 10,0 5,6" />
                                        </motion.svg>
                                    </button>
                                </div>

                                <Link
                                    href="/insights"
                                    className={`relative h-full flex items-center px-1 text-base font-medium transition-colors duration-300 ${navItemColorClass}`}
                                >
                                    Insights
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`relative h-full flex items-center px-1 text-base font-medium transition-colors duration-300 ${navItemColorClass}`}
                                >
                                    Contact
                                </Link>
                            </div>
                        </nav>

                        {/* Fullscreen Megamenu Panel inside the same inner card in block flow */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full bg-transparent relative z-10 pointer-events-auto overflow-hidden"
                                    onMouseEnter={openDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    {/* Main Content Row */}
                                    <div className="flex relative z-10 w-full">
                                        {/* LEFT PANEL */}
                                        <div className="w-[40%] py-10 px-6 md:px-10 lg:px-12 flex flex-col justify-between">
                                            <div>
                                                <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-semibold mb-4">
                                                    What We Do
                                                </p>
                                                <h2
                                                    className="text-[1.75rem] leading-[1.15] font-clash font-semibold text-white mb-3"
                                                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                >
                                                    Business <span className="font-serif italic font-medium">Consulting</span>
                                                </h2>
                                                <p className="text-white/50 text-xs leading-relaxed">
                                                    MergeX is a consulting firm for scaling businesses.<br />We diagnose the real operational and structural<br />constraint before building any solution.
                                                </p>
                                            </div>
                                            <div className="mt-auto pt-8">
                                                <p className="text-white/20 uppercase tracking-[0.35em] text-[9px] font-normal">
                                                    The MergeX Company
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT PANEL */}
                                        <div className="w-[60%] py-10 px-6 md:px-10 lg:px-12 flex flex-col">
                                            <div className="flex flex-col gap-0 w-full">
                                                {/* PRIMARY — MergeX */}
                                                <Link
                                                    href="/brands/mergex"
                                                    className="group flex flex-col border-b border-white/6 pb-4 mb-4 w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Brand</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span
                                                            className="text-white text-xl font-clash font-semibold leading-none group-hover:text-violet-300 transition-colors duration-300"
                                                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                        >
                                                            MergeX
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/40 text-xs mt-1.5">Operational scaling systems</span>
                                                </Link>

                                                {/* SECONDARY — Methodology */}
                                                <Link
                                                    href="/methodology"
                                                    className="group flex flex-col border-b border-white/6 pb-4 mb-4 w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Framework</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-white text-lg font-medium group-hover:text-violet-300 transition-colors duration-300">
                                                            Methodology
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/35 text-xs mt-1">The S.C.A.L.E framework</span>
                                                </Link>

                                                {/* ACTION — Diagnostic */}
                                                <Link
                                                    href="/diagnostic"
                                                    className="group flex flex-col w-full"
                                                >
                                                    <p className="text-white/25 uppercase tracking-[0.18em] text-[9px] font-semibold mb-1.5">Start Here</p>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-white/80 text-sm font-medium group-hover:text-violet-300 transition-colors duration-300">
                                                            Diagnostic
                                                        </span>
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white shrink-0"
                                                        >
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-white/40 text-xs mt-1">The entry point to every consulting engagement</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navbar Header */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isMobileMenuOpen ? 0 : (forceHidden || hidden ? -100 : 0) }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
                <div
                    className={`w-full transition-all duration-300 ease-in-out pointer-events-auto ${
                        isMobileMenuOpen
                            ? 'bg-[#F3F3F3] border-b border-b-gray-200/50'
                            : (isScrolled 
                                ? (isLightPage ? 'bg-[#F3F3F3] border-b border-b-gray-200/50' : 'bg-black border-b border-b-white/10')
                                : 'bg-transparent border-b border-b-transparent'
                              )
                    } px-5 h-14 flex items-center justify-between relative`}
                >
                    {/* Left: Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 -ml-2 focus:outline-none z-10 ${
                            isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                        }`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M4 8h16"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M4 16h16"
                                    />
                                </>
                            )}
                        </svg>
                    </button>

                    {/* Centered Logo + Text */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10">
                        <Image
                            src="/logo/mergex-logo.png"
                            alt="MergeX Logo"
                            width={40}
                            height={40}
                            className={`object-contain transition-all duration-300 ${
                                isMobileMenuOpen || isLightPage ? '' : 'brightness-0 invert'
                            }`}
                        />
                        <span
                            className={`font-clash font-bold text-2xl tracking-wide ${
                                isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                            }`}
                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                        >
                            MERGEX
                        </span>
                    </Link>

                    {/* Right: Login Icon */}
                    <Link
                        href="/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 -mr-2 z-10 flex items-center justify-center ${
                            isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                        } transition-colors hover:opacity-70`}
                        aria-label="Login"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </Link>
                </div>
            </motion.div>

            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
