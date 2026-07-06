// Labs Portfolio Constants

export const EXPERIMENT_CATEGORIES = {
    ALL: 'all',
    VISUAL: 'visual',
    VIDEO: 'video',
    AUDIO: 'audio',
    CONCEPT: 'concept',
} as const;

export const CATEGORY_LABELS = {
    all: 'All Experiments',
    visual: 'Visual',
    video: 'Video',
    audio: 'Audio',
    concept: 'Concepts',
} as const;

export const GALLERY_CONFIG = {
    GRID_COLS_MOBILE: 1,
    GRID_COLS_TABLET: 2,
    GRID_COLS_DESKTOP: 3,
    ANIMATION_STAGGER: 0.1,
} as const;
