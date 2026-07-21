import type { Metadata } from 'next';
import './about.css';
import { Signature } from '@/components/Signature';
import { getPageBreadcrumbSchema } from '@/knowledge/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export const metadata: Metadata = {
  title: 'About - The MergeX Company',
  description:
    'MergeX is a software and AI company focused on creating technology that helps businesses operate more effectively in an increasingly digital world.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About - The MergeX Company',
    description:
      'MergeX is a software and AI company focused on creating technology that helps businesses operate more effectively in an increasingly digital world.',
    url: `${siteUrl}/about`,
  },
};

/**
 * BreadcrumbList JSON-LD — Home → About.
 * Generated server-side via the schema builder; the About URL derives from
 * the same siteUrl as the canonical so the breadcrumb never drifts.
 */
const breadcrumbJsonLd = getPageBreadcrumbSchema('About', '/about');

const CAPABILITIES = [
  { label: 'SOFTWARE\nDEVELOPMENT' },
  { label: 'ARTIFICIAL\nINTELLIGENCE' },
  { label: 'AI CREATIVE\nPRODUCTION' },
];

/**
 * Client logo list — add new entries here as logos are placed in
 * public/brand logos/.  Each `src` is a root-relative URL.
 */
const CLIENT_LOGOS: { src: string; alt: string }[] = [
  { src: '/brand logos/micandmac.png',           alt: 'Mic & Mac' },
  { src: '/brand logos/grapemaster.png',          alt: 'Grape Master' },
  { src: "/brand logos/Dude Men's Wear.png", alt: "Dude Men's Wear" },
  { src: '/brand logos/neidhal_logo.png',         alt: 'Neidhal FC' },
  { src: '/brand logos/motofactory.png',          alt: 'Motor Factory' },
  { src: '/brand logos/Kuthakai.png',             alt: 'Kuthakai' },
  { src: '/brand logos/cedarelevators.png',       alt: 'Cedar Elevators' },
  { src: '/brand logos/grace and grow.png',       alt: 'Grace and Grow' },
  { src: '/brand logos/CinnAstra Tech.png',       alt: 'CinnAstra Tech' },
  { src: '/brand logos/Pixel_draft_Logo.png',     alt: 'Pixel Draft' },
];

export default function AboutPage() {
  return (
    <>
      {/* BreadcrumbList structured data — injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="about-page">

      {/* Background Gaussian Blur Orbs */}
      <div className="about-blur-bg" aria-hidden="true">
        <div className="about-blur-orb orb-1" />
        <div className="about-blur-orb orb-2" />
        <div className="about-blur-orb orb-3" />
      </div>

      {/* Top label */}
      <p className="about-label">About</p>

      {/* Main editorial grid */}
      <div className="about-grid">

        {/* ── Left column ── */}
        <div className="about-left">

          {/* Big editorial headline */}
          <h1 className="about-headline font-questrial">
            Building Better Digital Experiences Through Technology
          </h1>

          {/* Core capabilities - stacked label list */}
          <div className="about-capabilities">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="about-cap-item">
                {cap.label.split('\n').map((line, j) => (
                  <p key={j} className="about-cap-label">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Closing statement - moved to left column */}
          <p className="about-closing">
            Good Technology Feels Effortless.
          </p>
        </div>

        {/* ── Right column ── */}
        <div className="about-right">
          <p className="about-body-p">
            MergeX is a software and AI company focused on creating technology that helps businesses operate more effectively in an increasingly digital world. Our work combines software engineering, artificial intelligence, and creative production to build digital experiences that are functional, reliable, and designed for long-term value.
          </p>

          <p className="about-body-p">
            We believe good technology is defined by usefulness rather than complexity. Every product, system, or creative asset should solve a real problem, integrate naturally into existing workflows, and remain practical as businesses continue to evolve. This philosophy shapes every decision we make-from architecture and automation to design and execution.
          </p>

          <p className="about-body-p">
            Although we are a focused team, we approach every project with careful attention to quality, clarity, and craftsmanship. Whether building software, implementing AI, or producing AI-powered creative content, our objective remains the same: to create digital solutions that businesses can depend on with confidence.
          </p>
        </div>

      </div>

      {/* ── Trusted by Growing Businesses ── */}
      <section className="wwb-section" aria-labelledby="wwb-heading">
        {/* BG image layer */}
        <div className="wwb-bg" aria-hidden="true" />
        {/* Noise grain overlay */}
        <div className="wwb-noise" aria-hidden="true" />
        {/* Dark gradient scrim */}
        <div className="wwb-scrim" aria-hidden="true" />

        <div className="wwb-inner">

          {/* ── Section header ── */}
          <div className="wwb-header">
            <h2 id="wwb-heading" className="wwb-title font-questrial">
              Trusted by Growing Businesses
            </h2>
            <p className="wwb-desc">
              From AI systems and business software to automation, digital platforms, and custom solutions, we&apos;ve partnered with businesses across multiple industries.
            </p>
          </div>

          {/* ── Stats bar ── */}
          <div className="wwb-stats" aria-label="Portfolio statistics">
            <div className="wwb-stat">
              <span className="wwb-stat-num">40+</span>
              <span className="wwb-stat-lbl">Projects Delivered</span>
            </div>
            <div className="wwb-stat-divider" aria-hidden="true" />
            <div className="wwb-stat">
              <span className="wwb-stat-num">10+</span>
              <span className="wwb-stat-lbl">Industries Served</span>
            </div>
            <div className="wwb-stat-divider wwb-stat-divider--hide-sm" aria-hidden="true" />
            <p className="wwb-stat-tags">
              AI&nbsp;&bull;&nbsp;Automation&nbsp;&bull;&nbsp;Business Software&nbsp;&bull;&nbsp;Digital Platforms
            </p>
          </div>

          {/* ── Logo grid ── */}
          <ul className="wwb-logo-grid" role="list" aria-label="Client logos">
            {CLIENT_LOGOS.map(({ src, alt }) => (
              <li key={src} className="wwb-logo-card" role="listitem">
                <div className="wwb-logo-card-inner">
                  <img
                    src={src}
                    alt={alt}
                    className="wwb-logo-img"
                    loading="lazy"
                    draggable={false}
                    width={160}
                    height={80}
                  />
                </div>
              </li>
            ))}

            {/* ── "30+ More Projects" card ── */}
            <li className="wwb-logo-card wwb-logo-card--more" role="listitem" aria-label="30 or more additional projects">
              <div className="wwb-logo-card-inner wwb-more-inner">
                <span className="wwb-more-num">30+</span>
                <span className="wwb-more-lbl">More Projects</span>
              </div>
            </li>
          </ul>

        </div>
      </section>

      {/* ── A Note from the Founder ── */}
      <section className="founder-section">
        <div className="founder-inner">

          {/* Left - photo card */}
          <div className="founder-photo-col">
            <div className="founder-photo-card">
              {/* Noise overlay on image */}
              <div className="founder-photo-noise" aria-hidden="true" />
              <img
                src="/manikandan siting.png"
                alt="Manikandan S - Founder & CEO of MergeX"
                className="founder-photo-img"
                draggable={false}
              />
              {/* Caption bar */}
              <div className="founder-photo-caption">
                <p className="founder-caption-name">Manikandan S</p>
                <p className="founder-caption-role">Founder &amp; CEO</p>
              </div>
            </div>
          </div>

          {/* Right - note content */}
          <div className="founder-content-col">
            <p className="founder-eyebrow">A Note from the Founder</p>

            <div className="founder-body">
              <p>
                Technology is changing faster than ever, yet many businesses still struggle with disconnected systems, inefficient workflows, and digital experiences that no longer meet modern expectations.
              </p>
              <p>
                MergeX was built with a simple belief: technology should solve problems, not create them.
              </p>
              <p>
                We don&apos;t try to be everything. We focus on a small number of disciplines-software, artificial intelligence, and creative production-and commit ourselves to doing them exceptionally well.
              </p>
              <p>
                Every project is approached with curiosity, precision, and long-term thinking. We value clarity over complexity, quality over quantity, and meaningful outcomes over short-term trends.
              </p>
              <p>
                MergeX is still at the beginning of its journey, but our standard is already set. We intend to build work that remains useful, reliable, and relevant long after it is delivered.
              </p>
              <p>
                Thank you for taking the time to learn about us. I hope we have the opportunity to build something meaningful together.
              </p>
            </div>

            {/* Animated signature */}
            <div className="founder-signature">
              <Signature
                text="Manikandan"
                color="currentColor"
                fontSize={52}
                duration={2}
                delay={0.3}
                inView={true}
                once={true}
                className="founder-sig-svg"
              />
            </div>
          </div>

        </div>
      </section>

    </main>
    </>
  );
}
