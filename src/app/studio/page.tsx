import type { Metadata } from 'next';
import StudioClient from './StudioClient';
import { getPageBreadcrumbSchema } from '@/knowledge/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'AI Creative Production by MergeX. AI Commercials, Brand Films, AI Photography, Motion Graphics, and Creative Experiments.',
  alternates: {
    canonical: `${siteUrl}/studio`,
  },
  openGraph: {
    title: 'Studio - MergeX',
    description:
      'AI Creative Production by MergeX. AI Commercials, Brand Films, AI Photography, Motion Graphics, and Creative Experiments.',
    url: `${siteUrl}/studio`,
  },
};

/**
 * BreadcrumbList JSON-LD — Home → Studio.
 * Generated server-side via the schema builder; the Studio URL derives from
 * the same siteUrl as the canonical so the breadcrumb never drifts.
 */
const breadcrumbJsonLd = getPageBreadcrumbSchema('Studio', '/studio');

export default function StudioPage() {
  return (
    <>
      {/* BreadcrumbList structured data — injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <StudioClient />
    </>
  );
}
