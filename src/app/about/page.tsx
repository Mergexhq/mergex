import type { Metadata } from 'next';
import Image from 'next/image';
import { CLOUDINARY_ASSETS } from '@/lib/cloudinary';
import './about.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'MergeX brings together software, AI, and creative production to help businesses build better digital experiences and smarter ways of working.',
  alternates: {
    canonical: 'https://mergex.in/about',
  },
};

const CAPABILITIES = [
  {
    title: 'Software Development',
    desc: 'High-performance web applications, platform engineering, and custom database architectures built for speed and durability.',
  },
  {
    title: 'AI Solutions',
    desc: 'Custom workflow automation, intelligent internal tooling, agentic systems, and LLM integrations that reduce operational friction.',
  },
  {
    title: 'AI Creative Production',
    desc: 'Vibrant commercials, brand films, product video assets, and motion graphics created at the convergence of generative AI and professional direction.',
  },
];

const TEAM = [
  {
    name: 'Manikandan',
    role: 'Founder & Lead Architect',
    img: CLOUDINARY_ASSETS.teamManikandan,
  },
  {
    name: 'Sharukesh',
    role: 'Principal Engineer',
    img: CLOUDINARY_ASSETS.teamSharukesh,
  },
  {
    name: 'John',
    role: 'Creative Director',
    img: CLOUDINARY_ASSETS.teamJohn,
  },
  {
    name: 'Muralidharan',
    role: 'AI Research Lead',
    img: CLOUDINARY_ASSETS.teamMuralidharan,
  },
  {
    name: 'Yasshwanth',
    role: 'Operations Lead',
    img: CLOUDINARY_ASSETS.teamYasshwanth,
  },
];

export default function AboutPage() {
  return (
    <main className="about-container">
      {/* 1. Hero */}
      <section className="about-hero">
        <h1 className="about-display font-questrial">
          Business deserves better technology.
        </h1>
        <p className="about-hero-text">
          MergeX is an independent software and AI company. We bring together engineering, artificial intelligence, and creative production to build digital experiences and smarter systems for modern companies.
        </p>
      </section>

      {/* 2. Who We Are */}
      <section className="about-section border-t border-black/5">
        <div className="about-grid">
          <div>
            <span className="about-eyebrow">Who We Are</span>
          </div>
          <div>
            <p className="about-large-prose">
              We believe in utility, clarity, and precision. We design systems that run quietly, perform reliably, and last. No marketing hype, no startup buzzwords. Just pure technical and creative execution.
            </p>
            <p className="about-body-prose">
              Our work lives at the intersection of robust code, advanced artificial intelligence, and high-fidelity media production. By uniting these three capabilities under one roof, we help teams eliminate operational complexity, automate repetitive workflows, and launch digital products that leave a lasting impression.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Capabilities */}
      <section className="about-section border-t border-black/5">
        <div className="about-grid">
          <div>
            <span className="about-eyebrow">Core Capabilities</span>
          </div>
          <div className="capabilities-list">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="capability-item">
                <h3 className="capability-title font-questrial">{cap.title}</h3>
                <p className="capability-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Team */}
      <section className="about-section border-t border-black/5">
        <div className="about-grid">
          <div>
            <span className="about-eyebrow">Core Team</span>
          </div>
          <div>
            <div className="team-grid">
              {TEAM.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-img-wrapper">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="team-img"
                    />
                  </div>
                  <div className="team-info">
                    <h4 className="team-name font-questrial">{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
