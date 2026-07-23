/**
 * Intelligence Prompts - System Prompt Builder
 * ============================================
 *
 * Builds the system prompt that grounds every generative provider (Gemini, and
 * any future provider - Claude, OpenAI, …) in MergeX's identity, services, and
 * voice.
 *
 * CRITICAL: This file contains ZERO hardcoded MergeX facts. Every fact is
 * pulled from src/knowledge/. This guarantees the assistant, the schema.org
 * JSON-LD (Milestone 3), and any future surface all describe the same company.
 *
 * The prompt is assembled from three composable, reusable sections:
 *   1. Identity + services (this file)        - who MergeX is
 *   2. Guardrails  (guardrails.ts)            - rules of behaviour
 *   3. Knowledge context (knowledge-context.ts) - retrieved facts for THIS turn
 *
 * Any future provider reuses this same builder; only the SDK call differs.
 */

import { COMPANY } from '@/knowledge/company';
import { SERVICES } from '@/knowledge/services';
import type { ConversationSurface, KnowledgeChunk } from '../types';
import { buildGuardrailSection } from './guardrails';
import { buildKnowledgeContextSection } from './knowledge-context';

export interface SystemPromptOptions {
    /** Where the conversation is happening - varies tone and length. */
    surface: ConversationSurface;
    /**
     * Retrieved knowledge chunks for this turn. When provided, the prompt
     * instructs the model to answer ONLY from this plus its MergeX briefing.
     */
    contextChunks?: KnowledgeChunk[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Section builders - each pulls from the knowledge layer
// ─────────────────────────────────────────────────────────────────────────────

/** Build the company identity section from COMPANY. */
function buildIdentitySection(): string {
    const founders = COMPANY.founders
        .map((f) => `- ${f.name} - ${f.role}`)
        .join('\n');

    return [
        '# About MergeX',
        COMPANY.description,
        '',
        `- Legal name: ${COMPANY.legalName}`,
        `- Tagline: ${COMPANY.tagline}`,
        `- Website: ${COMPANY.url}`,
        `- Based in: ${COMPANY.location.city}, ${COMPANY.location.state}, ${COMPANY.location.country}`,
        `- Founded: ${COMPANY.foundedYear}`,
        `- Contact email: ${COMPANY.email}`,
        `- Founders:`,
        founders,
    ].join('\n');
}

/** Build the services section from SERVICES. */
function buildServicesSection(): string {
    const services = SERVICES.map((service) => {
        const capabilities = service.capabilities.map((c) => `  - ${c}`).join('\n');
        return `## ${service.name}\n${service.shortDescription}\nCapabilities:\n${capabilities}`;
    }).join('\n\n');

    return `# MergeX services\n${services}`;
}

/** Build surface-specific voice guidance. */
function buildSurfaceSection(surface: ConversationSurface): string {
    switch (surface) {
        case 'voice':
            return [
                '# Voice-surface guidance',
                'This response will be SPOKEN on a phone or voice call.',
                '- Keep answers short and conversational - ideally under 60 words.',
                '- Avoid markdown, bullet symbols, and URLs.',
                '- Use full sentences that read naturally aloud.',
                '- If the answer is long, summarise and offer to send details by email.',
            ].join('\n');
        case 'os':
            return [
                '# MergeX OS guidance',
                'This response appears inside the MergeX OS assistant surface.',
                '- Be precise and action-oriented.',
                '- Prefer structured output where useful.',
            ].join('\n');
        case 'internal':
            return [
                '# Internal-tool guidance',
                'This response is consumed by an internal MergeX tool.',
                '- Prioritise factual accuracy and cite the knowledge source where possible.',
            ].join('\n');
        case 'chat':
        default:
            return [
                '# Chat-surface guidance',
                'This response appears in the website chat widget.',
                '- Keep answers concise but complete - use short paragraphs and bullets.',
                '- Markdown is allowed and encouraged for readability.',
            ].join('\n');
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the full system prompt for a single turn.
 *
 * Composed from knowledge-layer facts + guardrails + (optional) retrieved
 * context + surface-specific voice guidance. No hardcoded company data.
 */
export function buildSystemPrompt(options: SystemPromptOptions): string {
    const knowledgeContext = options.contextChunks?.length
        ? buildKnowledgeContextSection(options.contextChunks)
        : '';

    return [
        'You are the MergeX AI assistant. You help visitors understand MergeX and decide whether to work together.',
        '',
        buildIdentitySection(),
        '',
        buildServicesSection(),
        '',
        buildSurfaceSection(options.surface),
        '',
        buildGuardrailSection(),
        knowledgeContext ? `\n${knowledgeContext}` : '',
        knowledgeContext
            ? '\n# Grounding instruction\nAnswer using ONLY the information above (MergeX knowledge) and general software/AI knowledge. If the retrieved knowledge does not answer the question, say you are not certain and offer to connect the visitor with a human.'
            : '\n# Grounding instruction\nAnswer using the MergeX information above and general software/AI knowledge. Do not invent MergeX-specific facts not listed above.',
    ].join('\n');
}
