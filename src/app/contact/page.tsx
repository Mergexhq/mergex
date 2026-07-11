import type { Metadata } from 'next';
import {
    ContactHero,
    BookingSection,
    WaysToConnect,
} from '@/modules/contact';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with MergeX. We specialize in software development, AI solutions, and AI creative production.',
    alternates: {
        canonical: 'https://mergex.in/contact',
    },
    openGraph: {
        title: 'Contact - MergeX',
        description:
            'Get in touch with MergeX. We specialize in software development, AI solutions, and AI creative production.',
    },
};

export default function ContactPage() {
    return (
        <main className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] font-body">
            <ContactHero />
            <BookingSection />
            <WaysToConnect />
        </main>
    );
}
