'use client';

import { X, Plus, MessageSquare } from 'lucide-react';
import { MergeXOrb } from '@/components/ui/mergex-orb';

interface ChatHeaderProps {
    onClose: () => void;
    onNewConversation: () => void;
    onToggleHistory: () => void;
}

export function ChatHeader({ onClose, onNewConversation, onToggleHistory }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between px-3 md:px-4 py-3 border-b border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2 md:gap-2.5">
                <MergeXOrb size={24} className="md:w-[28px] md:h-[28px]" />
                <div>
                    <p className="text-[12px] md:text-[13px] font-bold text-gray-900 leading-none">MergeX</p>
                    <p className="text-[10px] text-violet-500 font-semibold uppercase tracking-widest mt-0.5">Intelligence</p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    onClick={onToggleHistory}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="History"
                    title="Chat history"
                >
                    <MessageSquare className="w-4 h-4" />
                </button>
                <button
                    onClick={onNewConversation}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="New conversation"
                    title="New conversation"
                >
                    <Plus className="w-4 h-4" />
                </button>
                <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
