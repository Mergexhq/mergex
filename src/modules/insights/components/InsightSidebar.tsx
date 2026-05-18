'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CATEGORIES = ['All', 'Systems', 'Operations', 'Strategy', 'Leadership'];

interface InsightSidebarProps {
  /** 'filter' mode: used on list page (category links) */
  /** 'toc' mode: used on detail page (section anchors) */
  mode?: 'filter' | 'toc';
  activeCategory?: string;
  sections?: { id: string; label: string }[];
}

export function InsightSidebar({
  mode = 'filter',
  activeCategory = 'All',
  sections = [],
}: InsightSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop: left sticky panel ─────────────────────────────── */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start">
        <div className="space-y-1">
          {mode === 'filter' ? (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                Topics
              </p>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const href = cat === 'All' ? '/insights' : `/insights?category=${cat}`;
                return (
                  <Link
                    key={cat}
                    href={href}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground-muted hover:text-foreground hover:bg-background-subtle'
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-4">
                On this page
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
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const href = cat === 'All' ? '/insights' : `/insights?category=${cat}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-background-subtle text-foreground-muted hover:text-foreground'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
