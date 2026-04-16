import { HookRegistryEntry } from '../types.js';

export const useThrottleEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-throttle',
  name: 'useThrottle',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Returns a throttled version of a value that updates at most once per specified interval, guaranteeing periodic output during continuous changes.',
  longDescription:
    'Wraps a value in a setTimeout-based throttle mechanism using React\'s useState, useRef, and useEffect. A ref tracks the timestamp of the last update. Each time the input value changes, the hook schedules a timeout with a dynamically-calculated delay — `interval - (Date.now() - lastExecuted.current)` — so the throttled value updates exactly when the interval window expires, not earlier. If the interval has already elapsed since the last update, the new value propagates immediately. This guarantees at least one update per interval during continuous changes, unlike debounce which only fires after changes stop. The hook is fully SSR-safe: useState initializes with the input value directly, so server and client produce identical initial output with no hydration mismatch. No browser APIs are accessed during rendering. Choose this hook over useDebounce when you need guaranteed periodic updates during sustained input — such as scroll tracking, mouse following, or live data streaming — rather than waiting for input to pause.',
  tags: [
    'throttle',
    'rate-limit',
    'performance',
    'scroll',
    'resize',
    'mouse',
    'interval',
    'real-time',
    'value',
    'delay',
  ],
  category: 'animation',
  useCases: [
    'Throttle scroll position tracking to avoid expensive layout recalculations or parallax updates on every single pixel scrolled',
    'Rate-limit mouse move events for real-time cursor-following effects, drawing canvases, or tooltip positioning that must stay responsive without overwhelming the render cycle',
    'Throttle a window resize handler to recalculate responsive grid columns or chart dimensions at a fixed cadence instead of on every intermediate frame',
    'Prevent API spam in "search as you type" by guaranteeing a request fires every N milliseconds during continuous typing, rather than waiting for the user to pause',
    'Limit how often a rapidly-updating data source — such as a websocket tick, sensor reading, or animation frame counter — triggers React re-renders',
    'Throttle drag position updates to keep drag-and-drop overlays smooth without flooding the main thread with state changes',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useThrottle.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useThrottle<T>(value: T, interval: number): T',
  typeParams: ['T'],
  returnType: 'T',
  parameters: [
    {
      name: 'value',
      type: 'T',
      required: true,
      description:
        'The value to throttle. Can be any type — string, number, boolean, object, or array. The hook detects changes via React\'s dependency comparison in useEffect, so both primitive and reference types are supported.',
    },
    {
      name: 'interval',
      type: 'number',
      required: true,
      description:
        'The minimum time in milliseconds between updates to the throttled value. Typical values are 100–300ms for UI interactions (scroll, mouse, resize), 16–32ms for smooth animation-frame-rate throttling, and 500–1000ms for API rate-limiting. Passing 0 effectively bypasses throttling since the timeout fires on the next event loop tick.',
    },
  ],
  returnValues: [
    {
      name: 'throttledValue',
      type: 'T',
      description:
        'The rate-limited version of the input value. On the initial render it equals the input value immediately (SSR-safe). On subsequent changes, it retains the previous value until the interval elapses, at which point it updates to the latest input value. During continuous rapid changes, it is guaranteed to update at least once per interval.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Throttled Scroll Position Tracker',
      description:
        'Displays the current scroll percentage of the viewport, updating at most every 150ms to avoid expensive calculations on every pixel scrolled.',
      code: `import { useThrottle } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function ScrollTracker() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const throttledPercent = useThrottle(scrollPercent, 150);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 right-4 px-3 py-1.5 rounded-control bg-elevated text-elevated-content shadow-elevated text-sm">
      {throttledPercent}%
    </div>
  );
}`,
      tags: ['scroll', 'position', 'performance', 'ui'],
    },
    {
      title: 'Throttled Mouse Move Follower',
      description:
        'A dot that follows the cursor position, throttled to update at most every 50ms to prevent excessive re-renders during fast mouse movement.',
      code: `import { useThrottle } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttledPos = useThrottle(position, 50);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="relative w-full h-64 rounded-surface border bg-surface overflow-hidden">
      <div
        className="absolute w-4 h-4 rounded-full bg-brand pointer-events-none transition-transform"
        style={{
          transform: \`translate(\${throttledPos.x - 8}px, \${throttledPos.y - 8}px)\`,
        }}
      />
      <p className="absolute bottom-2 right-2 text-xs text-muted-content">
        x: {throttledPos.x}, y: {throttledPos.y}
      </p>
    </div>
  );
}`,
      tags: ['mouse', 'cursor', 'animation', 'real-time'],
    },
    {
      title: 'Throttled Live Search',
      description:
        'A search input that fires an API request every 500ms while the user is actively typing, providing real-time results without waiting for the user to pause (unlike debounce).',
      code: `import { useThrottle } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function ThrottledSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const throttledQuery = useThrottle(query, 500);

  useEffect(() => {
    if (!throttledQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    fetch(\`/api/search?q=\${encodeURIComponent(throttledQuery)}\`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setResults(data.items))
      .catch(() => {});

    return () => controller.abort();
  }, [throttledQuery]);

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="w-full px-3 py-2 rounded-control border bg-surface text-surface-content"
      />
      {results.length > 0 && (
        <ul className="space-y-1">
          {results.map((item) => (
            <li key={item} className="px-2 py-1 text-sm rounded-md hover:bg-muted/50">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['search', 'api', 'input', 'live'],
    },
    {
      title: 'Throttled Window Resize Layout',
      description:
        'Updates a responsive grid layout at most every 200ms during window resizing, avoiding expensive grid recalculations on every intermediate frame.',
      code: `import { useThrottle } from 'vayu-ui';
import { useState, useEffect } from 'react';

export default function ResponsiveGrid() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );
  const throttledWidth = useThrottle(width, 200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = throttledWidth >= 1024 ? 4 : throttledWidth >= 768 ? 2 : 1;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-content">
        Viewport: {throttledWidth}px &mdash; {columns} column{columns > 1 ? 's' : ''}
      </p>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-24 rounded-surface bg-muted/30 border" />
        ))}
      </div>
    </div>
  );
}`,
      tags: ['resize', 'responsive', 'grid', 'layout'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Setting interval to 0 or a negative number',
      bad: `const throttled = useThrottle(value, 0);`,
      good: `const throttled = useThrottle(value, 200);`,
      reason:
        'An interval of 0 causes the setTimeout to fire on the next event loop tick without actually rate-limiting. A negative interval produces undefined behavior. Use a meaningful positive interval — typically 100–300ms for UI interactions.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isEnabled) {
  const throttled = useThrottle(value, 200);
}`,
      good: `const throttled = useThrottle(isEnabled ? value : placeholder, 200);`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useThrottle inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes, stale state, or inconsistent renders.',
    },
    {
      title: 'Using throttle when debounce is the right tool',
      bad: `// Expecting the search to only fire AFTER the user stops typing
const throttled = useThrottle(query, 300);`,
      good: `// Use useDebounce to wait for the user to stop changing the value
const debounced = useDebounce(query, 300);`,
      reason:
        'Throttle guarantees at least one update per interval during continuous changes. Debounce resets the timer on every change and only fires once after changes stop. If you need "fire after silence" behavior (e.g., search autocomplete), use useDebounce. If you need "fire at a steady rate" behavior (e.g., scroll tracking), use useThrottle.',
    },
    {
      title: 'Throttling callback functions instead of values',
      bad: `const throttledFn = useThrottle(() => handleScroll(event), 100);
// This re-creates the function every render and throttles the reference, not the behavior`,
      good: `const throttledY = useThrottle(scrollY, 100);
useEffect(() => {
  handleScroll(throttledY);
}, [throttledY]);`,
      reason:
        'useThrottle is designed for values, not functions. Throttling a callback reference compares function identity on each render, which changes every time, defeating the throttle. Instead, throttle the value and trigger the side effect with useEffect.',
    },
    {
      title: 'Expecting every intermediate value to be captured',
      bad: `const throttled = useThrottle(rapidlyChangingValue, 300);
// Expecting throttled to reflect every change within the 300ms window`,
      good: `const throttled = useThrottle(rapidlyChangingValue, 300);
// throttled only updates once per 300ms — intermediate values are intentionally skipped`,
      reason:
        'Throttling deliberately discards intermediate values that arrive within the interval window. The throttled value jumps to the latest input value only when the interval expires. If you need every change to be processed (just delayed), use a queue or debounce pattern instead.',
    },
  ],
};
