import { HookRegistryEntry } from '../types.js';

export const useHoverEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-hover',
  name: 'useHover',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Reactive hook that tracks whether a DOM element is being hovered, returning a ref to attach and a boolean isHovered state.',
  longDescription:
    'Wraps native mouseenter/mouseleave events into a React-friendly hook that returns a typed ref and an isHovered boolean. Attach the ref to any HTML element and the hook automatically subscribes to mouse events via useEffect, cleaning up on unmount. The generic parameter T extends HTMLElement lets you narrow the ref type (e.g. useHover<HTMLButtonElement>()), enabling type-safe access to element-specific properties. The hook is client-only (use client directive) and handles null refs gracefully — it is safe to call during SSR since the ref will be null on the server and no event listeners are attached until the client hydrates. No external dependencies beyond React are required.',
  tags: [
    'hover',
    'mouse',
    'mouseenter',
    'mouseleave',
    'dom',
    'ref',
    'interaction',
    'ui-feedback',
    'tooltip-trigger',
    'pointer',
  ],
  category: 'dom',
  useCases: [
    'Toggle a tooltip, popover, or dropdown when the user hovers over a trigger element without managing manual onMouseEnter/onMouseLeave handlers',
    'Apply conditional styles or CSS classes to an element on hover using a boolean flag instead of CSS :hover, useful for animations or Tailwind dynamic classes',
    'Show a preview card or additional information when the user hovers over a list item, card, or avatar',
    'Build a custom hover-triggered menu or navigation submenu that appears on mouse-over and hides on mouse-leave',
    'Create an image gallery where hovering over a thumbnail reveals a larger preview or overlay with details',
    'Highlight table rows or grid items on hover for improved scanability in data-dense UIs',
    'Detect hover state to lazily load or prefetch content (e.g. a dropdown menu items) only when the user shows intent by hovering',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useHover.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useHover<T extends HTMLElement>(): { ref: React.RefObject<T | null>; isHovered: boolean }',
  typeParams: ['T extends HTMLElement'],
  parameters: [],
  returnType: '{ ref: React.RefObject<T | null>; isHovered: boolean }',
  returnValues: [
    {
      name: 'ref',
      type: 'React.RefObject<T | null>',
      description:
        'A React ref object to attach to the target element via the ref prop. The generic T defaults to HTMLElement but can be narrowed (e.g. HTMLDivElement, HTMLButtonElement) for type-safe element access. Initially null until the component mounts.',
    },
    {
      name: 'isHovered',
      type: 'boolean',
      description:
        'Whether the element is currently being hovered by the pointer. Starts as false and updates to true on mouseenter, false on mouseleave. Safe to use in render logic for conditional styling or rendering.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Hover-Activated Tooltip',
      description:
        'A simple component that shows a tooltip message when the user hovers over a button, using the useHover hook to control visibility.',
      code: `import { useHover } from 'vayu-ui';

export default function HoverTooltip() {
  const { ref, isHovered } = useHover<HTMLButtonElement>();

  return (
    <div className="relative inline-block">
      <button
        ref={ref}
        className="px-4 py-2 bg-brand text-brand-content rounded-control shadow-control"
      >
        Hover me
      </button>
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-sm bg-elevated text-elevated-content rounded-surface shadow-elevated whitespace-nowrap">
          This is a tooltip!
        </div>
      )}
    </div>
  );
}`,
      tags: ['tooltip', 'basic', 'hover', 'visibility'],
    },
    {
      title: 'Dynamic Card Highlight',
      description:
        'A card component that changes its shadow and border when hovered, using isHovered to toggle Tailwind classes for a smooth transition effect.',
      code: `import { useHover } from 'vayu-ui';

export default function HoverableCard() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={\`p-6 rounded-surface border bg-surface text-surface-content transition-all duration-200 \${
        isHovered
          ? 'shadow-elevated border-brand/50 scale-[1.02]'
          : 'shadow-surface border-border'
      }\`}
    >
      <h3 className="text-lg font-semibold">Feature Card</h3>
      <p className="mt-2 text-sm text-muted">
        This card responds to hover with a smooth shadow and scale transition
        driven by the useHover hook.
      </p>
    </div>
  );
}`,
      tags: ['card', 'highlight', 'animation', 'tailwind', 'transition'],
    },
    {
      title: 'Hover-Reveal Image Overlay',
      description:
        'An image thumbnail that reveals a dark overlay with action buttons when hovered, common in gallery or media grid layouts.',
      code: `import { useHover } from 'vayu-ui';

export default function ImageCard({ src, alt }: { src: string; alt: string }) {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div ref={ref} className="relative rounded-surface overflow-hidden cursor-pointer group">
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
      <div
        className={\`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-200 \${
          isHovered ? 'opacity-100' : 'opacity-0'
        }\`}
      >
        <button className="px-3 py-1.5 text-sm bg-white text-black rounded-control">
          View
        </button>
        <button className="px-3 py-1.5 text-sm bg-white text-black rounded-control">
          Download
        </button>
      </div>
    </div>
  );
}`,
      tags: ['image', 'overlay', 'gallery', 'reveal', 'media'],
    },
    {
      title: 'Lazy-Load Dropdown on Hover',
      description:
        'A navigation item that prefetches and displays a dropdown menu only when hovered, reducing initial render cost for complex menus.',
      code: `import { useHover } from 'vayu-ui';
import { useState } from 'react';

export default function HoverNavDropdown({ label }: { label: string }) {
  const { ref, isHovered } = useHover<HTMLDivElement>();
  const [loaded, setLoaded] = useState(false);

  // Simulate lazy loading dropdown content on first hover
  if (isHovered && !loaded) {
    setLoaded(true);
  }

  return (
    <div ref={ref} className="relative">
      <button className="px-3 py-2 text-sm font-medium hover:text-brand transition-colors">
        {label}
      </button>
      {isHovered && loaded && (
        <div className="absolute top-full left-0 mt-1 w-56 p-2 bg-elevated text-elevated-content rounded-surface shadow-elevated border z-50">
          {['Dashboard', 'Settings', 'Profile', 'Logout'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 text-sm rounded-control hover:bg-surface transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`,
      tags: ['dropdown', 'navigation', 'lazy-load', 'menu', 'prefetch'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Detaching the ref from the element',
      bad: `const { ref, isHovered } = useHover();
return (
  <div>
    <button>I have no ref</button>
    {isHovered && <Tooltip />}
  </div>
);`,
      good: `const { ref, isHovered } = useHover();
return (
  <div>
    <button ref={ref}>Hover me</button>
    {isHovered && <Tooltip />}
  </div>
);`,
      reason:
        'The hook tracks hover state via event listeners attached to the ref element. If you do not pass ref to a DOM element, the ref stays null, no listeners are registered, and isHovered will never become true.',
    },
    {
      title: 'Using CSS :hover instead when dynamic JS logic is needed',
      bad: `const [showDetails, setShowDetails] = useState(false);
return (
  <div
    onMouseEnter={() => setShowDetails(true)}
    onMouseLeave={() => setShowDetails(false)}
    className="group"
  >
    <div className="hidden group-hover:block">{details}</div>
  </div>
);`,
      good: `const { ref, isHovered } = useHover();
return (
  <div ref={ref}>
    {isHovered && <div>{details}</div>}
  </div>
);`,
      reason:
        'CSS :hover cannot trigger JavaScript logic like data fetching, analytics events, or state updates. When you need hover state in JS, use the hook instead of pairing onMouseEnter/onMouseLeave with CSS classes — it reduces boilerplate and avoids state sync issues.',
    },
    {
      title: 'Manually adding onMouseEnter/onMouseLeave alongside the hook',
      bad: `const { ref, isHovered } = useHover();
return (
  <div
    ref={ref}
    onMouseEnter={() => setCustomState(true)}
    onMouseLeave={() => setCustomState(false)}
  >
    {isHovered && <Tooltip />}
  </div>
);`,
      good: `const { ref, isHovered } = useHover();
return (
  <div ref={ref}>
    {isHovered && <Tooltip />}
  </div>
);`,
      reason:
        'The hook already manages mouseenter/mouseleave listeners. Adding duplicate handlers creates redundant state tracking and can cause subtle bugs if the timing of the two mechanisms diverges. Use the isHovered value directly instead.',
    },
    {
      title: 'Conditionally rendering the element that holds the ref',
      bad: `const { ref, isHovered } = useHover();
return (
  <div>
    {someCondition && <div ref={ref}>Hover me</div>}
    {isHovered && <Tooltip />}
  </div>
);`,
      good: `const { ref, isHovered } = useHover();
if (!someCondition) return null;
return (
  <div>
    <div ref={ref}>Hover me</div>
    {isHovered && <Tooltip />}
  </div>
);`,
      reason:
        'If the element with the ref is conditionally removed from the DOM, the hook will try to attach listeners to a null ref on mount and may not re-attach when the element reappears (because useEffect only runs once with an empty dependency array). Ensure the ref element is always rendered when the hook is active.',
    },
    {
      title: 'Sharing one hook instance across multiple elements',
      bad: `const { ref: ref1, isHovered: h1 } = useHover();
const { ref: ref2, isHovered: h2 } = useHover();
// This is actually correct — the mistake is below:
const { ref, isHovered } = useHover();
return (
  <div>
    <div ref={ref}>Item 1</div>
    <div ref={ref}>Item 2</div>
  </div>
);`,
      good: `const { ref: ref1, isHovered: h1 } = useHover();
const { ref: ref2, isHovered: h2 } = useHover();
return (
  <div>
    <div ref={ref1}>Item 1 {h1 && '(hovered)'}</div>
    <div ref={ref2}>Item 2 {h2 && '(hovered)'}</div>
  </div>
);`,
      reason:
        'A single ref can only point to one DOM element at a time. Assigning the same ref to multiple elements means only the last one receives the event listeners. Call useHover separately for each element that needs independent hover tracking.',
    },
  ],
};
