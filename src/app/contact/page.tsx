import type { Metadata } from 'next';
import {
    ContactHero,
    BookingSection,
    WaysToConnect,
} from '@/modules/contact';
import { getPageBreadcrumbSchema } from '@/knowledge/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with MergeX. We design and build custom software, AI systems, and automation workflows for businesses that want to operate smarter.',
    alternates: {
        canonical: `${siteUrl}/contact`,
    },
    openGraph: {
        title: 'Contact - MergeX',
        description:
            'Get in touch with MergeX. We design and build custom software, AI systems, and automation workflows for businesses that want to operate smarter.',
        url: `${siteUrl}/contact`,
    },
};

/**
 * BreadcrumbList JSON-LD — Home → Contact.
 * Generated server-side via the schema builder; the Contact URL derives from
 * the same siteUrl as the canonical so the breadcrumb never drifts.
 */
const breadcrumbJsonLd = getPageBreadcrumbSchema('Contact', '/contact');

export default function ContactPage() {
    return (
        <>
            {/* BreadcrumbList structured data — injected server-side */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <main className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] font-body">
                <ContactHero />
                <BookingSection />
                <WaysToConnect />
            </main>
        </>
    );
}
