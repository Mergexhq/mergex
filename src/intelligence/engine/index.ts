/**
 * Intelligence Engine - Pipeline
 * ==============================
 *
 * The engine is the orchestration layer. For each request it runs a fixed
 * pipeline:
 *
 *      ┌─────────────┐     ┌──────────────┐     ┌──────────┐     ┌────────────┐
 *      │   Intent     │ ──▶ │   Context    │ ──▶ │ Provider │ ──▶ │ Formatter  │
 *      │  Detection   │     │  Retrieval   │     │ generates│     │ normalises │
 *      └─────────────┘     └──────────────┘     └──────────┘     └────────────┘
 *           │                                         ▲
 *           ▼                                         │
 *      ┌─────────────┐                               │
 *      │   Router     │ ──────────────────────────────┘
 *      │ who answers  │
 *      └─────────────┘
 *
 * Each stage is a pure, independently testable module. The engine sequences
 * them and times the result.
 *
 * Routing decision is based on intent + confidence:
 *   - High confidence knowledge match → knowledge provider (no Gemini).
 *   - Low confidence / no match → Gemini (if available) or safe fallback.
 *
 * Status: FULLY FUNCTIONAL (Milestones 4.2–4.5).
 */

import type {
    EngineRequest,
    EngineResponse,
    IntelligenceProvider,
} from '../types';
import type { Intent, IntentResult } from '../intent';
import { detectIntent } from '../intent';
import { retrieveKnowledge, KNOWLEDGE_MIN_SCORE } from '../providers/knowledge';
import { routeRequest, KNOWLEDGE_CONFIDENCE_THRESHOLD } from './router';
import { buildContext } from './context';
import { formatResponse, formatGreetingResponse } from './formatter';
import { buildSystemPrompt } from '../prompts/system';

export { routeRequest } from './router';
export { buildContext } from './context';
export { formatResponse, formatGreetingResponse } from './formatter';
export {
    scoreChunkRelevance,
    scoreAnswerConfidence,
} from './confidence';

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Registry of providers available to the engine, keyed by ProviderId.
 * Populated by createProviderRegistry() (in providers/index.ts).
 */
export type ProviderRegistry = Record<string, IntelligenceProvider>;

// ─────────────────────────────────────────────────────────────────────────────
// Pipeline
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Execute the full intelligence pipeline for a single request.
 *
 * Pipeline:
 *   1. Detect intent (deterministic, no model).
 *   2. Retrieve knowledge (deterministic, from src/knowledge/).
 *   3. Route: decide which provider answers, based on intent + confidence.
 *   4. If greeting → return immediately (no provider call).
 *   5. Build system prompt from knowledge layer.
 *   6. Call the chosen provider.
 *   7. Format the response into a normalised EngineResponse.
 *
 * @param request   The normalized engine request from any surface.
 * @param providers The populated provider registry.
 * @returns A normalized EngineResponse any surface can render.
 */
export async function runEngine(
    request: EngineRequest,
    providers: ProviderRegistry = {},
): Promise<EngineResponse> {
    const pipelineStart = Date.now();

    // ── Stage 1: Intent Detection ──────────────────────────────────────────
    const intentResult: IntentResult = detectIntent(request.query);

    // ── Stage 2: Knowledge Retrieval ──────────────────────────────────────
    const chunks = retrieveKnowledge(request.query);
    const bestScore = chunks[0]?.score ?? 0;
    const knowledgeConfident = bestScore >= KNOWLEDGE_MIN_SCORE;

    // ── Stage 3: Routing ───────────────────────────────────────────────────
    const generativeAvailable = Boolean(
        (providers.gemini as IntelligenceProvider | undefined)?.isAvailable?.(),
    );

    const decision = routeRequest({
        intent: intentResult.intent,
        knowledgeScore: bestScore,
        knowledgeConfident,
        generativeAvailable,
    });

    // ── Stage 4: Shortcut - greeting ───────────────────────────────────────
    if (intentResult.intent === 'greeting') {
        return formatGreetingResponse(request.surface);
    }

    // ── Stage 5: Build system prompt (from knowledge layer) ────────────────
    const context = buildContext(request);
    const systemPrompt = buildSystemPrompt({
        surface: request.surface,
        contextChunks: context.retrieved ? context.chunks : undefined,
    });

    // ── Stage 6: Call the chosen provider ───────────────────────────────────
    const provider = providers[decision.provider] as IntelligenceProvider | undefined;

    if (!provider || !provider.isAvailable()) {
        // Provider missing or unavailable → safe fallback.
        return formatResponse(
            { content: '', finishReason: 'no-confident-match' },
            decision,
            request.surface,
            Date.now() - pipelineStart,
        );
    }

    const providerStart = Date.now();

    const result = await provider.generate({
        query: request.query,
        history: request.history,
        systemPrompt,
        context,
        surface: request.surface,
    });

    const providerLatency = Date.now() - providerStart;

    // ── Stage 7: Format response ───────────────────────────────────────────
    return formatResponse(
        result,
        decision,
        request.surface,
        providerLatency,
    );
}

/**
 * Pure helper for testing: run intent detection + knowledge retrieval WITHOUT
 * calling any provider. Returns the intermediate pipeline state for assertions.
 */
export function inspectRequest(request: EngineRequest) {
    const intentResult = detectIntent(request.query);
    const chunks = retrieveKnowledge(request.query);
    const bestScore = chunks[0]?.score ?? 0;

    return {
        intent: intentResult,
        bestChunk: chunks[0] ?? null,
        knowledgeScore: bestScore,
        knowledgeConfident: bestScore >= KNOWLEDGE_MIN_SCORE,
        allChunks: chunks,
    };
}
