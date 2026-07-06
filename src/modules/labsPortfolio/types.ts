// Labs Portfolio Types
// Visual-first experiment and exploration structure

export type ExperimentCategory = 'visual' | 'video' | 'audio' | 'concept';
export type CreatorType = 'Sara' | 'Labs Team';

export interface VisualAssets {
    images?: string[];
    videos?: string[];
    audio?: string[];
}

export interface LabsExperiment {
    id: string;
    slug: string;
    title: string;
    category: ExperimentCategory;
    shortDescription: string; // 1-2 lines for card display
    thumbnailImage: string;
    heroImage?: string;
    tags: string[]; // AI tools/techniques used
    createdBy: CreatorType;
    timeline: string; // "2 days", "1 week", etc.
    visualAssets: VisualAssets;

    // Optional deeper content
    concept?: string; // Expanded explanation of the concept
    technicalNotes?: string; // Technical details for interested viewers
    featured?: boolean; // Highlight on gallery
}

export interface ExperimentFilter {
    category: ExperimentCategory | 'all';
}
