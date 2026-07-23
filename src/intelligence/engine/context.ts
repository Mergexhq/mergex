/**
 * Intelligence Engine - Context Builder
 * ======================================
 *
 * Builds the RetrievedContext that accompanies a request into a provider.
 * Delegates the actual retrieval to the Knowledge Provider (which reads from
 * src/knowledge/) so this module owns NO MergeX facts and no retrieval logic -
 * it only shapes the output.
 *
 * Separating context-building from the provider is deliberate:
 *   - The router can decide NOT to call a provider at all if context alone
 *     fully answers the question (the knowledge-provider path).
 *   - The same retrieved context can be reused across providers, so swapping
 *     Gemini for OpenAI/Claude doesn't change what the model "knows".
 *   - Context assembly is independently testable.
 */

import type { EngineRequest, KnowledgeChunk, RetrievedContext } from '../types';
import { retrieveKnowledge } from '../providers/knowledge';

/** Default cap on chunks included in the context for a single turn. */
const DEFAULT_MAX_CHUNKS = 4;

export interface BuildContextOptions {
    /** Maximum chunks to return. Defaults to 4. */
    maxChunks?: number;
}

/**
 * Retrieve knowledge relevant to the current request.
 *
 * @param request  The normalized engine request.
 * @param options  Formatting options.
 * @returns A RetrievedContext (possibly empty) to attach to the provider call.
 */
export function buildContext(
    request: EngineRequest,
    options: BuildContextOptions = {},
): RetrievedContext {
    const max = options.maxChunks ?? DEFAULT_MAX_CHUNKS;
    const chunks: KnowledgeChunk[] = retrieveKnowledge(request.query).slice(0, max);

    return {
        chunks,
        retrieved: chunks.length > 0,
    };
}
