'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MobileNav } from '@/components/layout/Header/MobileNav';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [forceHidden, setForceHidden] = useState(false);
    const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const detailMenuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const isDetailPage = false;
    const isDropdownOpen = false;
    const isHome = pathname === '/';
    const launchesUrl = isHome ? '/#works' : '/launches';
    const studioUrl = isHome ? '/brands/mergex' : '/studio';

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

        // Close detailed menu on scroll
        if (Math.abs(latest - previous) > 5) {
            setIsDetailMenuOpen(false);
        }

        // Hide on scroll down after 150px, show on scroll up
        // Disabled by user request: do not hide the hamburger menu while scroll
        setHidden(false);
    });

    // --- NAVBAR THEME ROUTING ---
    // If a new page has a white/light hero section, add its pathname to LIGHT_HERO_ROUTES
    // to ensure the navbar text defaults to black instead of white.
    const LIGHT_HERO_ROUTES = [
        '/about',
        '/pricing',
        '/careers',
        '/sitemap',
        '/terms-of-use',
        '/privacy-policy',
        '/launches',
        '/studio',
    ];

    const isLightPageRaw =
        LIGHT_HERO_ROUTES.includes(pathname || '') ||
        pathname?.startsWith('/systems') ||
        pathname?.startsWith('/legal') ||
        pathname?.startsWith('/partner') ||
        pathname?.startsWith('/contact') ||
        (pathname?.startsWith('/brands') && pathname !== '/brands/ovrn-studios') ||
        pathname?.startsWith('/methodology');

    const hasDarkHero = pathname === '/terms-of-use' || pathname === '/privacy-policy';
    const isLightPage = (isLightPageRaw && (isScrolled || !hasDarkHero)) || (isHome && isPastHero);

    const textColorClass = isLightPage ? 'text-black' : 'text-white';
    const navItemColorClass = isLightPage
        ? 'text-black/80 hover:text-violet-600'
        : 'text-white/80 hover:text-white';
    
    const cardBgClass = 'bg-transparent rounded-none shadow-none';

    const pillBgClass = (!isScrolled && !isDetailPage)
        ? 'bg-transparent shadow-none border-transparent'
        : (isLightPage || (isHome && isScrolled)
            ? 'bg-white/60 backdrop-blur-md border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            : 'bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.15)]');

    const pillTextClass = (isLightPage || (isHome && isScrolled))
        ? 'text-black/70 hover:text-black'
        : 'text-white/70 hover:text-white';

    const getActiveLinkClass = (isActive: boolean) => {
        if (!isActive) return pillTextClass;
        if (isLightPage || (isHome && isScrolled)) {
            return 'bg-black text-white';
        }
        return (!isScrolled && !isDetailPage)
            ? 'bg-white/20 text-white'
            : 'bg-white text-black';
    };

    useEffect(() => {
        const handleToggleNavbar = (e: CustomEvent<{ hidden: boolean }>) => {
            setForceHidden(e.detail.hidden);
        };
        window.addEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
        return () => {
            window.removeEventListener('mergex:toggle-navbar', handleToggleNavbar as EventListener);
        };
    }, []);

    // Also close dropdown on path change
    useEffect(() => {
        setIsDetailMenuOpen(false);
    }, [pathname]);

    // Click outside detail menu handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (detailMenuRef.current && !detailMenuRef.current.contains(event.target as Node)) {
                setIsDetailMenuOpen(false);
            }
        }
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsDetailMenuOpen(false);
            }
        }

        if (isDetailMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isDetailMenuOpen]);

    // Notify AskMergeXWidget when mobile menu state changes
    useEffect(() => {
        const event = new CustomEvent('mergex:mobile-menu', {
            detail: { open: isMobileMenuOpen }
        });
        window.dispatchEvent(event);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Absolute Logo Header (scrolls with page) */}
            {pathname !== '/brands/ovrn-studios' && (
                <div className="hidden lg:block w-full absolute top-0 left-0 right-0 z-40 pointer-events-none mergex-logo-header">
                    <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 mt-4">
                        <div className="w-full h-20 xl:h-24 flex items-center justify-between px-4 xl:px-6">
                            {/* Logo - Left */}
                            <div className="flex items-center pointer-events-auto">
                                <Link href="/" className="flex items-center gap-0">
                                    <Image
                                        src="/logo/mergex logo black.png"
                                        alt="MergeX Logo"
                                        width={40}
                                        height={40}
                                        className={`object-contain transition-all duration-300 w-6 h-6 xl:w-[26px] xl:h-[26px] 2xl:w-7 2xl:h-7 ${isLightPage ? '' : 'brightness-0 invert'}`}
                                    />
                                    <span
                                        className={`font-questrial font-bold text-[21px] xl:text-[24px] 2xl:text-[27px] tracking-[0.12em] ml-2.5 xl:ml-3 flex items-center ${textColorClass} transition-colors duration-300`}
                                    >
                                        MERGEX
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Absolute Mobile Logo Header (scrolls with page) */}
            {pathname !== '/brands/ovrn-studios' && (
                <div className="lg:hidden w-full absolute top-0 left-0 right-0 z-40 pointer-events-none mergex-logo-header">
                    <div className="w-full px-4 pt-3">
                        <div className="w-full px-5 h-14 flex items-center justify-center relative">
                            {/* Centered Wordmark */}
                            {(() => {
                              if (pathname === '/brands/academy') {
                                return (
                                  <Link href="/brands/academy" className="flex items-center justify-center pointer-events-auto">
                                    <span className={`text-[14px] leading-none whitespace-nowrap ${isLightPage ? 'text-black' : 'text-white'}`}>
                                      <span className="font-questrial font-bold tracking-wide">MergeX</span>
                                      {' '}
                                      <span className="font-questrial font-thin tracking-wide">Academy</span>
                                    </span>
                                  </Link>
                                );
                              }
                              if (pathname === '/brands/mergex') {
                                return (
                                  <Link href="/brands/mergex" className="flex items-center justify-center gap-1.5 pointer-events-auto">
                                    <Image
                                      src="/logo/mergex logo black.png"
                                      alt="MergeX Logo"
                                      width={40}
                                      height={40}
                                      className={`object-contain transition-all duration-300 w-5 h-5 ${isLightPage ? '' : 'brightness-0 invert'}`}
                                    />
                                    <span
                                      className={`font-questrial font-bold text-2xl tracking-[0.12em] ml-1 flex items-center ${isLightPage ? 'text-black' : 'text-white'}`}
                                    >
                                      MERGEX
                                    </span>
                                  </Link>
                                );
                              }
                              return (
                                <Link href="/" className="flex items-center justify-center gap-1.5 pointer-events-auto">
                                  <Image
                                    src="/logo/mergex logo black.png"
                                    alt="MergeX Logo"
                                    width={40}
                                    height={40}
                                    className={`object-contain transition-all duration-300 w-5 h-5 ${isLightPage ? '' : 'brightness-0 invert'}`}
                                  />
                                  <span className={`font-questrial font-bold text-xl tracking-[0.12em] ml-1 flex items-center ${isLightPage ? 'text-black' : 'text-white'}`}>
                                    MERGEX
                                  </span>
                                </Link>
                              );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Navbar */}
            <motion.div
                className="hidden lg:block w-full fixed top-0 left-0 right-0 z-[1200] pointer-events-none mergex-navbar"
                initial={{ y: -100 }}
                animate={{ y: forceHidden || hidden ? '-100%' : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 mt-4">
                    <div className={`w-full relative transition-all duration-500 ease-in-out ${isDropdownOpen ? cardBgClass + ' overflow-hidden' : 'bg-transparent'}`} style={{ border: 'none' }}>
                        <nav className="w-full h-20 xl:h-24 flex items-center justify-between relative pointer-events-none bg-transparent z-10 px-4 xl:px-6">
                            {/* Logo - Left */}
                            <div className="flex items-center pointer-events-auto">
                                {pathname === '/brands/ovrn-studios' && (
                                    <div className={`flex items-center gap-1 xl:gap-1.5 py-1 px-3.5 rounded-token-sm xl:rounded-token-md transition-all duration-500 ease-in-out ${pillBgClass} ${isDetailPage && !isDropdownOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                        <Link href="/brands/ovrn-studios" className="flex items-center gap-0 py-1 px-1">
                                            <span
                                                className={`font-clash font-bold text-lg xl:text-xl 2xl:text-2xl tracking-wider flex items-center ${textColorClass} transition-colors duration-300`}
                                            >
                                                OVRN STUDIOS
                                            </span>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Menu Capsule - Right */}
                            <div className="flex items-center pointer-events-auto">
                                {(isDetailPage || isScrolled) ? (
                                     /* Expanding Hamburger Menu Card */
                                     <motion.div
                                         ref={detailMenuRef}
                                         layout
                                         transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                         className={`flex items-center pointer-events-auto cursor-default transition-[background-color,border-color,box-shadow,border-radius,padding] duration-300 ease-in-out ${
                                             isDetailMenuOpen
                                                 ? `gap-1 xl:gap-1.5 p-2 xl:p-2.5 rounded-token-sm xl:rounded-token-md ${pillBgClass}`
                                                 : (isDropdownOpen
                                                     ? 'bg-transparent border-transparent shadow-none h-10 xl:h-12 p-1 rounded-token-sm xl:rounded-token-md'
                                                     : `${pillBgClass} h-9 xl:h-10 p-1 rounded-token-sm xl:rounded-token-md`)
                                         }`}
                                     >
                                         {/* Inner links & Button with smooth AnimatePresence transition */}
                                         <AnimatePresence initial={false} mode="wait">
                                             {isDetailMenuOpen ? (
                                                 <motion.div
                                                     key="menu-links"
                                                     initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                                     animate={{ opacity: 1, x: 0, scale: 1 }}
                                                     exit={{ opacity: 0, x: -8, scale: 0.96 }}
                                                     transition={{ duration: 0.2, ease: "easeOut" }}
                                                     className="flex items-center"
                                                 >
                                                     {/* Standard capsule links */}
                                                      <Link
                                                          href="/about"
                                                          className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname === '/about')}`}
                                                          onClick={() => setIsDetailMenuOpen(false)}
                                                      >
                                                          About
                                                      </Link>

                                                      <Link
                                                          href={launchesUrl}
                                                          className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(isHome ? false : pathname === '/launches')}`}
                                                          onClick={() => setIsDetailMenuOpen(false)}
                                                      >
                                                          Launches
                                                      </Link>

                                                      <Link
                                                          href={studioUrl}
                                                          className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(isHome ? false : pathname === '/studio')}`}
                                                          onClick={() => setIsDetailMenuOpen(false)}
                                                      >
                                                          studio
                                                      </Link>

                                                      <Link
                                                          href="/contact"
                                                          className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/contact'))}`}
                                                          onClick={() => setIsDetailMenuOpen(false)}
                                                      >
                                                          contact
                                                      </Link>
                                                 </motion.div>
                                             ) : (
                                                 <motion.button
                                                     key="hamburger-button"
                                                     onClick={() => setIsDetailMenuOpen(true)}
                                                     initial={{ opacity: 0, scale: 0.85 }}
                                                     animate={{ opacity: 1, scale: 1 }}
                                                     exit={{ opacity: 0, scale: 0.85 }}
                                                     transition={{ duration: 0.15 }}
                                                     className={`w-8 xl:w-9 h-8 xl:h-9 rounded-token-sm xl:rounded-token-md flex items-center justify-center transition-colors duration-200 focus:outline-none ${
                                                         isDropdownOpen ? 'hover:bg-white/10' : ((isLightPage || (isHome && isScrolled)) ? 'hover:bg-black/5' : 'hover:bg-white/10')
                                                     }`}
                                                     aria-label="Open menu"
                                                 >
                                                     <div className="w-5 h-[12px] flex flex-col justify-between relative">
                                                         <span
                                                             className={`w-full h-[3px] rounded-full origin-center transition-colors duration-200 ${
                                                                 isDropdownOpen ? 'bg-white' : ((isLightPage || (isHome && isScrolled)) ? 'bg-black' : 'bg-white')
                                                             }`}
                                                         />
                                                         <span
                                                             className={`w-full h-[3px] rounded-full origin-center transition-colors duration-200 ${
                                                                 isDropdownOpen ? 'bg-white' : ((isLightPage || (isHome && isScrolled)) ? 'bg-black' : 'bg-white')
                                                             }`}
                                                         />
                                                     </div>
                                                 </motion.button>
                                             )}
                                         </AnimatePresence>
                                     </motion.div>
                                ) : (
                                     /* DEFAULT Menu Capsule */
                                     <div className={`flex items-center gap-1 xl:gap-1.5 p-1 xl:p-1 px-1.5 rounded-token-sm xl:rounded-token-md transition-all duration-500 ease-in-out ${pillBgClass}`}>
                                         <Link
                                             href="/about"
                                             className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname === '/about')}`}
                                         >
                                             About
                                         </Link>

                                         <Link
                                             href={launchesUrl}
                                             className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(isHome ? false : pathname === '/launches')}`}
                                         >
                                             Launches
                                         </Link>

                                         <Link
                                             href={studioUrl}
                                             className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(isHome ? false : pathname === '/studio')}`}
                                         >
                                             studio
                                         </Link>

                                         <Link
                                             href="/contact"
                                             className={`font-roboto text-[10px] xl:text-[11px] 2xl:text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-200 px-3.5 xl:px-4 py-1.5 xl:py-1.5 rounded-token-sm xl:rounded-token-md ${getActiveLinkClass(pathname?.startsWith('/contact'))}`}
                                         >
                                             contact
                                         </Link>
                                     </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navbar Header */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isMobileMenuOpen ? 0 : (forceHidden || hidden ? -100 : 0) }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden fixed top-0 left-0 right-0 z-[1200] pointer-events-none mergex-navbar"
            >
                <div className="w-full px-4 pt-3">
                    <div
                        className={`w-full transition-all duration-300 ease-in-out pointer-events-none rounded-[16px] border ${
                            isMobileMenuOpen
                                ? 'bg-white/85 border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md'
                                : ((isScrolled && !isHome)
                                    ? 'bg-white/85 border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md'
                                    : 'bg-transparent border-transparent shadow-none'
                                  )
                        } px-5 h-14 flex items-center justify-between relative`}
                    >
                        {/* Left: Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`focus:outline-none z-10 pointer-events-auto transition-all duration-300 ${
                                isMobileMenuOpen
                                    ? 'p-2 -ml-2 text-black'
                                    : (isHome && !isScrolled)
                                        /* Hero: frosted glass pill matching About Glimpse style */
                                        ? 'w-10 h-10 flex items-center justify-center rounded-[12px] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.2)] text-white'
                                        : isLightPage
                                            ? 'p-2 -ml-2 text-black'
                                            : 'p-2 -ml-2 text-white'
                            }`}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <>
                                        <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </>
                                )}
                            </svg>
                        </button>

                        {/* Centered Wordmark – path-aware */}
                        {pathname === '/brands/ovrn-studios' && (
                          <Link href="/brands/ovrn-studios" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10 pointer-events-auto">
                            <span
                               className={`font-clash font-bold text-xl tracking-wider ${
                                 isMobileMenuOpen || isLightPage ? 'text-black' : 'text-white'
                               }`}
                             >
                              OVRN Studio
                            </span>
                          </Link>
                        )}

                        {/* Right Placeholder to balance Hamburger */}
                        <div className="w-10 h-10 pointer-events-none shrink-0" />
                    </div>
                </div>
            </motion.div>

            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} pathname={pathname} />
        </>
    );
}
