import type { Metadata } from 'next';
import LaunchesFeed from './LaunchesFeed';
import InteractiveExperiences from './InteractiveExperiences';
import ClientVoices from './ClientVoices';
import LaunchesCTA from './LaunchesCTA';
import { getPageBreadcrumbSchema } from '@/knowledge/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export const metadata: Metadata = {
  title: 'Launches',
  description:
    'Real-world system launches, platforms, and AI integrations built and deployed by MergeX.',
  alternates: {
    canonical: `${siteUrl}/launches`,
  },
  openGraph: {
    title: 'Launches - MergeX',
    description:
      'Real-world system launches, platforms, and AI integrations built and deployed by MergeX.',
    url: `${siteUrl}/launches`,
  },
};

/**
 * BreadcrumbList JSON-LD - Home → Launches.
 * Generated server-side via the schema builder; the Launches URL derives from
 * the same siteUrl as the canonical so the breadcrumb never drifts.
 */
const breadcrumbJsonLd = getPageBreadcrumbSchema('Launches', '/launches');

export default function LaunchesPage() {
  return (
    <>
      {/* BreadcrumbList structured data - injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white text-[var(--text-primary)] font-body">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-16 flex flex-col items-center overflow-x-hidden">
          {/* Top Copy */}
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-20">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-clash font-bold tracking-tight text-center uppercase mb-2 text-[var(--text-primary)]">
              Built <span className="lowercase text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)]">to</span> launch.
            </h1>
          </div>

          {/* Hero Image */}
          <div className="w-full mt-[-12px] md:mt-[-28px] mb-4 md:mb-6 flex justify-center relative z-0">

            {/* White fade overlay between bg/glow and image */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none -z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />

            {/* Top white fade smudge overlay on top of the image */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white via-white/30 to-transparent pointer-events-none z-20" />

            <img
              src="/background/launches/launch-hero.webp"
              alt="Built to launch hero"
              className="w-full h-auto relative z-10"
            />

            {/* Bottom white fade smudge overlay on top of the image */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none z-20" />
          </div>

          {/* Bottom Copy (Title and Description) */}
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-8">
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl text-[var(--text-primary)] font-semibold font-questrial leading-snug">
                <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mr-2 font-mono">Explore</span>
                the products, brands, and digital experiences
              </h2>
              <p className="text-base text-[var(--text-secondary)] font-light mt-3 max-w-xl mx-auto leading-relaxed">
                we&apos;ve brought to life across different industries.
              </p>
            </div>
          </div>
        </section>

        {/* Launches Feed */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
          <LaunchesFeed />
        </section>

        {/* Interactive Experiences (Voice/Chat Demos) */}
        <InteractiveExperiences />

        {/* Client Testimonial Infinite Scroll */}
        <ClientVoices />

        {/* Final Call to Action */}
        <LaunchesCTA />
      </main>
    </>
  );
}
