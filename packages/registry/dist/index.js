// src/hooks.ts
var h = (name, slug, fileName, description) => ({
  name,
  slug,
  type: "hook",
  category: "utility",
  since: "1.0.0",
  description,
  targetPath: "src/hooks",
  fileName,
  dependencies: [],
  registryDependencies: [],
  tags: ["hook"]
});
var hooks = [
  h("useBatteryStatus", "use-battery-status", "useBatteryStatus.ts", "Tracks the device battery level, charging state, and charging/discharging time."),
  h("useConfirmExit", "use-confirm-exit", "useConfirmExit.ts", "Prompts the user with a confirmation dialog when they try to close or reload the tab."),
  h("useCopyToClipboard", "use-copy-to-clipboard", "useCopyToClipboard.ts", "Copies a string to the clipboard and exposes a copied state flag."),
  h("useCountdown", "use-countdown", "useCountdown.ts", "Countdown timer hook \u2014 returns remaining seconds and controls."),
  h("useDebounce", "use-debounce", "useDebounce.ts", "Debounces a value by delaying updates until after the wait period."),
  h("useDeviceOS", "use-device-os", "useDeviceOS.ts", "Detects the user's operating system from the user agent string."),
  h("useElementPosition", "use-element-position", "useElementPosition.ts", "Tracks the bounding rect position of a DOM element relative to the viewport."),
  h("useHover", "use-hover", "useHover.ts", "Returns a ref and a boolean indicating whether the element is hovered."),
  h("useIdle", "use-idle", "useIdle.ts", "Detects user inactivity after a configurable idle timeout."),
  h("useIndexedDB", "use-indexed-db", "useIndexedDB.ts", "CRUD operations on an IndexedDB object store with async state management."),
  h("useIntervalWhen", "use-interval-when", "useIntervalWhen.ts", "Runs a callback on an interval only when a condition is true."),
  h("useIsMount", "use-is-mount", "useIsMount.ts", "Returns true only on the initial render \u2014 useful for skipping effects on mount."),
  h("useKeyPress", "use-key-press", "useKeyPress.ts", "Returns true while a specific keyboard key is held down."),
  h("useList", "use-list", "useList.ts", "State hook for an array with push, remove, update, and clear helpers."),
  h("useLocalStorage", "use-local-storage", "useLocalStorage.ts", "Synced state backed by localStorage with JSON serialisation."),
  h("useLockBodyScroll", "use-lock-body-scroll", "useLockBodyScroll.ts", "Locks body scroll when active \u2014 typically used by modals and drawers."),
  h("useMap", "use-map", "useMap.ts", "State hook for a Map with set, delete, clear, and has helpers."),
  h("useMeasure", "use-measure", "useMeasure.ts", "Measures the width and height of a DOM element using ResizeObserver."),
  h("useMediaQuery", "use-media-query", "useMediaQuery.ts", "Returns true when a CSS media query matches the current viewport."),
  h("useMouseTrack", "use-mouse-track", "useMouseTrack.ts", "Tracks mouse position (x, y) relative to the window or a specific element."),
  h("useNetworkStatus", "use-network-status", "useNetworkStatus.ts", "Tracks online/offline status and network connection information."),
  h("useOnClickOutside", "use-on-click-outside", "useOnClickOutside.ts", "Fires a callback when a click is detected outside the referenced element."),
  h("usePageLeave", "use-page-leave", "usePageLeave.ts", "Fires a callback when the user's cursor leaves the browser viewport."),
  { ...h("usePermission", "use-permission", "usePermission.ts", "Queries the Permissions API for a given permission name and returns its state.") },
  { ...h("usePreviousState", "use-previous-state", "usePreviousState.ts", "Returns the previous value of a state variable or prop.") },
  h("useQueue", "use-queue", "useQueue.ts", "FIFO queue state with enqueue, dequeue, and peek helpers."),
  h("useRenderCount", "use-render-count", "useRenderCount.ts", "Returns the number of times the component has rendered \u2014 useful for debugging."),
  { ...h("useScrollPosition", "use-scroll-position", "useScrollPosition.ts", "Tracks the scroll position of the window or a specific element.") },
  h("useSet", "use-set", "useSet.ts", "State hook for a Set with add, delete, has, and clear helpers."),
  h("useThrottle", "use-throttle", "useThrottle.ts", "Throttles a value so updates fire at most once per delay period."),
  h("useTimeout", "use-timeout", "useTimeout.ts", "Runs a callback after a delay with cancel and reset controls."),
  h("useVisibilityChange", "use-visibility-change", "useVisibilityChange.ts", "Tracks document visibility \u2014 fires a callback when the tab becomes visible or hidden."),
  h("useWindowSize", "use-window-size", "useWindowSize.ts", "Tracks window width and height, updating on resize with debouncing.")
];

// src/Components/accordion.registry.ts
var accordionRegistry = {
  component: "Accordion",
  slug: "accordion",
  category: "disclosure",
  complexity: "compound",
  description: "A vertically stacked set of interactive headings that each reveal a section of content.",
  ai_summary: "Accordion is a compound component for organizing content into collapsible sections. Composed of Accordion.Item, Accordion.Header, and Accordion.Body. Supports single or multiple open panels with animated transitions and full keyboard navigation.",
  intent: [
    "Organize related content into collapsible sections",
    "Reduce visual clutter by hiding content behind headings",
    "Present FAQ or Q&A content",
    "Create space-efficient navigation for settings panels"
  ],
  ai_keywords: [
    "accordion",
    "collapsible",
    "expandable",
    "disclosure",
    "FAQ",
    "toggle",
    "collapse",
    "expand",
    "panel",
    "section"
  ],
  when_to_use: [
    "When you need to organize related but independent sections of content",
    "For FAQ or Q&A layouts",
    "When vertical space is limited and content can be grouped",
    "For settings panels with multiple categories",
    "When users only need to see specific sections at a time"
  ],
  when_not_to_use: [
    "When all content needs to be visible simultaneously",
    "For critical information that should always be in view",
    "When the content inside is interdependent",
    "For very short content that doesn't benefit from collapsing"
  ],
  composition: {
    root: "Accordion",
    slots: [
      "Accordion.Item",
      "Accordion.Header",
      "Accordion.Body"
    ],
    structure: [
      "Accordion",
      "Accordion.Item",
      "Accordion.Header",
      "Accordion.Body"
    ],
    rules: [
      "Accordion.Item must be a direct child of Accordion",
      "Accordion.Header must be inside Accordion.Item",
      "Accordion.Body must be inside Accordion.Item",
      "Accordion.Header itemId must match parent Accordion.Item itemId",
      "Accordion.Body itemId must match parent Accordion.Item itemId"
    ]
  },
  props: {
    Accordion: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Accordion.Item components to render inside the accordion"
      },
      {
        name: "allowMultiple",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether multiple items can be open at the same time"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the accordion container"
      }
    ],
    "Accordion.Item": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Accordion.Header and Accordion.Body components"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Unique identifier for the item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the item container"
      }
    ],
    "Accordion.Header": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Content to display in the header button"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Must match the itemId of the parent Accordion.Item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the header button"
      }
    ],
    "Accordion.Body": [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Content to display when the accordion item is expanded"
      },
      {
        name: "itemId",
        type: "string",
        required: true,
        description: "Must match the itemId of the parent Accordion.Item"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the body content"
      }
    ]
  },
  variants: [],
  states: [
    "expanded",
    "collapsed",
    "hovered",
    "focused"
  ],
  responsive: {
    allowed: false,
    patterns: []
  },
  design_tokens: {
    used: {
      colors: [
        "ground-200",
        "ground-800",
        "ground-950",
        "ground-900",
        "ground-50",
        "ground-100",
        "ground-400",
        "ground-500",
        "ground-600",
        "primary-500",
        "primary-600",
        "primary-400"
      ],
      radius: ["xl"],
      border: ["border", "border-b"],
      spacing: ["px-5", "py-4", "pb-5", "pt-1", "my-2", "ml-3"],
      typography: ["font-secondary", "font-medium", "text-base", "text-left", "leading-relaxed"]
    },
    recommended: {
      colors: [
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-100",
        "primary-500"
      ],
      radius: ["xl"],
      typography: ["font-secondary", "font-medium"]
    },
    allowed: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-400",
        "ground-500",
        "ground-600",
        "ground-800",
        "ground-900",
        "ground-950",
        "primary-400",
        "primary-500",
        "primary-600"
      ],
      radius: ["xl"],
      border: ["border", "border-b"],
      spacing: ["px-5", "py-4", "pb-5", "pt-1", "my-2", "ml-3"],
      typography: ["font-secondary", "font-medium", "text-base", "text-left", "leading-relaxed"]
    }
  },
  examples: [
    {
      name: "Basic Accordion",
      description: "A simple single-select accordion where only one item can be open at a time",
      code: `<Accordion>
  <Accordion.Item itemId="item-1">
    <Accordion.Header itemId="item-1">
      Is it accessible?
    </Accordion.Header>
    <Accordion.Body itemId="item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="item-2">
    <Accordion.Header itemId="item-2">
      Is it styled?
    </Accordion.Header>
    <Accordion.Body itemId="item-2">
      <p>Yes. It comes with default styles that matches the other components' aesthetic.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="item-3">
    <Accordion.Header itemId="item-3">
      Is it animated?
    </Accordion.Header>
    <Accordion.Body itemId="item-3">
      <p>Yes. It's animated by default, but you can disable it if you prefer. Animations respect prefers-reduced-motion preferences.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`
    },
    {
      name: "Multiple Open Items",
      description: "An accordion that allows multiple items to be expanded simultaneously",
      code: `<Accordion allowMultiple>
  <Accordion.Item itemId="multi-item-1">
    <Accordion.Header itemId="multi-item-1">
      Is it accessible?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern and WCAG 2.2 AA standards.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="multi-item-2">
    <Accordion.Header itemId="multi-item-2">
      Is it styled?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-2">
      <p>Yes. It comes with default styles that matches the other components' aesthetic.</p>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="multi-item-3">
    <Accordion.Header itemId="multi-item-3">
      Is it animated?
    </Accordion.Header>
    <Accordion.Body itemId="multi-item-3">
      <p>Yes. It's animated by default, but you can disable it if you prefer.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`
    }
  ],
  accessibility: {
    pattern: "WAI-ARIA Accordion Pattern",
    standards: [
      "WAI-ARIA accordion pattern compliance",
      "WCAG 2.2 AA standards"
    ],
    keyboard_support: [
      "ArrowDown - Move focus to the next accordion header",
      "ArrowUp - Move focus to the previous accordion header",
      "Home - Move focus to the first accordion header",
      "End - Move focus to the last accordion header",
      "Escape - Close the currently open panel when focused",
      "Enter/Space - Toggle the accordion panel"
    ],
    aria_attributes: [
      "aria-expanded - Indicates whether the accordion panel is expanded",
      "aria-controls - References the controlled panel by ID",
      "aria-labelledby - Labels the panel region by its header",
      "aria-hidden - Hides closed panels from screen readers",
      "role='region' - Identifies the panel as a landmark region"
    ]
  },
  anti_patterns: [
    "Nesting accordions inside accordion bodies",
    "Using non-unique itemId values across items",
    "Mismatching itemId between Item, Header, and Body",
    "Placing critical content that must always be visible inside an accordion",
    "Using accordion for navigation menus with many items"
  ],
  dependencies: {
    icons: ["ChevronDownIcon"],
    utilities: ["cn"],
    components: []
  },
  relationships: {
    used_with: [],
    often_inside: ["Card", "Modal", "Drawer"],
    often_contains: []
  },
  related_components: [],
  validation_rules: [
    "Accordion.Item must be a direct child of Accordion",
    "Accordion.Header must be inside Accordion.Item",
    "Accordion.Body must be inside Accordion.Item",
    "Accordion.Header itemId must match parent Accordion.Item itemId",
    "Accordion.Body itemId must match parent Accordion.Item itemId",
    "Each itemId must be unique within an Accordion"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add accordion"
  ],
  source: {
    file: "packages/ui/src/components/ui/accordion.tsx",
    language: "typescript",
    framework: "react"
  },
  meta: {
    doc_url: "/docs/components/accordion",
    source_file: "packages/ui/src/components/ui/accordion.tsx",
    extracted: [
      "component",
      "slug",
      "description",
      "composition",
      "props",
      "accessibility",
      "dependencies",
      "installation",
      "examples"
    ],
    inferred: [
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "states",
      "responsive",
      "anti_patterns",
      "relationships",
      "validation_rules",
      "design_tokens"
    ]
  }
};

// src/Components/affix.registry.ts
var affixRegistry = {
  component: "Affix",
  slug: "affix",
  category: "layout",
  complexity: "simple",
  description: "Pins content to the viewport when scrolling past it. Supports top/bottom positioning, custom scroll containers, and an affixed callback.",
  ai_summary: "A sticky positioning component that pins content to the viewport edge (top or bottom) when the user scrolls past it. Uses a placeholder element to prevent layout shift and supports both window and custom container scrolling.",
  intent: [
    "Create sticky headers or navigation bars",
    "Pin toolbars or action buttons to viewport edges",
    "Implement sticky footers",
    "Maintain visibility of important UI elements during scroll"
  ],
  ai_keywords: ["sticky", "affix", "pin", "scroll", "position", "header", "footer", "navigation", "toolbar"],
  when_to_use: [
    "Navigation bars that should remain visible while scrolling",
    "Action buttons that need to stay accessible",
    "Status indicators or progress bars",
    "Contextual toolbars for long content"
  ],
  when_not_to_use: [
    "Fixed elements that never move (use CSS position: fixed instead)",
    "Modal or overlay content (use Dialog component)",
    "Content that needs complex scroll-based animations",
    "Elements that should scroll naturally with the page"
  ],
  composition: {
    root: "Affix",
    slots: [],
    structure: ["Affix"],
    rules: [
      "Affix wraps a single child element",
      "A placeholder div is automatically created to prevent layout shift"
    ]
  },
  props: {
    Affix: [
      {
        name: "offset",
        type: "number",
        required: false,
        default: 0,
        description: "Distance in pixels from the viewport edge when affixed"
      },
      {
        name: "position",
        type: '"top" | "bottom"',
        required: false,
        default: "top",
        description: "Which viewport edge to affix to"
      },
      {
        name: "target",
        type: "HTMLElement | null",
        required: false,
        default: "window",
        description: "Custom scroll container element (uses window if null)"
      },
      {
        name: "zIndex",
        type: "number",
        required: false,
        default: 100,
        description: "Z-index value when affixed"
      },
      {
        name: "onAffixed",
        type: "(affixed: boolean) => void",
        required: false,
        default: void 0,
        description: "Callback fired when affixed state changes"
      },
      {
        name: "className",
        type: "string",
        required: false,
        default: void 0,
        description: "Additional CSS class names"
      },
      {
        name: "style",
        type: "React.CSSProperties",
        required: false,
        default: void 0,
        description: "Inline styles (merged with affix positioning styles)"
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        default: void 0,
        description: "Content to be affixed"
      }
    ]
  },
  variants: [
    {
      name: "position",
      values: ["top", "bottom"],
      default: "top",
      description: "Determines which viewport edge the content pins to"
    }
  ],
  states: ["affixed", "normal"],
  responsive: {
    allowed: true,
    patterns: [
      "Use different offset values for mobile vs desktop",
      "Conditionally render Affix based on viewport size"
    ]
  },
  design_tokens: {
    used: {
      spacing: [],
      colors: [],
      radius: [],
      border: [],
      typography: []
    },
    recommended: {
      colors: ["primary-600", "primary-500", "info-600", "info-500", "ground-100", "ground-800", "ground-200"],
      spacing: ["px-4", "py-3"],
      radius: ["rounded"],
      typography: ["font-secondary", "text-sm", "text-xs"]
    },
    allowed: {
      colors: [],
      spacing: [],
      radius: [],
      border: [],
      typography: []
    }
  },
  examples: [
    {
      name: "Top Affix Navigation",
      description: "A navigation bar that sticks to the top of the viewport",
      code: `<Affix
  offset={64}
  onAffixed={setTopAffixed}
  role="navigation"
  aria-label="Sticky navigation bar"
>
  <div className={\`
    flex items-center justify-between px-4 py-3 rounded
    font-secondary text-sm transition-colors duration-medium
    \${topAffixed
      ? "bg-primary-600 text-white dark:bg-primary-500"
      : "bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200"
    }
  \`}>
    <span className="font-semibold">
      {topAffixed ? "Affixed to top" : "Scroll down to affix me"}
    </span>
  </div>
</Affix>`
    },
    {
      name: "Bottom Affix Footer",
      description: "A footer bar that sticks to the bottom of the viewport",
      code: `<Affix
  offset={16}
  position="bottom"
  onAffixed={setBottomAffixed}
  role="region"
  aria-label="Sticky footer bar"
>
  <div className={\`
    flex items-center justify-between px-4 py-3 rounded
    font-secondary text-sm transition-colors duration-medium
    \${bottomAffixed
      ? "bg-info-600 text-white dark:bg-info-500"
      : "bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200"
    }
  \`}>
    <span className="font-semibold">
      {bottomAffixed ? "Affixed to bottom" : "Scroll up to affix me"}
    </span>
  </div>
</Affix>`
    },
    {
      name: "Custom Container Affix",
      description: "Affix content within a custom scrollable container",
      code: `const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} style={{ height: 400, overflow: 'auto' }}>
  <Affix target={containerRef.current} offset={0}>
    <div className="bg-ground-100 p-4">Sticky header in container</div>
  </Affix>
  {/* Scrollable content */}
</div>`
    }
  ],
  accessibility: {
    pattern: "ARIA landmark pattern",
    standards: [
      "WCAG 2.1 Level AA",
      "ARIA 1.2 specification"
    ],
    keyboard_support: [
      "No direct keyboard interaction - component is presentational"
    ],
    aria_attributes: [
      "role - Should be set to appropriate landmark (navigation, region, etc.)",
      "aria-label - Provides accessible name for screen readers",
      "data-affixed - Boolean attribute indicating affixed state (CSS hook)",
      "aria-hidden - Set on placeholder element to hide from screen readers"
    ]
  },
  anti_patterns: [
    "Nesting Affix components inside each other",
    "Using Affix without providing aria-label for screen reader context",
    "Setting very high zIndex values that conflict with modals",
    "Affixing large content blocks that consume too much viewport space",
    "Using Affix for elements that should use CSS position: sticky directly"
  ],
  dependencies: {
    icons: [],
    utilities: ["cn"],
    components: []
  },
  relationships: {
    used_with: ["Container", "Card", "Navigation", "Toolbar"],
    often_inside: ["Container", "Page layouts"],
    often_contains: ["Navigation", "Toolbar", "Action buttons"]
  },
  related_components: ["Container", "Navigation"],
  validation_rules: [
    "Affix must have children prop",
    "target prop must be a valid HTMLElement or null",
    "offset should be a non-negative number",
    "zIndex should be a positive number to ensure visibility"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add affix"
  ],
  source: {
    file: "src/components/ui/affix.tsx",
    language: "typescript",
    framework: "react"
  },
  meta: {
    doc_url: "/docs/components/affix",
    source_file: "packages/ui/src/components/ui/affix.tsx",
    extracted: [
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "description"
    ],
    inferred: [
      "complexity",
      "category",
      "ai_keywords",
      "ai_summary",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "relationships",
      "anti_patterns",
      "validation_rules"
    ]
  }
};

// src/Components/buttongroup.registry.ts
var buttongroupRegistry = {
  component: "ButtonGroup",
  slug: "buttongroup",
  category: "actions",
  complexity: "simple",
  description: "Groups multiple buttons together with connected borders and rounded edges for cohesive action layouts.",
  ai_summary: "A container component that arranges Button components in a horizontal or vertical group with unified styling, shared borders, and coordinated focus management.",
  intent: [
    "Group related action buttons together",
    "Create segmented controls or toggle groups",
    "Display action toolbars with connected buttons",
    "Organize form submission actions"
  ],
  ai_keywords: [
    "button group",
    "action group",
    "button container",
    "segmented control",
    "toolbar",
    "actions",
    "navigation buttons",
    "connected buttons"
  ],
  when_to_use: [
    "When you need to display multiple related actions together",
    "Creating segmented controls or toggle button groups",
    "Building action toolbars with icon buttons",
    "Displaying form actions (Cancel, Submit) side by side",
    "When buttons should share connected borders without gaps"
  ],
  when_not_to_use: [
    "For a single standalone button",
    "When buttons need independent spacing or positioning",
    "For dropdown menus or navigation lists",
    "When buttons are unrelated or serve different contexts"
  ],
  composition: {
    root: "ButtonGroup",
    slots: [],
    structure: ["ButtonGroup", "Button"],
    rules: [
      "ButtonGroup must contain Button components as direct children",
      "All child buttons receive unified sizing through CSS selectors",
      "First and last buttons receive rounded outer edges",
      "Adjacent buttons share borders without double-borders"
    ]
  },
  props: {
    ButtonGroup: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        default: "horizontal",
        description: "Stack direction of buttons in the group"
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        required: false,
        default: "medium",
        description: "Size applied to all child buttons via CSS selectors"
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        default: false,
        description: "Stretch the group to fill the container width with buttons sharing equal space"
      },
      {
        name: "aria-label",
        type: "string",
        required: true,
        description: "Accessible label for the button group (required for screen readers)"
      },
      {
        name: "aria-labelledby",
        type: "string",
        required: false,
        description: "ID of an element that labels this button group"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the group container"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Button elements to group together"
      }
    ]
  },
  variants: [
    {
      name: "orientation",
      values: ["horizontal", "vertical"],
      default: "horizontal",
      description: "Direction buttons are stacked in the group"
    },
    {
      name: "size",
      values: ["small", "medium", "large"],
      default: "medium",
      description: "Uniform size applied to all child buttons via CSS override"
    }
  ],
  states: ["hover", "focus-visible"],
  responsive: {
    allowed: true,
    patterns: [
      "Use responsive className utilities to adjust orientation on different breakpoints",
      "fullWidth can be combined with responsive classes for mobile-first layouts"
    ]
  },
  design_tokens: {
    used: {
      spacing: ["px-3", "px-4", "px-6", "py-2", "py-2.5", "py-3", "min-h-[36px]", "min-h-[40px]", "min-h-[44px]"],
      typography: ["text-sm", "text-base", "text-lg"]
    },
    recommended: {
      spacing: ["px-4", "py-2.5"],
      typography: ["text-base"]
    },
    allowed: {
      spacing: ["px-3", "px-4", "px-6", "py-2", "py-2.5", "py-3"],
      typography: ["text-sm", "text-base", "text-lg"]
    }
  },
  examples: [
    {
      name: "Horizontal Button Group",
      description: "Default horizontal layout with outline buttons",
      code: `<ButtonGroup aria-label="Group label">
  <Button variant="outline">
    <Button.Text>Button 1</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Button 2</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Button 3</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Vertical Button Group",
      description: "Vertical stack of action buttons",
      code: `<ButtonGroup orientation="vertical" aria-label="Actions">
  <Button variant="outline">
    <Button.Text>Edit</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Copy</Button.Text>
  </Button>
  <Button variant="outline">
    <Button.Text>Delete</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Full Width Button Group",
      description: "Buttons stretch to fill container width",
      code: `<ButtonGroup fullWidth aria-label="Form actions">
  <Button variant="secondary">
    <Button.Text>Cancel</Button.Text>
  </Button>
  <Button variant="primary">
    <Button.Text>Submit</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Mixed Variant Button Group",
      description: "Different button variants in one group for visual hierarchy",
      code: `<ButtonGroup aria-label="Navigation">
  <Button variant="outline">
    <Button.Text>Back</Button.Text>
  </Button>
  <Button variant="secondary">
    <Button.Text>Save Draft</Button.Text>
  </Button>
  <Button variant="primary">
    <Button.Text>Continue</Button.Text>
  </Button>
</ButtonGroup>`
    },
    {
      name: "Icon Button Toolbar",
      description: "Toolbar with icon-only buttons for formatting options",
      code: `<ButtonGroup aria-label="Formatting options">
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </svg>
    </Button.Icon>
  </Button>
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" x2="10" y1="4" y2="4"/>
        <line x1="14" x2="15" y1="20" y2="4"/>
        <line x1="5" x2="19" y1="20" y2="20"/>
      </svg>
    </Button.Icon>
  </Button>
  <Button variant="outline">
    <Button.Icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8"/>
        <path d="M14 12H6"/>
        <path d="M10 8l-4 4 4 4"/>
      </svg>
    </Button.Icon>
  </Button>
</ButtonGroup>`
    }
  ],
  accessibility: {
    pattern: "group",
    standards: [
      "WCAG 2.2 AA compliant",
      "Uses role='group' to indicate a related set of buttons",
      "Focus management via z-index ensures focus ring visibility (WCAG 2.4.11)"
    ],
    keyboard_support: [
      "Tab: Move focus to the next focusable button",
      "Shift + Tab: Move focus to the previous focusable button",
      "Enter / Space: Activate the focused button"
    ],
    aria_attributes: [
      "role='group': Indicates a group of related buttons",
      "aria-label: Required accessible label for screen reader context",
      "aria-labelledby: Alternative to aria-label, references a labeling element"
    ]
  },
  anti_patterns: [
    "Missing aria-label or aria-labelledby makes the group inaccessible to screen readers",
    "Using ButtonGroup for non-button elements will not apply proper styling",
    "Nesting ButtonGroup components can cause unexpected border and focus behavior",
    "Using without Button children will result in an empty group"
  ],
  dependencies: {
    utilities: ["clsx"]
  },
  relationships: {
    used_with: ["Button"],
    often_inside: ["Card", "Dialog", "Form", "Toolbar", "Navbar"],
    often_contains: ["Button"]
  },
  related_components: ["Button"],
  validation_rules: [
    "ButtonGroup must have aria-label or aria-labelledby for accessibility",
    "ButtonGroup should only contain Button components as direct children",
    "size prop only affects direct button children via CSS selectors",
    "fullWidth requires the parent container to have defined width"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add buttongroup"
  ],
  source: {
    file: "packages/ui/src/components/ui/buttongroup.tsx",
    language: "typescript",
    framework: "react"
  },
  meta: {
    doc_url: "/docs/components/buttongroup",
    source_file: "packages/ui/src/components/ui/buttongroup.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "source"
    ],
    inferred: [
      "ai_summary",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "relationships",
      "validation_rules",
      "anti_patterns",
      "design_tokens"
    ]
  }
};

// src/Components/card.registry.ts
var cardRegistry = {
  component: "Card",
  slug: "card",
  category: "containers",
  complexity: "compound",
  description: "A compound card component with header, media, content, and footer sub-components. Supports interactive and linked cards.",
  ai_summary: "A compound container component that groups related content into an elevated surface with optional media, header, body content, and footer actions. Supports interactive (keyboard-accessible) and linked (anchor-based) variants for clickable cards.",
  intent: [
    "Display grouped content in an elevated container",
    "Create clickable cards with keyboard accessibility",
    "Render linked cards as navigation elements",
    "Show media-rich content with overlays",
    "Present user profiles with avatar and actions"
  ],
  ai_keywords: [
    "card",
    "container",
    "panel",
    "section",
    "interactive",
    "clickable",
    "linked",
    "elevated",
    "media",
    "header",
    "footer",
    "wcag"
  ],
  when_to_use: [
    "Displaying grouped content that benefits from visual separation",
    "Creating clickable or tappable content areas",
    "Showing navigation items as linked cards",
    "Presenting media content with titles and descriptions",
    "Building user profile cards with avatar and actions",
    "Creating product cards with images and details"
  ],
  when_not_to_use: [
    "Simple inline content (use Typography instead)",
    "Form inputs (use Input components instead)",
    "Navigation menus (use Navbar or Menu components)",
    "Modal dialogs (use Dialog component instead)",
    "When content doesn't need visual grouping"
  ],
  composition: {
    root: "Card",
    slots: [
      "Card.Header",
      "Card.Media",
      "Card.Content",
      "Card.Footer"
    ],
    structure: [
      "Card",
      "Card.Header",
      "Card.Media",
      "Card.Content",
      "Card.Footer"
    ],
    rules: [
      "Card sub-components can be used in any order",
      "Card.Media extends to card edges with negative margin styling",
      "Card.Footer is designed for action elements like buttons",
      "Card.Header supports avatar, title, subtitle, and action props",
      "All sub-components are optional - use only what you need"
    ]
  },
  props: {
    "Card": [
      {
        name: "interactive",
        type: "boolean",
        required: false,
        default: false,
        description: "Make the entire card clickable with keyboard support (Enter/Space)"
      },
      {
        name: "href",
        type: "string",
        required: false,
        description: "Render the card as an anchor element with this URL"
      },
      {
        name: "target",
        type: "string",
        required: false,
        description: "Link target attribute (e.g., '_blank' for new tab)"
      },
      {
        name: "rel",
        type: "string",
        required: false,
        description: "Anchor rel attribute; defaults to 'noopener noreferrer' for target='_blank'"
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: false,
        description: "Disable all interactions and reduce opacity"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Card sub-components (Header, Media, Content, Footer)"
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        description: "Click handler - automatically makes card interactive"
      }
    ],
    "Card.Header": [
      {
        name: "title",
        type: "ReactNode",
        required: false,
        description: "Main heading text rendered as h3"
      },
      {
        name: "subtitle",
        type: "ReactNode",
        required: false,
        description: "Secondary text displayed below the title"
      },
      {
        name: "action",
        type: "ReactNode",
        required: false,
        description: "Trailing element on the right side (e.g., button, badge)"
      },
      {
        name: "avatar",
        type: "ReactNode",
        required: false,
        description: "Leading icon or avatar on the left side"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Card.Media": [
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
        description: "Alt text for accessibility"
      },
      {
        name: "aspectRatio",
        type: "string",
        required: false,
        default: "16/9",
        description: "CSS aspect-ratio value"
      },
      {
        name: "fit",
        type: "'cover' | 'contain' | 'fill'",
        required: false,
        default: "cover",
        description: "Object-fit behavior for the image"
      },
      {
        name: "overlay",
        type: "ReactNode",
        required: false,
        description: "Content rendered on top of the image with gradient overlay"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Card.Content": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Body content text or elements"
      }
    ],
    "Card.Footer": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Action elements (buttons, links)"
      }
    ]
  },
  variants: [
    {
      name: "fit",
      values: ["cover", "contain", "fill"],
      default: "cover",
      description: "Object-fit behavior for Card.Media images"
    },
    {
      name: "interactive",
      values: ["true", "false"],
      default: "false",
      description: "Makes card clickable with keyboard support"
    },
    {
      name: "disabled",
      values: ["true", "false"],
      default: "false",
      description: "Disables all card interactions"
    }
  ],
  states: ["hover", "focus-visible", "disabled"],
  responsive: {
    allowed: true,
    patterns: [
      "Card fills available width by default",
      "Use max-w-* utilities to constrain card width",
      "Aspect ratio can be responsive with inline styles"
    ]
  },
  design_tokens: {
    used: {
      colors: [
        "bg-white",
        "dark:bg-ground-900",
        "border-ground-200",
        "dark:border-ground-800",
        "text-ground-900",
        "dark:text-ground-50",
        "text-ground-500",
        "dark:text-ground-400",
        "text-ground-700",
        "dark:text-ground-300",
        "text-primary-500",
        "bg-primary-500",
        "text-primary-600",
        "dark:text-primary-400"
      ],
      radius: [
        "rounded-lg",
        "rounded-t-[inherit]",
        "rounded-b-[inherit]",
        "rounded-full"
      ],
      border: [
        "border",
        "border-t"
      ],
      spacing: [
        "p-5",
        "p-4",
        "gap-3",
        "gap-2",
        "pt-2",
        "mt-0.5"
      ],
      typography: [
        "text-lg",
        "text-sm",
        "font-semibold",
        "font-primary",
        "font-secondary",
        "leading-tight",
        "leading-snug",
        "leading-relaxed",
        "truncate"
      ],
      shadow: [
        "shadow-outer",
        "hover:shadow-lg"
      ]
    },
    recommended: {
      colors: [
        "bg-white",
        "dark:bg-ground-900",
        "text-ground-900",
        "dark:text-ground-50"
      ],
      radius: ["rounded-lg"],
      spacing: ["p-5", "gap-3"]
    },
    allowed: {
      colors: [
        "bg-white",
        "dark:bg-ground-900",
        "border-ground-200",
        "dark:border-ground-800",
        "text-ground-900",
        "dark:text-ground-50",
        "text-ground-500",
        "dark:text-ground-400",
        "text-ground-700",
        "dark:text-ground-300"
      ],
      radius: ["rounded-lg", "rounded-xl", "rounded-2xl"],
      border: ["border", "border-t"],
      spacing: ["p-3", "p-4", "p-5", "p-6", "gap-2", "gap-3", "gap-4"],
      typography: ["text-sm", "text-base", "text-lg"]
    }
  },
  examples: [
    {
      name: "Basic Card",
      description: "Complete card with all sub-components",
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Media src="/photo.jpg" alt="Photo" />
  <Card.Header title="Title" subtitle="Subtitle" />
  <Card.Content>Body text.</Card.Content>
  <Card.Footer>
    <button>Action</button>
  </Card.Footer>
</Card>`
    },
    {
      name: "Interactive Card",
      description: "Clickable card with keyboard support",
      code: `import { Card } from "vayu-ui";

<Card interactive onClick={() => console.log("clicked")}>
  <Card.Header title="Clickable Card" />
  <Card.Content>
    This card is focusable and responds to Enter/Space keys.
  </Card.Content>
</Card>`
    },
    {
      name: "Linked Card",
      description: "Card rendered as anchor element",
      code: `import { Card } from "vayu-ui";

<Card href="/details" target="_blank">
  <Card.Header title="Link Card" />
</Card>`
    },
    {
      name: "Disabled Card",
      description: "Non-interactive card with reduced opacity",
      code: `import { Card } from "vayu-ui";

<Card disabled interactive>
  <Card.Header
    title="Disabled Card"
    subtitle="Pointer events are blocked"
  />
</Card>`
    },
    {
      name: "Card with Avatar and Action",
      description: "User profile card with avatar and action button",
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Header
    avatar={
      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
        JD
      </div>
    }
    title="John Doe"
    subtitle="Software Engineer"
    action={
      <button className="text-sm text-primary-600">Follow</button>
    }
  />
  <Card.Content>
    Building beautiful user interfaces.
  </Card.Content>
</Card>`
    },
    {
      name: "Card with Media Overlay",
      description: "Image with gradient overlay content",
      code: `import { Card } from "vayu-ui";

<Card>
  <Card.Media
    src="/hero.jpg"
    alt="Hero image"
    overlay={
      <span className="text-white font-semibold">Featured</span>
    }
  />
  <Card.Header title="Featured Content" />
</Card>`
    }
  ],
  accessibility: {
    pattern: "WCAG 2.2 AA compliant interactive container",
    standards: [
      "WCAG 2.2 AA - Focus visible styling with outline",
      "WCAG 2.1.1 - Keyboard accessible interactive cards",
      "WCAG 2.4.11 - Focus appearance with visible outline",
      "Semantic HTML with h3 for card titles",
      "Automatic rel='noopener noreferrer' for external links"
    ],
    keyboard_support: [
      "Tab: Move focus to/from the card",
      "Enter: Activate interactive card (when interactive=true)",
      "Space: Activate interactive card (when interactive=true)"
    ],
    aria_attributes: [
      "role='button': Applied to interactive cards without href",
      "tabIndex='0': Makes interactive cards focusable",
      "aria-disabled: Indicates disabled state",
      "aria-hidden='true': Applied to decorative avatar elements"
    ]
  },
  anti_patterns: [
    "Using interactive cards without an onClick handler",
    "Missing alt text on Card.Media images",
    "Nesting interactive cards inside other interactive elements",
    "Using Card.Header title without providing meaningful heading text",
    "Relying solely on color to convey card state",
    "Using disabled cards when the content should be hidden instead"
  ],
  dependencies: {
    utilities: ["clsx"]
  },
  relationships: {
    used_with: ["Button", "Typography", "Avatar", "Badge", "Skeleton"],
    often_inside: ["Container", "Grid", "Stack", "Section", "Dialog"],
    often_contains: ["Typography", "Button", "Badge", "Avatar"]
  },
  related_components: ["Button", "Typography", "Avatar", "Badge"],
  validation_rules: [
    "Card.Media requires both src and alt props",
    "Interactive cards should have an onClick handler defined",
    "External links (target='_blank') automatically receive rel='noopener noreferrer'",
    "Disabled cards ignore all interactive props",
    "Card.Header title should be meaningful for accessibility"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add card"
  ],
  source: {
    file: "packages/ui/src/components/ui/card.tsx",
    language: "typescript",
    framework: "react"
  },
  meta: {
    doc_url: "/docs/components/card",
    source_file: "packages/ui/src/components/ui/card.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "installation",
      "source"
    ],
    inferred: [
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "composition",
      "responsive",
      "anti_patterns",
      "dependencies",
      "relationships",
      "validation_rules",
      "design_tokens"
    ]
  }
};

// src/Components/skeleton.registry.ts
var skeletonRegistry = {
  component: "Skeleton",
  slug: "skeleton",
  category: "Feedback",
  complexity: "compound",
  description: "A placeholder loading component that displays animated shapes while content is being fetched or loaded.",
  ai_summary: "Skeleton is a compound component for loading states with 11 subcomponents. Supports multiple animation types (pulse, wave, none), four variants (text, circular, rectangular, rounded), and four size presets. Includes pre-built patterns for Card, Avatar, List, Table, and Grid layouts. WCAG 2.2 AA compliant with screen reader announcements and motion preference support.",
  intent: [
    "Display loading placeholders while content is being fetched",
    "Provide visual feedback during asynchronous operations",
    "Maintain layout stability during content loading",
    "Improve perceived performance with animated placeholders"
  ],
  ai_keywords: [
    "skeleton",
    "loading",
    "placeholder",
    "shimmer",
    "pulse",
    "wave",
    "loader",
    "spinner",
    "skeleton-loader",
    "content-placeholder",
    "loading-state",
    "skeleton-screen"
  ],
  when_to_use: [
    "When fetching data from APIs or databases",
    "During initial page load while content is being loaded",
    "For image galleries or card grids during lazy loading",
    "In list views while items are being fetched",
    "For table data that takes time to load",
    "In avatar or profile sections while user data loads"
  ],
  when_not_to_use: [
    "When content loads instantly (adds unnecessary visual noise)",
    "For static content that never changes",
    "As a permanent UI element",
    "When a simple text 'Loading...' would suffice",
    "For non-critical decorative content",
    "In error states (use Error component instead)"
  ],
  composition: {
    root: "Skeleton",
    slots: [
      "Skeleton.Root",
      "Skeleton.Item",
      "Skeleton.Text",
      "Skeleton.Circle",
      "Skeleton.Rectangle",
      "Skeleton.Card",
      "Skeleton.Avatar",
      "Skeleton.List",
      "Skeleton.Table",
      "Skeleton.Grid",
      "Skeleton.Group"
    ],
    structure: [
      "Skeleton",
      "Skeleton.Root",
      "Skeleton.Item",
      "Skeleton.Text",
      "Skeleton.Circle",
      "Skeleton.Rectangle",
      "Skeleton.Card",
      "Skeleton.Avatar",
      "Skeleton.List",
      "Skeleton.Table",
      "Skeleton.Grid",
      "Skeleton.Group"
    ],
    rules: [
      "Skeleton.Root provides the ARIA live region wrapper for accessibility",
      "Skeleton.Item is the base building block for custom skeletons",
      "Skeleton.Text is optimized for multi-line text placeholders",
      "Skeleton.Circle is ideal for avatar placeholders",
      "Skeleton.Rectangle is for image or card content placeholders",
      "Skeleton.Card, Avatar, List, Table, Grid are pre-built composite patterns",
      "Skeleton.Group is a container for organizing multiple skeleton elements"
    ]
  },
  props: {
    "Skeleton.Root": [
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style for visual feedback"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Default size for child elements (informational)"
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        default: '"Loading"',
        description: "Accessible label for loading state"
      },
      {
        name: "aria-live",
        type: '"polite" | "assertive" | "off"',
        required: false,
        default: '"polite"',
        description: "Whether to announce loading state to screen readers"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Item": [
      {
        name: "variant",
        type: '"text" | "circular" | "rectangular" | "rounded"',
        required: false,
        default: '"text"',
        description: "The shape of the skeleton item"
      },
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Custom width"
      },
      {
        name: "height",
        type: "string | number",
        required: false,
        description: "Custom height"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for the item"
      },
      {
        name: "count",
        type: "number",
        required: false,
        default: 1,
        description: "Number of items to render"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Text": [
      {
        name: "lines",
        type: "number",
        required: false,
        default: 1,
        description: "Number of text lines"
      },
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Width of lines (except last one)"
      },
      {
        name: "lastLineWidth",
        type: "string | number",
        required: false,
        description: "Width of the last line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for text lines"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Circle": [
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size of the circle"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Rectangle": [
      {
        name: "width",
        type: "string | number",
        required: false,
        description: "Custom width"
      },
      {
        name: "height",
        type: "string | number",
        required: false,
        description: "Custom height"
      },
      {
        name: "rounded",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to use rounded corners"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Avatar": [
      {
        name: "showText",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show text lines next to the circle"
      },
      {
        name: "textLines",
        type: "number",
        required: false,
        default: 2,
        description: "Number of text lines"
      },
      {
        name: "titleWidth",
        type: "string | number",
        required: false,
        default: '"40%"',
        description: "Width of the title line"
      },
      {
        name: "subtitleWidth",
        type: "string | number",
        required: false,
        default: '"60%"',
        description: "Width of the subtitle line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size of the avatar circle"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Card": [
      {
        name: "showImage",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show the image placeholder"
      },
      {
        name: "imageHeight",
        type: "number",
        required: false,
        default: 200,
        description: "Height of the image placeholder"
      },
      {
        name: "lines",
        type: "number",
        required: false,
        default: 3,
        description: "Number of text lines below the image"
      },
      {
        name: "titleWidth",
        type: "string | number",
        required: false,
        default: '"60%"',
        description: "Width of the title line"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.List": [
      {
        name: "items",
        type: "number",
        required: false,
        default: 5,
        description: "Number of list items"
      },
      {
        name: "showAvatar",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to include an avatar placeholder in each item"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Table": [
      {
        name: "rows",
        type: "number",
        required: false,
        default: 5,
        description: "Number of rows"
      },
      {
        name: "columns",
        type: "number",
        required: false,
        default: 4,
        description: "Number of columns"
      },
      {
        name: "showHeader",
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to show a header row"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Grid": [
      {
        name: "items",
        type: "number",
        required: false,
        default: 6,
        description: "Number of grid items"
      },
      {
        name: "columns",
        type: "number",
        required: false,
        default: 3,
        description: "Number of columns"
      },
      {
        name: "itemHeight",
        type: "number",
        required: false,
        default: 200,
        description: "Height of each card's image"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size preset for child elements"
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        required: false,
        default: '"pulse"',
        description: "The animation style"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Skeleton.Group": [
      {
        name: "spacing",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Vertical spacing between children"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ]
  },
  variants: [
    {
      name: "animation",
      values: ["pulse", "wave", "none"],
      default: "pulse",
      description: "Animation style: pulse (opacity fade), wave (shimmer effect), or none (static)"
    },
    {
      name: "variant",
      values: ["text", "circular", "rectangular", "rounded"],
      default: "text",
      description: "Shape variant for Skeleton.Item: text (full-width lines), circular (round), rectangular (sharp corners), rounded (rounded corners)"
    },
    {
      name: "size",
      values: ["sm", "md", "lg", "xl"],
      default: "md",
      description: "Size preset affecting dimensions of skeleton elements"
    }
  ],
  states: ["loading", "loaded"],
  responsive: {
    allowed: true,
    patterns: [
      "Skeleton.Grid columns can be adjusted per breakpoint",
      "Skeleton.Table columns adapt to container width",
      "Width and height props accept responsive values",
      "Pre-built patterns use responsive-friendly defaults"
    ]
  },
  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-950"
      ],
      radius: ["rounded", "rounded-lg", "rounded-full"],
      border: ["border", "border-b", "border-transparent"],
      spacing: [
        "p-3",
        "p-4",
        "gap-3",
        "gap-4",
        "mb-2",
        "mb-3",
        "mb-4",
        "space-y-2",
        "space-y-4",
        "space-y-6"
      ],
      typography: []
    },
    recommended: {
      colors: ["ground-200", "ground-800", "ground-50", "ground-950"],
      radius: ["rounded", "rounded-lg", "rounded-full"]
    },
    allowed: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-800",
        "ground-900",
        "ground-950"
      ],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"],
      border: ["border", "border-b", "border-transparent"],
      spacing: ["p-*", "gap-*", "m-*", "space-y-*", "mb-*"],
      typography: []
    }
  },
  examples: [
    {
      name: "Basic Skeleton Text",
      description: "Simple text skeleton with 3 lines",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Text lines={3} />`
    },
    {
      name: "Avatar Skeleton",
      description: "Avatar placeholder with text lines",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Avatar showText textLines={2} />`
    },
    {
      name: "Card Skeleton",
      description: "Card layout skeleton with image and text",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Card showImage imageHeight={200} lines={3} />`
    },
    {
      name: "Custom Item Skeleton",
      description: "Custom rectangular skeleton with specific dimensions",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Item variant="rectangular" height={200} />`
    },
    {
      name: "With Root Wrapper",
      description: "Skeleton with accessibility wrapper for screen readers",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Root animation="wave" aria-label="Loading content">
  <Skeleton.Text lines={2} animation="wave" />
</Skeleton.Root>`
    },
    {
      name: "List Skeleton",
      description: "List items skeleton with avatars",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.List items={5} showAvatar />`
    },
    {
      name: "Table Skeleton",
      description: "Table skeleton with header",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Table rows={5} columns={4} showHeader />`
    },
    {
      name: "Grid Skeleton",
      description: "Grid of card skeletons",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Grid items={6} columns={3} itemHeight={200} />`
    },
    {
      name: "Complete Anatomy",
      description: "Full anatomy showing all subcomponents",
      code: `import { Skeleton } from "vayu-ui";

<Skeleton.Root aria-label="Loading content">
  <Skeleton.Item variant="text" />
  <Skeleton.Text lines={3} />
  <Skeleton.Circle size="md" />
  <Skeleton.Rectangle height={200} />
  <Skeleton.Avatar />
  <Skeleton.Card />
  <Skeleton.List items={5} />
  <Skeleton.Table rows={5} columns={4} />
  <Skeleton.Grid items={6} columns={3} />
  <Skeleton.Group spacing="md">
    {/* Multiple skeleton items */}
  </Skeleton.Group>
</Skeleton.Root>`
    }
  ],
  accessibility: {
    pattern: "WCAG 2.2 AA ARIA Live Region",
    standards: [
      "WAI-ARIA status role for loading announcements",
      "WCAG 2.2 AA compliant color contrast",
      "Respects prefers-reduced-motion media query",
      "Server-side rendering compatible"
    ],
    keyboard_support: [],
    aria_attributes: [
      'role="status" - On Skeleton.Root to announce loading state',
      'aria-live="polite" - For deferred loading announcements',
      'aria-live="assertive" - For immediate loading announcements',
      'aria-busy="true" - Indicates content is loading',
      "aria-label - Describes what is loading",
      'aria-hidden="true" - On decorative skeleton items',
      "sr-only span - Provides screen reader text"
    ]
  },
  anti_patterns: [
    "Using skeleton when content loads instantly (adds unnecessary visual noise)",
    "Not wrapping skeletons in Skeleton.Root for accessibility",
    "Using Skeleton.Card or Skeleton.Grid inside Skeleton.List (over-nesting)",
    "Setting animation to 'wave' without the required CSS keyframes",
    "Using skeleton placeholders for error states",
    "Not considering prefers-reduced-motion for users with motion sensitivity"
  ],
  dependencies: {
    icons: [],
    utilities: [],
    components: []
  },
  relationships: {
    used_with: ["Card", "Avatar", "List", "Table", "Grid", "DataGrid"],
    often_inside: ["Page", "Section", "Card", "Container", "Dialog"],
    often_contains: []
  },
  related_components: ["Spinner", "Progress"],
  validation_rules: [
    "Skeleton.Root should wrap skeleton elements for accessibility",
    "Skeleton.Item variant must be one of: text, circular, rectangular, rounded",
    "Skeleton.Item count should be a positive integer",
    "Skeleton.Text lines should be a positive integer",
    "Skeleton.List items should be a positive integer",
    "Skeleton.Table rows and columns should be positive integers",
    "Skeleton.Grid items and columns should be positive integers",
    "animation prop must be one of: pulse, wave, none"
  ],
  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add skeleton"
  ],
  source: {
    file: "packages/ui/src/components/ui/skeleton/",
    language: "TypeScript",
    framework: "React"
  },
  meta: {
    doc_url: "/docs/components/skeleton",
    source_file: "packages/ui/src/components/ui/skeleton/",
    extracted: [
      "component",
      "slug",
      "complexity",
      "composition",
      "props",
      "variants",
      "design_tokens",
      "accessibility",
      "installation",
      "examples"
    ],
    inferred: [
      "category",
      "ai_summary",
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "states",
      "responsive",
      "anti_patterns",
      "relationships",
      "related_components",
      "validation_rules",
      "dependencies"
    ]
  }
};

// src/components.ts
var components = [
  accordionRegistry,
  affixRegistry,
  {
    name: "Alert",
    slug: "alert",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "alert.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Animation",
    slug: "animation",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "animation.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Aspectratio",
    slug: "aspectratio",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "aspectratio.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Audioplayer",
    slug: "audioplayer",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "audioplayer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Avatar",
    slug: "avatar",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "avatar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Avatargroup",
    slug: "avatargroup",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "avatargroup.tsx",
    dependencies: ["clsx"],
    registryDependencies: ["avatar"],
    tags: ["component"]
  },
  {
    name: "Badge",
    slug: "badge",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "badge.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "BigCalendar",
    slug: "big-calendar",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "bigcalendar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "breadcrumb.tsx",
    dependencies: ["lucide-react", "clsx", "@radix-ui/react-slot"],
    registryDependencies: [],
    tags: ["component"]
  },
  // ── Button (rich metadata) ─────────────────────────────────────────────────
  {
    name: "Button",
    slug: "button",
    type: "component",
    category: "action",
    since: "1.0.0",
    description: "Triggers an action or event. Supports variants, sizes, loading state, icons, and badges via a compound component API.",
    targetPath: "src/components/ui",
    fileName: "button.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component", "action", "form"],
    variants: ["primary", "secondary", "outline", "ghost", "destructive"],
    props: {
      variant: {
        type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"',
        required: false,
        default: '"primary"',
        description: "Visual style of the button"
      },
      size: {
        type: '"small" | "medium" | "large"',
        required: false,
        default: '"small"',
        description: "Controls padding and font size"
      },
      loading: {
        type: "Status",
        required: false,
        default: "Status.IDLE",
        description: "Pass Status.PENDING to show spinner and disable interaction"
      },
      loadingText: {
        type: "string",
        required: false,
        default: '"Loading"',
        description: "Screen-reader text shown during loading"
      },
      fullWidth: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Stretches button to fill its container"
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents interaction and applies muted styling"
      },
      type: {
        type: '"button" | "submit" | "reset"',
        required: false,
        default: '"button"',
        description: "Native HTML button type. Always set to submit inside forms"
      },
      children: {
        type: "React.ReactNode",
        required: true,
        description: "Button label content"
      },
      "aria-label": {
        type: "string",
        required: false,
        description: "Required when button has no visible text (icon-only)"
      }
    },
    events: {
      onClick: {
        signature: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        description: "Fires on click. Not fired when disabled or loading"
      },
      onFocus: {
        signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
        description: "Fires when button receives focus"
      },
      onBlur: {
        signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
        description: "Fires when button loses focus"
      }
    },
    states: {
      default: {
        trigger: "No special props",
        visualChange: "Base background and text from variant"
      },
      hover: {
        trigger: "Mouse hover (CSS)",
        visualChange: "Background darkens by one shade"
      },
      focus: {
        trigger: "Keyboard Tab or click",
        visualChange: "focus-visible ring-2 ring-offset-2",
        ariaAttr: ":focus-visible"
      },
      disabled: {
        trigger: "disabled={true}",
        visualChange: "opacity-60, cursor-not-allowed, pointer-events-none",
        ariaAttr: 'aria-disabled="true"'
      },
      loading: {
        trigger: "loading={Status.PENDING}",
        visualChange: "Spinner replaces children, button implicitly disabled",
        ariaAttr: 'aria-busy="true"'
      }
    },
    examples: {
      default: {
        code: `<Button>Save Changes</Button>`,
        description: "Default primary button"
      },
      outline: {
        code: `<Button variant="outline">Cancel</Button>`,
        description: "Outline for secondary actions"
      },
      ghost: {
        code: `<Button variant="ghost" size="small">Clear</Button>`,
        description: "Ghost for low-priority tertiary actions"
      },
      destructive: {
        code: `<Button variant="destructive">Delete Account</Button>`,
        description: "Destructive variant for irreversible actions"
      },
      loading: {
        code: `<Button loading={Status.PENDING}>Submitting...</Button>`,
        description: "Loading state during async operations"
      },
      withIcon: {
        code: `<Button>
  <Button.Icon><PlusIcon /></Button.Icon>
  <Button.Text>Add Item</Button.Text>
</Button>`,
        description: "Compound pattern with icon and text"
      },
      withBadge: {
        code: `<Button>
  Notifications
  <Button.Badge value={5} position="inline-right" />
</Button>`,
        description: "Button with inline notification badge"
      },
      formSubmit: {
        code: `<form onSubmit={handleSubmit}>
  <Button type="submit" loading={isSubmitting ? Status.PENDING : Status.IDLE} fullWidth>
    Create Account
  </Button>
</form>`,
        description: "Inside a form with submit type and loading state"
      }
    },
    a11y: {
      role: "button",
      requiredAttrs: {
        "aria-label": "Required when button has no visible text (icon-only buttons)"
      },
      managedAttrs: ["aria-disabled", "aria-busy", "aria-live"],
      keyboard: {
        Enter: "Activates the button",
        Space: "Activates the button"
      },
      focusManagement: "Focus remains on button after click. Move focus manually if button triggers navigation."
    },
    composition: {
      parts: {
        Button: "Root \u2014 the actual <button> element",
        "Button.Icon": "Wrapper for icons (sized to match button size)",
        "Button.Text": "Truncating text wrapper",
        "Button.Badge": "Notification badge (positioned or inline)"
      },
      example: `<Button variant="primary" size="medium">
  <Button.Icon><BellIcon /></Button.Icon>
  <Button.Text>Notifications</Button.Text>
  <Button.Badge value={3} position="top-right" variant="danger" />
</Button>`,
      partsRequired: false
    },
    tokens: [
      {
        var: "--color-primary-600",
        value: "#6366f1",
        controls: "primary variant background",
        overridable: true
      },
      {
        var: "--color-primary-700",
        value: "#4f46e5",
        controls: "primary variant hover bg",
        overridable: true
      },
      {
        var: "--color-error-600",
        value: "#dc2626",
        controls: "destructive variant background",
        overridable: true
      }
    ],
    darkMode: { automatic: true },
    peerComponents: ["Tooltip", "Buttongroup", "Form"],
    doNot: [
      {
        rule: "Don't use ghost for primary CTAs",
        category: "ux",
        why: "Low visual weight fails to draw attention"
      },
      {
        rule: "Don't nest <a> or <button> inside Button",
        category: "nesting",
        why: "Invalid HTML \u2014 causes unpredictable event behaviour"
      },
      {
        rule: "Don't omit aria-label on icon-only buttons",
        category: "a11y",
        why: "Screen readers cannot describe the button"
      },
      {
        rule: "Don't use loading + disabled simultaneously",
        category: "api",
        why: "Redundant \u2014 loading already disables interaction"
      }
    ],
    testing: {
      testIds: { "root element": "btn-root", "loading spinner": "btn-spinner" },
      storybookPath: "Components/Button"
    }
  },
  buttongroupRegistry,
  cardRegistry,
  {
    name: "Carousel",
    slug: "carousel",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "carousel.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "checkbox.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "collapsible.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "ColorPicker",
    slug: "color-picker",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "colorpicker.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Combobox",
    slug: "combobox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "combobox.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Commandbox",
    slug: "commandbox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "commandbox.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Contextmenu",
    slug: "contextmenu",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "contextmenu.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Datetimepicker",
    slug: "datetimepicker",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "datetimepicker.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Datepicker",
    slug: "datepicker",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "WCAG 2.2 AA compliant date picker with single date and range selection, disabled dates/weekdays support, and full keyboard navigation",
    targetPath: "src/components/ui",
    fileName: "datepicker.tsx",
    dependencies: ["clsx", "moment"],
    registryDependencies: [],
    tags: ["component", "input", "date", "a11y"]
  },
  {
    name: "Divider",
    slug: "divider",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "divider.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Draggable",
    slug: "draggable",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "draggable.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Drawer",
    slug: "drawer",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "drawer.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Fileupload",
    slug: "fileupload",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "fileupload.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Floatingdock",
    slug: "floatingdock",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Label \u2014 displayed in the tooltip.",
    targetPath: "src/components/ui",
    fileName: "floatingdock.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Footer",
    slug: "footer",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "footer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Hook",
    slug: "hook",
    type: "component",
    category: "utility",
    since: "1.0.0",
    description: "VideoPlayer Utility Hooks",
    targetPath: "src/components/ui",
    fileName: "hook.ts",
    dependencies: [],
    registryDependencies: ["videoplayer"],
    tags: ["component"],
    internal: true
  },
  {
    name: "Hovercard",
    slug: "hovercard",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "hovercard.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Marquee",
    slug: "marquee",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "marquee.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Menubar",
    slug: "menubar",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "menubar.tsx",
    dependencies: [],
    registryDependencies: ["use-element-position"],
    tags: ["component"]
  },
  // ── Modal (rich metadata) ──────────────────────────────────────────────────
  {
    name: "Modal",
    slug: "modal",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Accessible dialog overlay rendered in a portal. Supports focus trap, Escape key, scroll lock, and multiple semantic variants via a compound component API.",
    targetPath: "src/components/ui",
    fileName: "modal.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component", "dialog", "overlay"],
    variants: ["default", "danger", "success", "warning", "info"],
    props: {
      open: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Controls modal visibility (controlled)"
      },
      onOpenChange: {
        type: "(open: boolean) => void",
        required: false,
        description: "Called when modal should open or close",
        controlledBy: "open"
      },
      variant: {
        type: '"default" | "danger" | "success" | "warning" | "info"',
        required: false,
        default: '"default"',
        description: "Semantic colour scheme applied to header and border"
      },
      size: {
        type: '"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"',
        required: false,
        default: '"md"',
        description: "Max-width of the modal content panel"
      },
      closeOnOverlayClick: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Close when the backdrop is clicked"
      },
      closeOnEscape: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Close on Escape key press"
      },
      showCloseButton: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Show built-in X close button in header"
      },
      centered: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Vertically center the panel; false aligns to top"
      },
      preventScroll: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Lock body scroll while modal is open"
      },
      initialFocus: {
        type: "React.RefObject<HTMLElement>",
        required: false,
        description: "Ref to focus when modal opens instead of auto-detecting first interactive"
      },
      restoreFocus: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Restore focus to previously focused element on close"
      }
    },
    events: {
      onOpenChange: {
        signature: "(open: boolean) => void",
        description: "Fires when the modal requests a state change (Escape, overlay click, close button)",
        controlledBy: "open"
      }
    },
    states: {
      open: {
        trigger: "open={true}",
        visualChange: "Portal renders, backdrop fades in, panel slides up with zoom",
        ariaAttr: 'aria-modal="true"'
      },
      closed: {
        trigger: "open={false}",
        visualChange: "Portal unmounts \u2014 nothing rendered in DOM"
      }
    },
    examples: {
      default: {
        code: `const [open, setOpen] = React.useState(false);
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirm Action</Modal.Title>
      <Modal.Description>This cannot be undone.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Are you sure you want to proceed?</Modal.Body>
    <Modal.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
        description: "Standard confirmation modal."
      },
      danger: {
        code: `<Modal open={open} onOpenChange={setOpen} variant="danger">
  <Modal.Content>
    <Modal.Header><Modal.Title>Delete Account</Modal.Title></Modal.Header>
    <Modal.Body>This action is permanent.</Modal.Body>
    <Modal.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
        description: "Danger variant for destructive flows."
      },
      noEscape: {
        code: `<Modal open={open} onOpenChange={setOpen} closeOnEscape={false} closeOnOverlayClick={false}>
  <Modal.Content>...</Modal.Content>
</Modal>`,
        description: "Force user to use explicit buttons \u2014 no escape hatch."
      }
    },
    a11y: {
      role: "dialog",
      requiredAttrs: {
        "aria-labelledby": "Auto-wired via Modal.Title \u2014 do not override",
        "aria-describedby": "Auto-wired via Modal.Description"
      },
      managedAttrs: ["aria-modal", "aria-labelledby", "aria-describedby"],
      keyboard: {
        Escape: "Closes the modal (when closeOnEscape is true)",
        Tab: "Cycles focus within modal (focus trapped)",
        "Shift+Tab": "Cycles focus backwards within modal"
      },
      focusManagement: "On open: auto-focuses first interactive element (skipping close button). On close: restores focus to the element that triggered the modal."
    },
    composition: {
      parts: {
        Modal: "Root \u2014 manages state, portal, focus trap, scroll lock",
        "Modal.Content": "Panel container \u2014 sets size, variant border, and role=dialog",
        "Modal.Header": "Top section with optional variant icon and close button",
        "Modal.Title": "h2 wired to aria-labelledby",
        "Modal.Description": "Subtitle wired to aria-describedby",
        "Modal.Body": "Scrollable content area",
        "Modal.Footer": "Action bar with configurable alignment",
        "Modal.Close": "Custom close trigger (use asChild to wrap your own element)",
        "Modal.Trigger": "Optional trigger (use asChild to wrap your own button)"
      },
      example: `<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Supporting text.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Body content</Modal.Body>
    <Modal.Footer>
      <Modal.Close asChild><Button variant="outline">Cancel</Button></Modal.Close>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
      partsRequired: true
    },
    doNot: [
      {
        rule: "Don't render Modal.Content without Modal",
        category: "nesting",
        why: "ModalContext will be undefined \u2014 throws"
      },
      {
        rule: "Don't use open without onOpenChange",
        category: "api",
        why: "Modal becomes read-only; user cannot close it"
      },
      {
        rule: "Don't put interactive elements in the backdrop layer",
        category: "a11y",
        why: "Focus trap will capture them unexpectedly"
      }
    ],
    peerComponents: ["Button", "Drawer"],
    testing: {
      testIds: {
        overlay: "modal-overlay",
        "content panel": "modal-content",
        "close button": "modal-close"
      },
      storybookPath: "Components/Modal"
    }
  },
  {
    name: "Navbar",
    slug: "navbar",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "navbar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Otpinput",
    slug: "otpinput",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Callback when the complete code is entered",
    targetPath: "src/components/ui",
    fileName: "otpinput.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Pagination",
    slug: "pagination",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Pagination Component \u2014 Compound Pattern with Accessibility",
    targetPath: "src/components/ui",
    fileName: "pagination.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Popover",
    slug: "popover",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Export main component with sub-components",
    targetPath: "src/components/ui",
    fileName: "popover.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    tags: ["component"]
  },
  {
    name: "Qrcode",
    slug: "qrcode",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "qrcode.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "radiogroup.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Rate",
    slug: "rate",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Rate Component \u2014 Compound Pattern with Accessibility",
    targetPath: "src/components/ui",
    fileName: "rate.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Resizablepane",
    slug: "resizablepane",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "resizablepane.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Richtexteditor",
    slug: "richtexteditor",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "richtexteditor.tsx",
    dependencies: [
      "clsx",
      "lexical",
      "@lexical/react/LexicalComposer",
      "@lexical/react/LexicalRichTextPlugin",
      "@lexical/react/LexicalContentEditable",
      "@lexical/react/LexicalHistoryPlugin",
      "@lexical/react/LexicalOnChangePlugin",
      "@lexical/react/LexicalComposerContext",
      "@lexical/react/LexicalErrorBoundary",
      "@lexical/react/LexicalListPlugin",
      "@lexical/react/LexicalLinkPlugin",
      "@lexical/react/LexicalMarkdownShortcutPlugin",
      "@lexical/rich-text",
      "@lexical/list",
      "@lexical/link",
      "@lexical/code",
      "@lexical/markdown",
      "@lexical/html"
    ],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "RoleProvider",
    slug: "role-provider",
    type: "component",
    category: "utility",
    since: "1.0.0",
    description: "One or more roles that grant access.",
    targetPath: "src/components/ui",
    fileName: "roleguard.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Select",
    slug: "select",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "select.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Show",
    slug: "show",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Conditionally renders children based on a `when` condition.",
    targetPath: "src/components/ui",
    fileName: "show.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"],
    props: {
      when: {
        type: "boolean | null | undefined",
        required: true,
        description: "Condition that controls rendering"
      },
      fallback: {
        type: "React.ReactNode",
        required: false,
        description: "Rendered when condition is falsy"
      },
      children: {
        type: "React.ReactNode",
        required: true,
        description: "Rendered when condition is truthy"
      }
    },
    examples: {
      default: {
        code: `<Show when={isLoggedIn} fallback={<LoginButton />}><Dashboard /></Show>`,
        description: "Conditional render with fallback"
      }
    }
  },
  {
    name: "SidebarProvider",
    slug: "sidebar-provider",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "sidebar.tsx",
    dependencies: ["lucide-react", "next/link"],
    registryDependencies: [],
    tags: ["component"]
  },
  skeletonRegistry,
  {
    name: "Slider",
    slug: "slider",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "slider.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Spinner",
    slug: "spinner",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "spinner.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Stepper",
    slug: "stepper",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "stepper.tsx",
    dependencies: ["lucide-react", "clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Switch",
    slug: "switch",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "switch.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tab",
    slug: "tab",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Tabs Component \u2014 Compound Pattern",
    targetPath: "src/components/ui",
    fileName: "tab.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Table",
    slug: "table",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Table Component \u2014 Compound Pattern",
    targetPath: "src/components/ui",
    fileName: "table.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "TextArea",
    slug: "text-area",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Export compound component",
    targetPath: "src/components/ui",
    fileName: "textarea.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  // ── TextInput (rich metadata) ──────────────────────────────────────────────
  {
    name: "TextInput",
    slug: "text-input",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Fully-featured compound text input with support for text, email, password, number, tel, url, and search types. Includes label, field, error, description, and character count sub-components.",
    targetPath: "src/components/ui",
    fileName: "textinput.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component", "form", "input"],
    variants: ["default", "filled", "flushed"],
    props: {
      value: {
        type: "string",
        required: false,
        description: "Controlled value"
      },
      defaultValue: {
        type: "string",
        required: false,
        default: '""',
        description: "Uncontrolled initial value"
      },
      onChange: {
        type: "(value: string) => void",
        required: false,
        description: "Called with new value on every change"
      },
      inputType: {
        type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"',
        required: false,
        default: '"text"',
        description: "Underlying HTML input type"
      },
      size: {
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Controls padding and font size of the field"
      },
      variant: {
        type: '"default" | "filled" | "flushed"',
        required: false,
        default: '"default"',
        description: "Visual style of the input container"
      },
      validationState: {
        type: '"default" | "error" | "warning" | "success"',
        required: false,
        default: '"default"',
        description: "Drives border color and shows/hides validation messages"
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents interaction"
      },
      readOnly: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents editing but remains focusable and copyable"
      },
      required: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Marks field as required (adds * to label, sets aria-required)"
      },
      loading: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Shows loading spinner inside field"
      }
    },
    events: {
      onChange: {
        signature: "(value: string) => void",
        description: "Fires on every keystroke with the current string value",
        controlledBy: "value"
      }
    },
    states: {
      default: {
        trigger: "No special props",
        visualChange: "Neutral border and background"
      },
      focus: {
        trigger: "Input receives focus",
        visualChange: "Border turns primary-400, ring-1 appears",
        ariaAttr: ":focus-visible on inner input"
      },
      disabled: {
        trigger: "disabled={true}",
        visualChange: "opacity-60, cursor-not-allowed",
        ariaAttr: "disabled attribute on input"
      },
      error: {
        trigger: 'validationState="error"',
        visualChange: "Border turns error-500, ring-4 error tint; ErrorMessage renders",
        ariaAttr: 'aria-invalid="true"'
      },
      warning: {
        trigger: 'validationState="warning"',
        visualChange: "Border turns warning-500, ring-4 warning tint; WarningMessage renders"
      },
      success: {
        trigger: 'validationState="success"',
        visualChange: "Border turns success-500, ring-4 success tint; SuccessMessage renders"
      },
      loading: {
        trigger: "loading={true}",
        visualChange: "Spinner icon appears inside field"
      }
    },
    examples: {
      default: {
        code: `const [val, setVal] = React.useState("");
<TextInput.Root value={val} onChange={setVal}>
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field><TextInput.Input placeholder="you@example.com" /></TextInput.Field>
  <TextInput.Description>We'll never share your email.</TextInput.Description>
</TextInput.Root>`,
        description: "Basic controlled text input with label and description."
      },
      password: {
        code: `<TextInput.Root inputType="password">
  <TextInput.Label>Password</TextInput.Label>
  <TextInput.Field><TextInput.PasswordInput /></TextInput.Field>
</TextInput.Root>`,
        description: "Password input with built-in show/hide toggle."
      },
      search: {
        code: `<TextInput.Root inputType="search">
  <TextInput.Field><TextInput.SearchInput placeholder="Search..." /></TextInput.Field>
</TextInput.Root>`,
        description: "Search input with clear button."
      },
      withError: {
        code: `<TextInput.Root validationState="error">
  <TextInput.Label>Username</TextInput.Label>
  <TextInput.Field><TextInput.Input /></TextInput.Field>
  <TextInput.ErrorMessage>Username is already taken.</TextInput.ErrorMessage>
</TextInput.Root>`,
        description: "Error state with validation message."
      },
      withCharCount: {
        code: `<TextInput.Root>
  <TextInput.Label>Bio</TextInput.Label>
  <TextInput.Field><TextInput.Input /></TextInput.Field>
  <TextInput.CharacterCount maxLength={160} />
</TextInput.Root>`,
        description: "With character count limit indicator."
      }
    },
    a11y: {
      requiredAttrs: {},
      managedAttrs: [
        "aria-labelledby",
        "aria-describedby",
        "aria-invalid",
        "aria-required"
      ],
      keyboard: {
        Tab: "Moves focus into/out of the input",
        Enter: "Submits nearest form (default browser)"
      },
      focusManagement: "Focus goes directly to the <input> element. Label is linked via htmlFor.",
      liveRegion: "ErrorMessage uses role=alert + aria-live=polite for screen reader announcements."
    },
    composition: {
      parts: {
        "TextInput.Root": "Context provider \u2014 manages value, focus, IDs, and validation state",
        "TextInput.Label": "Accessible <label> linked to input via htmlFor",
        "TextInput.Field": "Visual container for the input and its icons",
        "TextInput.Input": "Core <input> element (standard text/email/etc.)",
        "TextInput.PasswordInput": "Input with show/hide toggle",
        "TextInput.SearchInput": "Input with clear (X) button",
        "TextInput.NumberInput": "Input with numeric validation and min/max",
        "TextInput.Description": "Helper text linked via aria-describedby",
        "TextInput.ErrorMessage": "Shown only when validationState=error",
        "TextInput.WarningMessage": "Shown only when validationState=warning",
        "TextInput.SuccessMessage": "Shown only when validationState=success",
        "TextInput.CharacterCount": "Character counter (configurable threshold)",
        "TextInput.Icon": "Decorative icon wrapper",
        "TextInput.LoadingSpinner": "Spinner shown when loading=true",
        "TextInput.Tooltip": "Inline tooltip with HelpCircle icon"
      },
      example: `<TextInput.Root value={val} onChange={setVal} required validationState={error ? "error" : "default"}>
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field>
    <TextInput.Icon><MailIcon /></TextInput.Icon>
    <TextInput.Input placeholder="you@example.com" />
    <TextInput.LoadingSpinner />
  </TextInput.Field>
  <TextInput.ErrorMessage>Invalid email format.</TextInput.ErrorMessage>
  <TextInput.CharacterCount maxLength={254} />
</TextInput.Root>`,
      partsRequired: false
    },
    doNot: [
      {
        rule: "Don't use TextInput.Input outside TextInput.Root",
        category: "nesting",
        why: "Context will be undefined \u2014 throws"
      },
      {
        rule: "Don't read input value from DOM directly",
        category: "api",
        why: "Use the onChange callback; value is managed in context"
      },
      {
        rule: "Don't omit TextInput.Label",
        category: "a11y",
        why: "Without a label, screen readers cannot describe the field"
      },
      {
        rule: "Don't mix controlled and uncontrolled usage",
        category: "api",
        why: "Provide both value + onChange, or neither (use defaultValue)"
      }
    ],
    peerComponents: ["Button", "TextArea", "Select"],
    testing: {
      testIds: {
        "input element": "text-input",
        label: "text-input-label",
        "error message": "text-input-error"
      },
      storybookPath: "Components/TextInput"
    }
  },
  {
    name: "Toast",
    slug: "toast",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Export Compound Object",
    targetPath: "src/components/ui",
    fileName: "toaster.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tooltip.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tour",
    slug: "tour",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tour.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tree",
    slug: "tree",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tree.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Typography",
    slug: "typography",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Export types for use in other components",
    targetPath: "src/components/ui",
    fileName: "typography/index.ts",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Videoplayer",
    slug: "videoplayer",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "videoplayer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  }
];

// src/templates.ts
var templates = [
  // Add project templates here
];

// src/registryData.ts
var all = [...hooks, ...components, ...templates];
var registry = Object.fromEntries(
  all.map((item) => [item.name, item])
);

// src/index.ts
function findItem(slug) {
  return Object.values(registry).find((item) => item.slug === slug);
}
function findWithDependencies(slug) {
  const item = findItem(slug);
  if (!item) return [];
  const deps = (item.dependencies?.components ?? []).flatMap(
    (depSlug) => findWithDependencies(depSlug)
  );
  return [...deps, item];
}
var registry2 = registry;
export {
  findItem,
  findWithDependencies,
  registry2 as registry
};
//# sourceMappingURL=index.js.map