import { VayuComponentDoc } from "..";

export const textareaRegistry: VayuComponentDoc = {
  component: "TextArea",
  slug: "textarea",
  category: "Form",

  complexity: "compound",

  description: "A multi-line text input component with support for labels, validation, and character counting.",
  ai_summary: "Compound textarea component with Root, Label, Input, SupportText, ErrorText, and CharCount subcomponents for building accessible multi-line text inputs with validation states.",

  intent: [
    "Collect multi-line text input from users",
    "Enable long-form content entry like bios, comments, or descriptions",
    "Provide character counting and validation feedback",
    "Support accessible form inputs with proper labeling"
  ],
  ai_keywords: [
    "textarea",
    "multi-line input",
    "text input",
    "form field",
    "character count",
    "validation",
    "accessibility",
    "compound component"
  ],

  when_to_use: [
    "Collecting multi-line text like bios, comments, or descriptions",
    "Forms requiring longer user input beyond single-line text fields",
    "When character limits need to be displayed to users",
    "Accessible form inputs with validation and helper text"
  ],
  when_not_to_use: [
    "Single-line text input (use TextInput instead)",
    "Rich text editing with formatting (use a rich text editor)",
    "Code editing with syntax highlighting",
    "Very short inputs like names or emails"
  ],

  composition: {
    root: "TextArea.Root",
    slots: [
      "TextArea.Root",
      "TextArea.Label",
      "TextArea.Input",
      "TextArea.SupportText",
      "TextArea.ErrorText",
      "TextArea.CharCount"
    ],
    structure: [
      "TextArea.Root",
      "TextArea.Label",
      "TextArea.Input",
      "TextArea.SupportText",
      "TextArea.ErrorText",
      "TextArea.CharCount"
    ],
    rules: [
      "TextArea compound components must be used within TextArea.Root",
      "TextArea.Label should be used to provide accessible labeling",
      "TextArea.SupportText and TextArea.ErrorText are optional",
      "TextArea.CharCount can be used standalone or via showCharCount on Label"
    ]
  },

  props: {
    "TextArea.Root": [
      {
        name: "variant",
        type: '"default" | "outline"',
        required: false,
        default: "default",
        description: "Visual variant of the text area."
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: "md",
        description: "Size of the text area."
      },
      {
        name: "error",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to show error state styling."
      },
      {
        name: "maxLength",
        type: "number",
        required: false,
        description: "Maximum number of characters allowed."
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the text area is disabled."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Component children."
      }
    ],
    "TextArea.Label": [
      {
        name: "showCharCount",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to show character count next to the label."
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Label content."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "TextArea.Input": [
      {
        name: "resize",
        type: '"none" | "vertical" | "horizontal" | "both"',
        required: false,
        default: "vertical",
        description: "Resize behavior of the textarea."
      },
      {
        name: "rows",
        type: "number",
        required: false,
        default: 4,
        description: "Number of visible text lines."
      },
      {
        name: "value",
        type: "string | number | readonly string[]",
        required: false,
        description: "Controlled value."
      },
      {
        name: "onChange",
        type: "(event: React.ChangeEvent<HTMLTextAreaElement>) => void",
        required: false,
        description: "Change event handler."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "TextArea.SupportText": [
      {
        name: "children",
        type: "string | string[]",
        required: true,
        description: "Helper text or list of helper texts."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "TextArea.ErrorText": [
      {
        name: "children",
        type: "string | string[]",
        required: true,
        description: "Error message or list of error messages."
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ],
    "TextArea.CharCount": [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes."
      }
    ]
  },

  variants: [
    {
      name: "variant",
      values: ["default", "outline"],
      default: "default",
      description: "Visual variant - default has background, outline is transparent."
    },
    {
      name: "size",
      values: ["sm", "md", "lg"],
      default: "md",
      description: "Size of the textarea affecting padding and text size."
    },
    {
      name: "resize",
      values: ["none", "vertical", "horizontal", "both"],
      default: "vertical",
      description: "Controls how the textarea can be resized by the user."
    }
  ],

  states: ["default", "focused", "error", "disabled", "hover"],

  responsive: {
    allowed: true,
    patterns: [
      "Size prop can be used responsively with Tailwind breakpoints",
      "Full width by default with w-full"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "white",
        "ground-900",
        "ground-100",
        "ground-300",
        "ground-700",
        "ground-500",
        "ground-600",
        "ground-400",
        "ground-800",
        "primary-500",
        "primary-600",
        "primary-400",
        "error-500",
        "error-600",
        "error-400"
      ],
      radius: ["rounded"],
      border: ["border-2"],
      spacing: ["px-2", "px-2.5", "px-3", "px-4", "py-1.5", "py-2.5", "py-3", "gap-1", "gap-3"],
      typography: ["text-sm", "text-base", "text-lg", "text-xs", "font-primary", "font-medium", "font-secondary"]
    },
    recommended: {
      colors: ["primary-500", "primary-600", "error-500", "ground-500", "ground-600"],
      radius: ["rounded"],
      typography: ["text-sm", "text-base"]
    },
    allowed: {
      colors: ["primary-*", "error-*", "ground-*", "white"],
      radius: ["rounded", "rounded-sm", "rounded-lg"],
      border: ["border-2", "border"],
      spacing: ["px-*", "py-*", "gap-*"],
      typography: ["text-xs", "text-sm", "text-base", "text-lg"]
    }
  },

  examples: [
    {
      name: "Basic Usage",
      description: "Simple textarea with label and character count",
      code: `<TextArea.Root maxLength={200}>
  <TextArea.Label showCharCount>Bio</TextArea.Label>
  <TextArea.Input placeholder="Tell us about yourself" />
</TextArea.Root>`
    },
    {
      name: "With Support Text",
      description: "Textarea with helper text",
      code: `<TextArea.Root>
  <TextArea.Label>Description</TextArea.Label>
  <TextArea.Input placeholder="Enter description..." />
  <TextArea.SupportText>Briefly describe your project</TextArea.SupportText>
</TextArea.Root>`
    },
    {
      name: "Error State",
      description: "Textarea showing validation error",
      code: `<TextArea.Root error>
  <TextArea.Label>Comments</TextArea.Label>
  <TextArea.Input placeholder="Your feedback..." />
  <TextArea.ErrorText>This field is required</TextArea.ErrorText>
</TextArea.Root>`
    },
    {
      name: "Full Anatomy",
      description: "Complete textarea with all subcomponents",
      code: `<TextArea.Root variant="outline" size="lg" maxLength={500}>
  <TextArea.Label showCharCount>Message</TextArea.Label>
  <TextArea.Input
    placeholder="Type your message..."
    resize="both"
    rows={6}
  />
  <TextArea.SupportText>Enter your message in detail</TextArea.SupportText>
  <TextArea.ErrorText>Message is required</TextArea.ErrorText>
</TextArea.Root>`
    },
    {
      name: "Disabled State",
      description: "Textarea in disabled state",
      code: `<TextArea.Root disabled>
  <TextArea.Label>Notes</TextArea.Label>
  <TextArea.Input placeholder="Disabled textarea..." />
</TextArea.Root>`
    }
  ],

  accessibility: {
    pattern: "Compound form field with semantic labeling",
    standards: [
      "WCAG 2.1 Level AA",
      "WAI-ARIA 1.2",
      "Section 508"
    ],
    keyboard_support: [
      "Tab to focus the textarea",
      "Type to enter text",
      "Arrow keys to navigate within text",
      "Focus visible ring with focus-visible:ring-2"
    ],
    aria_attributes: [
      "aria-invalid - set when error prop is true",
      "aria-required - set when required prop is true",
      "aria-describedby - links input to support and error text",
      "aria-errormessage - points to error text when invalid",
      "aria-disabled - set when disabled",
      "aria-live='polite' - on character count for announcements",
      "aria-atomic='true' - on character count regions",
      "role='alert' - on error messages",
      "role='group' - on root container",
      "aria-labelledby - on root pointing to label"
    ]
  },

  anti_patterns: [
    "Using TextArea subcomponents outside of TextArea.Root",
    "Nesting TextArea components inside each other",
    "Using for single-line input (use TextInput instead)",
    "Setting maxLength on Input instead of Root"
  ],

  dependencies: {
    icons: ["AlertCircle"],
    utilities: [],
    components: []
  },

  relationships: {
    used_with: ["Form", "Button", "Card", "Dialog", "Modal"],
    often_inside: ["Form", "Card", "Dialog", "Sheet"],
    often_contains: []
  },

  related_components: ["TextInput", "Input", "Form", "Label"],

  validation_rules: [
    "TextArea compound components must be used within TextArea.Root",
    "TextArea.Label must have htmlFor matching TextArea.Input id (handled automatically)",
    "maxLength should be set on TextArea.Root, not TextArea.Input",
    "error prop on Root should be accompanied by ErrorText for accessibility"
  ],

  installation: [
    "npx vayu-ui init",
    "npx vayu-ui add textarea"
  ],

  source: {
    file: "src/components/ui/textarea.tsx",
    language: "TypeScript",
    framework: "React"
  },

  meta: {
    doc_url: "/docs/components/textarea",
    source_file: "packages/ui/src/components/ui/textarea.tsx",
    extracted: [
      "component",
      "slug",
      "description",
      "composition",
      "props",
      "variants",
      "accessibility",
      "installation",
      "examples"
    ],
    inferred: [
      "category",
      "complexity",
      "ai_summary",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "states",
      "responsive",
      "design_tokens",
      "anti_patterns",
      "dependencies",
      "relationships",
      "related_components",
      "validation_rules"
    ]
  }
};
