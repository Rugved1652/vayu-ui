export const drawerRegistry = {
  component: "Drawer",
  slug: "drawer",
  category: "overlay",

  complexity: "compound" as const,

  description: "A sidebar component that slides in from any direction for navigation, forms, or supplementary content.",
  ai_summary: "A compound overlay component that slides in from any screen edge (left, right, top, bottom). Provides modal behavior with focus trapping, keyboard navigation, and accessible ARIA attributes. Ideal for navigation menus, forms, or supplementary content that doesn't require full-screen attention.",

  intent: [
    "Display navigation menus",
    "Show supplementary content",
    "Present forms without navigating away",
    "Provide quick access to settings or filters",
    "Display contextual information"
  ],
  ai_keywords: [
    "drawer",
    "sidebar",
    "slide-over",
    "overlay",
    "modal",
    "navigation",
    "panel",
    "slide-in",
    "off-canvas",
    "sheet"
  ],

  when_to_use: [
    "Navigation menus that should not obstruct the main content",
    "Forms that users can complete without leaving the current page",
    "Filtering or sorting options for content",
    "Quick access to settings or preferences",
    "Supplementary information that enhances main content"
  ],
  when_not_to_use: [
    "Critical alerts requiring immediate attention (use Dialog instead)",
    "Content that needs to be visible alongside the main page (use Sidebar instead)",
    "Simple confirmations (use AlertDialog instead)",
    "Full-page content that requires complete focus (use Dialog instead)"
  ],

  composition: {
    root: "Drawer",
    slots: [
      "Drawer.Trigger",
      "Drawer.Overlay",
      "Drawer.Content",
      "Drawer.Header",
      "Drawer.Footer",
      "Drawer.Title",
      "Drawer.Description",
      "Drawer.Close",
      "Drawer.Portal"
    ],
    structure: [
      "Drawer",
      "Drawer.Trigger",
      "Drawer.Overlay",
      "Drawer.Content",
      "Drawer.Header",
      "Drawer.Footer",
      "Drawer.Title",
      "Drawer.Description",
      "Drawer.Close",
      "Drawer.Portal"
    ],
    rules: [
      "Drawer.Trigger must be a direct child of Drawer",
      "Drawer.Overlay should be placed before Drawer.Content",
      "Drawer.Content must contain the main drawer content",
      "Drawer.Title and Drawer.Description should be inside Drawer.Header",
      "Drawer.Close can be placed inside Drawer.Footer or used standalone",
      "When modal is true, Drawer.Overlay will be visible",
      "Close button is automatically rendered in Drawer.Content"
    ]
  },

  props: {
    Drawer: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Child components to render inside the drawer context"
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description: "Controlled open state"
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        description: "Event handler for open state changes"
      },
      {
        name: "side",
        type: '"left" | "right" | "top" | "bottom"',
        required: false,
        default: '"right"',
        description: "The direction the drawer slides in from"
      },
      {
        name: "modal",
        type: "boolean",
        required: false,
        default: "true",
        description: "Whether to lock body scroll and show overlay"
      },
      {
        name: "defaultOpen",
        type: "boolean",
        required: false,
        default: "false",
        description: "Default open state for uncontrolled usage"
      }
    ],
    "Drawer.Trigger": [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        default: "false",
        description: "Merge props onto child element instead of rendering a button"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Overlay": [
      {
        name: "dismissible",
        type: "boolean",
        required: false,
        default: "true",
        description: "Whether clicking the overlay closes the drawer"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Content": [
      {
        name: "trapFocus",
        type: "boolean",
        required: false,
        default: "true",
        description: "Whether to trap focus within the drawer when open"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Header": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Footer": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Title": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Description": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Drawer.Close": [
      {
        name: "asChild",
        type: "boolean",
        required: false,
        default: "false",
        description: "Merge props onto child element instead of rendering a button"
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
      name: "side",
      values: ["left", "right", "top", "bottom"],
      default: "right",
      description: "The direction the drawer slides in from"
    },
    {
      name: "modal",
      values: ["true", "false"],
      default: "true",
      description: "Whether the drawer is modal with overlay and scroll lock"
    }
  ],

  states: ["open", "closed"],

  responsive: {
    allowed: true,
    patterns: [
      "Width adapts with w-3/4 on mobile and sm:max-w-sm on larger screens for left/right drawers",
      "Top and bottom drawers span full width with inset-x-0"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-700",
        "ground-800",
        "ground-900",
        "ground-950",
        "ground-500",
        "ground-400",
        "ground-300",
        "primary-500"
      ],
      spacing: ["p-6", "px-4", "py-2", "py-4", "pt-4", "space-y-2", "space-x-2"],
      border: ["border-ground-200", "border-ground-700", "border-b", "border-t", "border-l", "border-r"],
      radius: ["rounded", "rounded-sm"],
      typography: ["text-sm", "text-lg", "font-medium", "font-semibold"]
    },
    recommended: {
      colors: ["ground-50", "ground-950", "primary-500"],
      spacing: ["p-6", "space-y-2"],
      typography: ["text-sm", "text-lg", "font-semibold"]
    },
    allowed: {
      colors: ["ground-*", "primary-*"],
      spacing: ["p-*", "px-*", "py-*", "space-*"],
      border: ["border-*", "border"],
      radius: ["rounded-*"],
      typography: ["text-*", "font-*"]
    }
  },

  examples: [
    {
      name: "Basic Drawer",
      description: "A basic drawer with trigger, overlay, and content",
      code: `import { Drawer, Button } from "vayu-ui";

export default function DrawerExample() {
  return (
    <Drawer side="right">
      <Drawer.Trigger asChild>
        <Button>Open Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>Description goes here.</Drawer.Description>
        </Drawer.Header>
        <div className="py-4">
          Content...
        </div>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>Close</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}`
    },
    {
      name: "Left Side Drawer",
      description: "A drawer that slides in from the left side",
      code: `<Drawer side="left">
  <Drawer.Trigger asChild>
    <Button variant="outline">Open Left Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Overlay />
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Navigation</Drawer.Title>
    </Drawer.Header>
    <nav className="flex flex-col gap-2">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </Drawer.Content>
</Drawer>`
    },
    {
      name: "Non-Modal Drawer",
      description: "A drawer without overlay and body scroll lock",
      code: `<Drawer side="right" modal={false}>
  <Drawer.Trigger asChild>
    <Button>Open Non-Modal Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Settings</Drawer.Title>
    </Drawer.Header>
    <div className="py-4">
      Settings content...
    </div>
  </Drawer.Content>
</Drawer>`
    },
    {
      name: "Controlled Drawer",
      description: "A drawer with controlled open state",
      code: `import { useState } from "react";
import { Drawer, Button } from "vayu-ui";

export default function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button>Open Controlled Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Controlled Drawer</Drawer.Title>
        </Drawer.Header>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>Close</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}`
    }
  ],

  accessibility: {
    pattern: "dialog",
    standards: [
      "WAI-ARIA Dialog Pattern",
      "Focus Management",
      "Keyboard Navigation",
      "Reduced Motion Support"
    ],
    keyboard_support: [
      "Tab - Navigate between focusable elements within the drawer",
      "Shift + Tab - Navigate backwards through focusable elements",
      "Escape - Close the drawer"
    ],
    aria_attributes: [
      'role="dialog" - Identifies the drawer as a dialog',
      'aria-modal="true" - Indicates the drawer is modal",
      'aria-labelledby - References the drawer title',
      'aria-describedby - References the drawer description',
      'aria-expanded - On trigger, indicates drawer state',
      'aria-haspopup="dialog" - On trigger, indicates it opens a dialog',
      'aria-hidden="true" - On overlay, hides it from screen readers'
    ]
  },

  anti_patterns: [
    "Nesting drawers inside other drawers",
    "Using Drawer for critical alerts (use Dialog instead)",
    "Placing Drawer.Content before Drawer.Overlay",
    "Forgetting to include Drawer.Title for accessibility",
    "Using non-modal drawers for forms that require completion",
    "Not handling the controlled state properly with onOpenChange"
  ],

  dependencies: {
    icons: ["X (lucide-react)"],
    utilities: ["clsx"],
    components: []
  },

  relationships: {
    used_with: ["Button"],
    often_inside: [],
    often_contains: ["Button"]
  },

  related_components: ["Dialog", "Sheet", "Sidebar", "AlertDialog"],

  validation_rules: [
    "Drawer.Trigger must be a child of Drawer",
    "Drawer.Content must be a child of Drawer",
    "Drawer.Title must have a corresponding id matching aria-labelledby on Content",
    "Drawer.Description must have a corresponding id matching aria-describedby on Content",
    "When modal is true, Drawer.Overlay should be included",
    "Focus trap is automatically enabled when trapFocus is true on Drawer.Content"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add drawer"
  ],

  source: {
    file: "packages/ui/src/components/ui/drawer/",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/drawer",
    source_file: "packages/ui/src/components/ui/drawer/",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "accessibility",
      "composition",
      "examples",
      "installation",
      "dependencies"
    ],
    inferred: [
      "ai_summary",
      "ai_keywords",
      "intent",
      "when_to_use",
      "when_not_to_use",
      "anti_patterns",
      "validation_rules",
      "design_tokens",
      "relationships",
      "related_components"
    ]
  }
};
