// src/components/accordion.ts
var accordionEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "accordion",
  name: "Accordion",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A vertically stacked set of expandable panels that reveal hidden content sections.",
  longDescription: "The Accordion component uses the compound component pattern (Accordion.Item, Accordion.Header, Accordion.Body) to create accessible, animated collapsible sections. It supports single-expand and multi-expand modes with WAI-ARIA compliant keyboard navigation.",
  tags: [
    "accordion",
    "collapsible",
    "expandable",
    "disclosure",
    "faq",
    "toggle",
    "panel",
    "section"
  ],
  useCases: [
    "Displaying FAQ sections where users expand answers one at a time",
    "Organizing long-form content into collapsible sections to reduce page scrolling",
    "Creating multi-step guides where each step reveals details on demand",
    "Building settings panels with grouped options that expand/collapse",
    "Showing product feature lists with expandable descriptions",
    "Creating sidebar navigation with collapsible category groups"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Accordion",
  files: [
    { name: "Accordion.tsx", description: "Root component with state management and context provider" },
    { name: "AccordionItem.tsx", description: "Container for a single collapsible section, handles item registration" },
    { name: "AccordionHeader.tsx", description: "Clickable trigger button with expand/collapse toggle and keyboard navigation" },
    { name: "AccordionBody.tsx", description: "Collapsible content panel with smooth height animation and ARIA region" },
    { name: "types.ts", description: "TypeScript type definitions for all props and context" },
    { name: "index.ts", description: "Barrel export file re-exporting the compound component and types" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Accordion",
  subComponents: [
    {
      name: "Item",
      fileName: "AccordionItem.tsx",
      description: "Wraps a single collapsible section containing a Header and Body pair",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Header and Body sub-components for this item"
        },
        {
          name: "itemId",
          type: "string",
          required: true,
          description: "Unique identifier for this accordion item, used for ARIA attributes and state management"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the item wrapper div"
        }
      ]
    },
    {
      name: "Header",
      fileName: "AccordionHeader.tsx",
      description: "Clickable trigger that toggles the associated Body panel open/closed",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Label text or content displayed in the header button"
        },
        {
          name: "itemId",
          type: "string",
          required: true,
          description: "Must match the itemId of the corresponding Item and Body"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the header button element"
        }
      ]
    },
    {
      name: "Body",
      fileName: "AccordionBody.tsx",
      description: "Animated collapsible content panel linked to a Header by shared itemId",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Content displayed inside the collapsible panel when expanded"
        },
        {
          name: "itemId",
          type: "string",
          required: true,
          description: "Must match the itemId of the corresponding Item and Header"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the inner content wrapper"
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Accordion.Item components to render as collapsible sections"
    },
    {
      name: "allowMultiple",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "When true, multiple items can be expanded simultaneously; when false, expanding one collapses others"
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes applied to the root container div"
    }
  ],
  rendersAs: "div",
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "open",
      prop: "itemId (internal state via context)",
      isBoolean: true,
      defaultValue: "false",
      description: "Each item has an independent open/closed state managed internally. When allowMultiple is false, only one item can be open at a time."
    },
    {
      name: "animating",
      prop: "height (internal)",
      isBoolean: false,
      values: ["0", "scrollHeight", "auto"],
      defaultValue: "0",
      description: "Body panels animate between 0 and scrollHeight using CSS transitions on the height property, settling to auto when fully expanded."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick (internal)",
      signature: "() => void",
      description: "Header click toggles the associated panel open/closed. Handled internally \u2014 no exposed callback prop."
    },
    {
      name: "onKeyDown (internal)",
      signature: "(e: React.KeyboardEvent) => void",
      description: "Header keyboard handler for arrow navigation between items, Home/End jumps, and Escape to close. Handled internally."
    },
    {
      name: "onTransitionEnd (internal)",
      signature: "() => void",
      description: "Fired on Body panel after height animation completes. Unmounts hidden content and sets height to auto for dynamic content. Handled internally."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-expanded",
        description: "Applied to each Header button; true when the associated panel is open, false when closed.",
        managedByComponent: true
      },
      {
        name: "aria-controls",
        description: 'Applied to Header button; references the panel ID (e.g. "accordion-panel-{itemId}") to associate the trigger with its content panel.',
        managedByComponent: true
      },
      {
        name: "aria-labelledby",
        description: 'Applied to Body panel; references the header ID (e.g. "accordion-header-{itemId}") to label the region.',
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: "Applied to Body panel; true when collapsed, false when expanded. Prevents screen readers from reading hidden content.",
        managedByComponent: true
      },
      {
        name: "aria-hidden (chevron)",
        description: "Applied to the chevron icon span inside the Header; always true since it is a decorative indicator.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "ArrowDown",
        behavior: "Moves focus to the next accordion header. Wraps from last to first."
      },
      {
        key: "ArrowUp",
        behavior: "Moves focus to the previous accordion header. Wraps from first to last."
      },
      {
        key: "Home",
        behavior: "Moves focus to the first accordion header."
      },
      {
        key: "End",
        behavior: "Moves focus to the last accordion header."
      },
      {
        key: "Escape",
        behavior: "Closes the currently open panel when pressed on an expanded header."
      }
    ],
    focusManagement: "When a panel opens, focus moves to the first focusable element inside the panel after the animation. When a panel closes while it contains the active element, focus returns to the corresponding header button.",
    wcagLevel: "AA",
    notes: 'Body panels use role="region" and are labelled by their headers. Header buttons are wrapped in h3 elements for heading semantics. The component follows the WAI-ARIA Accordion Pattern.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" },
    { name: "tailwind-merge" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "typography",
      reason: "Commonly used inside Accordion.Body for formatted text content"
    },
    {
      slug: "divider",
      reason: "Used between multiple accordion groups or as visual separators in docs layouts"
    },
    {
      slug: "card",
      reason: "Accordion is often placed inside Card containers for grouped content sections"
    },
    {
      slug: "tabs",
      reason: "Alternative to Accordion for switching between content sections without collapsing"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic Accordion",
      description: "Single-expand accordion where only one panel can be open at a time. Expanding a new panel automatically collapses the previous one.",
      code: `import { Accordion } from 'vayu-ui';

export default function BasicAccordion() {
  return (
    <Accordion>
      <Accordion.Item itemId="item-1">
        <Accordion.Header itemId="item-1">Is it accessible?</Accordion.Header>
        <Accordion.Body itemId="item-1">
          Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="item-2">
        <Accordion.Header itemId="item-2">Is it styled?</Accordion.Header>
        <Accordion.Body itemId="item-2">
          Yes. It comes with default styles that matches the other components' aesthetic.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="item-3">
        <Accordion.Header itemId="item-3">Is it animated?</Accordion.Header>
        <Accordion.Body itemId="item-3">
          Yes. It's animated by default, but you can disable it if you prefer.
          Animations respect prefers-reduced-motion preferences.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}`,
      tags: ["basic", "single-expand", "default"]
    },
    {
      title: "Multi-Expand Accordion",
      description: "Accordion with allowMultiple enabled so multiple panels can be open simultaneously.",
      code: `import { Accordion } from 'vayu-ui';

export default function MultiAccordion() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item itemId="multi-1">
        <Accordion.Header itemId="multi-1">Section One</Accordion.Header>
        <Accordion.Body itemId="multi-1">
          Content for section one. Multiple sections can be open at the same time.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="multi-2">
        <Accordion.Header itemId="multi-2">Section Two</Accordion.Header>
        <Accordion.Body itemId="multi-2">
          Content for section two. This can stay open while section one is also expanded.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item itemId="multi-3">
        <Accordion.Header itemId="multi-3">Section Three</Accordion.Header>
        <Accordion.Body itemId="multi-3">
          Content for section three.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}`,
      tags: ["multi-expand", "allow-multiple", "advanced"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Mismatched itemId values",
      bad: '<Accordion.Item itemId="a"><Accordion.Header itemId="b">Title</Accordion.Header></Accordion.Item>',
      good: '<Accordion.Item itemId="a"><Accordion.Header itemId="a">Title</Accordion.Header><Accordion.Body itemId="a">...</Accordion.Body></Accordion.Item>',
      reason: "The itemId on Item, Header, and Body must all match. Mismatched IDs break ARIA associations (aria-controls, aria-labelledby) and panel state management."
    },
    {
      title: "Duplicate itemId values",
      bad: '<Accordion.Item itemId="faq"><Accordion.Header itemId="faq">Q1</Accordion.Header></Accordion.Item><Accordion.Item itemId="faq"><Accordion.Header itemId="faq">Q2</Accordion.Header></Accordion.Item>',
      good: '<Accordion.Item itemId="faq-1"><Accordion.Header itemId="faq-1">Q1</Accordion.Header></Accordion.Item><Accordion.Item itemId="faq-2"><Accordion.Header itemId="faq-2">Q2</Accordion.Header></Accordion.Item>',
      reason: "Each itemId must be unique across the accordion. Duplicate IDs break HTML uniqueness, ARIA references, and internal state tracking."
    },
    {
      title: "Using Header or Body outside Accordion",
      bad: '<div><Accordion.Header itemId="x">Title</Accordion.Header></div>',
      good: '<Accordion><Accordion.Item itemId="x"><Accordion.Header itemId="x">Title</Accordion.Header></Accordion.Item></Accordion>',
      reason: "Header and Body depend on AccordionContext provided by the root Accordion. Using them standalone throws a runtime error."
    },
    {
      title: "Omitting itemId on sub-components",
      bad: "<Accordion.Header>Section Title</Accordion.Header>",
      good: '<Accordion.Header itemId="section-1">Section Title</Accordion.Header>',
      reason: "itemId is required on Item, Header, and Body. Without it, the component cannot register items, manage open state, or generate correct ARIA IDs."
    },
    {
      title: "Nesting accordions",
      bad: '<Accordion><Accordion.Item itemId="1"><Accordion.Body><Accordion>...</Accordion></Accordion.Body></Accordion.Item></Accordion>',
      good: "Use a flat accordion structure or a different pattern like Tabs for hierarchical content.",
      reason: "Nested accordions create confusing keyboard navigation, ambiguous heading levels, and a poor user experience. Restructure the content instead."
    }
  ]
};

// src/components/avatar.ts
var avatarEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "avatar",
  name: "Avatar",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A user profile display component that renders images, initials, or fallback placeholders with optional status indicators and interactive behavior.",
  longDescription: "The Avatar component uses the compound component pattern with four sub-components: Image (profile photo with loading spinner and fallback source), Initials (auto-generated from username with deterministic WCAG-compliant colors), Fallback (default silhouette image), and Status (online/offline/away/busy indicator dot). It supports four sizes (small: 32px, medium: 48px, large: 64px, xlarge: 96px) or custom numeric sizing. When an onClick handler is provided, the avatar becomes interactive with button semantics, keyboard support (Enter/Space), and focus ring styling.",
  tags: [
    "avatar",
    "profile",
    "user",
    "image",
    "initials",
    "status",
    "presence",
    "identity",
    "thumbnail",
    "picture",
    "span"
  ],
  useCases: [
    "Displaying user profile pictures in navigation bars, headers, or user menus",
    "Showing user initials with deterministic colors when photos are unavailable",
    "Indicating online presence or availability status alongside user avatars",
    "Creating clickable profile avatars that navigate to user settings or profiles",
    "Rendering fallback silhouettes when image URLs fail to load",
    "Building user lists, comment threads, or team member grids with avatar displays"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Avatar",
  files: [
    { name: "Avatar.tsx", description: "Root component with size styling, interactive behavior, ARIA attributes, and compound component assembly" },
    { name: "AvatarImage.tsx", description: "Image sub-component with loading spinner, error handling, and fallback source support" },
    { name: "AvatarInitials.tsx", description: "Initials sub-component that generates letters from username with deterministic WCAG-compliant background colors" },
    { name: "AvatarFallback.tsx", description: "Fallback sub-component rendering a default silhouette image when profile photos are unavailable" },
    { name: "AvatarStatus.tsx", description: "Status indicator sub-component showing online, offline, away, or busy presence dots" },
    { name: "types.ts", description: "TypeScript type definitions for AvatarSize, AvatarStatus, and all component prop interfaces" },
    { name: "hooks.ts", description: "Utility functions: generateInitials and getInitialsColor for deterministic avatar rendering" },
    { name: "index.ts", description: "Barrel export file re-exporting the Avatar component and all type definitions" },
    { name: "README.md", description: "Component documentation, anatomy, and usage guidelines" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Avatar",
  subComponents: [
    {
      name: "Image",
      fileName: "AvatarImage.tsx",
      description: "Renders the user profile image with a loading spinner while loading, error state handling, and optional fallback image source.",
      props: [
        {
          name: "fallbackSrc",
          type: "string",
          required: false,
          description: "Alternate image URL to attempt if the primary src fails to load. Only tried once before showing error state."
        },
        {
          name: "src",
          type: "string",
          required: false,
          description: "Primary image URL for the profile photo. Inherited from ImgHTMLAttributes."
        },
        {
          name: "alt",
          type: "string",
          required: false,
          defaultValue: "''",
          description: "Alternative text for the image. Inherited from ImgHTMLAttributes."
        },
        {
          name: "onError",
          type: "React.SyntheticEvent<HTMLImageElement>",
          required: false,
          description: "Called when the image fails to load (after fallback attempt if fallbackSrc is provided). Inherited from ImgHTMLAttributes."
        },
        {
          name: "onLoad",
          type: "React.SyntheticEvent<HTMLImageElement>",
          required: false,
          description: "Called when the image successfully loads. Inherited from ImgHTMLAttributes."
        }
      ]
    },
    {
      name: "Initials",
      fileName: "AvatarInitials.tsx",
      description: "Generates and displays the user initials from their username with a deterministic, WCAG-compliant background color.",
      props: [
        {
          name: "username",
          type: "string",
          required: true,
          description: "Full name used to generate initials. Single word returns first letter; multiple words return first and last initials."
        }
      ]
    },
    {
      name: "Fallback",
      fileName: "AvatarFallback.tsx",
      description: "Displays a default silhouette image when no profile photo or initials are available.",
      props: [
        {
          name: "src",
          type: "string",
          required: false,
          defaultValue: "'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'",
          description: "URL for the fallback silhouette image. Defaults to a generic user photo."
        },
        {
          name: "alt",
          type: "string",
          required: false,
          defaultValue: "'Default avatar'",
          description: "Alternative text for the fallback image."
        }
      ]
    },
    {
      name: "Status",
      fileName: "AvatarStatus.tsx",
      description: "Renders a small colored dot indicating the user online presence or availability status.",
      props: [
        {
          name: "status",
          type: "AvatarStatus",
          required: true,
          description: "The presence status to display. Controls the dot color: green for online, gray for offline, yellow for away, red for busy.",
          options: ["online", "offline", "away", "busy"]
        },
        {
          name: "label",
          type: "string",
          required: false,
          description: 'Custom accessible label for the status indicator, overriding the default (e.g. "In a meeting" instead of "Busy").'
        }
      ]
    }
  ],
  hooks: ["generateInitials", "getInitialsColor"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "size",
      type: "AvatarSize | number",
      required: false,
      defaultValue: "'medium'",
      description: "Controls the avatar dimensions. Named sizes map to fixed pixel values (small: 32px, medium: 48px, large: 64px, xlarge: 96px). A number sets custom pixel dimensions with auto-scaled font size.",
      options: ["small", "medium", "large", "xlarge"]
    },
    {
      name: "username",
      type: "string",
      required: false,
      defaultValue: "''",
      description: "User name used to generate the aria-label and passed to Initials sub-component for letter generation."
    },
    {
      name: "alt",
      type: "string",
      required: false,
      description: "Alternative text for the avatar, used in the aria-label. Takes precedence over username when both are provided."
    },
    {
      name: "status",
      type: "AvatarStatus",
      required: false,
      description: 'Presence status appended to the aria-label (e.g. "User avatar (online)"). Does not render the status dot by itself \u2014 use Avatar.Status for the visual indicator.',
      options: ["online", "offline", "away", "busy"]
    },
    {
      name: "onClick",
      type: "() => void",
      required: false,
      description: 'Makes the avatar interactive. When provided, the root element renders with role="button", tabIndex={0}, cursor-pointer, and keyboard activation via Enter/Space.'
    },
    {
      name: "tabIndex",
      type: "number",
      required: false,
      description: "Overrides the default tab index. Automatically set to 0 when onClick is provided; can be set to -1 to remove from tab order."
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content rendered inside the avatar \u2014 typically one of Image, Initials, or Fallback, optionally alongside Status."
    }
  ],
  rendersAs: "span",
  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: "size",
    options: ["small", "medium", "large", "xlarge"],
    default: "medium"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "imageLoading",
      prop: "src (Avatar.Image)",
      isBoolean: true,
      defaultValue: "true",
      description: "Managed internally by AvatarImage. Shows a spinning loader while the image loads, then fades in the image via opacity transition."
    },
    {
      name: "imageError",
      prop: "src (Avatar.Image)",
      isBoolean: true,
      defaultValue: "false",
      description: "Managed internally by AvatarImage. Set to true when the primary image fails and no fallbackSrc is available (or fallback also fails). Triggers the parent Fallback component if present."
    },
    {
      name: "interactive",
      prop: "onClick",
      isBoolean: true,
      defaultValue: "false",
      description: 'When onClick is provided, the avatar becomes interactive with role="button", keyboard activation, focus ring, hover shadow, and active scale-down effect.'
    },
    {
      name: "status",
      prop: "status",
      isBoolean: false,
      values: ["online", "offline", "away", "busy"],
      description: "Presence status displayed via Avatar.Status sub-component. Each value maps to a semantic color: success (green), muted-content (gray), warning (yellow), destructive (red)."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "() => void",
      description: "Fired when the interactive avatar is clicked or activated via keyboard. Makes the avatar focusable and adds button semantics."
    },
    {
      name: "onError",
      signature: "(event: React.SyntheticEvent<HTMLImageElement>) => void",
      description: "Fired by Avatar.Image when the image fails to load. Called after the fallback source has been attempted (if provided)."
    },
    {
      name: "onLoad",
      signature: "(event: React.SyntheticEvent<HTMLImageElement>) => void",
      description: "Fired by Avatar.Image when the image successfully loads, after internal loading state is cleared."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "button (interactive) / img (static)",
    attributes: [
      {
        name: "aria-label",
        description: `Automatically generated as "{alt or username}'s avatar" and appended with "({status})" when status is provided. Example: "John Doe's avatar (online)".`,
        managedByComponent: true
      },
      {
        name: 'role="button"',
        description: "Applied to the root span when onClick is provided, making the avatar behave as an interactive button for assistive technologies.",
        managedByComponent: true
      },
      {
        name: 'role="img"',
        description: "Applied to the root span when no onClick is provided, indicating a non-interactive image representation.",
        managedByComponent: true
      },
      {
        name: 'role="status"',
        description: "Applied to the AvatarStatus dot and the loading spinner, announcing state changes to screen readers.",
        managedByComponent: true
      },
      {
        name: 'aria-hidden="true"',
        description: "Applied to AvatarInitials, AvatarFallback, and the loading spinner inner element since they are decorative \u2014 the meaningful label is on the root element.",
        managedByComponent: true
      },
      {
        name: 'aria-live="polite"',
        description: "Applied to the AvatarImage loading spinner container so screen readers announce loading state changes without interrupting.",
        managedByComponent: true
      },
      {
        name: 'aria-busy="true"',
        description: "Applied to the AvatarImage loading spinner container while the image is being fetched.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Enter",
        behavior: "Activates the interactive avatar (triggers onClick) when the avatar has focus. Only available when onClick is provided."
      },
      {
        key: "Space",
        behavior: "Activates the interactive avatar (triggers onClick) when the avatar has focus. Only available when onClick is provided."
      },
      {
        key: "Tab",
        behavior: "Moves focus to the interactive avatar when onClick is provided. Static avatars are not focusable."
      }
    ],
    focusManagement: "Interactive avatars (with onClick) receive a visible focus ring via focus-visible:ring-2 focus-visible:ring-focus with ring-offset-2 for contrast in both light and dark modes. Static avatars are not focusable.",
    wcagLevel: "AA",
    notes: "Initials colors are selected from a curated set of 12 WCAG AA-compliant colors with contrast ratios >= 4.5:1 against white text. The color is deterministically assigned per username so the same user always gets the same color."
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: "Avatars are frequently embedded inside buttons for profile menus, user selectors, or account actions"
    },
    {
      slug: "card",
      reason: "Avatars appear in card headers for user attributions, author info, or team member cards"
    },
    {
      slug: "typography",
      reason: "Used alongside avatars to display usernames, roles, or status text in user info layouts"
    },
    {
      slug: "badge",
      reason: "Combined with avatars to show notification counts or verification badges overlaid on profile pictures"
    },
    {
      slug: "divider",
      reason: "Used between avatar groups or to separate user list sections in layouts like team directories"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Avatar Sizes",
      description: "All four named sizes from small (32px) to extra-large (96px) using initials.",
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-6 flex-wrap">
      <Avatar size="small" username="Small User">
        <Avatar.Initials username="Small User" />
      </Avatar>
      <Avatar size="medium" username="Medium User">
        <Avatar.Initials username="Medium User" />
      </Avatar>
      <Avatar size="large" username="Large User">
        <Avatar.Initials username="Large User" />
      </Avatar>
      <Avatar size="xlarge" username="XL User">
        <Avatar.Initials username="XL User" />
      </Avatar>
    </div>
  );
}`,
      tags: ["basic", "sizes"]
    },
    {
      title: "Image, Initials, and Fallback",
      description: "Three rendering modes: profile photo, generated initials, and automatic fallback when the image fails.",
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarVariants() {
  return (
    <div className="flex flex-wrap gap-8">
      {/* Profile photo */}
      <Avatar size="large" username="John Doe">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
          alt=""
        />
      </Avatar>

      {/* Generated initials */}
      <Avatar size="large" username="Jane Smith">
        <Avatar.Initials username="Jane Smith" />
      </Avatar>

      {/* Fallback on broken image */}
      <Avatar size="large" username="Fallback User">
        <Avatar.Image src="https://broken-image-link.com/image.jpg" alt="" />
        <Avatar.Fallback />
      </Avatar>
    </div>
  );
}`,
      tags: ["basic", "variants", "image", "initials", "fallback"]
    },
    {
      title: "Status Indicators",
      description: "Online presence dots in all four status states: online, away, busy, and offline.",
      code: `import { Avatar } from 'vayu-ui';

export default function AvatarStatuses() {
  return (
    <div className="flex flex-wrap gap-8">
      <Avatar size="large" username="Online" status="online">
        <Avatar.Initials username="Online" />
        <Avatar.Status status="online" />
      </Avatar>
      <Avatar size="large" username="Away" status="away">
        <Avatar.Initials username="Away" />
        <Avatar.Status status="away" />
      </Avatar>
      <Avatar size="large" username="Busy" status="busy">
        <Avatar.Initials username="Busy" />
        <Avatar.Status status="busy" />
      </Avatar>
      <Avatar size="large" username="Offline" status="offline">
        <Avatar.Initials username="Offline" />
        <Avatar.Status status="offline" />
      </Avatar>
    </div>
  );
}`,
      tags: ["basic", "status", "presence"]
    },
    {
      title: "Interactive Avatars",
      description: "Clickable avatars that respond to click and keyboard activation with button semantics.",
      code: `import { Avatar } from 'vayu-ui';

export default function InteractiveAvatars() {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <Avatar
        size="large"
        username="Click Me"
        onClick={() => alert('Avatar clicked!')}
      >
        <Avatar.Initials username="Click Me" />
      </Avatar>

      <Avatar
        size="large"
        username="Profile"
        onClick={() => alert('Opening profile...')}
        status="online"
      >
        <Avatar.Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60"
          alt=""
        />
        <Avatar.Status status="online" />
      </Avatar>
    </div>
  );
}`,
      tags: ["interactive", "clickable"]
    },
    {
      title: "Avatar Inside Button",
      description: "Composing avatars within Button components for profile actions and navigation.",
      code: `import { Avatar } from 'vayu-ui';
import { Button } from 'vayu-ui';

export default function AvatarInButton() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="secondary" size="medium">
        <Avatar size="small" username="John Doe">
          <Avatar.Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
            alt=""
          />
        </Avatar>
        <Button.Text>John Doe</Button.Text>
      </Button>

      <Button variant="outline" size="medium">
        <Avatar size="small" username="Team">
          <Avatar.Initials username="Team" />
        </Avatar>
        <Button.Text>Team Chat</Button.Text>
      </Button>

      <Button variant="ghost" size="medium">
        <Avatar size="small" username="Account">
          <Avatar.Initials username="Account" />
        </Avatar>
        <Button.Text>Account</Button.Text>
      </Button>
    </div>
  );
}`,
      tags: ["composition", "button", "navigation"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using status prop without Avatar.Status sub-component",
      bad: '<Avatar status="online"><Avatar.Initials username="User" /></Avatar>',
      good: '<Avatar status="online"><Avatar.Initials username="User" /><Avatar.Status status="online" /></Avatar>',
      reason: "The status prop on the root only sets the aria-label suffix for accessibility. It does not render a visual indicator \u2014 you must explicitly include Avatar.Status to show the colored dot."
    },
    {
      title: "Nesting an interactive Avatar inside a button or link",
      bad: '<button><Avatar onClick={handleClick}><Avatar.Initials username="User" /></Avatar></button>',
      good: '<Avatar onClick={handleClick}><Avatar.Initials username="User" /></Avatar>',
      reason: 'When onClick is provided, the avatar already renders with role="button" and is keyboard-interactive. Nesting it inside another button or link creates invalid HTML and breaks accessibility.'
    },
    {
      title: "Omitting username when using Initials",
      bad: "<Avatar><Avatar.Initials /></Avatar>",
      good: '<Avatar username="Jane Doe"><Avatar.Initials username="Jane Doe" /></Avatar>',
      reason: "The username prop is required on AvatarInitials to generate the initials text. Without it, the component returns null. The root username prop should also be set for the aria-label."
    },
    {
      title: "Hardcoding avatar colors or sizes with custom CSS",
      bad: '<Avatar className="w-16 h-16 bg-blue-500"><Avatar.Initials username="User" /></Avatar>',
      good: '<Avatar size="large"><Avatar.Initials username="User" /></Avatar>',
      reason: "Hardcoding Tailwind classes bypasses the design token system and may conflict with the component internal sizing logic. Use the size prop for consistent, token-based dimensions."
    }
  ]
};

// src/components/affix.ts
var affixEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "affix",
  name: "Affix",
  type: "component",
  category: "layout",
  // ── Description ───────────────────────────────────────
  description: "Pins content to the viewport or a scroll container when scrolling past it.",
  longDescription: "The Affix component monitors scroll position and switches its child to fixed or absolute positioning once a scroll threshold is reached. It supports top and bottom placement, custom scroll containers via the target prop, and fires an onAffixed callback on state transitions. A hidden placeholder preserves layout flow when the element becomes affixed.",
  tags: [
    "affix",
    "sticky",
    "fixed",
    "pin",
    "scroll",
    "navigation",
    "toolbar",
    "positioning",
    "viewport"
  ],
  useCases: [
    "Sticky navigation bars that remain visible while the user scrolls",
    "Floating action bars pinned to the bottom of the viewport for save/submit actions",
    "Table headers that stay in view inside scrollable data containers",
    "Cookie consent or notification banners anchored to the bottom edge",
    "Sidebar headers that remain accessible during long-page scrolling",
    "Promotional banners that stick to the top with a custom offset"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Affix",
  files: [
    { name: "Affix.tsx", description: "Root component with ref management, placeholder, and scroll-based positioning logic" },
    { name: "hooks.ts", description: "useAffixMeasure and useAffixScroll hooks for scroll/resize detection and position calculation" },
    { name: "types.ts", description: "AffixPosition and AffixProps type definitions" },
    { name: "index.ts", description: "Barrel export file re-exporting the component and types" },
    { name: "README.md", description: "Component anatomy and use-case reference", optional: true }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Affix",
  subComponents: [],
  hooks: ["useAffixMeasure", "useAffixScroll"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "offset",
      type: "number",
      required: false,
      defaultValue: "0",
      description: "Distance in pixels from the viewport or container edge when affixed"
    },
    {
      name: "position",
      type: "AffixPosition",
      required: false,
      defaultValue: "'top'",
      description: "Which edge to pin the content to when affixed",
      options: ["top", "bottom"]
    },
    {
      name: "target",
      type: "HTMLElement | null",
      required: false,
      defaultValue: "null",
      description: "Custom scroll container element. Defaults to window when null"
    },
    {
      name: "zIndex",
      type: "number",
      required: false,
      defaultValue: "100",
      description: "Stack order (z-index) applied when the element is affixed"
    },
    {
      name: "onAffixed",
      type: "(affixed: boolean) => void",
      required: false,
      description: "Callback fired when the affixed state changes"
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content to be affixed when the scroll threshold is reached"
    }
  ],
  rendersAs: "div",
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "affixed",
      prop: "isAffixed (internal)",
      isBoolean: true,
      defaultValue: "false",
      description: "Whether the element is currently pinned. Managed internally via scroll position measurement. Reflects in the data-affixed attribute and triggers onAffixed callback."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onAffixed",
      signature: "(affixed: boolean) => void",
      description: "Fires when the element transitions between static and affixed positioning. Receives true when affixed, false when returning to static flow."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-hidden",
        description: 'Applied to the placeholder element (always "true") to prevent screen readers from announcing the invisible layout spacer.',
        managedByComponent: true
      },
      {
        name: "data-affixed",
        description: "Set on the affixed element when it is pinned. Useful for CSS hooks and test assertions. Not an ARIA attribute but aids accessibility testing.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [],
    focusManagement: "Focus is not affected by affix state changes. Interactive children (buttons, links) remain focusable in both static and affixed states.",
    wcagLevel: "AA",
    notes: 'The Affix renders a plain <div> with no inherent role. Developers should pass role and aria-label props for semantic context (e.g. role="navigation" for sticky nav bars). The placeholder is hidden from the accessibility tree via aria-hidden="true".'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" },
    { name: "tailwind-merge" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "navbar",
      reason: "Sticky navigation is the most common use case \u2014 NavBar content wrapped in Affix for persistent visibility"
    },
    {
      slug: "button",
      reason: "Frequently used inside bottom-affixed action bars for save, submit, or confirm actions"
    },
    {
      slug: "card",
      reason: "Card headers or toolbars inside scrollable containers often use Affix to stay visible"
    },
    {
      slug: "typography",
      reason: "Used alongside Affix for labels, status text, and descriptive content within pinned bars"
    },
    {
      slug: "divider",
      reason: "Separates affixed sections from main content below or above them"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Top Affix with Offset",
      description: "Pins a navigation bar to the top of the viewport with a 20px offset and tracks affixed state via onAffixed callback.",
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
      tags: ["top", "offset", "callback", "navigation"]
    },
    {
      title: "Bottom Affix",
      description: "An action bar pinned to the bottom of the viewport, useful for cookie consents or save/submit workflows.",
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
      tags: ["bottom", "action-bar", "viewport"]
    },
    {
      title: "Custom Target Container",
      description: "Scopes the affix behavior to a specific scrollable element instead of the window. The bar sticks within the container boundaries.",
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
      tags: ["custom-target", "container", "scoped", "scroll"]
    },
    {
      title: "Custom Styled Affix",
      description: "Demonstrates passing className and style props, plus aria attributes for screen reader accessibility.",
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
      tags: ["styled", "custom-class", "accessibility", "banner"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Forgetting role and aria-label",
      bad: "<Affix offset={20}><nav>Navigation</nav></Affix>",
      good: '<Affix offset={20} role="navigation" aria-label="Main navigation"><nav>Navigation</nav></Affix>',
      reason: "Affix renders a plain div with no semantic role. Without explicit role and aria-label, screen readers cannot identify the pinned content's purpose."
    },
    {
      title: "Passing target as a CSS selector string",
      bad: '<Affix target="#scroll-box" position="bottom">...</Affix>',
      good: '<Affix target={document.getElementById("scroll-box")} position="bottom">...</Affix>',
      reason: "The target prop expects an HTMLElement reference or null, not a CSS selector string. Use a ref or querySelector to pass the actual DOM element."
    },
    {
      title: "Using Affix without sufficient scroll content",
      bad: "<Affix offset={0}><div>Pinned</div></Affix><div style={{ height: 50 }} />",
      good: "<Affix offset={0}><div>Pinned</div></Affix><div style={{ height: 800 }} />",
      reason: "If the page or container has no scrollable overflow, Affix will never trigger and the component adds unnecessary overhead. Only use Affix when there is enough content to scroll past the element."
    },
    {
      title: "Overriding position style without understanding affix logic",
      bad: '<Affix style={{ position: "absolute", top: 0 }}>...</Affix>',
      good: "<Affix offset={0}>...</Affix>",
      reason: "Affix dynamically manages position, top, bottom, left, width, and zIndex in its inline styles. Overriding these via the style prop will conflict with the affix positioning logic."
    },
    {
      title: "Nesting Affix components",
      bad: '<Affix position="top"><Affix position="bottom">...</Affix></Affix>',
      good: "Place each Affix as a sibling at the same level in the DOM tree.",
      reason: "Nested Affix components create conflicting scroll listeners and layout placeholder interactions. Each Affix should be an independent sibling element."
    }
  ]
};

// src/components/alert.ts
var alertEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "alert",
  name: "Alert",
  type: "component",
  category: "feedback",
  // ── Description ───────────────────────────────────────
  description: "A contextual feedback banner that communicates status, validation results, or important messages to users.",
  longDescription: 'The Alert component uses the compound component pattern (Alert.Icon, Alert.Title, Alert.Description, Alert.Content, Alert.Dismiss) to create accessible status banners. It supports four semantic variants \u2014 info, success, warning, and error \u2014 each with appropriate ARIA live regions and roles. Warning and error variants use role="alert" with aria-live="assertive" for immediate screen reader announcement, while info and success use role="status" with aria-live="polite".',
  tags: [
    "alert",
    "notification",
    "feedback",
    "status",
    "banner",
    "toast",
    "message",
    "validation",
    "info",
    "warning",
    "error",
    "success"
  ],
  useCases: [
    "Displaying form validation errors after a failed submission",
    "Showing success confirmation after a user action like saving or deleting",
    "Warning users about potential issues like expiring sessions or unsaved changes",
    "Providing contextual informational hints within a page or form",
    "Displaying dismissible notifications at the top of a page section",
    "Communicating system status changes like maintenance windows or service degradation"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Alert",
  files: [
    { name: "Alert.tsx", description: "Root component with variant styling, ARIA roles, and compound component assembly" },
    { name: "AlertIcon.tsx", description: "Icon container with variant-aware color styling and aria-hidden" },
    { name: "AlertTitle.tsx", description: "Heading element for the alert message title, renders as h5" },
    { name: "AlertDescription.tsx", description: "Descriptive body text for the alert message details" },
    { name: "AlertContent.tsx", description: "Layout wrapper that groups Title and Description with flex spacing" },
    { name: "AlertDismiss.tsx", description: "Close button with variant-aware focus ring, dynamic aria-label, and X icon" },
    { name: "types.ts", description: "TypeScript type definitions for AlertVariant and all component props" },
    { name: "index.ts", description: "Barrel export file re-exporting the compound component and types" },
    { name: "README.md", description: "Component documentation and usage guidelines" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Alert",
  subComponents: [
    {
      name: "Icon",
      fileName: "AlertIcon.tsx",
      description: "Renders a decorative icon with variant-aware color. Must wrap an icon element (e.g. from lucide-react).",
      props: [
        {
          name: "variant",
          type: "AlertVariant",
          required: false,
          defaultValue: "'info'",
          description: "Controls the icon color. Should match the parent Alert variant for consistent styling.",
          options: ["info", "success", "warning", "error"]
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Icon element to display, typically an SVG icon from lucide-react or a similar library."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the icon container div."
        }
      ]
    },
    {
      name: "Title",
      fileName: "AlertTitle.tsx",
      description: "Renders the alert heading as an h5 element with semibold styling.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Title text or inline content for the alert heading."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the h5 element."
        }
      ]
    },
    {
      name: "Description",
      fileName: "AlertDescription.tsx",
      description: "Renders the alert body text with comfortable reading line height.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Descriptive text content explaining the alert message."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the description div."
        }
      ]
    },
    {
      name: "Content",
      fileName: "AlertContent.tsx",
      description: "Flex layout wrapper that groups Title and Description, with right padding to avoid the dismiss button.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Alert.Title and Alert.Description sub-components."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the content wrapper div."
        }
      ]
    },
    {
      name: "Dismiss",
      fileName: "AlertDismiss.tsx",
      description: "Positioned close button with an X icon, variant-aware focus ring, and dynamically generated aria-label.",
      props: [
        {
          name: "variant",
          type: "AlertVariant",
          required: false,
          defaultValue: "'info'",
          description: "Controls the dismiss button color and focus ring. Should match the parent Alert variant.",
          options: ["info", "success", "warning", "error"]
        },
        {
          name: "alertTitle",
          type: "string",
          required: false,
          description: 'Optional alert title included in the auto-generated aria-label for better screen reader context (e.g. "Dismiss success alert: Saved").'
        },
        {
          name: "onClick",
          type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
          required: false,
          description: "Click handler for the dismiss button. Typically used to hide the alert via state."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the dismiss button element."
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "variant",
      type: "AlertVariant",
      required: false,
      defaultValue: "'info'",
      description: "Semantic variant controlling background, border, and text colors, as well as the ARIA role and live region behavior.",
      options: ["info", "success", "warning", "error"]
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Alert sub-components: Icon, Content (Title + Description), and optionally Dismiss."
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes applied to the root alert container div."
    }
  ],
  rendersAs: "div",
  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: "variant",
    options: ["info", "success", "warning", "error"],
    default: "info"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "variant",
      prop: "variant",
      isBoolean: false,
      values: ["info", "success", "warning", "error"],
      defaultValue: "'info'",
      description: 'Controls the visual and semantic style. Info and success use role="status" with aria-live="polite"; warning and error use role="alert" with aria-live="assertive".'
    },
    {
      name: "visible",
      prop: "parent-controlled (conditional rendering)",
      isBoolean: true,
      defaultValue: "true",
      description: "Alert visibility is managed by the parent via conditional rendering. Typically toggled by the Dismiss onClick handler."
    },
    {
      name: "disabled",
      prop: "disabled (on Dismiss)",
      isBoolean: true,
      defaultValue: "false",
      description: "When disabled is passed to Alert.Dismiss, the button becomes non-interactive via native HTMLButtonElement disabled attribute."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Fired when the Dismiss button is clicked. Typically used to set visibility state and hide the alert."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "role",
        description: 'Set to "status" for info/success variants and "alert" for warning/error variants, matching the urgency of the message.',
        managedByComponent: true
      },
      {
        name: "aria-live",
        description: 'Set to "polite" for info/success variants (announced when idle) and "assertive" for warning/error variants (announced immediately).',
        managedByComponent: true
      },
      {
        name: "aria-atomic",
        description: 'Always "true" \u2014 ensures screen readers announce the entire alert content as a single unit.',
        managedByComponent: true
      },
      {
        name: "data-variant",
        description: "Set to the current variant value for styling and testing purposes.",
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: 'Applied to the Icon container div, always "true" since icons are decorative and the meaning is conveyed by the variant role and text content.',
        managedByComponent: true
      },
      {
        name: "aria-label",
        description: 'Applied to the Dismiss button. Dynamically generated: "Dismiss {variant} alert" or "Dismiss {variant} alert: {alertTitle}" when alertTitle is provided.',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        behavior: "Moves focus to the Dismiss button if present. The Dismiss button is the only focusable element inside the alert."
      },
      {
        key: "Enter",
        behavior: "Activates the focused Dismiss button, triggering the onClick handler to hide the alert."
      },
      {
        key: "Space",
        behavior: "Activates the focused Dismiss button, triggering the onClick handler to hide the alert."
      }
    ],
    focusManagement: "The Dismiss button is positioned absolutely and receives visible focus via focus-visible:ring-2 with variant-aware ring color. Focus ring uses ring-offset-surface for contrast.",
    wcagLevel: "AA",
    notes: 'Warning and error alerts use role="alert" with aria-live="assertive" per WCAG 2.2 guidelines for urgent messages. Info and success alerts use role="status" with aria-live="polite" for non-urgent announcements. The Title renders as an h5 for heading semantics.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: 'Used alongside alerts for "try again" or "reset" actions after error or warning states'
    },
    {
      slug: "typography",
      reason: "Commonly used for page headings or section labels above alert groups"
    },
    {
      slug: "divider",
      reason: "Used between stacked alerts to provide visual separation"
    },
    {
      slug: "card",
      reason: "Alerts are often placed inside Card containers for grouped form feedback"
    },
    {
      slug: "text-input",
      reason: "Alerts commonly display validation errors from form inputs like TextInput"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Info Alert",
      description: "Basic informational alert using the default variant with an icon, title, and description.",
      code: `import { Alert } from 'vayu-ui';
import { Info } from 'lucide-react';

export default function InfoAlert() {
  return (
    <Alert variant="info">
      <Alert.Icon variant="info">
        <Info className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>
          This is an informational alert to highlight something important.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}`,
      tags: ["basic", "info", "default"]
    },
    {
      title: "Dismissible Success Alert",
      description: "Success alert with a dismiss button that hides the alert on click using React state.",
      code: `import { useState } from 'react';
import { Alert } from 'vayu-ui';
import { CheckCircle } from 'lucide-react';

export default function DismissibleAlert() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant="success">
      <Alert.Icon variant="success">
        <CheckCircle className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Success</Alert.Title>
        <Alert.Description>Your changes have been successfully saved.</Alert.Description>
      </Alert.Content>
      <Alert.Dismiss
        variant="success"
        alertTitle="Success"
        onClick={() => setShow(false)}
      />
    </Alert>
  );
}`,
      tags: ["dismissible", "success", "interactive"]
    },
    {
      title: "Error Alert with Dismiss",
      description: "Error alert with dismiss functionality for displaying form validation or API errors.",
      code: `import { useState } from 'react';
import { Alert } from 'vayu-ui';
import { XCircle } from 'lucide-react';

export default function ErrorAlert() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant="error">
      <Alert.Icon variant="error">
        <XCircle className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          There was an error processing your request. Please try again.
        </Alert.Description>
      </Alert.Content>
      <Alert.Dismiss
        variant="error"
        alertTitle="Error"
        onClick={() => setShow(false)}
      />
    </Alert>
  );
}`,
      tags: ["error", "dismissible", "validation"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Mismatched variant on Icon or Dismiss",
      bad: '<Alert variant="error"><Alert.Icon variant="info"><XCircle /></Alert.Icon>...</Alert>',
      good: '<Alert variant="error"><Alert.Icon variant="error"><XCircle /></Alert.Icon>...</Alert>',
      reason: "The Icon and Dismiss variant must match the root Alert variant. Mismatched variants produce inconsistent colors \u2014 the icon or dismiss button will have a different color than the alert background and border."
    },
    {
      title: "Using Dismiss outside Alert",
      bad: '<div><Alert.Dismiss variant="error" onClick={handleClose} /></div>',
      good: '<Alert variant="error">...<Alert.Dismiss variant="error" onClick={handleClose} /></Alert>',
      reason: "Alert.Dismiss is absolutely positioned (top-4 right-4) relative to the Alert container. Using it outside Alert breaks positioning and it loses its visual context."
    },
    {
      title: "Hardcoding colors instead of using variants",
      bad: '<Alert className="bg-red-100 border-red-500 text-red-900">...</Alert>',
      good: '<Alert variant="error">...</Alert>',
      reason: "Hardcoding Tailwind colors bypasses the semantic design tokens (destructive, info, success, warning) and breaks dark mode support. Always use the variant prop."
    },
    {
      title: "Wrapping Title or Description in interactive elements",
      bad: '<Alert.Title><a href="/help">Learn more</a></Alert.Title>',
      good: '<Alert.Title>Error</Alert.Title><Alert.Description>See the <a href="/help">help docs</a> for details.</Alert.Description>',
      reason: "Alerts use aria-live regions that announce changes to screen readers. Embedding interactive elements inside the Title or inside the live region can cause confusing repeated announcements and breaks the expected alert pattern."
    }
  ]
};

// src/components/aspectratio.ts
var aspectratioEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "aspectratio",
  name: "AspectRatio",
  type: "component",
  category: "media",
  // ── Description ───────────────────────────────────────
  description: "A layout primitive that constrains children to a fixed aspect ratio using CSS aspect-ratio or padding-bottom fallback.",
  longDescription: 'The AspectRatio component provides a responsive container that maintains a consistent width-to-height ratio. It supports 11 named presets (square, video, photo, landscape, ultrawide, portrait, golden, a4, cinema, iphone, ipad) via native CSS aspect-ratio, and arbitrary numeric ratios via a padding-bottom fallback. Built-in object-fit control applies styles to direct <img> and <video> children. Accessibility is handled through three modes: decorative (hidden from assistive technology), named region (with aria-label + role="region"), and generic container (no semantic role).',
  tags: [
    "aspect-ratio",
    "ratio",
    "responsive",
    "image",
    "video",
    "media",
    "container",
    "layout",
    "placeholder",
    "crop",
    "embed",
    "thumbnail"
  ],
  useCases: [
    "Displaying images in a responsive grid with consistent aspect ratios",
    "Embedding videos that maintain 16:9 proportions across screen sizes",
    "Creating placeholder skeletons with known dimensions while content loads",
    "Building media galleries where all cards share uniform proportions",
    "Rendering device-specific mockups (iPhone, iPad) in marketing pages",
    "Constraining decorative images that should be hidden from screen readers",
    "Creating cinema or ultrawide banners with fixed proportions"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "AspectRatio",
  files: [
    { name: "AspectRatio.tsx", description: "Root component with ratio calculation, overflow, object-fit styling, and accessibility logic" },
    { name: "types.ts", description: "TypeScript type definitions, preset ratio map, and constant maps for overflow/object-fit" },
    { name: "index.ts", description: "Barrel export file re-exporting the component and types" },
    { name: "README.md", description: "Component documentation and usage guidelines" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "AspectRatio",
  subComponents: [],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "ratio",
      type: "number | AspectRatioPreset",
      required: false,
      defaultValue: "'square'",
      description: "Aspect ratio expressed as width/height. Use a named preset or a numeric value.",
      options: ["square", "video", "photo", "landscape", "ultrawide", "portrait", "golden", "a4", "cinema", "iphone", "ipad"]
    },
    {
      name: "overflow",
      type: "'hidden' | 'visible' | 'auto' | 'scroll'",
      required: false,
      defaultValue: "'hidden'",
      description: "Overflow behavior for the container."
    },
    {
      name: "objectFit",
      type: "'cover' | 'contain' | 'fill' | 'scale-down' | 'none'",
      required: false,
      defaultValue: "'cover'",
      description: "Object-fit applied to direct <img> and <video> children."
    },
    {
      name: "decorative",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: 'Marks the container as decorative, hiding it from screen readers with role="presentation" and aria-hidden="true".'
    },
    {
      name: "rounded",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Adds rounded corners using the design system rounded-surface token."
    },
    {
      name: "shadow",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Adds subtle shadow using the design system shadow-surface token."
    },
    {
      name: "bordered",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Adds a border using the design system border token."
    },
    {
      name: "aria-label",
      type: "string",
      required: false,
      description: 'Accessible label for screen readers. When provided, the container gets role="region" to become a named landmark.'
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes applied to the root container div."
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Content to render inside the aspect ratio container, typically an <img> or <video> element."
    }
  ],
  rendersAs: "div",
  // ── Variants ──────────────────────────────────────────
  // No variant prop — ratio is a multi-type prop, not a visual variant
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "decorative",
      prop: "decorative",
      isBoolean: true,
      defaultValue: "false",
      description: 'When true, sets role="presentation" and aria-hidden="true" so the container is invisible to assistive technology.'
    },
    {
      name: "ratio",
      prop: "ratio",
      isBoolean: false,
      values: ["square", "video", "photo", "landscape", "ultrawide", "portrait", "golden", "a4", "cinema", "iphone", "ipad"],
      defaultValue: "'square'",
      description: "Controls the aspect ratio of the container. Presets use native CSS aspect-ratio; numeric values use padding-bottom fallback."
    },
    {
      name: "objectFit",
      prop: "objectFit",
      isBoolean: false,
      values: ["cover", "contain", "fill", "scale-down", "none"],
      defaultValue: "'cover'",
      description: "Controls how direct <img> and <video> children fill the container area."
    },
    {
      name: "overflow",
      prop: "overflow",
      isBoolean: false,
      values: ["hidden", "visible", "auto", "scroll"],
      defaultValue: "'hidden'",
      description: "Controls overflow behavior. Defaults to hidden to clip content that exceeds the ratio bounds."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "role",
        description: 'Set to "presentation" when decorative is true. Set to "region" when aria-label is provided (creating a named landmark). No role is set otherwise.',
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: 'Set to "true" when decorative is true, hiding the container and its children from the accessibility tree.',
        managedByComponent: true
      },
      {
        name: "aria-label",
        description: "When provided by the developer, the container becomes a named region. The component does not generate this attribute automatically.",
        managedByComponent: false
      }
    ],
    keyboardInteractions: [],
    focusManagement: "AspectRatio is a non-interactive layout primitive. No focus management is provided. Focus behavior is delegated entirely to children (e.g., links, buttons, interactive media controls).",
    wcagLevel: "AA",
    notes: "The component supports three accessibility modes: (1) decorative \u2014 hides the container from assistive technology, suitable for ornamental images; (2) named region \u2014 use aria-label when the container wraps meaningful content that benefits from landmark navigation; (3) generic \u2014 no semantic role, children announce based on their own semantics. Always provide alt text on <img> children."
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" },
    { name: "tailwind-merge" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "card",
      reason: "AspectRatio is commonly placed inside Card components for image-based content cards"
    },
    {
      slug: "typography",
      reason: "Used alongside Typography for image captions, titles, and description overlays within aspect-ratio containers"
    },
    {
      slug: "button",
      reason: "Often paired for overlay action buttons on hero images or featured content cards"
    },
    {
      slug: "divider",
      reason: "Used between rows of aspect-ratio content in gallery or grid layouts"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Preset Ratios Grid",
      description: "Multiple preset ratios displayed in a responsive grid with rounded corners and shadows.",
      code: `import { AspectRatio } from 'vayu-ui';

export default function PresetGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <AspectRatio ratio="square" decorative rounded shadow>
        <img src="/photo.jpg" alt="Square" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="video" decorative rounded shadow>
        <img src="/photo.jpg" alt="Video" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="photo" decorative rounded shadow>
        <img src="/photo.jpg" alt="Photo" className="w-full h-full object-cover" />
      </AspectRatio>
    </div>
  );
}`,
      tags: ["presets", "grid", "images"]
    },
    {
      title: "Custom Numeric Ratio",
      description: "Using a numeric ratio value for a custom aspect ratio not covered by presets.",
      code: `import { AspectRatio } from 'vayu-ui';

export default function CustomRatio() {
  return (
    <div className="max-w-md">
      <AspectRatio ratio={2.5} decorative rounded shadow bordered>
        <div className="flex items-center justify-center h-full bg-muted text-muted-content">
          2.5 : 1
        </div>
      </AspectRatio>
    </div>
  );
}`,
      tags: ["custom", "numeric", "ratio"]
    },
    {
      title: "Video Embed Container",
      description: "Constraining a video embed to 16:9 ratio with accessible labeling.",
      code: `import { AspectRatio } from 'vayu-ui';

export default function VideoEmbed() {
  return (
    <AspectRatio ratio="video" aria-label="Product demo video" rounded shadow>
      <video src="/demo.mp4" controls className="w-full h-full object-cover">
        <track kind="captions" src="/demo.vtt" srcLang="en" label="English" />
      </video>
    </AspectRatio>
  );
}`,
      tags: ["video", "embed", "accessible"]
    },
    {
      title: "Decorative Image with Overlay",
      description: "A decorative image with an overlay content layer, hidden from screen readers.",
      code: `import { AspectRatio } from 'vayu-ui';

export default function HeroImage() {
  return (
    <AspectRatio ratio="ultrawide" decorative rounded shadow>
      <img src="/hero.jpg" alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Welcome</h2>
          <p className="text-white/80">Explore our collection</p>
        </div>
      </div>
    </AspectRatio>
  );
}`,
      tags: ["decorative", "overlay", "hero"]
    },
    {
      title: "Device Mockups",
      description: "Using iPhone and iPad presets for device-specific preview frames.",
      code: `import { AspectRatio } from 'vayu-ui';

export default function DeviceMockups() {
  return (
    <div className="flex gap-4 items-end">
      <div className="flex-1 max-w-50">
        <AspectRatio ratio="iphone" decorative rounded shadow>
          <img src="/mobile-screen.png" alt="" className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
      <div className="flex-1 max-w-96">
        <AspectRatio ratio="ipad" decorative rounded shadow>
          <img src="/tablet-screen.png" alt="" className="w-full h-full object-cover" />
        </AspectRatio>
      </div>
    </div>
  );
}`,
      tags: ["device", "mockup", "iphone", "ipad"]
    },
    {
      title: "Object Fit Comparison",
      description: 'Comparing objectFit="cover" vs objectFit="contain" on square containers.',
      code: `import { AspectRatio } from 'vayu-ui';

export default function ObjectFitComparison() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <AspectRatio ratio="square" decorative rounded shadow>
        <img src="/photo.jpg" alt="Cover fit" className="w-full h-full object-cover" />
      </AspectRatio>
      <AspectRatio ratio="square" objectFit="contain" decorative rounded shadow className="bg-muted">
        <img src="/photo.jpg" alt="Contain fit" className="w-full h-full object-contain" />
      </AspectRatio>
    </div>
  );
}`,
      tags: ["object-fit", "cover", "contain", "comparison"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using ratio={0} or negative ratios",
      bad: "<AspectRatio ratio={0} decorative>...</AspectRatio>",
      good: '<AspectRatio ratio="square" decorative>...</AspectRatio>',
      reason: "A ratio of 0 or a negative value produces undefined behavior \u2014 the padding-bottom fallback divides by the ratio value. Use a named preset or a positive numeric value."
    },
    {
      title: "Setting both decorative and aria-label",
      bad: '<AspectRatio decorative aria-label="Product image">...</AspectRatio>',
      good: '<AspectRatio aria-label="Product image">...</AspectRatio>',
      reason: 'When decorative is true, the component sets aria-hidden="true" and removes aria-label. The two props conflict \u2014 decorative means "this has no meaning", while aria-label means "this has a meaningful name".'
    },
    {
      title: "Hardcoding aspect-ratio in className",
      bad: '<AspectRatio ratio="video" className="aspect-3/4">...</AspectRatio>',
      good: '<AspectRatio ratio="portrait">...</AspectRatio>',
      reason: "Overriding the aspect-ratio via className fights with the component's built-in Tailwind classes. Use the ratio prop with a preset or numeric value instead."
    },
    {
      title: "Nesting AspectRatio containers",
      bad: '<AspectRatio ratio="video"><AspectRatio ratio="square">...</AspectRatio></AspectRatio>',
      good: '<AspectRatio ratio="video"><div className="w-full h-full">...</div></AspectRatio>',
      reason: "Nesting AspectRatio components creates conflicting absolute-positioning contexts and unpredictable sizing. Place content directly inside a single AspectRatio."
    }
  ]
};

// src/components/badge.ts
var badgeEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "badge",
  name: "Badge",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A compact status indicator that displays labels, counts, tags, or semantic status using variant-based styling.",
  longDescription: "The Badge component renders as a pill-shaped inline element with six semantic variants (brand, muted, warning, success, destructive, info) and three sizes (sm, md, lg). It supports interactive mode via onClick (renders as <button>), dismissible mode via onDismiss (renders a close button), and the combined interactive + dismissible state (renders sibling buttons inside a group container). All sizes meet WCAG 2.2 minimum target size requirements (24px).",
  tags: [
    "badge",
    "tag",
    "label",
    "status",
    "indicator",
    "counter",
    "chip",
    "pill",
    "notification",
    "filter",
    "category",
    "span"
  ],
  useCases: [
    "Displaying status indicators for success, warning, error, or informational states",
    "Rendering filter chips that can be clicked to apply and dismissed to remove",
    "Showing notification counts or unread indicators on UI elements",
    "Labeling content with category or taxonomy tags",
    "Building dismissible tag lists for user selections or preferences",
    "Creating interactive action badges that trigger callbacks on click"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Badge",
  files: [
    { name: "Badge.tsx", description: "Root component with variant/size styling, interactive/dismissible logic, and accessibility attributes" },
    { name: "types.ts", description: "TypeScript type definitions for BadgeProps, BadgeVariant, and BadgeSize" },
    { name: "index.ts", description: "Barrel export file re-exporting the Badge component and types" },
    { name: "README.md", description: "Component documentation and usage guidelines" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Badge",
  subComponents: [],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "variant",
      type: "BadgeVariant",
      required: false,
      defaultValue: "'brand'",
      description: "Semantic variant controlling background and text colors.",
      options: ["brand", "muted", "warning", "success", "destructive", "info"]
    },
    {
      name: "size",
      type: "BadgeSize",
      required: false,
      defaultValue: "'md'",
      description: "Controls the badge height, padding, and font size. All sizes meet WCAG 2.2 minimum target dimensions.",
      options: ["sm", "md", "lg"]
    },
    {
      name: "as",
      type: "'span' | 'div' | 'a'",
      required: false,
      description: 'Forces a specific HTML element to render. When omitted, the component uses "button" if onClick is provided, otherwise "span".'
    },
    {
      name: "onClick",
      type: "() => void",
      required: false,
      description: "Makes the badge interactive. When provided, the badge renders as a <button> element with hover and active states."
    },
    {
      name: "onDismiss",
      type: "() => void",
      required: false,
      description: "Adds a dismiss button with an X icon. Can be combined with onClick for badges that are both clickable and dismissible."
    },
    {
      name: "dismissLabel",
      type: "string",
      required: false,
      defaultValue: "'Remove'",
      description: "Accessible label for the dismiss button, announced by screen readers."
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: false,
      description: "Content displayed inside the badge \u2014 typically a short text label."
    }
  ],
  rendersAs: "span",
  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: "variant",
    options: ["brand", "muted", "warning", "success", "destructive", "info"],
    default: "brand"
  },
  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: "size",
    options: ["sm", "md", "lg"],
    default: "md"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "variant",
      prop: "variant",
      isBoolean: false,
      values: ["brand", "muted", "warning", "success", "destructive", "info"],
      defaultValue: "'brand'",
      description: "Controls the visual style and semantic meaning. Brand is the primary style, muted de-emphasizes content, and the remaining variants convey status."
    },
    {
      name: "interactive",
      prop: "onClick",
      isBoolean: true,
      defaultValue: "false",
      description: "When onClick is provided, the badge renders as a <button> with cursor-pointer, hover:opacity-90, and active:scale-95 effects."
    },
    {
      name: "dismissible",
      prop: "onDismiss",
      isBoolean: true,
      defaultValue: "false",
      description: "When onDismiss is provided, a close button with an X icon appears. In static mode it sits inline; when combined with onClick, the badge uses a group layout with sibling buttons."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "() => void",
      description: "Fired when the badge (or its main action area in dismissible mode) is clicked. Makes the badge interactive and renders it as a button."
    },
    {
      name: "onDismiss",
      signature: "() => void",
      description: "Fired when the dismiss (X) button is clicked. Typically used to remove the badge from a list via state management."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-label",
        description: 'Applied to the dismiss button. Defaults to "Remove" via dismissLabel prop, and should be overridden to describe what is being removed (e.g. "Remove React tag").',
        managedByComponent: true
      },
      {
        name: 'role="group"',
        description: "Applied to the outer span when the badge is both interactive and dismissible, to semantically group the two sibling button elements.",
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: "Applied to the visual separator span between the action and dismiss buttons (interactive + dismissible mode), since it is purely decorative.",
        managedByComponent: true
      },
      {
        name: 'type="button"',
        description: "Applied to all internal button elements to prevent unintended form submission when the badge is used inside a form.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        behavior: "Moves focus to the badge when interactive (renders as button), or to the dismiss button when dismissible."
      },
      {
        key: "Enter",
        behavior: "Activates the focused button \u2014 triggers onClick on the main action area or onDismiss on the dismiss button."
      },
      {
        key: "Space",
        behavior: "Activates the focused button \u2014 triggers onClick on the main action area or onDismiss on the dismiss button."
      }
    ],
    focusManagement: "All interactive elements (the badge itself when clickable, and the dismiss button) have visible focus rings via focus:ring-2 focus:ring-focus with ring-offset for contrast in both light and dark modes.",
    wcagLevel: "AA",
    notes: 'The sm size meets the WCAG 2.2 minimum target size of 24x24px. When both onClick and onDismiss are provided, the component avoids nesting buttons by rendering sibling buttons inside a span[role="group"], which is the correct ARIA pattern for grouped interactive elements.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: 'Used alongside badges for filter actions, tag management, or "Add tag" UI patterns'
    },
    {
      slug: "typography",
      reason: "Commonly paired with headings or body text to show status next to labels"
    },
    {
      slug: "card",
      reason: "Badges are often placed inside card headers or footers for status indicators"
    },
    {
      slug: "divider",
      reason: "Used between badge groups or to separate badge sections in filter panels"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Badge Variants",
      description: "All six semantic variants displayed side by side.",
      code: `import { Badge } from 'vayu-ui';

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="brand">Brand</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}`,
      tags: ["basic", "variants", "all"]
    },
    {
      title: "Badge Sizes",
      description: "Small (24px), medium (28px), and large (32px) badges.",
      code: `import { Badge } from 'vayu-ui';

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge size="sm" variant="brand">Small (24px)</Badge>
      <Badge size="md" variant="brand">Medium (28px)</Badge>
      <Badge size="lg" variant="brand">Large (32px)</Badge>
    </div>
  );
}`,
      tags: ["basic", "sizes"]
    },
    {
      title: "Interactive Badge",
      description: "Clickable badges that render as buttons with onClick handlers.",
      code: `import { Badge } from 'vayu-ui';

export default function InteractiveBadge() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="info" onClick={() => alert('Badge clicked!')}>
        Click Me
      </Badge>
      <Badge variant="muted" onClick={() => alert('Action triggered!')}>
        Action
      </Badge>
    </div>
  );
}`,
      tags: ["interactive", "clickable"]
    },
    {
      title: "Dismissible Tags",
      description: "Tag list where each badge can be removed via the dismiss button.",
      code: `import { useState } from 'react';
import { Badge } from 'vayu-ui';

export default function DismissibleTags() {
  const [tags, setTags] = useState(['React', 'Tailwind', 'Typescript', 'Next.js']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="muted"
          onDismiss={() => removeTag(tag)}
          dismissLabel={\`Remove \${tag}\`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}`,
      tags: ["dismissible", "tags", "stateful"]
    },
    {
      title: "Interactive + Dismissible Filters",
      description: "Badges that are both clickable (to apply a filter) and dismissible (to remove), rendering as a group with sibling buttons.",
      code: `import { useState } from 'react';
import { Badge } from 'vayu-ui';

export default function FilterBadges() {
  const [filters, setFilters] = useState([
    { id: 'f1', label: 'Active' },
    { id: 'f2', label: 'Verified' },
  ]);

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="brand"
          onClick={() => alert(\`Filter applied: \${filter.label}\`)}
          onDismiss={() => removeFilter(filter.id)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}`,
      tags: ["interactive", "dismissible", "filters", "advanced"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Nesting Badge inside a button or link",
      bad: '<button><Badge variant="success">Active</Badge> Click me</button>',
      good: '<Badge variant="success" onClick={() => handleClick()}>Active</Badge>',
      reason: "Badge already renders as a <button> when onClick is provided. Nesting buttons inside buttons or links creates invalid HTML and breaks keyboard accessibility."
    },
    {
      title: "Using onClick and onDismiss without dismissLabel",
      bad: '<Badge variant="brand" onClick={handleClick} onDismiss={handleDismiss}>Filter</Badge>',
      good: '<Badge variant="brand" onClick={handleClick} onDismiss={handleDismiss} dismissLabel="Remove Filter">Filter</Badge>',
      reason: 'Without a descriptive dismissLabel, the dismiss button announces "Remove" generically to screen readers. Always provide a label that identifies what is being dismissed.'
    },
    {
      title: "Hardcoding colors instead of using variants",
      bad: '<Badge className="bg-red-500 text-white">Error</Badge>',
      good: '<Badge variant="destructive">Error</Badge>',
      reason: "Hardcoding Tailwind colors bypasses the semantic design tokens and breaks dark mode support. Always use the variant prop for consistent theming."
    },
    {
      title: "Passing very long content into Badge",
      bad: '<Badge variant="info">This is a very long descriptive sentence that defeats the purpose of a badge</Badge>',
      good: '<Badge variant="info">Active</Badge>',
      reason: "Badges are designed for short labels (1-3 words). Long content breaks the pill shape, overflows containers, and defeats the visual purpose. Use a Card or Alert for longer messages."
    },
    {
      title: 'Using "as" prop to render interactive elements',
      bad: '<Badge as="a" href="/page" onClick={handleClick}>Link</Badge>',
      good: "<Badge onClick={handleClick}>Link</Badge>  // or use a proper link component",
      reason: 'The "as" prop forces a specific element but does not add appropriate link semantics or attributes. If you need a link, use a proper link component that handles href, accessibility, and routing.'
    }
  ]
};

// src/components/breadcrumb.ts
var breadcrumbEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "breadcrumb",
  name: "Breadcrumb",
  type: "component",
  category: "navigation",
  // ── Description ───────────────────────────────────────
  description: "A navigation trail showing the user's location within a page hierarchy.",
  longDescription: "The Breadcrumb component uses the compound component pattern (Breadcrumb.List, Breadcrumb.Item, Breadcrumb.Link, Breadcrumb.Page, Breadcrumb.Separator, Breadcrumb.Ellipsis) to create an accessible navigation trail. It renders a semantic <nav> with an ordered list following WAI-ARIA breadcrumb patterns, supports custom separators, and provides an ellipsis indicator for collapsed paths.",
  tags: [
    "breadcrumb",
    "navigation",
    "trail",
    "hierarchy",
    "path",
    "nav",
    "wayfinding",
    "sitemap"
  ],
  useCases: [
    "Showing the user's current location within a deep page hierarchy",
    "Providing quick navigation back to parent pages in multi-level sites",
    "Improving SEO with semantic breadcrumb markup that search engines can parse",
    "Helping users understand site structure in documentation or e-commerce pages",
    "Replacing full navigation menus with a compact path indicator in content-heavy layouts"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Breadcrumb",
  files: [
    { name: "Breadcrumb.tsx", description: 'Root navigation container rendering a <nav> with aria-label="breadcrumb"' },
    { name: "BreadCrumbList.tsx", description: "Ordered list wrapper with flex layout for breadcrumb items" },
    { name: "BreadCrumbItem.tsx", description: "List item container for individual breadcrumb entries" },
    { name: "BreadCrumbLink.tsx", description: "Clickable navigation link using Next.js Link with focus-visible styles" },
    { name: "BreadCrumbPage.tsx", description: 'Current page indicator span with aria-current="page"' },
    { name: "BreadCrumbSeparator.tsx", description: "Visual separator between items, defaults to a chevron icon" },
    { name: "BreadcrumbEllipsis.tsx", description: "Overflow indicator for collapsed breadcrumb paths using a MoreHorizontal icon" },
    { name: "types.ts", description: "TypeScript type definitions for all breadcrumb props" },
    { name: "index.ts", description: "Barrel export file re-exporting all sub-components and types" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Breadcrumb",
  subComponents: [
    {
      name: "List",
      fileName: "BreadCrumbList.tsx",
      description: "Ordered list container that wraps all breadcrumb items, separators, and the page indicator",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "BreadcrumbItem, BreadcrumbSeparator, and BreadcrumbEllipsis components"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <ol> element"
        }
      ]
    },
    {
      name: "Item",
      fileName: "BreadCrumbItem.tsx",
      description: "Inline-flex list item that wraps a BreadcrumbLink or BreadcrumbPage",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "BreadcrumbLink or BreadcrumbPage component for this level"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <li> element"
        }
      ]
    },
    {
      name: "Link",
      fileName: "BreadCrumbLink.tsx",
      description: "Clickable navigation link using Next.js Link with WCAG-compliant focus ring and hover styles",
      props: [
        {
          name: "href",
          type: "string",
          required: true,
          description: "URL or path for the breadcrumb link destination"
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Text or content displayed for the link label"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the link element"
        }
      ]
    },
    {
      name: "Page",
      fileName: "BreadCrumbPage.tsx",
      description: 'Non-interactive span marking the current page with aria-current="page"',
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Text label for the current page"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the page span element"
        }
      ]
    },
    {
      name: "Separator",
      fileName: "BreadCrumbSeparator.tsx",
      description: "Visual divider between breadcrumb items; defaults to a ChevronRight icon but accepts custom content",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: false,
          defaultValue: "<ChevronRight />",
          description: "Custom separator content; defaults to a right chevron icon when omitted"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the separator <li> element"
        }
      ]
    },
    {
      name: "Ellipsis",
      fileName: "BreadcrumbEllipsis.tsx",
      description: "Overflow indicator for collapsed breadcrumb paths, rendered as a MoreHorizontal icon with screen reader text",
      props: [
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the ellipsis span element"
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "BreadcrumbList component containing the full breadcrumb trail"
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes applied to the root <nav> element"
    }
  ],
  rendersAs: "nav",
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "current",
      prop: "BreadcrumbPage (aria-current)",
      isBoolean: false,
      values: ["page"],
      defaultValue: "page",
      description: 'The BreadcrumbPage sub-component always renders aria-current="page" to indicate the current location in the trail. All other items are links.'
    },
    {
      name: "collapsed",
      prop: "BreadcrumbEllipsis (presence)",
      isBoolean: true,
      defaultValue: "false",
      description: 'When BreadcrumbEllipsis is present in the list, intermediate breadcrumb levels are collapsed with a "More" indicator. Screen readers announce "More" via sr-only text.'
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick (BreadcrumbLink)",
      signature: "(event: React.MouseEvent<HTMLAnchorElement>) => void",
      description: "Fired when a breadcrumb link is clicked. Handled natively by Next.js Link for client-side navigation."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-label",
        description: 'Applied to the root <nav> element with value "breadcrumb" to identify the navigation landmark.',
        managedByComponent: true
      },
      {
        name: "aria-current",
        description: 'Applied to BreadcrumbPage span with value "page" to indicate the current page in the breadcrumb trail.',
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: 'Applied to BreadcrumbSeparator and BreadcrumbEllipsis with value "true" since they are decorative elements not meant for screen readers.',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        behavior: "Moves focus between BreadcrumbLink elements in order. BreadcrumbPage is not focusable since it represents the current page."
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus backward between BreadcrumbLink elements."
      },
      {
        key: "Enter",
        behavior: "Activates the focused BreadcrumbLink and navigates to the linked page."
      }
    ],
    focusManagement: "BreadcrumbLink elements are naturally focusable via Tab. Focus-visible styles show a ring (focus-visible:ring-2 focus-visible:ring-focus) to indicate the currently focused link. BreadcrumbPage is not focusable.",
    wcagLevel: "AA",
    notes: 'Follows the WAI-ARIA Breadcrumb Pattern. The root <nav> uses aria-label="breadcrumb" for landmark identification. Breadcrumb items use an ordered list (<ol>) for semantic structure. BreadcrumbSeparator and BreadcrumbEllipsis use role="presentation" and aria-hidden="true" to hide decorative content from assistive technologies. An sr-only "More" label is provided for the ellipsis to communicate its purpose to screen readers.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" },
    { name: "tailwind-merge" },
    { name: "lucide-react" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "typography",
      reason: "Commonly used alongside breadcrumbs for page titles and section headings"
    },
    {
      slug: "card",
      reason: "Breadcrumbs are often placed inside Card headers for page-level navigation context"
    },
    {
      slug: "sidebar",
      reason: "Sidebar navigation pairs with breadcrumbs to show both global and hierarchical position"
    },
    {
      slug: "tabs",
      reason: "Tabs and breadcrumbs together provide multi-level navigation within a section"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic Breadcrumb",
      description: "Standard breadcrumb trail with Home > Components > Breadcrumb using the default chevron separator.",
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ["basic", "default", "chevron"]
    },
    {
      title: "Custom Separator",
      description: 'Breadcrumb with a "/" separator passed as children to BreadcrumbSeparator instead of the default chevron icon.',
      code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function CustomSeparatorBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ["custom", "separator", "slash"]
    },
    {
      title: "Collapsed Breadcrumb",
      description: "Breadcrumb with an ellipsis indicator to collapse intermediate levels in deep navigation hierarchies.",
      code: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'vayu-ui';

export default function CollapsedBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
      tags: ["collapsed", "ellipsis", "overflow", "deep"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Making BreadcrumbPage clickable",
      bad: '<BreadcrumbItem><BreadcrumbLink href="/current-page">Current Page</BreadcrumbLink></BreadcrumbItem>',
      good: "<BreadcrumbItem><BreadcrumbPage>Current Page</BreadcrumbPage></BreadcrumbItem>",
      reason: 'The current page in a breadcrumb trail must not be a link \u2014 it should use BreadcrumbPage which renders aria-current="page". Linking to the current page violates WAI-ARIA breadcrumb pattern and confuses screen reader users.'
    },
    {
      title: "Using BreadcrumbLink or BreadcrumbPage outside BreadcrumbList",
      bad: '<Breadcrumb><BreadcrumbLink href="/">Home</BreadcrumbLink></Breadcrumb>',
      good: '<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem></BreadcrumbList></Breadcrumb>',
      reason: "BreadcrumbLink and BreadcrumbPage must be wrapped in BreadcrumbItem and placed inside BreadcrumbList. The semantic structure requires <nav> > <ol> > <li> for proper accessibility."
    },
    {
      title: "Removing the separator between items",
      bad: '<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>',
      good: '<BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>',
      reason: "Omitting BreadcrumbSeparator between items removes the visual delimiter that helps sighted users distinguish breadcrumb levels. Always include a separator between each pair of items."
    },
    {
      title: "Overriding aria-label on the root nav",
      bad: '<Breadcrumb aria-label="site navigation">...</Breadcrumb>',
      good: "<Breadcrumb>...</Breadcrumb>",
      reason: 'The root Breadcrumb already sets aria-label="breadcrumb" which is the standard label for breadcrumb navigation landmarks. Overriding it reduces clarity for screen reader users.'
    },
    {
      title: "Nesting breadcrumb components",
      bad: "<Breadcrumb><BreadcrumbList><BreadcrumbItem><Breadcrumb><BreadcrumbList>...</BreadcrumbList></Breadcrumb></BreadcrumbItem></BreadcrumbList></Breadcrumb>",
      good: "Use a single flat Breadcrumb with BreadcrumbEllipsis to collapse deep hierarchies.",
      reason: "Nesting Breadcrumb components creates invalid HTML (nav inside li inside ol inside nav) and confuses assistive technologies. Use a flat structure with Ellipsis for deep paths."
    }
  ]
};

// src/components/button.ts
var buttonEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "button",
  name: "Button",
  type: "component",
  category: "inputs",
  // ── Description ───────────────────────────────────────
  description: "A versatile button component with variants, sizes, loading states, icon support, and badge notifications using the compound component pattern.",
  longDescription: "The Button component uses the compound component pattern (Button.Icon, Button.Badge, Button.Text) to compose rich button layouts. It supports five visual variants (primary, secondary, outline, ghost, destructive), three sizes (small, medium, large), async loading states with a spinner and customizable loading text, icon placement on either side of the label, and notification badges with absolute or inline positioning. All variants follow WCAG 2.2 AA accessibility standards.",
  tags: [
    "button",
    "click",
    "action",
    "submit",
    "cta",
    "form",
    "interactive",
    "loading",
    "badge",
    "icon",
    "feedback"
  ],
  useCases: [
    "Primary call-to-action buttons for form submissions and page-level actions",
    "Secondary or outline buttons for less prominent actions alongside a primary CTA",
    "Destructive action buttons for delete, remove, or irreversible operations",
    "Async operations that need a loading spinner and disabled state while pending",
    "Icon-only or icon-and-text buttons in toolbars, card headers, or navigation",
    "Notification buttons with badge indicators showing unread counts or status labels"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Button",
  files: [
    { name: "Button.tsx", description: "Root button component with variant styling, loading spinner, and all state management" },
    { name: "ButtonIcon.tsx", description: "Icon wrapper that scales with button size and supports accessible labels" },
    { name: "ButtonBadge.tsx", description: "Notification badge with value overflow, variant coloring, and absolute/inline positioning" },
    { name: "ButtonText.tsx", description: "Text wrapper with truncation support for button labels" },
    { name: "types.ts", description: "TypeScript type definitions for Button, Icon, Badge, and Text props, plus Status enum and variant/size unions" },
    { name: "index.ts", description: "Barrel export file assembling the compound component and re-exporting all types" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Button",
  subComponents: [
    {
      name: "Icon",
      fileName: "ButtonIcon.tsx",
      description: "Wraps an icon element inside the button, scaling it to match the button size and optionally providing an accessible label",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Icon element to render (e.g. a Lucide icon component)"
        },
        {
          name: "size",
          type: "ButtonSize",
          required: false,
          defaultValue: "'small'",
          description: "Controls the icon dimensions: small (16px), medium (20px), large (24px)",
          options: ["small", "medium", "large"]
        },
        {
          name: "label",
          type: "string",
          required: false,
          description: 'Accessible label for the icon; when provided, sets role="img" and aria-label; when omitted, the icon is aria-hidden'
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the icon wrapper span"
        }
      ]
    },
    {
      name: "Badge",
      fileName: "ButtonBadge.tsx",
      description: "Renders a notification badge with numeric or text value, overflow handling, and multiple positioning modes",
      props: [
        {
          name: "value",
          type: "number | string",
          required: false,
          description: "Badge content: a number (with overflow handling) or a custom string label"
        },
        {
          name: "max",
          type: "number",
          required: false,
          defaultValue: "99",
          description: 'Maximum numeric value before displaying "{max}+" overflow text'
        },
        {
          name: "position",
          type: "BadgePosition",
          required: false,
          defaultValue: "'top-right'",
          description: "Badge placement relative to the button",
          options: ["top-right", "top-left", "inline-right", "inline-left"]
        },
        {
          name: "variant",
          type: "BadgeVariant",
          required: false,
          defaultValue: "'danger'",
          description: "Color variant for the badge",
          options: ["primary", "danger", "warning", "info", "success"]
        },
        {
          name: "showZero",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, displays the badge even when the numeric value is 0"
        },
        {
          name: "size",
          type: "ButtonSize",
          required: false,
          defaultValue: "'small'",
          description: "Controls badge dimensions to match button size",
          options: ["small", "medium", "large"]
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the badge span"
        }
      ]
    },
    {
      name: "Text",
      fileName: "ButtonText.tsx",
      description: "Wraps button label text with built-in truncation for overflow handling",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Text content to display as the button label"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the text wrapper span"
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "variant",
      type: "ButtonVariant",
      required: false,
      defaultValue: "'primary'",
      description: "Visual style variant of the button",
      options: ["primary", "secondary", "outline", "ghost", "destructive"]
    },
    {
      name: "size",
      type: "ButtonSize",
      required: false,
      defaultValue: "'small'",
      description: "Button dimensions, padding, and font size",
      options: ["small", "medium", "large"]
    },
    {
      name: "loading",
      type: "Status",
      required: false,
      defaultValue: "Status.IDLE",
      description: "Async loading state controlled by the Status enum: IDLE, PENDING, SUCCESS, REJECTED. PENDING shows a spinner and disables interaction.",
      options: ["idle", "pending", "success", "rejected"]
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "When true, the button stretches to fill the full width of its container"
    },
    {
      name: "loadingText",
      type: "string",
      required: false,
      defaultValue: "'Loading'",
      description: "Text displayed next to the spinner during the PENDING loading state"
    },
    {
      name: "aria-label",
      type: "string",
      required: false,
      description: "Accessible label for the button, especially important for icon-only buttons"
    },
    {
      name: "type",
      type: "'button' | 'submit' | 'reset'",
      required: false,
      defaultValue: "'button'",
      description: 'HTML button type attribute; defaults to "button" to prevent accidental form submission'
    }
  ],
  rendersAs: "button",
  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: "variant",
    options: ["primary", "secondary", "outline", "ghost", "destructive"],
    default: "primary"
  },
  sizes: {
    propName: "size",
    options: ["small", "medium", "large"],
    default: "small"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "loading",
      prop: "loading",
      values: ["idle", "pending", "success", "rejected"],
      isBoolean: false,
      defaultValue: "idle",
      description: "Async operation state. When PENDING, the button shows a spinner, replaces children with loadingText, and disables interaction. SUCCESS and REJECTED can be used to trigger side effects while reverting to normal display."
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "Disables the button. Also automatically true when loading is PENDING, preventing duplicate clicks during async operations."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Fired when the button is clicked and not disabled or in a loading state"
    },
    {
      name: "onFocus",
      signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
      description: "Fired when the button receives focus, which triggers the focus-visible ring"
    },
    {
      name: "onBlur",
      signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
      description: "Fired when the button loses focus"
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLButtonElement>) => void",
      description: "Fired on key press while the button has focus; Enter and Space trigger the native click event"
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "button",
    attributes: [
      {
        name: "aria-disabled",
        description: "Applied when the button is disabled or loading. Set to true alongside the native disabled attribute for screen reader compatibility.",
        managedByComponent: true
      },
      {
        name: "aria-busy",
        description: "Set to true when the button is in the PENDING loading state, signaling to assistive technology that an async operation is in progress.",
        managedByComponent: true
      },
      {
        name: "aria-live",
        description: 'Set to "polite" during loading so screen readers announce the loading state change without interrupting.',
        managedByComponent: true
      },
      {
        name: "aria-label",
        description: "Applied when the aria-label prop is provided. Essential for icon-only buttons that have no visible text content.",
        managedByComponent: false
      },
      {
        name: "aria-hidden (Icon)",
        description: "Set to true on Button.Icon when no label prop is provided, marking decorative icons as hidden from assistive technology.",
        managedByComponent: true
      },
      {
        name: "aria-label (Icon)",
        description: 'Set on Button.Icon when the label prop is provided, giving the icon an accessible name and switching its role to "img".',
        managedByComponent: true
      },
      {
        name: "aria-hidden (Badge content)",
        description: 'The visible badge text is wrapped in aria-hidden="true" to prevent double-reading alongside the Badge role="status" label.',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Enter",
        behavior: "Activates the button (native HTML button behavior)"
      },
      {
        key: "Space",
        behavior: "Activates the button (native HTML button behavior)"
      },
      {
        key: "Tab",
        behavior: "Moves focus to the next focusable element"
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus to the previous focusable element"
      }
    ],
    focusManagement: "Focus-visible ring appears on keyboard focus using focus-visible:ring-2 with ring-offset. The ring color matches the variant (brand for primary, focus for secondary/outline/ghost, destructive for destructive). Pointer clicks do not trigger the ring.",
    wcagLevel: "AA",
    notes: 'The button uses native <button> elements for inherent keyboard and screen reader support. During loading, a screen-reader-only label announces the loadingText while the spinner is aria-hidden. Button.Badge uses role="status" with aria-live="polite" so badge value changes are announced automatically.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "text-input",
      reason: "Commonly paired in forms where the button triggers submission of input data"
    },
    {
      slug: "modal",
      reason: "Buttons are used as trigger elements and footer actions (confirm/cancel) inside modals"
    },
    {
      slug: "card",
      reason: "Cards frequently contain action buttons in their headers or footers"
    },
    {
      slug: "alert",
      reason: "Destructive variant buttons are used alongside alerts for confirmation of critical actions"
    },
    {
      slug: "tooltip",
      reason: "Icon-only buttons benefit from tooltips to provide an accessible text description on hover"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Button Variants",
      description: "All five visual variants displayed side by side: primary, secondary, outline, ghost, and destructive.",
      code: `import { Button } from 'vayu-ui';

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
      tags: ["variants", "primary", "secondary", "outline", "ghost", "destructive"]
    },
    {
      title: "Button Sizes",
      description: "Small, medium, and large button sizes using the secondary variant.",
      code: `import { Button } from 'vayu-ui';

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button size="small" variant="secondary">
        Small
      </Button>
      <Button size="medium" variant="secondary">
        Medium
      </Button>
      <Button size="large" variant="secondary">
        Large
      </Button>
    </div>
  );
}`,
      tags: ["sizes", "small", "medium", "large"]
    },
    {
      title: "Button with Icon",
      description: "Buttons composed with Button.Icon and Button.Text sub-components, demonstrating icon placement on both sides of the label.",
      code: `import { Button } from 'vayu-ui';
import { Mail, Trash2, Send } from 'lucide-react';

export default function IconDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary">
        <Button.Icon>
          <Mail />
        </Button.Icon>
        <Button.Text>Email Login</Button.Text>
      </Button>
      <Button variant="destructive" size="small">
        <Button.Icon size="small">
          <Trash2 />
        </Button.Icon>
        <Button.Text>Delete</Button.Text>
      </Button>
      <Button variant="outline" size="large">
        <Button.Text>Send</Button.Text>
        <Button.Icon size="large">
          <Send />
        </Button.Icon>
      </Button>
    </div>
  );
}`,
      tags: ["icon", "compound", "lucide"]
    },
    {
      title: "Loading State",
      description: "Button with async loading state that shows a spinner and custom loading text during the PENDING state.",
      code: `import { Button, Status } from 'vayu-ui';
import React, { useState } from 'react';

export default function LoadingDemo() {
  const [loading, setLoading] = useState(Status.IDLE);

  const handleClick = () => {
    setLoading(Status.PENDING);
    setTimeout(() => setLoading(Status.SUCCESS), 2000);
    setTimeout(() => setLoading(Status.IDLE), 4000);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button
        variant="primary"
        loading={loading}
        onClick={handleClick}
        loadingText="Sending..."
      >
        Click to Load
      </Button>
    </div>
  );
}`,
      tags: ["loading", "async", "spinner", "status"]
    },
    {
      title: "Button with Badge",
      description: "Buttons with notification badges showing counts, overflow values, and custom string labels in different positions and variants.",
      code: `import { Button } from 'vayu-ui';
import { Bell } from 'lucide-react';

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      <Button variant="secondary">
        <Button.Icon>
          <Bell />
        </Button.Icon>
        <Button.Badge value={3} variant="danger" />
      </Button>

      <Button variant="outline">
        <Button.Text>Messages</Button.Text>
        <Button.Badge value={12} max={9} variant="primary" position="top-right" />
      </Button>

      <Button variant="ghost">
        <Button.Text>Updates</Button.Text>
        <Button.Badge value="New" variant="info" position="inline-right" />
      </Button>
    </div>
  );
}`,
      tags: ["badge", "notification", "count", "compound"]
    },
    {
      title: "Disabled State",
      description: "Buttons in the disabled state across multiple variants, showing the reduced opacity and non-interactive behavior.",
      code: `import { Button } from 'vayu-ui';

export default function DisabledDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  );
}`,
      tags: ["disabled", "states"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Icon-only button without aria-label",
      bad: '<Button variant="ghost"><Button.Icon><Trash2 /></Button.Icon></Button>',
      good: '<Button variant="ghost" aria-label="Delete item"><Button.Icon><Trash2 /></Button.Icon></Button>',
      reason: "Without an aria-label, screen readers announce an unlabeled button or nothing at all. Every button must have an accessible name, either from visible text or an aria-label prop."
    },
    {
      title: 'Using type="submit" on non-form buttons',
      bad: "<Button onClick={handleClick}>Filter</Button>",
      good: '<Button type="button" onClick={handleClick}>Filter</Button>',
      reason: 'While the component defaults to type="button", if you override it to type="submit" outside a form, or forget that the default was previously "submit" in older code, it can cause unexpected page reloads. Always be intentional about the type attribute.'
    },
    {
      title: "Placing interactive elements inside Button",
      bad: '<Button><a href="/link">Go</a></Button><Button><input type="checkbox" /></Button>',
      good: '<Button onClick={() => router.push("/link")}>Go</Button>',
      reason: "Nesting interactive elements (links, inputs, other buttons) inside a <button> violates HTML spec and breaks accessibility. Use the button's onClick handler instead."
    },
    {
      title: "Setting loading to true instead of Status enum",
      bad: "<Button loading={true}>Submit</Button>",
      good: "<Button loading={Status.PENDING}>Submit</Button>",
      reason: "The loading prop expects a Status enum value (idle, pending, success, rejected), not a boolean. Passing true or false will not match any valid state and the button will behave unexpectedly."
    },
    {
      title: "Using Button.Badge or Button.Text outside Button",
      bad: "<div><Button.Badge value={5} /></div>",
      good: '<Button variant="secondary"><Button.Badge value={5} /></Button>',
      reason: `Badge positions like "top-right" and "top-left" use absolute positioning that requires the Button's relative positioning context. Rendering Badge or Text outside a Button breaks layout and visual alignment.`
    }
  ]
};

// src/components/card.ts
var cardEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "card",
  name: "Card",
  type: "component",
  category: "layout",
  // ── Description ───────────────────────────────────────
  description: "A composable card container with header, media, content, and footer sub-components supporting interactive, linked, and disabled states.",
  longDescription: 'The Card component uses the compound component pattern (Card.Header, Card.Media, Card.Content, Card.Footer) to compose rich card layouts. It supports three rendering modes: static (default div), interactive (button-like with keyboard activation), and linked (renders as an anchor tag). Interactive cards get role="button", tabIndex=0, and Enter/Space key support for WCAG 2.1.1 compliance. Linked cards with target="_blank" automatically receive rel="noopener noreferrer" for security. The disabled state reduces opacity and blocks pointer events. Card.Media supports lazy-loaded images with configurable aspect ratio, object-fit, and an overlay layer for gradient text overlays.',
  tags: [
    "card",
    "container",
    "layout",
    "surface",
    "media",
    "interactive",
    "link",
    "content",
    "article",
    "tile"
  ],
  useCases: [
    "Display grouped content with optional media, headers, and footers in a visually contained surface",
    "Create clickable cards for navigation or actions that respond to click, Enter, and Space",
    "Build linked cards that render as anchor tags with automatic security attributes for external links",
    "Show media-rich content with image overlays, aspect ratios, and gradient text layers",
    "Compose profile cards or user listings with avatar, title, subtitle, and action buttons",
    "Present disabled or non-interactive content cards with reduced opacity and blocked pointer events"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Card",
  files: [
    { name: "Card.tsx", description: "Root card component with interactive/link rendering, disabled state, and design token styling" },
    { name: "CardHeader.tsx", description: "Header sub-component with title, subtitle, avatar, and trailing action slot" },
    { name: "CardMedia.tsx", description: "Media sub-component with lazy-loaded image, aspect ratio, object-fit, and gradient overlay support" },
    { name: "CardContent.tsx", description: "Content wrapper sub-component with relaxed text styling" },
    { name: "CardFooter.tsx", description: "Footer sub-component with top border and right-aligned action layout" },
    { name: "types.ts", description: "TypeScript interfaces for Card, CardHeader, CardMedia, CardContent, and CardFooter props" },
    { name: "hooks.ts", description: "useCardKeyboardInteraction hook providing Enter and Space key activation for interactive cards" },
    { name: "index.ts", description: "Barrel export file assembling the compound component and re-exporting all types" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Card",
  subComponents: [
    {
      name: "Header",
      fileName: "CardHeader.tsx",
      description: "Renders a card header row with an optional leading avatar, a title/subtitle block, and a trailing action slot",
      props: [
        {
          name: "title",
          type: "ReactNode",
          required: false,
          description: "Main heading text rendered as an h3 element"
        },
        {
          name: "subtitle",
          type: "ReactNode",
          required: false,
          description: "Secondary text rendered below the title in muted styling"
        },
        {
          name: "action",
          type: "ReactNode",
          required: false,
          description: "Trailing element, typically an icon button or menu trigger, positioned with ml-auto"
        },
        {
          name: "avatar",
          type: "ReactNode",
          required: false,
          description: "Leading element, typically an avatar or icon, rendered in a shrink-0 container with aria-hidden"
        }
      ]
    },
    {
      name: "Media",
      fileName: "CardMedia.tsx",
      description: "Renders a responsive image with configurable aspect ratio, object-fit, and an optional gradient overlay layer",
      props: [
        {
          name: "src",
          type: "string",
          required: true,
          description: "Image source URL"
        },
        {
          name: "alt",
          type: "string",
          required: true,
          description: "Alt text for the image, required for accessibility"
        },
        {
          name: "aspectRatio",
          type: "string",
          required: false,
          defaultValue: "'16/9'",
          description: "CSS aspect-ratio value controlling the media container dimensions"
        },
        {
          name: "fit",
          type: "'cover' | 'contain' | 'fill'",
          required: false,
          defaultValue: "'cover'",
          description: "Object-fit behavior for the image element",
          options: ["cover", "contain", "fill"]
        },
        {
          name: "overlay",
          type: "ReactNode",
          required: false,
          description: "Content rendered on top of the image inside a bottom-aligned gradient overlay"
        }
      ]
    },
    {
      name: "Content",
      fileName: "CardContent.tsx",
      description: "General-purpose content wrapper with relaxed text styling for card body text",
      props: []
    },
    {
      name: "Footer",
      fileName: "CardFooter.tsx",
      description: "Action footer with a top border and right-aligned flex layout for buttons or links",
      props: []
    }
  ],
  hooks: ["useCardKeyboardInteraction"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "interactive",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: 'Makes the entire card a clickable surface with role="button", tabIndex=0, and keyboard activation'
    },
    {
      name: "href",
      type: "string",
      required: false,
      description: "When provided, the card renders as an <a> element instead of a div"
    },
    {
      name: "target",
      type: "AnchorHTMLAttributes<HTMLAnchorElement>['target']",
      required: false,
      description: "Anchor target attribute, forwarded when href is set"
    },
    {
      name: "rel",
      type: "AnchorHTMLAttributes<HTMLAnchorElement>['rel']",
      required: false,
      description: 'Anchor rel attribute. Automatically set to "noopener noreferrer" when target is "_blank"'
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables all interactions: reduces opacity, blocks pointer events, and sets aria-disabled"
    }
  ],
  rendersAs: "div",
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "interactive",
      prop: "interactive",
      isBoolean: true,
      defaultValue: "false",
      description: 'When true, the card becomes focusable and clickable with role="button" and keyboard support via Enter/Space'
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "Reduces opacity to 50%, applies cursor-not-allowed, and disables pointer events. Also prevents link navigation when href is set."
    },
    {
      name: "linked",
      prop: "href",
      isBoolean: false,
      description: "When href is provided, the card renders as an <a> tag instead of a div, enabling link navigation"
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLDivElement>) => void",
      description: 'Fired when the card is clicked. Also triggers the interactive mode (role="button") when no href is set.'
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLDivElement>) => void",
      description: "Fired on key press while the interactive card has focus. Enter and Space trigger the onClick handler via useCardKeyboardInteraction."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "button",
    attributes: [
      {
        name: 'role="button"',
        description: "Applied to interactive cards (when interactive=true or onClick is provided) to signal a clickable surface to assistive technology",
        managedByComponent: true
      },
      {
        name: 'tabIndex="0"',
        description: 'Applied alongside role="button" to make interactive cards keyboard-focusable',
        managedByComponent: true
      },
      {
        name: "aria-disabled",
        description: "Set to true when the disabled prop is active, signaling the non-interactive state to screen readers",
        managedByComponent: true
      },
      {
        name: "aria-hidden (avatar)",
        description: "Applied to the avatar wrapper div in Card.Header to hide decorative avatars from assistive technology",
        managedByComponent: true
      },
      {
        name: 'rel="noopener noreferrer"',
        description: 'Automatically applied when target="_blank" is set to prevent reverse tabnapping security vulnerability',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Enter",
        behavior: "Activates the interactive card by triggering the onClick handler (WCAG 2.1.1)"
      },
      {
        key: "Space",
        behavior: "Activates the interactive card by triggering the onClick handler (WCAG 2.1.1)"
      },
      {
        key: "Tab",
        behavior: "Moves focus to the next focusable element"
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus to the previous focusable element"
      }
    ],
    focusManagement: "Interactive cards receive focus-visible styling (outline ring) only on keyboard navigation via focus-visible:outline-2 with outline-focus token. Pointer clicks do not trigger the focus ring.",
    wcagLevel: "AA",
    notes: 'The card switches rendering between <div>, <div role="button">, and <a> depending on interactive/href props. Linked cards use native <a> semantics for built-in keyboard and screen reader support. Interactive cards use the useCardKeyboardInteraction hook to provide Enter/Space activation matching native button behavior. All images use lazy loading and require alt text via the Media sub-component.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: 'Buttons are commonly placed in Card.Header actions or Card.Footer for CTAs like "Read more" or "Follow"'
    },
    {
      slug: "typography",
      reason: "Typography components provide semantic heading and paragraph text inside Card.Content and Card.Header"
    },
    {
      slug: "badge",
      reason: "Badges can appear in Card.Header to indicate status, category, or notification counts alongside the title"
    },
    {
      slug: "divider",
      reason: "Dividers separate multiple cards or card sections in a list or grid layout"
    },
    {
      slug: "avatar",
      reason: "Avatars are frequently used as the Card.Header avatar prop for profile and user cards"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Default Card with Media",
      description: "A complete card with media image, header, content paragraph, and footer action button.",
      code: `import { Card, Typography, Button } from 'vayu-ui';

export default function DefaultCard() {
  return (
    <Card>
      <Card.Media
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
        alt="Abstract gradient art"
      />
      <Card.Header
        title="Design Tokens"
        subtitle="A unified color palette for every surface."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Ground, primary, secondary, and semantic colors work seamlessly
          across light and dark mode.
        </Typography.P>
      </Card.Content>
      <Card.Footer>
        <Button variant="ghost" size="small">
          Read more \u2192
        </Button>
      </Card.Footer>
    </Card>
  );
}`,
      tags: ["default", "media", "header", "content", "footer"]
    },
    {
      title: "Interactive Card",
      description: 'A clickable card that responds to click, Enter, and Space with role="button" and keyboard focus.',
      code: `import { Card, Typography } from 'vayu-ui';

export default function InteractiveCard() {
  return (
    <Card interactive onClick={() => alert('Clicked!')}>
      <Card.Header
        title="Click Me"
        subtitle="This card is focusable and keyboard-accessible."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Interactive cards get role="button", tabIndex=0, and Enter / Space
          key support.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ["interactive", "click", "keyboard", "button-role"]
    },
    {
      title: "Linked Card",
      description: "A card that renders as an anchor tag, navigating to a URL on click with automatic security attributes.",
      code: `import { Card, Typography } from 'vayu-ui';

export default function LinkedCard() {
  return (
    <Card href="https://github.com" target="_blank">
      <Card.Header
        title="GitHub"
        subtitle='Opens in a new tab with rel="noopener noreferrer".'
      />
    </Card>
  );
}`,
      tags: ["link", "anchor", "navigation", "external"]
    },
    {
      title: "Disabled Card",
      description: "A non-interactive card with reduced opacity and blocked pointer events.",
      code: `import { Card, Typography } from 'vayu-ui';

export default function DisabledCard() {
  return (
    <Card disabled interactive>
      <Card.Header
        title="Disabled Card"
        subtitle="Pointer events are blocked and opacity is reduced."
      />
      <Card.Content>
        <Typography.P variant="secondary">
          This card cannot be interacted with.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ["disabled", "state", "non-interactive"]
    },
    {
      title: "Card with Avatar and Action",
      description: "A profile card using the Header avatar and action slots for a user avatar and follow button.",
      code: `import { Card, Button, Typography } from 'vayu-ui';

export default function AvatarCard() {
  return (
    <Card>
      <Card.Header
        avatar={
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-brand-content font-semibold">
            JD
          </div>
        }
        title="John Doe"
        subtitle="Software Engineer"
        action={
          <Button variant="ghost" size="small">
            Follow
          </Button>
        }
      />
      <Card.Content>
        <Typography.P variant="secondary">
          Building beautiful user interfaces with modern web technologies.
        </Typography.P>
      </Card.Content>
    </Card>
  );
}`,
      tags: ["avatar", "action", "profile", "user"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Nesting interactive elements inside an interactive card",
      bad: '<Card interactive onClick={handleClick}><a href="/link">Link</a></Card>',
      good: '<Card interactive onClick={() => router.push("/link")}><Card.Content>Link text</Card.Content></Card>',
      reason: 'Nesting an <a> or <button> inside an element with role="button" violates HTML spec and creates confusing focus/activation behavior for screen readers.'
    },
    {
      title: "Using onClick without interactive or href",
      bad: "<Card onClick={handleClick}><Card.Content>Click me</Card.Content></Card>",
      good: "<Card interactive onClick={handleClick}><Card.Content>Click me</Card.Content></Card>",
      reason: "While onClick alone triggers the interactive mode internally, explicitly setting interactive makes the intent clear and ensures the card has the correct ARIA role and focus styling from the start."
    },
    {
      title: "Omitting alt on Card.Media",
      bad: '<Card.Media src="/photo.jpg" alt="" />',
      good: '<Card.Media src="/photo.jpg" alt="Team collaborating around a whiteboard" />',
      reason: "The alt prop is required on Card.Media for a reason. Empty or decorative alt text should only be used when the image is purely decorative and adds no informational value. Meaningful alt text is essential for screen reader users."
    },
    {
      title: "Setting both href and onClick",
      bad: '<Card href="/page" onClick={handleClick}>...</Card>',
      good: '<Card href="/page">...</Card>  // use onClick on a Button inside Card.Footer instead',
      reason: "When href is set the card renders as an <a> tag, so onClick conflicts with native link navigation. If you need both, use a linked card for navigation and place action buttons in Card.Footer."
    },
    {
      title: "Using Card without sub-components",
      bad: "<Card><p>Some text</p><button>Action</button></Card>",
      good: "<Card><Card.Content><p>Some text</p></Card.Content><Card.Footer><button>Action</button></Card.Footer></Card>",
      reason: "Bypassing sub-components loses consistent spacing, typography, and layout. Card.Content provides proper text styling and Card.Footer provides the correct border and alignment."
    }
  ]
};

// src/components/checkbox.ts
var checkboxEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "checkbox",
  name: "Checkbox",
  type: "component",
  category: "inputs",
  // ── Description ───────────────────────────────────────
  description: "An accessible checkbox control with support for checked, indeterminate, disabled, and error states using the compound component pattern.",
  longDescription: 'The Checkbox component uses the compound component pattern (Checkbox.Indicator, Checkbox.Label, Checkbox.Description, Checkbox.Error) to build accessible checkbox controls. It supports both controlled and uncontrolled modes, an indeterminate state for "select all" patterns, and form integration via name, value, and required props. Accessibility is handled through a hidden native input element that provides full screen reader support, keyboard interaction, and ARIA attributes like aria-invalid and aria-describedby.',
  tags: [
    "checkbox",
    "input",
    "form",
    "toggle",
    "selection",
    "controlled",
    "uncontrolled",
    "indeterminate",
    "validation",
    "aria",
    "boolean"
  ],
  useCases: [
    "Accepting terms and conditions or privacy policy agreements",
    'Selecting multiple items from a list with a "select all" indeterminate pattern',
    "Tabling feature preferences or notification settings on/off",
    "Collecting boolean consent or confirmation from users in forms",
    "Displaying form validation errors alongside checkbox inputs",
    "Building filter groups with multiple selectable options"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "CheckBox",
  files: [
    { name: "CheckBox.tsx", description: "Root component with controlled/uncontrolled state management and context provider" },
    { name: "CheckBoxIndicator.tsx", description: "Visual checkbox indicator with hidden native input, ARIA attributes, and focus styling" },
    { name: "CheckBoxLabel.tsx", description: "Label element linked to the checkbox input via htmlFor" },
    { name: "CheckBoxDescription.tsx", description: "Helper text linked to the checkbox via aria-describedby" },
    { name: "CheckBoxError.tsx", description: 'Error message with role="alert" and aria-live for screen reader announcements' },
    { name: "hooks.ts", description: "CheckboxContext provider and useCheckboxContext consumer hook" },
    { name: "types.ts", description: "TypeScript type definitions for all component props and context value" },
    { name: "index.ts", description: "Barrel export file assembling the compound component and re-exporting types" },
    { name: "README.md", description: "Component documentation and usage guidelines", optional: true }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Checkbox",
  subComponents: [
    {
      name: "Indicator",
      fileName: "CheckBoxIndicator.tsx",
      description: "Renders a hidden native checkbox input for accessibility, overlaid with a custom visual indicator showing check, minus (indeterminate), or empty states.",
      props: [
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the hidden native input element."
        }
      ]
    },
    {
      name: "Label",
      fileName: "CheckBoxLabel.tsx",
      description: "Renders a label element with htmlFor linked to the checkbox input ID for accessible click-to-toggle behavior.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Label text or inline content describing the checkbox."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the label element."
        }
      ]
    },
    {
      name: "Description",
      fileName: "CheckBoxDescription.tsx",
      description: "Renders helper or descriptive text linked to the checkbox via aria-describedby for screen reader context.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Descriptive text providing additional context about the checkbox."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the description paragraph element."
        }
      ]
    },
    {
      name: "Error",
      fileName: "CheckBoxError.tsx",
      description: 'Renders an error message with role="alert" and aria-live="polite" for immediate screen reader announcement.',
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Error message text describing the validation failure."
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the error paragraph element."
        }
      ]
    }
  ],
  hooks: ["useCheckboxContext"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "checked",
      type: "boolean",
      required: false,
      description: "Controlled checked state. When provided, the component operates in controlled mode and does not manage internal state."
    },
    {
      name: "defaultChecked",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial checked state for uncontrolled mode. Ignored when checked is provided."
    },
    {
      name: "indeterminate",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: 'Shows the indeterminate (minus icon) visual state. Used for "select all" patterns where some but not all items are selected.'
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables the checkbox, preventing user interaction and applying reduced opacity."
    },
    {
      name: "error",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: 'Shows error styling (destructive border) and sets aria-invalid="true" on the input.'
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      required: false,
      description: "Callback fired when the checked state changes. Receives the new boolean value."
    },
    {
      name: "name",
      type: "string",
      required: false,
      description: "Form input name attribute, used for form submission."
    },
    {
      name: "value",
      type: "string",
      required: false,
      description: "Form input value attribute, submitted with form data when checked."
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      description: "Marks the checkbox as required for form validation."
    }
  ],
  rendersAs: "div",
  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — uses fixed sizing and state-based styling
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "checked",
      prop: "checked",
      isBoolean: true,
      defaultValue: "false",
      description: "Whether the checkbox is selected. In controlled mode, set via the checked prop; in uncontrolled mode, managed internally via defaultChecked."
    },
    {
      name: "indeterminate",
      prop: "indeterminate",
      isBoolean: true,
      defaultValue: "false",
      description: "Shows a minus icon instead of a checkmark. Typically used in parent checkboxes to indicate partial selection in a group."
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "Prevents user interaction, applies opacity-50, and sets cursor-not-allowed."
    },
    {
      name: "error",
      prop: "error",
      isBoolean: true,
      defaultValue: "false",
      description: 'Applies destructive border color and sets aria-invalid="true" on the native input for screen reader error indication.'
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onChange",
      signature: "(checked: boolean) => void",
      description: "Fired when the user toggles the checkbox. Receives the new checked state as a boolean. Works in both controlled and uncontrolled modes."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-invalid",
        description: 'Set to "true" when the error prop is true, indicating a validation error to screen readers.',
        managedByComponent: true
      },
      {
        name: "aria-describedby",
        description: "Dynamically built client-side to reference both the error element (when error is true) and the description element (when present), linking them to the input.",
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: 'Set to "true" on the visual indicator div to prevent double-announcement \u2014 the hidden native input handles screen reader output.',
        managedByComponent: true
      },
      {
        name: 'role="alert"',
        description: "Applied to the Error sub-component so screen readers immediately announce validation errors.",
        managedByComponent: true
      },
      {
        name: 'aria-live="polite"',
        description: "Applied to the Error sub-component to announce error changes without interrupting the user.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Space",
        behavior: "Toggles the checkbox checked state. Handled natively by the hidden input element."
      },
      {
        key: "Tab",
        behavior: "Moves focus to or from the checkbox input. Focus ring appears only on keyboard focus via focus-visible."
      }
    ],
    focusManagement: "Focus is managed by the hidden native input element. A custom focus-visible ring (ring-2 ring-focus/20 border-focus) appears only during keyboard navigation, not on mouse click.",
    wcagLevel: "AA",
    notes: 'Uses a hidden native checkbox input for full screen reader and keyboard support. The visual indicator uses aria-hidden="true" to avoid double-announcement. Label is linked via htmlFor for click-to-toggle. Description and error elements are referenced via aria-describedby. Error messages use role="alert" with aria-live="polite" for immediate screen reader feedback.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: 'Used alongside checkboxes in forms for submit actions or "select all" buttons'
    },
    {
      slug: "text-input",
      reason: "Commonly used together in form layouts for mixed input types"
    },
    {
      slug: "badge",
      reason: "Used to show counts or status labels next to checkbox options"
    },
    {
      slug: "typography",
      reason: "Used for section headings and grouping labels above checkbox groups"
    },
    {
      slug: "alert",
      reason: "Used to display form-level validation errors that include checkbox fields"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic Controlled Checkbox",
      description: "A controlled checkbox that manages checked state via React useState.",
      code: `import { Checkbox } from 'vayu-ui';
import { useState } from 'react';

export default function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={setChecked}>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col">
          <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ["basic", "controlled", "state"]
    },
    {
      title: "Uncontrolled with Description",
      description: "An uncontrolled checkbox using defaultChecked with a description for additional context.",
      code: `import { Checkbox } from 'vayu-ui';

export default function DescriptionCheckbox() {
  return (
    <Checkbox>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col gap-1">
          <Checkbox.Label>Marketing emails</Checkbox.Label>
          <Checkbox.Description>
            Receive updates about new products and features
          </Checkbox.Description>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ["uncontrolled", "description", "helper-text"]
    },
    {
      title: "Error State",
      description: "A checkbox displaying validation error styling and an error message.",
      code: `import { Checkbox } from 'vayu-ui';

export default function ErrorCheckbox() {
  return (
    <Checkbox error>
      <div className="flex items-start gap-3">
        <Checkbox.Indicator />
        <div className="flex flex-col gap-1">
          <Checkbox.Label>Required field</Checkbox.Label>
          <Checkbox.Error>You must accept to continue</Checkbox.Error>
        </div>
      </div>
    </Checkbox>
  );
}`,
      tags: ["error", "validation", "required"]
    },
    {
      title: "Indeterminate Select All",
      description: "A parent checkbox with indeterminate state controlling a group of child checkboxes, implementing a select-all pattern.",
      code: `import { Checkbox } from 'vayu-ui';
import { useState } from 'react';

export default function SelectAllCheckbox() {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Notifications']);
  const allItems = ['Notifications', 'Marketing', 'Security updates'];

  const isAllSelected = selectedItems.length === allItems.length;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < allItems.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? allItems : []);
  };

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={handleSelectAll}
      >
        <div className="flex items-center gap-3">
          <Checkbox.Indicator />
          <Checkbox.Label>Select all email preferences</Checkbox.Label>
        </div>
      </Checkbox>

      {allItems.map((item) => (
        <Checkbox
          key={item}
          checked={selectedItems.includes(item)}
          onChange={() => handleItemToggle(item)}
        >
          <div className="flex items-center gap-3 ml-6">
            <Checkbox.Indicator />
            <Checkbox.Label>{item}</Checkbox.Label>
          </div>
        </Checkbox>
      ))}
    </div>
  );
}`,
      tags: ["indeterminate", "select-all", "group", "controlled"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using onChange from HTMLAttributes instead of the Checkbox prop",
      bad: "<Checkbox onChange={(e: React.ChangeEvent) => ...}>...</Checkbox>",
      good: "<Checkbox onChange={(checked: boolean) => ...}>...</Checkbox>",
      reason: "The Checkbox onChange prop receives a boolean (the new checked state), not a React ChangeEvent. The component's types omit the HTML div onChange to prevent this mistake."
    },
    {
      title: "Setting indeterminate via ref on the Checkbox root",
      bad: "const ref = useRef(); ref.current.indeterminate = true; <Checkbox ref={ref}>...</Checkbox>",
      good: "<Checkbox indeterminate={isIndeterminate}>...</Checkbox>",
      reason: "The ref on Checkbox points to the wrapper div, not the input. The indeterminate prop is handled internally via useLayoutEffect on the hidden native input element."
    },
    {
      title: "Using Checkbox.Indicator outside Checkbox",
      bad: "<div><Checkbox.Indicator /></div>",
      good: "<Checkbox><Checkbox.Indicator /></Checkbox>",
      reason: "Checkbox.Indicator reads state from CheckboxContext. Using it outside a Checkbox parent throws an error because useCheckboxContext requires a provider."
    },
    {
      title: "Hardcoding error styling instead of using the error prop",
      bad: '<Checkbox className="border-red-500"><Checkbox.Indicator /><Checkbox.Label>...</Checkbox.Label></Checkbox>',
      good: "<Checkbox error><Checkbox.Indicator /><Checkbox.Label>...</Checkbox.Label></Checkbox>",
      reason: 'Hardcoding colors bypasses the design tokens (destructive) and does not set aria-invalid="true" on the input. Always use the error prop for proper styling and accessibility.'
    }
  ]
};

// src/components/radiogroup.ts
var radioGroupEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "radio-group",
  name: "RadioGroup",
  type: "component",
  category: "inputs",
  // ── Description ───────────────────────────────────────
  description: "An accessible radio group component for single selection from multiple options, supporting controlled and uncontrolled modes, vertical and horizontal layouts, descriptions, error validation, and the compound component pattern.",
  longDescription: "The RadioGroup component uses the compound component pattern (RadioGroup.Item) to compose radio selection interfaces. It supports controlled (via value + onChange) and uncontrolled (via defaultValue) modes, vertical and horizontal orientation, group-level and item-level labels with descriptions, disabled state at both group and item levels, error validation with error text, required field marking, and full WCAG 2.2 AA accessibility with ARIA radiogroup semantics and keyboard navigation.",
  tags: [
    "radio",
    "radiogroup",
    "selection",
    "choice",
    "input",
    "form",
    "option",
    "single-select",
    "controlled",
    "accessible"
  ],
  useCases: [
    "Single-selection form fields where the user must pick exactly one option from a list",
    "Subscription plan or pricing tier selectors with descriptive text per option",
    "Settings or preference panels with mutually exclusive choices (e.g. size, orientation)",
    "Survey or questionnaire forms requiring one answer per question",
    "Filter or sort controls where only one filter can be active at a time",
    "Priority or severity selectors in issue tracking and ticket systems"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "RadioGroup",
  files: [
    {
      name: "RadioGroup.tsx",
      description: "Root radio group component with context provider, label/description/error rendering, and ARIA radiogroup semantics"
    },
    {
      name: "RadioItem.tsx",
      description: "Individual radio item with visual circle indicator, label, description, and hidden native input for accessibility"
    },
    {
      name: "types.ts",
      description: "TypeScript type definitions for RadioGroupProps, RadioItemProps, and RadioGroupContextType"
    },
    {
      name: "hooks.ts",
      description: "Internal React context and useRadioGroup hook for sharing state between group and items"
    },
    {
      name: "index.ts",
      description: "Barrel export file assembling the compound component (RadioGroup.Item) and re-exporting all types"
    }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "RadioGroup",
  subComponents: [
    {
      name: "Item",
      fileName: "RadioItem.tsx",
      description: "Renders a single radio option with a visual circle indicator, label text, optional description, and a hidden native radio input for accessibility",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: "Unique value for this radio item, used as the selected value when chosen"
        },
        {
          name: "label",
          type: "string",
          required: false,
          description: "Display text shown next to the radio circle"
        },
        {
          name: "description",
          type: "string",
          required: false,
          description: "Secondary text displayed below the label for additional context"
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Disables this specific radio item regardless of group disabled state"
        }
      ]
    }
  ],
  hooks: ["useRadioGroup"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled selected value. When provided, the component operates in controlled mode."
    },
    {
      name: "defaultValue",
      type: "string",
      required: false,
      defaultValue: "''",
      description: "Initial selected value for uncontrolled mode. Ignored when value prop is set."
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      required: false,
      description: "Callback fired when the user selects a different radio item. Receives the new value as a string."
    },
    {
      name: "name",
      type: "string",
      required: false,
      description: "Name attribute for the radio inputs. Auto-generates a unique name via useId if not provided."
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables all radio items in the group."
    },
    {
      name: "orientation",
      type: "'vertical' | 'horizontal'",
      required: false,
      defaultValue: "'vertical'",
      description: "Layout direction for the radio items: stacked vertically or arranged horizontally.",
      options: ["vertical", "horizontal"]
    },
    {
      name: "label",
      type: "string",
      required: false,
      description: "Group label text displayed above the radio items."
    },
    {
      name: "description",
      type: "string",
      required: false,
      description: "Descriptive text displayed below the group label."
    },
    {
      name: "error",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Displays the group in an error state with invalid styling and error text."
    },
    {
      name: "errorText",
      type: "string",
      required: false,
      description: "Error message displayed below the radio items when error is true."
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Marks the group as required, showing a visual asterisk and setting aria-required."
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "RadioGroup.Item elements to render as radio options."
    }
  ],
  rendersAs: "div",
  // ── Variants & Sizes ──────────────────────────────────
  // No variants or sizes — the component has orientation but it's not a visual variant
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "orientation",
      prop: "orientation",
      values: ["vertical", "horizontal"],
      isBoolean: false,
      defaultValue: "vertical",
      description: "Layout direction of radio items. Vertical stacks items in a column; horizontal arranges them in a row with wrapping."
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "Disables all radio items in the group. Individual items can also be disabled independently via their own disabled prop."
    },
    {
      name: "error",
      prop: "error",
      isBoolean: true,
      defaultValue: "false",
      description: "Shows an error state with aria-invalid on the radiogroup and displays errorText below the items."
    },
    {
      name: "required",
      prop: "required",
      isBoolean: true,
      defaultValue: "false",
      description: "Marks the group as required with a visual asterisk on the label and aria-required on the radiogroup."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onChange",
      signature: "(value: string) => void",
      description: "Fires when the user selects a different radio item. Receives the value of the newly selected item."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "radiogroup",
    attributes: [
      {
        name: "aria-labelledby",
        description: "References the label element's auto-generated ID to associate the group label with the radiogroup.",
        managedByComponent: true
      },
      {
        name: "aria-describedby",
        description: "References the description and/or error text element IDs to provide additional context to screen readers.",
        managedByComponent: true
      },
      {
        name: "aria-required",
        description: "Set to true when the required prop is true, signaling to assistive technology that a selection is mandatory.",
        managedByComponent: true
      },
      {
        name: "aria-invalid",
        description: "Set to true when the error prop is true, indicating the current selection has a validation error.",
        managedByComponent: true
      },
      {
        name: "aria-label",
        description: "Applied to each hidden native radio input, using the item's label text or falling back to its value.",
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: "Applied to the visual radio circle indicator so decorative elements are not announced by screen readers.",
        managedByComponent: true
      },
      {
        name: 'role="alert"',
        description: 'Applied to the error text container along with aria-live="polite" so validation errors are announced to screen readers.',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        behavior: "Moves focus to the first (or next) radio item in the group"
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus to the previous radio item or out of the group"
      },
      {
        key: "Space",
        behavior: "Selects the focused radio item"
      },
      {
        key: "Enter",
        behavior: "Selects the focused radio item"
      }
    ],
    focusManagement: "Focus rings appear on native radio inputs via peer-focus-visible utilities with ring-2 and ring-focus styling. Visual focus is indicated on the radio circle. Tab navigates into the group; native browser arrow key navigation moves between items within the group.",
    wcagLevel: "AA",
    notes: 'Uses hidden native <input type="radio"> elements for inherent accessibility and browser arrow-key navigation. The visual circle is aria-hidden. Each input gets a unique id via the group name and item value. The group container has role="radiogroup" with proper aria-labelledby and aria-describedby associations. Error messages use role="alert" with aria-live="polite" for automatic announcement.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: "clsx" }],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "checkbox",
      reason: "Checkboxes are the multi-select counterpart to radio groups in forms requiring both single and multiple selection"
    },
    {
      slug: "text-input",
      reason: "Often used together in forms where radio selects a category and text input provides additional detail"
    },
    {
      slug: "button",
      reason: "Form submission buttons commonly appear alongside radio groups in complete form layouts"
    },
    {
      slug: "card",
      reason: "Radio groups are frequently placed inside cards for settings panels and preference selections"
    },
    {
      slug: "alert",
      reason: "Used together to display validation feedback when a required radio group is submitted without selection"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic RadioGroup",
      description: "A controlled radio group for selecting a subscription plan with descriptive text per option.",
      code: `import { RadioGroup } from 'vayu-ui';
import { useState } from 'react';

export default function BasicDemo() {
  const [plan, setPlan] = useState('pro');

  return (
    <RadioGroup
      label="Subscription Plan"
      description="Choose the plan that fits your needs."
      value={plan}
      onChange={setPlan}
      required
    >
      <RadioGroup.Item
        value="free"
        label="Free"
        description="Basic features, limited storage."
      />
      <RadioGroup.Item
        value="pro"
        label="Pro"
        description="All features, 100GB storage."
      />
      <RadioGroup.Item
        value="enterprise"
        label="Enterprise"
        description="Unlimited everything, priority support."
      />
    </RadioGroup>
  );
}`,
      tags: ["basic", "controlled", "description", "required"]
    },
    {
      title: "Horizontal Layout",
      description: "Radio buttons arranged horizontally using the orientation prop.",
      code: `import { RadioGroup } from 'vayu-ui';
import { useState } from 'react';

export default function HorizontalDemo() {
  const [size, setSize] = useState('');

  return (
    <RadioGroup
      label="Size"
      description="Select your preferred size."
      orientation="horizontal"
      value={size}
      onChange={setSize}
    >
      <RadioGroup.Item value="sm" label="Small" />
      <RadioGroup.Item value="md" label="Medium" />
      <RadioGroup.Item value="lg" label="Large" />
      <RadioGroup.Item value="xl" label="X-Large" />
    </RadioGroup>
  );
}`,
      tags: ["horizontal", "orientation", "layout"]
    },
    {
      title: "Error State with Disabled Item",
      description: "A radio group showing validation error styling with one disabled option.",
      code: `import { RadioGroup } from 'vayu-ui';

export default function ErrorDemo() {
  return (
    <RadioGroup
      label="Priority"
      description="Select a priority level for your ticket."
      error
      errorText="Please select a priority level."
    >
      <RadioGroup.Item value="low" label="Low" />
      <RadioGroup.Item value="medium" label="Medium" />
      <RadioGroup.Item value="high" label="High" disabled />
    </RadioGroup>
  );
}`,
      tags: ["error", "validation", "disabled", "error-text"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using RadioGroup.Item outside a RadioGroup",
      bad: '<div><RadioGroup.Item value="a" label="Option A" /></div>',
      good: '<RadioGroup onChange={handleChange}><RadioGroup.Item value="a" label="Option A" /></RadioGroup>',
      reason: "RadioGroup.Item relies on the RadioGroup context (useRadioGroup) for shared value, onChange, name, and disabled state. Rendering it outside a RadioGroup throws an error."
    },
    {
      title: "Mixing controlled and uncontrolled props",
      bad: '<RadioGroup value="a" defaultValue="b" onChange={fn}>...</RadioGroup>',
      good: '<RadioGroup value="a" onChange={fn}>...</RadioGroup>',
      reason: "Providing both value and defaultValue is contradictory. Use value + onChange for controlled mode, or defaultValue alone for uncontrolled mode. When value is provided, defaultValue is ignored."
    },
    {
      title: "Duplicate item values in the same group",
      bad: '<RadioGroup><RadioGroup.Item value="a" /><RadioGroup.Item value="a" /></RadioGroup>',
      good: '<RadioGroup><RadioGroup.Item value="option-1" /><RadioGroup.Item value="option-2" /></RadioGroup>',
      reason: "Each RadioGroup.Item must have a unique value within its group. Duplicate values cause incorrect selection behavior and broken accessibility (duplicate IDs on native inputs)."
    },
    {
      title: "Using for multi-select instead of Checkbox",
      bad: '<RadioGroup><RadioGroup.Item value="a" /><RadioGroup.Item value="b" /></RadioGroup> // user expects to select both',
      good: "Use Checkbox components for multi-select scenarios. RadioGroup is for single selection only.",
      reason: "Radio buttons are semantically for mutually exclusive single selection. If users need to select multiple options, use individual Checkbox components instead."
    },
    {
      title: "Omitting value prop on RadioGroup.Item",
      bad: '<RadioGroup><RadioGroup.Item label="Option A" /></RadioGroup>',
      good: '<RadioGroup><RadioGroup.Item value="a" label="Option A" /></RadioGroup>',
      reason: "The value prop is required on every RadioGroup.Item. Without it, the item cannot be identified as selected, the native input has no value, and the auto-generated ID will be broken."
    }
  ]
};

// src/components/skeleton.ts
var skeletonEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "skeleton",
  name: "Skeleton",
  type: "component",
  category: "feedback",
  // ── Description ───────────────────────────────────────
  description: "A loading placeholder system with compound sub-components for text, avatars, cards, lists, tables, and grids, supporting pulse, wave, and static animations.",
  longDescription: "The Skeleton component provides a comprehensive loading placeholder system using the compound component pattern. It includes 11 sub-components: Root (accessible wrapper with ARIA live region), Item (core primitive with variant/animation/count), Text (multi-line text placeholder), Circle (circular avatar/icon placeholder), Rectangle (configurable rectangular placeholder), Card (image + title + lines), Avatar (circle + text lines), List (repeated avatar + text rows), Table (header + grid of rows/columns), Grid (grid of rectangular items), and Group (spacing wrapper). All animations respect prefers-reduced-motion via motion-reduce:animate-none.",
  tags: [
    "skeleton",
    "loading",
    "placeholder",
    "shimmer",
    "pulse",
    "wave",
    "spinner",
    "avatar",
    "card",
    "table",
    "list",
    "grid",
    "feedback",
    "progress",
    "div"
  ],
  useCases: [
    "Showing content loading placeholders while async data is being fetched",
    "Displaying text content loading states with configurable line counts and widths",
    "Rendering avatar and profile information loading placeholders in various sizes",
    "Building card layout loading states with optional image areas",
    "Creating table and data grid loading placeholders with configurable dimensions",
    "Providing accessible loading feedback with ARIA live regions for screen readers",
    "Composing custom loading layouts using Item, Circle, Rectangle, and Group primitives"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Skeleton",
  files: [
    { name: "index.ts", description: "Barrel export with compound component Object.assign pattern" },
    { name: "types.ts", description: "TypeScript type definitions for all Skeleton props interfaces and unions" },
    { name: "config.ts", description: "Size/animation class mappings and helper functions for variant styling" },
    { name: "SkeletonRoot.tsx", description: "Root wrapper component with ARIA live region, aria-busy, and configurable aria-label" },
    { name: "SkeletonItem.tsx", description: "Core rendering primitive supporting variant, animation, count, and custom dimensions" },
    { name: "SkeletonPrimitives.tsx", description: "Text, Circle, and Rectangle wrapper components built on SkeletonItem" },
    { name: "SkeletonComposites.tsx", description: "Pre-built composite components: Card, Avatar, List, Table, Grid, and Group" },
    { name: "README.md", description: "Component documentation and usage guidelines" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Skeleton",
  subComponents: [
    {
      name: "Root",
      fileName: "SkeletonRoot.tsx",
      description: 'Accessible wrapper with ARIA live region, aria-busy="true", and configurable aria-label. Use to wrap skeleton content for screen reader announcements.',
      props: [
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style applied to all child skeleton elements.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Default size propagated to child skeleton elements.",
          options: ["sm", "md", "lg", "xl"]
        },
        {
          name: "aria-label",
          type: "string",
          required: false,
          defaultValue: "'Loading'",
          description: "Accessible label announced by screen readers to describe the loading state."
        },
        {
          name: "aria-live",
          type: "'polite' | 'assertive' | 'off'",
          required: false,
          defaultValue: "'polite'",
          description: 'ARIA live region politeness setting. Use "polite" for non-urgent updates, "assertive" for critical content.'
        }
      ]
    },
    {
      name: "Item",
      fileName: "SkeletonItem.tsx",
      description: "Core rendering primitive with variant, animation, count, and custom dimensions. Use for custom placeholder shapes.",
      props: [
        {
          name: "variant",
          type: "SkeletonVariant",
          required: false,
          defaultValue: "'text'",
          description: "Shape variant controlling the rendered placeholder style.",
          options: ["text", "circular", "rectangular", "rounded"]
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for the placeholder element.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "width",
          type: "string | number",
          required: false,
          description: 'Explicit width override. Accepts CSS values (e.g. "100%", "200px") or numbers (treated as px).'
        },
        {
          name: "height",
          type: "string | number",
          required: false,
          description: 'Explicit height override. Accepts CSS values (e.g. "48px") or numbers (treated as px).'
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Predefined size controlling dimensions when width/height are not set.",
          options: ["sm", "md", "lg", "xl"]
        },
        {
          name: "count",
          type: "number",
          required: false,
          defaultValue: "1",
          description: "Number of identical skeleton items to render. Useful for repeating placeholder elements."
        }
      ]
    },
    {
      name: "Text",
      fileName: "SkeletonPrimitives.tsx",
      description: "Multi-line text placeholder with configurable line count, widths, and trailing line width.",
      props: [
        {
          name: "lines",
          type: "number",
          required: false,
          defaultValue: "1",
          description: "Number of text lines to render. The last line can have a different width via lastLineWidth."
        },
        {
          name: "width",
          type: "string | number",
          required: false,
          description: "Width for all text lines. Overrides the default 100% width."
        },
        {
          name: "lastLineWidth",
          type: "string | number",
          required: false,
          description: "Width of the last line to create a more natural text appearance. Defaults to a partial width."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for each text line.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Controls text line height: sm (h-3), md (h-4), lg (h-5), xl (h-6).",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Circle",
      fileName: "SkeletonPrimitives.tsx",
      description: "Circular placeholder for avatars and icons. Renders as a perfect circle with size-based dimensions.",
      props: [
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Circle diameter: sm (w-8 h-8), md (w-12 h-12), lg (w-16 h-16), xl (w-24 h-24).",
          options: ["sm", "md", "lg", "xl"]
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for the circle.",
          options: ["pulse", "wave", "none"]
        }
      ]
    },
    {
      name: "Rectangle",
      fileName: "SkeletonPrimitives.tsx",
      description: "Rectangular placeholder with optional rounded corners and custom dimensions.",
      props: [
        {
          name: "width",
          type: "string | number",
          required: false,
          description: "Explicit width. Defaults to 100% when not provided."
        },
        {
          name: "height",
          type: "string | number",
          required: false,
          description: "Explicit height. Falls back to size-based height when not provided."
        },
        {
          name: "rounded",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Applies rounded-surface border radius to the rectangle."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for the rectangle.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Predefined height when height prop is not set: sm (h-20), md (h-32), lg (h-48), xl (h-64).",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Card",
      fileName: "SkeletonComposites.tsx",
      description: "Pre-built card loading placeholder with optional image area, title line, and body text lines.",
      props: [
        {
          name: "showImage",
          type: "boolean",
          required: false,
          defaultValue: "true",
          description: "Whether to render the image placeholder area at the top of the card."
        },
        {
          name: "imageHeight",
          type: "number",
          required: false,
          defaultValue: "200",
          description: "Height of the image placeholder area in pixels."
        },
        {
          name: "lines",
          type: "number",
          required: false,
          defaultValue: "3",
          description: "Number of text lines in the card body."
        },
        {
          name: "titleWidth",
          type: "string | number",
          required: false,
          defaultValue: "'60%'",
          description: "Width of the title line to simulate a realistic heading."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for all card skeleton elements.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Size applied to text and image elements within the card.",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Avatar",
      fileName: "SkeletonComposites.tsx",
      description: "Avatar loading placeholder with a circle and adjacent text lines for name and subtitle.",
      props: [
        {
          name: "showText",
          type: "boolean",
          required: false,
          defaultValue: "true",
          description: "Whether to render text lines next to the avatar circle."
        },
        {
          name: "textLines",
          type: "number",
          required: false,
          defaultValue: "2",
          description: "Number of text lines displayed beside the avatar."
        },
        {
          name: "titleWidth",
          type: "string | number",
          required: false,
          defaultValue: "'40%'",
          description: "Width of the first text line (simulating a name)."
        },
        {
          name: "subtitleWidth",
          type: "string | number",
          required: false,
          defaultValue: "'60%'",
          description: "Width of the second text line (simulating a subtitle or role)."
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Avatar circle size: sm (w-8), md (w-12), lg (w-16), xl (w-24).",
          options: ["sm", "md", "lg", "xl"]
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for the avatar and text elements.",
          options: ["pulse", "wave", "none"]
        }
      ]
    },
    {
      name: "List",
      fileName: "SkeletonComposites.tsx",
      description: "List loading placeholder with repeated rows, each containing an optional avatar and text lines.",
      props: [
        {
          name: "items",
          type: "number",
          required: false,
          defaultValue: "5",
          description: "Number of list item rows to render."
        },
        {
          name: "showAvatar",
          type: "boolean",
          required: false,
          defaultValue: "true",
          description: "Whether each row includes a circular avatar placeholder."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for all list skeleton elements.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Size applied to avatar circles and text lines within each row.",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Table",
      fileName: "SkeletonComposites.tsx",
      description: "Table loading placeholder with optional header row and configurable rows/columns grid.",
      props: [
        {
          name: "rows",
          type: "number",
          required: false,
          defaultValue: "5",
          description: "Number of data rows in the table body."
        },
        {
          name: "columns",
          type: "number",
          required: false,
          defaultValue: "4",
          description: "Number of columns in each row."
        },
        {
          name: "showHeader",
          type: "boolean",
          required: false,
          defaultValue: "true",
          description: "Whether to render a header row at the top of the table."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for all table skeleton elements.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Size applied to each cell within the table.",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Grid",
      fileName: "SkeletonComposites.tsx",
      description: "Grid loading placeholder with configurable item count, columns, and item height.",
      props: [
        {
          name: "items",
          type: "number",
          required: false,
          defaultValue: "6",
          description: "Total number of grid items to render."
        },
        {
          name: "columns",
          type: "number",
          required: false,
          defaultValue: "3",
          description: "Number of columns in the CSS grid layout."
        },
        {
          name: "itemHeight",
          type: "number",
          required: false,
          defaultValue: "200",
          description: "Height of each grid item in pixels."
        },
        {
          name: "animation",
          type: "SkeletonAnimation",
          required: false,
          defaultValue: "'pulse'",
          description: "Animation style for all grid items.",
          options: ["pulse", "wave", "none"]
        },
        {
          name: "size",
          type: "SkeletonSize",
          required: false,
          defaultValue: "'md'",
          description: "Size applied to each grid item.",
          options: ["sm", "md", "lg", "xl"]
        }
      ]
    },
    {
      name: "Group",
      fileName: "SkeletonComposites.tsx",
      description: "Spacing wrapper for grouping multiple skeleton elements with consistent gap spacing.",
      props: [
        {
          name: "spacing",
          type: "'sm' | 'md' | 'lg'",
          required: false,
          defaultValue: "'md'",
          description: "Gap spacing between grouped skeleton elements.",
          options: ["sm", "md", "lg"]
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "animation",
      type: "SkeletonAnimation",
      required: false,
      defaultValue: "'pulse'",
      description: "Default animation style propagated to child skeleton elements.",
      options: ["pulse", "wave", "none"]
    },
    {
      name: "size",
      type: "SkeletonSize",
      required: false,
      defaultValue: "'md'",
      description: "Default size propagated to child skeleton elements.",
      options: ["sm", "md", "lg", "xl"]
    },
    {
      name: "aria-label",
      type: "string",
      required: false,
      defaultValue: "'Loading'",
      description: "Accessible label for the loading region, announced by screen readers."
    },
    {
      name: "aria-live",
      type: "'polite' | 'assertive' | 'off'",
      required: false,
      defaultValue: "'polite'",
      description: "ARIA live region politeness setting for the skeleton container."
    }
  ],
  rendersAs: "div",
  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: "variant",
    options: ["text", "circular", "rectangular", "rounded"],
    default: "text"
  },
  // ── Sizes ─────────────────────────────────────────────
  sizes: {
    propName: "size",
    options: ["sm", "md", "lg", "xl"],
    default: "md"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "animation",
      prop: "animation",
      isBoolean: false,
      values: ["pulse", "wave", "none"],
      defaultValue: "'pulse'",
      description: "Controls the loading animation style. Pulse fades opacity in and out, wave applies a shimmer sweep effect, and none renders a static placeholder. All animations respect prefers-reduced-motion."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "status",
    attributes: [
      {
        name: 'role="status"',
        description: "Applied to Skeleton.Root to create an ARIA live region that announces loading state changes to screen readers.",
        managedByComponent: true
      },
      {
        name: "aria-live",
        description: 'Applied to Skeleton.Root. Defaults to "polite" so loading announcements do not interrupt the user. Configurable via the aria-live prop.',
        managedByComponent: true
      },
      {
        name: 'aria-busy="true"',
        description: "Applied to Skeleton.Root to indicate the region is currently being updated and content is not yet available.",
        managedByComponent: true
      },
      {
        name: "aria-label",
        description: 'Applied to Skeleton.Root. Defaults to "Loading" and should be overridden to describe what is loading (e.g. "Loading user profile").',
        managedByComponent: true
      },
      {
        name: 'aria-hidden="true"',
        description: "Applied to all skeleton items (Item, Text, Circle, Rectangle, Card, Avatar, List, Table, Grid) since they are visual-only and not meaningful to screen readers.",
        managedByComponent: true
      },
      {
        name: "tabIndex={-1}",
        description: "Applied to Skeleton.Item to remove it from the keyboard tab order, since skeleton elements are non-interactive.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [],
    focusManagement: 'Skeleton elements are removed from the tab order via tabIndex={-1} and marked aria-hidden="true". The Root wrapper uses role="status" with aria-live for screen reader announcements without requiring focus.',
    wcagLevel: "AA",
    notes: "All animations respect prefers-reduced-motion via Tailwind's motion-reduce:animate-none class. The Root component includes a screen-reader-only text node with the aria-label value. For best accessibility, always wrap skeleton content in Skeleton.Root rather than using standalone items."
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "card",
      reason: "Skeleton.Card is used to show loading states before the actual Card component renders with data"
    },
    {
      slug: "button",
      reason: "Commonly paired with skeleton loading to provide refresh or retry actions alongside loading placeholders"
    },
    {
      slug: "typography",
      reason: "Skeleton.Text mirrors the layout of Typography components, making them natural companions for loading text content"
    },
    {
      slug: "badge",
      reason: "Skeleton items can be used to show loading states for badge-based status indicators before data loads"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Text Skeleton",
      description: "Multi-line text loading placeholder with configurable line count.",
      code: `import { Skeleton } from 'vayu-ui';

export default function TextSkeleton() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Skeleton.Text lines={3} animation="pulse" />
    </div>
  );
}`,
      tags: ["basic", "text", "loading"]
    },
    {
      title: "Avatar Skeleton Sizes",
      description: "Avatar loading placeholders in all four sizes.",
      code: `import { Skeleton } from 'vayu-ui';

export default function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-6">
      <Skeleton.Avatar size="sm" animation="pulse" />
      <Skeleton.Avatar size="md" animation="pulse" />
      <Skeleton.Avatar size="lg" animation="pulse" />
      <Skeleton.Avatar size="xl" animation="pulse" />
    </div>
  );
}`,
      tags: ["basic", "avatar", "sizes"]
    },
    {
      title: "Card Skeleton",
      description: "Card loading placeholders with and without image areas.",
      code: `import { Skeleton } from 'vayu-ui';

export default function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton.Card animation="pulse" />
      <Skeleton.Card showImage={false} animation="pulse" />
    </div>
  );
}`,
      tags: ["card", "loading", "grid"]
    },
    {
      title: "Table Skeleton",
      description: "Table loading placeholder with configurable rows and columns.",
      code: `import { Skeleton } from 'vayu-ui';

export default function TableSkeleton() {
  return (
    <Skeleton.Table rows={4} columns={3} animation="pulse" />
  );
}`,
      tags: ["table", "data", "loading"]
    },
    {
      title: "Accessible Root Wrapper",
      description: "Using Skeleton.Root as an accessible wrapper with ARIA live region for screen readers.",
      code: `import { Skeleton } from 'vayu-ui';

export default function AccessibleSkeleton() {
  return (
    <Skeleton.Root animation="pulse" aria-label="Loading user profile">
      <Skeleton.Text lines={2} animation="pulse" />
    </Skeleton.Root>
  );
}`,
      tags: ["accessible", "root", "aria"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using skeleton items without Skeleton.Root",
      bad: "<Skeleton.Text lines={3} />",
      good: '<Skeleton.Root aria-label="Loading content"><Skeleton.Text lines={3} /></Skeleton.Root>',
      reason: "Without Skeleton.Root, the loading state has no ARIA live region or aria-busy indicator. Screen readers cannot detect or announce that content is loading, violating WCAG accessibility requirements."
    },
    {
      title: "Hardcoding pixel dimensions instead of using size prop",
      bad: '<Skeleton.Item variant="circular" width={48} height={48} />',
      good: '<Skeleton.Circle size="md" />',
      reason: "Hardcoding dimensions bypasses the size system and creates inconsistency across the UI. The size prop ensures all skeleton elements scale together and match the design tokens."
    },
    {
      title: "Showing skeleton and content simultaneously",
      bad: "<div><Skeleton.Text lines={2} /><p>Actual content</p></div>",
      good: "{isLoading ? <Skeleton.Text lines={2} /> : <p>Actual content</p>}",
      reason: 'Skeletons are decorative placeholders with aria-hidden="true". Rendering them alongside real content doubles visual noise and confuses assistive technology about which content is meaningful.'
    },
    {
      title: "Leaving skeletons visible permanently",
      bad: "<div>{data ? <Content /> : <Skeleton.Card />}</div>",
      good: "<div>{isLoading ? <Skeleton.Card /> : data ? <Content /> : <EmptyState />}</div>",
      reason: "Skeletons are transient loading indicators, not fallback content. If data fails to load, show an error or empty state instead. Permanently visible skeletons suggest the page is broken."
    },
    {
      title: "Overriding animation with custom CSS",
      bad: '<Skeleton.Text className="animate-bounce" />',
      good: '<Skeleton.Text animation="wave" />',
      reason: "The animation prop provides three designed animation options that respect prefers-reduced-motion. Custom CSS animations may not honor reduced-motion preferences and can cause accessibility violations."
    }
  ]
};

// src/components/switch.ts
var switchEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "switch",
  name: "Switch",
  type: "component",
  category: "inputs",
  // ── Description ───────────────────────────────────────
  description: "An accessible toggle switch with controlled/uncontrolled modes, label and description support, error states, and WCAG 2.2 AA compliance.",
  longDescription: 'The Switch component renders a binary toggle control using a hidden native checkbox input with role="switch" for full accessibility. It supports both controlled mode (via checked + onCheckedChange) and uncontrolled mode (via defaultChecked). Optional label and description props render adjacent text linked to the input via aria-labelledby and aria-describedby. The visual track and thumb are rendered by internal SwitchTrack and SwitchLabel sub-components that are not user-facing. An error prop applies destructive styling and sets aria-invalid on the input. Focus-visible styling meets WCAG 2.2 AA requirements.',
  tags: [
    "switch",
    "toggle",
    "input",
    "form",
    "on-off",
    "controlled",
    "uncontrolled",
    "boolean",
    "settings",
    "aria"
  ],
  useCases: [
    "Toggling binary settings like dark mode, notifications, or auto-save preferences",
    "Building controlled form inputs that report on/off state to a parent component",
    "Displaying feature flags or preference toggles with label and description text",
    "Showing error states for failed preference saves or validation failures",
    "Creating interactive settings panels with multiple independent toggle controls"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Switch",
  files: [
    { name: "Switch.tsx", description: "Root component with controlled/uncontrolled state wiring and accessibility attributes" },
    { name: "SwitchTrack.tsx", description: "Visual track and thumb with checked, disabled, and error styling using design tokens" },
    { name: "SwitchLabel.tsx", description: "Label and description text with proper ARIA ID linking and disabled/error states" },
    { name: "hooks.ts", description: "useSwitchControl hook managing controlled and uncontrolled toggle state" },
    { name: "types.ts", description: "TypeScript type definitions for SwitchProps" },
    { name: "index.ts", description: "Barrel export file re-exporting the component and its types" },
    { name: "README.md", description: "Component documentation and usage guidelines", optional: true }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Switch",
  subComponents: [],
  hooks: ["useSwitchControl"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "label",
      type: "ReactNode",
      required: false,
      description: "Label text displayed next to the switch. Automatically linked to the input via aria-labelledby."
    },
    {
      name: "description",
      type: "ReactNode",
      required: false,
      description: "Description text displayed below the label. Linked to the input via aria-describedby for screen reader context."
    },
    {
      name: "error",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Shows error styling (destructive ring on track) and sets aria-invalid on the input."
    },
    {
      name: "checked",
      type: "boolean",
      required: false,
      description: "Controlled state value. When provided, the component operates in controlled mode and does not manage internal state."
    },
    {
      name: "defaultChecked",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial checked state for uncontrolled mode. Ignored when checked is provided."
    },
    {
      name: "onCheckedChange",
      type: "(checked: boolean) => void",
      required: false,
      description: "Callback fired when the switch state changes. Receives the new boolean value. Works in both controlled and uncontrolled modes."
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables the switch, preventing user interaction and applying reduced opacity."
    }
  ],
  rendersAs: "div",
  // ── Variants & Sizes ──────────────────────────────────
  // No variant or size props — uses fixed sizing and state-based styling
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "checked",
      prop: "checked",
      isBoolean: true,
      defaultValue: "false",
      description: "Whether the switch is on. In controlled mode, set via the checked prop; in uncontrolled mode, managed internally via defaultChecked."
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "Prevents user interaction, applies opacity-50, and sets cursor-not-allowed on the label and track."
    },
    {
      name: "error",
      prop: "error",
      isBoolean: true,
      defaultValue: "false",
      description: 'Applies destructive ring on the unchecked track and sets aria-invalid="true" on the hidden input.'
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onCheckedChange",
      signature: "(checked: boolean) => void",
      description: "Fired when the user toggles the switch. Receives the new checked state as a boolean. Does not fire when disabled."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "switch",
    attributes: [
      {
        name: "aria-checked",
        description: "Reflects the current on/off state of the switch. Set to true when checked, false when unchecked.",
        managedByComponent: true
      },
      {
        name: "aria-invalid",
        description: 'Set to "true" when the error prop is true, indicating a validation error to screen readers.',
        managedByComponent: true
      },
      {
        name: "aria-labelledby",
        description: "Automatically references the label element ID when a label prop is provided.",
        managedByComponent: true
      },
      {
        name: "aria-describedby",
        description: "Automatically references the description element ID when a description prop is provided.",
        managedByComponent: true
      },
      {
        name: "aria-hidden",
        description: 'Set to "true" on the visual track element to prevent double-announcement \u2014 the hidden native input handles screen reader output.',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Space",
        behavior: "Toggles the switch on/off. Handled natively by the hidden checkbox input."
      },
      {
        key: "Tab",
        behavior: "Moves focus to or from the switch input. Focus ring appears only on keyboard focus via focus-visible."
      }
    ],
    focusManagement: "Focus is managed by the hidden native input element. A custom focus-visible ring (ring-2 ring-focus ring-offset-2 ring-offset-canvas) appears only during keyboard navigation.",
    wcagLevel: "AA",
    notes: 'Uses a hidden native checkbox input with role="switch" for full screen reader and keyboard support. The visual track uses aria-hidden="true" to avoid double-announcement. Label and description are linked via generated IDs and aria-labelledby/aria-describedby. An auto-generated ID (via useId) ensures unique associations even with multiple switch instances on the same page.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "checkbox",
      reason: "Used alongside switches in settings forms for multi-select vs toggle patterns"
    },
    {
      slug: "button",
      reason: "Used to submit forms containing switch toggles or as external toggle controls"
    },
    {
      slug: "typography",
      reason: "Used for section headings and grouping labels above switch groups"
    },
    {
      slug: "alert",
      reason: "Used to display form-level validation errors that include switch fields"
    },
    {
      slug: "card",
      reason: "Commonly wraps groups of switches in a settings panel or preferences card"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic",
      description: "Uncontrolled switches with defaultChecked and aria-label for accessibility.",
      code: `import { Switch } from 'vayu-ui';

export default function BasicSwitch() {
  return (
    <div className="flex items-center gap-6">
      <Switch defaultChecked aria-label="Enable feature" />
      <Switch aria-label="Disable feature" />
    </div>
  );
}`,
      tags: ["basic", "uncontrolled"]
    },
    {
      title: "With Labels & Descriptions",
      description: "Switches with label and description props for additional context.",
      code: `import { Switch } from 'vayu-ui';

export default function LabeledSwitch() {
  return (
    <div className="space-y-4">
      <Switch label="Auto-save" description="Automatically save changes as you work" />
      <Switch
        label="Email notifications"
        description="Receive updates about your account activity"
        defaultChecked
      />
    </div>
  );
}`,
      tags: ["label", "description", "uncontrolled"]
    },
    {
      title: "States",
      description: "Disabled and error state switches.",
      code: `import { Switch } from 'vayu-ui';

export default function StateSwitch() {
  return (
    <div className="space-y-4">
      <Switch disabled label="Disabled" description="This option is not available" />
      <Switch disabled defaultChecked label="Disabled & Checked" />
      <Switch error label="Error state" description="Failed to save preference" />
    </div>
  );
}`,
      tags: ["disabled", "error", "states"]
    },
    {
      title: "Controlled",
      description: "Controlled switches using checked and onCheckedChange with React state.",
      code: `import { Switch } from 'vayu-ui';
import { useState } from 'react';

export default function ControlledSwitch() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={notifications}
        onCheckedChange={setNotifications}
        label={\`Notifications: \${notifications ? 'On' : 'Off'}\`}
        description="Toggle push notifications"
      />
      <Switch
        checked={analytics}
        onCheckedChange={setAnalytics}
        label={\`Analytics: \${analytics ? 'On' : 'Off'}\`}
        description="Share anonymous usage data"
      />
    </div>
  );
}`,
      tags: ["controlled", "state", "dynamic-label"]
    },
    {
      title: "Interactive Dark Mode Toggle",
      description: "A controlled switch with external button controls for toggling and resetting.",
      code: `import { Switch, Button } from 'vayu-ui';
import { useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={darkMode}
        onCheckedChange={setDarkMode}
        label={\`Dark Mode: \${darkMode ? 'On' : 'Off'}\`}
        description="Toggle dark mode theme"
      />
      <div className="flex items-center gap-3">
        <Button variant="outline" size="small" onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </Button>
        <Button variant="ghost" size="small" onClick={() => setDarkMode(false)}>
          Reset
        </Button>
      </div>
    </div>
  );
}`,
      tags: ["controlled", "interactive", "button"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Using onChange instead of onCheckedChange",
      bad: "<Switch onChange={(e) => ...} />",
      good: "<Switch onCheckedChange={(checked: boolean) => ...} />",
      reason: "The SwitchProps type omits the native onChange. The component provides onCheckedChange which receives a clean boolean instead of a ChangeEvent."
    },
    {
      title: "Setting aria-checked or role manually",
      bad: '<Switch role="switch" aria-checked={value} />',
      good: "<Switch checked={value} />",
      reason: 'The component automatically manages role="switch" and aria-checked on the hidden input. Setting them manually on the wrapper div has no effect on the actual accessibility node.'
    },
    {
      title: "Using the switch without a label or aria-label",
      bad: "<Switch checked={on} onCheckedChange={setOn} />",
      good: '<Switch label="Dark mode" checked={on} onCheckedChange={setOn} />',
      reason: "Without a label prop or aria-label, screen readers cannot determine the purpose of the switch. Always provide at least one."
    },
    {
      title: "Using checked without onCheckedChange in controlled mode",
      bad: "<Switch checked={value} />",
      good: "<Switch checked={value} onCheckedChange={setValue} />",
      reason: "Providing checked without onCheckedChange creates a read-only switch that cannot be toggled. In controlled mode, both props must be provided together."
    }
  ]
};

// src/typography.ts
var typographyEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "typography",
  name: "Typography",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A compound typography component providing semantic heading, paragraph, label, code, link, and CTA elements with color variants, font switching, and WCAG 2.2 AA accessibility.",
  longDescription: "The Typography component uses the compound component pattern (Typography.H1\u2013H6, Typography.P, Typography.Label, Typography.Code, Typography.Link, Typography.CTA) to render semantic HTML text elements. All sub-components share a common set of props for color variants (primary, secondary, tertiary, error, warning, info, success, gradient), font family switching (primary, secondary), text truncation, and ARIA attributes. Link supports automatic internal/external routing with Next.js, external-link icons, and WCAG-compliant new-window announcements. Code renders inline code snippets with optional language metadata. All elements use design tokens via Tailwind classes for consistent theming.",
  tags: [
    "typography",
    "text",
    "heading",
    "paragraph",
    "link",
    "code",
    "label",
    "cta",
    "semantic",
    "content",
    "a11y"
  ],
  useCases: [
    "Semantic page headings (H1\u2013H6) that establish visual hierarchy and document outline",
    "Body paragraphs with primary and secondary color variants for content emphasis",
    "Form labels with htmlFor binding to associate text with inputs",
    "Inline code snippets with language metadata for technical documentation",
    "Navigation links with automatic internal routing via Next.js and external-link icons",
    "Call-to-action text styled prominently for marketing or conversion sections",
    "Status-colored text using error, warning, info, or success variants for feedback messages"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Typography",
  files: [
    { name: "Typography.tsx", description: "Root compound object assembling all typography sub-components into a single namespace" },
    { name: "TypographyHeadings.tsx", description: "H1\u2013H6 heading components with responsive sizing and variant styling" },
    { name: "TypographyTextElements.tsx", description: "P, Label, and CTA text components with variant and font support" },
    { name: "TypographyCode.tsx", description: "Inline code component with language metadata and monospace styling" },
    { name: "TypographyLink.tsx", description: "Link component with Next.js routing, external-link detection, and WCAG announcements" },
    { name: "utils.ts", description: "getVariantClasses helper mapping variant names to design-token Tailwind classes" },
    { name: "types.ts", description: "TypeScript interfaces for BaseTypographyProps and all sub-component prop types" },
    { name: "index.ts", description: "Barrel export file re-exporting the Typography namespace and all type definitions" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Typography",
  subComponents: [
    {
      name: "H1",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h1> element with responsive sizing (4xl/5xl/6xl), bold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "H2",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h2> element with responsive sizing (3xl/4xl/5xl), extra-bold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          defaultValue: "'primary'",
          description: "Font family override; defaults to primary for headings",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "H3",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h3> element with responsive sizing (2xl/3xl/4xl), semibold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "H4",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h4> element with responsive sizing (xl/2xl/3xl), semibold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "H5",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h5> element with responsive sizing (lg/xl/2xl), semibold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "H6",
      fileName: "TypographyHeadings.tsx",
      description: "Renders an <h6> element with responsive sizing (base/lg/xl), semibold weight, and tight tracking",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Heading content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "P",
      fileName: "TypographyTextElements.tsx",
      description: "Renders a <p> element with paragraph sizing, relaxed leading, and secondary font by default",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Paragraph content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          defaultValue: "'secondary'",
          description: "Font family override; defaults to secondary for body text",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "Label",
      fileName: "TypographyTextElements.tsx",
      description: "Renders a <label> element with base sizing and relaxed leading, supports htmlFor for form association",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Label content"
        },
        {
          name: "htmlFor",
          type: "string",
          required: false,
          description: "Associates the label with a form control by its id attribute"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "Code",
      fileName: "TypographyCode.tsx",
      description: "Renders a <code> element with monospace font, rounded background, focus ring, and optional language metadata",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Code content to display inline"
        },
        {
          name: "codeLang",
          type: "string",
          required: false,
          description: "Programming language hint stored as data-code-lang and used for auto-generated aria-label"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "Link",
      fileName: "TypographyLink.tsx",
      description: "Renders a navigation link using Next.js Link for internal routes or a native <a> for external URLs, with WCAG-compliant external-link announcements and focus rings",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Link content"
        },
        {
          name: "href",
          type: "string",
          required: false,
          description: "URL or path; http/https URLs render as external links, all others use Next.js Link"
        },
        {
          name: "target",
          type: "string",
          required: false,
          description: 'Link target attribute; target="_blank" triggers external-link behavior with rel="noopener noreferrer"'
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    },
    {
      name: "CTA",
      fileName: "TypographyTextElements.tsx",
      description: "Renders a <p> element with CTA-specific styling for call-to-action text in marketing sections",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Call-to-action text content"
        },
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
          required: false,
          defaultValue: "'primary'",
          description: "Color variant applied via design tokens",
          options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
        },
        {
          name: "ellipsis",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Truncates text with ellipsis when overflowing"
        },
        {
          name: "font",
          type: "'primary' | 'secondary'",
          required: false,
          description: "Font family override",
          options: ["primary", "secondary"]
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'info' | 'success' | 'gradient'",
      required: false,
      defaultValue: "'primary'",
      description: "Color variant mapped to design tokens: canvas-content, muted-content, surface-content/70, destructive, warning, info, success, or brand gradient",
      options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"]
    },
    {
      name: "ellipsis",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Applies Tailwind truncate utility to clip overflowing text with an ellipsis"
    },
    {
      name: "font",
      type: "'primary' | 'secondary'",
      required: false,
      description: "Switches the font family between primary (Oswald) and secondary (Mulish) using Tailwind font-{value}",
      options: ["primary", "secondary"]
    },
    {
      name: "ariaLabel",
      type: "string",
      required: false,
      description: "Sets aria-label on the rendered element for assistive technology"
    },
    {
      name: "ariaDescribedby",
      type: "string",
      required: false,
      description: "Sets aria-describedby to associate the element with descriptive text"
    },
    {
      name: "ariaHidden",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Sets aria-hidden to hide the element from the accessibility tree"
    },
    {
      name: "lang",
      type: "string",
      required: false,
      description: "Sets the lang attribute for language declaration on the text element"
    },
    {
      name: "role",
      type: "React.AriaRole",
      required: false,
      description: "Overrides the default ARIA role of the rendered element"
    }
  ],
  rendersAs: "mixed (h1\u2013h6, p, label, code, a)",
  // ── Variants & Sizes ──────────────────────────────────
  variants: {
    propName: "variant",
    options: ["primary", "secondary", "tertiary", "error", "warning", "info", "success", "gradient"],
    default: "primary"
  },
  // ── States ────────────────────────────────────────────
  states: [],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLElement>) => void",
      description: "Fired when the element is clicked; available on all sub-components via inherited HTML attributes"
    },
    {
      name: "onFocus",
      signature: "(event: React.FocusEvent<HTMLElement>) => void",
      description: "Fired when the element receives focus; triggers the focus-visible ring on Link and Code"
    },
    {
      name: "onBlur",
      signature: "(event: React.FocusEvent<HTMLElement>) => void",
      description: "Fired when the element loses focus"
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLElement>) => void",
      description: "Fired on key press while the element has focus"
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: "aria-label",
        description: 'Set via the ariaLabel prop on all sub-components. Link auto-appends "(opens in a new tab)" or "(external link)" for external URLs. Code auto-generates from codeLang when no ariaLabel is provided.',
        managedByComponent: false
      },
      {
        name: "aria-describedby",
        description: "Set via the ariaDescribedby prop on all sub-components to associate descriptive text",
        managedByComponent: false
      },
      {
        name: "aria-hidden",
        description: "Set via the ariaHidden prop on all sub-components. Also applied to the external-link SVG icon in Link to hide decorative content from assistive technology.",
        managedByComponent: false
      },
      {
        name: "role",
        description: 'Code defaults to role="code"; all other sub-components use native semantic roles. Overridable via the role prop.',
        managedByComponent: false
      },
      {
        name: 'rel="noopener noreferrer"',
        description: 'Automatically added by Link when target="_blank" to prevent reverse tabnapping security vulnerability.',
        managedByComponent: true
      },
      {
        name: "data-code-lang",
        description: "Set by Code component from the codeLang prop to expose language metadata for tooling.",
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "Tab",
        behavior: "Moves focus to the next focusable element (Link and Code have focus rings)"
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus to the previous focusable element"
      },
      {
        key: "Enter",
        behavior: "Activates navigation for focused Link elements"
      }
    ],
    focusManagement: "Link and Code components include focus-visible rings (focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2). Link has a minimum touch target of 44px (min-h-11 min-w-11) for mobile accessibility.",
    wcagLevel: "AA",
    notes: "All sub-components render semantic HTML elements (h1\u2013h6, p, label, code, a) for proper document outline and screen reader navigation. Link auto-announces external links and new-window behavior via computed aria-label per WCAG 2.4.4 and 2.5.3. Variant colors meet WCAG 2.2 AA contrast ratios: 4.5:1 for normal text, 3:1 for large text."
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" },
    { name: "next" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "card",
      reason: "Cards commonly contain Typography headings, paragraphs, and CTAs for content sections"
    },
    {
      slug: "text-input",
      reason: "Typography.Label pairs with TextInput for accessible form field labels via htmlFor"
    },
    {
      slug: "alert",
      reason: "Typography error/warning/success/info variants align with Alert status colors for consistent feedback"
    },
    {
      slug: "modal",
      reason: "Modals use Typography.H2\u2013H4 for dialog titles and Typography.P for body content"
    },
    {
      slug: "button",
      reason: "Typography.CTA is often used alongside or above Button components in marketing and hero sections"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Headings H1\u2013H6",
      description: "All six heading levels rendered inside a surface container, demonstrating the visual hierarchy from H1 down to H6.",
      code: `import { Typography } from 'vayu-ui';

export default function HeadingsDemo() {
  return (
    <div className="bg-surface space-y-2 rounded-surface p-6 border border-border shadow-surface">
      <Typography.H1>Heading 1 - Main Title</Typography.H1>
      <Typography.H2>Heading 2 - Section Title</Typography.H2>
      <Typography.H3>Heading 3 - Subsection</Typography.H3>
      <Typography.H4>Heading 4 - Component</Typography.H4>
      <Typography.H5>Heading 5 - Subcomponent</Typography.H5>
      <Typography.H6>Heading 6 - Minor Heading</Typography.H6>
    </div>
  );
}`,
      tags: ["headings", "h1", "h2", "h3", "h4", "h5", "h6"]
    },
    {
      title: "Paragraphs",
      description: "Primary and secondary paragraph variants demonstrating standard body text and de-emphasized content.",
      code: `import { Typography } from 'vayu-ui';

export default function ParagraphsDemo() {
  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
        <Typography.P>
          This is a paragraph example. It has a relaxed line height and proper spacing for
          optimal readability. Typography is the art and technique of arranging type to make
          written language legible, readable, and appealing when displayed.
        </Typography.P>
      </div>
      <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
        <Typography.P variant="secondary">
          This is a secondary paragraph. It uses muted-content color to indicate less emphasis
          in the visual hierarchy.
        </Typography.P>
      </div>
    </div>
  );
}`,
      tags: ["paragraph", "body-text", "secondary"]
    },
    {
      title: "Text Components",
      description: "Label, Code, Link, and CTA sub-components demonstrating form labels, inline code snippets, internal and external links, and call-to-action text.",
      code: `import { Typography } from 'vayu-ui';

export default function TextComponentsDemo() {
  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex items-center gap-3 bg-surface rounded-control p-4 border border-border">
        <Typography.Label className="font-medium">Email Address</Typography.Label>
        <span className="text-sm text-muted-content">\u2192</span>
        <Typography.P className="text-sm">user@example.com</Typography.P>
      </div>

      {/* Inline Code */}
      <div className="bg-surface rounded-control p-4 border border-border">
        <Typography.P>
          Inline code example: <Typography.Code>npm install vayu-ui</Typography.Code>
        </Typography.P>
        <Typography.P className="mt-2">
          With language hint:{' '}
          <Typography.Code codeLang="typescript">
            const x: string = &quot;hello&quot;
          </Typography.Code>
        </Typography.P>
      </div>

      {/* Links */}
      <div className="bg-surface rounded-control p-4 border border-border space-y-3">
        <Typography.Link href="/components">Go to Components</Typography.Link>
        <Typography.Link href="https://example.com" target="_blank">
          External link with icon
        </Typography.Link>
      </div>

      {/* CTA */}
      <div className="bg-brand/10 rounded-control p-4 border border-brand/30">
        <Typography.CTA className="text-lg font-semibold text-brand">
          This is a Call to Action text
        </Typography.CTA>
      </div>
    </div>
  );
}`,
      tags: ["label", "code", "link", "cta", "inline-code"]
    },
    {
      title: "Color Variants",
      description: "Status color variants (error, success, warning, info) for feedback text, plus a gradient heading effect.",
      code: `import { Typography } from 'vayu-ui';

export default function VariantsDemo() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-surface rounded-control p-4 border border-destructive/30 shadow-surface">
          <Typography.P variant="error">Error text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-success/30 shadow-surface">
          <Typography.P variant="success">Success text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-warning/30 shadow-surface">
          <Typography.P variant="warning">Warning text variant</Typography.P>
        </div>
        <div className="bg-surface rounded-control p-4 border border-info/30 shadow-surface">
          <Typography.P variant="info">Info text variant</Typography.P>
        </div>
      </div>
      <div className="bg-surface rounded-surface p-6 border border-border shadow-surface">
        <Typography.H3 variant="gradient">Gradient Heading Effect</Typography.H3>
      </div>
    </div>
  );
}`,
      tags: ["variants", "error", "success", "warning", "info", "gradient"]
    },
    {
      title: "Font Variants",
      description: "Switching between primary (Oswald) and secondary (Mulish) font families on paragraph elements.",
      code: `import { Typography } from 'vayu-ui';

export default function FontDemo() {
  return (
    <div className="space-y-3 bg-surface rounded-surface p-6 border border-border shadow-surface">
      <Typography.P font="primary">Primary font (Oswald) - for headings</Typography.P>
      <Typography.P font="secondary">Secondary font (Mulish) - for body text</Typography.P>
    </div>
  );
}`,
      tags: ["font", "primary", "secondary", "font-family"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Skipping heading levels in the document outline",
      bad: "<Typography.H1>Title</Typography.H1><Typography.H4>Section</Typography.H4>",
      good: "<Typography.H1>Title</Typography.H1><Typography.H2>Section</Typography.H2>",
      reason: "Heading levels must be sequential (H1\u2192H2\u2192H3) to maintain a proper document outline. Skipping levels confuses screen reader users who navigate by headings. Use the correct semantic level, not the visual size."
    },
    {
      title: "Using Typography.Link for non-navigation actions",
      bad: '<Typography.Link href="#" onClick={handleDelete}>Delete item</Typography.Link>',
      good: '<Button variant="destructive" onClick={handleDelete}>Delete item</Button>',
      reason: 'Links are for navigation. Actions like delete, submit, or toggle should use Button. Using a link with href="#" and an onClick handler breaks accessibility expectations and keyboard navigation patterns.'
    },
    {
      title: "Adding multiple H1 elements on a single page",
      bad: "<Typography.H1>Home</Typography.H1> ... <Typography.H1>Welcome</Typography.H1>",
      good: "<Typography.H1>Welcome</Typography.H1> ... <Typography.H2>Section</Typography.H2>",
      reason: "WCAG best practice recommends exactly one H1 per page to give the document a single top-level heading. Use H2\u2013H6 for all subsequent sections."
    },
    {
      title: "Using Typography.Label without htmlFor for form fields",
      bad: '<Typography.Label>Email</Typography.Label><input id="email" />',
      good: '<Typography.Label htmlFor="email">Email</Typography.Label><input id="email" />',
      reason: "Without htmlFor, the label is not programmatically associated with its input. Screen readers cannot announce the label when the input receives focus, and clicking the label will not focus the input."
    },
    {
      title: "Hardcoding colors instead of using the variant prop",
      bad: '<Typography.P className="text-red-500">Error message</Typography.P>',
      good: '<Typography.P variant="error">Error message</Typography.P>',
      reason: "Hardcoded colors bypass design tokens and will not adapt to theme changes (light/dark mode). The variant prop maps to semantic tokens that ensure consistent theming and WCAG contrast compliance."
    }
  ]
};

// src/components/avatargroup.ts
var avatarGroupEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "avatar-group",
  name: "AvatarGroup",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A group of overlapping or gridded avatars with overflow handling, size control, status indicators, and interactive click events.",
  longDescription: "The AvatarGroup component renders a collection of user avatars in either a stacked (overlapping) or grid layout. It supports configurable display limits with an overflow indicator, four sizes (small, medium, large, xlarge), preset and custom spacing, per-avatar status indicators (online, offline, away, busy), and interactive click handlers for both individual avatars and the overflow button. Built on the Avatar component internally.",
  tags: [
    "avatar",
    "group",
    "user",
    "profile",
    "stack",
    "grid",
    "overflow",
    "status",
    "team",
    "members",
    "collaborators"
  ],
  useCases: [
    "Displaying a team or group of users in a stacked overlap layout",
    "Showing all participants in a grid layout within a container",
    "Indicating how many more users exist beyond a visible limit with an overflow counter",
    "Selecting or highlighting individual users by clicking avatars",
    "Showing online/offline/away/busy status per member in a team list",
    "Rendering participant lists in messaging apps, comments, or shared workspaces"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "AvatarGroup",
  files: [
    { name: "AvatarGroup.tsx", description: "Root component that maps users into AvatarItems and an optional OverflowButton" },
    { name: "AvatarItem.tsx", description: "Internal wrapper that renders a single Avatar with stacking z-index and hover effects" },
    { name: "AvtarGroupOverflowButton.tsx", description: "Internal overflow indicator button showing hidden user count with custom render support" },
    { name: "hooks.ts", description: "Internal hooks: useSpacing (spacing-to-pixel mapping) and useKeyboardNavigation (arrow key focus)" },
    { name: "types.ts", description: "TypeScript type definitions for AvatarGroup props, UserData, AvatarGroupSize, and AvatarGroupLayout" },
    { name: "index.ts", description: "Barrel export file re-exporting the component and all public types" },
    { name: "README.md", description: "Component documentation and usage guidelines", optional: true }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "AvatarGroup",
  subComponents: [],
  hooks: ["useSpacing", "useKeyboardNavigation"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "users",
      type: "UserData[]",
      required: false,
      defaultValue: "[]",
      description: "Array of user objects to render as avatars. Each user can have id, src, username, alt, fallback, and status."
    },
    {
      name: "size",
      type: "AvatarGroupSize",
      required: false,
      defaultValue: "'medium'",
      description: "Avatar dimensions: small (32px), medium (48px), large (64px), xlarge (96px)",
      options: ["small", "medium", "large", "xlarge"]
    },
    {
      name: "maxDisplay",
      type: "number",
      required: false,
      defaultValue: "5",
      description: "Maximum number of avatars to show before the overflow indicator appears"
    },
    {
      name: "layout",
      type: "AvatarGroupLayout",
      required: false,
      defaultValue: "'stack'",
      description: "Layout mode: stack overlaps avatars horizontally, grid wraps them in a flex grid",
      options: ["stack", "grid"]
    },
    {
      name: "spacing",
      type: "'tight' | 'normal' | 'loose' | number",
      required: false,
      defaultValue: "'normal'",
      description: "Controls overlap in stack layout. Presets map to pixel values: tight (-12px), normal (-8px), loose (-4px). A number is used directly as margin-left.",
      options: ["tight", "normal", "loose"]
    },
    {
      name: "renderOverflow",
      type: "(count: number) => React.ReactNode",
      required: false,
      description: 'Custom renderer for the overflow indicator. Receives the count of hidden users. Defaults to "+count" text.'
    },
    {
      name: "onAvatarClick",
      type: "(user: UserData, index: number) => void",
      required: false,
      description: "Callback when an individual avatar is clicked. Receives the user data and its index in the array."
    },
    {
      name: "onOverflowClick",
      type: "(hiddenUsers: UserData[]) => void",
      required: false,
      description: "Callback when the overflow button is clicked. Receives the array of users beyond maxDisplay."
    }
  ],
  rendersAs: "div",
  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: "size",
    options: ["small", "medium", "large", "xlarge"],
    default: "medium"
  },
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "overflow",
      prop: "maxDisplay",
      isBoolean: false,
      defaultValue: "5",
      description: "When the users array exceeds maxDisplay, hidden users are represented by an overflow button showing the count."
    },
    {
      name: "status",
      prop: "users[].status",
      values: ["online", "offline", "away", "busy"],
      isBoolean: false,
      description: "Each user can have a status indicator rendered by the underlying Avatar.Status sub-component."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onAvatarClick",
      signature: "(user: UserData, index: number) => void",
      description: "Fired when an individual avatar is clicked. Provides the user data object and the index within the visible list."
    },
    {
      name: "onOverflowClick",
      signature: "(hiddenUsers: UserData[]) => void",
      description: "Fired when the overflow indicator button is clicked. Provides the full array of hidden user objects for displaying in a popover or modal."
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLDivElement>) => void",
      description: "Internal keyboard navigation handler for ArrowLeft/ArrowRight focus movement between avatars."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "group",
    attributes: [
      {
        name: "aria-label",
        description: 'Set on the root container to announce the total member count, e.g. "Avatar group with 6 members".',
        managedByComponent: true
      },
      {
        name: "aria-label (overflow button)",
        description: 'Set on the overflow button to announce the hidden count, e.g. "Show 3 more users".',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "ArrowRight",
        behavior: "Moves focus to the next avatar or overflow button in the group"
      },
      {
        key: "ArrowLeft",
        behavior: "Moves focus to the previous avatar or overflow button in the group"
      },
      {
        key: "Tab",
        behavior: "Moves focus into and out of the avatar group"
      }
    ],
    focusManagement: "Arrow keys cycle focus through avatars and the overflow button within the group. Each clickable avatar receives tabIndex={0}. The overflow button uses focus-visible ring for keyboard focus indication.",
    wcagLevel: "AA",
    notes: 'The component uses role="group" on the container to associate the avatars. The overflow button has an explicit aria-label. When onAvatarClick is not provided, avatars are not focusable (no tabIndex), keeping the tab order clean for non-interactive groups.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [
    {
      slug: "avatar",
      reason: "AvatarGroup uses the Avatar compound component internally to render each user avatar with image, initials, and status support"
    }
  ],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "avatar",
      reason: "AvatarGroup is built on top of Avatar; use Avatar standalone for single-user displays"
    },
    {
      slug: "tooltip",
      reason: "Add tooltips to individual avatars to show full user names or profile details on hover"
    },
    {
      slug: "popover",
      reason: "Attach a popover to the overflow button to display the full list of hidden users"
    },
    {
      slug: "badge",
      reason: "Display a badge alongside the avatar group to show total member count or online count"
    },
    {
      slug: "card",
      reason: "Avatar groups are commonly placed in card headers to show team members or assignees"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Basic Stack",
      description: "Default stacked layout showing 4 of 6 users with an overflow indicator for the remaining 2.",
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'online' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'away' as const },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png', status: 'busy' as const },
  { id: 6, username: 'David Lee', fallback: 'DL', status: 'offline' as const },
];

export default function BasicStack() {
  return <AvatarGroup users={users} maxDisplay={4} />;
}`,
      tags: ["basic", "stack", "overflow"]
    },
    {
      title: "Grid Layout",
      description: "Grid layout that wraps avatars instead of overlapping them, useful for showing all members.",
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png' },
  { id: 2, username: 'Jane Smith', fallback: 'JS' },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png' },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ' },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png' },
  { id: 6, username: 'David Lee', fallback: 'DL' },
];

export default function GridLayout() {
  return (
    <div className="max-w-50">
      <AvatarGroup users={users} layout="grid" maxDisplay={10} />
    </div>
  );
}`,
      tags: ["grid", "layout", "all-visible"]
    },
    {
      title: "Avatar Sizes",
      description: "All four sizes with matching spacing: small with tight, medium (default), large with loose, and xlarge.",
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png' },
  { id: 2, username: 'Jane Smith', fallback: 'JS' },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png' },
];

export default function SizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarGroup users={users} size="small" spacing="tight" />
      <AvatarGroup users={users} size="medium" />
      <AvatarGroup users={users} size="large" spacing="loose" />
      <AvatarGroup users={users} size="xlarge" />
    </div>
  );
}`,
      tags: ["sizes", "small", "medium", "large", "xlarge", "spacing"]
    },
    {
      title: "Interactive with Click Handlers",
      description: "Click avatars to select a user and click the overflow button to reveal hidden members.",
      code: `import React, { useState } from 'react';
import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'online' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'away' as const },
  { id: 5, username: 'Charlie Brown', src: 'https://github.com/octocat.png', status: 'busy' as const },
];

export default function InteractiveDemo() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div>
      <AvatarGroup
        users={users}
        maxDisplay={4}
        onAvatarClick={(user) => setSelectedUser(user.username || null)}
        onOverflowClick={(hiddenUsers) => console.log('Hidden:', hiddenUsers)}
      />
      {selectedUser && <p>Selected: {selectedUser}</p>}
    </div>
  );
}`,
      tags: ["interactive", "click", "selection", "overflow"]
    },
    {
      title: "Custom Overflow Renderer",
      description: 'Use renderOverflow to customize the overflow indicator instead of the default "+N" text.',
      code: `import { AvatarGroup } from 'vayu-ui';

const users = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: \`User \${i + 1}\`,
  fallback: \`U\${i + 1}\`,
}));

export default function CustomOverflow() {
  return (
    <AvatarGroup
      users={users}
      maxDisplay={3}
      renderOverflow={(count) => <span className="text-xs font-semibold text-info">+{count} more</span>}
    />
  );
}`,
      tags: ["overflow", "custom-render", "renderOverflow"]
    },
    {
      title: "Status Indicators",
      description: "Avatars with online/offline/away/busy status indicators rendered by the underlying Avatar component.",
      code: `import { AvatarGroup } from 'vayu-ui';

const users = [
  { id: 1, username: 'John Doe', src: 'https://github.com/shadcn.png', status: 'online' as const },
  { id: 2, username: 'Jane Smith', fallback: 'JS', status: 'offline' as const },
  { id: 3, username: 'Bob Wilson', src: 'https://github.com/vercel.png', status: 'away' as const },
  { id: 4, username: 'Alice Johnson', fallback: 'AJ', status: 'busy' as const },
];

export default function StatusDemo() {
  return <AvatarGroup users={users} maxDisplay={4} />;
}`,
      tags: ["status", "online", "offline", "away", "busy"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Providing users without unique ids",
      bad: '<AvatarGroup users={[{ username: "John" }, { username: "John" }]} />',
      good: '<AvatarGroup users={[{ id: 1, username: "John" }, { id: 2, username: "John" }]} />',
      reason: "Without unique id values, React uses array index as key, which causes incorrect rendering and state issues when users are added, removed, or reordered."
    },
    {
      title: "Using grid layout for large user counts without a container width",
      bad: '<AvatarGroup users={manyUsers} layout="grid" maxDisplay={100} />',
      good: '<div className="max-w-md"><AvatarGroup users={manyUsers} layout="grid" maxDisplay={100} /></div>',
      reason: "Grid layout uses flex-wrap without a constrained parent width, so it may expand indefinitely and break the page layout."
    },
    {
      title: "Passing onClick to AvatarGroup instead of onAvatarClick",
      bad: "<AvatarGroup onClick={handleClick} users={users} />",
      good: "<AvatarGroup onAvatarClick={handleClick} users={users} />",
      reason: "onClick goes to the root container div and fires for any click in the group area (including gaps). onAvatarClick targets individual avatars with the specific user data and index."
    },
    {
      title: "Setting spacing to a positive number in stack layout",
      bad: '<AvatarGroup users={users} layout="stack" spacing={8} />',
      good: '<AvatarGroup users={users} layout="stack" spacing="tight" />',
      reason: "Stack layout relies on negative margins for the overlapping effect. Positive spacing separates avatars instead of stacking them, defeating the visual purpose of the stack layout."
    },
    {
      title: "Using maxDisplay of 0 or negative values",
      bad: "<AvatarGroup users={users} maxDisplay={0} />",
      good: "<AvatarGroup users={users} maxDisplay={3} />",
      reason: "A maxDisplay of 0 or less shows no avatars, only the overflow button with all users hidden. Use a reasonable threshold that shows some avatars visually."
    }
  ]
};

// src/components/table.ts
var tableEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "table",
  name: "Table",
  type: "component",
  category: "data-display",
  // ── Description ───────────────────────────────────────
  description: "A responsive HTML table component with compound sub-components for headers, rows, cells, caption, and footer, supporting sortable columns, selectable rows, and WCAG 2.2 AA accessibility.",
  longDescription: "The Table component uses the compound component pattern (Table.Caption, Table.Head, Table.Body, Table.Footer, Table.Row, Table.Header, Table.Cell) to compose accessible data tables. It wraps a native <table> element in a responsive scroll container with design token styling. Table.Header supports sortable columns with aria-sort indicators and keyboard focus. Table.Row supports selection states with aria-selected and focus rings. Table.Caption can be visually hidden while remaining accessible. Table.Body announces empty states via aria-live. All sub-components extend their native HTML counterparts and support forwarded refs.",
  tags: [
    "table",
    "data",
    "grid",
    "list",
    "display",
    "sortable",
    "selectable",
    "responsive",
    "tabular",
    "rows",
    "columns"
  ],
  useCases: [
    "Displaying structured tabular data like invoices, users, or product listings",
    "Sortable data tables where users can click column headers to reorder rows",
    "Selectable row tables for multi-select workflows like bulk actions",
    "Financial or summary tables with a footer row showing totals",
    "Responsive tables that scroll horizontally on narrow viewports",
    "Accessible data tables with captions and proper ARIA attributes for screen readers"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Table",
  files: [
    { name: "Table.tsx", description: "Root table component wrapping native <table> in a responsive scroll container with design token styling and compound component attachment" },
    { name: "TableCaption.tsx", description: "Caption sub-component with visually-hidden support for accessible table descriptions" },
    { name: "TableHead.tsx", description: "<thead> section component with muted background styling" },
    { name: "TableBody.tsx", description: "<tbody> section component with divider styling and empty-state aria-live region" },
    { name: "TableFooter.tsx", description: "<tfoot> section component with bold styling for totals and summaries" },
    { name: "TableRow.tsx", description: "Row component with selected and selectable states, hover styling, and keyboard focus support" },
    { name: "TableHeader.tsx", description: "Header cell (<th>) with scope, sortable indicator icons, and aria-sort support" },
    { name: "TableCell.tsx", description: "Data cell (<td>) with accessible column and row index attributes" },
    { name: "types.ts", description: "TypeScript type definitions for all Table sub-component props" },
    { name: "index.ts", description: "Barrel export file assembling the compound component and re-exporting all types" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Table",
  subComponents: [
    {
      name: "Caption",
      fileName: "TableCaption.tsx",
      description: "Renders a <caption> element for the table, providing an accessible description. Can be visually hidden while remaining available to screen readers.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Caption text content describing the table's purpose or data"
        },
        {
          name: "visuallyHidden",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, applies sr-only classes to hide the caption visually while keeping it accessible to screen readers"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <caption> element"
        }
      ]
    },
    {
      name: "Head",
      fileName: "TableHead.tsx",
      description: "Renders the <thead> section of the table, containing header rows with muted background styling.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Header row content, typically one or more Table.Row elements containing Table.Header cells"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <thead> element"
        }
      ]
    },
    {
      name: "Body",
      fileName: "TableBody.tsx",
      description: "Renders the <tbody> section of the table with row dividers and optional empty-state announcement.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Body row content, typically Table.Row elements containing Table.Cell elements"
        },
        {
          name: "empty",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: 'When true, adds aria-live="polite" to announce the empty state to screen readers'
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <tbody> element"
        }
      ]
    },
    {
      name: "Footer",
      fileName: "TableFooter.tsx",
      description: "Renders the <tfoot> section of the table with bold styling, used for totals and summary rows.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Footer row content, typically a Table.Row with summary or total Table.Cell elements"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <tfoot> element"
        }
      ]
    },
    {
      name: "Row",
      fileName: "TableRow.tsx",
      description: "Renders a <tr> element with optional selection state, hover styling, and keyboard focus for interactive rows.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Row content, typically Table.Header or Table.Cell elements"
        },
        {
          name: "selected",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, applies a muted background to visually indicate the row is selected"
        },
        {
          name: "selectable",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, makes the row interactive with cursor-pointer, focus ring, and aria-selected attribute for accessibility"
        },
        {
          name: "aria-rowindex",
          type: "number",
          required: false,
          description: "Row index for accessibility, useful when rows are virtualized or filtered"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <tr> element"
        }
      ]
    },
    {
      name: "Header",
      fileName: "TableHeader.tsx",
      description: "Renders a <th> header cell with scope attribute, optional sort indicators, and keyboard interaction for sortable columns.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Header cell content, typically text or a label for the column"
        },
        {
          name: "scope",
          type: "'row' | 'col' | 'rowgroup' | 'colgroup'",
          required: false,
          defaultValue: "'col'",
          description: "HTML scope attribute indicating whether the header applies to a row, column, or group",
          options: ["row", "col", "rowgroup", "colgroup"]
        },
        {
          name: "sortable",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, adds a sort indicator icon, cursor-pointer styling, tabIndex for keyboard focus, and focus ring"
        },
        {
          name: "aria-sort",
          type: "'ascending' | 'descending' | 'none' | 'other'",
          required: false,
          description: "Indicates the current sort direction of the column. Required when sortable is true for accessibility.",
          options: ["ascending", "descending", "none", "other"]
        },
        {
          name: "aria-colindex",
          type: "number",
          required: false,
          description: "Column index for accessibility, useful for tables with a large or dynamic number of columns"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <th> element"
        }
      ]
    },
    {
      name: "Cell",
      fileName: "TableCell.tsx",
      description: "Renders a <td> data cell with accessible column and row index attributes.",
      props: [
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Cell content \u2014 text, numbers, badges, buttons, or other inline elements"
        },
        {
          name: "aria-colindex",
          type: "number",
          required: false,
          description: "Column index for accessibility in tables with a large or dynamic number of columns"
        },
        {
          name: "aria-rowindex",
          type: "number",
          required: false,
          description: "Row index for accessibility in tables with virtualized or filtered rows"
        },
        {
          name: "headers",
          type: "string",
          required: false,
          description: "Space-separated list of header cell IDs that this data cell belongs to, for complex table relationships"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the <td> element"
        }
      ]
    }
  ],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "aria-label",
      type: "string",
      required: false,
      description: "Accessible name for the table, providing a concise label for screen reader users when a visible caption is not present"
    },
    {
      name: "aria-describedby",
      type: "string",
      required: false,
      description: "ID reference to an element that provides additional description of the table's content or structure"
    },
    {
      name: "aria-colcount",
      type: "number",
      required: false,
      description: "Total number of columns in the full dataset, useful when the table displays a subset of columns or is virtualized"
    },
    {
      name: "aria-rowcount",
      type: "number",
      required: false,
      description: "Total number of rows in the full dataset, useful when the table displays paginated or virtualized rows"
    }
  ],
  rendersAs: "table",
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "selected",
      prop: "selected",
      isBoolean: true,
      defaultValue: "false",
      description: "Applied to Table.Row. When true, the row is visually highlighted with a muted background and aria-selected is set to true."
    },
    {
      name: "selectable",
      prop: "selectable",
      isBoolean: true,
      defaultValue: "false",
      description: "Applied to Table.Row. When true, the row becomes interactive with cursor-pointer, keyboard focus ring, and aria-selected attribute."
    },
    {
      name: "sortable",
      prop: "sortable",
      isBoolean: true,
      defaultValue: "false",
      description: "Applied to Table.Header. When true, the header cell shows a sort direction indicator, becomes keyboard-focusable, and supports aria-sort."
    },
    {
      name: "empty",
      prop: "empty",
      isBoolean: true,
      defaultValue: "false",
      description: 'Applied to Table.Body. When true, adds aria-live="polite" to announce the empty state to screen readers.'
    },
    {
      name: "visuallyHidden",
      prop: "visuallyHidden",
      isBoolean: true,
      defaultValue: "false",
      description: "Applied to Table.Caption. When true, hides the caption visually using sr-only classes while keeping it accessible to screen readers."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onClick",
      signature: "(event: React.MouseEvent<HTMLTableElement>) => void",
      description: "Fired when the table element is clicked, typically used with selectable rows"
    },
    {
      name: "onKeyDown",
      signature: "(event: React.KeyboardEvent<HTMLTableElement>) => void",
      description: "Fired on key press while the table or a sortable header has focus"
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: "table",
    attributes: [
      {
        name: "aria-label",
        description: "Applied to the root <table> element to provide an accessible name when a visible caption is not used.",
        managedByComponent: false
      },
      {
        name: "aria-describedby",
        description: "Applied to the root <table> element to reference an element that describes the table's content.",
        managedByComponent: false
      },
      {
        name: "aria-colcount / aria-rowcount",
        description: "Applied to the root <table> element for virtualized or partial datasets to indicate total column/row counts.",
        managedByComponent: false
      },
      {
        name: "scope",
        description: 'Applied to Table.Header (<th>) elements with a default of "col", indicating whether the header applies to a row, column, or group.',
        managedByComponent: true
      },
      {
        name: "aria-sort",
        description: "Applied to sortable Table.Header elements to announce the current sort direction (ascending, descending, none, other) to screen readers.",
        managedByComponent: false
      },
      {
        name: "aria-selected",
        description: "Applied to selectable Table.Row elements to communicate the current selection state to assistive technology.",
        managedByComponent: true
      },
      {
        name: 'aria-live="polite"',
        description: "Applied to Table.Body when the empty prop is true, announcing empty state changes to screen readers without interrupting.",
        managedByComponent: true
      },
      {
        name: "aria-colindex / aria-rowindex",
        description: "Applied to Table.Header and Table.Cell elements for accessibility in tables with dynamic, virtualized, or large datasets.",
        managedByComponent: false
      },
      {
        name: "headers",
        description: "Applied to Table.Cell elements to associate data cells with their corresponding header cells by ID for complex table structures.",
        managedByComponent: false
      }
    ],
    keyboardInteractions: [
      {
        key: "Enter",
        behavior: "Activates sort on a focused sortable Table.Header column"
      },
      {
        key: "Space",
        behavior: "Activates sort on a focused sortable Table.Header column"
      },
      {
        key: "Tab",
        behavior: "Moves focus to the next sortable header or interactive element"
      },
      {
        key: "Shift+Tab",
        behavior: "Moves focus to the previous sortable header or interactive element"
      }
    ],
    focusManagement: "Sortable Table.Header cells receive tabIndex={0} when the sortable prop is true, making them keyboard-focusable. Selectable Table.Row elements receive tabIndex={0} when the selectable prop is true. Both show a focus-visible ring (ring-focus with ring-offset-canvas) on keyboard navigation.",
    wcagLevel: "AA",
    notes: 'The Table uses native semantic HTML elements (<table>, <thead>, <tbody>, <tfoot>, <th>, <td>, <tr>, <caption>) for inherent accessibility. Table.Header defaults scope to "col" for proper header-cell association. Sort indicator icons use aria-hidden="true" since the sort state is communicated via aria-sort. The wrapping div provides responsive horizontal scrolling without breaking table semantics.'
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "badge",
      reason: 'Badges are frequently used inside Table.Cell elements to display status indicators like "Paid", "Pending", or "Unpaid"'
    },
    {
      slug: "button",
      reason: "Action buttons (View, Edit, Delete) are commonly placed in a table's last column for row-level operations"
    },
    {
      slug: "checkbox",
      reason: "Checkboxes are used in the first column for multi-row selection alongside the selectable row feature"
    },
    {
      slug: "skeleton",
      reason: "Skeleton loaders replace table content while data is being fetched, providing a smooth loading experience"
    },
    {
      slug: "typography",
      reason: "Typography components provide consistent heading and text styling for table titles and descriptions"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Default Table",
      description: "A basic table with caption, header rows, body rows, and a footer row showing totals.",
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
  { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: '$550.00', paymentMethod: 'PayPal' },
];

export default function DefaultTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List">
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell className="text-right">$1,750.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}`,
      tags: ["default", "caption", "footer", "totals"]
    },
    {
      title: "Table with Selected Row",
      description: "A table demonstrating row selection with the selected prop to highlight a specific row.",
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SelectedRowTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Selection">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice, index) => (
          <Table.Row key={invoice.invoice} selected={index === 1}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ["selected", "highlight", "selection"]
    },
    {
      title: "Table with Sortable Columns",
      description: "A table with sortable column headers using the sortable and aria-sort props to indicate sort direction.",
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SortableTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Sorting">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header sortable aria-sort="ascending">
            Status
          </Table.Header>
          <Table.Header sortable aria-sort="none">
            Method
          </Table.Header>
          <Table.Header className="text-right" sortable aria-sort="none">
            Amount
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ["sortable", "sort", "aria-sort", "columns"]
    },
    {
      title: "Table with Selectable Rows",
      description: "A table where each row is interactive using the selectable prop, enabling click and keyboard selection with focus rings.",
      code: `import { Table } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function SelectableTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Selection">
      <Table.Head>
        <Table.Row>
          <Table.Header className="w-[100px]">Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice} selectable>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ["selectable", "interactive", "focus", "keyboard"]
    },
    {
      title: "Table with Actions",
      description: "A table with action buttons in the last column for row-level operations like View and Edit.",
      code: `import { Table, Button } from 'vayu-ui';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
];

export default function ActionsTable() {
  return (
    <Table className="max-w-[800px] w-full" aria-label="Invoice List with Actions">
      <Table.Head>
        <Table.Row>
          <Table.Header>Invoice</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header>Method</Table.Header>
          <Table.Header className="text-right">Amount</Table.Header>
          <Table.Header>Actions</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
            <Table.Cell>
              <div className="flex gap-2">
                <Button variant="outline" size="small">View</Button>
                <Button variant="ghost" size="small">Edit</Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}`,
      tags: ["actions", "buttons", "operations", "view", "edit"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Omitting aria-label or Caption on data tables",
      bad: "<Table><Table.Body>...</Table.Body></Table>",
      good: '<Table aria-label="User accounts"><Table.Caption>List of user accounts</Table.Caption><Table.Body>...</Table.Body></Table>',
      reason: "Every table must have an accessible name. Without aria-label or a <caption>, screen readers cannot identify the table's purpose. WCAG 2.2 requires an accessible name for all data tables."
    },
    {
      title: "Using sortable without aria-sort",
      bad: "<Table.Header sortable>Status</Table.Header>",
      good: '<Table.Header sortable aria-sort="ascending">Status</Table.Header>',
      reason: "The sortable prop adds visual indicators and keyboard focus, but without aria-sort, screen readers cannot determine the current sort direction. Always pair sortable with an aria-sort value to communicate the sort state."
    },
    {
      title: "Using div or span instead of Table sub-components",
      bad: '<Table.Body><div className="row"><span className="cell">Data</span></div></Table.Body>',
      good: "<Table.Body><Table.Row><Table.Cell>Data</Table.Cell></Table.Row></Table.Body>",
      reason: "Non-semantic elements break the table's accessibility tree. Screen readers rely on proper <tr> and <td> markup to navigate tables. Always use Table.Row and Table.Cell to maintain semantic structure."
    },
    {
      title: "Setting selectable without handling selection logic",
      bad: "<Table.Row selectable>Selectable row</Table.Row>",
      good: "<Table.Row selectable selected={isSelected} onClick={() => onSelect(row.id)}>Selectable row</Table.Row>",
      reason: "The selectable prop adds visual interactivity (cursor, focus ring, aria-selected) but does not manage selection state. You must pair it with selected and onClick handlers to actually track and display the user's selection."
    },
    {
      title: "Nesting tables inside Table.Cell",
      bad: "<Table.Cell><Table>...</Table></Table.Cell>",
      good: "Use a separate section or expandable row pattern to show nested data",
      reason: "Nesting tables creates confusing accessibility trees and breaks keyboard navigation for screen reader users. Use expandable rows, detail panels, or a separate table below the parent to show hierarchical data."
    }
  ]
};

// src/components/tab.ts
var tabEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: "tab",
  name: "Tab",
  type: "component",
  category: "navigation",
  // ── Description ───────────────────────────────────────
  description: "An accessible tabbed interface component using the compound component pattern with horizontal/vertical orientation, controlled/uncontrolled modes, and full WCAG 2.2 AA keyboard navigation.",
  longDescription: "The Tab component provides a tabbed navigation interface using the compound component pattern (Tabs.List, Tabs.Trigger, Tabs.Content). It supports horizontal and vertical orientations, controlled (via value/onValueChange) and uncontrolled (via defaultValue) modes, automatic ARIA attribute management linking triggers to panels, roving tabindex for keyboard accessibility, optional auto-focus on panel activation, disabled tabs, and force-mounted panels for preserving state. All variants follow WCAG 2.2 AA accessibility standards with full arrow key, Home, End, Enter, and Space keyboard support.",
  tags: [
    "tab",
    "tabs",
    "navigation",
    "tablist",
    "tabpanel",
    "tabbed",
    "switch",
    "panel",
    "section",
    "toggle",
    "content"
  ],
  useCases: [
    "Switching between related content sections within the same page without navigation",
    "Organizing form fields or settings into logical groups (e.g. Account, Password, Notifications)",
    "Creating sidebar-style navigation with vertical tab orientation",
    "Building product detail pages with tabbed content (Overview, Details, Reviews, Settings)",
    "Implementing wizard-like interfaces where each tab represents a step",
    "Displaying content panels that need to preserve their state when hidden using forceMount"
  ],
  // ── File & CLI ────────────────────────────────────────
  directoryName: "Tab",
  files: [
    { name: "Tab.tsx", description: "Root component with context provider, controlled/uncontrolled state management, and compound component wiring" },
    { name: "TabsList.tsx", description: "Tablist container with ARIA role, orientation attribute, and full keyboard navigation (arrow keys, Home, End)" },
    { name: "TabsTrigger.tsx", description: "Tab trigger button with ARIA selected state, roving tabindex, disabled support, and orientation-aware styling" },
    { name: "TabsContent.tsx", description: "Tab panel with ARIA role, auto-focus support, force mount option, and active/inactive state management" },
    { name: "hooks.ts", description: "React context and useTabsContext hook for sharing active tab state across compound sub-components" },
    { name: "types.ts", description: "TypeScript type definitions for TabsOrientation, TabsContextValue, TabsProps, TabsListProps, TabsTriggerProps, and TabsContentProps" },
    { name: "index.ts", description: "Barrel export file assembling the compound component and re-exporting all types" },
    { name: "README.md", description: "Component anatomy, use cases, and file structure documentation" }
  ],
  targetPath: "src/components/ui",
  // ── Compound Component ────────────────────────────────
  rootComponent: "Tabs",
  subComponents: [
    {
      name: "List",
      fileName: "TabsList.tsx",
      description: "Container for tab triggers with ARIA tablist role, orientation-aware keyboard navigation, and accessible labeling via aria-label or aria-labelledby",
      props: [
        {
          name: "aria-label",
          type: "string",
          required: false,
          description: "Accessible label for the tab list. Required for WCAG 2.2 AA compliance when no visible label element exists."
        },
        {
          name: "aria-labelledby",
          type: "string",
          required: false,
          description: "ID of a visible element that labels the tab list. Alternative to aria-label for when a visible heading labels the tabs."
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Tabs.Trigger elements to render as tab buttons inside the tab list"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the tablist container div"
        }
      ]
    },
    {
      name: "Trigger",
      fileName: "TabsTrigger.tsx",
      description: "Tab trigger button with ARIA tab role, automatic selected/disabled states, roving tabindex, and orientation-aware styling",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: "Unique value identifying this tab. Used to match the trigger with its corresponding Tabs.Content panel."
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Disables the tab trigger, removing it from keyboard navigation and preventing activation"
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Content to render as the tab label (text, icons, or both)"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the tab trigger button"
        }
      ]
    },
    {
      name: "Content",
      fileName: "TabsContent.tsx",
      description: "Tab panel with ARIA tabpanel role, auto-focus support, and optional force mounting for preserving state across tab switches",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: "Unique value matching a Tabs.Trigger value. The panel is visible when this value matches the active tab."
        },
        {
          name: "forceMount",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "When true, the panel stays mounted in the DOM when inactive (hidden via CSS). Useful for preserving component state like form inputs."
        },
        {
          name: "children",
          type: "React.ReactNode",
          required: true,
          description: "Content to render inside the tab panel when active"
        },
        {
          name: "className",
          type: "string",
          required: false,
          description: "Additional CSS classes applied to the tabpanel div"
        }
      ]
    }
  ],
  hooks: ["useTabsContext"],
  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: "defaultValue",
      type: "string",
      required: false,
      description: "Initial active tab value for uncontrolled mode. Used when the component manages its own state internally."
    },
    {
      name: "value",
      type: "string",
      required: false,
      description: "Controlled active tab value. When provided, the component becomes controlled and only changes via onValueChange."
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      required: false,
      description: "Callback fired when the active tab changes. Receives the new tab value as a string."
    },
    {
      name: "orientation",
      type: "TabsOrientation",
      required: false,
      defaultValue: "'horizontal'",
      description: "Tab layout direction. Horizontal renders tabs in a row with bottom border; vertical renders tabs in a column with right border.",
      options: ["horizontal", "vertical"]
    },
    {
      name: "autoFocus",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "When true, focus automatically moves to the active tab panel when a new tab is activated."
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: true,
      description: "Tabs.List and Tabs.Content elements composing the tabbed interface"
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes applied to the root tabs container div"
    }
  ],
  rendersAs: "div",
  // ── Variants & Sizes ──────────────────────────────────
  // No visual variants or sizes — component styling uses design tokens
  // ── States ────────────────────────────────────────────
  states: [
    {
      name: "active",
      prop: "value",
      isBoolean: false,
      defaultValue: "''",
      description: "The currently active tab. When a Tabs.Trigger value matches the active state, it renders with brand-colored styling and tabindex=0."
    },
    {
      name: "inactive",
      prop: "value",
      isBoolean: false,
      description: "Non-active tabs render with muted styling and tabindex=-1, removing them from the tab order until activated."
    },
    {
      name: "disabled",
      prop: "disabled",
      isBoolean: true,
      defaultValue: "false",
      description: "A disabled Tabs.Trigger cannot be activated by click or keyboard. It is skipped during arrow key navigation and rendered with reduced opacity."
    },
    {
      name: "forceMounted",
      prop: "forceMount",
      isBoolean: true,
      defaultValue: "false",
      description: "When true on Tabs.Content, the panel stays mounted in the DOM but hidden via the HTML hidden attribute when inactive. Preserves component state."
    }
  ],
  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: "onValueChange",
      signature: "(value: string) => void",
      description: "Fired when the active tab changes. Receives the value of the newly activated tab trigger."
    }
  ],
  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role="tablist"',
        description: "Applied to Tabs.List to identify it as a tab list container for assistive technology",
        managedByComponent: true
      },
      {
        name: "aria-orientation",
        description: 'Applied to the tablist element, set to "horizontal" or "vertical" to indicate tab navigation direction',
        managedByComponent: true
      },
      {
        name: "aria-label / aria-labelledby",
        description: "Required accessible name for the tab list. Either aria-label or aria-labelledby must be provided for WCAG compliance.",
        managedByComponent: false
      },
      {
        name: 'role="tab"',
        description: "Applied to each Tabs.Trigger button to identify it as a tab control within the tablist",
        managedByComponent: true
      },
      {
        name: "aria-selected",
        description: "Applied to each tab trigger, set to true for the active tab and false for inactive tabs",
        managedByComponent: true
      },
      {
        name: "aria-controls",
        description: 'Applied to each tab trigger with value "tabpanel-{value}", linking it to the corresponding panel by ID',
        managedByComponent: true
      },
      {
        name: "aria-disabled",
        description: "Applied to disabled tab triggers alongside the native disabled attribute for screen reader compatibility",
        managedByComponent: true
      },
      {
        name: 'role="tabpanel"',
        description: "Applied to each Tabs.Content div to identify it as the content panel associated with a tab",
        managedByComponent: true
      },
      {
        name: "aria-labelledby",
        description: 'Applied to each tab panel with value "tab-{value}", linking it back to its corresponding trigger by ID',
        managedByComponent: true
      }
    ],
    keyboardInteractions: [
      {
        key: "ArrowRight",
        behavior: "In horizontal orientation, moves focus to the next tab trigger (wraps from last to first)"
      },
      {
        key: "ArrowLeft",
        behavior: "In horizontal orientation, moves focus to the previous tab trigger (wraps from first to last)"
      },
      {
        key: "ArrowDown",
        behavior: "In vertical orientation, moves focus to the next tab trigger (wraps from last to first)"
      },
      {
        key: "ArrowUp",
        behavior: "In vertical orientation, moves focus to the previous tab trigger (wraps from first to last)"
      },
      {
        key: "Home",
        behavior: "Moves focus to the first enabled tab trigger"
      },
      {
        key: "End",
        behavior: "Moves focus to the last enabled tab trigger"
      },
      {
        key: "Enter",
        behavior: "Activates the focused tab trigger"
      },
      {
        key: "Space",
        behavior: "Activates the focused tab trigger"
      },
      {
        key: "Tab",
        behavior: "Moves focus from the active tab trigger to the tab panel content"
      }
    ],
    focusManagement: "Uses roving tabindex pattern: the active tab trigger has tabindex=0, all inactive triggers have tabindex=-1. Arrow keys move focus between triggers. When autoFocus is true, focus automatically moves to the active tab panel after tab activation. Disabled triggers are skipped during keyboard navigation.",
    wcagLevel: "AA",
    notes: "Each tab trigger and panel are linked bidirectionally via aria-controls and aria-labelledby using generated IDs (tab-{value} and tabpanel-{value}). The tablist requires an accessible name via aria-label or aria-labelledby for compliance. Arrow key navigation follows the WAI-ARIA Authoring Practices for Tabs pattern."
  },
  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: "clsx" }
  ],
  registryDependencies: [],
  reactPeerDependency: ">=18.0.0",
  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: "button",
      reason: "Action buttons are commonly placed inside tab panels for form submissions, navigation, and contextual actions"
    },
    {
      slug: "card",
      reason: "Tabs are frequently used inside cards to organize card content into switchable sections"
    },
    {
      slug: "typography",
      reason: "Heading and text components are used inside tab panels to structure content hierarchies"
    },
    {
      slug: "divider",
      reason: "Dividers separate content sections within tab panels for visual clarity"
    },
    {
      slug: "badge",
      reason: "Badges can be added to tab triggers to indicate notification counts or status on tab sections"
    }
  ],
  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: "Horizontal Tabs",
      description: "Default horizontal tab layout with two tabs and an accessible label provided via aria-labelledby referencing a heading element.",
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function HorizontalTabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Typography.H2 id="tabs-label" className="mb-4">
        Account Settings
      </Typography.H2>

      <Tabs defaultValue="account">
        <Tabs.List aria-labelledby="tabs-label" className="grid w-full grid-cols-2">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H3 className="mb-2">Account</Typography.H3>
            <Typography.P variant="secondary">
              Make changes to your account here. Click save when you're done.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="password">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H3 className="mb-2">Password</Typography.H3>
            <Typography.P variant="secondary">
              Change your password here. After saving, you'll be logged out.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ["horizontal", "basic", "aria-labelledby"]
    },
    {
      title: "Vertical Tabs",
      description: "Vertical orientation tabs for sidebar-style navigation with aria-label for accessibility.",
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function VerticalTabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="profile" orientation="vertical">
        <Tabs.List aria-label="Settings navigation" className="min-w-40">
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Profile Settings</Typography.H4>
            <Typography.P variant="secondary">
              Manage your personal information and preferences.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="settings" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Application Settings</Typography.H4>
            <Typography.P variant="secondary">
              Configure your application preferences and options.
            </Typography.P>
          </div>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="pl-4">
          <div className="p-4 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Notification Settings</Typography.H4>
            <Typography.P variant="secondary">
              Choose which notifications you want to receive.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ["vertical", "sidebar", "orientation", "aria-label"]
    },
    {
      title: "Disabled Tab",
      description: "Tab with a disabled trigger that cannot be activated by click or keyboard, useful for gating content behind permissions.",
      code: `import { Tabs, Typography } from 'vayu-ui';

export default function DisabledTabDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="enabled">
        <Tabs.List aria-label="Tab options" className="grid w-full grid-cols-2">
          <Tabs.Trigger value="enabled">Enabled Tab</Tabs.Trigger>
          <Tabs.Trigger value="disabled" disabled>
            Disabled Tab
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="enabled">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.P variant="secondary">
              This tab is active and can be selected.
            </Typography.P>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ["disabled", "gated", "permissions"]
    },
    {
      title: "Tabs with Actions",
      description: "Multi-tab layout integrating Button components inside tab panels for contextual actions like view, export, save, and reset.",
      code: `import { Tabs, Typography, Button } from 'vayu-ui';

export default function TabsWithActionsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="overview">
        <Tabs.List aria-label="Content sections" className="grid w-full grid-cols-3">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="details">Details</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Overview Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Get a quick summary of your content and recent activity.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="primary" size="small">View Report</Button>
              <Button variant="outline" size="small">Export</Button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="details">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Details Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Dive deeper into your data with detailed analytics and insights.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="secondary" size="small">Analyze</Button>
              <Button variant="ghost" size="small">Download CSV</Button>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <div className="p-4 mt-2 rounded border border-border bg-surface">
            <Typography.H4 className="mb-2">Settings Section</Typography.H4>
            <Typography.P variant="secondary" className="mb-4">
              Configure your preferences and customize your experience.
            </Typography.P>
            <div className="flex gap-2">
              <Button variant="primary" size="small">Save Settings</Button>
              <Button variant="destructive" size="small">Reset</Button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}`,
      tags: ["actions", "button", "multi-tab", "integration"]
    }
  ],
  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: "Missing accessible label on Tabs.List",
      bad: '<Tabs defaultValue="tab1"><Tabs.List><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List></Tabs>',
      good: '<Tabs defaultValue="tab1"><Tabs.List aria-label="Content sections"><Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger></Tabs.List></Tabs>',
      reason: "The tablist requires an accessible name via aria-label or aria-labelledby for WCAG 2.2 AA compliance. Without it, screen readers cannot identify the purpose of the tab list."
    },
    {
      title: "Mismatched value between Trigger and Content",
      bad: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Content value="profile">...</Tabs.Content>',
      good: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Content value="account">...</Tabs.Content>',
      reason: "Each Tabs.Trigger value must match exactly one Tabs.Content value. Mismatched values break the ARIA linkage (aria-controls, aria-labelledby) and leave panels permanently hidden or triggers with no panel."
    },
    {
      title: "Using controlled and uncontrolled props together",
      bad: '<Tabs defaultValue="tab1" value={state} onValueChange={fn}>...</Tabs>',
      good: "<Tabs value={state} onValueChange={fn}>...</Tabs>",
      reason: "Do not mix defaultValue (uncontrolled) with value/onValueChange (controlled) on the same Tabs instance. Pick one mode: either let the component manage state with defaultValue, or fully control it with value and onValueChange."
    },
    {
      title: "Using Tabs compound components outside Tabs",
      bad: '<div><Tabs.List aria-label="Nav"><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List></div>',
      good: '<Tabs defaultValue="a"><Tabs.List aria-label="Nav"><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List><Tabs.Content value="a">Content</Tabs.Content></Tabs>',
      reason: 'Tabs.List, Tabs.Trigger, and Tabs.Content rely on the TabsContext provided by the root Tabs component. Using them outside Tabs will throw a runtime error: "Tabs compound components must be used within a Tabs component".'
    },
    {
      title: "Duplicate value across Tabs.Trigger elements",
      bad: '<Tabs.Trigger value="tab">Tab 1</Tabs.Trigger><Tabs.Trigger value="tab">Tab 2</Tabs.Trigger>',
      good: '<Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Trigger value="password">Password</Tabs.Trigger>',
      reason: "Each Tabs.Trigger must have a unique value. Duplicate values cause both triggers to appear active simultaneously, break keyboard navigation (two elements share the same panel), and produce invalid ARIA with duplicate IDs."
    }
  ]
};
export {
  accordionEntry,
  affixEntry,
  alertEntry,
  aspectratioEntry,
  avatarEntry,
  avatarGroupEntry,
  badgeEntry,
  breadcrumbEntry,
  buttonEntry,
  cardEntry,
  checkboxEntry,
  radioGroupEntry,
  skeletonEntry,
  switchEntry,
  tabEntry,
  tableEntry,
  typographyEntry
};
//# sourceMappingURL=index.js.map