'use client';

import { clsx } from 'clsx';
import { forwardRef, HTMLAttributes, useState } from 'react';
import { Popover } from '../Popover';
import { useCarouselContext } from './hooks';

const SPEED_OPTIONS: import('./types').SpeedMultiplier[] = [0.5, 1, 1.5, 2];

const CarouselSpeedControl = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { speed, setSpeed } = useCarouselContext();
  const [open, setOpen] = useState(false);

  return (
    <Popover ref={ref} className={clsx('inline-block', className)} open={open} onOpenChange={setOpen} {...props}>
      <Popover.Trigger
        className={clsx(
          '!rounded-full !p-2 !min-h-0 !w-auto !px-2',
          '!text-xs !font-bold !font-mono !tracking-tighter',
          '!gap-0',
          'text-surface-content',
        )}
      >
        {speed}x
      </Popover.Trigger>
      <Popover.Content
        align="center"
        side="top"
        sideOffset={8}
        className="!p-1 min-w-[80px]"
      >
        <div className="flex flex-col gap-0.5">
          {SPEED_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSpeed(option);
                setOpen(false);
              }}
              className={clsx(
                'px-3 py-1.5 text-xs font-mono font-medium rounded-control text-left',
                'transition-colors duration-100',
                option === speed
                  ? 'bg-brand text-brand-content'
                  : 'text-elevated-content hover:bg-muted/50',
              )}
            >
              {option === 1 ? '1x (Normal)' : `${option}x`}
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
});

CarouselSpeedControl.displayName = 'Carousel.SpeedControl';

export default CarouselSpeedControl;
