// waveform.tsx
// UI: Waveform visualization

'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import { useAudioPlayer } from './Audio';
import { useMergeRefs } from '../Popover';
import { hashString, pseudoRandom } from './utils';

export const AudioPlayerWaveform = forwardRef<HTMLCanvasElement, HTMLAttributes<HTMLCanvasElement>>(
  ({ className, ...props }, ref) => {
    const { duration, currentTime, currentTrack, seek } = useAudioPlayer();
    const internalRef = useRef<HTMLCanvasElement>(null);
    const combinedRef = useMergeRefs(ref, internalRef);
    const barsRef = useRef<number[]>([]);

    const BARS = 75;

    useEffect(() => {
      if (!currentTrack?.src) return;
      const seedStr = typeof currentTrack.src === 'string' ? currentTrack.src : 'fallback';
      const seed = hashString(seedStr);
      const rng = pseudoRandom(seed);

      const arr = [];
      for (let i = 0; i < BARS; i++) {
        const base = Math.sin((i / BARS) * Math.PI) * 0.4 + 0.3;
        const noise = rng() * 0.4;
        arr.push(Math.max(0.1, base + noise));
      }
      barsRef.current = arr;
    }, [currentTrack]);

    useEffect(() => {
      const canvas = internalRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let frameId: number;
      const render = () => {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const progress = duration > 0 ? currentTime / duration : 0;
        const barWidth = width / BARS;
        const gap = 2;
        const actualBarW = barWidth - gap;

        const isDark = document.documentElement.classList.contains('dark');
        const brandColor = isDark ? '#34d399' : '#059669';
        const unplayedColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

        barsRef.current.forEach((amp, i) => {
          const x = i * barWidth;
          const barPercent = i / BARS;
          const barHeight = Math.max(2, amp * height * 0.9);
          const y = (height - barHeight) / 2;

          ctx.fillStyle = barPercent <= progress ? brandColor : unplayedColor;

          ctx.beginPath();
          ctx.roundRect(x, y, actualBarW, barHeight, 2);
          ctx.fill();
        });
        frameId = requestAnimationFrame(render);
      };
      render();

      return () => cancelAnimationFrame(frameId);
    }, [currentTime, duration]);

    const handleSeek = (e: React.MouseEvent) => {
      if (!internalRef.current || duration === 0) return;
      const rect = internalRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      seek(percent * duration);
    };

    return (
      <canvas
        ref={combinedRef}
        width={800}
        height={100}
        className={clsx(
          'w-full h-16 cursor-pointer opacity-90 hover:opacity-100 transition-opacity',
          className,
        )}
        onClick={handleSeek}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={duration || 100}
        aria-valuenow={currentTime}
        {...props}
      />
    );
  },
);
AudioPlayerWaveform.displayName = 'AudioPlayer.Waveform';
