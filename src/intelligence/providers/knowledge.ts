/**
 * Intelligence Providers — Knowledge Provider
 * ===========================================
 *
 * The Knowledge Provider is the deterministic, hallucination-free answer path.
 * It answers questions using ONLY the MergeX knowledge layer
 * (src/knowledge/) — company facts, services, FAQs, and glossary terms.
 *
 * It performs NO generation and makes NO external API calls. Every answer is
 * a verbatim or faithfully-quoted fact that already exists in the knowledge
 * layer. This makes it:
 *   - free (no model cost)
 *   - zero-latency (no network round-trip)
 *   - safe (cannot invent facts)
 *   - auditable (every answer traces to a source)
 *
 * The provider exposes two kinds of functions:
 *   1. Reusable retrieval functions (getCompany, getServices, findFAQ, …)
 *      — structured data, usable by any caller (engine, UI, future APIs).
 *   2. The IntelligenceProvider.generate() contract — turns a request into a
 *      natural-language answer grounded in retrieved knowledge.
 *
 * IMPORTANT: This file never duplicates MergeX knowledge. It imports and
 * shapes data from src/knowledge/ only.
 */

import { COMPANY } from '@/knowledge/company';
import { SERVICES } from '@/knowledge/services';
import { FAQ_ITEMS } from '@/knowledge/faq';
import { GLOSSARY } from '@/knowledge/glossary';
import type { FAQItem } from '@/knowledge/faq';
import type { GlossaryTerm } from '@/knowledge/glossary';
import type { ServiceItem } from '@/knowledge/services';
import type {
    IntelligenceProvider,
    KnowledgeChunk,
    ProviderId,
    ProviderRequest,
    ProviderResult,
} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Reusable retrieval functions (structured data)
// ─────────────────────────────────────────────────────────────────────────────

/** Return the canonical MergeX company profile. */
export function getCompany() {
    return COMPANY;
}

/** Return all MergeX services. */
export function getServices(): ServiceItem[] {
    return SERVICES;
}

/** Return a single service by its id, or undefined. */
export function getServiceById(id: string): ServiceItem | undefined {
    return SERVICES.find((service) => service.id === id);
}

/** Return all FAQ items, optionally filtered by category. */
export function getFAQ(category?: FAQItem['category']): FAQItem[] {
    return category ? FAQ_ITEMS.filter((item) => item.category === category) : FAQ_ITEMS;
}

/** Return all glossary terms. */
export function getGlossary(): GlossaryTerm[] {
    return GLOSSARY;
}

/** Return a single glossary term by its (case-insensitive) name, or undefined. */
export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
    const needle = term.trim().toLowerCase();
    return GLOSSARY.find((entry) => entry.term.toLowerCase() === needle);
}

// ─────────────────────────────────────────────────────────────────────────────
// Knowledge retrieval for a query (RAG-style, deterministic)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise a string for matching: lowercase, collapse whitespace.
 */
function normalise(value: string): string {
    return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Score how strongly a query relates to a piece of text, in [0, 1].
 * Simple token-overlap heuristic — good enough for deterministic intent-style
 * matching and deliberately explainable. No embeddings required.
 */
function tokenOverlapScore(query: string, text: string): number {
    const queryTokens = new Set(normalise(query).split(' ').filter(Boolean));
    const textTokens = new Set(normalise(text).split(' ').filter(Boolean));
    if (queryTokens.size === 0 || textTokens.size === 0) return 0;

    let hits = 0;
    for (const token of queryTokens) {
        if (textTokens.has(token)) hits += 1;
    }
    return hits / queryTokens.size;
}

/**
 * Retrieve the knowledge chunks most relevant to a query, ranked by relevance.
 *
 * Returns structured KnowledgeChunk[] — the engine can decide whether the top
 * score is confident enough to answer directly, or whether to hand off to a
 * generative provider.
 */
export function retrieveKnowledge(query: string): KnowledgeChunk[] {
    const chunks: Array<{ chunk: KnowledgeChunk; score: number }> = [];

    // Company-level chunks.
    chunks.push({
        score: Math.max(
            tokenOverlapScore(query, COMPANY.name),
            tokenOverlapScore(query, COMPANY.description),
            tokenOverlapScore(query, COMPANY.tagline),
        ),
        chunk: {
            id: 'company:overview',
            source: 'company',
            content: COMPANY.description,
        },
    });

    chunks.push({
        score: tokenOverlapScore(query, `${COMPANY.name} founders founder founded ${COMPANY.founders.map((f) => f.name).join(' ')}`),
        chunk: {
            id: 'company:founders',
            source: 'company',
            content: COMPANY.founders
                .map((f) => `${f.name} — ${f.role} (${f.email})`)
                .join('\n'),
        },
    });

    chunks.push({
        score: tokenOverlapScore(query, `based located headquarters ${COMPANY.location.city} ${COMPANY.location.state} ${COMPANY.location.country}`),
        chunk: {
            id: 'company:location',
            source: 'company',
            content: `${COMPANY.name} is based in ${COMPANY.location.city}, ${COMPANY.location.state}, ${COMPANY.location.country}.`,
        },
    });

    // Service-level chunks.
    for (const service of SERVICES) {
        const haystack = [service.name, service.shortDescription, service.capabilities.join(' ')].join(' ');
        chunks.push({
            score: Math.max(
                tokenOverlapScore(query, service.name),
                tokenOverlapScore(query, haystack),
            ),
            chunk: {
                id: `service:${service.id}`,
                source: 'services',
                content: `${service.name}: ${service.shortDescription}\nCapabilities: ${service.capabilities.join(', ')}.`,
            },
        });
    }

    // FAQ chunks.
    for (const item of FAQ_ITEMS) {
        chunks.push({
            score: Math.max(
                tokenOverlapScore(query, item.question),
                tokenOverlapScore(query, item.answer),
            ),
            chunk: {
                id: `faq:${item.question}`,
                source: 'faq',
                content: `Q: ${item.question}\nA: ${item.answer}`,
            },
        });
    }

    // Glossary chunks.
    for (const entry of GLOSSARY) {
        chunks.push({
            score: Math.max(
                tokenOverlapScore(query, entry.term),
                tokenOverlapScore(query, entry.definition),
            ),
            chunk: {
                id: `glossary:${entry.term}`,
                source: 'glossary',
                content: `${entry.term}: ${entry.definition}`,
            },
        });
    }

    return chunks
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => ({ ...entry.chunk, score: entry.score }));
}

// ─────────────────────────────────────────────────────────────────────────────
// The IntelligenceProvider contract
// ─────────────────────────────────────────────────────────────────────────────

/** Stable id for this provider. */
export const KNOWLEDGE_PROVIDER_ID: ProviderId = 'knowledge';

/**
 * Compose a natural-language answer from the best retrieved knowledge chunk.
 *
 * The Knowledge Provider does NOT generate prose from scratch. It either:
 *   - returns the canonical FAQ answer verbatim, or
 *   - returns the retrieved fact with a light, fixed framing.
 *
 * If nothing relevant was retrieved, it returns an empty result so the router
 * can fall back to a generative provider.
 */
function composeAnswer(request: ProviderRequest): ProviderResult {
    const retrieved = retrieveKnowledge(request.query);
    const best = retrieved[0];

    if (!best || (best.score ?? 0) < KNOWLEDGE_MIN_SCORE) {
        // Insufficient deterministic knowledge — signal the engine to escalate.
        return { content: '', finishReason: 'no-confident-match' };
    }

    // FAQ matches are answered verbatim — already customer-ready prose.
    if (best.source === 'faq') {
        const faq = FAQ_ITEMS.find((item) => `faq:${item.question}` === best.id);
        if (faq) {
            return {
                content: faq.answer,
                finishReason: 'stop',
            };
        }
    }

    // Other sources are returned with a light, fixed framing.
    return {
        content: best.content,
        finishReason: 'stop',
    };
}

/** Minimum relevance score required for the knowledge provider to answer. */
export const KNOWLEDGE_MIN_SCORE = 0.5;

/**
 * The Knowledge Provider instance. Implements IntelligenceProvider.
 */
export const knowledgeProvider: IntelligenceProvider = {
    id: KNOWLEDGE_PROVIDER_ID,
    name: 'MergeX Knowledge Layer',
    isAvailable: () => true, // always available — pure local data
    generate: (request: ProviderRequest) => Promise.resolve(composeAnswer(request)),
};

/**
 * Factory kept for symmetry with other providers and to match the registry
 * pattern expected by the engine.
 */
export function createKnowledgeProvider(): IntelligenceProvider {
    return knowledgeProvider;
}
