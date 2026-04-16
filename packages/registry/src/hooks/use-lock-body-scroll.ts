import { HookRegistryEntry } from '../types.js';

export const useLockBodyScrollEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-lock-body-scroll',
  name: 'useLockBodyScroll',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'React hook that prevents background page scrolling by setting overflow:hidden on the document body, with automatic scrollbar-width compensation and cleanup on unmount.',
  longDescription:
    'Locks the page scroll position by setting document.body.style.overflow to "hidden" inside a useEffect. When a scrollbar is present, the hook measures its width (window.innerWidth minus document.documentElement.clientWidth) and adds an equivalent padding-right to the body. This prevents the visual "jump" or layout shift that occurs when the scrollbar disappears while overflow is hidden. The original overflow and padding-right values are captured before mutation and restored in the effect cleanup, so the page returns to its original state when the component unmounts or the hook is disabled. Pass enabled: false to conditionally skip the lock without unmounting the component. Because the hook accesses document and window, it is client-only — always use it inside components marked with "use client" and avoid calling it during server-side rendering. No external dependencies beyond React are required.',
  tags: [
    'scroll',
    'scroll-lock',
    'overflow',
    'body-scroll',
    'modal',
    'drawer',
    'overlay',
    'layout-shift',
    'scrollbar',
    'side-effect',
  ],
  category: 'side-effect',
  useCases: [
    'Prevent background page scrolling when a modal, dialog, or confirmation overlay is open so users cannot accidentally scroll past the overlay content',
    'Lock body scroll when a mobile drawer, bottom sheet, or slide-out navigation panel is visible to avoid competing scroll contexts',
    'Temporarily disable page scrolling during a full-screen image lightbox or media carousel overlay without manually touching document.body',
    'Conditionally toggle scroll locking on and off based on component state (e.g., isMenuOpen, isSidebarExpanded) without unmounting the component',
    'Prevent visual layout jumps caused by disappearing scrollbars when an overlay appears, by automatically compensating for the scrollbar width',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useLockBodyScroll.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useLockBodyScroll(enabled?: boolean): void',
  returnType: 'void',
  parameters: [
    {
      name: 'enabled',
      type: 'boolean',
      required: false,
      description:
        'Controls whether scroll locking is active. When true (the default), the hook sets overflow:hidden on the body and compensates for scrollbar width. When false, the hook performs no DOM mutations, making it safe to keep the hook mounted while conditionally toggling the lock.',
      defaultValue: 'true',
    },
  ],
  returnValues: [],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Modal with Scroll Lock',
      description:
        'A modal component that locks body scroll as soon as it mounts and restores it on unmount. No parameters are needed — the lock is active by default.',
      code: `'use client';

import { useLockBodyScroll } from 'vayu-ui';
import { useState } from 'react';

function Modal({ onClose }: { onClose: () => void }) {
  useLockBodyScroll();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface text-surface-content rounded-surface shadow-elevated max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
        <p className="text-sm text-muted-content mb-4">
          Background scrolling is locked while this modal is open.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-control bg-brand text-brand-content hover:opacity-90 transition-opacity"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function BasicModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-control bg-brand text-brand-content"
      >
        Open Modal
      </button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  );
}`,
      tags: ['modal', 'dialog', 'basic', 'overlay'],
    },
    {
      title: 'Conditional Scroll Lock with Toggle',
      description:
        'Demonstrates using the enabled parameter to toggle scroll locking on and off without unmounting the hook. Useful when a parent component controls the lock state.',
      code: `'use client';

import { useLockBodyScroll } from 'vayu-ui';
import { useState } from 'react';

export default function ConditionalScrollLock() {
  const [locked, setLocked] = useState(false);
  useLockBodyScroll(locked);

  return (
    <div className="p-6 rounded-surface border bg-surface text-surface-content space-y-4 max-w-sm">
      <h3 className="text-lg font-semibold">Scroll Lock Toggle</h3>
      <p className="text-sm text-muted-content">
        {locked
          ? 'Page scroll is locked. You cannot scroll the background.'
          : 'Page scroll is unlocked. Scroll freely.'}
      </p>
      <button
        onClick={() => setLocked((prev) => !prev)}
        className={\`px-4 py-2 rounded-control font-medium transition-colors \${
          locked
            ? 'bg-destructive text-destructive-content'
            : 'bg-brand text-brand-content'
        }\`}
      >
        {locked ? 'Unlock Scroll' : 'Lock Scroll'}
      </button>
    </div>
  );
}`,
      tags: ['toggle', 'conditional', 'enabled', 'control'],
    },
    {
      title: 'Drawer / Bottom Sheet',
      description:
        'A slide-in drawer component that locks background scrolling when visible and unlocks it when the user closes the drawer. The enabled parameter is driven by the isOpen prop.',
      code: `'use client';

import { useLockBodyScroll } from 'vayu-ui';
import { useState } from 'react';

function Drawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useLockBodyScroll(isOpen);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <aside className="relative w-80 h-full bg-surface text-surface-content shadow-elevated p-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="mb-4 text-sm text-muted-content hover:text-surface-content transition-colors"
            >
              Close &times;
            </button>
            {children}
          </aside>
        </div>
      )}
    </>
  );
}

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-control bg-brand text-brand-content"
      >
        Open Drawer
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold mb-2">Drawer Content</h2>
        <p className="text-sm text-muted-content">
          Background scroll is locked while this drawer is open.
        </p>
      </Drawer>
    </div>
  );
}`,
      tags: ['drawer', 'bottom-sheet', 'sidebar', 'slide-in'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using during server-side rendering',
      bad: `// Inside a server component or during SSR
useLockBodyScroll();
// ReferenceError: document is not defined`,
      good: `'use client';
import { useLockBodyScroll } from 'vayu-ui';

function ClientModal() {
  useLockBodyScroll();
  return <div>Modal content</div>;
}`,
      reason:
        'The hook accesses document.body.style and window.innerWidth, which do not exist on the server. Always use it inside client components marked with "use client". During SSR the hook will throw because document and window are undefined.',
    },
    {
      title: 'Manually setting body overflow alongside the hook',
      bad: `useLockBodyScroll();
document.body.style.overflow = 'auto'; // Conflicts with the hook`,
      good: `useLockBodyScroll();
// Let the hook manage overflow — it restores the original value on cleanup`,
      reason:
        'The hook captures the original overflow value before modifying it and restores that value on cleanup. If you also set overflow externally, the hook saves your external value as "original" and will restore it on cleanup, potentially leaving the body in an unexpected state.',
    },
    {
      title: 'Nesting multiple scroll-locked overlays without coordination',
      bad: `function OuterOverlay() {
  useLockBodyScroll();
  return <div><InnerOverlay /></div>;
}
function InnerOverlay() {
  useLockBodyScroll(); // Second lock — cleanup order causes issues
  return <div>Inner</div>;
}`,
      good: `function OuterOverlay() {
  const [showInner, setShowInner] = useState(false);
  useLockBodyScroll(!showInner); // Disable outer lock when inner takes over
  return (
    <div>
      {showInner ? <InnerOverlay /> : <InnerContent onOpen={() => setShowInner(true)} />}
    </div>
  );
}
function InnerOverlay() {
  useLockBodyScroll();
  return <div>Inner</div>;
}`,
      reason:
        'Each useLockBodyScroll instance independently saves and restores overflow. When multiple instances run simultaneously, the cleanup of the inner hook restores the "hidden" value set by the outer hook, and the outer cleanup then restores the original. This can cause brief scroll-enabled states during transitions. Coordinate by disabling parent locks when children take over.',
    },
    {
      title: 'Not unmounting the component that calls the hook',
      bad: `function Modal() {
  useLockBodyScroll();
  return <div>Modal</div>;
}
// Usage: just hiding with CSS
{showModal ? <Modal /> : null}
// vs accidentally keeping it mounted but hidden
<div style={{ display: showModal ? 'block' : 'none' }}>
  <Modal />
</div>`,
      good: `{showModal && <Modal />}`,
      reason:
        'The hook only restores body styles in its cleanup function, which runs when the component unmounts. If you hide the modal with CSS instead of unmounting it, the cleanup never runs and the body stays locked indefinitely. Always conditionally render (unmount) the component that calls the hook.',
    },
  ],
};
