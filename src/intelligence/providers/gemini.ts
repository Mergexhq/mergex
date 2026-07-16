/**
 * Intelligence Providers — Gemini Provider
 * ========================================
 *
 * The Gemini Provider is the generative fallback. It receives a fully prepared
 * context (system prompt + retrieved knowledge + conversation history) and
 * asks Google AI Studio (Gemini) to generate an answer.
 *
 * Provider responsibility boundary (enforced here):
 *   This provider ONLY:
 *     ✓ receives prepared context
 *     ✓ calls the Gemini API
 *     ✓ returns a structured ProviderResult
 *
 *   It does NOT (and never will):
 *     ✗ build prompts         (that's prompts/system.ts)
 *     ✗ choose providers       (that's engine/router.ts)
 *     ✗ determine intent       (that's intent/index.ts)
 *     ✗ format final responses (that's engine/formatter.ts)
 *
 * Implementation note: the Gemini SDK (@google/genai) is intentionally NOT a
 * dependency. We call the Google AI Studio REST API directly via fetch — this
 * keeps the provider self-contained, adds no dependency weight, and makes the
 * abstraction boundary crisp. Swapping to the SDK later is a drop-in change
 * inside this file only.
 *
 * Auth: reads the API key from GEMINI_API_KEY. Never hardcoded.
 */

import type {
    IntelligenceProvider,
    ProviderId,
    ProviderRequest,
    ProviderResult,
    TokenUsage,
} from '../types';

/** Stable id for this provider. */
export const GEMINI_PROVIDER_ID: ProviderId = 'gemini';

/** Environment variable holding the Google AI Studio API key. */
const GEMINI_API_KEY_ENV = 'GEMINI_API_KEY';

/**
 * Default model identifier on Google AI Studio.
 * Kept as a constant so model upgrades are a one-line change.
 */
const DEFAULT_MODEL = 'gemini-2.0-flash';

/**
 * Configuration for the Gemini provider. All fields have sensible defaults so
 * callers can usually do `createGeminiProvider()`.
 */
export interface GeminiProviderConfig {
    /** Google AI Studio API key. Defaults to process.env.GEMINI_API_KEY. */
    apiKey?: string;
    /** Model id, e.g. 'gemini-2.0-flash'. */
    model?: string;
    /**
     * Generation config. Defaults tuned for a helpful, grounded assistant.
     */
    temperature?: number;
    maxOutputTokens?: number;
    /** Optional override of the REST endpoint base URL (for testing). */
    endpointBaseUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// REST API shape (Google AI Studio generateContent)
// ─────────────────────────────────────────────────────────────────────────────

/** Request body sent to the Gemini REST API. */
interface GeminiRequestBody {
    system_instruction?: {
        parts: Array<{ text: string }>;
    };
    contents: Array<{
        role: 'user' | 'model';
        parts: Array<{ text: string }>;
    }>;
    generationConfig: {
        temperature: number;
        maxOutputTokens: number;
    };
}

/** Expected response body from the Gemini REST API. */
interface GeminiResponseBody {
    candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
        finishReason?: string;
    }>;
    usageMetadata?: {
        promptTokenCount?: number;
        candidatesTokenCount?: number;
        totalTokenCount?: number;
    };
    error?: { message?: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider implementation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a Gemini IntelligenceProvider.
 *
 * The provider is isolated behind the IntelligenceProvider abstraction, so the
 * engine never imports Gemini-specific types or the REST shapes above.
 */
export function createGeminiProvider(
    config: GeminiProviderConfig = {},
): IntelligenceProvider {
    const apiKey = config.apiKey ?? process.env[GEMINI_API_KEY_ENV];
    const model = config.model ?? DEFAULT_MODEL;
    const temperature = config.temperature ?? 0.4;
    const maxOutputTokens = config.maxOutputTokens ?? 1024;
    const endpointBaseUrl =
        config.endpointBaseUrl ?? 'https://generativelanguage.googleapis.com';

    return {
        id: GEMINI_PROVIDER_ID,
        name: 'Google Gemini (AI Studio)',

        isAvailable: () => Boolean(apiKey),

        generate: async (request: ProviderRequest): Promise<ProviderResult> => {
            if (!apiKey) {
                // No key → provider cannot serve. Engine will treat this as
                // unavailable and surface a safe fallback via the formatter.
                return {
                    content: '',
                    finishReason: 'no-api-key',
                };
            }

            const body: GeminiRequestBody = {
                system_instruction: request.systemPrompt
                    ? { parts: [{ text: request.systemPrompt }] }
                    : undefined,
                contents: [
                    ...request.history.map((message) => ({
                        role: (message.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
                        parts: [{ text: message.content }],
                    })),
                    { role: 'user', parts: [{ text: request.query }] },
                ],
                generationConfig: { temperature, maxOutputTokens },
            };

            const url = `${endpointBaseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;

            let json: GeminiResponseBody;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                json = (await response.json()) as GeminiResponseBody;
            } catch (err) {
                return {
                    content: '',
                    finishReason: 'network-error',
                };
            }

            if (json.error) {
                return { content: '', finishReason: 'api-error' };
            }

            const candidate = json.candidates?.[0];
            const content = candidate?.content?.parts?.map((p) => p.text ?? '').join('').trim() ?? '';

            let tokenUsage: TokenUsage | undefined;
            if (json.usageMetadata) {
                tokenUsage = {
                    prompt: json.usageMetadata.promptTokenCount ?? 0,
                    completion: json.usageMetadata.candidatesTokenCount ?? 0,
                    total: json.usageMetadata.totalTokenCount ?? 0,
                };
            }

            return {
                content,
                tokenUsage,
                finishReason: candidate?.finishReason ?? 'stop',
            };
        },
    };
}
