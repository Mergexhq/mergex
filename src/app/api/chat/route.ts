/**
 * POST /api/chat
 *
 * Receives a user message and returns an EngineResponse from the MergeX
 * Intelligence Layer. This is the live API backing the chat widget on /launches.
 *
 * Request body:
 *   { message: string }
 *
 * Response:
 *   EngineResponse - { content, provider, suggestedAction?, meta }
 *
 * Graceful degradation:
 *   - If GEMINI_API_KEY is absent, the engine answers using the deterministic
 *     knowledge provider (FAQ, services, company facts) - no crash, no fallback
 *     to a hardcoded string.
 *   - If the engine itself throws, the handler returns a 500 with a safe error
 *     message so the chat UI can display it without crashing.
 */

import { NextResponse } from 'next/server';
import { runEngine } from '@/intelligence';
import { createProviderRegistry } from '@/intelligence/providers';

export async function POST(request: Request) {
    let message: string;

    try {
        const body = await request.json() as { message?: unknown };
        if (typeof body.message !== 'string' || !body.message.trim()) {
            return NextResponse.json(
                { error: 'message must be a non-empty string' },
                { status: 400 },
            );
        }
        message = body.message.trim();
    } catch {
        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 },
        );
    }

    const providers = createProviderRegistry();

    try {
        const response = await runEngine(
            {
                query: message,
                history: [],
                surface: 'chat',
            },
            providers,
        );

        return NextResponse.json(response);
    } catch (err) {
        console.error('[/api/chat] Engine error:', err);
        return NextResponse.json(
            { error: 'The assistant encountered an error. Please try again.' },
            { status: 500 },
        );
    }
}
