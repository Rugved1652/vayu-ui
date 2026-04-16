import { HookRegistryEntry } from '../types.js';

export const usePageLeaveEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-page-leave',
  name: 'usePageLeave',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Fires a callback when the user\u2019s mouse cursor leaves the browser viewport — typically moving upward toward the tab bar or address bar — enabling exit-intent detection.',
  longDescription:
    'Attaches a document-level "mouseout" event listener and invokes the provided callback when two conditions are met simultaneously: the event has no relatedTarget (meaning the cursor is not entering another DOM element within the page) and clientY is less than or equal to 0 (meaning the cursor has crossed the top edge of the viewport). This combination reliably detects the classic "exit-intent" gesture where a desktop user moves their mouse toward the browser chrome — close tab, back button, or address bar. The hook is fully SSR-safe because it relies on useEffect, which is a no-op during server rendering; the listener is only attached after hydration on the client and is properly cleaned up on unmount or when the callback reference changes. Use this hook when you need a declarative, React-lifecycle-aware way to detect exit intent for lead capture popups, analytics events, unsaved-work warnings, or engagement tracking — without manually managing document event listeners or worrying about cleanup.',
  tags: [
    'exit-intent',
    'mouse',
    'viewport',
    'page-leave',
    'engagement',
    'retention',
    'analytics',
    'popup',
    'trigger',
    'dom-event',
  ],
  category: 'dom',
  useCases: [
    'Display an exit-intent popup or modal for lead capture, newsletter signup, or a discount offer when a user is about to leave the page',
    'Fire an analytics event to track when users show exit intent, helping measure page engagement and identify drop-off points',
    'Show a warning banner when the user has unsaved form changes and moves their cursor toward the browser chrome',
    'Prevent e-commerce cart abandonment by presenting a last-minute incentive when the shopper\u2019s mouse heads toward the tab bar',
    'Pause auto-playing video or media when the user\u2019s attention appears to be leaving the viewport, reducing unnecessary bandwidth usage',
    'Activate a customer support chat widget when a user hesitates at the top of the page, indicating they may need help before leaving',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'usePageLeave.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function usePageLeave(callback: () => void): void',
  returnType: 'void',
  parameters: [
    {
      name: 'callback',
      type: '() => void',
      required: true,
      description:
        'Function invoked when the mouse cursor leaves the viewport upward. This fires once per exit gesture — the hook does not debounce internally, so the callback may fire rapidly if the user moves the cursor in and out of the viewport top edge. Wrap expensive operations in a debounce or guard with a flag if you need to limit how often the handler runs. The callback is included in the useEffect dependency array, so changing its identity between renders will detach and re-attach the event listener.',
    },
  ],
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Exit-Intent Discount Modal',
      description:
        'Displays a one-time discount offer modal when the user moves their cursor toward the browser tab bar, then prevents the modal from showing again during the session.',
      code: `'use client';
import { usePageLeave } from 'vayu-ui';
import { useState, useCallback } from 'react';

export default function ExitIntentModal() {
  const [showOffer, setShowOffer] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleLeave = useCallback(() => {
    if (!dismissed) setShowOffer(true);
  }, [dismissed]);

  usePageLeave(handleLeave);

  const handleDismiss = () => {
    setShowOffer(false);
    setDismissed(true);
  };

  return (
    <>
      {showOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-surface bg-surface p-6 shadow-elevated">
            <h2 className="text-xl font-bold text-surface-content">Wait! Don\u2019t miss out</h2>
            <p className="mt-2 text-sm text-muted-content">
              Use code <span className="font-mono font-semibold text-brand">STAY20</span> for 20%
              off your first order.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-sm rounded-control border text-surface-content"
              >
                No thanks
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-sm rounded-control bg-brand text-brand-content"
              >
                Claim discount
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`,
      tags: ['modal', 'discount', 'e-commerce', 'exit-intent'],
    },
    {
      title: 'Analytics Exit-Intent Tracker',
      description:
        'Tracks exit-intent events in analytics and caps reporting to once per page session to avoid duplicate events.',
      code: `'use client';
import { usePageLeave } from 'vayu-ui';
import { useCallback, useRef } from 'react';

export default function AnalyticsTracker() {
  const hasFired = useRef(false);

  const handleLeave = useCallback(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    // Replace with your analytics SDK call
    console.log('[analytics] exit-intent detected', {
      url: window.location.href,
      timestamp: Date.now(),
    });
  }, []);

  usePageLeave(handleLeave);

  return (
    <p className="text-xs text-muted-content">
      Move your cursor to the top of the browser to trigger the exit-intent event.
    </p>
  );
}`,
      tags: ['analytics', 'tracking', 'session', 'single-fire'],
    },
    {
      title: 'Unsaved Changes Warning Banner',
      description:
        'Shows a sticky warning banner at the top of the page when a user with unsaved form changes moves their cursor toward the tab bar.',
      code: `'use client';
import { usePageLeave } from 'vayu-ui';
import { useState, useCallback } from 'react';

export default function UnsavedChangesWarning() {
  const [hasChanges, setHasChanges] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [draft, setDraft] = useState('');

  const handleLeave = useCallback(() => {
    if (hasChanges) setShowWarning(true);
  }, [hasChanges]);

  usePageLeave(handleLeave);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
    setHasChanges(true);
    setShowWarning(false);
  };

  const handleSave = () => {
    // persist draft…
    setHasChanges(false);
    setShowWarning(false);
  };

  return (
    <div className="relative">
      {showWarning && (
        <div className="sticky top-0 z-40 bg-warning text-warning-content px-4 py-2 text-sm font-medium flex items-center justify-between">
          <span>You have unsaved changes that may be lost if you leave.</span>
          <button onClick={handleSave} className="underline font-semibold ml-4">
            Save now
          </button>
        </div>
      )}
      <textarea
        value={draft}
        onChange={handleChange}
        placeholder="Start typing your content\u2026"
        className="w-full h-40 mt-4 p-3 rounded-surface border bg-surface text-surface-content"
      />
    </div>
  );
}`,
      tags: ['unsaved-changes', 'form', 'warning', 'banner'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Passing an unmemoized inline callback',
      bad: `usePageLeave(() => {
  setShowPopup(true);
});
// The arrow function is recreated every render, causing the effect
// to detach and re-attach the mouseout listener on every render.`,
      good: `const handleLeave = useCallback(() => {
  setShowPopup(true);
}, []);

usePageLeave(handleLeave);`,
      reason:
        'The callback is placed in the useEffect dependency array. An inline arrow function has a new identity each render, triggering cleanup and re-registration of the document event listener on every render — wasting cycles and potentially causing flicker.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isEnabled) {
  usePageLeave(handler);
}`,
      good: `usePageLeave(isEnabled ? handler : () => {});
// Or guard inside the callback:
usePageLeave(() => {
  if (!isEnabled) return;
  handler();
});`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Wrapping usePageLeave in a conditional, loop, or nested function violates the Rules of Hooks and will cause React to throw an error or produce incorrect behavior across re-renders.',
    },
    {
      title: 'Using this hook to prevent navigation',
      bad: `usePageLeave(() => {
  window.onbeforeunload = () => 'Are you sure?';
});
// usePageLeave detects mouse movement, not actual navigation.
// It does not fire on Alt+Left, closing the tab via keyboard, or typing a URL.`,
      good: `// For navigation guards, use useConfirmExit instead:
import { useConfirmExit } from 'vayu-ui';
useConfirmExit(true, 'You have unsaved changes.');

// Reserve usePageLeave for UX enhancements like popups and analytics.`,
      reason:
        'usePageLeave only detects mouse-driven exit gestures (cursor leaving the viewport top). It cannot intercept keyboard navigation (Ctrl+W, Alt+Left), the browser close button, or address bar input. For actual navigation prevention, use useConfirmExit which hooks into the beforeunload event.',
    },
    {
      title: 'Putting expensive synchronous work directly in the callback',
      bad: `usePageLeave(() => {
  // Expensive sync computation blocks the UI
  const data = heavyComputation();
  sendAnalytics(data);
  setShowPopup(true);
});`,
      good: `usePageLeave(() => {
  // Lightweight: set a flag, let React schedule the rest
  setShowPopup(true);

  // Or debounce the expensive work
  requestIdleCallback(() => {
    const data = heavyComputation();
    sendAnalytics(data);
  });
});`,
      reason:
        'The mouseout handler runs synchronously on the main thread. Expensive work inside it blocks the browser\u2019s event loop, causing jank precisely when the user is trying to leave. Keep the callback lightweight — set state or schedule deferred work with requestIdleCallback, setTimeout, or a debounce utility.',
    },
  ],
};
