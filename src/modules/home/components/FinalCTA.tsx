export function FinalCTA() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-3xl mx-auto text-center border-t border-border pt-24">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                    Ready to build something
                    <br />
                    that actually scales?
                </h2>
                <p className="text-lg text-foreground-muted mb-10 max-w-xl mx-auto">
                    If you&apos;re running a revenue-generating business that&apos;s hit a growth ceiling, every MergeX consulting engagement starts with identifying the real constraint. No pitch, no pressure.
                </p>
                <a
                    href="/diagnostic"
                    className="inline-block px-10 py-4 bg-foreground text-background rounded-none text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Diagnose the Business →
                </a>
            </div>
        </section>
    );
}
