/**
 * Intelligence Layer - Lightweight Test Harness
 * =============================================
 *
 * Demonstrates the engine pipeline end-to-end WITHOUT any frontend, UI,
 * API route, or external API key.
 *
 * Usage (from project root):
 *   npx tsx src/intelligence/__test-harness__.ts
 *
 * The harness runs four representative queries through the engine and logs:
 *   - Intent detection result
 *   - Knowledge retrieval score + top chunk
 *   - Routing decision
 *   - Final engine response
 *
 * All queries resolve through the Knowledge Provider (no Gemini key needed).
 * The comparison query falls back because knowledge is insufficient for
 * competitor comparisons.
 */

import type { EngineRequest, ProviderRegistry } from './index';
import { runEngine, inspectRequest, createProviderRegistry } from './index';

// ─────────────────────────────────────────────────────────────────────────────
// Test queries
// ─────────────────────────────────────────────────────────────────────────────

const TEST_CASES: Array<{ label: string; message: string }> = [
    {
        label: 'Services query (should resolve via knowledge)',
        message: 'What services does MergeX provide?',
    },
    {
        label: 'Company query (should resolve via knowledge)',
        message: 'Who founded MergeX?',
    },
    {
        label: 'Glossary query (should resolve via knowledge)',
        message: 'Explain workflow automation.',
    },
    {
        label: 'Comparison query (should fall back - knowledge insufficient)',
        message: 'Can you compare MergeX with another software company?',
    },
    {
        label: 'Greeting (should shortcut without provider)',
        message: 'Hello!',
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────────────────────

function separator(title: string) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`  ${title}`);
    console.log('─'.repeat(60));
}

async function run() {
    console.log('\n🧠 MergeX Intelligence Layer - Test Harness\n');

    const providers: ProviderRegistry = createProviderRegistry();

    console.log('Registered providers:', Object.keys(providers).join(', ') || '(none)');

    for (const { label, message } of TEST_CASES) {
        separator(label);
        console.log(`Message: "${message}"\n`);

        // Show pipeline internals (no provider call).
        const inspection = inspectRequest({
            query: message,
            history: [],
            surface: 'chat',
        });

        console.log('Intent:', inspection.intent.intent);
        if (inspection.intent.matched.length) {
            console.log('Matched triggers:', inspection.intent.matched.join(', '));
        }
        console.log('Knowledge score:', inspection.knowledgeScore.toFixed(3));
        console.log('Knowledge confident:', inspection.knowledgeConfident);
        if (inspection.bestChunk) {
            console.log('Top chunk:', inspection.bestChunk.id);
            console.log('Top chunk source:', inspection.bestChunk.source);
        } else {
            console.log('Top chunk: (none)');
        }

        // Run the full pipeline (knowledge provider only, no Gemini key).
        const request: EngineRequest = {
            query: message,
            history: [],
            surface: 'chat',
        };

        const response = await runEngine(request, providers);

        console.log('\n── Engine Response ──');
        console.log('Provider:', response.provider);
        console.log('Routing reason:', response.meta.routingReason);
        console.log('Latency:', response.meta.latencyMs, 'ms');
        console.log('Token usage:', response.meta.tokenUsage ?? '(none reported)');
        console.log('\nContent:');
        console.log(response.content || '(empty - safe fallback)');
        if (response.suggestedAction) {
            console.log('Suggested action:', response.suggestedAction.label, '→', response.suggestedAction.target);
        }
    }

    separator('Done');
    console.log('All test cases completed.\n');
}

run().catch((err) => {
    console.error('Test harness failed:', err);
    process.exit(1);
});
