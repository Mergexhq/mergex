// ─── Types ────────────────────────────────────────────────────────────────────
export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface Session {
    id: string;
    title: string;
    createdAt: number;
    messages: Message[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
export const SESSIONS_KEY = 'mergex_ai_sessions';
export const MAX_SESSIONS = 30;

export const SUGGESTIONS = [
    'Which MergeX solution fits my business?',
    'How can MergeX automate my workflows?',
    'What can MergeX build for my company?',
    'Should I start with Labs or Systems?',
];

export const PLACEHOLDERS = [
    'Describe your challenge...',
];

export const GUIDED_QUESTIONS = [
    {
        id: 'intent',
        question: 'What are you trying to do right now?',
        options: [
            { label: 'Explore AI for my business', value: 'explore' },
            { label: 'Build a product or platform', value: 'systems' },
            { label: 'Automate workflows', value: 'systems' },
            { label: 'Create AI-powered content', value: 'labs' },
        ],
    },
    {
        id: 'stage',
        question: 'Where are you in your journey?',
        options: [
            { label: 'Just exploring possibilities', value: 'exploring' },
            { label: 'Planning a solution', value: 'planning' },
            { label: 'Actively building something', value: 'building' },
            { label: 'Looking to scale an existing system', value: 'scaling' },
        ],
    },
    {
        id: 'need',
        question: 'What would help you most right now?',
        options: [
            { label: 'A clear system architecture', value: 'systems' },
            { label: 'AI tools or automation', value: 'systems' },
            { label: 'Creative AI content', value: 'labs' },
            { label: 'A technical partner to build it', value: 'contact' },
        ],
    },
];

export const INTENT_WORDS = [
    'build',
    'automation',
    'system',
    'website',
    'platform',
    'pricing',
    'project',
];
