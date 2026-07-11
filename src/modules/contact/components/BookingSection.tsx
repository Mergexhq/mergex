'use client';

import { ArrowRight } from 'lucide-react';

interface BookingSectionProps {
    calUrl?: string;
}

export function BookingSection({ calUrl = "https://cal.com/mergex/30min" }: BookingSectionProps) {
    return (
        <section id="booking-section" className="bg-[var(--bg-primary)] pt-0 pb-16 relative overflow-hidden z-20">
            <div className="container mx-auto max-w-[1400px] px-6 md:px-8">
                
                {/* Taller Aspect Ratio Card on Mobile, 2.1:1 on Desktop */}
                <div 
                    className="relative w-full rounded-[16px] overflow-hidden aspect-[3/4] md:aspect-[2.1/1] bg-[var(--bg-secondary)] border border-black/5 dark:border-white/5 flex flex-col justify-between p-8 md:p-12 lg:p-16 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    {/* Mobile Background Image Layer (visible on mobile, hidden on md+) */}
                    <div 
                        className="absolute inset-0 z-0 bg-no-repeat bg-bottom md:hidden"
                        style={{
                            backgroundImage: "url('/background/schedule mobile.png')",
                            backgroundSize: 'cover',
                        }}
                    />
                    
                    {/* Desktop Background Image Layer (hidden on mobile, visible on md+) */}
                    <div 
                        className="absolute inset-0 z-0 bg-no-repeat bg-bottom hidden md:block"
                        style={{
                            backgroundImage: "url('/background/schedule.png')",
                            backgroundSize: 'cover',
                        }}
                    />

                    {/* Content Container (aligned to the right side, stacked top on mobile) */}
                    <div className="relative z-10 ml-auto w-full md:w-[50%] lg:w-[45%] h-full flex flex-col justify-start md:justify-between items-start gap-8 md:gap-0">
                        
                        {/* Top: Simple 2-line Text with increased font sizes */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-questrial font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                                Prefer a conversation?
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                                Book a discovery call and let's discuss your project.
                            </p>
                        </div>

                        {/* Bottom: Smaller button on mobile, left-aligned on mobile, right-aligned on desktop */}
                        <div className="w-full flex justify-start md:justify-end md:pb-2">
                            <a
                                href={calUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full border border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] px-6 py-3 text-xs md:px-8 md:py-4 md:text-base font-semibold tracking-wide active:scale-[0.98] transition-all cursor-pointer font-questrial"
                            >
                                Book a Discovery Call
                                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
