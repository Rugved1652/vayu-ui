import { HookRegistryEntry } from '../types.js';

export const useCopyToClipboardEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-copy-to-clipboard',
  name: 'useCopyToClipboard',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'React hook that copies text to the system clipboard with a built-in success state, error handling, and a legacy browser fallback.',
  longDescription:
    'Provides an async copy function that writes text to the user\'s clipboard via navigator.clipboard.writeText (Clipboard API). If the Clipboard API is unavailable — for example in older browsers, non-HTTPS contexts, or environments where the Permissions Policy blocks clipboard access — it falls back to creating a hidden textarea, selecting its contents, and invoking document.execCommand("copy"). The hook returns a copied boolean that flips to true for exactly 2 seconds after a successful copy, making it trivial to show "Copied!" feedback without managing your own timer. An error field captures any failure so the UI can surface a meaningful message instead of silently failing. The hook takes no arguments at initialization; the copy function accepts the text to copy. No external dependencies beyond React are required.',
  tags: [
    'clipboard',
    'copy',
    'paste',
    'write-text',
    'exec-command',
    'fallback',
    'feedback',
    'clipboard-api',
    'browser-api',
    'ux',
  ],
  category: 'side-effect',
  useCases: [
    'Add a "Copy" button next to code snippets that shows a brief "Copied!" confirmation before reverting',
    'Let users copy shareable URLs or deep links from the UI with one click and visual confirmation',
    'Copy generated API keys, tokens, or passwords to the clipboard after creation and display a success state',
    'Build a "Copy all" action that copies table data, JSON output, or form values to the clipboard for pasting into spreadsheets',
    'Provide clipboard actions inside right-click context menus or dropdown menus without managing timers and error state manually',
    'Implement a copy-to-clipboard interaction in environments that may not support the modern Clipboard API, such as older browsers or non-HTTPS pages',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useCopyToClipboard.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useCopyToClipboard(): { copy: (text: string) => Promise<void>; copied: boolean; error: Error | null }',
  returnType: '{ copy: (text: string) => Promise<void>; copied: boolean; error: Error | null }',
  parameters: [],
  returnValues: [
    {
      name: 'copy',
      type: '(text: string) => Promise<void>',
      description:
        'Async function that writes the provided string to the system clipboard. Uses navigator.clipboard.writeText when available; falls back to a hidden textarea with document.execCommand("copy") otherwise. Call this from an event handler — not during render.',
    },
    {
      name: 'copied',
      type: 'boolean',
      description:
        'True for exactly 2 seconds after a successful copy, then automatically resets to false. Use this to show transient "Copied!" feedback, icon swaps, or button state changes without managing your own setTimeout.',
    },
    {
      name: 'error',
      type: 'Error | null',
      description:
        'Set to the Error object if the copy operation fails (e.g., clipboard permission denied, insecure HTTP context, or a thrown exception). Null when no error has occurred. Check this after calling copy to surface user-facing error messages.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Copy Button',
      description:
        'A minimal button that copies a string to the clipboard and displays a temporary "Copied!" label.',
      code: `'use client';

import { useCopyToClipboard } from 'vayu-ui';

export default function BasicCopyButton() {
  const { copy, copied } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy('Hello from Vayu UI!')}
      className="px-4 py-2 rounded-control bg-brand text-brand-content hover:opacity-90 transition-opacity"
    >
      {copied ? 'Copied!' : 'Copy text'}
    </button>
  );
}`,
      tags: ['basic', 'button', 'feedback'],
    },
    {
      title: 'Copy with Error Handling',
      description:
        'Demonstrates handling the error state when clipboard access is denied or unavailable, with a retry prompt.',
      code: `'use client';

import { useCopyToClipboard } from 'vayu-ui';

export default function CopyWithErrorHandling() {
  const { copy, copied, error } = useCopyToClipboard();

  const handleCopy = async () => {
    await copy('Sensitive data: abc-123-xyz');
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleCopy}
        className="px-4 py-2 rounded-control bg-brand text-brand-content"
      >
        {copied ? 'Copied!' : 'Copy token'}
      </button>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          Copy failed: {error.message}. Please copy manually.
        </p>
      )}
    </div>
  );
}`,
      tags: ['error-handling', 'retry', 'alert'],
    },
    {
      title: 'Copy Code Snippet',
      description:
        'A code block component with a copy button in the header that copies the code content and shows a checkmark icon on success.',
      code: `'use client';

import { useCopyToClipboard } from 'vayu-ui';

const CODE_SAMPLE = \`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}\`;

export default function CopyCodeBlock() {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="rounded-surface border bg-surface text-surface-content overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-xs font-medium text-muted-content">TypeScript</span>
        <button
          onClick={() => copy(CODE_SAMPLE)}
          className="text-xs px-2 py-1 rounded-control hover:bg-surface transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code>{CODE_SAMPLE}</code>
      </pre>
    </div>
  );
}`,
      tags: ['code-block', 'snippet', 'syntax'],
    },
    {
      title: 'Copy API Key with Masked Reveal',
      description:
        'An API key display that masks the key by default, lets the user reveal it, and provides a copy button with visual feedback.',
      code: `'use client';

import { useCopyToClipboard } from 'vayu-ui';
import { useState } from 'react';

export default function CopyApiKey() {
  const { copy, copied } = useCopyToClipboard();
  const [visible, setVisible] = useState(false);
  const apiKey = 'sk-vayu-1a2b3c4d5e6f7g8h9i0j';

  return (
    <div className="p-4 rounded-surface border bg-surface text-surface-content space-y-3 w-80">
      <label className="text-sm font-medium">API Key</label>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 rounded-control bg-muted text-sm font-mono truncate">
          {visible ? apiKey : '••••••••••••••••••••'}
        </code>
        <button
          onClick={() => setVisible((v) => !v)}
          className="px-3 py-2 text-xs rounded-control border hover:bg-muted transition-colors"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={() => copy(apiKey)}
          className="px-3 py-2 text-xs rounded-control bg-brand text-brand-content hover:opacity-90 transition-opacity"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}`,
      tags: ['api-key', 'masked', 'reveal', 'security'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Ignoring the error state',
      bad: `const { copy, copied } = useCopyToClipboard();
return <button onClick={() => copy(text)}>{copied ? 'Copied!' : 'Copy'}</button>;`,
      good: `const { copy, copied, error } = useCopyToClipboard();
return (
  <div>
    <button onClick={() => copy(text)}>{copied ? 'Copied!' : 'Copy'}</button>
    {error && <p className="text-destructive text-sm">Copy failed: {error.message}</p>}
  </div>
);`,
      reason:
        'The Clipboard API can fail for many reasons: the user denied the permission, the page is served over HTTP instead of HTTPS, or the browser does not support it. Always check and surface the error so the user knows the copy did not succeed.',
    },
    {
      title: 'Calling copy during render or in useEffect',
      bad: `const { copy } = useCopyToClipboard();
useEffect(() => { copy('hello'); }, []);`,
      good: `const { copy } = useCopyToClipboard();
return <button onClick={() => copy('hello')}>Copy</button>;`,
      reason:
        'The copy function triggers side effects (DOM manipulation in the fallback path, state updates via setCopied). Calling it during render or unconditionally in useEffect causes state updates outside of event handlers and may run before the DOM is ready.',
    },
    {
      title: 'Treating copied as permanent state',
      bad: `const { copied } = useCopyToClipboard();
if (copied) return <span>Copied forever</span>;`,
      good: `const { copied } = useCopyToClipboard();
return <span>{copied ? 'Copied!' : 'Copy'}</span>;`,
      reason:
        'The copied boolean auto-resets to false after 2 seconds via an internal setTimeout. It is designed for transient UI feedback, not as a persistent flag. If you need permanent state, manage your own boolean and set it in a .then() chain after calling copy.',
    },
    {
      title: 'Assuming Clipboard API works in all environments',
      bad: `const { copy } = useCopyToClipboard();
await copy(text);
// assumes it always succeeds`,
      good: `const { copy, error } = useCopyToClipboard();
await copy(text);
if (error) {
  // Fallback: select text in a readonly input for manual copy
  inputRef.current?.select();
}`,
      reason:
        'The Clipboard API requires a secure context (HTTPS or localhost) and can be blocked by browser permissions policies. The hook provides a document.execCommand fallback, but even that can fail. Always handle the error case and provide a manual-copy alternative.',
    },
  ],
};
