import type { Metadata } from 'next';
import { BrandDetailLayout } from '@/modules/brands/components';
import { BRANDS } from '@/modules/brands/data/brands';

export const metadata: Metadata = {
  title: 'MergeX Foundry — Brands — The MergeX Company',
  description:
    'MergeX Foundry is the product and technology infrastructure layer of The MergeX Company ecosystem.',
};

const brand = BRANDS.find((b) => b.slug === 'foundry')!;

const BUILD_TYPES = [
  {
    category: 'SaaS Products',
    items: ['Architecture design', 'MVP to production', 'Subscription infrastructure', 'Multi-tenant platforms'],
  },
  {
    category: 'Internal Systems',
    items: ['Operational tooling', 'Workflow automation', 'Data infrastructure', 'Reporting systems'],
  },
  {
    category: 'Client Platforms',
    items: ['Customer portals', 'Delivery systems', 'Integration layers', 'API infrastructure'],
  },
];

export default function FoundryBrandPage() {
  return (
    <BrandDetailLayout
      brand={brand}
      whatItDoes={
        <>
          <p className="text-foreground">
            MergeX Foundry is the product and technology execution layer. It
            builds the digital infrastructure — SaaS products, internal tools,
            and client-facing platforms — that modern scaling businesses
            require.
          </p>
          <p className="text-foreground-muted">
            Foundry takes a systems-first approach to every build. The
            architecture serves the business model — not the other way around.
            We do not build features. We build systems that produce outcomes.
          </p>
          <p className="text-foreground-muted">
            Most technology problems in scaling businesses are not technology
            problems. They are architecture problems. Foundry diagnoses the
            structure before writing a single line of code.
          </p>
        </>
      }
      specialSection={
        <>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-10">
            What Foundry Builds
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUILD_TYPES.map((bt) => (
              <div
                key={bt.category}
                className="p-6 rounded-2xl border border-border bg-background"
              >
                <p className="text-sm font-semibold text-foreground mb-4">{bt.category}</p>
                <ul className="space-y-2">
                  {bt.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-foreground-muted">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
