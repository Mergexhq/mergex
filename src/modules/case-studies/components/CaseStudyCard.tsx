'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CaseStudy } from '@/lib/types/content';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  variant?: 'featured' | 'compact';
}

export function CaseStudyCard({ caseStudy, variant = 'compact' }: CaseStudyCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-2xl border border-border bg-background overflow-hidden"
      >
        <Link href={`/insights/case-studies/${caseStudy.slug}`} className="block p-8 md:p-12">
          {/* Top meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {caseStudy.industry}
            </span>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs text-foreground-muted">{caseStudy.client}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
            {caseStudy.title}
          </h2>

          {/* Excerpt */}
          <p className="text-foreground-muted text-base leading-relaxed max-w-2xl mb-8">
            {caseStudy.excerpt}
          </p>

          {/* Metrics */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-8">
              {caseStudy.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground font-serif">{m.value}</span>
                  <span className="text-xs text-foreground-muted mt-0.5">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-background-subtle text-foreground-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-primary flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
              View Case Study
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  // compact variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/insights/case-studies/${caseStudy.slug}`} className="flex flex-col flex-1 p-6">
        {/* Industry */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {caseStudy.industry}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
          {caseStudy.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-3 flex-1">
          {caseStudy.excerpt}
        </p>

        {/* Metrics preview */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-border">
            {caseStudy.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-base font-bold text-foreground font-serif">{m.value}</span>
                <span className="text-[10px] text-foreground-muted leading-tight">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex items-center justify-end mt-4 pt-4 border-t border-border">
          <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            View case study
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
