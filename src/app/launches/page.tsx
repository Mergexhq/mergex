import type { Metadata } from 'next';
import LaunchesFeed from './LaunchesFeed';
import InteractiveExperiences from './InteractiveExperiences';
import ClientVoices from './ClientVoices';
import LaunchesCTA from './LaunchesCTA';

export const metadata: Metadata = {
  title: 'Launches',
  description:
    'Real-world system launches, platforms, and AI integrations built and deployed by MergeX.',
  alternates: {
    canonical: 'https://mergex.in/launches',
  },
};

export default function LaunchesPage() {
  return (
    <main className="min-h-screen bg-white text-[var(--text-primary)] font-body">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-16">
        <h1 className="text-4xl md:text-6xl font-questrial font-bold tracking-tight max-w-2xl leading-[1.1] mb-6">
          Real work, launched in production.
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-xl leading-relaxed">
          We construct and deploy robust digital platforms, custom AI systems, and visual productions. Here is a curated selection of our work in active use.
        </p>
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
  );
}
