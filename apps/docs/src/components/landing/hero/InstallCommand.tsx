'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useCopyToClipboard } from 'vayu-ui';
import { installCommand } from './constants';

export function InstallCommand() {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-surface border border-border bg-surface p-2 text-left shadow-elevated">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-canvas text-muted-content">
        <Terminal className="h-4 w-4" />
      </div>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-1 font-tertiary text-sm text-surface-content">
        {installCommand}
      </code>
      <button
        type="button"
        onClick={() => copy(installCommand)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control text-muted-content transition-colors hover:bg-canvas hover:text-surface-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        aria-label="Copy install command"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
