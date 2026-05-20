'use client';

import Link from 'next/link';

export function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="cta-inner">
        <div className="cta-label">Start a Consulting Engagement</div>
        <h2 className="cta-heading">
          If this is how you<br />
          think about building<br />
          a business — <em>let&apos;s talk.</em>
        </h2>
        <p className="cta-body">
          We spend the first conversation understanding your situation —
          not pitching ours. If there&apos;s a fit, we&apos;ll tell you exactly
          what we&apos;d diagnose and why. No obligation. No guesswork.
        </p>
        <div>
          <Link href="/contact" className="cta-primary">
            Book a diagnostic call
            <span className="cta-arrow">→</span>
          </Link>
        </div>
        <div className="cta-secondary-links">
          <Link href="/brands/studio">Interested in Studio</Link>
          <Link href="/careers">Join MergeX</Link>
        </div>
      </div>
    </section>
  );
}
