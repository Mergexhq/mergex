import { useEffect, useState } from "react";

/**
 * Background video loader.
 *
 * Goal: load every clip as FAST as the network allows, poster only bridging the
 * gap so there's never a black box - while not firing a stampede of parallel
 * requests that starves each other on a slow link.
 *
 * Two lanes:
 *  - Priority lane (on-screen / hero clips): load IMMEDIATELY, no queue, no cap.
 *    These are what the user is looking at - they must not wait behind anything.
 *  - Background lane (off-screen clips): concurrency-capped queue so the long tail
 *    of rail cards warms up without choking the priority clips.
 *
 * "Ready" fires at `canplaythrough` - enough buffered to play the WHOLE clip
 * without stalling. The poster covers the full load, so when the video finally
 * swaps in it runs start-to-end with no mid-playback rebuffering (which reads as
 * "broken"). The priority lane is uncapped, so that full load is still fast.
 *
 * De-duped by URL: the same project spans several rails but each source loads once.
 */

const MAX_CONCURRENT = 4; // background lane only; priority lane is uncapped
const PRIORITY_THRESHOLD = 50; // >= loads immediately

type State = "queued" | "loading" | "ready" | "error";

interface Entry {
  url: string;
  state: State;
  priority: number;
  /** Kept alive while loading so the browser doesn't drop the cached buffer. */
  el?: HTMLVideoElement;
  subs: Set<() => void>;
}

const registry = new Map<string, Entry>();
const queue: Entry[] = [];
let active = 0;

const notify = (entry: Entry) => entry.subs.forEach((fn) => fn());

const getEntry = (url: string): Entry => {
  let entry = registry.get(url);
  if (!entry) {
    entry = { url, state: "queued", priority: 0, subs: new Set() };
    registry.set(url, entry);
  }
  return entry;
};

let isPageLoaded = false;
if (typeof window !== "undefined") {
  if (document.readyState === "complete") {
    isPageLoaded = true;
  } else {
    window.addEventListener("load", () => {
      isPageLoaded = true;
      pump();
    });
  }
}

const pump = () => {
  if (typeof window === "undefined") return;
  if (!isPageLoaded) return;

  while (active < MAX_CONCURRENT) {
    // Highest priority first, then FIFO.
    queue.sort((a, b) => b.priority - a.priority);
    const entry = queue.shift();
    if (!entry) break;
    if (entry.state !== "queued") continue;
    load(entry, false);
  }
};

const finish = (entry: Entry, state: "ready" | "error", counted: boolean) => {
  if (entry.state === "ready" || entry.state === "error") return;
  entry.state = state;
  if (entry.el) {
    entry.el.oncanplaythrough = null;
    entry.el.onprogress = null;
    entry.el.onerror = null;
    // On error, release. On success, keep a detached reference so the buffered
    // data has a live owner and stays in the media cache for the visible clip.
    if (state === "error") entry.el = undefined;
  }
  if (counted) {
    active = Math.max(0, active - 1);
    pump();
  }
  notify(entry);
};

const load = (entry: Entry, immediate: boolean) => {
  entry.state = "loading";
  if (!immediate) active += 1;

  const el = document.createElement("video");
  el.muted = true;
  el.preload = "auto";
  el.playsInline = true;
  // Keep it fully out of layout/paint.
  el.style.position = "absolute";
  el.style.width = "1px";
  el.style.height = "1px";
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  entry.el = el;

  const done = (s: "ready" | "error") => finish(entry, s, !immediate);

  // canplaythrough = whole clip buffered; swap only then, so playback never stalls.
  el.oncanplaythrough = () => done("ready");
  el.onerror = () => done("error");
  // Fallback: some CDNs never fire canplaythrough for muted clips. If the buffer
  // already spans the full duration, treat it as ready.
  el.onprogress = () => {
    if (el.duration && el.buffered.length && el.buffered.end(el.buffered.length - 1) >= el.duration - 0.25) {
      done("ready");
    }
  };

  el.src = entry.url;
  el.load();
};

/**
 * Queue a video URL for background loading. `priority` >= PRIORITY_THRESHOLD loads
 * immediately (uncapped) - use it for on-screen / hero clips. Lower priorities go
 * through the capped background lane. Safe to call repeatedly for the same URL.
 */
export const preloadVideo = (url: string, priority = 0) => {
  if (typeof window === "undefined" || !url) return;
  const entry = getEntry(url);
  if (entry.priority < priority) entry.priority = priority;
  if (entry.state !== "queued") return;

  if (entry.priority >= PRIORITY_THRESHOLD) {
    // Priority lane: load right now, don't wait behind the background cap.
    load(entry, true);
    return;
  }
  if (!queue.includes(entry)) {
    queue.push(entry);
    pump();
  }
};

/**
 * Subscribe to a URL's ready state. Returns true once the clip can start playing
 * from cache. Bumps priority so a URL that's actually visible jumps the lane.
 */
export const useBackgroundVideo = (url: string | undefined, priority = 0): boolean => {
  const [ready, setReady] = useState(() => {
    const e = url ? registry.get(url) : undefined;
    return e?.state === "ready";
  });

  useEffect(() => {
    if (!url) return;
    const entry = getEntry(url);

    if (entry.state === "ready") {
      setReady(true);
      return;
    }
    setReady(false);

    const onChange = () => setReady(entry.state === "ready");
    entry.subs.add(onChange);
    preloadVideo(url, priority);

    return () => {
      entry.subs.delete(onChange);
    };
  }, [url, priority]);

  return ready;
};
