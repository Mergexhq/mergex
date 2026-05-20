import Link from 'next/link';
import Image from 'next/image';
import { INSIGHTS } from '@/lib/data/insights';

export function InsightsPreview() {
    const featuredInsight = INSIGHTS.find((i) => i.featured) || INSIGHTS[0];
    const supportingInsights = INSIGHTS.filter((i) => !i.featured).slice(0, 2);

    return (
        <section className="py-32 md:py-44 px-6 relative overflow-hidden" style={{ backgroundColor: '#F5F3EF' }}>
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                            Insights
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-foreground">
                            Perspectives on systems,<br />
                            structure and scale.
                        </h2>
                    </div>
                    <Link
                        href="/insights"
                        className="hidden md:inline-block text-sm font-medium text-foreground-muted hover:text-primary transition-colors pb-2"
                    >
                        Explore Insights
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured Insight */}
                    <Link
                        href={`/insights/${featuredInsight.slug}`}
                        className="group lg:col-span-7 flex flex-col rounded-[32px] border border-black/5 hover:border-black/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                        style={{ backgroundColor: '#F5F3EF' }}
                    >
                        {/* Purple accent line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20"></div>
                        
                        <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-[32px]">
                            {featuredInsight.coverImage && (
                                <Image 
                                    src={featuredInsight.coverImage} 
                                    alt={featuredInsight.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                            )}
                            {/* Optional Cursor-Reactive Image Light / Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                        </div>
                        
                        <div className="p-8 md:p-10 flex flex-col grow justify-between">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-primary/70 group-hover:text-primary transition-colors duration-500 block mb-4">
                                    {featuredInsight.category} · {featuredInsight.readTime}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground leading-tight mb-4 transition-transform duration-500 group-hover:translate-y-[-2px]">
                                    {featuredInsight.title}
                                </h3>
                                <p className="text-base text-foreground-muted leading-relaxed line-clamp-2 md:line-clamp-3 mb-8">
                                    {featuredInsight.slug === 'diagnose-before-you-build' 
                                        ? "Most scaling failures begin long before execution." 
                                        : featuredInsight.excerpt}
                                </p>
                            </div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                Explore Insight
                            </span>
                        </div>
                    </Link>

                    {/* Supporting Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {supportingInsights.map((insight) => (
                            <Link
                                key={insight.slug}
                                href={`/insights/${insight.slug}`}
                                className="group flex flex-col rounded-[28px] border border-black/5 hover:border-black/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden flex-1"
                                style={{ backgroundColor: '#F5F3EF' }}
                            >
                                {/* Purple accent line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20"></div>

                                <div className="relative aspect-16/10 sm:aspect-2/1 lg:aspect-video w-full overflow-hidden rounded-t-[28px]">
                                    {insight.coverImage && (
                                        <Image 
                                            src={insight.coverImage} 
                                            alt={insight.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                        />
                                    )}
                                </div>
                                
                                <div className="p-6 md:p-8 flex flex-col grow justify-between">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary/70 group-hover:text-primary transition-colors duration-500 block mb-3">
                                            {insight.category} · {insight.readTime}
                                        </span>
                                        <h3 className="text-xl font-serif font-medium text-foreground leading-snug mb-3 transition-transform duration-500 group-hover:translate-y-[-2px]">
                                            {insight.title}
                                        </h3>
                                        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-6">
                                            {insight.excerpt}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-auto">
                                        Explore Insight
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-12 md:hidden">
                    <Link
                        href="/insights"
                        className="inline-block text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
                    >
                        Explore Insights
                    </Link>
                </div>
            </div>
        </section>
    );
}
