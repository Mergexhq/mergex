'use client';

import { ArrowRight } from 'lucide-react';

interface BookingSectionProps {
    calUrl?: string;
}

export function BookingSection({ calUrl = "https://cal.com/mergex/30min" }: BookingSectionProps) {
    return (
        <section id="booking-section" className="bg-[var(--bg-primary)] pt-0 pb-16 relative overflow-hidden z-20">
            <div className="container mx-auto max-w-[1400px] px-6 md:px-8">
                
                {/* 2.1:1 Aspect Ratio Card (slightly reduced height) with wider dimensions */}
                <div 
                    className="relative w-full rounded-[16px] overflow-hidden aspect-[4/3.2] md:aspect-[2.1/1] bg-[var(--bg-secondary)] border border-black/5 dark:border-white/5 flex flex-col justify-between p-8 md:p-12 lg:p-16 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    {/* Background Image Layer covering the full card */}
                    <div 
                        className="absolute inset-0 z-0 bg-no-repeat bg-bottom"
                        style={{
                            backgroundImage: "url('/background/schedule.png')",
                            backgroundSize: 'cover',
                        }}
                    />

                    {/* Content Container (aligned to the right side) */}
                    <div className="relative z-10 ml-auto w-full md:w-[50%] lg:w-[45%] h-full flex flex-col justify-between items-start">
                        
                        {/* Top: Simple 2-line Text with increased font sizes */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-questrial font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                                Prefer a conversation?
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                                Book a discovery call and let's discuss your project.
                            </p>
                        </div>

                        {/* Bottom: Big Outline Button aligned to the right of the column */}
                        <div className="w-full flex justify-end pb-2">
                            <a
                                href={calUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full border border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] px-8 py-4 text-sm md:text-base font-semibold tracking-wide active:scale-[0.98] transition-all cursor-pointer font-questrial"
                            >
                                Book a Discovery Call
                                <ArrowRight size={16} />
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
