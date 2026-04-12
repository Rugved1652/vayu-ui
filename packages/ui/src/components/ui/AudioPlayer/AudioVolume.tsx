'use client';

import { clsx } from 'clsx';
import { Volume2, VolumeX } from 'lucide-react';
import {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  useState,
  useEffect,
} from 'react';
import { Button } from '../Button';
import { Slider } from '../Slider';
import { useAudioPlayer } from './Audio';

export const AudioPlayerMute = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { isMuted, toggleMute, volume } = useAudioPlayer();
  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      className={clsx('!rounded-full !p-2 text-surface-content', className)}
      {...props}
    >
      <Button.Icon size="medium">
        {isMuted || volume === 0 ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </Button.Icon>
    </Button>
  );
});
AudioPlayerMute.displayName = 'AudioPlayer.Mute';

export const AudioPlayerVolume = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { volume, setVolume, isMuted } = useAudioPlayer();
  const contextValue = Math.round((isMuted ? 0 : volume) * 100);

  // Local optimistic state so the slider responds instantly to drag.
  // The audio element fires `volumechange` asynchronously, which would
  // make a purely-controlled slider feel laggy.
  const [localValue, setLocalValue] = useState(contextValue);

  // Sync local state when the context updates externally (mute toggle, keyboard)
  useEffect(() => {
    setLocalValue(contextValue);
  }, [contextValue]);

  return (
    <div ref={ref} className={clsx('w-24', className)} {...props}>
      <Slider
        value={[localValue]}
        min={0}
        max={100}
        step={1}
        label="Volume"
        onValueChange={(vals: number[]) => {
          setLocalValue(vals[0]);
          setVolume(vals[0] / 100);
        }}
        className="!py-2"
      />
    </div>
  );
});
AudioPlayerVolume.displayName = 'AudioPlayer.Volume';
