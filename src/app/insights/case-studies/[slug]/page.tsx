import { notFound } from 'next/navigation';
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from '@/lib/data/case-studies';
import { CaseStudySidebar, CaseStudyCard } from '@/modules/case-studies/components';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from 'next';

/* ─── Static params ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Studies — The MergeX Company`,
    description: cs.excerpt,
  };
}

const TOC_SECTIONS = [
  { id: 'overview', label: 'AI Overview' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'diagnosis', label: 'The Diagnosis' },
  { id: 'strategy', label: 'The Strategy' },
  { id: 'outcome', label: 'The Outcome' },
  { id: 'related', label: 'Related Work' },
];

/* ─── Block renderer ─────────────────────────────────────────────── */
function renderBlock(block: string, i: number) {
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
            <strong key={pi} className="text-foreground font-semibold">
              {part}
            </strong>
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
}

function Section({
  id,
  label,
  content,
}: {
  id: string;
  label: string;
  content: string;
}) {
  const blocks = content
    .split('\n\n')
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <section id={id} className="mb-14">
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
        {label}
      </p>
      <div className="space-y-4">{blocks.map(renderBlock)}</div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  const related = getRelatedCaseStudies(slug, cs.industry);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {cs.industry}
            </span>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs text-foreground-muted">{cs.client}</span>
            <span className="text-xs text-foreground-muted">·</span>
            <span className="text-xs text-foreground-muted">
              {new Date(cs.publishedAt).toLocaleDateString('en-GB', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight leading-tight mb-6">
            {cs.title}
          </h1>
          <p className="text-foreground-muted text-lg leading-relaxed mb-8">
            {cs.excerpt}
          </p>

          {/* Metrics */}
          {cs.metrics && cs.metrics.length > 0 && (
            <div className="flex flex-wrap gap-10 mt-8 pt-8 border-t border-border">
              {cs.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-3xl font-bold font-serif text-foreground">
                    {m.value}
                  </span>
                  <span className="text-xs text-foreground-muted mt-1">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex gap-16">
          {/* Sidebar */}
          <CaseStudySidebar mode="toc" sections={TOC_SECTIONS} />

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* AI Overview */}
            <div
              id="overview"
              className="rounded-2xl bg-primary/8 border border-primary/20 p-6 md:p-8 mb-14"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  AI Overview
                </span>
              </div>
              <p className="text-foreground text-[15px] leading-relaxed">
                {cs.aiOverview}
              </p>
            </div>

            {/* Sections */}
            <Section id="challenge" label="The Challenge" content={cs.challenge} />
            <Section id="diagnosis" label="The Diagnosis" content={cs.diagnosis} />
            <Section id="strategy" label="The Strategy" content={cs.strategy} />
            <Section id="outcome" label="The Outcome" content={cs.outcome} />

            {/* Client note */}
            {cs.clientNote && (
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-12">
                <p className="text-foreground-muted italic text-base leading-relaxed mb-3">
                  &ldquo;{cs.clientNote}&rdquo;
                </p>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  — Client, {cs.industry}
                </span>
              </blockquote>
            )}

            {/* Related */}
            <div id="related" className="mt-20 pt-12 border-t border-border">
              <div className="flex items-center gap-4 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Related Work
                </p>
                <div className="h-px flex-1 bg-border" />
              </div>
              {related.length === 0 ? (
                <EmptyState
                  headline="More case studies coming soon"
                  subtext="We are adding more work to this section. Check back soon."
                  ctaLabel="View all case studies"
                  ctaHref="/insights/case-studies"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <CaseStudyCard key={r.slug} caseStudy={r} variant="compact" />
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
