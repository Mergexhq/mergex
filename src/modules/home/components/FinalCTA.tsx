import Link from 'next/link';

export function FinalCTA() {
    return (
        <section className="pt-10 pb-20 md:pt-16 md:pb-28 px-6 bg-background relative">
            <div className="max-w-7xl mx-auto border-t border-border/80 pt-10 md:pt-16">
                <div className="flex flex-col items-center justify-center text-center gap-8 md:gap-10">
                    
                    {/* Centered Editorial Header */}
                    <div className="max-w-3xl flex flex-col items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4 block">
                            GET STARTED
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-foreground mb-4" style={{ letterSpacing: '0.02em' }}>
                            Ready to scale with more clarity?
                        </h2>
                        <p className="text-base text-foreground-muted max-w-xl mx-auto">
                            Every engagement begins with understanding the business before proposing a solution.
                        </p>
                    </div>

                    {/* Centered Action Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 shrink-0">
                        <Link
                            href="/contact/diagnostic"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-foreground text-background font-semibold text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-out group shadow-sm"
                        >
                            <span>Diagnose the Business</span>
                            <svg 
                                className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth={2.5} 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.25 12l-6.75 6.75" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
