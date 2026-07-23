/**
 * Intelligence Engine - Formatter
 * ===============================
 *
 * Normalises a provider's raw output into the single EngineResponse contract
 * that all surfaces (chat, voice, OS) consume.
 *
 * The formatter is responsible for:
 *   - Folding the router's decision into response metadata.
 *   - Surface-aware adaptation (future: strip markdown for voice, etc.).
 *   - Handling edge cases: empty content, no confident match, greetings.
 *
 * Why a formatter exists as a separate step:
 *   - Providers return provider-specific shapes (ProviderResult). Surfaces
 *     should never have to know which provider answered.
 *   - Surface-specific adaptation lives here, not in providers or the router.
 *   - It's where the router's decision is folded into response metadata.
 */

import type {
    ConversationSurface,
    EngineResponse,
    ProviderId,
    ProviderResult,
    ResponseMeta,
    RouterDecision,
    SuggestedAction,
} from '../types';

/**
 * Safe, deterministic fallbacks for when no provider produced confident content.
 * Keyed by surface so voice can get a shorter variant.
 */
const FALLBACK_RESPONSE: Record<ConversationSurface, string> = {
    chat:
        "I'm not entirely sure about that. Let me connect you with the MergeX team - they'll have a better answer. You can reach out through the contact page or email hello@mergex.in.",
    voice:
        "I'm not sure about that one. Let me connect you with someone from the MergeX team who can help.",
    os:
        "I don't have a confident answer for that. Suggest connecting the user to the MergeX team.",
    internal:
        'No confident answer available. Source: knowledge provider returned empty.',
};

const GREETING_RESPONSE: Record<ConversationSurface, string> = {
    chat:
        "Hey! I'm the MergeX AI assistant. I can tell you about what we build, how we work, and how to get started. What would you like to know?",
    voice:
        "Hi there! I'm the MergeX assistant. I can help you learn about our services or connect you with the team. What are you looking for?",
    os:
        'Greeting acknowledged. Awaiting user query.',
    internal:
        'Greeting received. No action needed.',
};

/**
 * Build a normalised EngineResponse from a provider result.
 */
export function formatResponse(
    result: ProviderResult,
    decision: RouterDecision,
    surface: ConversationSurface,
    latencyMs: number,
    suggestedAction?: SuggestedAction,
): EngineResponse {
    const provider: ProviderId = decision.provider;

    const meta: ResponseMeta = {
        latencyMs,
        routingReason: decision.reason,
        tokenUsage: result.tokenUsage,
    };

    // Surface-aware content selection.
    const content = selectContent(result, decision, surface);

    return {
        content,
        provider,
        suggestedAction,
        meta,
    };
}

/**
 * Select the final content string based on provider result state and surface.
 *
 * Handles:
 *   - Empty content from knowledge provider (no confident match) → fallback.
 *   - Greeting intent → greeting response (the knowledge provider returns
 *     empty for greetings, but the router should have intercepted this).
 *   - Normal content → pass through unchanged.
 */
function selectContent(
    result: ProviderResult,
    decision: RouterDecision,
    surface: ConversationSurface,
): string {
    // Normal case: provider returned real content.
    if (result.content.trim().length > 0) {
        return result.content;
    }

    // No content from provider - check finish reason for context.
    if (result.finishReason === 'no-confident-match' || result.finishReason === 'no-api-key') {
        return FALLBACK_RESPONSE[surface];
    }

    // Network / API error - safe fallback.
    return FALLBACK_RESPONSE[surface];
}

/**
 * Build a response for a greeting intent. Bypasses the provider entirely.
 */
export function formatGreetingResponse(surface: ConversationSurface): EngineResponse {
    return {
        content: GREETING_RESPONSE[surface],
        provider: 'knowledge',
        meta: {
            latencyMs: 0,
            routingReason: 'intent is greeting - handled deterministically',
        },
    };
}
