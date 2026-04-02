'use client';

import { useCountdown } from 'vayu-ui';
import { Play, RotateCcw, Pause } from 'lucide-react';

export function UseCountdownDemo() {
  const { timeLeft, start, pause, reset, isRunning } = useCountdown({
    seconds: 10,
    onComplete: () => console.log('Countdown completed!'),
  });

  // Calculate progress percentage for a visual bar
  const progress = (timeLeft / 10) * 100;

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
      <div className="flex flex-col gap-6 items-center">
        <div className="text-4xl font-mono font-bold tabular-nums">{timeLeft}s</div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={start}
            disabled={isRunning || timeLeft === 0}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <Play className="mr-2 h-4 w-4" />
            Start
          </button>
          <button
            onClick={pause}
            disabled={!isRunning}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
