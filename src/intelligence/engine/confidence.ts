/**
 * Intelligence Engine — Confidence
 * =================================
 *
 * Utilities for scoring how confident the system should be in a given answer
 * or retrieval match.
 *
 * Confidence scoring is the foundation of good routing:
 *   - A high-confidence knowledge match → answer deterministically, no LLM
 *     call needed (fast, free, no hallucination).
 *   - A low-confidence match → hand off to a generative provider with context.
 *   - A very low confidence → respond with a safe fallback or offer to route
 *     the user to a human (e.g. book a call).
 *
 * The scoring is now delegated to the knowledge provider's `retrieveKnowledge()`
 * which returns chunks with scores. These utilities wrap that output for
 * consumption by the router and for post-generation confidence estimation.
 */

import type { KnowledgeChunk, ProviderResult } from '../types';

/**
 * Extract the best (highest) relevance score from a set of retrieved chunks.
 *
 * @returns A number in [0, 1]. 0 when chunks is empty.
 */
export function scoreChunkRelevance(
    _query: string,
    chunks: KnowledgeChunk[],
): number {
    if (!chunks.length) return 0;
    return Math.max(...chunks.map((c) => c.score ?? 0));
}

/**
 * Estimate confidence in a generated answer.
 *
 * Useful for deciding whether to attach a suggested action ("want to talk to
 * a human?") or to suppress a low-quality response.
 *
 * Signals may include:
 *   - finishReason (a "length" cutoff lowers confidence)
 *   - whether retrieved context was actually cited
 *   - guardrail / safety classifier output
 *
 * TODO(future): implement more sophisticated scoring.
 */
export function scoreAnswerConfidence(result: ProviderResult): number {
    if (!result.content.trim()) return 0;
    if (result.finishReason === 'length') return 0.3;
    if (result.finishReason === 'stop') return 0.9;
    return 0.5; // unknown finish reason → moderate confidence
}
