import { ComponentRegistryEntry } from '../types.js';

export const hoverCardEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'hover-card',
  name: 'HoverCard',
  type: 'component',
  category: 'overlay',

  // ── Description ───────────────────────────────────────
  description:
    'A portal-based hover card component that displays rich content on hover or focus, with four placement sides, three alignment options, configurable open/close delays, auto-flipping when near viewport edges, directional arrows, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The HoverCard component renders a floating portal element positioned relative to a trigger. It supports four placement sides (top, bottom, left, right) with three alignment options (start, center, end) and automatic viewport-edge flipping when there is insufficient space. Open and close delays are independently configurable to allow the cursor to travel between trigger and card. A directional arrow is rendered via a rotated square div. The card body is hoverable — the close delay keeps it visible while the cursor moves into it. Content resizing is handled via a ResizeObserver for dynamic children. The component uses React portals for z-index layering, double requestAnimationFrame for flicker-free positioning, and scroll/resize listeners for continuous alignment. Body scroll is locked while the card is open.',
  tags: [
    'hovercard',
    'overlay',
    'popover',
    'hover',
    'focus',
    'profile',
    'card',
    'portal',
    'positioning',
    'a11y',
    'wcag',
    'tooltip',
  ],
  useCases: [
    'Display user profile cards with avatar, bio, and metadata when hovering over a username or avatar',
    'Show contextual information or previews alongside triggers without requiring navigation',
    'Present contact details, social links, or action buttons in a compact hover panel',
    'Surface rich content (images, metadata, descriptions) for items in lists, tables, or grids',
    'Provide quick-access detail views for data-display elements like badges, tags, or abbreviations',
    'Preview link destinations or document summaries on hover before committing to a click',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'HoverCard',
  files: [
    { name: 'HoverCard.tsx', description: 'ForwardRef component with portal rendering, positioning, open/close timing, and arrow rendering' },
    { name: 'HoverCardArrow.tsx', description: 'Presentational directional arrow sub-component using a rotated square div' },
    { name: 'types.ts', description: 'TypeScript interfaces for HoverCardProps, HoverCardSide, HoverCardAlign, and arrow border helpers' },
    { name: 'hooks.ts', description: 'Custom hooks: useHoverCardOpen (delayed open/close with Escape dismiss) and useHoverCardPosition (viewport-aware positioning with auto-flip)' },
    { name: 'index.ts', description: 'Barrel export file re-exporting HoverCard and all type definitions' },
    { name: 'README.md', description: 'Component anatomy and use-case documentation' },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'HoverCard',
  subComponents: [
    {
      name: 'HoverCardArrow',
      fileName: 'HoverCardArrow.tsx',
      description: 'Internal directional arrow rendered at the edge of the hover card pointing toward the trigger; not exported publicly',
      props: [
        {
          name: 'side',
          type: "HoverCardSide",
          required: true,
          description: 'The current side the card is rendered on, used to determine which borders to hide on the rotated square',
        },
        {
          name: 'position',
          type: '{ top: number; left: number }',
          required: true,
          description: 'Absolute pixel offset of the arrow within the card container',
        },
      ],
    },
  ],
  hooks: ['useHoverCardOpen', 'useHoverCardPosition'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The trigger element that shows the hover card on hover or focus',
    },
    {
      name: 'content',
      type: 'React.ReactNode',
      required: true,
      description: 'Card content — can be any JSX rendered inside the hover card portal',
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      defaultValue: "'bottom'",
      description: 'Preferred side of the trigger to place the hover card; auto-flips if insufficient viewport space',
      options: ['top', 'right', 'bottom', 'left'],
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      required: false,
      defaultValue: "'center'",
      description: 'Alignment of the hover card along the trigger edge',
      options: ['start', 'center', 'end'],
    },
    {
      name: 'sideOffset',
      type: 'number',
      required: false,
      defaultValue: '8',
      description: 'Gap in pixels between the trigger and the hover card',
    },
    {
      name: 'alignOffset',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Additional pixel shift along the alignment axis',
    },
    {
      name: 'openDelay',
      type: 'number',
      required: false,
      defaultValue: '200',
      description: 'Delay in milliseconds before the hover card appears after the trigger is hovered or focused',
    },
    {
      name: 'closeDelay',
      type: 'number',
      required: false,
      defaultValue: '300',
      description: 'Delay in milliseconds before the hover card disappears after the cursor leaves the trigger or card',
    },
    {
      name: 'contentClassName',
      type: 'string',
      required: false,
      description: 'Additional CSS class name applied to the hover card portal container',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, the hover card will not appear on hover or focus',
    },
    {
      name: 'showArrow',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to render a directional arrow pointing from the hover card to the trigger',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // HoverCard has no variant or size props

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'isOpen (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'The hover card portal is mounted and positioned; controlled internally by hover/focus timeouts',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Hover card is completely suppressed — no portal renders on hover or focus',
    },
    {
      name: 'mounted',
      prop: 'mounted (internal)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Client-side hydration flag; portal only renders after mount to avoid SSR mismatches',
    },
    {
      name: 'flipped',
      prop: 'currentSide (internal)',
      isBoolean: false,
      defaultValue: "'bottom'",
      description: 'When the preferred side lacks viewport space, the card auto-flips to the opposite side',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onMouseEnter',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires on the trigger wrapper and card content; starts the open delay timer',
    },
    {
      name: 'onMouseLeave',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fires on the trigger wrapper and card content; starts the close delay timer',
    },
    {
      name: 'onFocus',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fires when the trigger receives keyboard focus; starts the open delay timer',
    },
    {
      name: 'onBlur',
      signature: '(event: React.FocusEvent<HTMLDivElement>) => void',
      description: 'Fires when the trigger loses focus; starts the close delay timer',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-haspopup',
        description: 'Applied to the trigger element with value "true" to indicate it has an associated popup',
        managedByComponent: true,
      },
      {
        name: 'aria-expanded',
        description: 'Applied to the trigger element; dynamically set to true when the hover card is visible and false when hidden',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby',
        description: 'Applied to the trigger when the card is visible; references the portal element by auto-generated ID to associate the content with the trigger',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to the directional arrow div to hide the decorative element from the accessibility tree',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Focuses the trigger element, which initiates the open delay and displays the hover card',
      },
      {
        key: 'Shift+Tab',
        behavior: 'Moves focus away from the trigger, which initiates the close delay and dismisses the hover card',
      },
      {
        key: 'Escape',
        behavior: 'Immediately dismisses the visible hover card regardless of close delay',
      },
    ],
    focusManagement:
      'The trigger element is focusable via keyboard Tab navigation. onFocus triggers the open timer; onBlur triggers the close timer. The card body is mouse-interactive (onMouseEnter/onMouseLeave) to allow hover persistence while the cursor moves into the card content.',
    wcagLevel: 'AA',
    notes:
      'Implements WCAG 2.5.7 (Dragging Movements) by making the card body hoverable with a configurable close delay (default 300ms). The trigger uses aria-haspopup, aria-expanded, and aria-describedby to create the required programmatic association with the card content. The decorative arrow is hidden with aria-hidden="true". Body scroll is locked while the card is open to prevent disorientation.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'avatar',
      reason: 'Avatars are common triggers for HoverCards showing user profile details on hover',
    },
    {
      slug: 'button',
      reason: 'Buttons are the most common trigger element for HoverCards, especially for link previews or action menus',
    },
    {
      slug: 'badge',
      reason: 'Badges with abbreviated text benefit from HoverCards showing expanded information on hover',
    },
    {
      slug: 'card',
      reason: 'Cards share a similar content-rich display pattern and are often used alongside HoverCards for detail views',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltip is a lighter alternative for simple text hints when rich content is not needed',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic profile card',
      description: 'A user profile hover card with avatar, name, handle, bio, and metadata displayed on hover.',
      code: `import { HoverCard } from 'vayu-ui';
import { CalendarDays, MapPin } from 'lucide-react';

export default function BasicHoverCard() {
  return (
    <HoverCard
      content={
        <div className="w-64 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
              VU
            </div>
            <div>
              <p className="font-semibold text-sm">Ved UI</p>
              <p className="text-xs text-neutral-500">@vayuui</p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            A modern React component library with WCAG 2.2 AA compliance, compound patterns, and
            premium design.
          </p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" aria-hidden="true" />
              Joined Feb 2026
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              Open Source
            </span>
          </div>
        </div>
      }
    >
      <button className="text-sm font-secondary text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
        @vayuui
      </button>
    </HoverCard>
  );
}`,
      tags: ['basic', 'profile', 'avatar', 'metadata'],
    },
    {
      title: 'Placement sides',
      description: 'Four directional placements (top, bottom, left, right) around trigger buttons.',
      code: `import { HoverCard } from 'vayu-ui';

export default function SidesHoverCard() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {(['top', 'bottom', 'left', 'right'] as const).map((s) => (
        <HoverCard
          key={s}
          side={s}
          content={
            <p className="text-xs w-40">
              This card appears on the <strong>{s}</strong> side.
            </p>
          }
        >
          <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors capitalize">
            {s}
          </button>
        </HoverCard>
      ))}
    </div>
  );
}`,
      tags: ['sides', 'placement', 'top', 'bottom', 'left', 'right'],
    },
    {
      title: 'Rich content',
      description: 'A contact info hover card with icons, links, and an interactive action button inside the card.',
      code: `import { HoverCard } from 'vayu-ui';
import { Mail, ExternalLink } from 'lucide-react';

export default function RichHoverCard() {
  return (
    <HoverCard
      side="right"
      content={
        <div className="w-56 space-y-3">
          <p className="text-sm font-semibold">Contact Info</p>
          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <p className="flex items-center gap-2">
              <Mail className="w-3 h-3 shrink-0" aria-hidden="true" />
              hello@vayuui.dev
            </p>
            <p className="flex items-center gap-2">
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
              vayu-ui.dev
            </p>
          </div>
          <button className="w-full px-3 py-1.5 text-xs font-secondary bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            Send Message
          </button>
        </div>
      }
    >
      <button className="px-4 py-2 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
        Hover for contact
      </button>
    </HoverCard>
  );
}`,
      tags: ['rich-content', 'interactive', 'icons', 'action-button'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Putting critical information only in a hover card',
      bad: '<HoverCard content="Deleting this item is permanent"><Button variant="destructive">Delete</Button></HoverCard>',
      good: '<Button variant="destructive" onClick={openConfirmDialog}>Delete</Button> with a confirmation Modal showing the warning',
      reason: 'Hover cards are supplementary — they disappear on mouse leave, Escape, or scroll. Critical actions, warnings, or required instructions must be persistently visible, not hidden behind a hover interaction.',
    },
    {
      title: 'Setting closeDelay to 0',
      bad: '<HoverCard content={...} closeDelay={0}>...</HoverCard>',
      good: '<HoverCard content={...} closeDelay={300}>...</HoverCard>',
      reason: 'A zero close delay makes the card disappear the instant the cursor leaves the trigger, violating WCAG 2.5.7. Users need time to move their cursor into the card body to interact with its content. Use at least 150–300ms.',
    },
    {
      title: 'Wrapping non-interactive elements without ensuring focusability',
      bad: '<HoverCard content="Detail"><span>Some text</span></HoverCard>',
      good: '<HoverCard content="Detail"><button type="button" className="...">Some text</button></HoverCard>',
      reason: 'The trigger uses onFocus/onBlur to show/hide the card. Plain <span> elements are not keyboard-focusable by default, so the hover card will be invisible to keyboard and assistive technology users.',
    },
    {
      title: 'Using HoverCard instead of Tooltip for simple text labels',
      bad: '<HoverCard content="Save changes"><Button>Save</Button></HoverCard>',
      good: '<Tooltip content="Save changes"><Button><Icon /></Button></Tooltip>',
      reason: 'HoverCard is designed for rich content (profiles, contact info, previews). For simple one-line text hints, use the lighter Tooltip component which has the proper role="tooltip" ARIA semantics.',
    },
    {
      title: 'Relying on interactive content inside the card for primary actions',
      bad: '<HoverCard content={<button onClick={deleteAccount}>Delete Account</button>}>...</HoverCard>',
      good: 'Use a Button trigger that opens a confirmation Modal or Popover with the destructive action',
      reason: 'Hover cards are transient by nature and close when the cursor leaves. Interactive elements like destructive action buttons should not live inside hover cards because they can vanish mid-interaction. Use a Popover or Modal for persistent interactive panels.',
    },
  ],
};
