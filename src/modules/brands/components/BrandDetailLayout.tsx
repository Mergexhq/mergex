import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Brand } from '../data/brands';

const STATUS_STYLES = {
  Active: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'In Development': { dot: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50' },
  'Research Phase': { dot: 'bg-sky-400', text: 'text-sky-700', bg: 'bg-sky-50' },
} as const;

interface BrandDetailLayoutProps {
  brand: Brand;
  /** What this brand does - 2-3 paragraphs */
  whatItDoes: ReactNode;
  /** Any brand-specific section (methodology, services, etc.) */
  specialSection?: ReactNode;
}

export function BrandDetailLayout({
  brand,
  whatItDoes,
  specialSection,
}: BrandDetailLayoutProps) {
  const status = STATUS_STYLES[brand.status];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-border">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/brands"
            className="text-xs font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            Brands
          </Link>
          <span className="text-xs text-foreground-muted opacity-40">→</span>
          <span className="text-xs font-medium text-foreground">{brand.name}</span>
        </div>
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {brand.layer}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-none mb-6 max-w-2xl">
          {brand.name}
        </h1>
        <p className="text-xl text-foreground-muted max-w-xl leading-relaxed mb-10">
          {brand.tagline}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-foreground text-background rounded-none text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Get in Touch
          </Link>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-semibold ${status.bg} ${status.text}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {brand.status}
          </div>
        </div>
      </section>

      {/* What it does + Ecosystem Role */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-6">
              What {brand.name} Does
            </p>
            <div className="space-y-4 text-[15px] leading-relaxed">{whatItDoes}</div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-6">
              Ecosystem Role
            </p>
            <p className="text-foreground text-sm leading-relaxed mb-8">
              {brand.role}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
              Focus Areas
            </p>
            <div className="flex flex-wrap gap-2">
              {brand.focusAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs px-3 py-1.5 rounded-none border border-border text-foreground-muted font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand-specific section */}
      {specialSection && (
        <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-b border-border">
          {specialSection}
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-foreground p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
              Next Step
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-sm">
              Ready to explore {brand.name}?
            </h3>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-8 py-4 bg-white text-foreground rounded-none text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Start a Conversation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
