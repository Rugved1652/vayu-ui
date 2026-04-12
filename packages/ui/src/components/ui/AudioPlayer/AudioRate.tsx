'use client';

import { clsx } from 'clsx';
import {
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { Popover } from '../Popover';
import { useAudioPlayer } from './Audio';

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const AudioPlayerRate = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { playbackRate, setPlaybackRate } = useAudioPlayer();

  return (
    <Popover ref={ref} className={clsx('inline-block', className)} {...props}>
      <Popover.Trigger
        className={clsx(
          '!rounded-full !p-2 !min-h-0 !w-auto !px-2',
          '!text-xs !font-bold !font-mono !tracking-tighter',
          '!gap-0',
          'text-surface-content',
        )}
      >
        {playbackRate}x
      </Popover.Trigger>
      <Popover.Content
        align="center"
        side="top"
        sideOffset={8}
        className="!p-1 min-w-[80px]"
      >
        <div className="flex flex-col gap-0.5">
          {RATES.map((rate) => (
            <button
              key={rate}
              onClick={() => {
                setPlaybackRate(rate);
              }}
              className={clsx(
                'px-3 py-1.5 text-xs font-mono font-medium rounded-control text-left',
                'transition-colors duration-100',
                rate === playbackRate
                  ? 'bg-brand text-brand-content'
                  : 'text-elevated-content hover:bg-muted/50',
              )}
            >
              {rate === 1 ? '1x (Normal)' : `${rate}x`}
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
});
AudioPlayerRate.displayName = 'AudioPlayer.Rate';
