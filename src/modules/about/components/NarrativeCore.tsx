'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

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
  { name: 'Studio', role: 'Brand & creative infrastructure', status: 'Active' },
];

export function NarrativeCore() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('.fade-up, .belief-item');
    items?.forEach((el) => observer.observe(el));

    // Stagger belief items
    sectionRef.current?.querySelectorAll('.belief-item').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 80}ms`;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-narrative">
      <div className="narrative-inner">
        {/* Sidebar */}
        <div className="narrative-sidebar">
          <div className="sidebar-label">Section</div>
          <div className="sidebar-number">02</div>
          <nav className="sidebar-nav">
            <div className="sidebar-nav-item sidebar-active">The market problem</div>
            <div className="sidebar-nav-item">Why MergeX exists</div>
            <div className="sidebar-nav-item">What we believe</div>
            <div className="sidebar-nav-item">The ecosystem</div>
          </nav>
        </div>

        {/* Content */}
        <div className="narrative-content">
          <div className="phase-label">What we are — why we exist</div>

          <p className="thesis fade-up">
            Businesses don&apos;t fail from lack of effort.<br />
            They fail because they&apos;re solving<br />
            <em>the wrong problem.</em>
          </p>

          <p className="about-prose fade-up">
            Every year, founders hire agencies, run campaigns, rebuild their brand,
            and invest in technology — without ever asking the more important question:{' '}
            <strong>is this actually what&apos;s stopping our growth?</strong>{' '}
            The answer, most of the time, is no.
          </p>

          <p className="about-prose fade-up">
            The agency sells execution. The consultant sells generic advice.
            Neither diagnoses first. Nobody stops to ask what the actual constraint is
            before prescribing a solution. The result is a market full of{' '}
            <strong>expensive, well-executed answers to the wrong questions.</strong>
          </p>

          <p className="about-prose fade-up">
            MergeX is a business consulting firm built to fix this. Not by doing
            more — but by <strong>understanding precisely what needs to be done</strong>{' '}
            before anything is built. We use a diagnostic-led consulting approach:
            identify the exact structural or operational constraint first, then
            architect and build only what resolves it.
          </p>

          <p className="about-prose fade-up">
            We call this approach the <strong>S.C.A.L.E. Methodology</strong> —
            a five-stage diagnostic and execution framework that identifies
            your real growth constraint and builds the infrastructure to resolve it.{' '}
            <Link href="/methodology" className="about-link">Learn how it works →</Link>
          </p>

          {/* Belief moments */}
          <div className="belief-block">
            {BELIEFS.map((b) => (
              <div key={b.num} className="belief-item">
                <span className="belief-num">{b.num}</span>
                <div>
                  <p className="belief-text">{b.text}</p>
                  <p className="belief-sub">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ecosystem teaser */}
          <div className="eco-teaser fade-up">
            <div className="eco-label">The MergeX Company</div>
            <p className="eco-intro">
              MergeX is the flagship brand of <strong>The MergeX Company</strong> —
              a scaling ecosystem building specialized infrastructure
              across systems, creative, talent, knowledge, and products.
              Today, two divisions are active.
            </p>
            <div className="eco-cards">
              {ECO_BRANDS.map((brand) => (
                <div key={brand.name} className="eco-card">
                  <div className="eco-card-name">{brand.name}</div>
                  <div className="eco-card-role">{brand.role}</div>
                  <div className="eco-card-status">{brand.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
