import { HookRegistryEntry } from '../types.js';

export const useTimeoutEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-timeout',
  name: 'useTimeout',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'A hook that schedules a callback to execute after a specified delay, with automatic cleanup on unmount and a manual cancel function.',
  longDescription:
    'Wraps the native setTimeout API inside a React useEffect, ensuring the timeout is automatically set when the component mounts and cleared when it unmounts. The hook stores the timeout ID in a useRef to avoid unnecessary re-renders. When the callback or ms dependency changes, the previous timeout is cancelled via the effect cleanup and a new one is scheduled — making the hook fully reactive to prop changes. The returned clearTimeout function allows manual cancellation before the delay expires, which is useful for dismissing scheduled actions based on user interaction (e.g., cancelling a redirect because the user clicked somewhere). Because the timeout is registered inside useEffect, it is SSR-safe — no timer is created during server rendering, and on the client the cleanup function removes the timeout on unmount, preventing memory leaks and stale callbacks. Choose this over raw setTimeout when you need a declarative, lifecycle-aware one-shot timer that cleans up after itself and can be cancelled on demand.',
  tags: [
    'timeout',
    'delay',
    'timer',
    'setTimeout',
    'scheduling',
    'cleanup',
    'side-effect',
    'one-shot',
  ],
  category: 'side-effect',
  useCases: [
    'When you need to auto-dismiss a toast notification, alert, or banner after a few seconds without managing setTimeout cleanup manually',
    'To implement a delayed redirect after a successful form submission or login before navigating the user to a new page',
    'When building a "session expiring" warning that triggers a prompt after a fixed period of inactivity',
    'To schedule one-time cleanup operations like resetting temporary UI state or clearing a flag after an animation completes',
    'When you need a declarative alternative to raw setTimeout that automatically cancels on component unmount to prevent memory leaks and stale callbacks',
    'To show a loading spinner only after a brief delay, preventing a flash-of-loading-state on fast network responses',
    'To temporarily highlight or flash an element for a fixed duration before reverting it to its original state',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useTimeout.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useTimeout(callback: () => void, ms: number): { clearTimeout: () => void }',
  parameters: [
    {
      name: 'callback',
      type: '() => void',
      required: true,
      description:
        'The function to execute when the timeout expires. Changing the callback identity between renders (e.g., via an inline arrow function) will cancel the pending timeout and schedule a new one. Wrap stable callbacks with useCallback to avoid unnecessary resets.',
    },
    {
      name: 'ms',
      type: 'number',
      required: true,
      description:
        'The delay in milliseconds before the callback fires. Changing this value cancels the current timeout and reschedules with the new delay. Pass 0 to execute on the next event loop tick.',
    },
  ],
  returnType: '{ clearTimeout: () => void }',
  returnValues: [
    {
      name: 'clearTimeout',
      type: '() => void',
      description:
        'Manually cancels the pending timeout before it fires. Call this when the user performs an action that makes the scheduled callback unnecessary — for example, clicking a "dismiss" button on a toast that would otherwise auto-hide. After calling clearTimeout, the callback will not execute unless the hook re-schedules due to a dependency change.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Auto-Dismiss Toast',
      description:
        'Shows a success toast that automatically disappears after 3 seconds, with a manual dismiss button that cancels the timeout.',
      code: `'use client';
import { useTimeout } from 'vayu-ui';
import { useState } from 'react';

export default function AutoDismissToast() {
  const [visible, setVisible] = useState(true);

  const { clearTimeout } = useTimeout(() => {
    setVisible(false);
  }, 3000);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm">
      <span className="text-sm">Changes saved successfully.</span>
      <button
        onClick={() => {
          clearTimeout();
          setVisible(false);
        }}
        className="text-xs text-muted-content hover:text-surface-content transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}`,
      tags: ['toast', 'notification', 'auto-dismiss', 'alert'],
    },
    {
      title: 'Delayed Redirect After Login',
      description:
        'Displays a success message after login and redirects to the dashboard after a 2-second delay, with an option to navigate immediately.',
      code: `'use client';
import { useTimeout } from 'vayu-ui';
import { useState, useCallback } from 'react';

export default function LoginSuccess() {
  const [redirecting, setRedirecting] = useState(true);

  const handleRedirect = useCallback(() => {
    window.location.href = '/dashboard';
  }, []);

  const { clearTimeout } = useTimeout(handleRedirect, 2000);

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm mx-auto">
      <div className="text-3xl">&#10003;</div>
      <h2 className="text-lg font-semibold">Login Successful</h2>
      <p className="text-sm text-muted-content">
        {redirecting ? 'Redirecting to dashboard in 2 seconds...' : 'Redirecting now...'}
      </p>
      <button
        onClick={() => {
          clearTimeout();
          window.location.href = '/dashboard';
        }}
        className="px-4 py-2 rounded-control bg-brand text-brand-content text-sm font-medium"
      >
        Go Now
      </button>
    </div>
  );
}`,
      tags: ['redirect', 'login', 'navigation', 'success'],
    },
    {
      title: 'Delayed Loading Spinner',
      description:
        'Shows a loading spinner only after a 300ms delay to prevent flashing it on fast responses. Cancels the timeout when loading finishes early.',
      code: `'use client';
import { useTimeout } from 'vayu-ui';
import { useState, useCallback, useEffect } from 'react';

export default function DelayedSpinner() {
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleShowSpinner = useCallback(() => {
    setShowSpinner(true);
  }, []);

  const { clearTimeout } = useTimeout(handleShowSpinner, 300);

  // Simulate a fast API call that resolves in 150ms (before spinner threshold)
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!loading) {
      clearTimeout();
      setShowSpinner(false);
    }
  }, [loading, clearTimeout]);

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-surface shadow-surface border bg-surface text-surface-content max-w-sm mx-auto">
      {loading && showSpinner && (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-brand" />
      )}
      <p className="text-sm">
        {loading ? 'Loading data...' : 'Data loaded successfully!'}
      </p>
    </div>
  );
}`,
      tags: ['loading', 'spinner', 'delay', 'performance'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Passing an unstable callback without useCallback',
      bad: `function Component() {
  useTimeout(() => {
    fetchData(searchTerm);
  }, 500);
  // Every render creates a new arrow function, cancelling and rescheduling the timeout.
}`,
      good: `function Component() {
  const handleFetch = useCallback(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  useTimeout(handleFetch, 500);
}`,
      reason:
        'The callback is a dependency of the internal useEffect. An inline arrow function changes identity on every render, causing the effect to clean up the previous timeout and schedule a new one each render — defeating the purpose of a delayed action and potentially causing unexpected behavior.',
    },
    {
      title: 'Using useTimeout for recurring or repeating actions',
      bad: `// Trying to poll an API every 5 seconds
useTimeout(() => {
  fetchNotifications();
  // This will NOT re-schedule itself — the callback fires only once.
}, 5000);`,
      good: `// Use useIntervalWhen for repeating actions
import { useIntervalWhen } from 'vayu-ui';

useIntervalWhen(() => {
  fetchNotifications();
}, 5000, true);`,
      reason:
        'useTimeout is a one-shot timer — the callback fires exactly once after the delay. For recurring actions at a fixed interval, use useIntervalWhen which automatically re-schedules after each execution.',
    },
    {
      title: 'Not using clearTimeout when early cancellation is needed',
      bad: `const [visible, setVisible] = useState(true);
useTimeout(() => setVisible(false), 5000);

// User clicks "close" but the timeout is still running and will
// call setVisible(false) again later — harmless here, but in
// complex components it can trigger unwanted side effects.
<button onClick={() => setVisible(false)}>Close</button>`,
      good: `const [visible, setVisible] = useState(true);
const { clearTimeout } = useTimeout(() => setVisible(false), 5000);

<button onClick={() => {
  clearTimeout(); // Cancel the pending timeout
  setVisible(false);
}}>
  Close
</button>`,
      reason:
        'If the user dismisses the element before the timeout fires, the stale callback still executes on schedule. Always call clearTimeout when the scheduled action is no longer needed to prevent unexpected state updates, duplicate API calls, or navigation on unmounted components.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `function Component({ autoClose }: { autoClose: boolean }) {
  if (autoClose) {
    useTimeout(() => setVisible(false), 3000);
  }
  // Violates Rules of Hooks — React will throw an error or produce
  // incorrect behavior across re-renders.
}`,
      good: `function Component({ autoClose }: { autoClose: boolean }) {
  const { clearTimeout } = useTimeout(
    () => setVisible(false),
    autoClose ? 3000 : Number.MAX_SAFE_INTEGER,
  );
  // Or guard the logic inside the callback:
  // useTimeout(() => { if (autoClose) setVisible(false); }, 3000);
}`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useTimeout inside a conditional, loop, or nested function violates the Rules of Hooks and causes React to throw an error or produce incorrect state across re-renders.',
    },
    {
      title: 'Expecting the timeout to restart without changing dependencies',
      bad: `function Timer() {
  const { clearTimeout } = useTimeout(() => {
    console.log('Fired!');
  }, 2000);

  // This does NOT restart the timeout — the hook only re-schedules
  // when callback or ms changes.
  return <button onClick={() => clearTimeout()}>Reset</button>;
}`,
      good: `function Timer() {
  const [trigger, setTrigger] = useState(0);
  const { clearTimeout } = useTimeout(() => {
    console.log('Fired!');
  }, 2000);

  // Changing a dependency (via key on a wrapper or a changing prop)
  // forces the hook to re-schedule.
  return (
    <button onClick={() => setTrigger((t) => t + 1)}>
      Restart
    </button>
  );
}
// Or use a keyed wrapper: <TimerInner key={trigger} />`,
      reason:
        'The hook schedules the timeout in a useEffect that depends on callback and ms. Calling clearTimeout only cancels the pending timeout — it does not re-schedule. To restart, you must change one of the dependencies (e.g., by using a counter in the callback closure or keying the component to force a remount).',
    },
  ],
};
