import { INSIGHTS } from '@/lib/data/insights';
import { InsightCard, InsightSidebar } from '@/modules/insights/components';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights — The MergeX Company',
  description:
    'Perspectives on systems, scaling, and execution from The MergeX Company.',
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category ?? 'All';

  const filtered =
    activeCategory === 'All'
      ? INSIGHTS
      : INSIGHTS.filter((i) => i.category === activeCategory);

  const featured = filtered.find((i) => i.featured) ?? filtered[0];
  const rest = filtered.filter((i) => i.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-[#f0eeea]">
      {/* ── Page header ── */}
      <section className="pt-40 pb-10 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Insights
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight leading-tight mb-3">
          Perspectives on systems,
          <br />
          scaling, and execution.
        </h1>
        <p className="text-foreground-muted text-lg max-w-xl">
          {INSIGHTS.length} article{INSIGHTS.length !== 1 ? 's' : ''} — ideas that
          compound.
        </p>
      </section>

      {/* ── Outer card shell ── */}
      <section className="pr-4 md:pr-8 pb-12 max-w-[1400px] mx-auto">
        <div className="rounded-r-3xl bg-white shadow-sm border border-black/5 border-l-0 overflow-hidden flex min-h-[80vh] items-stretch">

          {/* Mobile filters — outside the card */}
          <div className="lg:hidden p-4">
            <InsightSidebar mode="filter" activeCategory={activeCategory} />
          </div>

          {/* Dark sidebar */}
          <InsightSidebar mode="filter" activeCategory={activeCategory} />

          {/* Right: content pane */}
          <div className="flex-1 min-w-0 p-8 md:p-12 overflow-y-auto">
            {filtered.length === 0 ? (
              <EmptyState
                headline="No insights found"
                subtext={`There are no insights in the "${activeCategory}" category yet. Check back soon.`}
                ctaLabel="View all insights"
                ctaHref="/insights"
              />
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <div className="mb-12">
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                      Featured
                    </p>
                    <InsightCard insight={featured} variant="featured" />
                  </div>
                )}

                {/* Rest grid */}
                {rest.length > 0 && (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                        All Insights
                      </p>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rest.map((insight) => (
                        <InsightCard
                          key={insight.slug}
                          insight={insight}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
