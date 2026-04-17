import type { HTMLAttributes, ReactNode, RefObject } from "react";

// ============================================================================
// Core Types
// ============================================================================

export interface VideoTrack {
  id: string;
  src: string;
  title: string;
  artist?: string;
  poster?: string;
  subtitleSrc?: string;
}

export interface VideoQuality {
  height: number;
  bitrate: number;
  label: string;
}

/** @deprecated Use VideoQuality instead */
export type QualityLevel = VideoQuality & { src?: string };

// ============================================================================
// State & Actions
// ============================================================================

export interface VideoPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isSeeking: boolean;
  currentTrack: VideoTrack | null;
  playlist: VideoTrack[];
  currentTrackIndex: number;
  error: string | null;
  loop: boolean;
  shuffle: boolean;
  isFullscreen: boolean;
  isPiP: boolean;
  captionsEnabled: boolean;
  selectedQuality: number;
  availableQualities: VideoQuality[];
}

 export interface VideoPlayerActions {
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
  setPlaybackRate: (rate: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  playTrack: (index: number) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  toggleFullscreen: () => void;
  togglePiP: () => void;
  toggleCaptions: () => void;
  setQuality: (levelIndex: number) => void;
  formatTime: (seconds: number) => string;
  setSeeking: (seeking: boolean) => void;
  clearError: () => void;
}

 export interface VideoPlayerContextValue
  extends VideoPlayerState,
    VideoPlayerActions {
  playerId: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  allowMultiple: boolean;
  registerVideo: (element: HTMLVideoElement | null) => void;
}

 // ============================================================================
// Component Props
// ============================================================================

export interface VideoPlayerRootProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onPlay" | "onPause" | "onError" | "onTimeUpdate" | "onEnded"
  > {
  children: ReactNode;
  track?: VideoTrack;
  playlist?: VideoTrack[];
  defaultVolume?: number;
  defaultMuted?: boolean;
  defaultPlaybackRate?: number;
  allowMultiple?: boolean;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onTrackChange?: (track: VideoTrack | null) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

 export interface VideoPlayerSourceProps {
  src: string;
  title?: string;
  artist?: string;
  poster?: string;
  subtitleSrc?: string;
}

 export interface VideoPlayerVideoProps extends HTMLAttributes<HTMLDivElement> {
  poster?: string;
  objectFit?: "contain" | "cover";
}

 export interface VideoPlayerPlaylistProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

 export interface VideoPlayerTrackItemProps extends HTMLAttributes<HTMLButtonElement> {
  track: VideoTrack;
  activeClassName?: string;
  showIndex?: boolean;
}

 export interface VideoPlayerTrackInfoProps extends HTMLAttributes<HTMLDivElement> {
  showPoster?: boolean;
}

 export interface VideoPlayerControlsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  autoHide?: boolean;
  autoHideDelay?: number;
}

 export interface VideoPlayerPlayPauseProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode | ((playing: boolean) => ReactNode);
}

 export interface VideoPlayerNextProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

 export interface VideoPlayerPreviousProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

 export interface VideoPlayerProgressProps extends HTMLAttributes<HTMLDivElement> {
  showBuffer?: boolean;
}

 export interface VideoPlayerSeekProps extends HTMLAttributes<HTMLDivElement> {
  showBuffer?: boolean;
  showThumb?: boolean;
}

 export interface VideoPlayerTimeProps extends HTMLAttributes<HTMLDivElement> {
  showRemaining?: boolean;
}

 export interface VideoPlayerVolumeProps extends HTMLAttributes<HTMLInputElement> {
  vertical?: boolean;
}

 export interface VideoPlayerMuteProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode | ((muted: boolean) => ReactNode);
}

 export interface VideoPlayerFullscreenProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode | ((isFullscreen: boolean) => ReactNode);
}

 export interface VideoPlayerPiPProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode | ((isPiP: boolean) => ReactNode);
}

 export interface VideoPlayerCaptionsProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode | ((enabled: boolean) => ReactNode);
}

 export interface VideoPlayerQualityProps extends HTMLAttributes<HTMLSelectElement> {}

 export interface VideoPlayerSpeedProps extends HTMLAttributes<HTMLSelectElement> {
  rates?: number[];
}

 export interface VideoPlayerBufferProps extends HTMLAttributes<HTMLDivElement> {}

 export interface VideoPlayerLoadingProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

 export interface VideoPlayerErrorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
