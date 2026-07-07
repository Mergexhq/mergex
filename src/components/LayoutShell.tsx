'use client';

import { type ReactNode, createContext, useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { LenisProvider } from '@/lib/lenis-provider';
import MainRevealWrapper from '@/components/MainRevealWrapper';
import FooterRevealWrapper from '@/components/FooterRevealWrapper';
import { Navbar } from '@/components/layout/Header/Navbar';

const Footer = dynamic(() => import('@/components/Footer'), {
    ssr: true,
});

const FooterCurtain = dynamic(() => import('@/components/FooterCurtain'), {
    ssr: true,
});

// Loaded client-side only - uses localStorage, SpeechSynthesis, and window events
const AskMergeXWidget = dynamic(() => import('@/components/ask-mergex'), {
    ssr: false,
});

export const InputTypeContext = createContext<{ hasCursor: boolean, hasTouch: boolean }>({ hasCursor: false, hasTouch: false });
export const useInputType = () => useContext(InputTypeContext);

/**
 * LayoutShell - wraps every page with Navbar, Footer curtain reveal,
 * and the global AskMergeXWidget floating button.
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

    // Check if the current route is a detail page (disabled as insights pages are removed)
    const isDetailPage = false;

    return (
        <InputTypeContext.Provider value={inputTypes}>
            <LenisProvider>
                <Navbar />
                {/* Main content + Footer */}
                <MainRevealWrapper>
                    {children}
                    {!isDetailPage && <Footer />}
                </MainRevealWrapper>
                {/* Footer curtain pinned behind main content */}
                {!isDetailPage && (
                    <FooterRevealWrapper>
                        <FooterCurtain />
                    </FooterRevealWrapper>
                )}
                {/* Global AI widget - visible on every page */}
                {/* {!isDetailPage && <AskMergeXWidget />} */}
            </LenisProvider>
        </InputTypeContext.Provider>
    );
}

