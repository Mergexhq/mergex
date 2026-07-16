/**
 * MergeX Intelligence Layer
 * =========================
 *
 * Fully functional intelligence engine powering every conversational surface
 * at MergeX: website AI assistant, voice receptionist, future OS assistant,
 * and internal tooling.
 *
 * Architecture:
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │                       src/intelligence/                      │
 *   │                                                              │
 *   │   types.ts        core contracts (provider-agnostic)         │
 *   │                                                              │
 *   │   engine/         orchestration: intent → context → provider   │
 *   │     router.ts       decides WHO answers (intent + confidence) │
 *   │     context.ts      builds what the provider knows (RAG)      │
 *   │     formatter.ts    normalises provider output               │
 *   │     confidence.ts   relevance + answer confidence scoring    │
 *   │     index.ts        barrel + runEngine pipeline              │
 *   │                                                              │
 *   │   intent/         deterministic intent classification          │
 *   │                                                              │
 *   │   providers/      vendor adapters (knowledge, gemini, …)     │
 *   │     knowledge.ts    deterministic, hallucination-free          │
 *   │     gemini.ts       Google AI Studio (REST, no SDK dep)      │
 *   │                                                              │
 *   │   prompts/        system prompt + guardrails + context       │
 *   │     system.ts        built dynamically from src/knowledge/    │
 *   │     guardrails.ts    hard scope + conduct rules               │
 *   │     knowledge-context.ts  retrieved chunk formatting          │
 *   │                                                              │
 *   │   memory/         reserved: session/conversation memory      │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Pipeline (per request):
 *   Question → Intent Detection → Knowledge Retrieval → Confidence Check
 *     → Route (knowledge or Gemini) → Provider Call → Format → Response
 */

// Core types.
export type {
    MessageRole,
    ConversationSurface,
    EngineRequest,
    EngineResponse,
    SuggestedAction,
    ResponseMeta,
    TokenUsage,
    ProviderId,
    IntelligenceProvider,
    ProviderRequest,
    ProviderResult,
    ProviderError,
    KnowledgeChunk,
    RetrievedContext,
    RouterDecision,
} from './types';

// Engine orchestration.
export {
    runEngine,
    inspectRequest,
} from './engine';

export {
    routeRequest,
    KNOWLEDGE_CONFIDENCE_THRESHOLD,
} from './engine/router';
export type { RouteInput } from './engine/router';

export {
    buildContext,
} from './engine/context';
export type { BuildContextOptions } from './engine/context';

export {
    formatResponse,
    formatGreetingResponse,
} from './engine/formatter';

export {
    scoreChunkRelevance,
    scoreAnswerConfidence,
} from './engine/confidence';

// Intent detection.
export {
    detectIntent,
} from './intent';
export type { Intent, IntentResult } from './intent';

// Provider registry + adapters.
export {
    createProviderRegistry,
    resolveProvider,
} from './providers';
export type { ProviderRegistry } from './providers';

export {
    createKnowledgeProvider,
    knowledgeProvider,
    KNOWLEDGE_PROVIDER_ID,
    KNOWLEDGE_MIN_SCORE,
    getCompany,
    getServices,
    getServiceById,
    getFAQ,
    getGlossary,
    getGlossaryTerm,
    retrieveKnowledge,
} from './providers/knowledge';

export {
    createGeminiProvider,
    GEMINI_PROVIDER_ID,
} from './providers/gemini';
export type { GeminiProviderConfig } from './providers/gemini';

// Prompt assembly + guardrails.
export {
    buildSystemPrompt,
} from './prompts/system';
export type { SystemPromptOptions } from './prompts/system';

export {
    GUARDRAIL_RULES,
    OUT_OF_SCOPE_TOPICS,
    buildGuardrailSection,
} from './prompts/guardrails';

export {
    buildKnowledgeContextSection,
} from './prompts/knowledge-context';
export type { KnowledgeContextOptions } from './prompts/knowledge-context';

// Memory (reserved).
export {
    createMemoryAdapter,
} from './memory';
export type { SessionRecord, MemoryAdapter } from './memory';
