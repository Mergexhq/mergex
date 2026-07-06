import {
    HomeHero,
    FinalCTA,
} from '@/modules/home/components';
import { ScaleMethodology } from '@/modules/methodology/components';

export default function HomePage() {
    return (
        <main className="relative bg-[var(--bg-primary)]">
            <HomeHero />

            {/* Scale Methodology Scroll Animation */}
            <ScaleMethodology />

            {/* 06 - CTA */}
            <FinalCTA />
        </main>
    );
}
