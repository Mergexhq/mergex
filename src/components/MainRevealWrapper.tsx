'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export default function MainRevealWrapper({ children }: { children: ReactNode }) {
    const mainRef = useRef<HTMLDivElement>(null);
    
    // Track when the bottom of main passes the bottom of the viewport
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["end end", "end start"]
    });

    // As we scroll past the bottom of main (into the margin-bottom),
    // scale it down and round the corners to create a card effect.
    // Kept subtle as requested.
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ['0rem', '2.5rem']);

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
