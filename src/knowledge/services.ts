/**
 * MergeX Services Knowledge
 *
 * Structured service definitions for use by:
 *   - AI Chat Assistant (to answer "what do you offer?" queries accurately)
 *   - AI Voice Receptionist (service routing and qualification)
 *   - Future /services page
 *   - schema.org Service structured data
 *
 * TODO: Populate with full service detail as the Services page is built.
 */

export interface ServiceItem {
    id: string;
    name: string;
    shortDescription: string;
    capabilities: string[];
    /** Optional — link to a dedicated service page when it exists */
    pageUrl?: string;
}

/**
 * MergeX core service definitions.
 * Expand each entry when the /services page is implemented (Milestone 10.2).
 */
export const SERVICES: ServiceItem[] = [
    {
        id: 'custom-software',
        name: 'Custom Software Development',
        shortDescription:
            'Web applications, SaaS platforms, internal tools, and business systems built to exact requirements.',
        capabilities: [
            'Web application development',
            'SaaS platform architecture',
            'Internal business tools',
            'API development and integration',
            'Database design and optimisation',
            'Legacy system modernisation',
        ],
    },
    {
        id: 'ai-systems',
        name: 'AI Systems and Automation',
        shortDescription:
            'AI agents, workflow automation, voice receptionists, chat assistants, and LLM integrations.',
        capabilities: [
            'AI voice receptionists',
            'AI chat assistants',
            'Workflow automation',
            'AI agent development',
            'LLM integration (GPT-4, Gemini, Claude)',
            'RAG knowledge base systems',
            'Business process automation',
        ],
    },
    {
        id: 'ai-creative',
        name: 'AI Creative Production',
        shortDescription:
            'AI-generated commercials, product films, brand content, and visual storytelling.',
        capabilities: [
            'AI-generated video commercials',
            'Product films and demonstrations',
            'Brand content and campaigns',
            'AI photography and imagery',
            'Motion graphics',
            'Post-production and editing',
        ],
    },
];
