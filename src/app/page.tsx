import { MarqueeStrip } from '@/components/MarqueeStrip';
import {
    HomeHero,
    ProblemStatement,
    DiagnosticApproach,
    Proof,
    AlsoFromMergeX,
    FinalCTA
} from '@/modules/home/components';

export default function HomePage() {
    return (
        <main>
            {/* 01 - Hero */}
            <HomeHero />

            {/* 02 - Problem Statement */}
            <ProblemStatement />

            {/* 03 - The Diagnostic Approach */}
            <DiagnosticApproach />

            {/* 04 - Social Proof */}
            <Proof />

            {/* 05 - Ecosystem Brand Showcase */}
            <AlsoFromMergeX />

            {/* 06 - CTA */}
            <FinalCTA />

            {/* Marquee Strip - before footer */}
            <MarqueeStrip />
        </main>
    );
}
