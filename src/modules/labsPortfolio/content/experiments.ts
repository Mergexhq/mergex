// Labs Experiments Content
// Demo data for portfolio - will be replaced with real data

import type { LabsExperiment } from '../types';

export const LABS_EXPERIMENTS: LabsExperiment[] = [
    {
        id: 'genai-ad-campaign',
        slug: 'genai-advertisement-campaign',
        title: 'Multi-Platform Ad Campaign',
        category: 'visual',
        shortDescription: 'Complete advertisement suite for a luxury brand, generated and refined in 48 hours using Gen-AI workflows.',
        thumbnailImage: '/assets/experiments/ad-campaign-thumb.jpg',
        heroImage: '/assets/experiments/ad-campaign-hero.jpg',
        tags: ['Midjourney', 'Stable Diffusion', 'Photoshop AI', 'Custom LoRA'],
        createdBy: 'Labs Team',
        timeline: '48 hours',
        featured: true,
        visualAssets: {
            images: [
                '/assets/experiments/ad-1.jpg',
                '/assets/experiments/ad-2.jpg',
                '/assets/experiments/ad-3.jpg',
                '/assets/experiments/ad-4.jpg',
            ],
        },
        concept: 'Exploration of how Gen-AI can accelerate high-volume creative production while maintaining brand consistency. We trained a custom LoRA model on the brand\'s aesthetic and generated hundreds of variations across platforms.',
        technicalNotes: 'Custom Stable Diffusion LoRA trained on 150 brand images. Midjourney for initial concepts. AI-powered upscaling and refinement in Photoshop. Total generation time: 6 hours. Curation and refinement: 12 hours.',
    },
    {
        id: 'sara-motion-experiment',
        slug: 'sara-motion-graphics',
        title: 'Sara: AI Motion Identity',
        category: 'video',
        shortDescription: 'Experimental brand motion system featuring Sara, exploring the intersection of AI-generated visuals and dynamic brand storytelling.',
        thumbnailImage: '/assets/experiments/sara-motion-thumb.jpg',
        heroImage: '/assets/experiments/sara-motion-hero.jpg',
        tags: ['Runway Gen-3', 'After Effects', 'ComfyUI', 'GSAP'],
        createdBy: 'Sara',
        timeline: '5 days',
        featured: true,
        visualAssets: {
            videos: [
                '/assets/experiments/sara-intro.mp4',
                '/assets/experiments/sara-transition.mp4',
            ],
            images: [
                '/assets/experiments/sara-frame-1.jpg',
                '/assets/experiments/sara-frame-2.jpg',
            ],
        },
        concept: 'What if a brand identity could evolve and adapt in real-time? This experiment explores generative motion systems where Sara\'s visual presence responds to context, time, and interaction.',
        technicalNotes: 'Generated 300+ motion variations using Runway Gen-3. Composited in After Effects with procedural animation systems. Web integration using GSAP ScrollTrigger for reactive experiences.',
    },
    {
        id: 'generative-soundscape',
        slug: 'ai-audio-landscape',
        title: 'Ambient AI Soundscapes',
        category: 'audio',
        shortDescription: 'AI-composed ambient soundscapes for brand experiences, exploring emotional resonance through generative music systems.',
        thumbnailImage: '/assets/experiments/audio-thumb.jpg',
        heroImage: '/assets/experiments/audio-hero.jpg',
        tags: ['Suno AI', 'Udio', 'AIVA', 'Logic Pro'],
        createdBy: 'Labs Team',
        timeline: '3 days',
        visualAssets: {
            audio: [
                '/assets/experiments/soundscape-1.mp3',
                '/assets/experiments/soundscape-2.mp3',
                '/assets/experiments/soundscape-3.mp3',
            ],
            images: [
                '/assets/experiments/audio-viz-1.jpg',
                '/assets/experiments/audio-viz-2.jpg',
            ],
        },
        concept: 'Sound shapes emotion. This experiment explores how AI-generated music can create distinct emotional atmospheres for brand spaces, both digital and physical.',
        technicalNotes: 'Base compositions generated with Suno AI and Udio. Layering and refinement in Logic Pro. Real-time audio visualization systems for web integration. Exploring the boundary between composition and generation.',
    },
    {
        id: 'visual-identity-exploration',
        slug: 'generative-brand-system',
        title: 'Infinite Brand Systems',
        category: 'concept',
        shortDescription: 'A complete visual identity system generated through iterative AI prompting, exploring non-human approaches to brand design.',
        thumbnailImage: '/assets/experiments/brand-system-thumb.jpg',
        heroImage: '/assets/experiments/brand-system-hero.jpg',
        tags: ['GPT-4 Vision', 'Midjourney', 'Figma AI', 'Custom Scripts'],
        createdBy: 'Labs Team',
        timeline: '1 week',
        visualAssets: {
            images: [
                '/assets/experiments/brand-colors.jpg',
                '/assets/experiments/brand-typography.jpg',
                '/assets/experiments/brand-patterns.jpg',
                '/assets/experiments/brand-applications.jpg',
            ],
        },
        concept: 'What happens when we remove human aesthetic bias from brand design? This experiment uses AI to generate a complete visual system based purely on semantic meaning and conceptual relationships.',
        technicalNotes: 'GPT-4 Vision for concept analysis and strategic direction. Midjourney for visual generation across 500+ iterations. Custom Python scripts for color palette extraction and optimization. Figma for final system compilation.',
    },
];

// Gallery configuration
export const EXPERIMENTS_GALLERY_CONFIG = {
    headline: 'Experiments & Explorations',
    subheadline: 'Pushing the boundaries of what\'s possible with AI and creative technology.',
    description: 'Every experiment is a question. Every exploration is a discovery. This is where Sara and the Labs team explore the edge of creativity, technology, and possibility.',
} as const;
