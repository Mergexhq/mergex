export function MethodologyHero() {
    return (
        <section className="methodology-hero">
            <div className="hero-vline" />
            <p className="methodology-eyebrow">The MergeX Company · Methodology</p>
            <div className="methodology-hero-inner">
                <div>
                    <p className="methodology-hero-tag">Diagnostic First</p>
                    <h1 className="methodology-hero-heading">
                        Before we build anything,<br />
                        we find the <em>exact constraint.</em>
                    </h1>
                    <p style={{ fontSize: '11px', color: 'var(--mp-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        S.C.A.L.E Formula™ — Proprietary IP
                    </p>
                </div>
                <div className="methodology-hero-right">
                    <p className="methodology-hero-para">
                        Most businesses approach growth the same way: hire more, spend more, 
                        try more. The problem is never effort. It is always <strong>diagnosis</strong>.
                    </p>
                    <p className="methodology-hero-para">
                        The S.C.A.L.E Formula™ is our systematic approach to identifying 
                        the real constraint — and prescribing only what is needed to resolve it.
                    </p>
                </div>
            </div>
        </section>
    );
}
