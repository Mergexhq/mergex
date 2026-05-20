import { notFound } from 'next/navigation';
import { INSIGHTS, getInsightBySlug, getRelatedInsights } from '@/lib/data/insights';
import { InsightSidebar, InsightCard } from '@/modules/insights/components';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from 'next';

/* ─── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return {
    title: `${insight.title} — Insights — The MergeX Company`,
    description: insight.excerpt,
  };
}

const TOC_SECTIONS = [
  { id: 'overview', label: 'AI Overview' },
  { id: 'content', label: 'Full Article' },
  { id: 'related', label: 'Related Insights' },
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) notFound();

  const related = getRelatedInsights(slug, insight.category);

  const bodyParagraphs = insight.body
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f0eeea]">
      {/* ── Page header (outside card) ── */}
      <section className="pt-40 pb-10 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {insight.category}
          </span>
          <span className="text-xs text-foreground-muted">·</span>
          <span className="text-xs text-foreground-muted">{insight.readTime}</span>
          <span className="text-xs text-foreground-muted">·</span>
          <span className="text-xs text-foreground-muted">
            {new Date(insight.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight leading-tight mb-5 max-w-4xl">
          {insight.title}
        </h1>
        <p className="text-foreground-muted text-lg leading-relaxed max-w-2xl mb-5">
          {insight.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {insight.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-black/8 text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Outer card shell ── */}
      <section className="pr-4 md:pr-8 pb-12 max-w-[1400px] mx-auto">
        <div className="rounded-r-3xl bg-white shadow-sm border border-black/5 border-l-0 overflow-hidden flex min-h-[80vh] items-stretch">

          {/* Dark TOC sidebar */}
          <InsightSidebar mode="toc" sections={TOC_SECTIONS} />

          {/* Right: content pane */}
          <div className="flex-1 min-w-0 p-8 md:p-14 overflow-y-auto max-w-3xl">

            {/* AI Overview */}
            <div
              id="overview"
              className="rounded-2xl bg-primary/8 border border-primary/20 p-6 md:p-8 mb-12"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  AI Overview
                </span>
              </div>
              <p className="text-foreground text-[15px] leading-relaxed">
                {insight.aiOverview}
              </p>
            </div>

            {/* Article Body */}
            <div id="content" className="prose-custom space-y-6">
              {bodyParagraphs.map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-2xl font-serif text-foreground mt-10 mb-4 tracking-tight">
                      {block.replace('## ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-foreground mt-8 mb-3">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('---')) {
                  return <hr key={i} className="border-border my-8" />;
                }
                if (block.startsWith('**') && block.endsWith('**')) {
                  return (
                    <p key={i} className="text-foreground font-semibold text-base leading-relaxed">
                      {block.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (block.startsWith('> ')) {
                  return (
                    <blockquote key={i} className="border-l-4 border-primary pl-5 py-1 text-foreground-muted italic text-base">
                      {block.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (/^\d+\.\s/.test(block)) {
                  const lines = block.split('\n').filter(Boolean);
                  return (
                    <ol key={i} className="list-decimal list-inside space-y-2 text-foreground-muted text-base">
                      {lines.map((line, li) => (
                        <li key={li}>{line.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.startsWith('- ')) {
                  const lines = block.split('\n').filter(Boolean);
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 text-foreground-muted text-base">
                      {lines.map((line, li) => (
                        <li key={li}>{line.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                const hasBold = /\*\*(.+?)\*\*/.test(block);
                if (hasBold) {
                  const parts = block.split(/\*\*(.+?)\*\*/);
                  return (
                    <p key={i} className="text-foreground-muted text-base leading-relaxed">
                      {parts.map((part, pi) =>
                        pi % 2 === 1 ? (
                          <strong key={pi} className="text-foreground font-semibold">{part}</strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-foreground-muted text-base leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>

            {/* Related Insights */}
            <div id="related" className="mt-20 pt-12 border-t border-border">
              <div className="flex items-center gap-4 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Related Insights
                </p>
                <div className="h-px flex-1 bg-border" />
              </div>
              {related.length === 0 ? (
                <EmptyState
                  headline="More coming soon"
                  subtext="We are working on more insights in this category."
                  ctaLabel="View all insights"
                  ctaHref="/insights"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <InsightCard key={r.slug} insight={r} variant="compact" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
