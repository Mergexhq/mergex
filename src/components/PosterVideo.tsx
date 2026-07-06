"use client";

import React, { useRef, useState } from "react";
import { useGlobalVideoObserver } from "@/lib/videoObserver";
import { useBackgroundVideo } from "@/lib/videoLoader";

interface PosterVideoProps {
  videoUrl: string;
  posterUrl: string;
  /** Whether the clip should autoplay when in view. Hero passes its active state. */
  shouldPlay?: boolean;
  /** Load sooner than others (hero / on-screen clips). */
  priority?: number;
  className?: string;
}

/**
 * Poster shows instantly; the real video is warmed into the browser cache in the
 * background and only mounted on the visible element once it's buffered — so slow
 * connections see a crisp frame immediately instead of a black box, and the swap
 * is seamless (plays straight from cache).
 */
export const PosterVideo = ({
  videoUrl,
  posterUrl,
  shouldPlay = true,
  priority = 0,
  className = "absolute inset-0 h-full w-full object-cover",
}: PosterVideoProps) => {
  const buildId = process.env.NEXT_PUBLIC_BUILD_ID || '1';
  const getVersionedUrl = (url: string) => url.includes('?') ? `${url}&v=${buildId}` : `${url}?v=${buildId}`;
  
  const versionedVideoUrl = getVersionedUrl(videoUrl);
  const versionedPosterUrl = getVersionedUrl(posterUrl);

  const videoRef = useRef<HTMLVideoElement>(null);
  const ready = useBackgroundVideo(versionedVideoUrl, priority);
  const [playing, setPlaying] = useState(false);

  // Only drive play/pause once the source is actually attached.
  useGlobalVideoObserver(videoRef, shouldPlay && ready);

  return (
    <>
      {/* Poster — underneath, painted over by the video once it's playing. */}
      <img
        src={versionedPosterUrl}
        alt=""
        aria-hidden
        className={className}
      />
      {/* Video source is attached only after the background loader reports ready,
          so nothing competes for bandwidth up front. */}
      {ready && (
        <video
          ref={videoRef}
          src={versionedVideoUrl}
          poster={versionedPosterUrl}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          style={{ opacity: playing ? 1 : 0 }}
          className={`${className} transition-opacity duration-500`}
        />
      )}
    </>
  );
};
