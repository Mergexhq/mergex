import Link from 'next/link';
import Image from 'next/image';
import { INSIGHTS } from '@/lib/data/insights';

export function InsightsPreview() {
    const previewInsights = INSIGHTS.slice(0, 2);

    return (
        <section className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#F5F3EF' }}>
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                        OUR THINKING
                    </p>
                    <h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] tracking-[-0.01em] w-full max-w-none"
                        style={{ 
                            fontFamily: 'Garamond, Georgia, serif', 
                            color: '#1A0D2E' 
                        }}
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
                            className="group relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-black/5 hover:shadow-lg transition-all duration-500 flex flex-col justify-end"
                        >
                            {/* Full Card Cover Image */}
                            {insight.coverImage && (
                                <Image 
                                    src={insight.coverImage} 
                                    alt={insight.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                            
                            {/* Rich Dark Gradient Overlay for Typography Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

                            {/* Text Content Container */}
                            <div className="relative z-20 p-8 md:p-10 flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300 mb-2 block">
                                    {insight.category} · {insight.readTime}
                                </span>
                                
                                <h3 
                                    className="text-xl md:text-2xl font-normal text-white leading-snug mb-3"
                                    style={{ fontFamily: 'Garamond, Georgia, serif' }}
                                >
                                    {insight.title}
                                </h3>
                                
                                <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-2 max-w-xl">
                                    {insight.excerpt}
                                </p>

                                {/* Animated 'Learn more' Button Revealed on Hover */}
                                <div className="opacity-0 max-h-0 translate-y-3 group-hover:opacity-100 group-hover:max-h-12 group-hover:translate-y-0 transition-all duration-300 ease-out overflow-hidden mt-4">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-white/90 text-[#1A0D2E] text-xs font-semibold rounded-md transition-colors shadow-sm">
                                        Learn more
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            stroke="currentColor"
                                            className="stroke-current"
                                        >
                                            <path
                                                d="M1 5h8M5 1l4 4-4 4"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Centered CTA Button */}
                <div className="flex justify-center">
                    <Link
                        href="/insights"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide border border-[#1A0D2E] text-[#1A0D2E] bg-transparent hover:bg-[#1A0D2E] hover:text-[#F5F3EF] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
