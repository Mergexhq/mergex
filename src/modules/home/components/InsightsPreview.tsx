import Link from 'next/link';
import Image from 'next/image';
import { INSIGHTS } from '@/lib/data/insights';

export function InsightsPreview() {
    const previewInsights = INSIGHTS.slice(0, 2);

    return (
        <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-background">
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        OUR THINKING
                    </p>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] tracking-[-0.01em] w-full max-w-none text-foreground font-serif"
                    >
                        The latest perspectives from MergeX.
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {previewInsights.map((insight) => (
                        <Link
                            key={insight.slug}
                            href={`/insights/${insight.slug}`}
                            className="group flex flex-col gap-5 w-full transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px] border border-border/50 transition-all duration-500">
                                {insight.coverImage && (
                                    <Image
                                        src={insight.coverImage}
                                        alt={insight.title}
                                        fill
                                        className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                                    />
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-2.5 block">
                                    {insight.category} · {insight.readTime}
                                </span>

                                <h3
                                    className="text-xl md:text-2xl font-normal leading-snug mb-3 group-hover:text-primary transition-colors duration-300 text-foreground font-serif"
                                >
                                    {insight.title}
                                </h3>

                                <p className="text-xs md:text-sm text-foreground-muted leading-relaxed line-clamp-2 max-w-xl mb-4">
                                    {insight.excerpt}
                                </p>

                                {/* Read article link */}
                                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-opacity duration-300">
                                    <span>Read article</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        stroke="currentColor"
                                        className="transform group-hover:translate-x-1 transition-transform duration-300"
                                    >
                                        <path
                                            d="M2 6h8M6 2l4 4-4 4"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Centered CTA Button */}
                <div className="flex justify-center">
                    <Link
                        href="/insights"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>See all insights</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            className="stroke-current transform group-hover:translate-x-0.5 transition-transform"
                        >
                            <path
                                d="M2 7h10M8 3l4 4-4 4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
