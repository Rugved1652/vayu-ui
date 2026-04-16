import { HookRegistryEntry } from '../types.js';

export const useScrollPositionEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-scroll-position',
  name: 'useScrollPosition',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks the scroll position, direction, and progress of the window or a specific scrollable element, with built-in throttling via requestAnimationFrame.',
  longDescription:
    'Returns a reactive ScrollPosition object containing x/y offsets, vertical and horizontal scroll direction, whether the scrollable area is at its top or bottom boundary, and a 0-100 progress percentage. The hook supports two targets: when no element ref is provided it tracks window scroll (using scrollX/scrollY and document.documentElement.scrollHeight), and when a ref is supplied it tracks that element\'s scrollTop/scrollLeft instead. Throttling is handled by a dual mechanism — a time-based gate (configurable via the throttle option, defaulting to 50ms) skips updates that arrive too quickly, while a requestAnimationFrame fallback ensures at least one update per frame during sustained scroll activity. Scroll direction is computed by comparing the current offset against the previous offset stored in refs, yielding "up"/"down" for Y and "left"/"right" for X, or null when the position has not changed on that axis. The progress value is calculated as (scrollY / maxScroll) * 100, clamped to 0-100, and is 0 when the content does not overflow. All DOM reads and event listener registration happen inside useEffect, so the hook is SSR-safe — the initial render uses static defaults (x: 0, y: 0, isAtTop: true, isAtBottom: false, progress: 0, directions null). Choose this hook when you need reactive scroll data for sticky headers, reading-progress indicators, parallax effects, infinite-scroll triggers, or scroll-spy navigation without manually managing scroll event listeners and throttling logic.',
  tags: [
    'scroll',
    'position',
    'direction',
    'progress',
    'parallax',
    'throttle',
    'sticky-header',
    'scroll-spy',
    'window',
    'element',
  ],
  category: 'sensor',
  useCases: [
    'Hide or reveal a sticky navigation header based on whether the user is scrolling down or up, creating a cleaner reading experience on mobile',
    'Display a scroll-to-top floating action button only when the user has scrolled past a certain threshold and the page is no longer at the top',
    'Build an article reading-progress bar that fills from 0% to 100% as the user scrolls through long-form content',
    'Implement parallax or scroll-driven animations that respond to the vertical scroll offset or progress percentage',
    'Track scroll position inside a specific scrollable container such as a modal body, virtualized list, or sidebar panel instead of the entire window',
    'Trigger lazy-loading of content or infinite-scroll pagination when the user nears the bottom of the page (isAtBottom or progress > 90)',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useScrollPosition.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useScrollPosition(options?: UseScrollPositionOptions): ScrollPosition',
  parameters: [
    {
      name: 'options',
      type: 'UseScrollPositionOptions',
      required: false,
      description:
        'Configuration object. Omit entirely to track window scroll with default 50ms throttling. Pass { throttle } to adjust the update interval, { element } to track a specific scrollable container, or both.',
      defaultValue: '{}',
    },
    {
      name: 'options.throttle',
      type: 'number',
      required: false,
      description:
        'Minimum interval in milliseconds between state updates during scrolling. Lower values give smoother feedback at the cost of more re-renders; higher values reduce CPU usage but make the position feel laggy. The hook also uses requestAnimationFrame as a fallback so at least one update fires per paint frame. Default is 50ms.',
      defaultValue: '50',
    },
    {
      name: 'options.element',
      type: "React.RefObject<HTMLElement | null>",
      required: false,
      description:
        'A React ref attached to the scrollable container element whose scroll position you want to track. When provided, the hook reads scrollTop/scrollLeft/scrollHeight/clientHeight from this element. When omitted (or when the ref is null), the hook tracks window scroll instead. Changing the ref between renders re-subscribes the scroll listener to the new target.',
    },
  ],
  returnType: 'ScrollPosition',
  returnValues: [
    {
      name: 'x',
      type: 'number',
      description:
        'Current horizontal scroll offset in pixels. For window scroll this is window.scrollX; for an element it is element.scrollLeft. Starts at 0.',
    },
    {
      name: 'y',
      type: 'number',
      description:
        'Current vertical scroll offset in pixels. For window scroll this is window.scrollY; for an element it is element.scrollTop. Starts at 0.',
    },
    {
      name: 'directionY',
      type: "'up' | 'down' | null",
      description:
        'The last detected vertical scroll direction. "down" when the user scrolls down (y increases), "up" when scrolling up (y decreases), or null if the y position has not changed since the last update. Useful for hide/show header logic.',
    },
    {
      name: 'directionX',
      type: "'left' | 'right' | null",
      description:
        'The last detected horizontal scroll direction. "right" when scrolling right (x increases), "left" when scrolling left (x decreases), or null if x has not changed.',
    },
    {
      name: 'isAtTop',
      type: 'boolean',
      description:
        'true when the vertical scroll position is at or above the top boundary (scrollY <= 0). Useful for conditionally showing scroll-to-top buttons or removing top box shadows.',
    },
    {
      name: 'isAtBottom',
      type: 'boolean',
      description:
        'true when the vertical scroll position is within 1 pixel of the maximum scroll offset (scrollY >= scrollHeight - clientHeight - 1). The 1px tolerance accounts for sub-pixel rounding. Use this to trigger infinite-scroll loading or show end-of-content messages.',
    },
    {
      name: 'progress',
      type: 'number',
      description:
        'Scroll progress as a percentage from 0 to 100, calculated as (scrollY / maxScroll) * 100 where maxScroll = scrollHeight - clientHeight. Clamped to a maximum of 100. Returns 0 when the content does not overflow (maxScroll <= 0). Ideal for progress bars and scroll-driven animations.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Reading Progress Bar',
      description:
        'A thin progress bar fixed at the top of the page that fills as the user scrolls through the document, showing how far they have read.',
      code: `'use client';
import { useScrollPosition } from 'vayu-ui';

export default function ReadingProgressBar() {
  const { progress } = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
      <div
        className="h-full bg-brand transition-[width] duration-100 ease-out"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}`,
      tags: ['progress-bar', 'reading', 'scroll', 'fixed'],
    },
    {
      title: 'Sticky Header with Direction',
      description:
        'A navigation header that hides when the user scrolls down and reappears when scrolling back up, with a box shadow that appears once the user has scrolled past the top.',
      code: `'use client';
import { useScrollPosition } from 'vayu-ui';
import { useState } from 'react';

export default function StickyHeader() {
  const { directionY, isAtTop, y } = useScrollPosition({ throttle: 16 });
  const [navOpen, setNavOpen] = useState(false);
  const hidden = directionY === 'down' && y > 80;

  return (
    <header
      className={\`
        sticky top-0 z-40 transition-transform duration-300 ease-in-out
        bg-surface/95 backdrop-blur-sm
        \${hidden ? '-translate-y-full' : 'translate-y-0'}
        \${!isAtTop ? 'shadow-surface' : ''}
      \`}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <span className="text-lg font-semibold text-surface-content">MyApp</span>
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="px-3 py-1.5 rounded-control text-sm bg-brand text-brand-content"
        >
          Menu
        </button>
      </nav>
    </header>
  );
}`,
      tags: ['sticky-header', 'navigation', 'hide-on-scroll', 'direction'],
    },
    {
      title: 'Element Scroll Tracker',
      description:
        'Tracks scroll position inside a specific scrollable container element, displaying current offset and progress — useful for virtualized lists or scrollable panels.',
      code: `'use client';
import { useScrollPosition } from 'vayu-ui';
import { useRef } from 'react';

export default function ElementScrollTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y, progress, isAtBottom, directionY } = useScrollPosition({
    element: containerRef,
    throttle: 32,
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-4 text-sm text-muted-content">
        <span>Offset: {y}px</span>
        <span>Progress: {progress.toFixed(1)}%</span>
        <span>Direction: {directionY ?? 'none'}</span>
        {isAtBottom && (
          <span className="text-brand font-medium">Reached bottom!</span>
        )}
      </div>

      <div
        ref={containerRef}
        className="h-64 overflow-y-auto rounded-surface border bg-surface p-4"
      >
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="py-3 border-b border-border last:border-0 text-surface-content"
          >
            Item {i + 1}
          </div>
        ))}
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-[width] duration-100"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
    </div>
  );
}`,
      tags: ['element', 'container', 'list', 'scrollable'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Setting throttle to 0 or 1ms',
      bad: `const pos = useScrollPosition({ throttle: 0 });`,
      good: `const pos = useScrollPosition({ throttle: 50 }); // or at minimum 16 for 60fps`,
      reason:
        'A throttle of 0 bypasses the time-based gate and fires the state update on every single scroll event via the requestAnimationFrame fallback, which can cause excessive re-renders and jank. Use the default 50ms for most UIs, or 16ms if you need smooth per-frame updates for animations.',
    },
    {
      title: 'Passing an element ref to a non-scrollable container',
      bad: `const ref = useRef<HTMLDivElement>(null);
// div has no overflow: auto/scroll — scrollTop is always 0
const pos = useScrollPosition({ element: ref });`,
      good: `const ref = useRef<HTMLDivElement>(null);
// div has overflow-y: auto so it actually scrolls
<div ref={ref} className="h-64 overflow-y-auto">...</div>
const pos = useScrollPosition({ element: ref });`,
      reason:
        'The hook reads scrollTop/scrollLeft from the element. If the element has no overflow, these values stay at 0 and direction will always be null, progress will always be 0. The element must have CSS overflow set to auto or scroll and enough content to overflow its fixed height.',
    },
    {
      title: 'Destructuring and using values during SSR',
      bad: `// During SSR, useEffect has not run yet
const { y, isAtTop } = useScrollPosition();
if (y > 100) { /* this branch never runs server-side */ }`,
      good: `// Use the values safely — they have sensible defaults (y: 0, isAtTop: true)
const { y, isAtTop } = useScrollPosition();
// The first client-side render will update to real values via useEffect`,
      reason:
        'On the server and during the initial hydration render, the hook returns its default state: x: 0, y: 0, isAtTop: true, isAtBottom: false, progress: 0, and all directions null. The real scroll position is read inside useEffect after mount. Any server-side branching on these values will use the defaults, which is safe but may differ from the client after hydration.',
    },
    {
      title: 'Mutating the returned ScrollPosition object',
      bad: `const pos = useScrollPosition();
pos.progress = 50; // mutation has no effect on state`,
      good: `const { progress } = useScrollPosition();
const adjustedProgress = Math.min(progress, 50);`,
      reason:
        'The returned ScrollPosition is a React state object. Mutating its properties directly does not trigger a re-render and the change will be overwritten on the next scroll event. Treat the return value as read-only and derive new values from it.',
    },
    {
      title: 'Depending on isAtBottom being pixel-perfect',
      bad: `const { isAtBottom } = useScrollPosition();
if (isAtBottom) {
  // assumes scrollY === scrollHeight - clientHeight exactly
  loadMore();
}`,
      good: `const { isAtBottom, progress } = useScrollPosition();
// isAtBottom has a 1px tolerance — or use progress > 95 for early loading
if (isAtBottom || progress > 95) {
  loadMore();
}`,
      reason:
        'The isAtBottom check uses a 1px tolerance (scrollY >= maxScroll - 1) to account for sub-pixel rounding and float precision issues across browsers. In some browsers the scroll position may never reach the exact maximum value. If you need to trigger loading before the absolute bottom, use progress > 90 or progress > 95 instead.',
    },
  ],
};
