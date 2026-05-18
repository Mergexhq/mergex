import Link from 'next/link';
import { INSIGHTS } from '@/lib/data/insights';

export function InsightsPreview() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                            Insights
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            Perspectives on systems
                            <br />
                            and scale.
                        </h2>
                    </div>
                    <Link
                        href="/insights"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
                    >
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {INSIGHTS.slice(0, 2).map((insight) => (
                        <Link
                            key={insight.slug}
                            href={`/insights/${insight.slug}`}
                            className="group p-6 rounded-2xl border border-border bg-background hover:shadow-lg transition-shadow flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">
                                    {insight.category} · {insight.readTime}
                                </span>
                                <h3 className="text-lg font-serif font-medium text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                                    {insight.title}
                                </h3>
                                <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-4">
                                    {insight.excerpt}
                                </p>
                            </div>
                            <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
                                Read more
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 md:hidden">
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
                    >
                        View all insights
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
