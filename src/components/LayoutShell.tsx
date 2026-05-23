'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
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

/**
 * LayoutShell - wraps every page with Navbar, Footer curtain reveal,
 * and the global AskMergeXWidget floating button.
 */
export default function LayoutShell({ children }: { children: ReactNode }) {
    return (
        <LenisProvider>
            <Navbar />
            {/* Main content + Footer */}
            <MainRevealWrapper>
                {children}
                <Footer />
            </MainRevealWrapper>
            {/* Footer curtain pinned behind main content */}
            <FooterRevealWrapper>
                <FooterCurtain />
            </FooterRevealWrapper>
            {/* Global AI widget - visible on every page */}
            <AskMergeXWidget />
        </LenisProvider>
    );
}

