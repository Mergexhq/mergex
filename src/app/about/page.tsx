import type { Metadata } from 'next';
import './about.css';
import { Signature } from '@/components/Signature';

export const metadata: Metadata = {
  title: 'About - The MergeX Company',
  description:
    'MergeX is a software and AI company focused on creating technology that helps businesses operate more effectively in an increasingly digital world.',
  alternates: {
    canonical: 'https://mergex.in/about',
  },
};

const CAPABILITIES = [
  { label: 'SOFTWARE\nDEVELOPMENT' },
  { label: 'ARTIFICIAL\nINTELLIGENCE' },
  { label: 'AI CREATIVE\nPRODUCTION' },
];

/** All 23 projects with their wordmark style config and launch anchor slug */
const BUILT_PROJECTS: {
  name: string;
  slug: string;
  hasLogo?: boolean;
  weight?: number;
  tracking?: number;
  casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  italic?: boolean;
  sizeMultiplier?: number;
}[] = [
    { name: 'Mic & Mac', slug: 'mic-and-mac', weight: 800, tracking: 0.05, casing: 'uppercase' },
    { name: 'Grape Master', slug: '', hasLogo: true },
    { name: 'Dude Mens Wear', slug: 'dude-mens-wears', weight: 900, tracking: 0.14, casing: 'uppercase' },
    { name: 'Tharus Motors', slug: '', weight: 700, tracking: 0.10, casing: 'uppercase' },
    { name: 'Neidhal FC', slug: '', weight: 900, tracking: 0.02, casing: 'uppercase', italic: true },
    { name: 'Motor Factory', slug: '', weight: 800, tracking: 0.12, casing: 'uppercase' },
    { name: 'Space Furnia', slug: '', weight: 300, tracking: 0.22, casing: 'uppercase' },
    { name: 'Kuthakai', slug: '', weight: 700, tracking: 0.06, casing: 'capitalize' },
    { name: 'Unisynk', slug: '', weight: 800, tracking: 0.08, casing: 'lowercase' },
    { name: 'Pirandai', slug: '', weight: 400, tracking: 0.18, casing: 'uppercase', italic: true },
    { name: 'Cedar Elevators', slug: 'cedar-elevators', weight: 600, tracking: 0.10, casing: 'uppercase' },
    { name: 'Jackson Elevators', slug: '', weight: 700, tracking: 0.08, casing: 'uppercase' },
    { name: 'Voice Model AI', slug: '', weight: 900, tracking: 0.00, casing: 'lowercase', sizeMultiplier: 0.9 },
    { name: 'Chat Bot AI', slug: '', weight: 300, tracking: 0.25, casing: 'uppercase' },
    { name: 'Dgard', slug: '', weight: 800, tracking: 0.15, casing: 'uppercase' },
    { name: 'Thai Chips', slug: '', weight: 900, tracking: 0.03, casing: 'capitalize', italic: true },
    { name: 'Sara Vega', slug: '', weight: 300, tracking: 0.30, casing: 'uppercase', italic: true },
    { name: 'HeyProData', slug: 'heyprodata', weight: 700, tracking: 0.02, casing: 'lowercase' },
    { name: 'MKS Agencies', slug: '', weight: 800, tracking: 0.12, casing: 'uppercase' },
    { name: 'Vydy', slug: '', weight: 900, tracking: 0.20, casing: 'uppercase' },
    { name: 'Dhivana Collections', slug: '', weight: 300, tracking: 0.22, casing: 'uppercase' },
    { name: 'Zeko', slug: '', weight: 900, tracking: 0.05, casing: 'lowercase' },
    { name: 'ExaminerPro', slug: '', weight: 700, tracking: 0.06, casing: 'capitalize' },
  ];

export default function AboutPage() {
  return (
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

      {/* ── What We've Built ── */}
      <section className="wwb-section">
        {/* BG image layer */}
        <div className="wwb-bg" aria-hidden="true" />
        {/* Noise grain overlay */}
        <div className="wwb-noise" aria-hidden="true" />
        {/* Dark gradient scrim */}
        <div className="wwb-scrim" aria-hidden="true" />

        <div className="wwb-inner">
          {/* Header */}
          <div className="wwb-header">
            <h2 className="wwb-title font-questrial">What We&apos;ve Built</h2>
            <p className="wwb-desc">
              Every launch represents a different challenge, industry, and objective. From business software and AI systems to creative productions and digital platforms, each project reflects our approach to building thoughtful technology.
            </p>
          </div>

          {/* Logo/wordmark grid */}
          <div className="wwb-grid">
            {BUILT_PROJECTS.map((project) => {
              const href = project.slug ? `/launches#${project.slug}` : '/launches';
              return (
                <a
                  key={project.name}
                  href={href}
                  className="wwb-item"
                  title={project.name}
                >
                  {project.hasLogo ? (
                    <img
                      src="/brand logos/grapemaster.png"
                      alt="Grape Master"
                      className="wwb-logo-img"
                      draggable={false}
                    />
                  ) : (
                    <span
                      className="wwb-wordmark"
                      style={{
                        fontWeight: project.weight ?? 700,
                        letterSpacing: `${project.tracking ?? 0.08}em`,
                        textTransform: project.casing === 'none' ? undefined : project.casing,
                        fontStyle: project.italic ? 'italic' : 'normal',
                        fontSize: project.sizeMultiplier
                          ? `calc(var(--wwb-wm-size) * ${project.sizeMultiplier})`
                          : undefined,
                      }}
                    >
                      {project.name}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
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
  );
}
