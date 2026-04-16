import { HookRegistryEntry } from '../types.js';

export const useOnClickOutsideEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-on-click-outside',
  name: 'useOnClickOutside',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Fires a callback when the user clicks, touches, or presses outside one or more referenced elements.',
  longDescription:
    'Attaches document-level listeners for mousedown, touchstart, and pointerdown events and invokes the provided handler whenever the event target falls outside the boundary of every supplied ref. It accepts either a single RefObject or an array of RefObjects, making it equally suitable for simple dropdowns (one trigger ref) and composite patterns like popovers with an anchor plus a floating panel (multiple refs). The listener is registered inside useEffect with proper cleanup, so it is fully SSR-safe — no listeners are attached during server rendering, and on the client the cleanup function removes all three listeners on unmount or when deps change. Use this hook instead of manually wiring document.addEventListener when you need a declarative, React-lifecycle-aware way to close overlays, dismiss menus, or detect outside interactions without leaking event listeners.',
  tags: [
    'click-outside',
    'outside-click',
    'dismiss',
    'close',
    'dropdown',
    'popover',
    'modal',
    'menu',
    'touch',
    'pointer',
    'ref',
  ],
  category: 'dom',
  useCases: [
    'Close a dropdown menu when the user clicks anywhere outside the trigger button and the dropdown panel',
    'Dismiss a popover or tooltip on outside click without relying on a backdrop overlay',
    'Implement "click away to close" behavior for custom context menus that must ignore clicks inside the menu itself',
    'Close a date picker calendar popup when the user clicks elsewhere on the page',
    'Detect when a user clicks outside a search bar to auto-collapse expanded search suggestions',
    'Dismiss an inline editor or editable field when the user clicks outside the editing area',
    'Handle outside interactions for composite floating UIs that have both a trigger element and a content panel',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useOnClickOutside.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useOnClickOutside<T extends HTMLElement = HTMLElement>(refs: RefObject<T> | RefObject<T>[], handler: (event: MouseEvent | TouchEvent | PointerEvent) => void): void',
  typeParams: ['T extends HTMLElement = HTMLElement'],
  returnType: 'void',
  parameters: [
    {
      name: 'refs',
      type: 'RefObject<T> | RefObject<T>[]',
      required: true,
      description:
        'A single React ref or an array of refs that define the "inside" boundary. When the user clicks inside any of the referenced elements the handler is NOT called. Pass an array when your UI has multiple distinct regions that should all count as "inside" — for example a button that opens a dropdown plus the dropdown panel itself.',
    },
    {
      name: 'handler',
      type: '(event: MouseEvent | TouchEvent | PointerEvent) => void',
      required: true,
      description:
        'Callback invoked with the native DOM event whenever a mousedown, touchstart, or pointerdown event occurs outside all ref boundaries. Use this to set open state to false, blur the element, or trigger any dismiss logic. The event parameter lets you inspect which button was clicked or which touch initiated the gesture.',
    },
  ],
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Dropdown with Outside Click Dismiss',
      description:
        'A simple dropdown that opens on button click and closes when the user clicks anywhere outside the button or dropdown panel.',
      code: `import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState } from 'react';

export default function BasicDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, panelRef], () => setIsOpen(false));

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-brand text-brand-content rounded-control"
      >
        {isOpen ? 'Close' : 'Open Menu'}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute top-full left-0 mt-2 w-48 rounded-surface bg-surface border shadow-elevated z-50"
        >
          <ul className="py-1">
            <li className="px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer">Profile</li>
            <li className="px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer">Settings</li>
            <li className="px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer">Sign out</li>
          </ul>
        </div>
      )}
    </div>
  );
}`,
      tags: ['dropdown', 'basic', 'dismiss'],
    },
    {
      title: 'Color Picker Popover',
      description:
        'A color picker button that opens a palette popover. The popover stays open while the user picks colors and closes when they click outside both the button and the palette.',
      code: `import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState } from 'react';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function ColorPickerPopover() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([triggerRef, popoverRef], () => setOpen(false));

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-control border bg-surface text-surface-content"
      >
        <span
          className="inline-block w-4 h-4 rounded-full border"
          style={{ backgroundColor: color }}
        />
        Pick Color
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute top-full left-0 mt-2 p-3 rounded-surface bg-surface border shadow-elevated z-50"
        >
          <p className="text-xs text-muted-content mb-2">Choose a color</p>
          <div className="grid grid-cols-3 gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setOpen(false); }}
                className="w-8 h-8 rounded-control border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: c,
                  borderColor: c === color ? 'var(--color-foreground)' : 'transparent',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
      tags: ['popover', 'color-picker', 'composite'],
    },
    {
      title: 'Inline Editable Text',
      description:
        'A text label that switches to an input field on click. Pressing Enter or clicking outside the input saves the value and exits edit mode.',
      code: `import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState, useEffect } from 'react';

export default function InlineEdit({ defaultValue = '' }: { defaultValue?: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (editing) setEditing(false);
  });

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setEditing(false);
    if (e.key === 'Escape') {
      setValue(defaultValue);
      setEditing(false);
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="px-2 py-1 rounded-control border bg-surface text-surface-content w-48"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className="px-2 py-1 rounded-control cursor-pointer hover:bg-muted/50 border border-transparent hover:border-border"
    >
      {value || 'Click to edit'}
    </span>
  );
}`,
      tags: ['inline-edit', 'single-ref', 'form'],
    },
    {
      title: 'Search Bar with Suggestions',
      description:
        'A search input that shows suggestion results as the user types. The suggestions panel closes when the user clicks outside the input or the results panel.',
      code: `import { useOnClickOutside } from 'vayu-ui';
import { useRef, useState, useMemo } from 'react';

const DATA = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export default function SearchWithSuggestions() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([inputRef, panelRef], () => setFocused(false));

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return DATA.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="relative w-72">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Search fruits..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />

      {focused && suggestions.length > 0 && (
        <div
          ref={panelRef}
          className="absolute top-full left-0 mt-1 w-full rounded-surface bg-surface border shadow-elevated z-50"
        >
          <ul className="py-1">
            {suggestions.map((item) => (
              <li
                key={item}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { setQuery(item); setFocused(false); }}
                className="px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,
      tags: ['search', 'autocomplete', 'suggestions'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Forgetting to include the trigger ref in the array',
      bad: `const panelRef = useRef<HTMLDivElement>(null);
useOnClickOutside(panelRef, () => setOpen(false));
// Clicking the trigger button also closes the dropdown!`,
      good: `const triggerRef = useRef<HTMLButtonElement>(null);
const panelRef = useRef<HTMLDivElement>(null);
useOnClickOutside([triggerRef, panelRef], () => setOpen(false));`,
      reason:
        'If the trigger element that opens the overlay is not included in the refs array, clicking it will fire the outside-click handler and immediately close the overlay — often before the toggle handler runs, making the overlay appear stuck closed.',
    },
    {
      title: 'Using onClick instead of mousedown-aware handler for the trigger',
      bad: `<button onClick={() => setOpen(true)}>Open</button>
{/* useOnClickOutside listens for mousedown, which fires BEFORE onClick.
    The outside click handler may close the overlay before the button's onClick fires. */}`,
      good: `<button onMouseDown={(e) => { e.stopPropagation(); setOpen(true); }}>
  Open
</button>
{/* Or, more commonly, include the trigger ref in the refs array so clicks on it are ignored. */}`,
      reason:
        'useOnClickOutside attaches to mousedown, touchstart, and pointerdown — all of which fire before the click event. If you rely on onClick to open a menu while the hook listens for mousedown to close it, you can get a race condition where the close handler fires first.',
    },
    {
      title: 'Passing a callback that changes identity every render without memoization',
      bad: `useOnClickOutside(refs, () => setOpen(false));
// The arrow function is recreated every render, causing the effect to re-run and
// re-attach all three listeners on every render.`,
      good: `const handleClose = useCallback(() => setOpen(false), []);
useOnClickOutside(refs, handleClose);`,
      reason:
        'The handler is included in the useEffect dependency array. If it is an inline arrow function, a new function instance is created each render, causing the effect to clean up and re-register all event listeners on every render — hurting performance and potentially causing flicker.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isOpen) {
  useOnClickOutside(refs, handler);
}`,
      good: `useOnClickOutside(refs, (e) => {
  if (isOpen) handler(e);
});
// Or always call the hook and guard inside the handler.`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useOnClickOutside inside a conditional violates the Rules of Hooks and will cause React to throw an error or produce incorrect behavior across re-renders.',
    },
    {
      title: 'Using a stale ref that has not been attached to a DOM element',
      bad: `const ref = useRef<HTMLDivElement>(null);
useOnClickOutside(ref, handler);
// ref.current is null — clicks are always considered "outside"`,
      good: `const ref = useRef<HTMLDivElement>(null);
useOnClickOutside(ref, handler);
return <div ref={ref}>Content</div>;
// ref.current is set after mount, so the hook works correctly.`,
      reason:
        'If the ref has not been attached to a DOM element via the ref prop, ref.current remains null. The hook treats null refs as having no boundary, so every click fires the handler — the hook becomes a global click listener instead of an outside-click detector.',
    },
  ],
};
