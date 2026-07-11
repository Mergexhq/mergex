import type { Metadata } from 'next';
import LaunchesFeed from './LaunchesFeed';

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
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] block mb-6">
          Recent Launches
        </span>
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
    </main>
  );
}
