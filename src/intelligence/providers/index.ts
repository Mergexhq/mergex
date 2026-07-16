/**
 * Intelligence Providers — Registry
 * =================================
 *
 * The registry wires concrete providers (knowledge, gemini, openai, …) into
 * the engine WITHOUT the engine knowing any concrete class. The engine depends
 * only on the IntelligenceProvider interface + this registry shape.
 *
 * Registration is environment-aware and lazy:
 *   - The knowledge provider is always registered (pure local data).
 *   - The Gemini provider is registered only when its API key is present, so
 *     the engine degrades gracefully (knowledge-only) when no key is set.
 *
 * Adding a provider = one adapter file + one line here. Nothing else changes.
 */

import type { IntelligenceProvider, ProviderId } from '../types';
import { createKnowledgeProvider } from './knowledge';
import { createGeminiProvider } from './gemini';

export { createKnowledgeProvider, knowledgeProvider } from './knowledge';
export { KNOWLEDGE_PROVIDER_ID, KNOWLEDGE_MIN_SCORE } from './knowledge';
export { createGeminiProvider, GEMINI_PROVIDER_ID } from './gemini';
export type { GeminiProviderConfig } from './gemini';

/**
 * The set of providers currently registered with the intelligence layer,
 * keyed by ProviderId. Partial because not every provider is always available.
 */
export type ProviderRegistry = Partial<Record<ProviderId, IntelligenceProvider>>;

/**
 * Build the default provider registry from the current environment.
 *
 * - Knowledge provider: always registered.
 * - Gemini provider: registered only when GEMINI_API_KEY is set.
 *
 * Future providers (OpenAI, Claude, …) follow the same pattern.
 */
export function createProviderRegistry(): ProviderRegistry {
    const registry: ProviderRegistry = {
        knowledge: createKnowledgeProvider(),
    };

    if (process.env.GEMINI_API_KEY) {
        registry.gemini = createGeminiProvider();
    }

    return registry;
}

/**
 * Resolve a provider from the registry, with an availability check.
 *
 * Returns undefined when the provider isn't registered or isn't currently
 * available — the router/engine can use this to decide failover.
 */
export function resolveProvider(
    registry: ProviderRegistry,
    id: ProviderId,
): IntelligenceProvider | undefined {
    const provider = registry[id];
    if (!provider || !provider.isAvailable()) return undefined;
    return provider;
}
