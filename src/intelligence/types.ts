/**
 * MergeX Intelligence Layer - Core Types
 * =======================================
 *
 * This file defines the foundational contracts for the entire intelligence
 * layer. Everything else (engine, providers, prompts, memory) depends on these
 * abstractions - never on concrete implementations.
 *
 * Design principles:
 *   1. Provider-agnostic     - no types reference Gemini, OpenAI, ElevenLabs,
 *                              or any specific vendor. Providers adapt to
 *                              these types, not the other way around.
 *   2. UI-agnostic           - nothing here imports React. The intelligence
 *                              layer is callable from API routes, server
 *                              actions, voice pipelines, and future internal
 *                              tools alike.
 *   3. Surface-agnostic      - the same engine can power a chat widget, a
 *                              voice receptionist, or the future MergeX OS
 *                              assistant. The `surface` field on a request
 *                              tells the engine where the query came from.
 *
 * Status: ARCHITECTURE ONLY. No implementation in this task (Milestone 4.1).
 */

// ─────────────────────────────────────────────────────────────────────────────
// Conversation primitives
// ─────────────────────────────────────────────────────────────────────────────

/** Who authored a message. */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * A single message in a conversation.
 *
 * Neutral across providers - a provider adapter is responsible for translating
 * this into its own message format (e.g. OpenAI chat roles, Gemini parts).
 */
export interface ChatMessage {
    role: MessageRole;
    content: string;
}

/**
 * Where a conversation is happening. The engine uses this to vary tone,
 * length, and allowed actions - e.g. a voice surface needs shorter, spoken
 * responses than a chat widget.
 */
export type ConversationSurface =
    | 'chat' // Website AI assistant widget
    | 'voice' // AI voice receptionist (telephony / browser)
    | 'os' // Future MergeX OS assistant
    | 'internal'; // Internal MergeX tooling

// ─────────────────────────────────────────────────────────────────────────────
// Request / Response contracts
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A request to the intelligence engine.
 *
 * Surfaces construct this; the engine consumes it. `history` is included so
 * providers can be called with full multi-turn context (Milestone 4.6).
 */
export interface EngineRequest {
    /** The user's current message. */
    query: string;
    /** Prior turns, oldest first. Empty for a first-turn query. */
    history: ChatMessage[];
    /** Where the conversation originated. Drives routing and formatting. */
    surface: ConversationSurface;
    /** Optional opaque session id - used by the memory layer, not the engine. */
    sessionId?: string;
}

/**
 * A structured response from the intelligence engine.
 *
 * The engine never returns raw provider output. It always returns this shape
 * so downstream consumers (chat UI, voice TTS, OS) can trust a single contract.
 */
export interface EngineResponse {
    /** The text to display or speak. */
    content: string;
    /** Which provider produced this response (see RouterDecision). */
    provider: ProviderId;
    /** Optional next-step suggestion surfaced to the user (e.g. "Book a call"). */
    suggestedAction?: SuggestedAction;
    /** Engine-internal diagnostics. Never shown to the user. */
    meta: ResponseMeta;
}

/**
 * An optional call-to-action the engine can attach to a response.
 * Example: a user asks about pricing → engine returns a "book a call" action.
 */
export interface SuggestedAction {
    label: string;
    /** A URL to navigate to, or an internal action key the surface understands. */
    target: string;
    /** Intent classification - helps surfaces decide how to render it. */
    type: 'link' | 'route' | 'contact';
}

/**
 * Internal diagnostics attached to every response.
 * Useful for logging, analytics (Milestone 4.10), and debugging.
 */
export interface ResponseMeta {
    /** Wall-clock time to produce the response, in milliseconds. */
    latencyMs: number;
    /** Why this provider was chosen (see router.ts). */
    routingReason: string;
    /** Token usage if the provider reports it; undefined otherwise. */
    tokenUsage?: TokenUsage;
}

/** Token accounting, when available from the provider. */
export interface TokenUsage {
    prompt: number;
    completion: number;
    total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider contracts
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stable identifiers for supported provider kinds.
 *
 * NOTE: `knowledge` is a first-class provider kind. It represents deterministic
 * retrieval from the MergeX knowledge layer (FAQs, services, company facts) -
 * NOT a generative model. The router can route to it without any external API.
 */
export type ProviderId = 'knowledge' | 'gemini' | 'openai';

/**
 * The contract every provider must satisfy.
 *
 * A provider receives a normalized request and a context window, and returns
 * either a response or an error. Providers never call each other and never
 * decide routing - that's the engine's job.
 *
 * Future providers (e.g. an ElevenLabs voice provider) will implement a
 * *different* surface-specific contract; this one is for text generation.
 */
export interface IntelligenceProvider {
    /** Unique identifier used by the router. */
    readonly id: ProviderId;
    /** Human-readable name for logs and analytics. */
    readonly name: string;
    /**
     * Generate a response for the given request.
     * Implementations will be added in later milestones - this is architecture only.
     */
    generate(request: ProviderRequest): Promise<ProviderResult>;
    /**
     * Whether this provider is currently able to serve requests (API key
     * present, quota remaining, etc.). The router uses this for failover.
     */
    isAvailable(): boolean;
}

/**
 * The request shape providers receive. This is the engine's request plus the
 * assembled context (system prompt, retrieved knowledge) the provider needs.
 */
export interface ProviderRequest {
    /** The user's current message. */
    query: string;
    /** Full conversation history, oldest first. */
    history: ChatMessage[];
    /** The assembled system prompt (see prompts/system.ts). */
    systemPrompt: string;
    /** Knowledge retrieved for this turn (see engine/context.ts). */
    context: RetrievedContext;
    /** Surface - providers may adapt output length/tone accordingly. */
    surface: ConversationSurface;
}

/**
 * The result a provider returns, before the formatter normalizes it into an
 * EngineResponse. Keeping this separate lets providers return provider-specific
 * detail (token usage, finish reason) that the formatter can fold in.
 */
export interface ProviderResult {
    content: string;
    tokenUsage?: TokenUsage;
    /** Provider-specific finish signal (e.g. "stop", "length"). */
    finishReason?: string;
}

/**
 * Error surfaced when a provider fails. The router can catch this and fail
 * over to another provider.
 */
export interface ProviderError {
    provider: ProviderId;
    message: string;
    /** Whether the router should retry with a different provider. */
    retryable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Knowledge retrieval (RAG)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single chunk of knowledge retrieved for a given query.
 *
 * In the MVP this will often be a FAQ item or service definition from
 * src/knowledge/. As the layer matures it may include vector-search results.
 */
export interface KnowledgeChunk {
    /** Stable identifier for deduplication and citation. */
    id: string;
    /** The source module, e.g. "faq" | "services" | "company". */
    source: string;
    /** The text content to inject into the provider's context window. */
    content: string;
    /** Optional relevance score in [0,1], when ranking is computed. */
    score?: number;
}

/**
 * The assembled context for a single turn - everything the provider needs beyond
 * the raw conversation history.
 */
export interface RetrievedContext {
    /** Knowledge chunks relevant to this turn. May be empty. */
    chunks: KnowledgeChunk[];
    /** Whether any retrieval was attempted. */
    retrieved: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Routing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The router's decision for a given request: which provider answers, and why.
 *
 * Centralising this as an explicit value (rather than a side-effect inside the
 * engine) makes routing observable, testable, and adjustable without touching
 * provider code.
 */
export interface RouterDecision {
    /** The provider chosen to answer. */
    provider: ProviderId;
    /** Human-readable reason - surfaced in ResponseMeta for analytics. */
    reason: string;
}
