import { HookRegistryEntry } from '../types.js';

export const useNetworkStatusEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-network-status',
  name: 'useNetworkStatus',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks the browser\'s online/offline connectivity status in real time and records a timestamp when the connection is lost.',
  longDescription:
    'Subscribes to the browser\'s native "online" and "offline" events on the window object and exposes the current connectivity state through a reactive React value. On initial render the hook reads navigator.onLine — falling back to true when navigator is unavailable (e.g. during SSR or in certain test environments) — so server and client produce the same initial output with no hydration mismatch. When the browser detects a loss of connectivity, the hook sets isOnline to false and captures the current time in offlineAt, enabling UI that shows how long the user has been disconnected. When connectivity is restored, isOnline flips back to true and offlineAt is cleared. The event listeners are cleaned up on unmount. Use this hook instead of manually adding window event listeners when you need a declarative, React-friendly way to react to network changes — especially for showing offline banners, disabling network-dependent actions, or queueing operations for retry.',
  tags: [
    'network',
    'online',
    'offline',
    'connectivity',
    'internet',
    'status',
    'sensor',
    'browser-api',
    'real-time',
    'connection',
  ],
  category: 'sensor',
  useCases: [
    'Display a persistent offline banner or toast when the user loses internet connectivity so they understand why data is not loading',
    'Disable or visually gray out buttons that trigger network requests (e.g. "Save", "Submit") when the device is offline, preventing failed API calls',
    'Track how long the user has been disconnected using the offlineAt timestamp to show elapsed time or trigger reconnection logic after a threshold',
    'Queue mutations or write operations while offline and automatically flush them when connectivity is restored',
    'Build a network-aware data fetching layer that skips requests when offline and retries them once the connection is back',
    'Show contextual messaging in collaborative or real-time apps (e.g. document editors, chat) when a teammate\'s connection drops',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useNetworkStatus.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useNetworkStatus(): NetworkStatus',
  typeParams: [],
  returnType: 'NetworkStatus',
  parameters: [],
  returnValues: [
    {
      name: 'isOnline',
      type: 'boolean',
      description:
        'Whether the browser currently reports an active network connection. Initialized from navigator.onLine on mount, then updated reactively via "online" and "offline" window events. Defaults to true in SSR environments where navigator is unavailable.',
    },
    {
      name: 'offlineAt',
      type: 'Date | undefined',
      description:
        'A JavaScript Date capturing the moment the connection was lost. Only present when isOnline is false. Automatically cleared (set back to undefined) when connectivity is restored. Use this to compute downtime duration with Date.now() - offlineAt.getTime().',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Offline Warning Banner',
      description:
        'A dismissible banner that slides in from the top of the viewport when connectivity is lost and automatically disappears when the connection is restored.',
      code: `'use client';

import { useNetworkStatus } from 'vayu-ui';
import { useState } from 'react';

export default function OfflineBanner() {
  const { isOnline } = useNetworkStatus();
  const [dismissed, setDismissed] = useState(false);

  if (isOnline || dismissed) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-destructive text-destructive-content px-4 py-2 flex items-center justify-between text-sm">
      <span>You are currently offline. Some features may be unavailable.</span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 underline hover:no-underline"
      >
        Dismiss
      </button>
    </div>
  );
}`,
      tags: ['banner', 'offline', 'notification', 'alert'],
    },
    {
      title: 'Network-Aware Submit Button',
      description:
        'A form submit button that disables itself and shows an explanatory tooltip when the device is offline, preventing failed network requests.',
      code: `'use client';

import { useNetworkStatus } from 'vayu-ui';

export default function NetworkAwareButton() {
  const { isOnline } = useNetworkStatus();

  return (
    <div className="space-y-2 p-4 rounded-surface border bg-surface text-surface-content max-w-sm">
      <label className="block text-sm font-medium">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full px-3 py-2 rounded-control border bg-canvas text-canvas-content"
      />
      <button
        disabled={!isOnline}
        className="w-full px-4 py-2 rounded-control bg-brand text-brand-content disabled:opacity-50 disabled:cursor-not-allowed"
        title={isOnline ? 'Submit' : 'You are offline — submit will be available when reconnected'}
      >
        {isOnline ? 'Submit' : 'Offline — Cannot Submit'}
      </button>
      {!isOnline && (
        <p className="text-xs text-muted-content">
          Your device is offline. This form will be submittable once connectivity is restored.
        </p>
      )}
    </div>
  );
}`,
      tags: ['form', 'submit', 'disabled', 'network'],
    },
    {
      title: 'Offline Duration Indicator',
      description:
        'A status indicator that displays how long the user has been disconnected by computing the elapsed time from the offlineAt timestamp.',
      code: `'use client';

import { useNetworkStatus } from 'vayu-ui';
import { useState, useEffect } from 'react';

function formatElapsed(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return \`\${seconds}s\`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return \`\${minutes}m \${remaining}s\`;
}

export default function OfflineDuration() {
  const { isOnline, offlineAt } = useNetworkStatus();
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    if (isOnline || !offlineAt) {
      setElapsed('');
      return;
    }

    const update = () =>
      setElapsed(formatElapsed(Date.now() - offlineAt.getTime()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isOnline, offlineAt]);

  if (isOnline) {
    return (
      <div className="flex items-center gap-2 text-sm text-success">
        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
        Connected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-destructive">
      <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
      Offline for {elapsed}
    </div>
  );
}`,
      tags: ['duration', 'timer', 'offline', 'status'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Assuming isOnline guarantees server reachability',
      bad: `const { isOnline } = useNetworkStatus();
if (isOnline) {
  // Assuming the API is definitely reachable
  await fetch('/api/data');
}`,
      good: `const { isOnline } = useNetworkStatus();
if (!isOnline) {
  // Show offline UI, skip the request
  return;
}
try {
  await fetch('/api/data');
} catch (err) {
  // Still handle network errors — isOnline only reflects
  // the browser's connection to a network, not server health
}`,
      reason:
        'navigator.onLine only indicates whether the browser is connected to a network — it does not confirm that the destination server is reachable or responding. A user on a captive Wi-Fi portal may report isOnline as true while all requests fail. Always handle fetch errors regardless of the online status.',
    },
    {
      title: 'Treating offlineAt as a persistent timestamp across re-renders',
      bad: `const { offlineAt } = useNetworkStatus();
// Storing offlineAt in state and expecting it to persist
const [lostAt] = useState(offlineAt);`,
      good: `const { offlineAt } = useNetworkStatus();
// Use offlineAt directly — it is updated reactively
// and clears automatically when connectivity is restored
const duration = offlineAt
  ? Date.now() - offlineAt.getTime()
  : 0;`,
      reason:
        'offlineAt is a reactive value managed by the hook. Copying it into a separate useState or useRef breaks reactivity — the copied value will not clear when connectivity is restored, and will not update if the browser fires multiple offline events. Always read it directly from the hook return value.',
    },
    {
      title: 'Using this hook for server-side rendering decisions',
      bad: `// In a server component or SSR context
const { isOnline } = useNetworkStatus();
if (!isOnline) {
  return <StaticFallback />;
}`,
      good: `// In a client component
'use client';
import { useNetworkStatus } from 'vayu-ui';

export default function NetworkGate() {
  const { isOnline } = useNetworkStatus();
  if (!isOnline) return <OfflineFallback />;
  return <LiveContent />;
}`,
      reason:
        'useNetworkStatus relies on window event listeners and navigator.onLine, neither of which exist on the server. During SSR the hook defaults isOnline to true, which may not reflect the actual client state. Always use it in a client component (with "use client" directive) so the browser events are subscribed after hydration.',
    },
    {
      title: 'Polling or re-checking navigator.onLine manually',
      bad: `const { isOnline } = useNetworkStatus();

// Unnecessary: polling navigator.onLine on an interval
useEffect(() => {
  const id = setInterval(() => {
    if (navigator.onLine !== isOnline) {
      // Manual sync attempt
    }
  }, 5000);
  return () => clearInterval(id);
}, [isOnline]);`,
      good: `const { isOnline } = useNetworkStatus();
// The hook already subscribes to "online"/"offline" events.
// isOnline updates instantly when connectivity changes.
// No polling needed.`,
      reason:
        'The hook already listens to the browser\'s native "online" and "offline" events, which fire immediately when connectivity changes. Polling navigator.onLine on a timer is redundant, wastes resources, and introduces unnecessary delay compared to the event-driven approach.',
    },
  ],
};
