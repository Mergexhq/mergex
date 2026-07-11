'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageSquare, PhoneOff, Send, X, Mic, MicOff } from 'lucide-react';

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

interface CardStyleProps {
  cardBg: any;
  cardBorder: any;
  textClass: any;
  subtextClass: any;
  btnBg: any;
  btnText: any;
  waveColor: any;
}

/* ── Voice Card ───────────────────────────────────────────────── */
function VoiceCard({ cardBg, cardBorder, textClass, subtextClass, btnBg, btnText, waveColor }: CardStyleProps) {
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
    <motion.div 
      style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      className="relative flex-1 min-w-0 rounded-3xl border overflow-hidden p-8 md:p-10 flex flex-col gap-6"
    >
      {/* Top badge */}
      <div className="flex items-center gap-2">
        <LiveDot />
        <motion.span 
          style={{ color: subtextClass }}
          className="text-[10px] font-bold tracking-[0.22em] uppercase"
        >
          Voice · Live Demo
        </motion.span>
      </div>

      {/* Waveform visual */}
      <div className="flex items-center justify-center h-20 gap-[3px]">
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{ backgroundColor: callState === 'active' ? waveColor : 'rgba(128,128,128,0.15)' }}
            animate={callState === 'active' ? {
              height: [8, Math.random() * 40 + 12, 8],
            } : { height: 8 }}
            transition={{
              duration: 0.6 + Math.random() * 0.6,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: i * 0.04,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-3">
        <motion.h3 
          style={{ color: textClass }}
          className="font-questrial font-bold text-2xl md:text-3xl leading-tight"
        >
          Try our AI Voice Receptionist
        </motion.h3>
        <motion.p 
          style={{ color: subtextClass }}
          className="text-sm md:text-base leading-relaxed font-light"
        >
          Experience how an AI receptionist answers calls, handles enquiries, and books appointments.
        </motion.p>
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
              style={{ backgroundColor: btnBg, color: btnText }}
              className="flex items-center gap-2 font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
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
              style={{ color: subtextClass }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
              <motion.button
                onClick={() => setIsMuted(m => !m)}
                style={{ color: textClass, borderColor: cardBorder }}
                className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase px-5 py-3 rounded-full border bg-transparent hover:bg-neutral-500/10"
              >
                {isMuted ? <MicOff size={13} /> : <Mic size={13} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </motion.button>
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
    </motion.div>
  );
}

/* ── Chat Modal ───────────────────────────────────────────────── */
type Message = { role: 'user' | 'assistant'; text: string };

function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m the MergeX AI assistant. Ask me anything about MergeX, our services, or how we can help your project.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setMessages(m => [...m, {
      role: 'assistant',
      text: 'Thanks for reaching out! Our team will be able to help you with that. In the meantime, feel free to explore our work at /launches or contact us at hello@mergex.in.'
    }]);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-[1400] w-[min(420px,calc(100vw-3rem))] bg-white border border-black/10 rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.15)] flex flex-col"
      style={{ maxHeight: '70vh' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <LiveDot />
          <span className="font-bold text-black text-sm">MergeX AI Assistant</span>
        </div>
        <button onClick={onClose} className="text-black/40 hover:text-black transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-0 bg-neutral-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] text-sm leading-relaxed rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-black text-white font-medium shadow-sm'
                : 'bg-white text-black/80 border border-black/10 shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/10 rounded-2xl px-4 py-3 flex gap-1.5 items-center">
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
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-black/5 flex items-center gap-2 bg-white">
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
  );
}

/* ── Chat Card ────────────────────────────────────────────────── */
function ChatCard({ cardBg, cardBorder, textClass, subtextClass, btnBg, btnText, waveColor }: CardStyleProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <motion.div 
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        className="relative flex-1 min-w-0 rounded-3xl border overflow-hidden p-8 md:p-10 flex flex-col gap-6"
      >
        {/* Top badge */}
        <div className="flex items-center gap-2">
          <LiveDot color="#3b82f6" />
          <motion.span 
            style={{ color: subtextClass }}
            className="text-[10px] font-bold tracking-[0.22em] uppercase"
          >
            Chat · Live Demo
          </motion.span>
        </div>

        {/* Chat preview bubbles */}
        <div className="flex flex-col gap-2.5 h-20 overflow-hidden">
          {[
            { text: 'What services does MergeX offer?', user: true },
            { text: 'We build AI systems, SaaS platforms, and digital products...', user: false },
            { text: 'How long does a typical project take?', user: true },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
              className={`flex ${b.user ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div 
                style={{ 
                  backgroundColor: b.user ? btnBg : 'rgba(128,128,128,0.1)', 
                  color: b.user ? btnText : textClass 
                }}
                className="text-[11px] leading-snug rounded-xl px-3 py-1.5 max-w-[85%]"
              >
                {b.text}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-3">
          <motion.h3 
            style={{ color: textClass }}
            className="font-questrial font-bold text-xl md:text-3xl leading-tight"
          >
            Talk to our AI Assistant
          </motion.h3>
          <motion.p 
            style={{ color: subtextClass }}
            className="text-sm md:text-base leading-relaxed font-light"
          >
            Ask questions about MergeX, our services, or how we build software.
          </motion.p>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <motion.button
            onClick={() => setChatOpen(true)}
            style={{ backgroundColor: btnBg, color: btnText }}
            className="flex items-center gap-2 font-bold text-xs tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageSquare size={14} />
            Open Chat
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function InteractiveExperiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section relative to viewport end
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end 80%"]
  });

  // Map scroll progress to light-to-dark transitions
  const bgColor = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#000000"]);
  
  // Header text color transitions
  const titleColor = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);
  const subtitleColor = useTransform(scrollYProgress, [0, 1], ["#555555", "#a3a3a3"]);
  const eyebrowColor = useTransform(scrollYProgress, [0, 1], ["#999999", "#555555"]);

  // Testimonial card style transitions
  const cardBg = useTransform(scrollYProgress, [0, 1], ["#fafafa", "#0b0b0b"]);
  const cardBorder = useTransform(scrollYProgress, [0, 1], ["rgba(0,0,0,0.1)", "rgba(255,255,255,0.08)"]);
  const textClass = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);
  const subtextClass = useTransform(scrollYProgress, [0, 1], ["#555555", "#888888"]);

  // Button background & text transitions
  const btnBg = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);
  const btnText = useTransform(scrollYProgress, [0, 1], ["#ffffff", "#000000"]);

  // Waveform transitions
  const waveColor = useTransform(scrollYProgress, [0, 1], ["#000000", "#ffffff"]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="w-full py-24 md:py-32 px-6 md:px-12 border-t border-black/5"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <motion.span 
            style={{ color: eyebrowColor }}
            className="text-[10px] font-bold tracking-[0.28em] uppercase"
          >
            Interactive Experiences
          </motion.span>
          <motion.h2
            className="font-questrial font-bold leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: titleColor }}
          >
            This is what makes MergeX different.
          </motion.h2>
          <motion.p 
            style={{ color: subtitleColor }}
            className="text-base md:text-lg font-light leading-relaxed"
          >
            Instead of telling you what we build — experience it.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5">
          <VoiceCard 
            cardBg={cardBg}
            cardBorder={cardBorder}
            textClass={textClass}
            subtextClass={subtextClass}
            btnBg={btnBg}
            btnText={btnText}
            waveColor={waveColor}
          />
          <ChatCard 
            cardBg={cardBg}
            cardBorder={cardBorder}
            textClass={textClass}
            subtextClass={subtextClass}
            btnBg={btnBg}
            btnText={btnText}
            waveColor={waveColor}
          />
        </div>
      </div>
    </motion.section>
  );
}
