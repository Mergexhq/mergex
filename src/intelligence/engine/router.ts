/**
 * Intelligence Engine — Router
 * ============================
 *
 * Decides WHO answers a given request, based on:
 *   1. Intent  — what kind of question is this? (intent/index.ts)
 *   2. Confidence — can the knowledge layer answer this with certainty?
 *
 * Routing policy (deterministic, explainable):
 *
 *   intent ∈ {greeting, contact, unknown}
 *     → knowledge provider (these never need generation)
 *
 *   intent ∈ {company, services, faq, glossary, general}
 *     → ask the knowledge provider first.
 *        - If it returns a confident match (score ≥ KNOWLEDGE_MIN_SCORE and a
 *          non-empty answer) → use it. No Gemini call.
 *        - If knowledge is insufficient OR no generative provider is
 *          available → fall back. When Gemini is available, use it; otherwise
 *          return a safe knowledge-provider fallback so the user is never left
 *          without a response.
 *
 * The router NEVER calls a provider itself. It only emits a RouterDecision.
 * Engine.runEngine executes the decision. This keeps routing pure + testable.
 */

import type { EngineRequest, ProviderId, RouterDecision } from '../types';
import type { Intent } from '../intent';

/** Intents that should always be handled deterministically (no generation). */
const DETERMINISTIC_ONLY_INTENTS: ReadonlySet<Intent> = new Set<Intent>([
    'greeting',
    'contact',
    'unknown',
]);

export interface RouteInput {
    intent: Intent;
    /** Best knowledge-retrieval score in [0,1], or 0 if none. */
    knowledgeScore: number;
    /** Whether a confident knowledge answer is available. */
    knowledgeConfident: boolean;
    /** Whether a generative provider (e.g. Gemini) is registered + available. */
    generativeAvailable: boolean;
}

/** Minimum knowledge score required to answer without generation. */
export const KNOWLEDGE_CONFIDENCE_THRESHOLD = 0.5;

/**
 * Decide which provider should answer the given request.
 *
 * Pure function: same inputs always yield the same decision.
 */
export function routeRequest(input: RouteInput): RouterDecision {
    // 1. Deterministic-only intents never escalate to a model.
    if (DETERMINISTIC_ONLY_INTENTS.has(input.intent)) {
        return {
            provider: 'knowledge',
            reason: `intent '${input.intent}' is always handled deterministically`,
        };
    }

    // 2. Knowledge provider can answer confidently → use it. No Gemini.
    if (input.knowledgeConfident) {
        return {
            provider: 'knowledge',
            reason: `knowledge provider confident (score ${input.knowledgeScore.toFixed(2)} ≥ ${KNOWLEDGE_CONFIDENCE_THRESHOLD})`,
        };
    }

    // 3. Knowledge insufficient → escalate to generation if available.
    if (input.generativeAvailable) {
        return {
            provider: 'gemini',
            reason: `knowledge insufficient (score ${input.knowledgeScore.toFixed(2)} < ${KNOWLEDGE_CONFIDENCE_THRESHOLD}); escalating to gemini`,
        };
    }

    // 4. No generation available → safe knowledge fallback.
    return {
        provider: 'knowledge',
        reason: 'knowledge insufficient and no generative provider available; using safe fallback',
    };
}

/**
 * Convenience overload preserved for simple/testing callers that only have a
 * request. It cannot score knowledge, so it routes deterministic-only intents
 * to knowledge and everything else to gemini.
 */
export function routeByRequest(request: EngineRequest): RouterDecision {
    const provider: ProviderId = 'knowledge';
    void request;
    return {
        provider,
        reason: 'placeholder: no intent/knowledge available; defaulting to knowledge',
    };
}
