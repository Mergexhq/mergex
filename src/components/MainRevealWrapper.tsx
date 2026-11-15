'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useSyncExternalStore } from 'react';

/** Returns true while the viewport width is ≤ 768 px (mobile breakpoint). */
function subscribe(callback: () => void) {
    const mq = window.matchMedia('(max-width: 768px)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}

function getSnapshot() {
    return window.matchMedia('(max-width: 768px)').matches;
}

function getServerSnapshot() {
    return false;
}

function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function MainRevealWrapper({ children }: { children: ReactNode }) {
    const mainRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Track when the bottom of main passes the bottom of the viewport
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["end end", "end start"]
    });

    // Desktop: subtle 0.98 shrink. Mobile: dramatic 0.82 shrink so the
    // footer curtain is clearly visible as the card pulls away.
    const scaleEnd = isMobile ? 0.82 : 0.98;
    const radiusEnd = isMobile ? '2rem' : '2.5rem';

    const scale = useTransform(scrollYProgress, [0, 1], [1, scaleEnd]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ['0rem', radiusEnd]);

    return (
        <motion.main
            ref={mainRef}
            id="main-content"
            className="relative bg-background origin-bottom"
            style={{ 
                zIndex: 10, 
                marginBottom: 'var(--footer-height, 0px)',
                scale,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                overflow: 'clip'
            }}
        >
            {children}
        </motion.main>
    );
}
