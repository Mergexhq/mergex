"use client";

import React, { useEffect, useRef, useState } from "react";

interface TextSplitterProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  onSplit?: (chars: HTMLSpanElement[], words: HTMLSpanElement[]) => void;
}

export const TextSplitter: React.FC<TextSplitterProps> = ({
  text,
  className = "",
  wordClassName = "",
  charClassName = "",
  onSplit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // We use a small timeout to ensure DOM paints and refs are populated
    const timer = setTimeout(() => {
      const words = Array.from(containerRef.current?.querySelectorAll(".split-word") || []) as HTMLSpanElement[];
      const chars = Array.from(containerRef.current?.querySelectorAll(".split-char") || []) as HTMLSpanElement[];
      
      if (onSplit && chars.length > 0) {
        onSplit(chars, words);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [text, mounted, onSplit]);

  // SSR-friendly fallback: render just the text before hydration, or render pre-split
  // We'll pre-split so it's SEO friendly and doesn't layout shift wildly
  
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`${className} inline-block`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          className={`split-word inline-block whitespace-pre ${wordClassName}`}
          aria-hidden="true"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`char-${wordIndex}-${charIndex}`}
              className={`split-char inline-block ${charClassName}`}
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          {/* Add space back between words, except the last one */}
          {wordIndex !== words.length - 1 && (
            <span className={`split-char inline-block ${charClassName}`}>&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
};
