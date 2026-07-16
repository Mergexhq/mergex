import type { Metadata } from 'next';
import {
    HomeHero,
} from '@/modules/home/components';
import { ShowcaseFeed } from '@/modules/work';
import { FAQ_ITEMS } from '@/knowledge/faq';
import { SERVICES } from '@/knowledge/services';
import { getFAQSchema, getServiceSchema } from '@/knowledge/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export const metadata: Metadata = {
  title: 'MergeX — Custom Software & AI Systems',
  description:
    'MergeX is a software and AI engineering company. We design and build custom software, AI systems, automation workflows, and digital products that help businesses operate smarter and move faster.',
  keywords: [
    'MergeX',
    'Custom Software Development',
    'AI Systems',
    'AI Software Development',
    'AI Automation',
    'AI Integration',
    'AI Agents',
    'Generative AI',
    'AI Voice Receptionist',
    'AI Chat Assistant',
    'Workflow Automation',
    'Business Automation',
    'Business Software',
    'Enterprise Software',
    'SaaS Development',
    'Web Application Development',
    'Digital Product Engineering',
    'Product Development',
    'AI Creative Production',
    'Technology Partner',
    'Software Development Company India',
    'Software Development Company Chennai',
    'AI Company India',
  ],
  authors: [{ name: 'MergeX', url: siteUrl }],
  creator: 'MergeX',
  publisher: 'MergeX',
  openGraph: {
    title: 'MergeX — Custom Software & AI Systems',
    description:
      'MergeX designs and builds custom software, AI systems, and automation workflows. Precise engineering for businesses that want to operate smarter and solve real problems.',
    url: siteUrl,
    siteName: 'MergeX',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'MergeX — Custom Software & AI Systems.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MergeX — Custom Software & AI Systems',
    description:
      'MergeX designs and builds custom software, AI systems, and automation workflows. Precise engineering for businesses that want to operate smarter and solve real problems.',
    images: ['/og-cover.jpg'],
  },
};

/**
 * FAQPage JSON-LD structured data.
 * Generated server-side from the same FAQ_ITEMS used by the FAQ UI component.
 * Editing src/knowledge/faq.ts updates both the UI and the structured data automatically.
 */
const faqJsonLd = getFAQSchema(FAQ_ITEMS);

/**
 * Service JSON-LD structured data.
 * One schema per entry in SERVICES, derived from src/knowledge/services.ts.
 * Each Service links back to the Organization via a stable @id provider
 * reference, so editing services.ts updates the schema, the AI assistant
 * knowledge, and (future) the /services pages together.
 */
const serviceJsonLd = SERVICES.map((service) => getServiceSchema(service));

export default function HomePage() {
    return (
        <>
            {/* FAQPage structured data — injected into <head> server-side */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Service structured data — one block per MergeX capability.
                Each references the Organization by @id, forming a single
                entity graph alongside the Organization + WebSite schemas
                emitted in the root layout. */}
            {serviceJsonLd.map((schema) => (
                <script
                    key={schema['@id']}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <main className="relative bg-[#080808]">
                <HomeHero />

                {/* Showcase/Works Feed */}
                <ShowcaseFeed />
            </main>
        </>
    );
}


