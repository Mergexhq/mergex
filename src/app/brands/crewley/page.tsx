import type { Metadata } from 'next';
import { BrandDetailLayout } from '@/modules/brands/components';
import { BRANDS } from '@/modules/brands/data/brands';

export const metadata: Metadata = {
  title: 'Crewley — Brands — The MergeX Company',
  description:
    'Crewley is the talent infrastructure layer of The MergeX Company ecosystem.',
};

const brand = BRANDS.find((b) => b.slug === 'crewley')!;

const PRINCIPLES = [
  {
    label: 'Talent is a system',
    body: 'Hiring problems are almost always structural problems. Crewley designs the architecture first — role clarity, team shape, hiring criteria — before running a single search.',
  },
  {
    label: 'Structure before headcount',
    body: 'Most businesses hire to solve problems that structure should solve. Adding people into a broken structure produces more expensive problems.',
  },
  {
    label: 'Onboarding is part of hiring',
    body: 'A hire that cannot operate effectively within 60 days is a systems failure, not a talent failure. Crewley builds the onboarding infrastructure that makes new hires productive.',
  },
];

export default function CrewleyBrandPage() {
  return (
    <BrandDetailLayout
      brand={brand}
      whatItDoes={
        <>
          <p className="text-foreground">
            Crewley exists because talent is a systems problem, not a hiring
            problem. Most businesses that struggle to scale do so because their
            team structure is misaligned with the work that needs to be done.
          </p>
          <p className="text-foreground-muted">
            Crewley designs and implements the talent architecture — hiring
            processes, role definition, team structure, and onboarding systems —
            that allow businesses to grow without fragmenting.
          </p>
          <p className="text-foreground-muted">
            The result is not just better hires. It is a hiring system that
            consistently produces the right people in the right roles, and an
            organizational structure that scales with the business.
          </p>
        </>
      }
      specialSection={
        <>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-10">
            Operating Principles
          </p>
          <div className="space-y-px rounded-2xl overflow-hidden border border-border">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.label}
                className="flex gap-8 p-7 bg-background items-start"
              >
                <span className="text-[10px] font-bold tabular-nums text-foreground-muted/40 mt-1 shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">{p.label}</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
