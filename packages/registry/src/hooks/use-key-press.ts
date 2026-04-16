import { HookRegistryEntry } from '../types.js';

export const useKeyPressEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-key-press',
  name: 'useKeyPress',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that listens for keyboard events on the window, supporting single keys, modifier combos (Ctrl/⌘/Alt/Shift), and dynamic multi-binding arrays.',
  longDescription:
    'Attaches a global keydown listener to the window and matches incoming KeyboardEvents against a declarative key target. Supports two calling conventions: (1) a single key plus callback for simple shortcuts like Escape-to-close, and (2) an array of KeyBinding objects for dynamic, multi-shortcut configurations such as command palettes or game controls. Modifier combos are expressed as arrays — ["Ctrl", "S"] or ["⌘", "K"] — where all modifiers must be active simultaneously with the final key. The hook stores bindings in a ref so the event listener never re-subscribes when callbacks change, preventing stale closure bugs and unnecessary DOM churn. The optional enabled flag allows conditional activation (e.g. disable shortcuts while a modal is open or an input is focused). Client-only (use client directive) — safe during SSR since no listeners are attached until hydration. No external dependencies beyond React.',
  tags: [
    'keyboard',
    'keydown',
    'shortcut',
    'hotkey',
    'key-binding',
    'modifier',
    'ctrl',
    'meta',
    'command',
    'escape',
    'command-palette',
  ],
  category: 'input',
  useCases: [
    'Implement keyboard shortcuts or hotkeys in your app, such as Ctrl+S to save or ⌘+K to open a command palette, without manually managing window event listeners',
    'Close modals, drawers, or popovers when the user presses the Escape key by attaching a single-key listener with a cleanup callback',
    'Build a command palette or spotlight search triggered by a modifier combo like ⌘+K or Ctrl+P, matching patterns common in VS Code, Notion, and Raycast',
    'Handle arrow-key navigation in custom list, tab, or carousel components for accessible keyboard-only interaction without roving tabindex boilerplate',
    'Register multiple dynamic key bindings at once (e.g. a game UI where W/A/S/D move and Space jumps) using the KeyBinding array overload',
    'Conditionally enable or disable keyboard shortcuts based on application state, such as pausing shortcuts when a text input is focused or a modal blocks interaction',
    'Prevent browser-default behavior on captured shortcuts (e.g. prevent Ctrl+S from triggering the native Save dialog) by calling event.preventDefault() inside the callback',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useKeyPress.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useKeyPress(target: KeyTarget, callback: (event: KeyboardEvent) => void, options?: { enabled?: boolean }): void; function useKeyPress(bindings: KeyBinding[], options?: { enabled?: boolean }): void',
  typeParams: [],
  parameters: [
    {
      name: 'target',
      type: 'KeyTarget',
      required: true,
      description:
        'A single key string (e.g. "Escape", "Enter") or an array of keys representing a modifier combo (e.g. ["Ctrl", "S"] or ["⌘", "K"]). When a string is passed, it matches event.key exactly. When an array is passed, all but the last element are treated as modifiers (Ctrl, Alt, Meta, Shift, or ⌘) and the last element is the action key. For the "⌘" symbol, the hook maps it to event.metaKey. Used in overload 1.',
      defaultValue: undefined,
    },
    {
      name: 'callback',
      type: '(event: KeyboardEvent) => void',
      required: true,
      description:
        'Function invoked when the pressed key(s) match the target. Receives the raw KeyboardEvent, so you can call event.preventDefault() to suppress browser defaults or read event.key / event.code for additional logic. Used in overload 1.',
      defaultValue: undefined,
    },
    {
      name: 'bindings',
      type: 'KeyBinding[]',
      required: true,
      description:
        'An array of { keys: KeyTarget; callback: (event: KeyboardEvent) => void } objects. Each binding declares its own key target and handler. The hook iterates bindings in order and fires the first match, then stops. Ideal for dynamic shortcut maps such as command palettes or game controls. Used in overload 2.',
      defaultValue: undefined,
    },
    {
      name: 'options.enabled',
      type: 'boolean',
      required: false,
      description:
        'Whether the key listener is active. When false, the hook removes the window listener and no callbacks fire. Defaults to true. Use this to conditionally disable shortcuts — for example, set enabled to false when a text input is focused to avoid intercepting typing, or when a modal is open to scope shortcuts.',
      defaultValue: 'true',
    },
  ],
  returnType: 'void',
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Escape to Close a Modal',
      description:
        'A modal overlay that closes when the user presses Escape, demonstrating the simplest single-key usage of useKeyPress.',
      code: `import { useState } from 'react';
import { useKeyPress } from 'vayu-ui';

export default function EscapeModal() {
  const [open, setOpen] = useState(false);

  useKeyPress('Escape', () => setOpen(false));

  return (
    <>
      <button
        className="px-4 py-2 bg-brand text-brand-content rounded-control shadow-control"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-elevated text-elevated-content rounded-overlay shadow-elevated">
            <h2 className="text-lg font-semibold">Important Notice</h2>
            <p className="mt-2 text-sm text-muted">
              Press <kbd className="px-1.5 py-0.5 bg-surface rounded-control text-xs font-mono">Esc</kbd> to close this modal.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-brand text-brand-content rounded-control"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}`,
      tags: ['modal', 'escape', 'close', 'overlay', 'basic'],
    },
    {
      title: 'Command Palette with ⌘K',
      description:
        'A spotlight-style command palette that opens on ⌘+K (Mac) or Ctrl+K (Windows/Linux), with arrow-key navigation and Escape to close.',
      code: `import { useState, useRef, useEffect } from 'react';
import { useKeyPress, KeyBinding } from 'vayu-ui';

const COMMANDS = [
  { label: 'Go to Dashboard', id: 'dashboard' },
  { label: 'Open Settings', id: 'settings' },
  { label: 'New Project', id: 'new-project' },
  { label: 'Search Files', id: 'search' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const bindings: KeyBinding[] = [
    {
      keys: ['⌘', 'K'],
      callback: (e) => {
        e.preventDefault();
        setOpen((prev) => !prev);
      },
    },
    {
      keys: ['Ctrl', 'K'],
      callback: (e) => {
        e.preventDefault();
        setOpen((prev) => !prev);
      },
    },
    {
      keys: 'Escape',
      callback: () => setOpen(false),
    },
    {
      keys: 'ArrowDown',
      callback: () =>
        setActiveIndex((i) => (i + 1) % COMMANDS.length),
    },
    {
      keys: 'ArrowUp',
      callback: () =>
        setActiveIndex((i) => (i - 1 + COMMANDS.length) % COMMANDS.length),
    },
    {
      keys: 'Enter',
      callback: () => {
        alert(\`Executing: \${COMMANDS[activeIndex].label}\`);
        setOpen(false);
      },
    },
  ];

  useKeyPress(bindings, { enabled: true });

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50">
      <div className="w-full max-w-lg bg-elevated text-elevated-content rounded-overlay shadow-elevated overflow-hidden">
        <input
          ref={inputRef}
          placeholder="Type a command..."
          className="w-full px-4 py-3 bg-transparent border-b border-border text-sm outline-none placeholder:text-muted"
        />
        <ul className="max-h-64 overflow-y-auto p-2">
          {COMMANDS.map((cmd, i) => (
            <li
              key={cmd.id}
              className={\`px-3 py-2 text-sm rounded-control cursor-pointer transition-colors \${
                i === activeIndex
                  ? 'bg-brand text-brand-content'
                  : 'hover:bg-surface'
              }\`}
              onClick={() => alert(\`Executing: \${cmd.label}\`)}
            >
              {cmd.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`,
      tags: ['command-palette', 'spotlight', 'cmd-k', 'ctrl-k', 'navigation', 'advanced'],
    },
    {
      title: 'Conditional Shortcuts with Enabled Toggle',
      description:
        'A form with a text input that disables global shortcuts while the input is focused, preventing shortcut interference with normal typing.',
      code: `import { useState } from 'react';
import { useKeyPress } from 'vayu-ui';

export default function ConditionalShortcuts() {
  const [inputFocused, setInputFocused] = useState(false);
  const [message, setMessage] = useState('');

  useKeyPress(
    '?',
    () => setMessage('Help panel toggled!'),
    { enabled: !inputFocused },
  );

  useKeyPress(
    's',
    () => setMessage('Quick save triggered!'),
    { enabled: !inputFocused },
  );

  return (
    <div className="max-w-sm space-y-4">
      <p className="text-sm text-muted">
        Press <kbd className="px-1.5 py-0.5 bg-surface rounded-control text-xs font-mono">?</kbd> for help or{' '}
        <kbd className="px-1.5 py-0.5 bg-surface rounded-control text-xs font-mono">S</kbd> to save (disabled while typing).
      </p>

      <input
        className="w-full px-3 py-2 bg-surface text-surface-content border border-border rounded-control outline-none focus:border-focus"
        placeholder="Type here — shortcuts are paused"
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />

      {message && (
        <div className="px-3 py-2 text-sm bg-info/10 text-info rounded-surface">
          {message}
        </div>
      )}
    </div>
  );
}`,
      tags: ['conditional', 'enabled', 'input-focus', 'form', 'toggle'],
    },
    {
      title: 'Multi-Binding Game Controls',
      description:
        'An interactive canvas-like area controlled by WASD keys for movement and Space for action, demonstrating the KeyBinding array overload for complex key maps.',
      code: `import { useState } from 'react';
import { useKeyPress, KeyBinding } from 'vayu-ui';

interface Position {
  x: number;
  y: number;
}

export default function GameControls() {
  const [pos, setPos] = useState<Position>({ x: 200, y: 200 });
  const [action, setAction] = useState<string>('idle');
  const STEP = 20;

  const bindings: KeyBinding[] = [
    {
      keys: 'w',
      callback: () => setPos((p) => ({ ...p, y: Math.max(0, p.y - STEP) })),
    },
    {
      keys: 'a',
      callback: () => setPos((p) => ({ ...p, x: Math.max(0, p.x - STEP) })),
    },
    {
      keys: 's',
      callback: () => setPos((p) => ({ ...p, y: Math.min(360, p.y + STEP) })),
    },
    {
      keys: 'd',
      callback: () => setPos((p) => ({ ...p, x: Math.min(360, p.x + STEP) })),
    },
    {
      keys: 'ArrowUp',
      callback: () => setPos((p) => ({ ...p, y: Math.max(0, p.y - STEP) })),
    },
    {
      keys: 'ArrowLeft',
      callback: () => setPos((p) => ({ ...p, x: Math.max(0, p.x - STEP) })),
    },
    {
      keys: 'ArrowDown',
      callback: () => setPos((p) => ({ ...p, y: Math.min(360, p.y + STEP) })),
    },
    {
      keys: 'ArrowRight',
      callback: () => setPos((p) => ({ ...p, x: Math.min(360, p.x + STEP) })),
    },
    {
      keys: ' ',
      callback: () => {
        setAction('jump');
        setTimeout(() => setAction('idle'), 300);
      },
    },
  ];

  useKeyPress(bindings);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Use <kbd className="px-1.5 py-0.5 bg-surface rounded-control text-xs font-mono">W A S D</kbd> or arrow keys to move,{' '}
        <kbd className="px-1.5 py-0.5 bg-surface rounded-control text-xs font-mono">Space</kbd> to jump.
      </p>

      <div className="relative w-[400px] h-[400px] bg-surface rounded-surface border border-border overflow-hidden">
        <div
          className={\`absolute w-8 h-8 bg-brand rounded-control transition-all duration-100 \${
            action === 'jump' ? 'scale-125' : 'scale-100'
          }\`}
          style={{ left: pos.x, top: pos.y }}
        />
      </div>

      <p className="text-xs text-muted font-mono">
        Position: ({pos.x}, {pos.y}) | Action: {action}
      </p>
    </div>
  );
}`,
      tags: ['game', 'wasd', 'arrow-keys', 'multi-binding', 'interactive', 'space'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Passing bindings array inline as a literal',
      bad: `useKeyPress([
  { keys: 'Escape', callback: () => setOpen(false) },
  { keys: ['Ctrl', 's'], callback: handleSave },
]);`,
      good: `const bindings = useMemo(() => [
  { keys: 'Escape' as const, callback: () => setOpen(false) },
  { keys: ['Ctrl', 's'] as const, callback: handleSave },
], [handleSave]);

useKeyPress(bindings);`,
      reason:
        'While the hook uses a ref internally to avoid re-subscribing, passing an inline array literal creates a new reference every render. This causes unnecessary ref updates and can mask real bugs if the ref pattern changes. Memoize the bindings array with useMemo, or define it as a stable constant outside the component.',
    },
    {
      title: 'Using wrong modifier key names',
      bad: `useKeyPress(['Command', 'k'], callback);
useKeyPress(['Control', 'k'], callback);`,
      good: `useKeyPress(['⌘', 'k'], callback);   // Mac meta key
useKeyPress(['Ctrl', 'k'], callback);  // Cross-platform control key`,
      reason:
        'The hook recognizes a fixed set of modifier names: "Ctrl"/"Control", "Alt", "Meta"/"⌘", and "Shift". Using "Command" or "Cmd" will NOT be detected as a modifier — the hook falls through to matching only the first key in the array. Use "⌘" for the Meta key and "Ctrl" for the Control key.',
    },
    {
      title: 'Not calling preventDefault on browser-reserved shortcuts',
      bad: `useKeyPress(['Ctrl', 's'], () => {
  saveDocument();
});`,
      good: `useKeyPress(['Ctrl', 's'], (event) => {
  event.preventDefault(); // prevent browser Save dialog
  saveDocument();
});`,
      reason:
        'Browser shortcuts like Ctrl+S (Save), Ctrl+P (Print), or Ctrl+F (Find) have default behavior. If you intercept them without calling event.preventDefault(), the browser action still fires alongside your callback, leading to unexpected Save dialogs or print prompts.',
    },
    {
      title: 'Enabling shortcuts while a text input is focused',
      bad: `// User is typing in a search input and presses "s"
useKeyPress('s', () => scrollToSection());`,
      good: `const [inputFocused, setInputFocused] = useState(false);

useKeyPress('s', () => scrollToSection(), {
  enabled: !inputFocused,
});

<input
  onFocus={() => setInputFocused(true)}
  onBlur={() => setInputFocused(false)}
/>`,
      reason:
        'The hook listens on the window object globally — it fires regardless of which element has focus. If you register single-character shortcuts like "s" without the enabled guard, they will fire while the user is typing in text inputs, causing unintended side effects like navigation jumps or action triggers mid-sentence.',
    },
    {
      title: 'Relying on closure values inside callbacks without refs',
      bad: `const [count, setCount] = useState(0);

useKeyPress('ArrowRight', () => {
  // "count" is captured from the first render
  console.log(count);
  setCount(count + 1);
});`,
      good: `const [count, setCount] = useState(0);

useKeyPress('ArrowRight', () => {
  // Use the functional updater to always get the latest value
  setCount((prev) => prev + 1);
});`,
      reason:
        'The hook stores bindings in a ref that updates every render, so callbacks can access current closure values. However, React state updates are batched — reading a state variable directly inside the callback may yield a stale value if multiple events fire quickly. Always use functional updaters (setCount(prev => prev + 1)) or useRef for the latest value when the callback needs to read state.',
    },
  ],
};
