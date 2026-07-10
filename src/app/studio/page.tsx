import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'AI Creative Production by MergeX. AI Commercials, Brand Films, AI Photography, Motion Graphics, and Creative Experiments.',
  alternates: {
    canonical: 'https://mergex.in/studio',
  },
};

const STUDIO_ITEMS = [
  {
    id: '01',
    title: 'Mountain Dew Dynamic',
    category: 'AI Commercials',
    src: '/mockups/labs/Portfolio/Mountain_Dew_online-video-cutter.com.mp4',
    type: 'video',
  },
  {
    id: '02',
    title: 'Sara AI Persona 1',
    category: 'AI Photography',
    src: '/mockups/labs/Gallery/Sara_1.png',
    type: 'image',
  },
  {
    id: '03',
    title: 'Promo Ad Production',
    category: 'AI Product Videos',
    src: '/mockups/labs/Portfolio/ad.mp4',
    type: 'video',
  },
  {
    id: '04',
    title: 'Sara AI Persona 2',
    category: 'AI Photography',
    src: '/mockups/labs/Gallery/Sara_2.png',
    type: 'image',
  },
  {
    id: '05',
    title: 'WhatsApp Campaign Experiments',
    category: 'Motion Graphics',
    src: '/mockups/labs/Portfolio/WhatsApp_Video_2026-02-28_at_2.16.34_PM.mp4',
    type: 'video',
  },
  {
    id: '06',
    title: 'Sara AI Persona 3',
    category: 'AI Photography',
    src: '/mockups/labs/Gallery/Sara_3.jpg',
    type: 'image',
  },
  {
    id: '07',
    title: 'Sara AI Persona 4',
    category: 'AI Photography',
    src: '/mockups/labs/Gallery/Sara_4.png',
    type: 'image',
  },
  {
    id: '08',
    title: 'Sara AI Persona 5',
    category: 'Creative Experiments',
    src: '/mockups/labs/Gallery/Sara_5.jpg',
    type: 'image',
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-body">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] block mb-6">
          Creative Studio
        </span>
        <h1 className="text-4xl md:text-6xl font-questrial font-bold tracking-tight max-w-2xl leading-[1.1] mb-6">
          High-end AI creative production.
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-xl leading-relaxed">
          Unifying generative AI workflows, high-fidelity motion graphics, and cinematic post-production to create compelling brand assets and commercials.
        </p>
      </section>

      {/* Visual Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {STUDIO_ITEMS.map((item, index) => {
            const isLarge = index === 0 || index === 4;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-end overflow-hidden rounded-xl bg-[var(--bg-secondary)] border border-black/5 group aspect-[4/5] ${
                  isLarge ? 'lg:col-span-2 lg:aspect-video' : ''
                }`}
              >
                {/* Media Container */}
                <div className="absolute inset-0 w-full h-full">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                </div>

                {/* Overlaid Info */}
                <div className="relative z-10 p-6 md:p-8 text-white">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/70 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-questrial font-semibold leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
