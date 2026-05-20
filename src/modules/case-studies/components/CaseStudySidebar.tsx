'use client';

import Link from 'next/link';

const INDUSTRIES = ['All', 'Retail / E-commerce', 'Technology / SaaS', 'Professional Services', 'D2C'];

interface CaseStudySidebarProps {
  mode?: 'filter' | 'toc';
  activeIndustry?: string;
  sections?: { id: string; label: string; done?: boolean }[];
}

export function CaseStudySidebar({
  mode = 'filter',
  activeIndustry = 'All',
  sections = [],
}: CaseStudySidebarProps) {
  return (
    <>
      {/* ── Desktop: MergeX black+purple sidebar card ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 self-start h-[calc(100vh-0)] overflow-hidden bg-[#0A0A0A]">

        {/* Purple glow top-left */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/25 blur-[100px] rounded-full pointer-events-none z-0" />
        {/* Purple glow bottom-right */}
        <div className="absolute -bottom-24 -right-8 w-56 h-56 bg-violet-600/20 blur-[90px] rounded-full pointer-events-none z-0" />
        {/* Subtle noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-0"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Logo mark */}
        <div className="relative z-10 px-6 pt-6 pb-5 border-b border-white/8">
          <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6l-8-4z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
        </div>

        {/* Nav items */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-0.5">
          {mode === 'filter' ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 px-3 mb-4">
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
                    className={`group flex items-start gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-white/8' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'border-violet-400 bg-violet-500'
                        : 'border-white/20 bg-transparent'
                    }`}>
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                        {ind}
                      </p>
                      <p className="text-[11px] text-white/25 mt-0.5 leading-tight">
                        {ind === 'All' ? 'All industries' : `${ind} cases`}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 px-3 mb-4">
                Sections
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-start gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    section.done
                      ? 'border-violet-400 bg-violet-500'
                      : 'border-white/20'
                  }`}>
                    {section.done ? (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white/50 group-hover:text-white/80 leading-tight transition-colors">
                      {section.label}
                    </p>
                    {section.done && (
                      <p className="text-[11px] text-white/25 mt-0.5">Complete</p>
                    )}
                  </div>
                </a>
              ))}
            </>
          )}
        </nav>

        {/* Footer actions */}
        <div className="relative z-10 px-6 py-6 border-t border-white/8 flex items-center justify-between">
          <Link
            href="/insights/case-studies"
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            All Work
          </Link>
          <Link
            href="/contact"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Need help?
          </Link>
        </div>
      </aside>

      {/* ── Mobile: horizontal pills ── */}
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
                    ? 'bg-[#0A0A0A] text-white'
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
