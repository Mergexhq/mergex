export function Proof() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm font-medium tracking-[0.3em] uppercase text-foreground-muted mb-6">
                        Proof
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        Every result starts with the right diagnosis.
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { 
                            problem: "Perceived: We need a new website.", 
                            diagnosis: "Real: Your brand positioning was attracting the wrong ICP.",
                            built: "Repositioned brand identity + Headless eCommerce build.",
                            result: "120% increase in average order value." 
                        },
                        { 
                            problem: "Perceived: We need more leads.", 
                            diagnosis: "Real: Your sales cycle is 4x too long due to manual qualification.",
                            built: "Automated qualification engine + CRM restructure.",
                            result: "Sales cycle reduced from 60 days to 14 days." 
                        }
                    ].map((caseItem, idx) => (
                        <div key={idx} className="p-8 rounded-2xl border border-border bg-background hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-bold mb-4 pb-4 border-b border-border">{caseItem.problem}</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">Diagnosis</span>
                                    <p className="text-foreground-muted text-sm leading-relaxed">{caseItem.diagnosis}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">What we built</span>
                                    <p className="text-foreground-muted text-sm leading-relaxed">{caseItem.built}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">Outcome</span>
                                    <p className="text-foreground font-semibold leading-relaxed">{caseItem.result}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
