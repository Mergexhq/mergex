import { useEffect, RefObject } from 'react';

let observer: IntersectionObserver | null = null;

const getObserver = () => {
  if (typeof window === 'undefined') return null;
  
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          // Play the video if it is at least 80% visible
          if (entry.intersectionRatio >= 0.8) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      // threshold [0, 0.8] ensures we catch when it enters/leaves 80% 
      // AND when it completely enters/leaves the screen (0)
      { threshold: [0, 0.8] }
    );
  }
  return observer;
};

export const useGlobalVideoObserver = (
  videoRef: RefObject<HTMLVideoElement | null>,
  shouldPlay: boolean = true
) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const obs = getObserver();
    if (obs) {
      obs.observe(video);
    }

    return () => {
      if (obs) {
        obs.unobserve(video);
      }
    };
  }, [videoRef, shouldPlay]);
};
