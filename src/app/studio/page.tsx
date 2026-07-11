import type { Metadata } from 'next';
import StudioClient from './StudioClient';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'AI Creative Production by MergeX. AI Commercials, Brand Films, AI Photography, Motion Graphics, and Creative Experiments.',
  alternates: {
    canonical: 'https://mergex.in/studio',
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
