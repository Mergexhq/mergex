import { CASE_STUDIES } from '@/lib/data/case-studies';
import { CaseStudyCard, CaseStudySidebar } from '@/modules/case-studies/components';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies - The MergeX Company',
  description:
    'Selected case studies from The MergeX Company. Real constraints. Real systems. Measurable results.',
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ industry?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeIndustry = resolvedSearchParams?.industry ?? 'All';

  const filtered =
    activeIndustry === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.industry === activeIndustry);

  const featured = filtered.find((cs) => cs.featured) ?? filtered[0];
  const rest = filtered.filter((cs) => cs.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-[#f0eeea]">
      {/* ── Page header ── */}
      <section className="pt-40 pb-10 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Work
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tight leading-tight mb-3">
          Real constraints.
          <br />
          Real systems. Real results.
        </h1>
        <p className="text-foreground-muted text-lg max-w-xl">
          {CASE_STUDIES.length} case{' '}
          {CASE_STUDIES.length !== 1 ? 'studies' : 'study'} - selected engagements
          from The MergeX Company.
        </p>
      </section>

      {/* ── Outer card shell ── */}
      <section className="pr-4 md:pr-8 pb-12 max-w-[1400px] mx-auto">
        <div className="rounded-r-3xl bg-white shadow-sm border border-black/5 border-l-0 overflow-hidden flex min-h-[80vh] items-stretch">

          {/* Mobile filters */}
          <div className="lg:hidden p-4">
            <CaseStudySidebar mode="filter" activeIndustry={activeIndustry} />
          </div>

          {/* Dark sidebar */}
          <CaseStudySidebar mode="filter" activeIndustry={activeIndustry} />

          {/* Right: content pane */}
          <div className="flex-1 min-w-0 p-8 md:p-12 overflow-y-auto">
            {filtered.length === 0 ? (
              <EmptyState
                headline="No case studies found"
                subtext={`There are no case studies in the "${activeIndustry}" industry yet. Check back soon.`}
                ctaLabel="View all case studies"
                ctaHref="/insights/case-studies"
              />
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <div className="mb-12">
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                      Featured
                    </p>
                    <CaseStudyCard caseStudy={featured} variant="featured" />
                  </div>
                )}

                {/* Rest grid */}
                {rest.length > 0 && (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                        All Case Studies
                      </p>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rest.map((cs) => (
                        <CaseStudyCard key={cs.slug} caseStudy={cs} variant="compact" />
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
