import { HookRegistryEntry } from '../types.js';

export const useMediaQueryEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-media-query',
  name: 'useMediaQuery',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that tracks whether a CSS media query matches, returning a boolean that updates in real time when the match state changes.',
  longDescription:
    'Wraps the browser\'s `window.matchMedia` API in a React-friendly hook using `useState` and `useEffect`. On mount, it evaluates the provided media query string and sets the initial match state. It then subscribes to the `MediaQueryList` change event so the returned boolean updates automatically whenever the query result changes — for example when the user resizes the window, toggles dark mode, rotates a mobile device, or changes system accessibility preferences. The hook is SSR-safe: it initializes state to `false` and guards all browser API access with `typeof window === \'undefined\'`, so server-rendered output is deterministic and no hydration mismatch occurs. When the `query` string changes between renders, the previous listener is cleaned up via the effect\'s return function and a fresh subscription is created for the new query. Use this hook instead of manual `matchMedia` calls or window resize listeners whenever you need declarative, reactive CSS media query matching in a React component.',
  tags: [
    'media-query',
    'responsive',
    'breakpoint',
    'matchmedia',
    'viewport',
    'dark-mode',
    'prefers-color-scheme',
    'reduced-motion',
    'print',
    'screen-size',
  ],
  category: 'sensor',
  useCases: [
    'Conditionally render desktop vs mobile layouts by querying min-width or max-width breakpoints without hardcoded resize listeners',
    'Detect the user\'s dark mode preference using prefers-color-scheme to automatically theme the UI',
    'Respect the prefers-reduced-motion accessibility setting to disable or simplify animations for users who need it',
    'Apply print-specific layouts or hide interactive elements when the user opens print preview via the print media query',
    'Implement orientation-aware layouts that adapt when a mobile device is rotated between portrait and landscape',
    'Detect high-DPI or high-resolution displays using resolution-based queries to serve appropriate image assets or adjust layout density',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useMediaQuery.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useMediaQuery(query: string): boolean',
  typeParams: [],
  returnType: 'boolean',
  parameters: [
    {
      name: 'query',
      type: 'string',
      required: true,
      description:
        'A valid CSS media query string (e.g., "(min-width: 768px)", "(prefers-color-scheme: dark)", "print", "(orientation: landscape)"). The string is passed directly to `window.matchMedia`. Changing the query between renders unsubscribes from the old query and subscribes to the new one.',
    },
  ],
  returnValues: [
    {
      name: 'matches',
      type: 'boolean',
      description:
        'Whether the media query currently matches the browser environment. Returns `false` during SSR and on the initial client render before the effect runs, then updates to the actual match state. Automatically re-renders the component whenever the match status changes (e.g., window resize, system theme change, orientation change).',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Responsive Breakpoint Switcher',
      description:
        'Renders different layouts depending on the current viewport width using multiple useMediaQuery calls for mobile, tablet, and desktop breakpoints.',
      code: `'use client';

import { useMediaQuery } from 'vayu-ui';

export default function ResponsiveLayout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="p-4 rounded-surface bg-surface text-surface-content">
      {isDesktop && (
        <div className="grid grid-cols-4 gap-4">
          <div className="h-24 rounded-surface bg-muted/30 border" />
          <div className="h-24 rounded-surface bg-muted/30 border" />
          <div className="h-24 rounded-surface bg-muted/30 border" />
          <div className="h-24 rounded-surface bg-muted/30 border" />
        </div>
      )}
      {isTablet && (
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 rounded-surface bg-muted/30 border" />
          <div className="h-24 rounded-surface bg-muted/30 border" />
        </div>
      )}
      {isMobile && (
        <div className="h-24 rounded-surface bg-muted/30 border" />
      )}
    </div>
  );
}`,
      tags: ['responsive', 'breakpoint', 'layout', 'viewport'],
    },
    {
      title: 'Dark Mode Detection',
      description:
        'Detects the user\'s system-level color scheme preference and applies a data attribute or conditional styling accordingly.',
      code: `'use client';

import { useMediaQuery } from 'vayu-ui';

export default function DarkModeDetector() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div
      className={\`p-4 rounded-surface border \${
        prefersDark
          ? 'bg-gray-900 text-gray-100 border-gray-700'
          : 'bg-white text-gray-900 border-gray-200'
      }\`}
    >
      <p className="text-sm font-medium">
        System theme: {prefersDark ? 'Dark' : 'Light'}
      </p>
      <p className="text-xs text-muted-content mt-1">
        Toggle your OS dark mode setting to see this update automatically.
      </p>
    </div>
  );
}`,
      tags: ['dark-mode', 'theme', 'prefers-color-scheme', 'accessibility'],
    },
    {
      title: 'Reduced Motion Preference',
      description:
        'Checks the prefers-reduced-motion media query and conditionally applies CSS transitions only when the user has not requested reduced motion.',
      code: `'use client';

import { useMediaQuery } from 'vayu-ui';

export default function AnimatedCard() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div
      className={\`p-6 rounded-surface border bg-surface text-surface-content shadow-surface \${
        prefersReducedMotion ? '' : 'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1'
      }\`}
    >
      <h3 className="font-semibold">Animated Card</h3>
      <p className="text-sm text-muted-content mt-2">
        {prefersReducedMotion
          ? 'Transitions are disabled because you prefer reduced motion.'
          : 'Hover over this card to see a smooth animation.'}
      </p>
    </div>
  );
}`,
      tags: ['accessibility', 'reduced-motion', 'animation', 'a11y'],
    },
    {
      title: 'Print Layout Detection',
      description:
        'Detects when the page is in print or print-preview mode to show a simplified, print-friendly layout.',
      code: `'use client';

import { useMediaQuery } from 'vayu-ui';

export default function PrintAwarePage() {
  const isPrinting = useMediaQuery('print');

  return (
    <div className="p-4 rounded-surface bg-surface text-surface-content">
      <header className={\`flex items-center justify-between pb-4 border-b mb-4 \${
        isPrinting ? 'hidden' : ''
      }\`}>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="text-brand hover:underline">Home</a>
          <a href="/about" className="text-brand hover:underline">About</a>
          <a href="/contact" className="text-brand hover:underline">Contact</a>
        </nav>
      </header>

      <article className="prose">
        <h1 className="text-xl font-bold">Article Title</h1>
        <p className="text-sm text-muted-content mt-2">
          This content renders in both screen and print views. Navigation and
          interactive elements are hidden during print.
        </p>
      </article>

      {isPrinting && (
        <footer className="mt-8 pt-4 border-t text-xs text-muted-content">
          Printed from example.com — {new Date().toLocaleDateString()}
        </footer>
      )}
    </div>
  );
}`,
      tags: ['print', 'media', 'layout', 'conditional-rendering'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Calling the hook conditionally',
      bad: `if (isFeatureEnabled) {
  const isMobile = useMediaQuery('(max-width: 767px)');
}`,
      good: `const isMobile = useMediaQuery('(max-width: 767px)');

// Use the boolean in your conditional logic instead
if (isFeatureEnabled && isMobile) { ... }`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useMediaQuery inside an if-statement, loop, or callback violates the Rules of Hooks and causes crashes or stale state.',
    },
    {
      title: 'Forgetting parentheses in compound media queries',
      bad: `const isTablet = useMediaQuery('min-width: 768px and max-width: 1023px');`,
      good: `const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');`,
      reason:
        'CSS media queries require each feature to be wrapped in parentheses. Omitting them produces an invalid query that will never match, silently returning false without errors.',
    },
    {
      title: 'Expecting synchronous truth on first render',
      bad: `const isDesktop = useMediaQuery('(min-width: 1024px)');
// Expecting isDesktop to be true on first render when the window is wide`,
      good: `const isDesktop = useMediaQuery('(min-width: 1024px)');
// On first render isDesktop is false (SSR-safe default).
// It updates to the real value after the effect runs — handle the transition.`,
      reason:
        'The hook initializes state to false for SSR safety, then updates in useEffect. If you need the correct value on the first paint without a flash, use CSS media queries directly or a layout effect pattern.',
    },
    {
      title: 'Using dynamic string interpolation in the query every render',
      bad: `const isWide = useMediaQuery(\`(min-width: \${containerWidth}px)\`);`,
      good: `const isWide = useMediaQuery('(min-width: 1024px)');
// Use fixed breakpoint constants. For dynamic measurements, use useMeasure instead.`,
      reason:
        'While the hook does re-subscribe when the query string changes, constructing it from rapidly changing values (like container width) causes unnecessary cleanup and re-subscription on every render. Use useMeasure for element-based measurements instead.',
    },
  ],
};
