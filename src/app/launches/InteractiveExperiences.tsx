'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, PhoneOff, Send, X, Mic, MicOff } from 'lucide-react';
import LiveWaveform from '@/components/ruixen/live-waveform';

/* ── Pulsing status dot ───────────────────────────────────────── */
function LiveDot({ color = '#22c55e' }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

/* ── Voice Card ───────────────────────────────────────────────── */
function VoiceCard() {
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [isMuted, setIsMuted] = useState(false);

  const handleStartCall = () => {
    setCallState('connecting');
    setTimeout(() => setCallState('active'), 1800);
  };

  const handleEndCall = () => {
    setCallState('idle');
    setIsMuted(false);
  };

  return (
    <div className="relative flex-1 min-w-0 min-h-[520px] rounded-3xl bg-neutral-50 border border-black/10 overflow-hidden p-8 md:p-10 flex flex-col gap-6">
      {/* Top badge */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-black/55">
          Voice · Live Demo
        </span>
      </div>

      {/* Waveform visual */}
      <div className="w-full">
        <LiveWaveform
          processing={callState === 'connecting'}
          active={callState === 'active'}
          onStop={callState === 'active' ? handleEndCall : undefined}
          barColor="#000000"
          height={60}
          className="bg-transparent border-none p-0 shadow-none text-black"
        />
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-3 mt-12">
        <h3 className="font-questrial font-bold text-black text-2xl md:text-3xl leading-tight">
          Try our AI Voice Receptionist
        </h3>
        <p className="text-black/55 text-sm md:text-base leading-relaxed font-light">
          Experience how an AI receptionist answers calls, handles enquiries, and books appointments.
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3 mt-auto">
        <AnimatePresence mode="wait">
          {callState === 'idle' && (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleStartCall}
              className="flex items-center gap-2 bg-black text-white font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:bg-black/95 transition-all"
            >
              <Phone size={14} />
              Start Call
            </motion.button>
          )}
          {callState === 'connecting' && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-black/60 text-sm font-medium"
            >
              <div className="w-4 h-4 border-2 border-black/25 border-t-black rounded-full animate-spin" />
              Connecting…
            </motion.div>
          )}
          {callState === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setIsMuted(m => !m)}
                className={`flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase px-5 py-3 rounded-full border transition-all ${isMuted
                    ? 'bg-black/5 text-black/40 border-black/5'
                    : 'bg-black/5 text-black border-black/10 hover:bg-black/10'
                  }`}
              >
                {isMuted ? <MicOff size={13} /> : <Mic size={13} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button
                onClick={handleEndCall}
                className="flex items-center gap-2 bg-red-500 text-white font-bold text-xs tracking-[0.12em] uppercase px-5 py-3 rounded-full hover:bg-red-600 transition-colors"
              >
                <PhoneOff size={13} />
                End Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Chat Card ────────────────────────────────────────────────── */
type Message = { role: 'user' | 'assistant'; text: string };

function ChatCard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm the MergeX AI assistant. Ask me anything about MergeX, our services, or how we build software." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen && messageListRef.current) {
      // Set scrollTop directly on the container to prevent scrolling the browser window
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, loading, chatOpen]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json() as { content?: string; error?: string };
      const replyText = data.content ?? data.error ?? 'Something went wrong. Please try again.';

      setMessages(m => [...m, { role: 'assistant', text: replyText }]);
    } catch {
      setMessages(m => [...m, {
        role: 'assistant',
        text: 'Unable to reach the assistant right now. Please try again in a moment.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 min-w-0 min-h-[520px] rounded-3xl bg-neutral-50 border border-black/10 overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {!chatOpen ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 p-8 md:p-10 flex flex-col gap-6 h-full"
          >
            {/* Top badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-black/55">
                Chat · Live Demo
              </span>
            </div>

            {/* Chat preview bubbles */}
            <div className="flex flex-col gap-2.5 h-20 overflow-hidden">
              {[
                { text: 'What services does MergeX offer?', user: true },
                { text: 'We build AI systems, SaaS platforms, and digital products...', user: false },
                { text: 'How long does a typical project take?', user: true },
              ].map((b, i) => (
                <div
                  key={i}
                  className={`flex ${b.user ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`text-[11px] leading-snug rounded-xl px-3 py-1.5 max-w-[85%] ${b.user ? 'bg-black text-white font-medium' : 'bg-black/10 text-black/70'
                    }`}>
                    {b.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Copy */}
            <div className="flex flex-col gap-3 mt-12">
              <h3 className="font-questrial font-bold text-black text-2xl md:text-3xl leading-tight">
                Talk to our AI Assistant
              </h3>
              <p className="text-black/55 text-sm md:text-base leading-relaxed font-light">
                Ask questions about MergeX, our services, or how we build software.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-2 bg-black text-white font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:bg-black/90 transition-colors"
              >
                <MessageSquare size={14} />
                Open Chat
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chatting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col h-full min-h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-neutral-50 shrink-0">
              <div className="flex items-center gap-2">
                <LiveDot />
                <span className="font-bold text-black text-sm">MergeX AI Assistant</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-black/40 hover:text-black transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messageListRef}
              className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 min-h-0 bg-neutral-50/50 h-[300px]"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] text-xs md:text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${msg.role === 'user'
                      ? 'bg-black text-white font-medium shadow-sm'
                      : 'bg-white text-black/80 border border-black/10 shadow-sm'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/10 rounded-2xl px-4 py-2.5 flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-black/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 py-3 border-t border-black/5 flex items-center gap-2 bg-white shrink-0">
              <input
                className="flex-1 bg-transparent text-black text-sm placeholder-black/30 focus:outline-none"
                placeholder="Type a message…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center disabled:opacity-30 hover:bg-black/90 transition-colors shrink-0"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function InteractiveExperiences() {
  return (
    <section className="w-full bg-white py-24 md:py-32 px-6 md:px-12 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--text-tertiary)]">
            Interactive Experiences
          </span>
          <h2
            className="font-questrial font-bold text-[var(--text-primary)] leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            This is what makes MergeX different.
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg font-light leading-relaxed">
            Instead of telling you what we build - experience it.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5">
          <VoiceCard />
          <ChatCard />
        </div>
      </div>
    </section>
  );
}
