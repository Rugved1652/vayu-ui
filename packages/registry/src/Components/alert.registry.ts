import type { VayuComponentDoc } from "../index";

export const alertRegistry: VayuComponentDoc = {
  component: "Alert",
  slug: "alert",
  category: "Feedback",

  complexity: "compound",

  description: "Displays a callout for user attention with semantic variants. A compound component that provides contextual feedback messages for user actions or system status.",
  ai_summary: "A semantic feedback component with four variants (info, success, warning, error). Compound structure with Icon, Title, Description, Content, and Dismiss subcomponents. Supports WCAG 2.2 AA accessibility with appropriate ARIA roles and live regions.",

  intent: [
    "Provide contextual feedback about user actions",
    "Communicate system status and important information",
    "Display validation results and error messages",
    "Alert users to time-sensitive or critical information"
  ],
  ai_keywords: ["alert", "notification", "feedback", "message", "status", "dismiss", "callout", "banner", "notice", "toast", "warning", "error", "success", "info"],

  when_to_use: [
    "Form submission feedback (success or error)",
    "System status notifications",
    "Validation messages that need user attention",
    "Important notices or announcements",
    "Warning users about potential issues",
    "Displaying dismissible informational messages"
  ],
  when_not_to_use: [
    "Modal dialogs requiring user interaction (use Dialog instead)",
    "Auto-dismissing toast notifications (use Toast instead)",
    "Inline form validation errors (use inline error text)",
    "Persistent site-wide announcements (use Banner instead)",
    "Complex interactive content requiring user input"
  ],

  composition: {
    root: "Alert",
    slots: ["Alert.Icon", "Alert.Title", "Alert.Description", "Alert.Content", "Alert.Dismiss"],
    structure: ["Alert", "Alert.Icon", "Alert.Title", "Alert.Description", "Alert.Content", "Alert.Dismiss"],
    rules: [
      "Alert.Icon should contain an icon component (typically from lucide-react)",
      "Alert.Title and Alert.Description should be wrapped inside Alert.Content",
      "Alert.Dismiss requires an onClick handler to function properly",
      "Variant props on Alert.Icon and Alert.Dismiss should match parent Alert variant for consistent styling",
      "Alert.Dismiss is optional - include only when alerts can be dismissed"
    ]
  },

  props: {
    Alert: [
      {
        name: "variant",
        type: "'info' | 'success' | 'warning' | 'error'",
        required: false,
        default: "'info'",
        description: "The visual style and semantic meaning of the alert"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The content of the alert (Icon, Content, and optionally Dismiss)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the alert container"
      }
    ],
    "Alert.Icon": [
      {
        name: "variant",
        type: "'info' | 'success' | 'warning' | 'error'",
        required: false,
        default: "'info'",
        description: "The variant for icon color, should match parent Alert variant"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The icon component to display (e.g., Info, CheckCircle, TriangleAlert, XCircle)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the icon wrapper"
      }
    ],
    "Alert.Title": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The title text of the alert"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the title"
      }
    ],
    "Alert.Description": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The content/description text of the alert"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the description"
      }
    ],
    "Alert.Content": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The content wrapper for Alert.Title and Alert.Description"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the content wrapper"
      }
    ],
    "Alert.Dismiss": [
      {
        name: "variant",
        type: "'info' | 'success' | 'warning' | 'error'",
        required: false,
        default: "'info'",
        description: "The variant for focus ring styling, should match parent Alert variant"
      },
      {
        name: "alertTitle",
        type: "string",
        required: false,
        description: "Title for descriptive aria-label on the dismiss button"
      },
      {
        name: "onClick",
        type: "() => void",
        required: true,
        description: "Callback fired when the dismiss button is clicked"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the dismiss button"
      }
    ]
  },

  variants: [
    {
      name: "variant",
      values: ["info", "success", "warning", "error"],
      default: "info",
      description: "Semantic color variants: info (blue) for informational messages, success (green) for positive feedback, warning (yellow) for cautionary messages, error (red) for critical alerts"
    }
  ],

  states: ["visible", "dismissed"],

  responsive: {
    allowed: true,
    patterns: [
      "Alert takes full width (w-full) by default",
      "Can be constrained with max-width utilities via className",
      "Content adapts to container width with flex layout"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "info-100", "info-200", "info-600", "info-800", "info-900", "info-950",
        "success-100", "success-200", "success-600", "success-800", "success-900", "success-950",
        "warning-100", "warning-200", "warning-600", "warning-800", "warning-900", "warning-950",
        "error-100", "error-200", "error-600", "error-800", "error-900", "error-950",
        "info-400", "info-500", "success-400", "success-500", "warning-400", "warning-500", "error-400", "error-500"
      ],
      radius: ["rounded"],
      border: ["border"],
      spacing: ["p-4", "gap-3", "mb-1", "pr-10", "p-1"],
      typography: ["font-primary", "font-secondary", "font-semibold", "text-para"]
    },
    recommended: {
      colors: ["info-*", "success-*", "warning-*", "error-*"],
      radius: ["rounded", "rounded-lg"],
      typography: ["font-semibold", "text-para"]
    },
    allowed: {
      colors: ["info-*", "success-*", "warning-*", "error-*", "ground-*"],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg"],
      border: ["border", "border-0", "border-2"],
      spacing: ["p-*", "gap-*", "m-*"],
      typography: ["font-*", "text-*"]
    }
  },

  examples: [
    {
      name: "Basic Info Alert",
      description: "A simple informational alert with icon, title, and description",
      code: `import { Alert } from "vayu-ui";
import { Info } from "lucide-react";

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
</Alert>`
    },
    {
      name: "Success Alert with Dismiss",
      description: "A success alert that can be dismissed by the user",
      code: `import { Alert } from "vayu-ui";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const [showSuccess, setShowSuccess] = useState(true);

{showSuccess && (
  <Alert variant="success">
    <Alert.Icon variant="success">
      <CheckCircle className="w-5 h-5" />
    </Alert.Icon>
    <Alert.Content>
      <Alert.Title>Success</Alert.Title>
      <Alert.Description>
        Your changes have been successfully saved.
      </Alert.Description>
    </Alert.Content>
    <Alert.Dismiss variant="success" alertTitle="Success" onClick={() => setShowSuccess(false)} />
  </Alert>
)}`
    },
    {
      name: "Warning Alert",
      description: "A warning alert for cautionary messages",
      code: `import { Alert } from "vayu-ui";
import { TriangleAlert } from "lucide-react";

<Alert variant="warning">
  <Alert.Icon variant="warning">
    <TriangleAlert className="w-5 h-5" />
  </Alert.Icon>
  <Alert.Content>
    <Alert.Title>Warning</Alert.Title>
    <Alert.Description>
      Your account is about to expire. Please renew your subscription.
    </Alert.Description>
  </Alert.Content>
</Alert>`
    },
    {
      name: "Error Alert with Dismiss",
      description: "An error alert that can be dismissed by the user",
      code: `import { Alert } from "vayu-ui";
import { XCircle } from "lucide-react";
import { useState } from "react";

const [showError, setShowError] = useState(true);

{showError && (
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
    <Alert.Dismiss variant="error" alertTitle="Error" onClick={() => setShowError(false)} />
  </Alert>
)}`
    },
    {
      name: "Complete Anatomy",
      description: "Full anatomy showing all subcomponents",
      code: `import { Alert } from "vayu-ui";
import { Info } from "lucide-react";

<Alert variant="info">
  <Alert.Icon variant="info">
    <Info className="w-5 h-5" />
  </Alert.Icon>
  <Alert.Content>
    <Alert.Title>Title</Alert.Title>
    <Alert.Description>Description</Alert.Description>
  </Alert.Content>
  <Alert.Dismiss variant="info" alertTitle="Title" onClick={() => {}} />
</Alert>`
    }
  ],

  accessibility: {
    pattern: "WCAG 2.2 AA ARIA Live Region",
    standards: [
      "ARIA roles: alert for warning/error variants, status for info/success variants",
      "aria-live: assertive for warnings/errors (immediate announcement), polite for info/success (deferred announcement)",
      "aria-atomic='true' ensures screen readers announce complete alert content",
      "Decorative icons marked with aria-hidden='true'"
    ],
    keyboard_support: [
      "Tab - Navigate to the dismiss button (if present)",
      "Enter - Activate the dismiss button",
      "Space - Activate the dismiss button"
    ],
    aria_attributes: [
      "role=\"alert\" - For warning and error variants",
      "role=\"status\" - For info and success variants",
      "aria-live=\"assertive\" - For warning and error variants",
      "aria-live=\"polite\" - For info and success variants",
      "aria-atomic=\"true\" - On root alert container",
      "aria-hidden=\"true\" - On Alert.Icon wrapper",
      "aria-label=\"Dismiss {variant} alert: {title}\" - On dismiss button"
    ]
  },

  anti_patterns: [
    "Using Alert for modal dialogs or complex interactive content",
    "Inconsistent variant props between Alert root and Alert.Icon/Alert.Dismiss subcomponents",
    "Including Alert.Dismiss without an onClick handler",
    "Using Alert for auto-dismissing notifications (use Toast instead)",
    "Placing Alert.Title or Alert.Description outside of Alert.Content wrapper",
    "Using multiple Alerts in close proximity instead of consolidating messages"
  ],

  dependencies: {
    icons: ["XIcon"],
    utilities: ["cn"]
  },

  relationships: {
    used_with: ["Card", "Form", "Dialog", "Page", "Section"],
    often_inside: ["Page", "Section", "Card", "Container"],
    often_contains: ["Lucide icons (Info, CheckCircle, TriangleAlert, XCircle)"]
  },

  related_components: ["Toast", "Banner", "Dialog"],

  validation_rules: [
    "Alert.Dismiss must have an onClick handler",
    "Alert.Icon variant should match parent Alert variant for consistent styling",
    "Alert.Dismiss variant should match parent Alert variant for consistent focus ring styling",
    "Alert.Content should contain Alert.Title and Alert.Description"
  ],

  installation: [
    "npx vayu-ui init",
    "npx vayu-ui add alert"
  ],

  source: {
    file: "packages/ui/src/components/ui/alert.tsx",
    language: "TypeScript",
    framework: "React"
  },

  meta: {
    doc_url: "/docs/components/alert",
    source_file: "packages/ui/src/components/ui/alert.tsx",
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
      "installation"
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
