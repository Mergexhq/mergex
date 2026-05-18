'use client';

import { motion } from 'framer-motion';
import { SendHorizontal, LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { PLACEHOLDERS } from './types';

interface ChatInputProps {
    input: string;
    isTyping: boolean;
    inputFocused: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    onInputChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onSend: () => void;
}

export function ChatInput({
    input,
    isTyping,
    inputFocused,
    textareaRef,
    onInputChange,
    onKeyDown,
    onFocus,
    onBlur,
    onSend,
}: ChatInputProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-6 z-20 pointer-events-none">
            <div className="pointer-events-auto">
                <div className="relative group z-10">
                    {/* Glow on focus */}
                    <div className={cn(
                        'absolute -inset-1 bg-linear-to-r from-violet-400 via-fuchsia-300 to-indigo-400 rounded-xl blur-xl transition-all duration-500 z-0',
                        inputFocused ? 'opacity-30 scale-100' : 'opacity-0 scale-90 group-hover:opacity-10'
                    )} />

                    <div className={cn(
                        'relative z-10 bg-white/90 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-sm',
                        inputFocused
                            ? 'border-violet-300 shadow-md ring-1 ring-violet-200'
                            : 'border border-gray-200 hover:border-gray-300'
                    )}>
                        <div className="relative px-3 pt-2.5 pb-1.5">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={e => onInputChange(e.target.value)}
                                onKeyDown={onKeyDown}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                disabled={isTyping}
                                rows={1}
                                className="w-full bg-transparent resize-none outline-none text-[13px] text-gray-900 placeholder-transparent leading-relaxed min-h-[44px] pr-9"
                            />
                            {!input && (
                                <div className="absolute top-2.5 left-3 pointer-events-none">
                                    <TypingAnimation
                                        words={PLACEHOLDERS}
                                        blinkCursor
                                        pauseDelay={2500}
                                        loop
                                        startOnView={false}
                                        className="text-[13px] text-gray-400 font-normal"
                                        duration={45}
                                        delay={80}
                                        deleteSpeed={25}
                                    />
                                </div>
                            )}

                            {/* Send button */}
                            <motion.button
                                type="button"
                                onClick={onSend}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                disabled={isTyping || !input.trim()}
                                className={cn(
                                    'absolute right-2 bottom-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all',
                                    input.trim() && !isTyping
                                        ? 'bg-black hover:bg-gray-900 cursor-pointer text-white shadow-md'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                )}
                            >
                                {isTyping
                                    ? <LoaderIcon className="w-3.5 h-3.5 animate-[spin_2s_linear_infinite]" />
                                    : <SendHorizontal className="w-3.5 h-3.5" />
                                }
                            </motion.button>
                        </div>
                    </div>
                </div>
                <p className="text-center text-[10px] text-gray-300 mt-2.5 flex items-center justify-center gap-1.5 bg-white/40 backdrop-blur-sm py-1 rounded-full w-fit mx-auto px-3 border border-white/20">
                    Powered by MergeX Intelligence
                </p>
            </div>
        </div>
    );
}
