/**
 * MergeX Knowledge Base — Public Index
 *
 * This file re-exports everything from the knowledge layer.
 * Import from here when you need multiple knowledge sources in one place.
 *
 * Usage:
 *   import { FAQ_ITEMS, COMPANY, SERVICES } from '@/knowledge';
 *
 * Each module can also be imported directly:
 *   import { FAQ_ITEMS } from '@/knowledge/faq';
 *   import { COMPANY }   from '@/knowledge/company';
 *   import { SERVICES }  from '@/knowledge/services';
 *   import { GLOSSARY }  from '@/knowledge/glossary';
 *
 * Future additions:
 *   - case-studies.ts  — client project summaries for RAG and case study pages
 *   - process.ts       — how MergeX engages with clients, step by step
 *   - pricing.ts       — engagement model and pricing philosophy
 */

export type { FAQItem } from './faq';
export { FAQ_ITEMS, getFAQItems } from './faq';

export type { CompanyProfile, FounderProfile } from './company';
export { COMPANY } from './company';

export type { ServiceItem } from './services';
export { SERVICES } from './services';

export type { GlossaryTerm } from './glossary';
export { GLOSSARY } from './glossary';
