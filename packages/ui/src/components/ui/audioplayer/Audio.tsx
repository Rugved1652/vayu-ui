// audioplayer.tsx
// Composition: UI + logic

"use client";

import { clsx } from "clsx";
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    useId,
    forwardRef,
} from "react";
import type {
    Track,
    AudioPlayerState,
    AudioPlayerActions,
    AudioPlayerGetters,
    RootProps,
} from "./types";
import { GLOBAL_PLAY_EVENT } from "./utils";

// ============================================================================
// Types & Context
// ============================================================================

type AudioPlayerContextValue = AudioPlayerState & AudioPlayerActions & AudioPlayerGetters;

const AudioPlayerContext = createContext<AudioPlayerContextValue | undefined>(undefined);

export const useAudioPlayer = (): AudioPlayerContextValue => {
    const ctx = useContext(AudioPlayerContext);
    if (!ctx) throw new Error("AudioPlayer components must be inside <AudioPlayer>.");
    return ctx;
};

export const useAudioPlayerState = (): AudioPlayerState => {
    const { play, pause, togglePlay, seek, setVolume, toggleMute, setPlaybackRate, playTrack, next, previous, setPlaylist, getTrack, ...state } = useAudioPlayer();
    return state as AudioPlayerState;
};

export const useAudioPlayerActions = (): AudioPlayerActions => {
    const { play, pause, togglePlay, seek, setVolume, toggleMute, setPlaybackRate, playTrack, next, previous, setPlaylist } = useAudioPlayer();
    return { play, pause, togglePlay, seek, setVolume, toggleMute, setPlaybackRate, playTrack, next, previous, setPlaylist };
};

// ============================================================================
// Root
// ============================================================================

export const AudioPlayer = forwardRef<HTMLDivElement, RootProps>(({
    children,
    className,
    defaultVolume = 1,
    allowMultiple = false,
    autoPlayNext = true,
    loopPlaylist = false,
    onPlay,
    onPause,
    onEnded,
    onTrackChange,
    ...props
}, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hlsRef = useRef<any>(null);
    const playerId = useId();

    const [playlist, setPlaylistState] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasEnded, setHasEnded] = useState(false);

    const [volume, setVolumeState] = useState(defaultVolume);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRateState] = useState(1);
    const prevVolumeRef = useRef(defaultVolume);

    const currentTrack = playlist[currentTrackIndex] || null;

    // ── Global Play Management ──
    useEffect(() => {
        if (allowMultiple) return;
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail && detail.id !== playerId) {
                audioRef.current?.pause();
            }
        };
        window.addEventListener(GLOBAL_PLAY_EVENT, handler);
        return () => window.removeEventListener(GLOBAL_PLAY_EVENT, handler);
    }, [playerId, allowMultiple]);

    // ── Playlist Setting ──
    const setPlaylist = useCallback((tracks: Track[]) => {
        setPlaylistState(tracks);
    }, []);

    // ── Actions ──
    const play = useCallback(() => {
        audioRef.current?.play().catch(e => setError(e));
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) pause();
        else play();
    }, [isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
        }
    }, []);

    const setVolume = useCallback((v: number) => {
        const val = Math.max(0, Math.min(1, v));
        if (audioRef.current) {
            audioRef.current.volume = val;
            if (val > 0 && isMuted) audioRef.current.muted = false;
        }
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        if (!audioRef.current) return;
        if (isMuted) {
            audioRef.current.muted = false;
            audioRef.current.volume = prevVolumeRef.current;
        } else {
            prevVolumeRef.current = volume;
            audioRef.current.muted = true;
        }
    }, [isMuted, volume]);

    const setPlaybackRate = useCallback((rate: number) => {
        if (audioRef.current) audioRef.current.playbackRate = rate;
    }, []);

    const playTrack = useCallback((index: number) => {
        if (index >= 0 && index < playlist.length) {
            setCurrentTrackIndex(index);
            onTrackChange?.(index, playlist[index]);
            setTimeout(() => play(), 50);
        }
    }, [playlist, onTrackChange, play]);

    const next = useCallback(() => {
        if (playlist.length === 0) return;
        const isLast = currentTrackIndex === playlist.length - 1;
        if (!isLast) playTrack(currentTrackIndex + 1);
        else if (loopPlaylist) playTrack(0);
    }, [currentTrackIndex, playlist.length, loopPlaylist, playTrack]);

    const previous = useCallback(() => {
        if (playlist.length === 0) return;
        if (currentTime > 3) {
            seek(0);
        } else {
            const isFirst = currentTrackIndex === 0;
            if (!isFirst) playTrack(currentTrackIndex - 1);
            else if (loopPlaylist) playTrack(playlist.length - 1);
            else seek(0);
        }
    }, [currentTrackIndex, playlist.length, loopPlaylist, currentTime, seek, playTrack]);

    const getTrack = useCallback((idx: number) => playlist[idx] || null, [playlist]);

    // ── Audio Events ──
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => {
            setIsPlaying(true);
            setHasEnded(false);
            if (!allowMultiple) {
                window.dispatchEvent(new CustomEvent(GLOBAL_PLAY_EVENT, { detail: { id: playerId } }));
            }
            onPlay?.();
            setError(null);
        };
        const handlePause = () => { setIsPlaying(false); onPause?.(); };
        const handleTime = () => setCurrentTime(audio.currentTime);
        const handleDuration = () => setDuration(audio.duration || 0);
        const handleProgress = () => {
            if (audio.buffered.length > 0) {
                setBuffered(audio.buffered.end(audio.buffered.length - 1));
            }
        };
        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setHasEnded(true);
            onEnded?.();
            if (autoPlayNext) next();
        };
        const handleVolume = () => {
            setVolumeState(audio.volume);
            setIsMuted(audio.muted);
            setPlaybackRateState(audio.playbackRate);
        };
        const handleError = (e: Event) => setError(new Error("Playback error occurred."));

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("timeupdate", handleTime);
        audio.addEventListener("durationchange", handleDuration);
        audio.addEventListener("progress", handleProgress);
        audio.addEventListener("waiting", handleWaiting);
        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("volumechange", handleVolume);
        audio.addEventListener("ratechange", handleVolume);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("timeupdate", handleTime);
            audio.removeEventListener("durationchange", handleDuration);
            audio.removeEventListener("progress", handleProgress);
            audio.removeEventListener("waiting", handleWaiting);
            audio.removeEventListener("canplay", handleCanPlay);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("volumechange", handleVolume);
            audio.removeEventListener("ratechange", handleVolume);
            audio.removeEventListener("error", handleError);
        };
    }, [playerId, allowMultiple, autoPlayNext, next, onPlay, onPause, onEnded]);

    // ── HLS & Source Management ──
    const initHls = useCallback(async (src: string, audio: HTMLAudioElement) => {
        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (src.endsWith(".m3u8")) {
            try {
                const HlsModule = (await import("hls.js")).default;
                if (HlsModule.isSupported()) {
                    const hls = new HlsModule();
                    hlsRef.current = hls;
                    hls.loadSource(src);
                    hls.attachMedia(audio);
                    hls.on(HlsModule.Events.ERROR, (_evt, data) => {
                        if (data.fatal) {
                            switch (data.type) {
                                case HlsModule.ErrorTypes.NETWORK_ERROR:
                                    hls.startLoad();
                                    break;
                                case HlsModule.ErrorTypes.MEDIA_ERROR:
                                    hls.recoverMediaError();
                                    break;
                                default:
                                    hls.destroy();
                                    setError(new Error("HLS Fatal playback error"));
                            }
                        }
                    });
                } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
                    audio.src = src;
                }
            } catch (err) {
                console.error("Failed to load hls.js", err);
                setError(new Error("Failed to load HLS playback support."));
            }
        } else {
            audio.src = src;
        }
    }, []);

    useEffect(() => {
        if (!currentTrack || !audioRef.current) return;
        initHls(currentTrack.src, audioRef.current);
    }, [currentTrack?.src, initHls]);

    // ── Context Memo ──
    const ctx = useMemo(() => ({
        playlist, setPlaylist, currentTrackIndex, currentTrack,
        isPlaying, currentTime, duration, buffered,
        volume, isMuted, playbackRate,
        isLoading, error, hasEnded, playerId,
        play, pause, togglePlay, seek, setVolume, toggleMute, setPlaybackRate,
        playTrack, next, previous, getTrack
    }), [
        playlist, setPlaylist, currentTrackIndex, currentTrack,
        isPlaying, currentTime, duration, buffered,
        volume, isMuted, playbackRate,
        isLoading, error, hasEnded, playerId,
        play, pause, togglePlay, seek, setVolume, toggleMute, setPlaybackRate,
        playTrack, next, previous, getTrack
    ]);

    // ── Keyboard Support ──
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    seek(currentTime - 5);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    seek(currentTime + 5);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setVolume(volume + 0.1);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    setVolume(volume - 0.1);
                    break;
                case "n":
                    e.preventDefault();
                    next();
                    break;
                case "p":
                    e.preventDefault();
                    previous();
                    break;
            }
        };
        const el = ref && typeof ref !== 'function' ? ref.current : null;
        if (el) el.addEventListener("keydown", handler);
        return () => { if (el) el.removeEventListener("keydown", handler); };
    }, [togglePlay, seek, currentTime, setVolume, volume, next, previous, ref]);


    return (
        <AudioPlayerContext.Provider value={ctx}>
            <div
                ref={ref}
                role="region"
                aria-label="Audio Player"
                tabIndex={0}
                className={clsx(
                    "flex flex-col bg-surface text-surface-content rounded-surface overflow-hidden focus:outline-none focus:ring-2 focus:ring-focus",
                    className
                )}
                {...props}
            >
                <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" className="hidden" />
                {children}
            </div>
        </AudioPlayerContext.Provider>
    );
});
AudioPlayer.displayName = "AudioPlayer";

// ============================================================================
// Internal Source (Optional Fallback)
// ============================================================================
export const AudioPlayerSource = ({ src }: { src?: string }) => null;

// ============================================================================
// Default Export
// ============================================================================

// Import subcomponents for compound API
import { AudioPlayerPlaylist, AudioPlayerTrack } from "./AudioPlaylist";
import { AudioPlayerTrackInfo } from "./AudioTrackInfo";
import {
    AudioPlayerControls,
    AudioPlayerPlayPause,
    AudioPlayerNext,
    AudioPlayerPrevious,
    AudioPlayerTime,
} from "./AudioControls";
import { AudioPlayerSeek, AudioPlayerProgress } from "./AudioProgress";
import { AudioPlayerVolume, AudioPlayerMute } from "./AudioVolume";
import { AudioPlayerRate } from "./AudioRate";
import { AudioPlayerLoading, AudioPlayerError, AudioPlayerBuffer } from "./AudioStatus";
import { AudioPlayerWaveform } from "./AudioWaveform";

const DefaultAudioPlayer = Object.assign(AudioPlayer, {
    Root: AudioPlayer,
    Source: AudioPlayerSource,
    Playlist: AudioPlayerPlaylist,
    Track: AudioPlayerTrack,
    TrackInfo: AudioPlayerTrackInfo,
    Controls: AudioPlayerControls,
    PlayPause: AudioPlayerPlayPause,
    Next: AudioPlayerNext,
    Previous: AudioPlayerPrevious,
    Progress: AudioPlayerProgress,
    Seek: AudioPlayerSeek,
    Time: AudioPlayerTime,
    Volume: AudioPlayerVolume,
    Mute: AudioPlayerMute,
    Rate: AudioPlayerRate,
    Waveform: AudioPlayerWaveform,
    Buffer: AudioPlayerBuffer,
    Loading: AudioPlayerLoading,
    Error: AudioPlayerError,
});

export default DefaultAudioPlayer;
