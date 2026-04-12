'use client';

import { clsx } from 'clsx';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { Button } from '../Button';
import { useAudioPlayer } from './Audio';
import { formatTime } from './utils';

export const AudioPlayerControls = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('flex flex-col gap-2 p-3 sm:px-4 sm:py-3', className)}
      {...props}
    >
      {props.children}
    </div>
  );
});
AudioPlayerControls.displayName = 'AudioPlayer.Controls';

export const AudioPlayerPlayPause = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isPlaying, togglePlay, playlist } = useAudioPlayer();
  const disabled = playlist.length === 0;

  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={togglePlay}
      disabled={disabled}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      className={clsx(
        '!rounded-full !p-3',
        'bg-brand text-brand-content hover:bg-brand/90',
        'hover:scale-105 active:scale-95',
        'focus-visible:ring-brand',
        className,
      )}
      {...props}
    >
      <Button.Icon size="medium">
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current translate-x-0.5" />
        )}
      </Button.Icon>
    </Button>
  );
});
AudioPlayerPlayPause.displayName = 'AudioPlayer.PlayPause';

export const AudioPlayerNext = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { next, currentTrackIndex, playlist } = useAudioPlayer();
  const loopPlaylist = false;
  const disabled =
    playlist.length === 0 ||
    (!loopPlaylist &&
      currentTrackIndex === playlist.length - 1);
  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={next}
      disabled={disabled}
      aria-label="Next Track"
      className={clsx('!rounded-full !p-2 text-surface-content', className)}
      {...props}
    >
      <Button.Icon size="medium">
        <SkipForward className="w-5 h-5 fill-current" />
      </Button.Icon>
    </Button>
  );
});
AudioPlayerNext.displayName = 'AudioPlayer.Next';

export const AudioPlayerPrevious = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { previous, currentTrackIndex, playlist, currentTime } =
    useAudioPlayer();
  const loopPlaylist = false;
  const isFirst = currentTrackIndex === 0;
  const disabled =
    playlist.length === 0 ||
    (!loopPlaylist && isFirst && currentTime <= 3);
  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={previous}
      disabled={disabled}
      aria-label="Previous Track"
      className={clsx('!rounded-full !p-2 text-surface-content', className)}
      {...props}
    >
      <Button.Icon size="medium">
        <SkipBack className="w-5 h-5 fill-current" />
      </Button.Icon>
    </Button>
  );
});
AudioPlayerPrevious.displayName = 'AudioPlayer.Previous';

export const AudioPlayerTime = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { currentTime, duration } = useAudioPlayer();
  return (
    <div
      ref={ref}
      className={clsx(
        'flex items-center gap-1 text-xs tabular-nums text-muted-content font-medium',
        className,
      )}
      {...props}
    >
      <span>{formatTime(currentTime)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
});
AudioPlayerTime.displayName = 'AudioPlayer.Time';
