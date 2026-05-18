'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmptyState from '@/components/EmptyState';
import { Session } from './types';
import { formatDate } from './utils';

interface ChatHistoryProps {
    sessions: Session[];
    activeSessionId: string;
    onLoadSession: (session: Session) => void;
    onDeleteSession: (e: React.MouseEvent, sessionId: string) => void;
    onNewConversation: () => void;
    onClearAll: () => void;
}

export function ChatHistory({
    sessions,
    activeSessionId,
    onLoadSession,
    onDeleteSession,
    onNewConversation,
    onClearAll,
}: ChatHistoryProps) {
    return (
        <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.18 }}
            className="flex-1 overflow-y-auto px-3 py-3 min-h-0"
            data-lenis-prevent="true"
        >
            {sessions.length === 0 ? (
                <EmptyState
                    compact
                    headline="No conversations yet"
                    subtext="Ask MergeX anything to get started."
                    ctaLabel="Start a conversation"
                    ctaHref="#"
                />
            ) : (
                <div className="space-y-0.5">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Recent</p>
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            onClick={() => onLoadSession(session)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => { if (e.key === 'Enter') onLoadSession(session); }}
                            className={cn(
                                'w-full text-left px-3 py-2.5 rounded-xl group transition-all relative cursor-pointer',
                                activeSessionId === session.id
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'hover:bg-gray-50 text-gray-600'
                            )}
                        >
                            <p className="text-xs font-medium truncate pr-6 leading-snug">{session.title}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(session.createdAt)}</p>
                            <button
                                onClick={e => onDeleteSession(e, session.id)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all"
                                aria-label="Delete"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    {sessions.length > 0 && (
                        <button
                            onClick={onClearAll}
                            className="w-full mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" /> Clear all history
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
}
