'use client';

import { usePreviousState } from 'vayu-ui';
import { useState } from 'react';

export function UsePreviousStateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  const prevCount = usePreviousState(count);
  const prevName = usePreviousState(name);

  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-semibold">Previous State</h3>

        {/* Counter */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-8 w-8"
            >
              −
            </button>
            <span className="text-2xl font-bold tabular-nums w-12 text-center">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent h-8 w-8"
            >
              +
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Previous:{' '}
            <code className="bg-muted px-1 py-0.5 rounded">{prevCount ?? 'undefined'}</code>
          </p>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {names.map((n) => (
              <button
                key={n}
                onClick={() => setName(n)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  name === n
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Current: <code className="bg-muted px-1 py-0.5 rounded">{name}</code>
            {' → '}
            Previous:{' '}
            <code className="bg-muted px-1 py-0.5 rounded">{prevName ?? 'undefined'}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
