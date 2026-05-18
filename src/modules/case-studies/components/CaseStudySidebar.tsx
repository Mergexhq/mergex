'use client';

import Link from 'next/link';

const INDUSTRIES = ['All', 'Retail / E-commerce', 'Technology / SaaS', 'Professional Services', 'D2C'];

interface CaseStudySidebarProps {
  mode?: 'filter' | 'toc';
  activeIndustry?: string;
  sections?: { id: string; label: string }[];
}

export function CaseStudySidebar({
  mode = 'filter',
  activeIndustry = 'All',
  sections = [],
}: CaseStudySidebarProps) {
  return (
    <>
      {/* ── Desktop: left sticky panel ─────────────────────────────── */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start">
        <div className="space-y-1">
          {mode === 'filter' ? (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                Industry
              </p>
              {INDUSTRIES.map((ind) => {
                const isActive = activeIndustry === ind;
                const href =
                  ind === 'All'
                    ? '/insights/case-studies'
                    : `/insights/case-studies?industry=${encodeURIComponent(ind)}`;
                return (
                  <Link
                    key={ind}
                    href={href}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground-muted hover:text-foreground hover:bg-background-subtle'
                    }`}
                  >
                    {ind}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                Sections
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 rounded-lg text-sm text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors duration-200"
                >
                  {section.label}
                </a>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* ── Mobile: horizontal pills ────────────────────────────────── */}
      {mode === 'filter' && (
        <div className="lg:hidden flex gap-2 flex-wrap mb-8">
          {INDUSTRIES.map((ind) => {
            const isActive = activeIndustry === ind;
            const href =
              ind === 'All'
                ? '/insights/case-studies'
                : `/insights/case-studies?industry=${encodeURIComponent(ind)}`;
            return (
              <Link
                key={ind}
                href={href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-background-subtle text-foreground-muted hover:text-foreground'
                }`}
              >
                {ind}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
