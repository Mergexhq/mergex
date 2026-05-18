import type { Metadata } from 'next';
import { AboutHero, NarrativeCore, NonNegotiables, AboutCTA } from '@/modules/about/components';
import './about.css';

export const metadata: Metadata = {
  title: 'About — The MergeX Company',
  description:
    'MergeX is a diagnostic-first scaling company. We find the exact factor stopping your business from growing and build the precise system to fix it.',
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* 01 — Hero */}
      <AboutHero />

      {/* 02 — Narrative Core */}
      <NarrativeCore />

      {/* 03 — Non-Negotiables */}
      <NonNegotiables />

      {/* 04 — Final CTA */}
      <AboutCTA />
    </main>
  );
}
