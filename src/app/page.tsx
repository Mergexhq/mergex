import {
    HomeHero,
    FinalCTA,
    LogoScrollTransition
} from '@/modules/home/components';
import { ShowcaseFeed } from '@/modules/new-home/components/ShowcaseFeed';
import { ScaleMethodology } from '@/modules/methodology/components';

export default function HomePage() {
    return (
        <main className="relative bg-[var(--bg-primary)]">
            <LogoScrollTransition 
                logoSrc="/logo/logo.png" 
                heroContent={<HomeHero />}
            >
                <ShowcaseFeed />
            </LogoScrollTransition>

            {/* Scale Methodology Scroll Animation */}
            <ScaleMethodology />

            {/* 06 - CTA */}
            <FinalCTA />
        </main>
    );
}
