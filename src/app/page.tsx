import { MarqueeStrip } from '@/components/MarqueeStrip';
import {
    HomeHero,
    FinalCTA
} from '@/modules/home/components';

export default function HomePage() {
    return (
        <main>
            {/* 01 - Hero */}
            <HomeHero />

            {/* 06 - CTA */}
            <FinalCTA />

            {/* Marquee Strip - before footer */}
            <MarqueeStrip />
        </main>
    );
}
