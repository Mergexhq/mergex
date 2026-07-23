/**
 * MergeX Company Knowledge
 *
 * Structured facts about the company intended for use by:
 *   - AI Chat Assistant system prompts
 *   - AI Voice Receptionist knowledge base
 *   - RAG (Retrieval-Augmented Generation) pipelines
 *   - Structured data (schema.org Organization)
 *   - Internal documentation tooling
 *
 * Keep this file factual, current, and concise.
 * Avoid marketing language - this is a knowledge source, not a landing page.
 */

export interface FounderProfile {
    name: string;
    role: string;
    email: string;
}

export interface CompanyProfile {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    url: string;
    email: string;
    location: {
        city: string;
        state: string;
        country: string;
        countryCode: string;
    };
    founders: FounderProfile[];
    socialProfiles: {
        linkedin?: string;
        instagram?: string;
        x?: string;
    };
    foundedYear: number;
    corePillars: string[];
}

export const COMPANY: CompanyProfile = {
    name: 'MergeX',
    legalName: 'The MergeX Company',
    tagline: 'Custom Software & AI Systems',
    description:
        'MergeX is a software and AI engineering company based in Chennai, India. We design and build custom software, AI systems, automation workflows, and digital products for businesses that want to operate smarter and move faster.',
    url: 'https://mergex.in',
    email: 'hello@mergex.in',
    location: {
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        countryCode: 'IN',
    },
    founders: [
        {
            name: 'Manikandan S',
            role: 'Founder & CEO',
            email: 'manikandan@mergex.in',
        },
        {
            name: 'Sharukesh P',
            role: 'Co-founder & CIO',
            email: 'sharukesh@mergex.in',
        },
    ],
    socialProfiles: {
        linkedin: 'https://linkedin.com/company/mergex.co',
        instagram: 'https://www.instagram.com/mergex.co',
        x: 'https://x.com/mergex.co',
    },
    foundedYear: 2024,
    corePillars: [
        'Custom Software Development',
        'AI Systems and Automation',
        'AI Creative Production',
    ],
};
