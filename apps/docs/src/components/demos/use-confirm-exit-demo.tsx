'use client';

import { useConfirmExit } from 'vayu-ui';
import { useState } from 'react';

export function UseConfirmExitDemo() {
  const [dirty, setDirty] = useState(false);
  const [text, setText] = useState('');

  useConfirmExit({ enabled: dirty });

  const handleChange = (value: string) => {
    setText(value);
    setDirty(value.length > 0);
  };

  const handleSave = () => {
    setDirty(false);
    setText('');
  };

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Confirm Exit</h3>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              dirty
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            }`}
          >
            {dirty ? 'Unsaved' : 'Saved'}
          </span>
        </div>

        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          placeholder="Type something and try to close this tab…"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!dirty}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4"
          >
            Save
          </button>
          <button
            onClick={() => handleChange('')}
            disabled={!text}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4"
          >
            Discard
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          {dirty
            ? '⚠️ Try closing this tab — the browser will prompt you.'
            : '✅ No unsaved changes. Safe to leave.'}
        </p>
      </div>
    </div>
  );
}
