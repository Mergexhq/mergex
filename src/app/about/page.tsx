import type { Metadata } from 'next';
import './about.css';

export const metadata: Metadata = {
  title: 'About — The MergeX Company',
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

export default function AboutPage() {
  return (
    <main className="about-page">

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

          {/* Core capabilities — stacked label list */}
          <div className="about-capabilities">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="about-cap-item">
                {cap.label.split('\n').map((line, j) => (
                  <p key={j} className="about-cap-label">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="about-right">
          <p className="about-body-p">
            MergeX is a software and AI company focused on creating technology that helps businesses operate more effectively in an increasingly digital world. Our work combines software engineering, artificial intelligence, and creative production to build digital experiences that are functional, reliable, and designed for long-term value.
          </p>

          <p className="about-body-p">
            We believe good technology is defined by usefulness rather than complexity. Every product, system, or creative asset should solve a real problem, integrate naturally into existing workflows, and remain practical as businesses continue to evolve. This philosophy shapes every decision we make—from architecture and automation to design and execution.
          </p>

          <p className="about-body-p">
            Although we are a focused team, we approach every project with careful attention to quality, clarity, and craftsmanship. Whether building software, implementing AI, or producing AI-powered creative content, our objective remains the same: to create digital solutions that businesses can depend on with confidence.
          </p>

          <p className="about-closing">
            Good Technology Feels Effortless.
          </p>
        </div>

      </div>
    </main>
  );
}
