import type { Metadata } from 'next';
import { worksData } from '@/modules/new-home/data/works';
import { PosterVideo } from '@/components/PosterVideo';

export const metadata: Metadata = {
  title: 'Launches',
  description:
    'Real-world system launches, platforms, and AI integrations built and deployed by MergeX.',
  alternates: {
    canonical: 'https://mergex.in/launches',
  },
};

export default function LaunchesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] block mb-6">
          Recent Launches
        </span>
        <h1 className="text-4xl md:text-6xl font-questrial font-bold tracking-tight max-w-2xl leading-[1.1] mb-6">
          Real work, launched in production.
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-xl leading-relaxed">
          We construct and deploy robust digital platforms, custom AI systems, and visual productions. Here is a curated selection of our work in active use.
        </p>
      </section>

      {/* Launches Feed */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="space-y-32 md:space-y-48">
          {worksData.map((project, index) => (
            <div
              key={project.id}
              className="flex flex-col gap-8 md:gap-12 group"
            >
              {/* Large Visual Section */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-black/5 shadow-sm">
                <PosterVideo
                  videoUrl={project.videoUrl}
                  posterUrl={project.posterUrl}
                  shouldPlay={true}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Text Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start px-2">
                <div className="lg:col-span-4">
                  <span className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-mono block mb-1">
                    Launch {project.id}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-questrial font-bold tracking-tight text-[var(--text-primary)]">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 font-light">
                    {project.category}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed font-light">
                    {project.summary}
                  </p>
                </div>

                <div className="lg:col-span-3 lg:text-right flex flex-wrap gap-2 lg:justify-end">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-black/10 hover:border-black/30 rounded-lg text-xs font-medium tracking-wide transition-colors bg-white/50 backdrop-blur-sm"
                    >
                      Visit Platform
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
