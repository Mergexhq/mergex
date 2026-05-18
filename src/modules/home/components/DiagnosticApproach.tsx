export function DiagnosticApproach() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm font-medium tracking-[0.3em] uppercase text-foreground-muted mb-6">
                    The Diagnostic Approach
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
                    Diagnose before you build.
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed max-w-3xl mx-auto mb-16">
                    We use the S.C.A.L.E Formula™ to pinpoint exactly where your business is stuck. Then, we prescribe specific outputs across Technology, Branding, Marketing, and Sales.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 text-left">
                    {[
                        { letter: 'S', title: 'Scan', desc: 'Deep diagnostic of current operations.' },
                        { letter: 'C', title: 'Clarify', desc: 'Define the real constraints.' },
                        { letter: 'A', title: 'Architect', desc: 'Design the system blueprint.' },
                        { letter: 'L', title: 'Launch', desc: 'Execute with precision.' },
                        { letter: 'E', title: 'Evolve', desc: 'Iterate and compound growth.' },
                    ].map((step) => (
                        <div key={step.letter} className="flex flex-col items-center sm:items-start">
                            <span className="text-4xl font-bold text-primary mb-2">{step.letter}</span>
                            <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                            <p className="text-foreground-muted text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-16">
                    <a
                        href="/methodology"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                    >
                        Learn how it works
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
