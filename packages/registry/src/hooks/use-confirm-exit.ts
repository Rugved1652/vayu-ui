import { HookRegistryEntry } from '../types.js';

export const useConfirmExitEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-confirm-exit',
  name: 'useConfirmExit',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Prevents accidental page navigation when the user has unsaved changes by attaching a beforeunload listener that triggers the browser\'s native confirmation dialog.',
  longDescription:
    'Wraps the browser\'s `beforeunload` event into a declarative React hook controlled by a single `enabled` boolean. When enabled, it attaches a `beforeunload` listener that calls `event.preventDefault()` and sets `event.returnValue` to trigger the browser\'s built-in "Leave site?" confirmation dialog. The hook uses a `useRef` to store the current message string, so the prompt text can be updated dynamically without re-registering the event listener (avoiding stale closures and unnecessary attach/detach cycles). The `useCallback` handler is memoized on `enabled`, and `useEffect` gates listener registration behind the enabled flag. SSR-safe: the `window.addEventListener` call only runs inside `useEffect` (client-only), so no `window is not defined` errors during server rendering. Note: modern browsers ignore the custom message text for security reasons — the dialog always shows a generic browser-defined message. The hook still accepts a `message` parameter for backward compatibility and for environments or older browsers that may still display it. This is a side-effect-only hook (returns void) intended to be called unconditionally at the top level of a component.',
  tags: [
    'unsaved-changes',
    'beforeunload',
    'navigation-guard',
    'dirty-form',
    'form-protection',
    'exit-confirm',
    'browser-prompt',
    'data-loss',
    'page-leave',
  ],
  category: 'side-effect',
  useCases: [
    'Prevent users from losing unsaved form data by showing a browser confirmation dialog when they try to close the tab or navigate away',
    'Guard a draft content editor (blog post, email, document) so accidental back-button presses or tab closes don\'t discard work',
    'Protect multi-step wizard or onboarding flows where leaving mid-process would lose partially completed state',
    'Warn before navigating away during long-running operations like file uploads or data exports that should not be interrupted',
    'Conditionally activate the exit guard only when a form is "dirty" (has been modified), and deactivate it after successful save or submission',
    'Combine with a router\'s route-change blocker for single-page applications where `beforeunload` alone does not intercept client-side navigation',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useConfirmExit.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useConfirmExit(options: UseConfirmExitOptions): void',
  returnType: 'void',
  parameters: [
    {
      name: 'options.enabled',
      type: 'boolean',
      required: true,
      description:
        'Controls whether the beforeunload listener is active. Pass `true` when the user has unsaved changes, and `false` after a successful save or when the form is clean. The hook attaches and detaches the listener reactively as this value changes.',
    },
    {
      name: 'options.message',
      type: 'string',
      required: false,
      defaultValue:
        "'You have unsaved changes. Are you sure you want to leave?'",
      description:
        'Custom text to set as `event.returnValue`. Note: modern browsers (Chrome 51+, Firefox 44+) ignore this and display a generic "Leave site?" message for security reasons. The parameter is retained for backward compatibility and older browser support.',
    },
  ],
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Form Exit Guard',
      description:
        'A form component that tracks dirty state and activates the exit confirmation when the user has modified any field.',
      code: `import { useState, useCallback } from 'react';
import { useConfirmExit } from 'vayu-ui';

export default function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (setter: (v: string) => void) =>
    useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setIsDirty(true);
      },
      [setter],
    );

  useConfirmExit({ enabled: isDirty });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ... save logic ...
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={handleChange(setName)}
          className="w-full p-2 border rounded-control bg-surface text-surface-content"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={email}
          onChange={handleChange(setEmail)}
          className="w-full p-2 border rounded-control bg-surface text-surface-content"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-brand text-brand-content rounded-control"
      >
        Save
      </button>
    </form>
  );
}`,
      tags: ['basic', 'form', 'dirty-state', 'exit-guard'],
    },
    {
      title: 'Conditional Activation After First Edit',
      description:
        'Activates the exit guard only after the user has made at least one change to a textarea, and deactivates it on save or reset.',
      code: `import { useState } from 'react';
import { useConfirmExit } from 'vayu-ui';

export default function NoteEditor() {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const isDirty = content !== savedContent;

  useConfirmExit({
    enabled: isDirty,
    message: 'Your note has unsaved changes. Leave anyway?',
  });

  const handleSave = () => {
    setSavedContent(content);
  };

  const handleReset = () => {
    setContent(savedContent);
  };

  return (
    <div className="space-y-3 max-w-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        rows={8}
        className="w-full p-3 border rounded-surface bg-surface text-surface-content resize-y"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className="px-4 py-2 bg-brand text-brand-content rounded-control disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          disabled={!isDirty}
          className="px-4 py-2 border rounded-control disabled:opacity-50"
        >
          Reset
        </button>
        {isDirty && (
          <span className="text-sm text-warning self-center">
            Unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}`,
      tags: ['conditional', 'textarea', 'save', 'reset', 'dirty-check'],
    },
    {
      title: 'Multi-Step Wizard with Exit Protection',
      description:
        'A multi-step form wizard that enables exit protection after the user starts step 2, and disables it once the wizard is completed or cancelled.',
      code: `import { useState } from 'react';
import { useConfirmExit } from 'vayu-ui';

const STEPS = ['Account', 'Profile', 'Confirm'];

export default function SignupWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ username: '', displayName: '', bio: '' });

  const isProtected = step > 0 && !submitted;

  useConfirmExit({
    enabled: isProtected,
    message: 'Your signup progress will be lost.',
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    // ... submit logic ...
    setSubmitted(true);
  };

  return (
    <div className="max-w-md space-y-4">
      {/* Step indicator */}
      <div className="flex gap-2">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={\`flex-1 text-center text-xs py-1 rounded-control \${
              i <= step ? 'bg-brand text-brand-content' : 'bg-muted text-muted-content'
            }\`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
          className="w-full p-2 border rounded-control bg-surface text-surface-content"
        />
      )}
      {step === 1 && (
        <div className="space-y-3">
          <input
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            placeholder="Display name"
            className="w-full p-2 border rounded-control bg-surface text-surface-content"
          />
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Short bio"
            rows={3}
            className="w-full p-2 border rounded-control bg-surface text-surface-content resize-y"
          />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-1 text-sm">
          <p><strong>Username:</strong> {form.username}</p>
          <p><strong>Display name:</strong> {form.displayName}</p>
          <p><strong>Bio:</strong> {form.bio}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {step > 0 && (
          <button onClick={back} className="px-4 py-2 border rounded-control">
            Back
          </button>
        )}
        <div className="ml-auto">
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="px-4 py-2 bg-brand text-brand-content rounded-control">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 bg-success text-white rounded-control">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}`,
      tags: ['wizard', 'multi-step', 'stepper', 'progression', 'complex'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Storing the message in React state instead of letting the hook handle it',
      bad: `const [msg, setMsg] = useState('Are you sure?');
// Passing msg as a prop causes unnecessary listener re-registration
useConfirmExit({ enabled: true, message: msg });`,
      good: `// The hook uses an internal ref — just pass the value directly
useConfirmExit({ enabled: true, message: 'Are you sure?' });
// Or derive it inline — the ref pattern avoids stale closures
useConfirmExit({ enabled: isDirty, message: getWarningText() });`,
      reason:
        'The hook stores the message in a useRef internally, so changing the message does NOT re-register the event listener. Passing a state variable works but is unnecessary — a plain string or derived value is simpler and avoids extra renders.',
    },
    {
      title: 'Enabling the guard unconditionally without a dirty check',
      bad: `function MyForm() {
  useConfirmExit({ enabled: true });
  // User gets prompted even when nothing has changed
}`,
      good: `function MyForm() {
  const [isDirty, setIsDirty] = useState(false);
  useConfirmExit({ enabled: isDirty });
  // Only prompts when the form actually has changes
}`,
      reason:
        'Always guarding with `enabled: true` annoys users by showing the confirmation dialog even when they haven\'t made any changes. Tie `enabled` to a dirty-state flag that flips on when form values differ from their saved originals.',
    },
    {
      title: 'Expecting the custom message to appear in modern browsers',
      bad: `useConfirmExit({
  enabled: true,
  message: 'Click OK to lose all your work!',
});
// User expects to see this exact text in the dialog`,
      good: `useConfirmExit({ enabled: true });
// Accept that Chrome/Firefox/Edge show a generic "Leave site?" dialog.
// Use an in-app modal or router guard if you need a custom prompt UI.`,
      reason:
        'Modern browsers (Chrome 51+, Firefox 44+, Edge 79+) ignore custom `beforeunload` messages for security/anti-phishing reasons. They always show a generic browser-controlled dialog. If you need a fully custom confirmation UI, use a router-level navigation blocker or an in-app modal instead.',
    },
    {
      title: 'Assuming beforeunload catches SPA client-side navigation',
      bad: `// Using Next.js, React Router, or similar SPA framework
useConfirmExit({ enabled: isDirty });
// User clicks a <Link> to another page — no dialog appears!`,
      good: `// For full protection in an SPA, combine both:
useConfirmExit({ enabled: isDirty }); // handles tab close / full page nav

// PLUS a router-level guard, e.g. Next.js:
// useRouter().beforePopState or useBlocker in React Router`,
      reason:
        'The `beforeunload` event only fires for full page unloads (tab close, address bar navigation, hard refresh). Client-side navigation in SPAs (Next.js <Link>, React Router navigation) does NOT trigger `beforeunload`. You need a router-specific guard in addition to this hook for complete protection.',
    },
  ],
};
