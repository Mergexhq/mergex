'use client';

import { type ReactNode, createContext, useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LenisProvider } from '@/lib/lenis-provider';
import MainRevealWrapper from '@/components/MainRevealWrapper';
import FooterRevealWrapper from '@/components/FooterRevealWrapper';
import { Navbar } from '@/components/layout/Header/Navbar';
import GradualBlur from '@/components/GradualBlur';

const FAQ = dynamic(() => import('@/components/FAQ'), {
    ssr: true,
});

const FooterCurtain = dynamic(() => import('@/components/FooterCurtain'), {
    ssr: true,
});

export const InputTypeContext = createContext<{ hasCursor: boolean, hasTouch: boolean }>({ hasCursor: false, hasTouch: false });
export const useInputType = () => useContext(InputTypeContext);

/**
 * LayoutShell - wraps every page with Navbar, Footer curtain reveal,
 * and the global GradualBlur indicator.
 */
export default function LayoutShell({ children }: { children: ReactNode }) {
    const pathname = usePathname() || '';
    const [inputTypes, setInputTypes] = useState({ hasCursor: false, hasTouch: false });
    useEffect(() => {
        const cursor = window.matchMedia("(any-pointer: fine)");

        const update = () => {
            setInputTypes({
                hasCursor: cursor.matches,
                hasTouch: window.matchMedia("(any-pointer: coarse)").matches,
            });
        };

        update();

        cursor.addEventListener("change", update);

        return () => {
            cursor.removeEventListener("change", update);
        };
    }, []);

    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isInWorks, setIsInWorks] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if we are near the bottom of the page
            const threshold = 250; // pixels from the bottom
            const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;
            setIsAtBottom(isNearBottom);

            // Check if we are in the Works pinned section
            const worksEl = document.getElementById("works-pinned");
            if (worksEl) {
                const rect = worksEl.getBoundingClientRect();
                // Active when pinned (top has reached top of viewport and container is still visible)
                const active = rect.top <= 10 && rect.bottom > 10;
                setIsInWorks(active);
            } else {
                setIsInWorks(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Run once on mount and on path change to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const isDetailPage = false;

    return (
        <InputTypeContext.Provider value={inputTypes}>
            <LenisProvider>
                <Navbar />
                {/* Main content + Footer */}
                <MainRevealWrapper>
                    {children}
                    {pathname === '/' && <FAQ />}
                </MainRevealWrapper>
                {/* Footer curtain pinned behind main content */}
                {!isDetailPage && (
                    <FooterRevealWrapper>
                        <FooterCurtain />
                    </FooterRevealWrapper>
                )}
                <GradualBlur
                    target="page"
                    position={isInWorks ? "right" : "bottom"}
                    height="6rem"
                    strength={2}
                    divCount={5}
                    curve="bezier"
                    exponential={true}
                    opacity={1}
                    style={{
                        opacity: isInWorks ? (isAtBottom ? 0 : 1) : 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s ease-out'
                    }}
                />
            </LenisProvider>
        </InputTypeContext.Provider>
    );
}
