'use client';

import { useRenderCount } from 'vayu-ui';
import { RotateCw } from 'lucide-react';
import { useState } from 'react';

export function UseRenderCountDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCount();

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
          Render Count
        </span>
        <span className="text-6xl font-black tabular-nums text-primary" suppressHydrationWarning>
          {renderCount}
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors font-medium"
        >
          <RotateCw className="h-4 w-4" />
          Trigger Re-render
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Button Click Count (State): {count}
        </p>
      </div>
    </div>
  );
}
