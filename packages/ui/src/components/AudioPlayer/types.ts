import type { ReactNode } from 'react';

export interface Track {
  id?: string;
  src: string;
  title?: string;
  artist?: string;
  poster?: string;
  duration?: number;
}

export interface AudioPlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isLoading: boolean;
  error: Error | null;
  hasEnded: boolean;
  playerId: string;
}

export interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  playTrack: (index: number) => void;
  next: () => void;
  previous: () => void;
  setPlaylist: (tracks: Track[]) => void;
}

export interface AudioPlayerGetters {
  getTrack: (index: number) => Track | null;
}

export type PropGetter<P = Record<string, unknown>> = (props?: P) => P & React.HTMLAttributes<any>;

export interface RootProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onPlay' | 'onPause' | 'onEnded'
> {
  children: ReactNode;
  defaultVolume?: number;
  allowMultiple?: boolean;
  autoPlayNext?: boolean;
  loopPlaylist?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTrackChange?: (index: number, track: Track) => void;
}
