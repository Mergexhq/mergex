'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface FooterRevealWrapperProps {
    children: ReactNode;
}

/**
 * Pins the footer to the bottom of the viewport (behind main content via z-index).
 * Measures footer height and writes it to --footer-height on :root so that
 * the main content can apply a matching margin-bottom, creating the curtain reveal effect.
 * Also applies a smooth vertical parallax translation to the footer content on scroll.
 */
const PARALLAX_OFFSET = 320;

export default function FooterRevealWrapper({ children }: FooterRevealWrapperProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        const contentEl = contentRef.current;
        if (!el || !contentEl) return;

        const syncHeight = () => {
            // Use the inner content height (not wrapper) for the margin calculation
            // so the main content scrolls by exactly the footer's natural height.
            const contentHeight = contentEl.offsetHeight;
            document.documentElement.style.setProperty('--footer-height', `${contentHeight}px`);
            
            // Re-trigger scroll calculation to position correctly on mount/resize
            handleScroll();
        };

        const handleScroll = () => {
            const contentHeight = contentEl.offsetHeight;
            // The last `contentHeight` pixels of scrollable range ARE the footer reveal zone.
            // Total scrollable px = scrollHeight - innerHeight (max possible scrollY).
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const revealThreshold = maxScroll - contentHeight;
            const scrollY = window.scrollY;
            const isRevealing = scrollY >= revealThreshold;

            window.dispatchEvent(new CustomEvent('mergex:toggle-navbar', {
                detail: { hidden: isRevealing }
            }));

            // Parallax: translate content from PARALLAX_OFFSET → 0 as scroll progresses
            if (contentHeight > 0) {
                // Start parallax slightly earlier for a more organic transition
                const startThreshold = maxScroll - contentHeight * 1.3;
                const totalRange = contentHeight * 1.3;
                
                // Progress from 0 (starts slide) to 1 (reaches final resting place)
                const progress = Math.max(0, Math.min(1, (scrollY - startThreshold) / totalRange));
                
                // Slide content upward: starts pushed down by PARALLAX_OFFSET, ends at 0
                const translateY = (1 - progress) * PARALLAX_OFFSET;
                contentEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        };

        // Set immediately on mount
        syncHeight();

        // Re-sync on resize (text wrap changes on mobile)
        const observer = new ResizeObserver(syncHeight);
        observer.observe(contentEl);

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            // Clean up the variable when the layout unmounts (e.g. studio route)
            document.documentElement.style.removeProperty('--footer-height');
            // Ensure navbar is visible when leaving
            window.dispatchEvent(new CustomEvent('mergex:toggle-navbar', {
                detail: { hidden: false }
            }));
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
                // Extend the wrapper upward by PARALLAX_OFFSET so the solid black
                // backdrop fills the full curtain area even when content is translated down.
                paddingTop: PARALLAX_OFFSET,
                backgroundColor: '#000000',
                overflow: 'hidden',
            }}
        >
            <div 
                ref={contentRef}
                style={{
                    willChange: 'transform',
                    // Start translated down by the full offset; JS scroll handler drives it to 0
                    transform: `translate3d(0, ${PARALLAX_OFFSET}px, 0)`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
