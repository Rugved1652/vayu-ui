import { ComponentRegistryEntry } from '../types.js';

export const affixEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'affix',
  name: 'Affix',
  type: 'component',
  category: 'layout',

  // ── Description ───────────────────────────────────────
  description:
    'Pins content to the viewport or a scroll container when scrolling past it.',
  longDescription:
    'The Affix component monitors scroll position and switches its child to fixed or absolute positioning once a scroll threshold is reached. It supports top and bottom placement, custom scroll containers via the target prop, and fires an onAffixed callback on state transitions. A hidden placeholder preserves layout flow when the element becomes affixed.',
  tags: [
    'affix',
    'sticky',
    'fixed',
    'pin',
    'scroll',
    'navigation',
    'toolbar',
    'positioning',
    'viewport',
  ],
  useCases: [
    'Sticky navigation bars that remain visible while the user scrolls',
    'Floating action bars pinned to the bottom of the viewport for save/submit actions',
    'Table headers that stay in view inside scrollable data containers',
    'Cookie consent or notification banners anchored to the bottom edge',
    'Sidebar headers that remain accessible during long-page scrolling',
    'Promotional banners that stick to the top with a custom offset',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Affix',
  files: [
    { name: 'Affix.tsx', description: 'Root component with ref management, placeholder, and scroll-based positioning logic' },
    { name: 'hooks.ts', description: 'useAffixMeasure and useAffixScroll hooks for scroll/resize detection and position calculation' },
    { name: 'types.ts', description: 'AffixPosition and AffixProps type definitions' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the component and types' },
    { name: 'README.md', description: 'Component anatomy and use-case reference', optional: true },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Affix',
  subComponents: [],
  hooks: ['useAffixMeasure', 'useAffixScroll'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'offset',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Distance in pixels from the viewport or container edge when affixed',
    },
    {
      name: 'position',
      type: 'AffixPosition',
      required: false,
      defaultValue: "'top'",
      description: 'Which edge to pin the content to when affixed',
      options: ['top', 'bottom'],
    },
    {
      name: 'target',
      type: 'HTMLElement | null',
      required: false,
      defaultValue: 'null',
      description: 'Custom scroll container element. Defaults to window when null',
    },
    {
      name: 'zIndex',
      type: 'number',
      required: false,
      defaultValue: '100',
      description: 'Stack order (z-index) applied when the element is affixed',
    },
    {
      name: 'onAffixed',
      type: '(affixed: boolean) => void',
      required: false,
      description: 'Callback fired when the affixed state changes',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content to be affixed when the scroll threshold is reached',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'affixed',
      prop: 'isAffixed (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the element is currently pinned. Managed internally via scroll position measurement. Reflects in the data-affixed attribute and triggers onAffixed callback.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onAffixed',
      signature: '(affixed: boolean) => void',
      description: 'Fires when the element transitions between static and affixed positioning. Receives true when affixed, false when returning to static flow.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-hidden',
        description: 'Applied to the placeholder element (always "true") to prevent screen readers from announcing the invisible layout spacer.',
        managedByComponent: true,
      },
      {
        name: 'data-affixed',
        description: 'Set on the affixed element when it is pinned. Useful for CSS hooks and test assertions. Not an ARIA attribute but aids accessibility testing.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [],
    focusManagement:
      'Focus is not affected by affix state changes. Interactive children (buttons, links) remain focusable in both static and affixed states.',
    wcagLevel: 'AA',
    notes:
      'The Affix renders a plain <div> with no inherent role. Developers should pass role and aria-label props for semantic context (e.g. role="navigation" for sticky nav bars). The placeholder is hidden from the accessibility tree via aria-hidden="true".',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'tailwind-merge' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'navbar',
      reason: 'Sticky navigation is the most common use case — NavBar content wrapped in Affix for persistent visibility',
    },
    {
      slug: 'button',
      reason: 'Frequently used inside bottom-affixed action bars for save, submit, or confirm actions',
    },
    {
      slug: 'card',
      reason: 'Card headers or toolbars inside scrollable containers often use Affix to stay visible',
    },
    {
      slug: 'typography',
      reason: 'Used alongside Affix for labels, status text, and descriptive content within pinned bars',
    },
    {
      slug: 'divider',
      reason: 'Separates affixed sections from main content below or above them',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Top Affix with Offset',
      description: 'Pins a navigation bar to the top of the viewport with a 20px offset and tracks affixed state via onAffixed callback.',
      code: `import { Affix } from 'vayu-ui';
import { useState } from 'react';

export default function TopAffix() {
  const [isAffixed, setIsAffixed] = useState(false);

  return (
    <Affix
      offset={20}
      zIndex={50}
      role="navigation"
      aria-label="Sticky Top Navigation"
      onAffixed={(affixed) => setIsAffixed(affixed)}
    >
      <div className="bg-brand text-brand-content p-4 rounded-control shadow-elevated flex justify-between items-center">
        <span className="font-bold">Top Sticky Bar</span>
        <span className="text-xs bg-brand/80 px-2 py-1 rounded-control">
          Status: {isAffixed ? 'Affixed' : 'Static'}
        </span>
      </div>
    </Affix>
  );
}`,
      tags: ['top', 'offset', 'callback', 'navigation'],
    },
    {
      title: 'Bottom Affix',
      description: 'An action bar pinned to the bottom of the viewport, useful for cookie consents or save/submit workflows.',
      code: `import { Affix } from 'vayu-ui';

export default function BottomAffix() {
  return (
    <Affix position="bottom" offset={0} zIndex={40}>
      <div className="bg-elevated text-elevated-content p-4 rounded-control shadow-elevated flex justify-between items-center">
        <span className="font-bold">Bottom Action Bar</span>
        <button className="bg-success text-success-content px-4 py-2 rounded-control text-sm font-medium">
          Save Changes
        </button>
      </div>
    </Affix>
  );
}`,
      tags: ['bottom', 'action-bar', 'viewport'],
    },
    {
      title: 'Custom Target Container',
      description: 'Scopes the affix behavior to a specific scrollable element instead of the window. The bar sticks within the container boundaries.',
      code: `import { Affix } from 'vayu-ui';
import { useState } from 'react';

export default function CustomTargetAffix() {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  return (
    <div
      ref={(node) => setScrollContainer(node)}
      className="h-100 overflow-auto border-2 border-border rounded-surface relative"
    >
      <div className="p-4">
        <div className="text-center text-muted-content mb-4">
          Start scrolling down inside this box...
        </div>

        <div style={{ height: 400 }} />
        <div style={{ height: 400 }} />

        <Affix target={scrollContainer} position="bottom" offset={10}>
          <div className="bg-warning text-warning-content p-3 rounded-control shadow-elevated text-center font-medium">
            Scoped to this container
          </div>
        </Affix>

        <div style={{ height: 600 }} />
      </div>
    </div>
  );
}`,
      tags: ['custom-target', 'container', 'scoped', 'scroll'],
    },
    {
      title: 'Custom Styled Affix',
      description: 'Demonstrates passing className and style props, plus aria attributes for screen reader accessibility.',
      code: `import { Affix } from 'vayu-ui';

export default function StyledAffix() {
  return (
    <Affix
      offset={80}
      className="bg-linear-to-r from-brand to-info"
      style={{ borderRadius: '9999px' }}
      role="region"
      aria-label="Special Offer Banner"
    >
      <div className="p-4 text-brand-content text-center font-bold shadow-elevated">
        Custom Styled Banner (Rounded via style prop!)
      </div>
    </Affix>
  );
}`,
      tags: ['styled', 'custom-class', 'accessibility', 'banner'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Forgetting role and aria-label',
      bad: '<Affix offset={20}><nav>Navigation</nav></Affix>',
      good: '<Affix offset={20} role="navigation" aria-label="Main navigation"><nav>Navigation</nav></Affix>',
      reason: "Affix renders a plain div with no semantic role. Without explicit role and aria-label, screen readers cannot identify the pinned content's purpose.",
    },
    {
      title: 'Passing target as a CSS selector string',
      bad: '<Affix target="#scroll-box" position="bottom">...</Affix>',
      good: '<Affix target={document.getElementById("scroll-box")} position="bottom">...</Affix>',
      reason: 'The target prop expects an HTMLElement reference or null, not a CSS selector string. Use a ref or querySelector to pass the actual DOM element.',
    },
    {
      title: 'Using Affix without sufficient scroll content',
      bad: '<Affix offset={0}><div>Pinned</div></Affix><div style={{ height: 50 }} />',
      good: '<Affix offset={0}><div>Pinned</div></Affix><div style={{ height: 800 }} />',
      reason: 'If the page or container has no scrollable overflow, Affix will never trigger and the component adds unnecessary overhead. Only use Affix when there is enough content to scroll past the element.',
    },
    {
      title: 'Overriding position style without understanding affix logic',
      bad: '<Affix style={{ position: "absolute", top: 0 }}>...</Affix>',
      good: '<Affix offset={0}>...</Affix>',
      reason: 'Affix dynamically manages position, top, bottom, left, width, and zIndex in its inline styles. Overriding these via the style prop will conflict with the affix positioning logic.',
    },
    {
      title: 'Nesting Affix components',
      bad: '<Affix position="top"><Affix position="bottom">...</Affix></Affix>',
      good: 'Place each Affix as a sibling at the same level in the DOM tree.',
      reason: 'Nested Affix components create conflicting scroll listeners and layout placeholder interactions. Each Affix should be an independent sibling element.',
    },
  ],
};
