import { HookRegistryEntry } from '../types.js';

export const useIdleEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-idle',
  name: 'useIdle',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks whether the user is idle by monitoring DOM activity events and returning true after a configurable period of inactivity.',
  longDescription:
    'Monitors five browser activity events — mousemove, keydown, wheel, touchstart, and scroll — to detect user interaction. On mount, a setTimeout timer is started with the provided timeout duration. Any user activity clears the existing timer, immediately sets the idle state to false, and restarts the timer. When the timer expires without interruption, the idle state flips to true. The hook cleans up all listeners and timers on unmount via useEffect\'s cleanup function. Because it attaches listeners to window inside useEffect (which only runs client-side), it is SSR-safe — the initial render always returns false, and activity detection begins only after hydration. The effect re-runs when the timeout parameter changes, ensuring the timer duration stays in sync. Choose this hook when you need to react to user presence or absence — for screensavers, session management, power-saving, or conditional UI — without manually managing event listeners and timers.',
  tags: [
    'idle',
    'inactivity',
    'timeout',
    'session',
    'screensaver',
    'activity',
    'presence',
    'auto-lock',
    'power-saving',
    'user-activity',
  ],
  category: 'input',
  useCases: [
    'Show a screensaver or dim overlay when the user has been inactive for a set duration, hiding it as soon as they move the mouse or press a key',
    'Warn users before auto-logging them out due to inactivity, or automatically end a session after prolonged idle time for security',
    'Display a "Still watching?" prompt in streaming or video apps to prevent unattended playback from consuming bandwidth',
    'Pause or throttle live data polling, WebSocket updates, or API refresh cycles while the user is away to reduce unnecessary network traffic',
    'Trigger power-saving behaviors like hiding non-essential UI elements, reducing animation frame rates, or dimming the screen after inactivity',
    'Pause background video playback or animations when the user steps away from the device, resuming automatically on activity',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useIdle.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useIdle(timeout: number): boolean',
  typeParams: [],
  returnType: 'boolean',
  parameters: [
    {
      name: 'timeout',
      type: 'number',
      required: true,
      description:
        'The inactivity duration in milliseconds before the user is considered idle. The timer resets on every detected activity event (mousemove, keydown, wheel, touchstart, scroll). Typical values are 30000 (30 seconds) for UI dimming, 300000 (5 minutes) for session warnings, and 900000 (15 minutes) for auto-logout. Must be a positive integer.',
    },
  ],
  returnValues: [
    {
      name: 'isIdle',
      type: 'boolean',
      description:
        'True when no user activity has been detected for the specified timeout duration. Returns false on initial render and resets to false immediately upon any activity event (mouse movement, key press, scroll, wheel, or touch).',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Idle Screen Dimmer',
      description:
        'Dims the page and shows a "Move your mouse to continue" overlay after 60 seconds of inactivity, restoring the UI instantly on any user interaction.',
      code: `import { useIdle } from 'vayu-ui';

export default function IdleDimmer() {
  const isIdle = useIdle(60_000);

  return (
    <div className="relative min-h-screen">
      <main className="p-8">
        <h1 className="text-2xl font-bold text-surface-content">Welcome back</h1>
        <p className="mt-2 text-muted-content">This page dims after 60 seconds of inactivity.</p>
      </main>

      {isIdle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <p className="text-lg text-white animate-pulse">
            Move your mouse or press any key to continue
          </p>
        </div>
      )}
    </div>
  );
}`,
      tags: ['screensaver', 'dim', 'overlay', 'inactivity'],
    },
    {
      title: 'Session Timeout Warning',
      description:
        'Warns the user 30 seconds before auto-logout after 5 minutes of idle time, with a countdown and a "Stay logged in" button.',
      code: `import { useIdle } from 'vayu-ui';
import { useState, useEffect, useCallback } from 'react';

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const IDLE_LIMIT = 300_000; // 5 minutes
  const WARN_AFTER = 270_000; // 4 min 30 sec
  const isIdle = useIdle(WARN_AFTER);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [dismissed, setDismissed] = useState(false);

  const stayActive = useCallback(() => {
    setDismissed(true);
    setSecondsLeft(30);
    // Dispatch a synthetic event to reset the idle timer
    window.dispatchEvent(new MouseEvent('mousemove'));
  }, []);

  useEffect(() => {
    if (!isIdle) {
      setDismissed(false);
      setSecondsLeft(30);
      return;
    }
    if (dismissed) return;

    setSecondsLeft(30);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          // Log the user out
          window.location.href = '/logout';
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isIdle, dismissed]);

  return (
    <div>
      {children}
      {isIdle && !dismissed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-elevated text-elevated-content rounded-overlay shadow-elevated p-6 max-w-sm text-center space-y-4">
            <h2 className="text-lg font-semibold">Session expiring</h2>
            <p className="text-sm text-muted-content">
              You will be logged out in <span className="font-mono font-bold text-destructive">{secondsLeft}</span> seconds.
            </p>
            <button
              onClick={stayActive}
              className="px-4 py-2 bg-brand text-brand-content rounded-control hover:opacity-90"
            >
              Stay logged in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,
      tags: ['session', 'auto-logout', 'warning', 'timeout'],
    },
    {
      title: 'Throttled Polling While Idle',
      description:
        'Reduces live data polling frequency from every 5 seconds to every 60 seconds when the user goes idle, saving bandwidth and server load.',
      code: `import { useIdle } from 'vayu-ui';
import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
}

export default function LiveNotifications() {
  const isIdle = useIdle(60_000);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const pollInterval = isIdle ? 60_000 : 5_000;

    const fetchNotifications = () => {
      fetch('/api/notifications')
        .then((res) => res.json())
        .then((data) => setNotifications(data.items))
        .catch(() => {});
    };

    fetchNotifications();
    const id = setInterval(fetchNotifications, pollInterval);
    return () => clearInterval(id);
  }, [isIdle]);

  return (
    <div className="space-y-3 p-4 max-w-md">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-surface-content">Notifications</h2>
        {isIdle && (
          <span className="text-xs text-muted-content bg-muted rounded-control px-2 py-0.5">
            Reduced updates
          </span>
        )}
      </div>
      {notifications.length === 0 ? (
        <p className="text-sm text-muted-content">No new notifications</p>
      ) : (
        <ul className="divide-y border rounded-surface">
          {notifications.map((n) => (
            <li key={n.id} className="px-3 py-2 text-sm text-surface-content">
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      tags: ['polling', 'throttle', 'bandwidth', 'live-data'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Passing 0 or a negative timeout',
      bad: `const isIdle = useIdle(0);`,
      good: `const isIdle = useIdle(30_000);`,
      reason:
        'A timeout of 0 causes the idle flag to flip to true on the next event loop tick after every activity — creating a rapid false→true→false flicker. Negative values behave unpredictably with setTimeout. Always pass a positive number of milliseconds.',
    },
    {
      title: 'Using outside a "use client" boundary',
      bad: `// ServerComponent.tsx (no "use client")
const isIdle = useIdle(60_000);`,
      good: `"use client";
// ClientComponent.tsx
const isIdle = useIdle(60_000);`,
      reason:
        'useIdle attaches event listeners to window inside useEffect. In a Server Component, useEffect never runs, so the hook will always return false and never detect activity. Always use it in a Client Component with the "use client" directive.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (shouldTrack) {
  const isIdle = useIdle(30_000);
}`,
      good: `const isIdle = useIdle(shouldTrack ? 30_000 : Number.MAX_SAFE_INTEGER);`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useIdle inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes or stale state. If you need to disable idle tracking, pass a very large timeout value instead.',
    },
    {
      title: 'Assuming idle is a one-shot trigger',
      bad: `// Expecting isIdle to stay true forever after first timeout
useEffect(() => {
  if (isIdle) logout();
}, [isIdle]);`,
      good: `// isIdle resets to false on activity — handle the transition
const wasIdle = useRef(false);
useEffect(() => {
  if (isIdle && !wasIdle.current) {
    logout();
  }
  wasIdle.current = isIdle;
}, [isIdle]);`,
      reason:
        'useIdle continuously monitors activity. When the user becomes active again, isIdle resets to false. If you need a one-shot action (like logout), guard against re-triggering — otherwise the effect re-runs every time the user alternates between idle and active.',
    },
  ],
};
