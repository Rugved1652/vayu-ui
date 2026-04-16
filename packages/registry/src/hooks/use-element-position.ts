import { HookRegistryEntry } from '../types.js';

export const useElementPositionEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-element-position',
  name: 'useElementPosition',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks the bounding rectangle of a DOM element and returns viewport-relative coordinates, keeping them synchronized across scrolls, resizes, and element size changes.',
  longDescription:
    'Monitors a referenced DOM element via getBoundingClientRect and returns its viewport-relative position as a Position object with top, left, width, and height. The hook is designed to anchor floating UI layers — dropdowns, popovers, tooltips — below the trigger element. On mount it uses useLayoutEffect for a synchronous initial measurement that prevents the flash of an unpositioned overlay. While the isOpen flag is true, it subscribes to three update sources: (1) window scroll in the capture phase so scroll events inside nested scrollable containers are caught, (2) window resize for viewport changes, and (3) a ResizeObserver on the trigger element itself for content-driven size changes. All updates are wrapped in requestAnimationFrame to batch layout recalculations and avoid jank. When isOpen flips to false, every listener and observer is cleaned up, so there is zero overhead while the overlay is hidden. The hook is fully SSR-safe — all DOM access is guarded behind ref null-checks and only runs inside useEffect / useLayoutEffect. No external dependencies beyond React are required.',
  tags: [
    'position',
    'bounding-rect',
    'getBoundingClientRect',
    'dropdown',
    'popover',
    'tooltip',
    'floating',
    'anchor',
    'resize-observer',
    'layout',
  ],
  category: 'dom',
  useCases: [
    'Position a dropdown menu directly below its trigger button and keep it aligned when the page scrolls or the trigger resizes',
    'Anchor a popover to a target element so it follows the element as the user scrolls through long content',
    'Build a tooltip that tracks its trigger element across viewport changes and nested scrollable panels',
    'Create a context menu that appears next to a right-clicked element and stays positioned correctly during scroll',
    'Implement a "mega menu" navigation dropdown whose position updates live as the nav bar responds to responsive layout shifts',
    'Position an autocomplete suggestion list below a text input, recalculating when the input width changes due to sibling layout shifts',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useElementPosition.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useElementPosition(triggerRef: RefObject<HTMLElement | null>, isOpen: boolean): Position',
  returnType: 'Position',
  parameters: [
    {
      name: 'triggerRef',
      type: 'RefObject<HTMLElement | null>',
      required: true,
      description:
        'A React ref attached to the DOM element whose position should be tracked. The hook reads getBoundingClientRect on this element to compute viewport-relative coordinates. Pass null initially — the hook guards against null refs and will return zeroes until the ref is populated.',
    },
    {
      name: 'isOpen',
      type: 'boolean',
      required: true,
      description:
        'Controls whether the hook actively subscribes to scroll, resize, and ResizeObserver events. When false, all listeners are detached and the last known position is retained. Set this to true when the floating layer is visible and false when it is dismissed to avoid unnecessary DOM observations.',
    },
  ],
  returnValues: [
    {
      name: 'top',
      type: 'number',
      description:
        'The distance from the top of the viewport to the bottom edge of the trigger element (rect.bottom). Use this as the top offset for a position:fixed overlay to place it directly below the trigger.',
    },
    {
      name: 'left',
      type: 'number',
      description:
        'The distance from the left of the viewport to the left edge of the trigger element (rect.left). Use this as the left offset for a position:fixed overlay to horizontally align it with the trigger.',
    },
    {
      name: 'width',
      type: 'number',
      description:
        'The current width of the trigger element (rect.width). Useful for setting the overlay width to match the trigger, or for computing centered or right-aligned positions.',
    },
    {
      name: 'height',
      type: 'number',
      description:
        'The current height of the trigger element (rect.height). Useful for positioning overlays above the trigger (subtract overlay height from top and add trigger height) or for offset calculations.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Positioned Dropdown Menu',
      description:
        'A button that toggles a dropdown menu positioned directly below it using useElementPosition. The menu stays aligned on scroll and resize.',
      code: `'use client';

import { useElementPosition } from 'vayu-ui';
import { useRef, useState } from 'react';

const options = ['Edit', 'Duplicate', 'Archive', 'Delete'];

export default function PositionedDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { top, left, width } = useElementPosition(triggerRef, isOpen);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 rounded-control bg-brand text-brand-content"
      >
        Options {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <ul
          style={{ position: 'fixed', top, left, width }}
          className="mt-1 rounded-surface border bg-elevated text-elevated-content shadow-elevated py-1 z-50"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                onClick={() => {
                  console.log('Selected:', option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['dropdown', 'menu', 'position', 'fixed'],
    },
    {
      title: 'Popover with Click Outside Close',
      description:
        'A popover card anchored to an info button that closes when clicking outside, with the position updating live during scroll.',
      code: `'use client';

import { useElementPosition } from 'vayu-ui';
import { useRef, useState, useEffect } from 'react';

export default function PositionedPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { top, left } = useElementPosition(triggerRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-1.5 rounded-control border bg-surface text-surface-content text-sm"
      >
        More info
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          style={{ position: 'fixed', top, left }}
          className="mt-2 w-72 p-4 rounded-surface border bg-elevated text-elevated-content shadow-elevated z-50"
        >
          <h3 className="text-sm font-semibold mb-1">What is this?</h3>
          <p className="text-xs text-muted-content">
            This popover stays anchored to its trigger button even while you
            scroll the page or resize the window.
          </p>
        </div>
      )}
    </div>
  );
}`,
      tags: ['popover', 'click-outside', 'anchor', 'scroll'],
    },
    {
      title: 'Tooltip on Hover',
      description:
        'A tooltip that appears above a trigger element on mouse enter and disappears on mouse leave, with its position recalculated each time it opens.',
      code: `'use client';

import { useElementPosition } from 'vayu-ui';
import { useRef, useState } from 'react';

export default function HoverTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const { top, left, height } = useElementPosition(triggerRef, isOpen);

  return (
    <span
      className="inline-block"
    >
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="underline decoration-dashed cursor-help text-surface-content"
      >
        Hover me
      </span>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: top - height - 8,
            left,
          }}
          className="px-2 py-1 text-xs rounded-control bg-elevated text-elevated-content shadow-elevated z-50 pointer-events-none"
        >
          This is a tooltip!
        </div>
      )}
    </span>
  );
}`,
      tags: ['tooltip', 'hover', 'position-above', 'pointer-events'],
    },
    {
      title: 'Autocomplete Suggestions',
      description:
        'A text input that shows a filtered suggestion list positioned directly below it, resizing the list to match the input width.',
      code: `'use client';

import { useElementPosition } from 'vayu-ui';
import { useRef, useState, useMemo } from 'react';

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

export default function AutocompleteInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { top, left, width } = useElementPosition(inputRef, isOpen);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return fruits.filter((f) => f.toLowerCase().includes(lower));
  }, [query]);

  return (
    <div className="w-72">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => query && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder="Search fruits..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />

      {isOpen && suggestions.length > 0 && (
        <ul
          style={{ position: 'fixed', top, left, width }}
          className="mt-1 rounded-surface border bg-elevated text-elevated-content shadow-elevated py-1 z-50 max-h-48 overflow-y-auto"
        >
          {suggestions.map((fruit) => (
            <li key={fruit}>
              <button
                onMouseDown={() => {
                  setQuery(fruit);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted/50"
              >
                {fruit}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['autocomplete', 'input', 'suggestions', 'filter'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using position: absolute instead of position: fixed for the overlay',
      bad: `<ul style={{ position: 'absolute', top: position.top, left: position.left }}>`,
      good: `<ul style={{ position: 'fixed', top: position.top, left: position.left }}>`,
      reason:
        'useElementPosition returns viewport-relative coordinates from getBoundingClientRect. These values are correct for position: fixed. Using position: absolute would offset from the nearest positioned ancestor instead of the viewport, causing misalignment.',
    },
    {
      title: 'Keeping isOpen always true',
      bad: `const position = useElementPosition(triggerRef, true);`,
      good: `const position = useElementPosition(triggerRef, isVisible);`,
      reason:
        'When isOpen is true the hook maintains active scroll listeners, a resize listener, and a ResizeObserver. Leaving it always on wastes resources when no overlay is visible. Tie isOpen to the actual visibility state of the floating element so listeners are cleaned up when the overlay is hidden.',
    },
    {
      title: 'Adding scroll offset manually',
      bad: `const adjustedTop = position.top + window.scrollY;
const adjustedLeft = position.left + window.scrollX;`,
      good: `// Use position.top and position.left directly with position: fixed
<div style={{ position: 'fixed', top: position.top, left: position.left }}>`,
      reason:
        'getBoundingClientRect already returns viewport-relative coordinates, which are exactly what position: fixed expects. Adding scrollX/scrollY double-counts the offset and pushes the overlay out of view.',
    },
    {
      title: 'Passing a state value instead of a ref for triggerRef',
      bad: `const [el, setEl] = useState<HTMLElement | null>(null);
const position = useElementPosition({ current: el }, isOpen);`,
      good: `const triggerRef = useRef<HTMLButtonElement>(null);
const position = useElementPosition(triggerRef, isOpen);
// ... <button ref={triggerRef}>`,
      reason:
        'The hook expects a stable RefObject whose .current property is mutated by React after the DOM node mounts. Creating a wrapper object around state on every render causes the hook to re-subscribe its observers on every state change, degrading performance and potentially missing updates.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (showDropdown) {
  const position = useElementPosition(ref, true);
}`,
      good: `const position = useElementPosition(ref, showDropdown);`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useElementPosition inside a conditional violates the Rules of Hooks. Pass the visibility state as the isOpen parameter instead — the hook already handles subscribing and unsubscribing based on it.',
    },
  ],
};
