// audioplayer/types.ts
// Types

import type { ReactNode } from "react";

export interface Track {
  id: string;
  src: string;
  title: string;
  artist?: string;
  album?: string;
  artwork?: string;
}

export interface AudioPlayerState {
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

export interface AudioPlayerActions {
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

export type PropGetter = (props?: Record<string, any>) => Record<string, any>;

export interface AudioPlayerGetters {
  getRootProps: PropGetter;
  getPlayButtonProps: PropGetter;
  getPrevButtonProps: PropGetter;
  getNextButtonProps: PropGetter;
  getProgressProps: PropGetter;
  getVolumeProps: PropGetter;
}

export interface RootProps {
  children: ReactNode;
  track?: Track;
  playlist?: Track[];
  defaultVolume?: number;
}
