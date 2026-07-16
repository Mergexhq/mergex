/**
 * MergeX FAQ Knowledge Layer
 *
 * This file is the single source of truth for all FAQ content.
 *
 * It is consumed by:
 *   - The FAQ UI component (src/components/FAQ.tsx)
 *   - The FAQPage JSON-LD structured data (src/app/page.tsx)
 *   - Future: AI Chat Assistant system prompt / RAG context
 *   - Future: AI Voice Receptionist knowledge base
 *   - Future: Documentation and internal knowledge tooling
 *
 * Rules for this file:
 *   - Keep answers factual and accurate.
 *   - Use clear, natural language — no marketing fluff.
 *   - Each answer should be useful to a real customer asking the question.
 *   - Do not add HTML or JSX — plain text only.
 *   - Use "\n\n" for paragraph breaks where needed.
 */

export interface FAQItem {
    /** The question as a customer would ask it. Used in UI and JSON-LD. */
    question: string;
    /** The plain-text answer. Used in UI and JSON-LD. */
    answer: string;
    /**
     * Optional category for future filtering, search, or AI routing.
     * Examples: 'services' | 'process' | 'ai' | 'pricing' | 'general'
     */
    category?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
    {
        category: 'general',
        question: 'What does MergeX do?',
        answer:
            'MergeX is a software and AI engineering company based in Chennai, India. We design and build custom software, AI systems, automation workflows, and digital products for businesses across different industries.\n\nOur work spans three core areas: custom software development, AI integration and automation, and AI-powered creative production. We take on projects end-to-end — from architecture and development through to deployment and support.',
    },
    {
        category: 'services',
        question: 'What services does MergeX offer?',
        answer:
            'Our core services are:\n\n• Custom Software Development — web applications, SaaS platforms, internal tools, and business systems built to your exact requirements.\n\n• AI Systems and Automation — AI agents, workflow automation, AI voice receptionists, AI chat assistants, and integrations that connect AI capabilities into your existing operations.\n\n• AI Creative Production — AI-generated commercials, product films, brand content, and visual storytelling for businesses that want high-quality creative output without traditional production costs.\n\nEvery engagement is built around what the project actually needs, not a fixed service package.',
    },
    {
        category: 'ai',
        question: 'Do you build AI systems and automation?',
        answer:
            'Yes. AI systems and automation are a core part of what we build at MergeX.\n\nThis includes AI voice receptionists that handle inbound calls and enquiries, AI chat assistants trained on your business knowledge, workflow automation that connects your tools and eliminates manual processes, AI agents for research, data processing, and decision support, and custom integrations with large language models like GPT, Claude and Gemini.\n\nIf you have a repetitive process, a customer-facing interaction, or a knowledge management problem, there is usually an AI solution that can help.',
    },
    {
        category: 'services',
        question: 'Can MergeX improve or modernize existing software?',
        answer:
            'Yes. We work on new builds and existing systems. Many of our clients come to us with software that has grown outdated, difficult to maintain, or no longer suited to where the business is heading.\n\nWe can audit existing codebases, redesign and rebuild core functionality, migrate to modern technology stacks, integrate new capabilities into legacy systems, and improve performance and reliability without starting from scratch where that is not necessary.',
    },
    {
        category: 'services',
        question: 'Do you build SaaS products?',
        answer:
            'Yes. We have experience building SaaS platforms from the ground up — including multi-tenant architecture, subscription and payment integration, user management, analytics, and admin tooling.\n\nWe can also help existing SaaS businesses improve their products, add new features, reduce technical debt, or integrate AI capabilities into their platforms.',
    },
    {
        category: 'process',
        question: 'How does your development process work?',
        answer:
            'Every project begins with a discovery phase where we take time to understand the problem, the business context, and the desired outcomes before any development starts.\n\nFrom there, we move into architecture and planning, followed by iterative development with regular checkpoints. We keep communication clear and consistent throughout — you always know what is being built, why decisions are being made, and what comes next.\n\nWe do not use fixed templates or rigid processes. The approach is shaped by the project.',
    },
    {
        category: 'process',
        question: 'How long do projects typically take?',
        answer:
            'Project timelines depend on scope and complexity. A focused automation workflow or a standalone AI integration can be completed in a few weeks. A full custom software platform or SaaS product typically takes several months of active development.\n\nDuring our initial conversation, we will give you a realistic estimate based on your specific requirements — not a generic range designed to win a sale.',
    },
    {
        category: 'general',
        question: 'What industries do you work with?',
        answer:
            'We have worked with businesses in e-commerce, B2B industrial sectors, professional services, creative industries, healthcare, education, and technology.\n\nThe industry matters less than the problem being solved. If your business has a real software, automation, or AI challenge, we will engage with it regardless of sector.',
    },
    {
        category: 'general',
        question: 'Do you work with international clients?',
        answer:
            'Yes. MergeX works with clients across India and internationally. Our entire workflow is designed for remote collaboration — structured communication, clear documentation, and consistent delivery regardless of time zone.',
    },
    {
        category: 'process',
        question: 'How do I start working with MergeX?',
        answer:
            'The simplest way to start is to reach out through our contact page. Share what you are working on or what problem you are trying to solve, and we will get back to you to arrange a conversation.\n\nThere is no obligation in an initial discussion. We take the time to understand your situation properly before making any recommendations.',
    },
];

/**
 * Returns all FAQ items, optionally filtered by category.
 *
 * @example
 * getFAQItems()              // all items
 * getFAQItems('ai')          // only AI-related questions
 * getFAQItems('services')    // only service questions
 */
export function getFAQItems(category?: FAQItem['category']): FAQItem[] {
    if (!category) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === category);
}
