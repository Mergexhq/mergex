const PRESCRIPTIONS = [
  {
    num: '01',
    domain: 'Technology',
    headline: 'Operational systems that remove the bottleneck.',
    body: 'Automation infrastructure, internal tooling, and data architecture that eliminate manual overhead and create scalable operational capacity — without adding headcount.',
    industries: ['D2C / E-commerce', 'EdTech', 'B2B SaaS'],
  },
  {
    num: '02',
    domain: 'Branding',
    headline: 'Positioning that closes the trust gap.',
    body: 'The visual identity, messaging architecture, and brand clarity that align how the market perceives the business with how it actually operates. Prescribed when positioning is the conversion constraint.',
    industries: ['Professional Services', 'B2B Services', 'D2C'],
  },
  {
    num: '03',
    domain: 'Marketing',
    headline: 'Acquisition infrastructure built for the right buyer.',
    body: 'Channel strategy, content systems, and demand architecture that bring qualified buyers into the commercial motion. Prescribed when the pipeline is thin, inconsistent, or misaligned.',
    industries: ['B2B Services', 'D2C / E-commerce', 'EdTech'],
  },
  {
    num: '04',
    domain: 'Sales',
    headline: 'A commercial system that does not require the founder.',
    body: 'Qualification frameworks, pipeline architecture, and closing infrastructure that produce predictable revenue without founder-dependency. Prescribed when conversion is the constraint.',
    industries: ['Professional Services', 'B2B SaaS', 'B2B Services'],
  },
];

export function SolutionsAsPrescriptions() {
  return (
    <section
      style={{
        padding: '100px 48px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '80px',
        }}
      >
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-foreground-muted)',
              marginBottom: '16px',
            }}
          >
            Section 05
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair-display, Georgia, serif)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--color-foreground)',
              marginBottom: '16px',
            }}
          >
            Solutions as prescriptions
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-foreground-muted)',
              lineHeight: 1.7,
            }}
          >
            Every prescription is a direct response to the diagnosed constraint.
            We do not build speculatively.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            alignContent: 'start',
          }}
        >
          {PRESCRIPTIONS.map((p) => (
            <div
              key={p.num}
              style={{
                background: 'var(--color-background)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                  }}
                >
                  {p.domain}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-foreground-muted)',
                    opacity: 0.4,
                    fontWeight: 700,
                  }}
                >
                  {p.num}
                </span>
              </div>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--color-foreground)',
                  marginBottom: '10px',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.headline}
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-foreground-muted)',
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {p.body}
              </p>
              {/* Industry tags */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                {p.industries.map((ind) => (
                  <span
                    key={ind}
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-foreground-muted)',
                      background: 'transparent',
                      border: '1px solid var(--color-border)',
                      padding: '3px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
