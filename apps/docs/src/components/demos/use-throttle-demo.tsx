'use client';

import { useThrottle } from 'vayu-ui';
import { useState } from 'react';

export function UseThrottleDemo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 1000);

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Type something fast:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start typing..."
          className="w-full px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-3 bg-muted/20 rounded border">
          <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">
            Real-time Value
          </span>
          <div className="font-mono text-sm break-all min-h-5">
            {value || <span className="text-muted-foreground italic opacity-50">Empty</span>}
          </div>
        </div>

        <div className="p-3 bg-primary/10 rounded border border-primary/20">
          <span className="text-xs text-primary/80 uppercase tracking-widest block mb-1">
            Throttled Value (1000ms)
          </span>
          <div className="font-mono text-sm break-all min-h-5 text-primary font-medium">
            {throttledValue || <span className="text-primary/50 italic opacity-50">Empty</span>}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        The throttled value will only update at most once every second, even if you type faster.
      </p>
    </div>
  );
}
