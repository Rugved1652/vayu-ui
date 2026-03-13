export const affixRegistry = {
  component: "Affix",
  slug: "affix",
  category: "layout",

  complexity: "simple" as const,

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
        default: undefined,
        description: "Callback fired when affixed state changes"
      },
      {
        name: "className",
        type: "string",
        required: false,
        default: undefined,
        description: "Additional CSS class names"
      },
      {
        name: "style",
        type: "React.CSSProperties",
        required: false,
        default: undefined,
        description: "Inline styles (merged with affix positioning styles)"
      },
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        default: undefined,
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
