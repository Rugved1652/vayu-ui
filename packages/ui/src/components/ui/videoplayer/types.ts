// types.ts
// Types

import type { HTMLAttributes, ReactNode, VideoHTMLAttributes } from 'react';

export interface QualityLevel {
  label: string;
  height: number;
  src?: string;
}

export interface VideoPlayerContextValue {
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

export interface VideoPlayerRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onPlay' | 'onPause' | 'onEnded' | 'onTimeUpdate' | 'onVolumeChange'
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

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

export interface ControlsProps extends HTMLAttributes<HTMLDivElement> {}

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  showBuffer?: boolean;
}

export interface SkipButtonProps extends HTMLAttributes<HTMLButtonElement> {
  seconds?: number;
}
