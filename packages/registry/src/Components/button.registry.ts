import type { VayuComponentDoc } from "../index";

export const buttonRegistry: VayuComponentDoc = {
  component: "Button",
  slug: "button",
  category: "Interactive",

  complexity: "compound",

  description: "An interactive element triggered by a user. A compound component that provides versatile button functionality with multiple variants, sizes, loading states, and optional icon, text, and badge subcomponents.",
  ai_summary: "A versatile interactive button component with 5 variants (primary, secondary, outline, ghost, destructive) and 3 sizes (small, medium, large). Compound structure with Icon, Text, and Badge subcomponents. Supports loading states via Status enum, full-width mode, and WCAG 2.2 AA accessibility with proper ARIA attributes.",

  intent: [
    "Trigger user actions and form submissions",
    "Navigate between pages or sections",
    "Initiate primary, secondary, or destructive operations",
    "Provide call-to-action buttons with visual hierarchy"
  ],
  ai_keywords: ["button", "cta", "action", "click", "submit", "interactive", "form", "navigation", "primary", "secondary", "destructive", "loading", "badge", "icon"],

  when_to_use: [
    "Form submission buttons",
    "Primary call-to-action buttons",
    "Secondary or tertiary actions",
    "Destructive actions like delete or remove",
    "Navigation buttons with icons",
    "Buttons requiring loading indicators",
    "Notification buttons with badge counts"
  ],
  when_not_to_use: [
    "Navigation links (use Link component instead)",
    "Toggle switches (use Switch component instead)",
    "Dropdown triggers (use Dropdown component instead)",
    "Modal triggers that need more semantic meaning (use Dialog Trigger)",
    "Inline text actions within paragraphs (use Link)"
  ],

  composition: {
    root: "Button",
    slots: ["Button.Icon", "Button.Text", "Button.Badge"],
    structure: ["Button", "Button.Icon", "Button.Text", "Button.Badge"],
    rules: [
      "Button.Icon should contain an icon component (typically from lucide-react)",
      "Button.Text wraps button label text and provides truncation",
      "Button.Badge can be positioned top-right, top-left, inline-right, or inline-left",
      "Subcomponents are optional - Button can render plain children",
      "Icon size should match Button size for consistent proportions"
    ]
  },

  props: {
    Button: [
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
        required: false,
        default: "'primary'",
        description: "Visual style of the button"
      },
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        required: false,
        default: "'small'",
        description: "Size of the button"
      },
      {
        name: "loading",
        type: "Status",
        required: false,
        default: "Status.IDLE",
        description: "Loading state of the button (IDLE, PENDING, SUCCESS, REJECTED)"
      },
      {
        name: "fullWidth",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the button takes full width"
      },
      {
        name: "loadingText",
        type: "string",
        required: false,
        default: "'Loading'",
        description: "Text to show when loading"
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: false,
        description: "Disables the button"
      },
      {
        name: "type",
        type: "'button' | 'submit' | 'reset'",
        required: false,
        default: "'button'",
        description: "HTML button type"
      },
      {
        name: "aria-label",
        type: "string",
        required: false,
        description: "Accessible label for the button"
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Button content (can include Icon, Text, Badge subcomponents)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "Button.Icon": [
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        required: false,
        default: "'small'",
        description: "Size of the icon container"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The icon element to render"
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Accessible label for the icon (if standalone)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes for the icon container"
      }
    ],
    "Button.Text": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The text content"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes for the text container"
      }
    ],
    "Button.Badge": [
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        required: false,
        default: "'small'",
        description: "Size of the badge"
      },
      {
        name: "value",
        type: "number | string",
        required: false,
        description: "Content of the badge"
      },
      {
        name: "max",
        type: "number",
        required: false,
        default: 99,
        description: "Max number to show before adding +"
      },
      {
        name: "variant",
        type: "'primary' | 'danger' | 'warning' | 'info' | 'success'",
        required: false,
        default: "'danger'",
        description: "Visual style of the badge"
      },
      {
        name: "position",
        type: "'top-right' | 'top-left' | 'inline-right' | 'inline-left'",
        required: false,
        default: "'top-right'",
        description: "Position of the badge"
      },
      {
        name: "showZero",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to show badge when value is 0"
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
      name: "variant",
      values: ["primary", "secondary", "outline", "ghost", "destructive"],
      default: "primary",
      description: "Visual style: primary (filled, prominent), secondary (subtle gray), outline (border-only), ghost (transparent), destructive (red for dangerous actions)"
    },
    {
      name: "size",
      values: ["small", "medium", "large"],
      default: "small",
      description: "Size variants: small (36px min-height), medium (40px min-height), large (44px min-height)"
    }
  ],

  states: ["idle", "pending", "success", "rejected", "disabled", "hover", "active", "focus-visible"],

  responsive: {
    allowed: true,
    patterns: [
      "Button has w-auto by default, use fullWidth for w-full",
      "Can be combined with responsive width utilities via className",
      "Touch targets meet 44px minimum on large size for mobile"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "primary-500", "primary-600", "primary-700", "primary-800",
        "ground-50", "ground-100", "ground-200", "ground-300", "ground-400", "ground-500", "ground-600", "ground-700", "ground-800", "ground-900", "ground-950",
        "error-500", "error-600", "error-700", "error-800",
        "warning-600", "warning-700",
        "info-500", "info-600",
        "success-500", "success-600",
        "white"
      ],
      radius: ["rounded", "rounded-full"],
      border: ["border", "border-2"],
      spacing: ["px-3", "py-2", "px-4", "py-2.5", "px-6", "py-3", "gap-2", "gap-2.5", "gap-3", "min-h-[36px]", "min-h-[40px]", "min-h-[44px]", "min-w-[20px]", "min-w-[22px]", "min-w-[24px]", "h-[20px]", "h-[22px]", "h-[24px]", "px-1.5", "px-2", "ml-1", "mr-1"],
      typography: ["font-secondary", "font-medium", "font-semibold", "text-sm", "text-base", "text-lg", "text-xs", "text-[11px]"]
    },
    recommended: {
      colors: ["primary-*", "ground-*", "error-*"],
      radius: ["rounded"],
      typography: ["font-medium", "text-sm"]
    },
    allowed: {
      colors: ["primary-*", "ground-*", "error-*", "warning-*", "info-*", "success-*"],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg", "rounded-full"],
      border: ["border", "border-2", "border-transparent"],
      spacing: ["p-*", "px-*", "py-*", "gap-*", "m-*", "min-w-*", "min-h-*"],
      typography: ["font-*", "text-*"]
    }
  },

  examples: [
    {
      name: "Basic Primary Button",
      description: "A simple primary button with text",
      code: `import { Button } from "vayu-ui";

<Button variant="primary">Click me</Button>`
    },
    {
      name: "Button with Icon and Text",
      description: "A secondary button with icon and text label",
      code: `import { Button } from "vayu-ui";
import { Mail } from "lucide-react";

<Button variant="secondary" size="large">
  <Button.Icon size="large"><Mail /></Button.Icon>
  <Button.Text>Login with Email</Button.Text>
</Button>`
    },
    {
      name: "Destructive Button",
      description: "A destructive button for dangerous actions",
      code: `import { Button } from "vayu-ui";
import { Trash2 } from "lucide-react";

<Button variant="destructive">
  <Button.Icon><Trash2 /></Button.Icon>
  <Button.Text>Delete</Button.Text>
</Button>`
    },
    {
      name: "Loading State",
      description: "Button with loading state using Status enum",
      code: `import { Button, Status } from "vayu-ui";
import { useState } from "react";

function Example() {
  const [loading, setLoading] = useState(Status.IDLE);

  const handleClick = () => {
    setLoading(Status.PENDING);
    setTimeout(() => setLoading(Status.SUCCESS), 2000);
    setTimeout(() => setLoading(Status.IDLE), 4000);
  };

  return (
    <Button
      variant="primary"
      loading={loading}
      onClick={handleClick}
      loadingText="Sending..."
    >
      Click to Load
    </Button>
  );
}`
    },
    {
      name: "Button with Badge",
      description: "Button with notification badge",
      code: `import { Button } from "vayu-ui";
import { Bell } from "lucide-react";

<Button variant="secondary">
  <Button.Icon><Bell /></Button.Icon>
  <Button.Badge value={3} variant="danger" />
</Button>`
    },
    {
      name: "Outline and Ghost Variants",
      description: "Outline and ghost button styles",
      code: `import { Button } from "vayu-ui";

<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>`
    },
    {
      name: "Full Width Button",
      description: "Button that spans full container width",
      code: `import { Button } from "vayu-ui";

<Button variant="primary" fullWidth>Full Width Button</Button>`
    },
    {
      name: "Disabled States",
      description: "Buttons in disabled state",
      code: `import { Button } from "vayu-ui";

<Button variant="primary" disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>`
    },
    {
      name: "Badge with Max Value",
      description: "Badge with overflow indicator",
      code: `import { Button } from "vayu-ui";

<Button variant="outline">
  <Button.Text>Messages</Button.Text>
  <Button.Badge value={12} max={9} variant="primary" position="top-right" />
</Button>`
    },
    {
      name: "Inline Badge with text value",
      description: "Inline badge with custom text",
      code: `import { Button } from "vayu-ui";

<Button variant="ghost">
  <Button.Text>Updates</Button.Text>
  <Button.Badge value="New" variant="info" position="inline-right" />
</Button>`
    }
  ],

  accessibility: {
    pattern: "WCAG 2.2 AA Native Button",
    standards: [
      "Uses native <button> element for semantic meaning",
      "Focus visible ring using design tokens when keyboard navigating",
      "All variants meet WCAG 2.2 AA contrast requirements",
      "Loading states announced via aria-live='polite' with descriptive text"
    ],
    keyboard_support: [
      "Tab - Navigate to the button",
      "Enter - Activate the button",
      "Space - Activate the button"
    ],
    aria_attributes: [
      "aria-label - Accessible label for the button",
      "aria-disabled - Indicates disabled state",
      "aria-busy - Indicates loading state",
      "aria-live='polite' - Announces loading changes to screen readers",
      "aria-hidden='true' - On Spinner and decorative icons",
      "role='status' - On Badge for live notifications",
      "data-variant - Data attribute for variant identification",
      "data-size - Data attribute for size identification",
      "data-loading - Data attribute for loading state"
    ]
  },

  anti_patterns: [
    "Using Button for navigation links (use Link component instead)",
    "Nesting buttons inside buttons",
    "Using multiple primary buttons for equal-weight actions",
    "Setting loading state without providing loadingText",
    "Using destructive variant for non-destructive actions",
    "Badge with position='top-*' on buttons without adequate padding"
  ],

  dependencies: {
    utilities: ["clsx"]
  },

  relationships: {
    used_with: ["Form", "Dialog", "Card", "Toolbar", "Navbar"],
    often_inside: ["Form", "Dialog", "Card", "Page", "Section"],
    often_contains: ["Lucide icons (Mail, Trash2, Bell, Send, etc.)"]
  },

  related_components: [],

  validation_rules: [
    "Button.Icon size should match parent Button size for consistent proportions",
    "Button.Badge position 'top-right' or 'top-left' requires parent Button to have relative positioning",
    "Loading state PENDING disables the button automatically",
    "When using loading prop, import Status enum from vayu-ui"
  ],

  installation: [
    "npx vayu-ui init",
    "npx vayu-ui add button"
  ],

  source: {
    file: "packages/ui/src/components/ui/button.tsx",
    language: "TypeScript",
    framework: "React"
  },

  meta: {
    doc_url: "/docs/components/button",
    source_file: "packages/ui/src/components/ui/button.tsx",
    extracted: [
      "component",
      "slug",
      "complexity",
      "composition",
      "props",
      "variants",
      "design_tokens",
      "accessibility",
      "dependencies",
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
      "validation_rules"
    ]
  }
};
