import type { Metadata } from 'next';
import Link from 'next/link';
import './about.css';

export const metadata: Metadata = {
  title: 'About - The MergeX Company',
  description:
    'MergeX is a business consulting firm for scaling companies. We diagnose the exact structural, operational, and strategic constraint limiting your growth - then build the precise system to resolve it.',
  alternates: {
    canonical: 'https://mergex.in/about',
  },
};

const BELIEFS = [
  {
    num: '01',
    text: 'Execution without diagnosis is expensive guesswork.',
    sub: 'The most costly mistake in business is solving the wrong problem with precision.',
  },
  {
    num: '02',
    text: 'A business that depends on its founder cannot scale.',
    sub: 'Systems create freedom. Every engagement ends with ownership transferred — not dependency created.',
  },
  {
    num: '03',
    text: 'Precision beats volume. Every time.',
    sub: 'We do not offer a menu of services. We prescribe only what the diagnosis demands.',
  },
  {
    num: '04',
    text: 'Good systems outlast every trend.',
    sub: 'Infrastructure built on clarity compounds over time. Tactics built on guesswork erode it.',
  },
  {
    num: '05',
    text: 'Scale is an infrastructure problem — not a marketing one.',
    sub: 'When growth stalls, the answer is rarely more execution. It is almost always clearer systems.',
  },
];

const ECO_BRANDS = [
  { name: 'MergeX', role: 'Business consulting & scale infrastructure', status: 'Active' },
  { name: 'OVRN Studios', role: 'Brand & creative infrastructure', status: 'Active' },
];

const STANDARDS = [
  {
    num: '01',
    text: 'We diagnose before we prescribe. Always.',
    explain:
      'No engagement begins with a solution. Every engagement begins with a structured diagnosis of the actual constraint. The prescription follows the finding — never the other way around.',
  },
  {
    num: '02',
    text: 'We work selectively — not with everyone who can pay.',
    explain:
      'MergeX works with revenue-generating businesses that are ready to scale. Not pre-revenue startups. Not founders looking for the cheapest option. Selectivity is how we protect the depth of every engagement.',
  },
  {
    num: '03',
    text: 'We build systems — not dependencies.',
    explain:
      'Every system we build is designed to operate without us. Our success is measured by how little a business needs us after the engagement ends — not by how much they do.',
  },
  {
    num: '04',
    text: 'We measure outcomes. Not activity.',
    explain:
      'Reports on hours spent, content published, and campaigns run are not outcomes. Revenue growth, operational clarity, and founder independence are. We are accountable to the second list — not the first.',
  },
];

export default function AboutPage() {
  return (
    <main className="v-sys-container">
      {/* 1. Hero (Variation 2 Design) */}
      <section className="v-sys-hero">
        <span className="v-sys-pill">About MergeX</span>
        <h1 className="v-sys-display">
          Stop guessing.<br/><em>Start diagnosing.</em>
        </h1>
        <p className="v-sys-hero-text">
          Most companies aren&apos;t stuck from lack of effort. They&apos;re solving the wrong problem.
        </p>
      </section>

      {/* 2. Principles / Thesis (V1 Port) */}
      {/* <section className="v-sys-section">
        <h2 className="v-sys-section-title">Principles</h2>
        <div className="v1-thesis-grid">
          <p className="v1-thesis-header">
            Most companies aren&apos;t stuck from lack of effort.<br />
            <strong>They&apos;re solving the wrong problem.</strong>
          </p>
          <div className="v1-prose-block">
            <p className="v1-prose-text">
              Every year, founders hire agencies, run campaigns, rebuild their brand,
              and invest in technology — without ever asking the more important question:{' '}
              <strong>is this actually what&apos;s stopping our growth?</strong>{' '}
              The answer, most of the time, is no.
            </p>
            <p className="v1-prose-text">
              The agency sells execution. The consultant sells generic advice.
              Neither diagnoses first. Nobody stops to ask what the actual constraint is
              before prescribing a solution. The result is a market full of{' '}
              <strong>expensive, well-executed answers to the wrong questions.</strong>
            </p>
            <p className="v1-prose-text">
              MergeX is built to fix this. Not by doing more — but by{' '}
              <strong>understanding precisely what needs to be done</strong>{' '}
              before anything is built. We use a diagnostic-led consulting approach:
              identify the exact constraint first, then architect only what resolves it.
            </p>
            <p className="v1-prose-text">
              We call this the <strong>S.C.A.L.E. Methodology</strong> —
              a five-stage diagnostic and execution framework.{' '}
              <Link href="/methodology" className="v1-prose-link">Learn how it works →</Link>
            </p>
          </div>
        </div>
      </section> */}

      {/* 3. Core Beliefs (Variation 2 Design) */}
      <section className="v-sys-section">
        <h2 className="v-sys-section-title">Core Beliefs</h2>
        <div className="v1-bento-grid">
          {BELIEFS.map((b, i) => (
            <div key={b.num} className={`v1-bento-card ${i === 0 ? 'large' : ''}`}>
              <span className="v-sys-num">{b.num}</span>
              <h3 className="v-sys-card-title">{b.text}</h3>
              <p className="v-sys-card-body">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ecosystem (V1 Port) */}
      <section className="v-sys-section">
        <h2 className="v-sys-section-title">The Ecosystem</h2>
        <p className="v1-eco-intro">
          MergeX is the flagship brand of <strong>The MergeX Company</strong> —
          a scaling ecosystem building specialized infrastructure
          across systems, creative, talent, knowledge, and products.
          Two divisions are active today.
        </p>
        <div className="v1-eco-grid">
          {ECO_BRANDS.map((brand) => (
            <div key={brand.name} className="v1-eco-card">
              <span className="v1-eco-status">{brand.status}</span>
              <h3 className="v-sys-card-title m-0">{brand.name}</h3>
              <p className="v-sys-card-body m-0">{brand.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The Four Rules (Variation 2 Design) */}
      <section className="v-sys-section">
        <h2 className="v-sys-section-title">The Four Rules</h2>
        <div className="v1-rules-list">
          {STANDARDS.map(s => (
            <div key={s.num} className="v1-rule-item">
              <div className="v1-rule-header">
                <span className="v-sys-num text-primary">{s.num}</span>
                <h3 className="v-sys-card-title m-0">{s.text}</h3>
              </div>
              <p className="v-sys-card-body mt-4">{s.explain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA (Variation 2 Design) */}
      <section className="v-sys-cta">
        <h2 className="v-sys-cta-title">Ready to find your constraint?</h2>
        <Link href="/contact" className="btn-primary">Book a diagnostic call</Link>
      </section>
    </main>
  );
}
