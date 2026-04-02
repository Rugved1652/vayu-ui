'use client';

import { useIdle } from 'vayu-ui';
import { Activity, Moon } from 'lucide-react';

export function UseIdleDemo() {
  const isIdle = useIdle(3000); // 3 seconds timeout for demo purposes

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
      <div className="flex flex-col gap-6 items-center text-center">
        <div
          className={`p-4 rounded-full transition-colors duration-500 ${isIdle ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}
        >
          {isIdle ? <Moon className="h-8 w-8" /> : <Activity className="h-8 w-8" />}
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-lg">
            Status:{' '}
            <span className={isIdle ? 'text-amber-500' : 'text-green-500'}>
              {isIdle ? 'Idle' : 'Active'}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Stop moving your mouse or typing for 3 seconds to trigger idle state.
          </p>
        </div>
      </div>
    </div>
  );
}
