import {
    HomeHero,
    FinalCTA,
} from '@/modules/home/components';
import { ScaleMethodology } from '@/modules/methodology/components';
import { ExperimentsGallery } from '@/modules/labsPortfolio/components';

export default function HomePage() {
    return (
        <main className="relative bg-[var(--bg-primary)]">
            <HomeHero />

            {/* Scale Methodology Scroll Animation */}
            <ScaleMethodology />

            {/* Labs Portfolio Gallery */}
            <ExperimentsGallery />

            {/* 06 - CTA */}
            <FinalCTA />
        </main>
    );
}
