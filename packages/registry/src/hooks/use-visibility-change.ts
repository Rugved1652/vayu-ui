import { HookRegistryEntry } from '../types.js';

export const useVisibilityChangeEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-visibility-change',
  name: 'useVisibilityChange',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that tracks whether the document is currently visible to the user by wrapping the browser Page Visibility API (document.hidden / visibilitychange event).',
  longDescription:
    'Subscribes to the document "visibilitychange" event and returns a reactive boolean indicating whether the page is currently visible. The value is derived from document.hidden — it is true when the tab is in the foreground and false when the user switches tabs, minimizes the browser window, or otherwise causes the page to enter a background state. On initial render the hook defaults to true (visible), and the actual value is synced inside useEffect after hydration, making it fully SSR-safe with no hydration mismatch. The event listener is cleaned up on unmount. Use this hook as a declarative, React-lifecycle-aware alternative to manually managing document event listeners when you need to pause animations, throttle API polling, stop video playback, or defer non-critical work while the tab is hidden.',
  tags: [
    'visibility',
    'page-visibility',
    'tab',
    'background',
    'foreground',
    'document-hidden',
    'browser-api',
    'sensor',
    'reactive',
    'ssr-safe',
  ],
  category: 'sensor',
  useCases: [
    'Pause expensive animations, canvas rendering, or video playback when the user switches away from the tab to reduce CPU and GPU usage',
    'Throttle or stop API polling and WebSocket reconnection attempts while the page is hidden, then resume automatically when the user returns',
    'Track active vs. idle time for analytics by logging visibility state transitions to measure true user engagement',
    'Defer non-critical background tasks like report generation or pre-fetching until the tab is visible to avoid degrading performance on hidden pages',
    'Show a "Welcome back" notification or refresh stale data when the user returns to a tab that has been in the background',
    'Conditionally disable auto-play media or real-time updates when the page is not visible to conserve bandwidth and battery on mobile devices',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useVisibilityChange.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useVisibilityChange(): boolean',
  typeParams: [],
  returnType: 'boolean',
  parameters: [],
  returnValues: [
    {
      name: 'isVisible',
      type: 'boolean',
      description:
        'Whether the document is currently visible to the user. Returns true when the tab is in the foreground and the page is actively displayed. Returns false when the user has switched tabs, minimized the browser, or the page is otherwise in a background state. Defaults to true during SSR and on the initial render before the first useEffect fires, ensuring no hydration mismatch.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Visibility Status Indicator',
      description:
        'Displays a real-time indicator showing whether the current tab is visible or hidden, updating instantly when the user switches tabs or minimizes the browser.',
      code: `'use client';

import { useVisibilityChange } from 'vayu-ui';
import { Eye, EyeOff } from 'lucide-react';

export default function VisibilityIndicator() {
  const isVisible = useVisibilityChange();

  return (
    <div className="p-6 rounded-surface shadow-surface border bg-surface text-surface-content w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <div
        className={\`p-4 rounded-full transition-colors duration-300 \${
          isVisible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }\`}
      >
        {isVisible ? <Eye className="w-12 h-12" /> : <EyeOff className="w-12 h-12" />}
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-2xl font-bold">{isVisible ? 'Visible' : 'Hidden'}</span>
        <p className="text-sm text-muted-content">
          Switch tabs or minimize the window to see the state change.
        </p>
      </div>
      <div className="w-full p-3 bg-muted/40 rounded-md text-sm border space-y-1">
        <p className="font-mono">
          document.hidden:{' '}
          <span className="font-bold text-brand">{(!isVisible).toString()}</span>
        </p>
        <p className="font-mono">
          Document State:{' '}
          <span className="font-bold text-brand">
            {isVisible ? 'Active' : 'Background'}
          </span>
        </p>
      </div>
    </div>
  );
}`,
      tags: ['basic', 'indicator', 'status', 'icon'],
    },
    {
      title: 'Pause Polling When Hidden',
      description:
        'A data-fetching component that pauses its polling interval while the tab is hidden and resumes automatically when the user returns, saving network bandwidth and server load.',
      code: `'use client';

import { useVisibilityChange } from 'vayu-ui';
import { useState, useEffect, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
}

export default function SmartPolling() {
  const isVisible = useVisibilityChange();
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastFetched, setLastFetched] = useState<string>('');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('https://api.example.com/posts');
      const data = await res.json();
      setPosts(data.slice(0, 5));
      setLastFetched(new Date().toLocaleTimeString());
    } catch {
      // Handle error silently for demo
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    if (!isVisible) return;

    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, [isVisible, fetchPosts]);

  return (
    <div className="p-4 rounded-surface shadow-surface border bg-surface text-surface-content w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Live Posts</h3>
        <span
          className={\`text-xs px-2 py-1 rounded-full \${
            isVisible
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }\`}
        >
          {isVisible ? 'Polling active' : 'Polling paused'}
        </span>
      </div>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="text-sm p-2 rounded-md bg-muted/40">
            {post.title}
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-sm text-muted-content">Loading...</li>
        )}
      </ul>
      {lastFetched && (
        <p className="text-xs text-muted-content">Last updated: {lastFetched}</p>
      )}
    </div>
  );
}`,
      tags: ['polling', 'data-fetching', 'performance', 'conditional'],
    },
    {
      title: 'Welcome Back Banner',
      description:
        'Shows a dismissible "Welcome back" banner when the user returns to the tab after it has been in the background, useful for refreshing stale data or re-engaging the user.',
      code: `'use client';

import { useVisibilityChange } from 'vayu-ui';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function WelcomeBackBanner() {
  const isVisible = useVisibilityChange();
  const [showBanner, setShowBanner] = useState(false);
  const wasHidden = useRef(false);
  const [hiddenDuration, setHiddenDuration] = useState(0);
  const hiddenAt = useRef<number | null>(null);

  const handleVisibilityChange = useCallback(() => {
    if (!isVisible) {
      wasHidden.current = true;
      hiddenAt.current = Date.now();
    } else if (wasHidden.current && hiddenAt.current) {
      const duration = Math.round((Date.now() - hiddenAt.current) / 1000);
      setHiddenDuration(duration);
      setShowBanner(true);
      wasHidden.current = false;
      hiddenAt.current = null;
    }
  }, [isVisible]);

  useEffect(() => {
    handleVisibilityChange();
  }, [handleVisibilityChange]);

  if (!showBanner) return null;

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return \`\${seconds} second\${seconds !== 1 ? 's' : ''}\`;
    const minutes = Math.floor(seconds / 60);
    return \`\${minutes} minute\${minutes !== 1 ? 's' : ''}\`;
  };

  return (
    <div
      className="fixed top-4 right-4 z-50 w-80 rounded-surface shadow-elevated border bg-surface text-surface-content p-4 animate-in slide-in-from-top-2"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Welcome back!</p>
          <p className="text-xs text-muted-content mt-1">
            You were away for {formatDuration(hiddenDuration)}.
            {hiddenDuration > 60 && ' Data may be outdated — consider refreshing.'}
          </p>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-xs text-muted-content hover:text-surface-content shrink-0"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}`,
      tags: ['welcome-back', 're-engagement', 'banner', 'notification', 'duration'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using the hook to gate critical logic that must run even when hidden',
      bad: `const isVisible = useVisibilityChange();

// Only sync data when visible — data is lost if user switches tabs during save
useEffect(() => {
  if (!isVisible) return;
  syncToServer(formData);
}, [isVisible, formData]);`,
      good: `const isVisible = useVisibilityChange();

// Critical operations must always run regardless of visibility
useEffect(() => {
  syncToServer(formData);
}, [formData]);

// Use visibility only for non-critical optimizations like polling throttling
useEffect(() => {
  if (!isVisible) return;
  const id = setInterval(fetchUpdates, 5000);
  return () => clearInterval(id);
}, [isVisible]);`,
      reason:
        'The Page Visibility API indicates display state, not whether work should be skipped. Critical operations like saving form data, sending analytics, or persisting state must complete even when the tab is hidden. Only use the visibility signal to defer or throttle non-critical, resource-intensive tasks like polling, animations, or pre-fetching.',
    },
    {
      title: 'Manually polling document.hidden instead of using the hook',
      bad: `const [visible, setVisible] = useState(true);

useEffect(() => {
  const id = setInterval(() => {
    setVisible(!document.hidden);
  }, 1000);
  return () => clearInterval(id);
}, []);`,
      good: `import { useVisibilityChange } from 'vayu-ui';

const isVisible = useVisibilityChange();
// The hook uses the event-driven visibilitychange event,
// so updates are instant and zero-cost between state changes.`,
      reason:
        'Polling document.hidden on an interval is wasteful — it burns CPU cycles checking a value that rarely changes. The visibilitychange event fires exactly when the state transitions, making it both more efficient and more responsive than any polling approach.',
    },
    {
      title: 'Assuming the hook can detect individual tab focus within the same browser window',
      bad: `const isVisible = useVisibilityChange();

// Assuming this detects whether the tab has focus vs another tab in the same window
if (!isVisible) {
  console.log('User is looking at another tab');
}`,
      good: `const isVisible = useVisibilityChange();

// isVisible only tells you if the tab content is painted on screen.
// It does NOT distinguish between two visible tabs in the same window.
// For focus detection, listen to the window "focus" and "blur" events instead.

if (!isVisible) {
  console.log('Page is in the background (minimized or different tab is active)');
}`,
      reason:
        'The Page Visibility API reports whether the page content is being painted on screen. A tab that is visible but unfocused (e.g. the user clicked the address bar, or two tabs are side-by-side) still reports isVisible as true. To detect per-tab focus/blur, use the window "focus" and "blur" events instead.',
    },
    {
      title: 'Using the hook in a server component or SSR-critical path',
      bad: `// In a server component (no 'use client' directive)
import { useVisibilityChange } from 'vayu-ui';

export default function Page() {
  const isVisible = useVisibilityChange();
  if (!isVisible) return <StaticSkeleton />;
  return <LiveContent />;
}`,
      good: `'use client';

import { useVisibilityChange } from 'vayu-ui';

export default function VisibilityAwareContent() {
  const isVisible = useVisibilityChange();
  // Hook always returns true during SSR, so hide SSR-only logic elsewhere
  if (!isVisible) return <PausedState />;
  return <LiveContent />;
}`,
      reason:
        'useVisibilityChange relies on document.hidden and the visibilitychange event, neither of which exist on the server. The hook defaults to true during SSR to avoid hydration mismatches, which means any conditional logic based on a false value will never execute server-side. Always use it in a client component with the "use client" directive.',
    },
  ],
};
