import type { Metadata } from 'next';
import {
    HomeHero,
} from '@/modules/home/components';
import { ShowcaseFeed, ExperimentsGallery } from '@/modules/work';

export const metadata: Metadata = {
  title: 'The MergeX Company',
  description:
    'MergeX identifies and fixes the exact factor stopping business growth. A consulting-first scaling company.',
  keywords: [
    'MergeX',
    'The MergeX Company',
    'Business Scaling',
    'Diagnostic Consulting',
    'Scaling Systems',
    'Business Infrastructure',
    'Operational Clarity',
    'S.C.A.L.E Methodology',
    'Brand Systems',
    'Technology Systems',
    'Sales Systems',
  ],
  authors: [{ name: 'The MergeX Company', url: 'https://mergex.in' }],
  creator: 'The MergeX Company',
  publisher: 'The MergeX Company',
  openGraph: {
    title: 'The MergeX Company',
    description:
      "Most businesses don't fail from lack of effort. They fail because they're solving the wrong problem.",
    url: 'https://mergex.in',
    siteName: 'The MergeX Company',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'The MergeX Company | Diagnosis before everything.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The MergeX Company',
    description:
      "Most businesses don't fail from lack of effort. They fail because they're solving the wrong problem.",
    images: ['/og-cover.jpg'],
  },
};

export default function HomePage() {
    return (
        <main className="relative bg-[#080808]">
            <HomeHero />

            {/* Showcase/Works Feed */}
            <ShowcaseFeed />

            {/* Labs Portfolio Gallery */}
            <ExperimentsGallery />
        </main>
    );
}

