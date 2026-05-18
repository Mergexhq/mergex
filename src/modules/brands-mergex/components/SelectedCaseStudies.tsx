'use client';

import Link from 'next/link';
import { CASE_STUDIES } from '@/lib/data/case-studies';

export function SelectedCaseStudies() {
  // Show first 2 case studies
  const featured = CASE_STUDIES.slice(0, 2);

  return (
    <section
      style={{
        padding: '100px 48px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-foreground-muted)',
                marginBottom: '12px',
              }}
            >
              Section 06 — Selected Case Studies
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--color-foreground)',
              }}
            >
              Diagnosis → result
            </h2>
          </div>
          <Link
            href="/insights/case-studies"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-foreground-muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            View all case studies →
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
          }}
        >
          {featured.map((cs) => (
            <Link
              key={cs.slug}
              href={`/insights/case-studies/${cs.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                className="cs-card-inner"
                style={{
                  background: 'var(--color-background)',
                  padding: '40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    '#EBEBEB')
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    'var(--color-background)')
                }
              >
                {/* Industry + date */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {cs.industry}
                  </span>
                  <span
                    style={{
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: 'var(--color-border)',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-foreground-muted)',
                    }}
                  >
                    {new Date(cs.publishedAt).toLocaleDateString('en-GB', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <p
                  style={{
                    fontFamily: 'var(--font-playfair-display, Georgia, serif)',
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontWeight: 400,
                    color: 'var(--color-foreground)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.015em',
                    marginBottom: '12px',
                  }}
                >
                  {cs.title}
                </p>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-foreground-muted)',
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: '28px',
                  }}
                >
                  {cs.excerpt.slice(0, 180)}…
                </p>

                {/* Metrics */}
                {cs.metrics && cs.metrics.length > 0 && (
                  <div
                    style={{
                      paddingTop: '20px',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      gap: '28px',
                    }}
                  >
                    {cs.metrics.map((m) => (
                      <div key={m.label}>
                        <p
                          style={{
                            fontFamily:
                              'var(--font-playfair-display, Georgia, serif)',
                            fontSize: '20px',
                            fontWeight: 400,
                            color: 'var(--color-foreground)',
                            lineHeight: 1,
                            marginBottom: '4px',
                          }}
                        >
                          {m.value}
                        </p>
                        <p
                          style={{
                            fontSize: '10px',
                            color: 'var(--color-foreground-muted)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Arrow */}
                <div
                  style={{
                    marginTop: '24px',
                    fontSize: '18px',
                    color: 'var(--color-foreground-muted)',
                    textAlign: 'right',
                  }}
                >
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
