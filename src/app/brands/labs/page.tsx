import type { Metadata } from 'next';
import { BrandDetailLayout } from '@/modules/brands/components';
import { BRANDS } from '@/modules/brands/data/brands';

export const metadata: Metadata = {
  title: 'MergeX Studio — Brands — The MergeX Company',
  description:
    'MergeX Studio is the creative and brand infrastructure layer of The MergeX Company ecosystem.',
};

const brand = BRANDS.find((b) => b.slug === 'labs')!;

const CAPABILITIES = [
  { title: 'Brand Strategy', desc: 'Defining positioning, audience, and the commercial narrative that differentiates.' },
  { title: 'Identity Design', desc: 'Visual systems — logo, colour, typography, and brand language built to scale.' },
  { title: 'Positioning Clarity', desc: 'Ensuring the brand communicates what the business actually does and why it matters.' },
  { title: 'Content Systems', desc: 'Structured content frameworks that make brand communication consistent and repeatable.' },
  { title: 'Creative Direction', desc: 'Coordinating visual execution across touchpoints — digital, print, and environmental.' },
];

export default function StudioBrandPage() {
  return (
    <BrandDetailLayout
      brand={brand}
      whatItDoes={
        <>
          <p className="text-foreground">
            MergeX Studio is the brand-building and creative execution layer of
            the ecosystem. It exists because most scaling businesses have an
            invisible problem: their brand no longer matches the system
            underneath it.
          </p>
          <p className="text-foreground-muted">
            As a business grows, its positioning, identity, and communication
            often lag behind operational reality. Studio aligns these — so the
            brand works as hard as the business model it represents.
          </p>
          <p className="text-foreground-muted">
            Studio does not create brands in isolation. Every engagement is
            informed by the operational context — what the business does, who
            it serves, and what the commercial system requires the brand to
            communicate.
          </p>
        </>
      }
      specialSection={
        <>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-10">
            Capabilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl border border-border bg-background"
              >
                <span className="text-[10px] font-bold tabular-nums text-foreground-muted/40 block mb-3">
                  0{i + 1}
                </span>
                <p className="text-sm font-semibold text-foreground mb-2">{c.title}</p>
                <p className="text-xs text-foreground-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
