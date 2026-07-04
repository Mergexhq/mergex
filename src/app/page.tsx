import {
    HomeHero,
    FinalCTA,
    LogoScrollTransition
} from '@/modules/home/components';
import { ShowcaseFeed } from '@/modules/new-home/components/ShowcaseFeed';

export default function HomePage() {
    return (
        <main className="relative bg-[var(--bg-primary)]">
            <LogoScrollTransition 
                logoSrc="/logo/logo.png" 
                heroContent={<HomeHero />}
            >
                <ShowcaseFeed />
            </LogoScrollTransition>

            {/* 06 - CTA */}
            <FinalCTA />
        </main>
    );
}
