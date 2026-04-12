"use client";

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import { clsx } from "clsx";
import type {
  VideoTrack,
  VideoQuality,
  VideoPlayerContextValue,
  VideoPlayerRootProps,
} from "./types";
import { isHLS } from "./utils";

// ============================================================================
// Multi-Instance Manager
// ============================================================================

class VideoPlayerManager {
  private activePlayerId: string | null = null;
  private listeners: Map<string, () => void> = new Map();

  register(id: string, onPause: () => void): void {
    this.listeners.set(id, onPause);
  }

  unregister(id: string): void {
    this.listeners.delete(id);
    if (this.activePlayerId === id) {
      this.activePlayerId = null;
    }
  }

  notifyPlay(playerId: string): void {
    if (this.activePlayerId && this.activePlayerId !== playerId) {
      const pauseHandler = this.listeners.get(this.activePlayerId);
    pauseHandler?.();
    }
    this.activePlayerId = playerId;
  }

  isActive(playerId: string): boolean {
    return this.activePlayerId === playerId;
  }
}

const globalVideoPlayerManager = new VideoPlayerManager();

// ============================================================================
// Context
// ============================================================================

const VideoPlayerContext = createContext<VideoPlayerContextValue | undefined>(undefined);

export const useVideoPlayer = (): VideoPlayerContextValue => {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx) {
    throw new Error("VideoPlayer.* components must be used within VideoPlayer.Root");
  }
  return ctx;
};

export const useVideoPlayerState = () => {
  const {
    isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
    playbackRate, isSeeking, currentTrack, playlist, currentTrackIndex,
    error, loop, shuffle, isFullscreen, isPiP,
    captionsEnabled, selectedQuality, availableQualities,
  } = useVideoPlayer();
  return {
    isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
    playbackRate, isSeeking, currentTrack, playlist, currentTrackIndex,
    error, loop, shuffle, isFullscreen, isPiP,
    captionsEnabled, selectedQuality, availableQualities,
  };
};

export const useVideoPlayerActions = () => {
  const ctx = useVideoPlayer();
  return {
    play: ctx.play, pause: ctx.pause, togglePlay: ctx.togglePlay,
    seek: ctx.seek, seekForward: ctx.seekForward, seekBackward: ctx.seekBackward,
    setVolume: ctx.setVolume, volumeUp: ctx.volumeUp, volumeDown: ctx.volumeDown,
    toggleMute: ctx.toggleMute, setPlaybackRate: ctx.setPlaybackRate,
    nextTrack: ctx.nextTrack, previousTrack: ctx.previousTrack, playTrack: ctx.playTrack,
    toggleLoop: ctx.toggleLoop, toggleShuffle: ctx.toggleShuffle,
    toggleFullscreen: ctx.toggleFullscreen, togglePiP: ctx.togglePiP,
    toggleCaptions: ctx.toggleCaptions, setQuality: ctx.setQuality,
    formatTime: ctx.formatTime, setSeeking: ctx.setSeeking,
    clearError: ctx.clearError,
  };
};

// ============================================================================
// Root Component
// ============================================================================

export const VideoPlayerRoot = forwardRef<HTMLDivElement, VideoPlayerRootProps>(
  (
    {
      children,
      track,
      playlist: initialPlaylist = [],
      defaultVolume = 0.8,
      defaultMuted = false,
      defaultPlaybackRate = 1,
      allowMultiple = false,
      autoPlay = false,
      onPlay,
      onPause,
      onTrackChange,
      onTimeUpdate,
      onEnded,
      onError,
      onFullscreenChange,
      className,
    },
    ref
  ) => {
    const playerId = useId();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const recoveryAttemptsRef = useRef(0);

    // Track when video element is mounted (via registerVideo callback)
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

    const registerVideo = useCallback((element: HTMLVideoElement | null) => {
      videoRef.current = element;
      setVideoElement(element);
    }, []);

    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolumeState] = useState(defaultVolume);
    const [isMuted, setIsMuted] = useState(defaultMuted);
    const [playbackRate, setPlaybackRateState] = useState(defaultPlaybackRate);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffleState] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState(-1);
    const [availableQualities, setAvailableQualities] = useState<VideoQuality[]>([]);

    const [playlist] = useState<VideoTrack[]>(
      track ? [track, ...initialPlaylist] : initialPlaylist
    );
    const [currentTrackIndex, setCurrentTrackIndex] = useState(track ? 0 : -1);
    const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;

    // Global manager
    const notifyGlobalPlay = useCallback(() => {
      if (!allowMultiple) {
        globalVideoPlayerManager.notifyPlay(playerId);
      }
    }, [allowMultiple, playerId]);

    useEffect(() => {
      const handleExternalPause = () => {
        if (!allowMultiple && globalVideoPlayerManager.isActive(playerId)) return;
        videoRef.current?.pause();
        setIsPlaying(false);
      };
      globalVideoPlayerManager.register(playerId, handleExternalPause);
      return () => globalVideoPlayerManager.unregister(playerId);
    }, [allowMultiple, playerId]);

    // Cleanup HLS on unmount
    useEffect(() => {
      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, []);

    // HLS Integration
    useEffect(() => {
      const video = videoElement;
      if (!video || !currentTrack?.src) return;

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      setError(null);
      setIsLoading(true);
      setAvailableQualities([]);
      setSelectedQuality(-1);
      recoveryAttemptsRef.current = 0;

      if (isHLS(currentTrack.src)) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            fragLoadingMaxRetry: 4,
            levelLoadingMaxRetry: 4,
            manifestLoadingMaxRetry: 3,
            startLevel: -1,
          });
          hls.loadSource(currentTrack.src);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const qualities: VideoQuality[] = hls.levels.map((level) => ({
              height: level.height,
              bitrate: level.bitrate,
              label: level.height
                ? `${level.height}p`
                : level.bitrate
                  ? `${Math.round(level.bitrate / 1000)}kbps`
                  : "Unknown",
            }));
            setAvailableQualities(qualities);
            if (autoPlay) video.play().catch(() => {});
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (_: unknown, data: { level: number }) => {
            setSelectedQuality(data.level);
          });

          hls.on(Hls.Events.FRAG_LOADED, () => {
            recoveryAttemptsRef.current = 0;
            setIsLoading(false);
          });

          const MAX_RECOVERY_ATTEMPTS = 3;
          hls.on(Hls.Events.ERROR, (_: unknown, data: any) => {
            if (!data.fatal) return;

            if (recoveryAttemptsRef.current >= MAX_RECOVERY_ATTEMPTS) {
              setError("Playback failed — max recovery attempts reached");
              hls.destroy();
              hlsRef.current = null;
              onError?.("Playback failed — max recovery attempts reached");
              return;
            }

            recoveryAttemptsRef.current++;
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError(`Network error — retrying (${recoveryAttemptsRef.current}/${MAX_RECOVERY_ATTEMPTS})...`);
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError(`Media error — retrying (${recoveryAttemptsRef.current}/${MAX_RECOVERY_ATTEMPTS})...`);
                hls.recoverMediaError();
                break;
              default:
                setError(`Playback error: ${data.type}`);
                hls.destroy();
                hlsRef.current = null;
                break;
            }
            onError?.(`Playback error: ${data.type}`);
          });

          hlsRef.current = hls;
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = currentTrack.src;
          setIsLoading(false);
        }
      } else {
        video.src = currentTrack.src;
        setIsLoading(false);
        if (autoPlay) video.play().catch(() => {});
      }

      // Add subtitle track
      if (currentTrack.subtitleSrc) {
        const existing = video.querySelectorAll("track");
        existing.forEach((t) => t.remove());
        const trackEl = document.createElement("track");
        trackEl.kind = "subtitles";
        trackEl.label = "English";
        trackEl.srclang = "en";
        trackEl.src = currentTrack.subtitleSrc;
        trackEl.default = false;
        video.appendChild(trackEl);
      }

      onTrackChange?.(currentTrack);
    }, [currentTrack, videoElement, autoPlay, onTrackChange, onError]);

    // Core Actions
    const play = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          notifyGlobalPlay();
          onPlay?.();
        })
        .catch((err: Error) => {
          const msg = `Playback failed: ${err.message}`;
          setError(msg);
          onError?.(msg);
        });
    }, [notifyGlobalPlay, onPlay, onError]);

    const pause = useCallback(() => {
      videoRef.current?.pause();
      setIsPlaying(false);
      onPause?.();
    }, [onPause]);

    const togglePlay = useCallback(() => {
      if (isPlaying) pause();
      else play();
    }, [isPlaying, play, pause]);

    const seek = useCallback(
      (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        const clamped = Math.max(0, Math.min(time, duration || 0));
        video.currentTime = clamped;
        setCurrentTime(clamped);
      },
      [duration]
    );

    const seekForward = useCallback(
      (seconds = 5) => seek(currentTime + seconds),
      [currentTime, seek]
    );

    const seekBackward = useCallback(
      (seconds = 5) => seek(currentTime - seconds),
      [currentTime, seek]
    );

    const setVolume = useCallback(
      (vol: number) => {
        const video = videoRef.current;
        const clampedVol = Math.max(0, Math.min(1, vol));
        setVolumeState(clampedVol);
        if (video) video.volume = clampedVol;
        if (clampedVol > 0 && isMuted) {
          setIsMuted(false);
          if (video) video.muted = false;
        }
      },
      [isMuted]
    );

    const volumeUp = useCallback(
      (step = 0.1) => setVolume(volume + step),
      [volume, setVolume]
    );

    const volumeDown = useCallback(
      (step = 0.1) => setVolume(volume - step),
      [volume, setVolume]
    );

    const toggleMute = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      const newMuted = !isMuted;
      video.muted = newMuted;
      setIsMuted(newMuted);
    }, [isMuted]);

    const setPlaybackRate = useCallback((rate: number) => {
      const clamped = Math.max(0.25, Math.min(4, rate));
      setPlaybackRateState(clamped);
      if (videoRef.current) videoRef.current.playbackRate = clamped;
    }, []);

    const playTrack = useCallback(
      (index: number) => {
        if (index < 0 || index >= playlist.length) return;
        setCurrentTrackIndex(index);
        setIsLoading(true);
        setIsPlaying(false);
        setError(null);
        requestAnimationFrame(() => {
          const video = videoRef.current;
          if (video) {
            video.load();
            video.play().catch(() => {});
          }
        });
      },
      [playlist]
    );

    const getShuffledIndex = useCallback(
      (currentIndex: number): number => {
        if (playlist.length <= 1) return 0;
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * playlist.length);
        } while (newIndex === currentIndex);
        return newIndex;
      },
      [playlist.length]
    );

    const nextTrack = useCallback(() => {
      if (shuffle) {
        playTrack(getShuffledIndex(currentTrackIndex));
      } else {
        const next = (currentTrackIndex + 1) % playlist.length;
        if (next === 0 && !loop && playlist.length > 1) {
          pause();
          seek(0);
          return;
        }
        playTrack(next);
      }
    }, [currentTrackIndex, playlist.length, shuffle, loop, playTrack, getShuffledIndex, pause, seek]);

    const previousTrack = useCallback(() => {
      if (currentTime > 3) {
        seek(0);
      } else {
        const prev = currentTrackIndex <= 0 ? playlist.length - 1 : currentTrackIndex - 1;
        playTrack(prev);
      }
    }, [currentTime, currentTrackIndex, playlist.length, playTrack, seek]);

    const toggleLoop = useCallback(() => setLoop((p) => !p), []);
    const toggleShuffle = useCallback(() => setShuffleState((p) => !p), []);

    const toggleFullscreen = useCallback(async () => {
      const container = containerRef.current;
      if (!container) return;
      try {
        if (!document.fullscreenElement) {
          await container.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch {
        // Fullscreen denied
      }
    }, []);

    const togglePiP = useCallback(async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPiP(false);
        } else {
          await video.requestPictureInPicture();
          setIsPiP(true);
        }
      } catch {
        // PiP not supported or denied
      }
    }, []);

    const toggleCaptions = useCallback(() => {
      const video = videoRef.current;
      if (!video || video.textTracks.length === 0) return;
      const track = video.textTracks[0];
      const newEnabled = !captionsEnabled;
      track.mode = newEnabled ? "showing" : "hidden";
      setCaptionsEnabled(newEnabled);
    }, [captionsEnabled]);

    const setQuality = useCallback((levelIndex: number) => {
      if (hlsRef.current) {
        hlsRef.current.currentLevel = levelIndex;
        setSelectedQuality(levelIndex);
      }
    }, []);

    const setSeeking = useCallback((seeking: boolean) => setIsSeeking(seeking), []);
    const clearError = useCallback(() => setError(null), []);

    const formatTime = useCallback(
      (seconds: number): string => {
        if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        return `${m}:${s.toString().padStart(2, "0")}`;
      },
      []
    );

    // Video event listeners (depends on videoElement)
    useEffect(() => {
      if (!videoElement) return;
      const video = videoElement;

      const onPlayEvt = () => { setIsPlaying(true); setIsLoading(false); notifyGlobalPlay(); onPlay?.(); };
      const onPauseEvt = () => { setIsPlaying(false); onPause?.(); };
      const onWaiting = () => setIsLoading(true);
      const onCanPlay = () => setIsLoading(false);
      const onDuration = () => setDuration(video.duration);
      const onTime = () => {
        if (!isSeeking) {
          setCurrentTime(video.currentTime);
          onTimeUpdate?.(video.currentTime);
        }
      };
      const onProgress = () => {
        if (video.buffered.length > 0) setBuffered(video.buffered.end(video.buffered.length - 1));
      };
      const onEnd = () => {
        setIsPlaying(false);
        onEnded?.();
        if (loop) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          nextTrack();
        }
      };
      const onVol = () => { setVolumeState(video.volume); setIsMuted(video.muted); };
      const onRate = () => setPlaybackRateState(video.playbackRate);
      const onEnterPiP = () => setIsPiP(true);
      const onLeavePiP = () => setIsPiP(false);
      const onErrorEvt = () => {
        const code = video.error?.code;
        const msg = video.error?.message || "Unknown error";
        setError(`Error ${code}: ${msg}`);
        onError?.(`Error ${code}: ${msg}`);
      };

      const events: [string, EventListener][] = [
        ["play", onPlayEvt], ["pause", onPauseEvt],
        ["waiting", onWaiting], ["canplay", onCanPlay],
        ["durationchange", onDuration], ["timeupdate", onTime],
        ["progress", onProgress], ["ended", onEnd],
        ["volumechange", onVol], ["ratechange", onRate],
        ["enterpictureinpicture", onEnterPiP],
        ["leavepictureinpicture", onLeavePiP],
        ["error", onErrorEvt],
      ];

      events.forEach(([e, h]) => video.addEventListener(e, h));
      video.volume = defaultVolume;
      video.muted = defaultMuted;
      video.playbackRate = defaultPlaybackRate;

      return () => events.forEach(([e, h]) => video.removeEventListener(e, h));
    }, [videoElement, defaultVolume, defaultMuted, defaultPlaybackRate, isSeeking, loop, nextTrack, notifyGlobalPlay, onPlay, onPause, onTimeUpdate, onEnded, onError]);

    // Fullscreen listener
    useEffect(() => {
      const handler = () => {
        const fs = !!document.fullscreenElement;
        setIsFullscreen(fs);
        onFullscreenChange?.(fs);
      };
      document.addEventListener("fullscreenchange", handler);
      return () => document.removeEventListener("fullscreenchange", handler);
    }, [onFullscreenChange]);

    // Keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") return;
        switch (e.key) {
          case " ": case "k": e.preventDefault(); togglePlay(); break;
          case "m": toggleMute(); break;
          case "f": toggleFullscreen(); break;
          case "c": toggleCaptions(); break;
          case "ArrowLeft": e.preventDefault(); seekBackward(5); break;
          case "ArrowRight": e.preventDefault(); seekForward(5); break;
          case "ArrowUp": e.preventDefault(); volumeUp(); break;
          case "ArrowDown": e.preventDefault(); volumeDown(); break;
          case "n": nextTrack(); break;
          case "p": previousTrack(); break;
          case "l": toggleLoop(); break;
          case "s": toggleShuffle(); break;
        }
      },
      [togglePlay, toggleMute, toggleFullscreen, toggleCaptions, seekBackward, seekForward, volumeUp, volumeDown, nextTrack, previousTrack, toggleLoop, toggleShuffle]
    );

    // Context value
    const contextValue = useMemo<VideoPlayerContextValue>(
      () => ({
        isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
        playbackRate, isSeeking, currentTrack, playlist, currentTrackIndex,
        error, loop, shuffle, isFullscreen, isPiP, captionsEnabled,
        selectedQuality, availableQualities,
        play, pause, togglePlay, seek, seekForward, seekBackward,
        setVolume, volumeUp, volumeDown, toggleMute, setPlaybackRate,
        nextTrack, previousTrack, playTrack, toggleLoop, toggleShuffle,
        toggleFullscreen, togglePiP, toggleCaptions, setQuality,
        formatTime, setSeeking, clearError,
        playerId, videoRef, containerRef, allowMultiple, registerVideo,
      }),
      [
        isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
        playbackRate, isSeeking, currentTrack, playlist, currentTrackIndex,
        error, loop, shuffle, isFullscreen, isPiP, captionsEnabled,
        selectedQuality, availableQualities,
        play, pause, togglePlay, seek, seekForward, seekBackward,
        setVolume, volumeUp, volumeDown, toggleMute, setPlaybackRate,
        nextTrack, previousTrack, playTrack, toggleLoop, toggleShuffle,
        toggleFullscreen, togglePiP, toggleCaptions, setQuality,
        setSeeking, clearError, playerId, allowMultiple, registerVideo,
      ]
    );

    return (
      <VideoPlayerContext.Provider value={contextValue}>
        <div
          ref={(node: HTMLDivElement | null) => {
            (containerRef as React.RefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
          }}
          role="region"
          aria-label="Video Player"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={clsx("relative overflow-hidden", className)}
        >
          {children}
        </div>
      </VideoPlayerContext.Provider>
    );
  }
);

VideoPlayerRoot.displayName = "VideoPlayer.Root";
