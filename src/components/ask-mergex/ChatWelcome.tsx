'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { MergeXOrb } from '@/components/ui/mergex-orb';
import { SUGGESTIONS } from './types';

interface ChatWelcomeProps {
    onStartGuided: () => void;
    onSend: (text: string) => void;
}

export function ChatWelcome({ onStartGuided, onSend }: ChatWelcomeProps) {
    return (
        <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center pt-2 pb-4"
        >
            <div className="relative mb-4">
                <div className="absolute inset-0 blur-2xl bg-violet-300/30 rounded-full scale-150" />
                <MergeXOrb size={52} className="relative z-10" />
            </div>
            <h2 className="text-[17px] font-semibold text-gray-900 mb-1 leading-snug">
                Your AI Strategy Starts Here
            </h2>
            <p className="text-[13px] text-gray-400 mb-5 max-w-[260px] leading-relaxed">
                Tell me what you're trying to build.<br />
                I'll help you discover the fastest path
            </p>

            {/* Guided flow trigger */}
            <button
                onClick={onStartGuided}
                className="mb-5 text-[12px] font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
            >
                Not sure where to begin? I'll guide you in seconds. <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Suggestion chips */}
            <div className="flex flex-col gap-2 w-full">
                {SUGGESTIONS.map((s, i) => (
                    <motion.button
                        key={i}
                        onClick={() => onSend(s)}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-100 text-left text-[12px] font-medium text-gray-600 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50 transition-all group"
                    >
                        <span>{s}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-violet-400 transition-all -translate-x-1 group-hover:translate-x-0" />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
