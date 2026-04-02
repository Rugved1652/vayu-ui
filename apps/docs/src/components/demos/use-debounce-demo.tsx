'use client';

import { useDebounce } from 'vayu-ui';
import { useState } from 'react';

export function UseDebounceDemo() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-none">
            Type something (updates after 500ms)
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Start typing..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-md bg-secondary/50 border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Real-time Value:</p>
            <p className="font-mono text-sm break-all min-h-5">{text}</p>
          </div>
          <div className="p-4 rounded-md bg-primary/10 border border-primary/20">
            <p className="text-xs font-semibold text-primary mb-1">Debounced Value:</p>
            <p className="font-mono text-sm break-all min-h-5">{debouncedText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
