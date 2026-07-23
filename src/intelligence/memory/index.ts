/**
 * Intelligence Memory - Session Memory (Reserved)
 * ===============================================
 *
 * This module is RESERVED for future conversation-memory support. It is
 * intentionally empty of implementation in Milestone 4.1.
 *
 * What it will eventually hold:
 *
 *   - Per-session conversation history, so a returning visitor's chat
 *     continues where it left off (Milestone 4.7 - sessionStorage persistence,
 *     and later server-side durability).
 *   - Summaries of past turns, so long conversations can stay within a
 *     provider's context window without losing thread.
 *   - Per-visitor lightweight state (e.g. "asked about pricing", "in India"),
 *     used to tailor suggestions - never to profile, and always privacy-first.
 *
 * Design intent:
 *
 *   - Memory is an optional collaborator of the engine, not a dependency.
 *     The engine must work perfectly with NO memory (stateless first-turn).
 *   - Memory adapters must be swappable: an in-memory map for dev, a Redis
 *     store for production, a cookie/sessionStorage adapter for client-only.
 *   - Everything here is UI-agnostic and provider-agnostic.
 *
 * Status: ARCHITECTURE ONLY. The types below are placeholders so later
 * milestones can drop implementations in without reshaping the seams.
 */

import type { ChatMessage } from '../types';

/**
 * A stored conversation. The unit of memory is one session, not one user -
 * there is no user-account concept in the intelligence layer by design.
 */
export interface SessionRecord {
    /** Opaque session id, supplied by the surface (e.g. a sessionStorage id). */
    id: string;
    /** All messages in the session, oldest first. */
    messages: ChatMessage[];
    /** When the session was last active. */
    updatedAt: number;
}

/**
 * The contract a memory adapter must satisfy.
 *
 * Keeping this an interface (not a concrete class) means dev can use an
 * in-memory Map while production uses Redis, with zero engine changes.
 */
export interface MemoryAdapter {
    load(sessionId: string): Promise<SessionRecord | null>;
    save(sessionId: string, messages: ChatMessage[]): Promise<void>;
    clear(sessionId: string): Promise<void>;
}

/**
 * Build a memory adapter for the current runtime.
 *
 * TODO(future): inspect the environment and return the right adapter:
 *   - dev / test: in-memory Map-backed adapter
 *   - production: Redis-backed adapter (when a session store is added)
 *
 * @returns null today - the engine runs stateless until memory is needed.
 */
export function createMemoryAdapter(): MemoryAdapter | null {
    // Placeholder - no memory yet. Engine runs fully stateless.
    return null;
}
