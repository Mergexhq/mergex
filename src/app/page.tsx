import {
    HomeHero,
    FinalCTA
} from '@/modules/home/components';
import { ShowcaseFeed } from '@/modules/new-home/components/ShowcaseFeed';

export default function HomePage() {
    return (
        <main className="relative bg-[var(--bg-primary)]">
            {/* 01 - Hero */}
            <HomeHero />

            {/* 02 - Works / Showcase Feed (Overlaps hero) */}
            <div className="relative z-10 -mt-4">
                <ShowcaseFeed />
            </div>

            {/* 06 - CTA */}
            <FinalCTA />
        </main>
    );
}
