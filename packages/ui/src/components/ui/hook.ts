/**
 * VideoPlayer Utility Hooks
 *
 * Advanced hooks for video player features like analytics,
 * watch time tracking, keyboard shortcuts, and more.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVideoPlayer } from "./videoplayer";

// ============================================================================
// useWatchTime — Track total watch time
// ============================================================================

export interface UseWatchTimeReturn {
    /** Total seconds watched across sessions */
    watchTime: number;
    /** Current session watch time */
    sessionWatchTime: number;
    /** 0-100 completion percentage */
    completionPercentage: number;
    /** Reset all counters */
    reset: () => void;
}

export function useWatchTime(): UseWatchTimeReturn {
    const { currentTime, duration, isPlaying } = useVideoPlayer();
    const [watchTime, setWatchTime] = useState(0);
    const [sessionWatchTime, setSessionWatchTime] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setWatchTime((p) => p + 1);
                setSessionWatchTime((p) => p + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying]);

    const completionPercentage =
        duration > 0 ? (currentTime / duration) * 100 : 0;

    const reset = useCallback(() => {
        setWatchTime(0);
        setSessionWatchTime(0);
    }, []);

    return { watchTime, sessionWatchTime, completionPercentage, reset };
}

// ============================================================================
// useVideoAnalytics — Track video events
// ============================================================================

export interface VideoEvent {
    type:
    | "play"
    | "pause"
    | "seek"
    | "ended"
    | "error"
    | "quality_change"
    | "volume_change"
    | "milestone";
    timestamp: number;
    videoTime: number;
    metadata?: Record<string, unknown>;
}

export interface UseVideoAnalyticsOptions {
    onEvent?: (event: VideoEvent) => void;
    /** Milestones to track, e.g. [25, 50, 75, 100] */
    trackMilestones?: number[];
    videoId?: string;
}

export interface UseVideoAnalyticsReturn {
    events: VideoEvent[];
    milestones: ReadonlySet<number>;
    clearEvents: () => void;
    exportData: () => string;
}

export function useVideoAnalytics(
    options: UseVideoAnalyticsOptions = {}
): UseVideoAnalyticsReturn {
    const { onEvent, trackMilestones = [25, 50, 75, 100], videoId } = options;
    const { currentTime, duration, volume, playbackRate } = useVideoPlayer();

    const [events, setEvents] = useState<VideoEvent[]>([]);
    const [milestones, setMilestones] = useState<Set<number>>(
        () => new Set()
    );
    const milestonesTracked = useRef(new Set<number>());

    const addEvent = useCallback(
        (type: VideoEvent["type"], metadata?: Record<string, unknown>) => {
            const event: VideoEvent = {
                type,
                timestamp: Date.now(),
                videoTime: currentTime,
                metadata: {
                    ...metadata,
                    videoId,
                    volume,
                    playbackRate,
                },
            };
            setEvents((prev) => [...prev, event]);
            onEvent?.(event);
        },
        [currentTime, onEvent, videoId, volume, playbackRate]
    );

    // Track milestones
    useEffect(() => {
        if (duration <= 0) return;
        const pct = (currentTime / duration) * 100;

        trackMilestones.forEach((milestone) => {
            if (pct >= milestone && !milestonesTracked.current.has(milestone)) {
                milestonesTracked.current.add(milestone);
                setMilestones((prev) => new Set([...prev, milestone]));
                addEvent("milestone", { milestone: `${milestone}%` });
            }
        });
    }, [currentTime, duration, trackMilestones, addEvent]);

    const clearEvents = useCallback(() => {
        setEvents([]);
        milestonesTracked.current.clear();
        setMilestones(new Set());
    }, []);

    const exportData = useCallback(
        () =>
            JSON.stringify(
                {
                    videoId,
                    events,
                    milestones: Array.from(milestones),
                    totalEvents: events.length,
                },
                null,
                2
            ),
        [videoId, events, milestones]
    );

    return { events, milestones, clearEvents, exportData };
}

// ============================================================================
// useVideoChapters — Chapter navigation
// ============================================================================

export interface VideoChapter {
    title: string;
    startTime: number;
    endTime?: number;
    thumbnail?: string;
}

export interface UseVideoChaptersReturn {
    chapters: VideoChapter[];
    currentChapter: VideoChapter | null;
    currentChapterIndex: number;
    goToChapter: (index: number) => void;
    nextChapter: () => void;
    previousChapter: () => void;
}

export function useVideoChapters(
    chapters: VideoChapter[]
): UseVideoChaptersReturn {
    const { currentTime, seek } = useVideoPlayer();
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

    useEffect(() => {
        const idx = chapters.findIndex((ch, i) => {
            const next = chapters[i + 1];
            return (
                currentTime >= ch.startTime &&
                (!next || currentTime < next.startTime)
            );
        });
        if (idx !== -1) setCurrentChapterIndex(idx);
    }, [currentTime, chapters]);

    const goToChapter = useCallback(
        (index: number) => {
            if (index >= 0 && index < chapters.length)
                seek(chapters[index].startTime);
        },
        [chapters, seek]
    );

    const nextChapter = useCallback(() => {
        if (currentChapterIndex < chapters.length - 1)
            goToChapter(currentChapterIndex + 1);
    }, [currentChapterIndex, chapters.length, goToChapter]);

    const previousChapter = useCallback(() => {
        if (currentChapterIndex > 0)
            goToChapter(currentChapterIndex - 1);
    }, [currentChapterIndex, goToChapter]);

    return {
        chapters,
        currentChapter: chapters[currentChapterIndex] ?? null,
        currentChapterIndex,
        goToChapter,
        nextChapter,
        previousChapter,
    };
}

// ============================================================================
// usePlaybackSpeed — Enhanced playback speed control
// ============================================================================

const DEFAULT_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

export interface UsePlaybackSpeedReturn {
    speed: number;
    speeds: readonly number[];
    setSpeed: (speed: number) => void;
    increaseSpeed: () => void;
    decreaseSpeed: () => void;
    resetSpeed: () => void;
}

export function usePlaybackSpeed(
    availableSpeeds: readonly number[] = DEFAULT_SPEEDS
): UsePlaybackSpeedReturn {
    const { playbackRate, setPlaybackRate } = useVideoPlayer();

    const increaseSpeed = useCallback(() => {
        const idx = availableSpeeds.indexOf(playbackRate);
        if (idx < availableSpeeds.length - 1)
            setPlaybackRate(availableSpeeds[idx + 1]);
    }, [playbackRate, availableSpeeds, setPlaybackRate]);

    const decreaseSpeed = useCallback(() => {
        const idx = availableSpeeds.indexOf(playbackRate);
        if (idx > 0) setPlaybackRate(availableSpeeds[idx - 1]);
    }, [playbackRate, availableSpeeds, setPlaybackRate]);

    const resetSpeed = useCallback(
        () => setPlaybackRate(1),
        [setPlaybackRate]
    );

    return {
        speed: playbackRate,
        speeds: availableSpeeds,
        setSpeed: setPlaybackRate,
        increaseSpeed,
        decreaseSpeed,
        resetSpeed,
    };
}

// ============================================================================
// useVideoBuffer — Advanced buffer monitoring
// ============================================================================

export interface BufferRange {
    start: number;
    end: number;
}

export interface UseVideoBufferReturn {
    bufferedRanges: BufferRange[];
    bufferedPercentage: number;
    isBuffering: boolean;
    bufferHealth: "good" | "fair" | "poor";
}

export function useVideoBuffer(): UseVideoBufferReturn {
    const { videoRef, currentTime, duration, isLoading } = useVideoPlayer();
    const [bufferedRanges, setBufferedRanges] = useState<BufferRange[]>([]);
    const [bufferedPercentage, setBufferedPercentage] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const update = () => {
            const ranges: BufferRange[] = [];
            let total = 0;
            for (let i = 0; i < video.buffered.length; i++) {
                const start = video.buffered.start(i);
                const end = video.buffered.end(i);
                ranges.push({ start, end });
                total += end - start;
            }
            setBufferedRanges(ranges);
            setBufferedPercentage(
                duration > 0 ? (total / duration) * 100 : 0
            );
        };

        video.addEventListener("progress", update);
        update();

        return () => video.removeEventListener("progress", update);
    }, [videoRef, duration]);

    const bufferHealth = useMemo((): "good" | "fair" | "poor" => {
        const ahead = bufferedRanges.reduce((acc, r) => {
            if (r.start <= currentTime && r.end > currentTime)
                return acc + (r.end - currentTime);
            return acc;
        }, 0);
        if (ahead > 30) return "good";
        if (ahead > 10) return "fair";
        return "poor";
    }, [bufferedRanges, currentTime]);

    return {
        bufferedRanges,
        bufferedPercentage,
        isBuffering: isLoading,
        bufferHealth,
    };
}

// ============================================================================
// useVideoQuality — Quality level management
// ============================================================================

import type { QualityLevel } from "./videoplayer";

export interface UseVideoQualityOptions {
    qualities: QualityLevel[];
    onQualityChange?: (quality: QualityLevel) => void;
}

export interface UseVideoQualityReturn {
    qualities: QualityLevel[];
    currentQuality: QualityLevel;
    currentQualityIndex: number;
    setQuality: (index: number) => void;
    autoSelect: () => void;
}

interface NetworkInfo {
    downlink: number;
}

export function useVideoQuality(
    options: UseVideoQualityOptions
): UseVideoQualityReturn {
    const { qualities, onQualityChange } = options;
    const [currentQualityIndex, setCurrentQualityIndex] = useState(0);
    const { videoRef } = useVideoPlayer();

    const setQuality = useCallback(
        (index: number) => {
            if (index < 0 || index >= qualities.length) return;
            setCurrentQualityIndex(index);
            const quality = qualities[index];
            onQualityChange?.(quality);

            if (quality.src && videoRef.current) {
                const time = videoRef.current.currentTime;
                const wasPlaying = !videoRef.current.paused;
                videoRef.current.src = quality.src;
                videoRef.current.currentTime = time;
                if (wasPlaying) videoRef.current.play();
            }
        },
        [qualities, onQualityChange, videoRef]
    );

    const autoSelect = useCallback(() => {
        const conn = (
            navigator as unknown as { connection?: NetworkInfo }
        ).connection;
        if (!conn) return;

        const speed = conn.downlink;
        if (speed > 5) setQuality(qualities.length - 1);
        else if (speed > 2)
            setQuality(Math.floor(qualities.length / 2));
        else setQuality(0);
    }, [qualities, setQuality]);

    return {
        qualities,
        currentQuality: qualities[currentQualityIndex],
        currentQualityIndex,
        setQuality,
        autoSelect,
    };
}

// ============================================================================
// useVideoStateSync — Sync state to localStorage
// ============================================================================

export interface UseVideoStateSyncOptions {
    videoId: string;
    /** Save interval in ms */
    saveInterval?: number;
    resumeOnLoad?: boolean;
}

interface SavedVideoState {
    currentTime: number;
    volume: number;
    playbackRate: number;
    lastUpdated: number;
}

export function useVideoStateSync(
    options: UseVideoStateSyncOptions
): void {
    const { videoId, saveInterval = 5000, resumeOnLoad = true } = options;
    const {
        currentTime,
        volume,
        playbackRate,
        seek,
        setVolume,
        setPlaybackRate,
    } = useVideoPlayer();

    const storageKey = `video-state-${videoId}`;

    // Load saved state on mount
    useEffect(() => {
        if (!resumeOnLoad) return;
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) return;
            const state: SavedVideoState = JSON.parse(raw);
            seek(state.currentTime);
            setVolume(state.volume);
            setPlaybackRate(state.playbackRate);
        } catch {
            // Ignore corrupt state
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    // Save state periodically
    useEffect(() => {
        const id = setInterval(() => {
            const state: SavedVideoState = {
                currentTime,
                volume,
                playbackRate,
                lastUpdated: Date.now(),
            };
            localStorage.setItem(storageKey, JSON.stringify(state));
        }, saveInterval);
        return () => clearInterval(id);
    }, [currentTime, volume, playbackRate, saveInterval, storageKey]);
}

// ============================================================================
// useVideoHotkeys — Custom keyboard shortcuts
// ============================================================================

export interface VideoHotkey {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    action: () => void;
    description: string;
}

export function useVideoHotkeys(
    hotkeys: VideoHotkey[],
    enabled = true
): void {
    const { containerRef } = useVideoPlayer();

    useEffect(() => {
        if (!enabled) return;
        const container = containerRef.current;
        if (!container) return;

        const handler = (e: KeyboardEvent) => {
            const match = hotkeys.find(
                (h) =>
                    h.key.toLowerCase() === e.key.toLowerCase() &&
                    !!h.ctrl === e.ctrlKey &&
                    !!h.shift === e.shiftKey &&
                    !!h.alt === e.altKey
            );
            if (match) {
                e.preventDefault();
                match.action();
            }
        };

        container.addEventListener("keydown", handler);
        return () => container.removeEventListener("keydown", handler);
    }, [hotkeys, enabled, containerRef]);
}

// ============================================================================
// Re-export
// ============================================================================

export { useVideoPlayer };
