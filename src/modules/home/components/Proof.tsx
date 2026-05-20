const TRANSFORMATIONS = [
    {
        id: 'wrong-icp',
        featured: true,
        category: 'Brand · Commerce',
        perceived: '"We need a new website."',
        perceivedSub: 'The team believed a redesign would fix conversion.',
        constraint: 'Brand positioning was systematically attracting the wrong ICP — every sale required discounting to close.',
        intervention: 'Repositioned brand identity across all channels. Rebuilt commerce architecture on a headless stack, aligned to the correct customer segment.',
        metric: '+120%',
        metricLabel: 'Average Order Value',
        secondaryMetric: '3 months',
        secondaryLabel: 'To full deployment',
    },
    {
        id: 'slow-cycle',
        featured: false,
        category: 'Sales · Operations',
        perceived: '"We need more leads."',
        perceivedSub: 'Leadership assumed the pipeline was the constraint.',
        constraint: 'Sales cycle was 4× longer than industry norm due to manual qualification creating false urgency at the wrong stage.',
        intervention: 'Designed and deployed an automated qualification engine. Restructured CRM workflow to surface high-intent leads at the correct velocity.',
        metric: '60 → 14',
        metricLabel: 'Days to Close',
        secondaryMetric: '78%',
        secondaryLabel: 'Pipeline efficiency gain',
    },
    {
        id: 'retention',
        featured: false,
        category: 'Delivery · Systems',
        perceived: '"We need to hire faster."',
        perceivedSub: 'The answer seemed obvious: grow the team.',
        constraint: 'Delivery system lacked documented SOP structure. Each client engagement started from zero, creating unsustainable team load.',
        intervention: 'Mapped and systematised delivery playbooks across all service lines. Reduced onboarding time and increased per-head delivery capacity.',
        metric: '+40%',
        metricLabel: 'Delivery Capacity',
        secondaryMetric: '0',
        secondaryLabel: 'New hires required',
    },
];

export function Proof() {
    const featured = TRANSFORMATIONS.find((t) => t.featured)!;
    const supporting = TRANSFORMATIONS.filter((t) => !t.featured);

    return (
        <section className="py-32 md:py-44 px-6 bg-background relative overflow-hidden">
            {/* Subtle background texture */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 40%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                            Selected Transformations
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-foreground">
                            Most businesses misdiagnose<br />
                            the problem before they scale.
                        </h2>
                        <p className="text-base text-foreground-muted mt-4 max-w-xl leading-relaxed">
                            Execution compounds failure when the diagnosis is wrong.
                        </p>
                    </div>
                </div>

                {/* Card Grid — 1 featured + 2 supporting */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Featured Transformation Card */}
                    <div
                        className="group lg:col-span-7 rounded-[32px] overflow-hidden relative border border-black/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
                        style={{ backgroundColor: '#F5F3EF' }}
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20" />

                        <div className="p-10 md:p-12 flex flex-col h-full">
                            {/* Category */}
                            <span className="text-[11px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors duration-500 mb-8">
                                {featured.category}
                            </span>

                            {/* Perceived layer — muted, fades on hover */}
                            <div className="mb-6 transition-all duration-500 group-hover:opacity-50">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-foreground-muted mb-2">
                                    Perceived Problem
                                </p>
                                <p className="text-2xl md:text-3xl font-serif text-foreground/60 leading-snug">
                                    {featured.perceived}
                                </p>
                                <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                                    {featured.perceivedSub}
                                </p>
                            </div>

                            {/* Animated divider */}
                            <div className="relative my-6 flex items-center gap-3">
                                <div className="flex-1 h-px bg-black/10" />
                                <div className="w-6 h-6 rounded-full border border-black/10 group-hover:border-primary/40 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-500">
                                    <svg className="w-3 h-3 text-foreground-muted group-hover:text-primary transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className="flex-1 h-px bg-black/10 group-hover:bg-primary/20 transition-colors duration-700" />
                            </div>

                            {/* Actual constraint — sharpens on hover */}
                            <div className="mb-6 transition-all duration-500 group-hover:translate-y-[-2px]">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                                    Actual Constraint
                                </p>
                                <p className="text-base text-foreground leading-relaxed">
                                    {featured.constraint}
                                </p>
                            </div>

                            {/* Intervention */}
                            <div className="mb-8 transition-all duration-500 group-hover:translate-y-[-2px]">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-foreground-muted mb-2">
                                    Intervention
                                </p>
                                <p className="text-sm text-foreground-muted leading-relaxed">
                                    {featured.intervention}
                                </p>
                            </div>

                            {/* Outcome metrics */}
                            <div className="mt-auto pt-8 border-t border-black/8 flex items-end justify-between gap-6">
                                <div>
                                    <p className="text-4xl md:text-5xl font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-500">
                                        {featured.metric}
                                    </p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mt-1">
                                        {featured.metricLabel}
                                    </p>
                                </div>
                                {featured.secondaryMetric && (
                                    <div className="text-right">
                                        <p className="text-2xl font-serif text-foreground/70">
                                            {featured.secondaryMetric}
                                        </p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mt-1">
                                            {featured.secondaryLabel}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Supporting Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {supporting.map((item) => (
                            <div
                                key={item.id}
                                className="group flex-1 rounded-[28px] overflow-hidden relative border border-black/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
                                style={{ backgroundColor: '#F5F3EF' }}
                            >
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20" />

                                <div className="p-8 flex flex-col h-full">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors duration-500 mb-6">
                                        {item.category}
                                    </span>

                                    {/* Perceived — mutes on hover */}
                                    <div className="mb-4 transition-opacity duration-500 group-hover:opacity-45">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mb-1">
                                            Perceived
                                        </p>
                                        <p className="text-xl font-serif text-foreground/60 leading-snug">
                                            {item.perceived}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative my-4 flex items-center gap-2">
                                        <div className="flex-1 h-px bg-black/10 group-hover:bg-primary/15 transition-colors duration-700" />
                                        <div className="w-4 h-4 rounded-full border border-black/10 group-hover:border-primary/30 flex items-center justify-center transition-colors duration-500">
                                            <svg className="w-2.5 h-2.5 text-foreground-muted group-hover:text-primary transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 h-px bg-black/10 group-hover:bg-primary/15 transition-colors duration-700" />
                                    </div>

                                    {/* Constraint — sharpens on hover */}
                                    <div className="mb-4 transition-all duration-500 group-hover:translate-y-[-2px]">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                                            Actual Constraint
                                        </p>
                                        <p className="text-sm text-foreground leading-relaxed">
                                            {item.constraint}
                                        </p>
                                    </div>

                                    {/* Outcome metric */}
                                    <div className="mt-auto pt-6 border-t border-black/8 flex items-end justify-between gap-4">
                                        <div>
                                            <p className="text-3xl font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-500">
                                                {item.metric}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mt-1">
                                                {item.metricLabel}
                                            </p>
                                        </div>
                                        {item.secondaryMetric && (
                                            <div className="text-right">
                                                <p className="text-xl font-serif text-foreground/60">
                                                    {item.secondaryMetric}
                                                </p>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-muted mt-1">
                                                    {item.secondaryLabel}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
