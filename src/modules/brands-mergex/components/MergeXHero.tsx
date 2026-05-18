import Link from 'next/link';

export function MergeXHero() {
  return (
    <section className="min-h-[88vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-40 border-b border-border relative">
      {/* Vertical rule left */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--color-border) 25%, var(--color-border) 75%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-14 pl-0 md:pl-0">
          <Link
            href="/brands"
            className="text-xs font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            Brands
          </Link>
          <span className="text-xs text-foreground-muted/40">→</span>
          <span className="text-xs font-semibold text-foreground">MergeX</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">
              Diagnostic-First Scaling
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                fontSize: 'clamp(52px, 7vw, 88px)',
                fontWeight: 400,
                lineHeight: 1.03,
                letterSpacing: '-0.025em',
                color: 'var(--color-foreground)',
                marginBottom: '40px',
              }}
            >
              MergeX
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-foreground-muted)',
                lineHeight: 1.75,
                maxWidth: '440px',
                marginBottom: '40px',
              }}
            >
              The primary scaling brand. We find the exact constraint holding
              your business back — then build only what resolves it.
            </p>
            <Link
              href="/contact/diagnostic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--color-foreground)',
                color: 'var(--color-background)',
                fontSize: '13px',
                fontWeight: 500,
                padding: '14px 28px',
                borderRadius: '2px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'opacity 0.2s',
              }}
            >
              Request a Diagnostic
              <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </div>

          {/* Right — stat strip */}
          <div
            className="hidden lg:grid grid-cols-3 gap-px"
            style={{
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              marginBottom: '4px',
            }}
          >
            {[
              { value: '90', unit: 'days', label: 'Average engagement' },
              { value: '5', unit: 'stage', label: 'S.C.A.L.E Formula™' },
              { value: '4', unit: 'domains', label: 'Prescription outputs' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-background p-7 flex flex-col justify-between"
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                      fontSize: '40px',
                      fontWeight: 400,
                      color: 'var(--color-foreground)',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-foreground-muted)',
                      marginLeft: '4px',
                    }}
                  >
                    {s.unit}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-foreground-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '20px',
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
