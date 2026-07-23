/**
 * Intelligence Layer - Intent Detection
 * =====================================
 *
 * Deterministic, model-free intent classification. Decides WHAT KIND of
 * question was asked so the engine can route it - without ever calling Gemini.
 *
 * Why deterministic?
 *   - Intent detection runs on EVERY request, before any provider is chosen.
 *     Using a model here would add latency + cost to every turn, and would
 *     make routing non-deterministic (bad for testing and trust).
 *   - Keyword + pattern rules are explainable, instant, and free.
 *
 * Design for extensibility:
 *   Each intent is a self-contained rule (a set of trigger tokens / patterns).
 *   Adding a new intent = adding one entry to INTENT_RULES. The engine and
 *   detector never change.
 *
 * Order matters: rules are evaluated top-to-bottom; the FIRST match wins.
 * Rules are therefore written most-specific → most-general.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Intent vocabulary
// ─────────────────────────────────────────────────────────────────────────────

/**
 * All intents the detector can emit. Extend this union (and INTENT_RULES)
 * to add new intents - no other module needs editing.
 */
export type Intent =
    | 'greeting'
    | 'company'
    | 'services'
    | 'faq'
    | 'glossary'
    | 'contact'
    | 'general'
    | 'unknown';

export interface IntentResult {
    /** The classified intent. */
    intent: Intent;
    /** The specific tokens/patterns that fired, for debugging + analytics. */
    matched: string[];
    /** Confidence in the classification, in [0,1]. Rules-based, so usually 1. */
    confidence: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule definitions
// ─────────────────────────────────────────────────────────────────────────────

interface IntentRule {
    intent: Intent;
    /**
     * Tokens or substrings that trigger this intent. Matching is whole-word,
     * case-insensitive, against the normalised query.
     */
    triggers: string[];
}

/**
 * Ordered, most-specific-first intent rules.
 *
 * NOTE: 'general' and 'unknown' are terminal - they must be last. 'general'
 * catches recognisable MergeX questions that don't fit a narrower bucket;
 * 'unknown' is the final fallback.
 */
const INTENT_RULES: IntentRule[] = [
    {
        intent: 'greeting',
        triggers: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    },
    {
        intent: 'contact',
        triggers: ['contact', 'email', 'reach', 'get in touch', 'book a call', 'call you', 'phone', 'how do i start', 'how do i begin', 'where do i start', 'hire'],
    },
    {
        intent: 'glossary',
        triggers: ['what is', "what's", 'define', 'definition', 'meaning of', 'explain', 'meaning', 'term'],
    },
    {
        intent: 'services',
        triggers: ['service', 'services', 'offer', 'what do you do', 'what do you build', 'build', 'develop', 'saas', 'web app', 'automation', 'ai agent', 'ai voice', 'ai chat', 'workflow', 'creative', 'commercial', 'integration', 'api', 'modernize', 'modernise', 'legacy', 'platform'],
    },
    {
        intent: 'company',
        triggers: ['mergex', 'company', 'who are you', 'who is mergex', 'about', 'founder', 'founded', 'ceo', 'team', 'where are you', 'located', 'based', 'india', 'chennai', 'history', 'mission'],
    },
    {
        intent: 'faq',
        triggers: ['how long', 'how much', 'price', 'pricing', 'cost', 'industries', 'international', 'process', 'timeline', 'turnaround', 'do you work', 'do you build', 'do you offer', 'guarantee', 'warranty', 'support'],
    },
    {
        // Catch-all for questions that look like real questions but don't fit.
        intent: 'general',
        triggers: ['can you', 'could you', 'would you', 'do you', 'are you', 'is it', 'will you', 'help', 'question', 'advice', 'recommend'],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Detector
// ─────────────────────────────────────────────────────────────────────────────

/** Normalise a query for matching: lowercase, collapse whitespace. */
function normaliseQuery(query: string): string {
    return query.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Detect the intent of a query.
 *
 * Deterministic: same input always yields the same output. No randomness,
 * no model call. Returns the first matching rule; if none match, 'unknown'.
 */
export function detectIntent(query: string): IntentResult {
    const normalised = normaliseQuery(query);
    if (normalised.length === 0) {
        return { intent: 'unknown', matched: [], confidence: 1 };
    }

    for (const rule of INTENT_RULES) {
        const matched = rule.triggers.filter((trigger) => normalised.includes(trigger));
        if (matched.length > 0) {
            return {
                intent: rule.intent,
                matched,
                confidence: 1,
            };
        }
    }

    return { intent: 'unknown', matched: [], confidence: 1 };
}
