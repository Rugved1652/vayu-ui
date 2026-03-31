// videoplayer.tsx
// Composition: Root component + context + core logic

"use client";

import { clsx } from "clsx";
import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import type { QualityLevel, VideoPlayerContextValue, VideoPlayerRootProps } from "./types";

// ============================================================================
// Context
// ============================================================================

const VideoPlayerContext = createContext<VideoPlayerContextValue | undefined>(
    undefined
);

export const useVideoPlayer = (): VideoPlayerContextValue => {
    const ctx = useContext(VideoPlayerContext);
    if (!ctx) {
        throw new Error(
            "VideoPlayer.* components must be rendered inside <VideoPlayer.Root>."
        );
    }
    return ctx;
};

// ============================================================================
// Root
// ============================================================================

const VideoPlayerRoot = forwardRef<
    { videoElement: HTMLVideoElement | null },
    VideoPlayerRootProps
>(
    (
        {
            children,
            className,
            onPlay,
            onPause,
            onEnded,
            onTimeUpdate,
            onVolumeChange,
            onFullscreenChange,
            defaultVolume = 1,
            defaultPlaybackRate = 1,
            autoHideControls = true,
            autoHideDelay = 3000,
            ...divProps
        },
        ref
    ) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

        // Playback
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [buffered, setBuffered] = useState(0);
        const [isLoading, setIsLoading] = useState(false);
        const [hasEnded, setHasEnded] = useState(false);

        // Volume
        const [volume, setVolumeState] = useState(defaultVolume);
        const [isMuted, setIsMuted] = useState(false);
        const [previousVolume, setPreviousVolume] = useState(defaultVolume);

        // UI
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [showControls, setShowControls] = useState(true);
        const [isHoveringControls, setIsHoveringControls] = useState(false);

        // Playback rate
        const [playbackRate, setPlaybackRateState] =
            useState(defaultPlaybackRate);

        // Subtitles
        const [showSubtitles, setShowSubtitles] = useState(false);
        const [availableTracks, setAvailableTracks] = useState<TextTrack[]>(
            []
        );
        const [activeTrackIndex, setActiveTrackIndex] = useState(-1);

        // Quality
        const [qualities] = useState<QualityLevel[]>([]);
        const [currentQuality, setCurrentQuality] = useState(0);

        const regionId = useId();

        useImperativeHandle(ref, () => ({
            videoElement: videoRef.current,
        }));

        // ── Actions ──

        const play = useCallback(() => {
            videoRef.current?.play();
        }, []);

        const pause = useCallback(() => {
            videoRef.current?.pause();
        }, []);

        const togglePlay = useCallback(() => {
            if (isPlaying) pause();
            else play();
        }, [isPlaying, play, pause]);

        const seek = useCallback((time: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = Math.max(
                    0,
                    Math.min(time, videoRef.current.duration || 0)
                );
            }
        }, []);

        const seekForward = useCallback(
            (seconds = 10) => seek(currentTime + seconds),
            [currentTime, seek]
        );

        const seekBackward = useCallback(
            (seconds = 10) => seek(currentTime - seconds),
            [currentTime, seek]
        );

        const setVolume = useCallback(
            (vol: number) => {
                const v = Math.max(0, Math.min(1, vol));
                if (videoRef.current) {
                    videoRef.current.volume = v;
                    if (v > 0 && isMuted) videoRef.current.muted = false;
                }
            },
            [isMuted]
        );

        const toggleMute = useCallback(() => {
            if (!videoRef.current) return;
            if (isMuted) {
                videoRef.current.muted = false;
                videoRef.current.volume = previousVolume;
            } else {
                setPreviousVolume(volume);
                videoRef.current.muted = true;
            }
        }, [isMuted, volume, previousVolume]);

        const toggleFullscreen = useCallback(async () => {
            const container = containerRef.current;
            if (!container) return;
            try {
                if (!document.fullscreenElement) {
                    await container.requestFullscreen();
                } else {
                    await document.exitFullscreen();
                }
            } catch (err) {
                console.error("Fullscreen error:", err);
            }
        }, []);

        const setPlaybackRate = useCallback((rate: number) => {
            if (videoRef.current) videoRef.current.playbackRate = rate;
        }, []);

        const toggleSubtitles = useCallback(() => {
            setShowSubtitles((prev) => {
                const next = !prev;
                if (videoRef.current && availableTracks.length > 0) {
                    const track =
                        availableTracks[
                        activeTrackIndex >= 0 ? activeTrackIndex : 0
                        ];
                    if (track) track.mode = next ? "showing" : "hidden";
                }
                return next;
            });
        }, [availableTracks, activeTrackIndex]);

        const setActiveTrack = useCallback(
            (index: number) => {
                setActiveTrackIndex(index);
                availableTracks.forEach((track, i) => {
                    track.mode =
                        i === index && showSubtitles ? "showing" : "hidden";
                });
            },
            [availableTracks, showSubtitles]
        );

        const setQuality = useCallback((index: number) => {
            setCurrentQuality(index);
        }, []);

        const download = useCallback(() => {
            if (!videoRef.current?.src) return;
            const a = document.createElement("a");
            a.href = videoRef.current.src;
            a.download = "video.mp4";
            a.click();
        }, []);

        // ── Auto-hide controls ──

        const resetHideControlsTimer = useCallback(() => {
            if (!autoHideControls || !isPlaying) return;
            if (hideControlsTimeoutRef.current)
                clearTimeout(hideControlsTimeoutRef.current);
            setShowControls(true);
            hideControlsTimeoutRef.current = setTimeout(() => {
                if (!isHoveringControls) setShowControls(false);
            }, autoHideDelay);
        }, [autoHideControls, autoHideDelay, isPlaying, isHoveringControls]);

        useEffect(() => {
            if (isPlaying && autoHideControls) {
                resetHideControlsTimer();
            } else {
                setShowControls(true);
                if (hideControlsTimeoutRef.current)
                    clearTimeout(hideControlsTimeoutRef.current);
            }
            return () => {
                if (hideControlsTimeoutRef.current)
                    clearTimeout(hideControlsTimeoutRef.current);
            };
        }, [isPlaying, autoHideControls, resetHideControlsTimer]);

        // ── Video event listeners ──

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            const onPlayEvt = () => {
                setIsPlaying(true);
                setHasEnded(false);
                onPlay?.();
            };
            const onPauseEvt = () => {
                setIsPlaying(false);
                onPause?.();
            };
            const onTimeUpdateEvt = () => {
                setCurrentTime(video.currentTime);
                onTimeUpdate?.(video.currentTime);
            };
            const onDuration = () => setDuration(video.duration);
            const onProgress = () => {
                if (video.buffered.length > 0)
                    setBuffered(
                        video.buffered.end(video.buffered.length - 1)
                    );
            };
            const onWaiting = () => setIsLoading(true);
            const onCanPlay = () => setIsLoading(false);
            const onEndedEvt = () => {
                setIsPlaying(false);
                setHasEnded(true);
                onEnded?.();
            };
            const onVolume = () => {
                setVolumeState(video.volume);
                setIsMuted(video.muted);
                onVolumeChange?.(video.volume);
            };
            const onRate = () =>
                setPlaybackRateState(video.playbackRate);
            const onMeta = () => {
                setAvailableTracks(Array.from(video.textTracks));
            };

            video.addEventListener("play", onPlayEvt);
            video.addEventListener("pause", onPauseEvt);
            video.addEventListener("timeupdate", onTimeUpdateEvt);
            video.addEventListener("durationchange", onDuration);
            video.addEventListener("progress", onProgress);
            video.addEventListener("waiting", onWaiting);
            video.addEventListener("canplay", onCanPlay);
            video.addEventListener("ended", onEndedEvt);
            video.addEventListener("volumechange", onVolume);
            video.addEventListener("ratechange", onRate);
            video.addEventListener("loadedmetadata", onMeta);

            return () => {
                video.removeEventListener("play", onPlayEvt);
                video.removeEventListener("pause", onPauseEvt);
                video.removeEventListener("timeupdate", onTimeUpdateEvt);
                video.removeEventListener("durationchange", onDuration);
                video.removeEventListener("progress", onProgress);
                video.removeEventListener("waiting", onWaiting);
                video.removeEventListener("canplay", onCanPlay);
                video.removeEventListener("ended", onEndedEvt);
                video.removeEventListener("volumechange", onVolume);
                video.removeEventListener("ratechange", onRate);
                video.removeEventListener("loadedmetadata", onMeta);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // ── Fullscreen listener ──

        useEffect(() => {
            const handler = () => {
                const fs = !!document.fullscreenElement;
                setIsFullscreen(fs);
                onFullscreenChange?.(fs);
            };
            document.addEventListener("fullscreenchange", handler);
            return () =>
                document.removeEventListener("fullscreenchange", handler);
        }, [onFullscreenChange]);

        // ── Keyboard ──

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const handler = (e: KeyboardEvent) => {
                if (
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement
                )
                    return;

                switch (e.key) {
                    case " ":
                    case "k":
                        e.preventDefault();
                        togglePlay();
                        break;
                    case "ArrowLeft":
                    case "j":
                        e.preventDefault();
                        seekBackward(5);
                        break;
                    case "ArrowRight":
                    case "l":
                        e.preventDefault();
                        seekForward(5);
                        break;
                    case "ArrowUp":
                        e.preventDefault();
                        setVolume(Math.min(1, volume + 0.1));
                        break;
                    case "ArrowDown":
                        e.preventDefault();
                        setVolume(Math.max(0, volume - 0.1));
                        break;
                    case "m":
                        e.preventDefault();
                        toggleMute();
                        break;
                    case "f":
                        e.preventDefault();
                        toggleFullscreen();
                        break;
                    case "c":
                        e.preventDefault();
                        toggleSubtitles();
                        break;
                    case "0":
                    case "Home":
                        e.preventDefault();
                        seek(0);
                        break;
                    case "End":
                        e.preventDefault();
                        seek(duration);
                        break;
                }
            };

            container.addEventListener("keydown", handler);
            return () => container.removeEventListener("keydown", handler);
        }, [
            togglePlay,
            seekBackward,
            seekForward,
            setVolume,
            volume,
            toggleMute,
            toggleFullscreen,
            toggleSubtitles,
            seek,
            duration,
        ]);

        // ── Context (memoized) ──

        const ctx = useMemo<VideoPlayerContextValue>(
            () => ({
                videoRef,
                containerRef,
                isPlaying,
                currentTime,
                duration,
                buffered,
                isLoading,
                hasEnded,
                volume,
                isMuted,
                previousVolume,
                isFullscreen,
                showControls,
                isHoveringControls,
                playbackRate,
                showSubtitles,
                availableTracks,
                activeTrackIndex,
                qualities,
                currentQuality,
                play,
                pause,
                togglePlay,
                seek,
                seekForward,
                seekBackward,
                setVolume,
                toggleMute,
                toggleFullscreen,
                setPlaybackRate,
                toggleSubtitles,
                setActiveTrack,
                setQuality,
                download,
                setShowControls,
                setIsHoveringControls,
            }),
            [
                isPlaying,
                currentTime,
                duration,
                buffered,
                isLoading,
                hasEnded,
                volume,
                isMuted,
                previousVolume,
                isFullscreen,
                showControls,
                isHoveringControls,
                playbackRate,
                showSubtitles,
                availableTracks,
                activeTrackIndex,
                qualities,
                currentQuality,
                play,
                pause,
                togglePlay,
                seek,
                seekForward,
                seekBackward,
                setVolume,
                toggleMute,
                toggleFullscreen,
                setPlaybackRate,
                toggleSubtitles,
                setActiveTrack,
                setQuality,
                download,
            ]
        );

        return (
            <VideoPlayerContext.Provider value={ctx}>
                <div
                    ref={containerRef}
                    id={regionId}
                    role="region"
                    aria-label="Video player"
                    tabIndex={0}
                    className={clsx(
                        "relative bg-black overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-500",
                        className
                    )}
                    onMouseMove={resetHideControlsTimer}
                    onMouseLeave={() => {
                        if (
                            autoHideControls &&
                            isPlaying &&
                            !isHoveringControls
                        )
                            setShowControls(false);
                    }}
                    {...divProps}
                >
                    {children}
                </div>
            </VideoPlayerContext.Provider>
        );
    }
);

VideoPlayerRoot.displayName = "VideoPlayer.Root";

// ============================================================================
// Default Export
// ============================================================================

// Import subcomponents for compound API
import { Video } from "./Video";
import { Controls } from "./VideoPlayerControls";
import { ProgressBar } from "./VideoPlayerProgress";
import { VolumeControl } from "./VideoPlayerVolume";
import {
    PlayPauseButton,
    SkipBackwardButton,
    SkipForwardButton,
    TimeDisplay,
    FullscreenButton,
    SettingsButton,
    SubtitlesButton,
    DownloadButton,
    LoadingOverlay,
    CenterPlayButton,
} from "./VideoPlayerButtons";

const DefaultVideoPlayer = Object.assign(VideoPlayerRoot, {
    Root: VideoPlayerRoot,
    Video,
    Controls,
    ProgressBar,
    PlayPauseButton,
    SkipBackwardButton,
    SkipForwardButton,
    VolumeControl,
    TimeDisplay,
    FullscreenButton,
    SettingsButton,
    SubtitlesButton,
    DownloadButton,
    LoadingOverlay,
    CenterPlayButton,
});

export default DefaultVideoPlayer;
