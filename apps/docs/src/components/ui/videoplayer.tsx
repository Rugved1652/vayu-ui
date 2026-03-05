"use client";

import { clsx } from "clsx";
import {
    Download,
    Maximize,
    Minimize,
    Pause,
    Play,
    Settings,
    SkipBack,
    SkipForward,
    Subtitles,
    Volume2,
    VolumeX,
} from "lucide-react";
import React, {
    ReactNode,
    VideoHTMLAttributes,
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useId,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

interface QualityLevel {
    label: string;
    height: number;
    src?: string;
}

interface VideoPlayerContextValue {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;

    isPlaying: boolean;
    currentTime: number;
    duration: number;
    buffered: number;
    isLoading: boolean;
    hasEnded: boolean;

    volume: number;
    isMuted: boolean;
    previousVolume: number;

    isFullscreen: boolean;
    showControls: boolean;
    isHoveringControls: boolean;

    playbackRate: number;

    showSubtitles: boolean;
    availableTracks: TextTrack[];
    activeTrackIndex: number;

    qualities: QualityLevel[];
    currentQuality: number;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    seek: (time: number) => void;
    seekForward: (seconds?: number) => void;
    seekBackward: (seconds?: number) => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
    setPlaybackRate: (rate: number) => void;
    toggleSubtitles: () => void;
    setActiveTrack: (index: number) => void;
    setQuality: (index: number) => void;
    download: () => void;

    setShowControls: (show: boolean) => void;
    setIsHoveringControls: (hovering: boolean) => void;
}

// ============================================================================
// Context
// ============================================================================

const VideoPlayerContext = createContext<VideoPlayerContextValue | undefined>(
    undefined
);

const useVideoPlayer = (): VideoPlayerContextValue => {
    const ctx = useContext(VideoPlayerContext);
    if (!ctx) {
        throw new Error(
            "VideoPlayer.* components must be rendered inside <VideoPlayer.Root>."
        );
    }
    return ctx;
};

// ============================================================================
// Helpers (hoisted)
// ============================================================================

function formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// ============================================================================
// Hoisted configs
// ============================================================================

const VIDEO_BTN =
    "p-2 rounded-full transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500";

// ============================================================================
// Root
// ============================================================================

interface VideoPlayerRootProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        | "children"
        | "onPlay"
        | "onPause"
        | "onEnded"
        | "onTimeUpdate"
        | "onVolumeChange"
    > {
    children: ReactNode;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onTimeUpdate?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
    onFullscreenChange?: (isFullscreen: boolean) => void;
    defaultVolume?: number;
    defaultPlaybackRate?: number;
    autoHideControls?: boolean;
    autoHideDelay?: number;
}

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
// Video
// ============================================================================

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
    ({ src, poster, className, ...props }, _ref) => {
        const { videoRef, togglePlay } = useVideoPlayer();

        return (
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className={clsx("w-full h-full", className)}
                onClick={togglePlay}
                {...props}
            >
                Your browser does not support the video tag.
            </video>
        );
    }
);

Video.displayName = "VideoPlayer.Video";

// ============================================================================
// Controls container
// ============================================================================

interface ControlsProps extends HTMLAttributes<HTMLDivElement> { }

const Controls = forwardRef<HTMLDivElement, ControlsProps>(
    ({ className, children, ...props }, ref) => {
        const { showControls, setIsHoveringControls } = useVideoPlayer();

        return (
            <div
                ref={ref}
                className={clsx(
                    "absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/60 to-transparent transition-all duration-300",
                    showControls
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none",
                    className
                )}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
                {...props}
            >
                <div className="p-4 space-y-2">{children}</div>
            </div>
        );
    }
);

Controls.displayName = "VideoPlayer.Controls";

// ============================================================================
// Progress bar
// ============================================================================

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    showBuffer?: boolean;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ showBuffer = true, className, ...props }, ref) => {
        const { currentTime, duration, buffered, seek } =
            useVideoPlayer();
        const [isSeeking, setIsSeeking] = useState(false);
        const [hoverTime, setHoverTime] = useState<number | null>(null);
        const progressRef = useRef<HTMLDivElement>(null);

        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
        const bufferProgress =
            duration > 0 ? (buffered / duration) * 100 : 0;

        const updateSeek = useCallback(
            (clientX: number) => {
                const rect =
                    progressRef.current?.getBoundingClientRect();
                if (!rect) return;
                const pos = Math.max(
                    0,
                    Math.min(1, (clientX - rect.left) / rect.width)
                );
                seek(pos * duration);
            },
            [seek, duration]
        );

        const handleMouseDown = useCallback(
            (e: React.MouseEvent) => {
                setIsSeeking(true);
                updateSeek(e.clientX);
            },
            [updateSeek]
        );

        const handleMouseMove = useCallback(
            (e: React.MouseEvent) => {
                const rect =
                    progressRef.current?.getBoundingClientRect();
                if (rect) {
                    setHoverTime(
                        ((e.clientX - rect.left) / rect.width) *
                        duration
                    );
                }
                if (isSeeking) updateSeek(e.clientX);
            },
            [isSeeking, updateSeek, duration]
        );

        const handleMouseLeave = useCallback(
            () => setHoverTime(null),
            []
        );

        useEffect(() => {
            if (!isSeeking) return;
            const up = () => setIsSeeking(false);
            document.addEventListener("mouseup", up);
            return () => document.removeEventListener("mouseup", up);
        }, [isSeeking]);

        return (
            <div
                ref={ref}
                className={clsx("group/progress", className)}
                {...props}
            >
                <div
                    ref={progressRef}
                    role="slider"
                    tabIndex={0}
                    aria-label="Seek video"
                    aria-valuemin={0}
                    aria-valuemax={duration}
                    aria-valuenow={currentTime}
                    aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                    className="relative h-1.5 bg-white/20 rounded-full cursor-pointer group-hover/progress:h-2 transition-all"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {showBuffer && (
                        <div
                            className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all"
                            style={{ width: `${bufferProgress}%` }}
                            aria-hidden="true"
                        />
                    )}

                    <div
                        className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                        aria-hidden="true"
                    />

                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all"
                        style={{
                            left: `${progress}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                        aria-hidden="true"
                    />

                    {hoverTime !== null && (
                        <div
                            className="absolute -top-8 -translate-x-1/2 bg-black/90 text-white text-xs font-secondary px-2 py-1 rounded pointer-events-none"
                            style={{
                                left: `${(hoverTime / duration) * 100}%`,
                            }}
                            aria-hidden="true"
                        >
                            {formatTime(hoverTime)}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

ProgressBar.displayName = "VideoPlayer.ProgressBar";

// ============================================================================
// Control buttons
// ============================================================================

const PlayPauseButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isPlaying, togglePlay } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            {isPlaying ? (
                <Pause className="w-5 h-5 text-white" aria-hidden="true" />
            ) : (
                <Play className="w-5 h-5 text-white" aria-hidden="true" />
            )}
        </button>
    );
});

PlayPauseButton.displayName = "VideoPlayer.PlayPauseButton";

// ── Skip buttons ──

interface SkipButtonProps extends HTMLAttributes<HTMLButtonElement> {
    seconds?: number;
}

const SkipBackwardButton = forwardRef<HTMLButtonElement, SkipButtonProps>(
    ({ seconds = 10, className, ...props }, ref) => {
        const { seekBackward } = useVideoPlayer();

        return (
            <button
                ref={ref}
                type="button"
                onClick={() => seekBackward(seconds)}
                aria-label={`Skip backward ${seconds} seconds`}
                className={clsx(VIDEO_BTN, className)}
                {...props}
            >
                <SkipBack
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            </button>
        );
    }
);

SkipBackwardButton.displayName = "VideoPlayer.SkipBackwardButton";

const SkipForwardButton = forwardRef<HTMLButtonElement, SkipButtonProps>(
    ({ seconds = 10, className, ...props }, ref) => {
        const { seekForward } = useVideoPlayer();

        return (
            <button
                ref={ref}
                type="button"
                onClick={() => seekForward(seconds)}
                aria-label={`Skip forward ${seconds} seconds`}
                className={clsx(VIDEO_BTN, className)}
                {...props}
            >
                <SkipForward
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            </button>
        );
    }
);

SkipForwardButton.displayName = "VideoPlayer.SkipForwardButton";

// ── Volume ──

const VolumeControl = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { volume, isMuted, setVolume, toggleMute } = useVideoPlayer();
    const [showSlider, setShowSlider] = useState(false);
    const volumeId = useId();

    return (
        <div
            ref={ref}
            className={clsx("flex items-center gap-2", className)}
            onMouseEnter={() => setShowSlider(true)}
            onMouseLeave={() => setShowSlider(false)}
            {...props}
        >
            <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className={VIDEO_BTN}
            >
                {isMuted || volume === 0 ? (
                    <VolumeX
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                    />
                ) : (
                    <Volume2
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                    />
                )}
            </button>

            <div
                className={clsx(
                    "overflow-hidden transition-all duration-200",
                    showSlider ? "w-20 opacity-100" : "w-0 opacity-0"
                )}
            >
                <input
                    id={volumeId}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                        setVolume(parseFloat(e.target.value))
                    }
                    aria-label="Volume"
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>
        </div>
    );
});

VolumeControl.displayName = "VideoPlayer.VolumeControl";

// ── Time display ──

const TimeDisplay = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { currentTime, duration } = useVideoPlayer();

    return (
        <div
            ref={ref}
            className={clsx(
                "text-white text-sm font-secondary font-medium",
                className
            )}
            {...props}
        >
            <time dateTime={`PT${Math.floor(currentTime)}S`}>
                {formatTime(currentTime)}
            </time>
            <span className="mx-1" aria-hidden="true">
                /
            </span>
            <time dateTime={`PT${Math.floor(duration)}S`}>
                {formatTime(duration)}
            </time>
        </div>
    );
});

TimeDisplay.displayName = "VideoPlayer.TimeDisplay";

// ── Fullscreen ──

const FullscreenButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isFullscreen, toggleFullscreen } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={toggleFullscreen}
            aria-label={
                isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
            }
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            {isFullscreen ? (
                <Minimize
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            ) : (
                <Maximize
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                />
            )}
        </button>
    );
});

FullscreenButton.displayName = "VideoPlayer.FullscreenButton";

// ── Settings ──

const SettingsButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        aria-label="Settings"
        className={clsx(VIDEO_BTN, className)}
        {...props}
    >
        <Settings
            className="w-5 h-5 text-white"
            aria-hidden="true"
        />
    </button>
));

SettingsButton.displayName = "VideoPlayer.SettingsButton";

// ── Subtitles ──

const SubtitlesButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { showSubtitles, toggleSubtitles } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={toggleSubtitles}
            aria-label={
                showSubtitles ? "Hide subtitles" : "Show subtitles"
            }
            aria-pressed={showSubtitles}
            className={clsx(
                VIDEO_BTN,
                showSubtitles && "bg-white/20",
                className
            )}
            {...props}
        >
            <Subtitles
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

SubtitlesButton.displayName = "VideoPlayer.SubtitlesButton";

// ── Download ──

const DownloadButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { download } = useVideoPlayer();

    return (
        <button
            ref={ref}
            type="button"
            onClick={download}
            aria-label="Download video"
            className={clsx(VIDEO_BTN, className)}
            {...props}
        >
            <Download
                className="w-5 h-5 text-white"
                aria-hidden="true"
            />
        </button>
    );
});

DownloadButton.displayName = "VideoPlayer.DownloadButton";

// ============================================================================
// Loading overlay
// ============================================================================

const LoadingOverlay = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { isLoading } = useVideoPlayer();
    if (!isLoading) return null;

    return (
        <div
            ref={ref}
            role="status"
            aria-label="Loading video"
            className={clsx(
                "absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none",
                className
            )}
            {...props}
        >
            <div
                className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
            />
            <span className="sr-only">Loading…</span>
        </div>
    );
});

LoadingOverlay.displayName = "VideoPlayer.LoadingOverlay";

// ============================================================================
// Center play button
// ============================================================================

const CenterPlayButton = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    const { isPlaying, togglePlay } = useVideoPlayer();
    if (isPlaying) return null;

    return (
        <button
            ref={ref}
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className={clsx(
                "absolute inset-0 flex items-center justify-center group/center",
                className
            )}
            {...props}
        >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover/center:bg-white transition-colors shadow-xl">
                <Play
                    className="w-10 h-10 text-black ml-1"
                    fill="currentColor"
                    aria-hidden="true"
                />
            </div>
        </button>
    );
});

CenterPlayButton.displayName = "VideoPlayer.CenterPlayButton";

// ============================================================================
// Exports
// ============================================================================

const VideoPlayer = {
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
};

export { VideoPlayer, useVideoPlayer };
export type { QualityLevel, VideoPlayerContextValue };
