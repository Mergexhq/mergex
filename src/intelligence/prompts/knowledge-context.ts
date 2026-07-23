/**
 * Intelligence Prompts - Knowledge Context Section
 * ================================================
 *
 * Turns retrieved KnowledgeChunk[] into a single grounding block that is
 * injected into the system prompt for generative providers.
 *
 * Why a separate file?
 *   - The system prompt (who MergeX is) is the same on every turn.
 *   - The knowledge context (facts relevant to THIS question) changes per turn.
 *   - Keeping them separate means retrieval can be swapped without touching
 *     prompt composition, and vice versa.
 *
 * No MergeX facts are hardcoded here - this file only FORMATS chunks that the
 * knowledge provider already retrieved from src/knowledge/.
 */

import type { KnowledgeChunk } from '../types';

/**
 * Default cap on how many retrieved chunks are injected into the prompt.
 * Keeps the context window bounded and the prompt cheap. Tunable per call.
 */
const DEFAULT_MAX_CHUNKS = 4;

export interface KnowledgeContextOptions {
    /** Maximum number of chunks to include. Defaults to 4. */
    maxChunks?: number;
}

/**
 * Build the "# Retrieved knowledge for this question" section of the prompt.
 *
 * @param chunks  Knowledge chunks retrieved for the current query.
 * @param options Formatting options.
 * @returns A prompt section string. Empty string when chunks is empty.
 */
export function buildKnowledgeContextSection(
    chunks: KnowledgeChunk[],
    options: KnowledgeContextOptions = {},
): string {
    if (!chunks.length) return '';

    const max = options.maxChunks ?? DEFAULT_MAX_CHUNKS;
    const selected = chunks.slice(0, max);

    const body = selected
        .map((chunk, index) => {
            const score = typeof chunk.score === 'number'
                ? ` (relevance ${(chunk.score * 100).toFixed(0)}%)`
                : '';
            return `### [${index + 1}] ${chunk.source}${score}\n${chunk.content}`;
        })
        .join('\n\n');

    return `# Retrieved knowledge for this question\nUse these facts to answer. Each is drawn from the MergeX knowledge layer.\n\n${body}`;
}
