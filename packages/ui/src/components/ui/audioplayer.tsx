"use client";

import React, {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================================
// 1. Types
// ============================================================================

export interface Track {
  id: string;
  src: string;
  title: string;
  artist?: string;
  album?: string;
  artwork?: string;
}

interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  isSeeking: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  currentTrackIndex: number;
}

interface AudioPlayerActions {
  formatTime: (seconds: number) => string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  seekForward: (seconds?: number) => void;
  seekBackward: (seconds?: number) => void;
  setVolume: (vol: number) => void;
  volumeUp: (step?: number) => void;
  volumeDown: (step?: number) => void;
  toggleMute: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setSeeking: (isSeeking: boolean) => void;
}

type PropGetter = (props?: Record<string, any>) => Record<string, any>;

interface AudioPlayerGetters {
  getRootProps: PropGetter;
  getPlayButtonProps: PropGetter;
  getPrevButtonProps: PropGetter;
  getNextButtonProps: PropGetter;
  getProgressProps: PropGetter;
  getVolumeProps: PropGetter;
}

// ============================================================================
// 2. Contexts
// ============================================================================

const AudioPlayerStateContext = createContext<AudioPlayerState | undefined>(undefined);
const AudioPlayerActionsContext = createContext<(AudioPlayerActions & AudioPlayerGetters) | undefined>(undefined);

// ============================================================================
// 3. Hooks
// ============================================================================

export const useAudioPlayerState = () => {
  const ctx = useContext(AudioPlayerStateContext);
  if (!ctx) throw new Error("useAudioPlayerState must be used within AudioPlayer.Root");
  return ctx;
};

export const useAudioPlayerActions = () => {
  const ctx = useContext(AudioPlayerActionsContext);
  if (!ctx) throw new Error("useAudioPlayerActions must be used within AudioPlayer.Root");
  return ctx;
};

export const useAudioPlayer = () => {
  const state = useAudioPlayerState();
  const actions = useAudioPlayerActions();
  return { ...state, ...actions };
};

// ============================================================================
// 4. Utilities
// ============================================================================

const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// ============================================================================
// 5. Root Component
// ============================================================================

interface RootProps {
  children: ReactNode;
  track?: Track;
  playlist?: Track[];
  defaultVolume?: number;
}

const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ children, track, playlist: initialPlaylist = [], defaultVolume = 0.8 }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const rafRef = useRef<number | null>(null);

    // --- State ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolumeState] = useState(defaultVolume);
    const [isMuted, setIsMuted] = useState(false);
    const [isSeeking, setIsSeekingState] = useState(false);

    const [playlist, setPlaylist] = useState<Track[]>(
      track ? [track, ...initialPlaylist] : initialPlaylist
    );
    const [currentTrackIndex, setCurrentTrackIndex] = useState(track ? 0 : -1);
    const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;

    // --- Cleanup ---
    useEffect(() => {
      const audio = audioRef.current;
      return () => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    // --- Core Actions ---

    const play = useCallback(() => audioRef.current?.play().catch(() => { }), []);
    const pause = useCallback(() => audioRef.current?.pause(), []);
    const togglePlay = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
      }
    }, [duration]);

    const seekForward = useCallback((s = 5) => seek(currentTime + s), [currentTime, seek]);
    const seekBackward = useCallback((s = 5) => seek(currentTime - s), [currentTime, seek]);

    const setVolume = useCallback((vol: number) => {
      const v = Math.max(0, Math.min(1, vol));
      setVolumeState(v);
      if (audioRef.current) audioRef.current.volume = v;
      if (v > 0 && isMuted) {
        setIsMuted(false);
        if (audioRef.current) audioRef.current.muted = false;
      }
    }, [isMuted]);

    const volumeUp = useCallback((step = 0.1) => setVolume(volume + step), [volume, setVolume]);
    const volumeDown = useCallback((step = 0.1) => setVolume(volume - step), [volume, setVolume]);

    const toggleMute = useCallback(() => {
      if (!audioRef.current) return;
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }, [isMuted]);

    const playTrack = useCallback((index: number) => {
      if (index < 0 || index >= playlist.length) return;
      setCurrentTrackIndex(index);
      setIsLoading(true);
      setIsPlaying(false);
      rafRef.current = requestAnimationFrame(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().catch(() => { });
        }
      });
    }, [playlist]);

    const nextTrack = useCallback(() => playTrack((currentTrackIndex + 1) % playlist.length), [currentTrackIndex, playlist.length, playTrack]);

    const previousTrack = useCallback(() => {
      if (currentTime > 3) seek(0);
      else playTrack(currentTrackIndex <= 0 ? playlist.length - 1 : currentTrackIndex - 1);
    }, [currentTime, currentTrackIndex, playlist.length, playTrack, seek]);

    const setSeeking = useCallback((seeking: boolean) => setIsSeekingState(seeking), []);

    // --- Event Listeners ---
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const onPlay = () => { setIsPlaying(true); setIsLoading(false); };
      const onPause = () => setIsPlaying(false);
      const onWaiting = () => setIsLoading(true);
      const onCanPlay = () => setIsLoading(false);
      const onDuration = () => setDuration(audio.duration);
      const onTime = () => { if (!isSeeking) setCurrentTime(audio.currentTime); };
      const onProgress = () => {
        if (audio.buffered.length > 0) setBuffered(audio.buffered.end(audio.buffered.length - 1));
      };
      const onEnd = () => { setIsPlaying(false); nextTrack(); };
      const onVol = () => { setVolumeState(audio.volume); setIsMuted(audio.muted); };

      const events: [string, EventListener][] = [
        ["play", onPlay], ["pause", onPause], ["waiting", onWaiting],
        ["canplay", onCanPlay], ["durationchange", onDuration],
        ["timeupdate", onTime], ["progress", onProgress],
        ["ended", onEnd], ["volumechange", onVol]
      ];

      events.forEach(([e, h]) => audio.addEventListener(e, h));
      audio.volume = defaultVolume;

      return () => events.forEach(([e, h]) => audio.removeEventListener(e, h));
    }, [defaultVolume, isSeeking, nextTrack]);

    // --- Prop Getters with WCAG Keybinds ---

    const getRootProps = useCallback((props: Record<string, any> = {}) => ({
      role: "region",
      "aria-label": "Audio Player",
      tabIndex: -1, // Focusable region for global keys
      onKeyDown: (e: React.KeyboardEvent) => {
        // Global Hotkeys when focus is inside the player region
        if (e.target === e.currentTarget) {
          switch (e.key) {
            case " ": case "k": togglePlay(); e.preventDefault(); break;
            case "m": toggleMute(); break;
            case "ArrowLeft": seekBackward(); break;
            case "ArrowRight": seekForward(); break;
            case "ArrowUp": volumeUp(); e.preventDefault(); break;
            case "ArrowDown": volumeDown(); e.preventDefault(); break;
          }
        }
        // Allow propagation to children if needed
        props.onKeyDown?.(e);
      },
      ...props,
    }), [togglePlay, toggleMute, seekBackward, seekForward, volumeUp, volumeDown]);

    const getPlayButtonProps = useCallback((props = {}) => ({
      "aria-label": isPlaying ? "Pause" : "Play",
      onClick: togglePlay,
      disabled: isLoading,
      ...props,
    }), [isPlaying, isLoading, togglePlay]);

    const getPrevButtonProps = useCallback((props = {}) => ({
      "aria-label": "Previous track",
      onClick: previousTrack,
      ...props,
    }), [previousTrack]);

    const getNextButtonProps = useCallback((props = {}) => ({
      "aria-label": "Next track",
      onClick: nextTrack,
      ...props,
    }), [nextTrack]);

    const getProgressProps = useCallback((props: Record<string, any> = {}) => ({
      role: "slider",
      "aria-label": "Audio progress",
      "aria-valuemin": 0,
      "aria-valuemax": duration,
      "aria-valuenow": Math.floor(currentTime),
      "aria-valuetext": formatTime(currentTime),
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        // WCAG 2.1.1 Slider Interaction
        switch (e.key) {
          case "ArrowRight": seekForward(); e.preventDefault(); break;
          case "ArrowLeft": seekBackward(); e.preventDefault(); break;
          case "Home": seek(0); e.preventDefault(); break;
          case "End": seek(duration); e.preventDefault(); break;
        }
        props.onKeyDown?.(e);
      },
      ...props,
    }), [duration, currentTime, seekForward, seekBackward, seek]);

    const getVolumeProps = useCallback((props = {}) => ({
      type: "range",
      min: 0,
      max: 1,
      step: 0.01,
      value: isMuted ? 0 : volume,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value)),
      "aria-label": "Volume",
      ...props,
    }), [volume, isMuted, setVolume]);

    // --- Context Values ---

    const stateValue = useMemo<AudioPlayerState>(() => ({
      isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
      isSeeking, currentTrack, playlist, currentTrackIndex,
    }), [isPlaying, isLoading, currentTime, duration, buffered, volume, isMuted,
      isSeeking, currentTrack, playlist, currentTrackIndex]);

    const actionsValue = useMemo<AudioPlayerActions & AudioPlayerGetters>(() => ({
      formatTime, play, pause, togglePlay, seek, seekForward, seekBackward,
      setVolume, volumeUp, volumeDown, toggleMute, setSeeking,
      playTrack, nextTrack, previousTrack,
      getRootProps, getPlayButtonProps, getPrevButtonProps,
      getNextButtonProps, getProgressProps, getVolumeProps,
    }), [
      play, pause, togglePlay, seek, seekForward, seekBackward,
      setVolume, volumeUp, volumeDown, toggleMute, setSeeking,
      playTrack, nextTrack, previousTrack,
      getRootProps, getPlayButtonProps, getPrevButtonProps,
      getNextButtonProps, getProgressProps, getVolumeProps,
    ]);

    return (
      <AudioPlayerActionsContext.Provider value={actionsValue}>
        <AudioPlayerStateContext.Provider value={stateValue}>
          <div ref={ref} {...getRootProps()}>
            <audio ref={audioRef} src={currentTrack?.src} preload="metadata" className="sr-only" />
            {children}
          </div>
        </AudioPlayerStateContext.Provider>
      </AudioPlayerActionsContext.Provider>
    );
  }
);

Root.displayName = "AudioPlayer.Root";
export const AudioPlayer = { Root };