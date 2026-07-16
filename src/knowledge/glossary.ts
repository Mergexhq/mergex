/**
 * MergeX Glossary
 *
 * Plain-English definitions of technical terms used across MergeX services.
 *
 * Intended for use by:
 *   - AI Chat Assistant (when explaining terms to non-technical clients)
 *   - AI Voice Receptionist (contextual understanding)
 *   - Future glossary / documentation pages
 *
 * TODO: Populate as the knowledge base grows.
 */

export interface GlossaryTerm {
    term: string;
    definition: string;
    /** Optional — related service ID from services.ts */
    relatedService?: string;
}

/**
 * Glossary entries. Expand as needed.
 */
export const GLOSSARY: GlossaryTerm[] = [
    {
        term: 'AI Agent',
        definition:
            'A software system that uses artificial intelligence to perform tasks autonomously — browsing the web, analysing data, making decisions, or triggering actions — with minimal human input.',
        relatedService: 'ai-systems',
    },
    {
        term: 'RAG',
        definition:
            'Retrieval-Augmented Generation. A technique where an AI model retrieves relevant information from a knowledge base before generating a response, making answers more accurate and grounded in real data.',
        relatedService: 'ai-systems',
    },
    {
        term: 'SaaS',
        definition:
            'Software as a Service. A software delivery model where applications are hosted in the cloud and accessed by users via a web browser, typically on a subscription basis.',
        relatedService: 'custom-software',
    },
    {
        term: 'Workflow Automation',
        definition:
            'The use of software to automatically execute a sequence of tasks that would otherwise require manual effort — such as processing form submissions, routing emails, syncing data between systems, or triggering notifications.',
        relatedService: 'ai-systems',
    },
    {
        term: 'LLM',
        definition:
            'Large Language Model. An AI model trained on large volumes of text data that can understand and generate human-like language. Examples include GPT-4 (OpenAI), Gemini (Google), and Claude (Anthropic).',
        relatedService: 'ai-systems',
    },
];
