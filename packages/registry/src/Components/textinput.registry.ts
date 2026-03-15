export const textinputRegistry = {
  component: "TextInput",
  slug: "textinput",
  category: "Forms",

  complexity: "compound" as const,

  description: "A flexible and accessible text input component with support for various input types, validation states, and styling variants.",
  ai_summary: "Compound text input component with Root, Label, Field, Input, and helper text subcomponents. Supports password, number, and search variants with built-in validation states, character counting, and accessibility features.",

  intent: [
    "Capture user text input",
    "Provide validated form fields",
    "Display input feedback states",
    "Support specialized input types"
  ],
  ai_keywords: [
    "input",
    "form",
    "text field",
    "validation",
    "password",
    "search",
    "number input",
    "accessibility",
    "compound component"
  ],

  when_to_use: [
    "Collecting user text input in forms",
    "Creating password fields with visibility toggle",
    "Building search interfaces",
    "Accepting numeric input with validation",
    "Displaying form validation feedback"
  ],
  when_not_to_use: [
    "Large text content (use Textarea instead)",
    "Rich text editing (use rich text editor)",
    "Multi-select input (use Select or MultiSelect)",
    "Date/time input (use DatePicker or TimePicker)"
  ],

  composition: {
    root: "TextInput.Root",
    slots: [
      "TextInput.Label",
      "TextInput.Field",
      "TextInput.Input",
      "TextInput.PasswordInput",
      "TextInput.NumberInput",
      "TextInput.SearchInput",
      "TextInput.Description",
      "TextInput.ErrorMessage",
      "TextInput.WarningMessage",
      "TextInput.SuccessMessage",
      "TextInput.Icon",
      "TextInput.LoadingSpinner",
      "TextInput.CharacterCount",
      "TextInput.ClearButton"
    ],
    structure: [
      "TextInput.Root",
      "TextInput.Label",
      "TextInput.Field",
      "TextInput.Input",
      "TextInput.PasswordInput",
      "TextInput.NumberInput",
      "TextInput.SearchInput",
      "TextInput.Description",
      "TextInput.ErrorMessage",
      "TextInput.WarningMessage",
      "TextInput.SuccessMessage",
      "TextInput.Icon",
      "TextInput.LoadingSpinner",
      "TextInput.CharacterCount",
      "TextInput.ClearButton"
    ],
    rules: [
      "TextInput compound components must be used within TextInput.Root",
      "TextInput.Input must be inside TextInput.Field",
      "TextInput.PasswordInput should only be used with inputType='password'",
      "TextInput.ErrorMessage only renders when validationState='error'",
      "TextInput.WarningMessage only renders when validationState='warning'",
      "TextInput.SuccessMessage only renders when validationState='success'",
      "TextInput.LoadingSpinner only renders when loading is true",
      "TextInput.ClearButton only renders when input has a value"
    ]
  },

  props: {
    "TextInput.Root": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Child components"
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled value of the input"
      },
      {
        name: "defaultValue",
        type: "string",
        default: '""',
        description: "Default value for uncontrolled input"
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description: "Callback when value changes"
      },
      {
        name: "inputType",
        type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"',
        default: '"text"',
        description: "Type of input"
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Size of the input field"
      },
      {
        name: "validationState",
        type: '"default" | "error" | "warning" | "success"',
        default: '"default"',
        description: "Validation state"
      },
      {
        name: "disabled",
        type: "boolean",
        default: false,
        description: "Whether the input is disabled"
      },
      {
        name: "readOnly",
        type: "boolean",
        default: false,
        description: "Whether the input is read-only"
      },
      {
        name: "required",
        type: "boolean",
        default: false,
        description: "Whether the input is required"
      },
      {
        name: "loading",
        type: "boolean",
        default: false,
        description: "Whether to show a loading state"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.Label": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Label content"
      },
      {
        name: "optional",
        type: "boolean",
        default: false,
        description: "Whether to show optional text"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.Field": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Input field content (Input, Icon, etc.)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.Input": [
      {
        name: "type",
        type: "InputType",
        required: false,
        description: "Override the input type from context"
      },
      {
        name: "leftIcon",
        type: "ReactNode",
        required: false,
        description: "Icon to show on the left (use TextInput.Icon instead)"
      },
      {
        name: "rightIcon",
        type: "ReactNode",
        required: false,
        description: "Icon to show on the right (use TextInput.Icon instead)"
      }
    ],
    "TextInput.PasswordInput": [
      {
        name: "...props",
        type: "InputProps",
        required: false,
        description: "Inherits all props from TextInput.Input"
      }
    ],
    "TextInput.NumberInput": [
      {
        name: "numberType",
        type: '"integer" | "decimal" | "positive" | "natural"',
        default: '"decimal"',
        description: "Type of number allowed"
      },
      {
        name: "min",
        type: "number",
        required: false,
        description: "Minimum value (constrained on blur)"
      },
      {
        name: "max",
        type: "number",
        required: false,
        description: "Maximum value (constrained on blur)"
      },
      {
        name: "step",
        type: "number",
        required: false,
        description: "Step value"
      }
    ],
    "TextInput.SearchInput": [
      {
        name: "...props",
        type: "InputProps",
        required: false,
        description: "Inherits all props from TextInput.Input"
      }
    ],
    "TextInput.Description": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Helper text content"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.ErrorMessage": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Error message content"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.WarningMessage": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Warning message content"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.SuccessMessage": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Success message content"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.Icon": [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Icon element"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.LoadingSpinner": [],
    "TextInput.CharacterCount": [
      {
        name: "maxLength",
        type: "number",
        required: true,
        description: "Maximum length allowed"
      },
      {
        name: "showCount",
        type: '"always" | "focus" | "near-limit"',
        default: '"always"',
        description: "When to show the count"
      },
      {
        name: "threshold",
        type: "number",
        default: 0.8,
        description: "Threshold for near-limit warning (0-1)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "TextInput.ClearButton": [
      {
        name: "onClear",
        type: "() => void",
        required: false,
        description: "Callback when clicked"
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
      name: "size",
      values: ["sm", "md", "lg"],
      default: "md",
      description: "Size of the input field"
    },
    {
      name: "validationState",
      values: ["default", "error", "warning", "success"],
      default: "default",
      description: "Validation state for visual feedback"
    },
    {
      name: "inputType",
      values: ["text", "email", "password", "number", "tel", "url", "search"],
      default: "text",
      description: "Type of input field"
    },
    {
      name: "numberType",
      values: ["integer", "decimal", "positive", "natural"],
      default: "decimal",
      description: "Type of number validation for NumberInput"
    }
  ],

  states: [
    "default",
    "focused",
    "disabled",
    "readonly",
    "loading",
    "error",
    "warning",
    "success",
    "hasValue"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Size variants can adapt to viewport",
      "Full width by default with w-full utility"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-200",
        "ground-300",
        "ground-400",
        "ground-500",
        "ground-600",
        "ground-700",
        "ground-800",
        "ground-900",
        "ground-950",
        "primary-200",
        "primary-400",
        "primary-500",
        "primary-800",
        "primary-900",
        "error-100",
        "error-400",
        "error-500",
        "error-600",
        "error-900",
        "warning-100",
        "warning-400",
        "warning-500",
        "warning-600",
        "warning-900",
        "success-100",
        "success-400",
        "success-500",
        "success-600",
        "success-900"
      ],
      radius: ["rounded"],
      border: ["border"],
      spacing: [
        "px-3",
        "px-4",
        "py-1.5",
        "py-2.5",
        "py-3",
        "mb-1.5",
        "mt-1.5",
        "ml-1",
        "ml-2",
        "gap-1.5",
        "gap-2",
        "p-1"
      ],
      typography: [
        "text-sm",
        "text-base",
        "text-lg",
        "font-primary",
        "font-secondary",
        "font-medium",
        "font-normal"
      ]
    },
    recommended: {
      colors: [
        "ground-50",
        "ground-900",
        "ground-400",
        "primary-400",
        "error-500",
        "warning-500",
        "success-500"
      ],
      radius: ["rounded"],
      typography: ["text-base", "font-secondary"]
    },
    allowed: {
      colors: [
        "ground-*",
        "primary-*",
        "error-*",
        "warning-*",
        "success-*"
      ],
      radius: ["rounded", "rounded-sm", "rounded-lg"],
      border: ["border", "border-0", "border-2"],
      spacing: ["px-*", "py-*", "gap-*", "p-*", "m-*"],
      typography: ["text-sm", "text-base", "text-lg", "font-*"]
    }
  },

  examples: [
    {
      name: "Basic Usage",
      description: "Simple text input with label and description",
      code: `<TextInput.Root>
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field>
    <TextInput.Icon>
      <Mail className="w-4 h-4" />
    </TextInput.Icon>
    <TextInput.Input placeholder="Enter your email" />
  </TextInput.Field>
  <TextInput.Description>We'll never share your email.</TextInput.Description>
</TextInput.Root>`
    },
    {
      name: "Sizes",
      description: "Three available sizes: sm, md, lg",
      code: `<TextInput.Root size="sm">
  <TextInput.Label>Small Input</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="Small size" />
  </TextInput.Field>
</TextInput.Root>

<TextInput.Root size="md">
  <TextInput.Label>Medium Input</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="Medium size" />
  </TextInput.Field>
</TextInput.Root>

<TextInput.Root size="lg">
  <TextInput.Label>Large Input</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="Large size" />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Validation States",
      description: "Error, warning, and success states",
      code: `<TextInput.Root validationState="error">
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="invalid@email" />
  </TextInput.Field>
  <TextInput.ErrorMessage>Invalid email address.</TextInput.ErrorMessage>
</TextInput.Root>

<TextInput.Root validationState="warning">
  <TextInput.Label>Password</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="weak" />
  </TextInput.Field>
  <TextInput.WarningMessage>Password is too weak.</TextInput.WarningMessage>
</TextInput.Root>

<TextInput.Root validationState="success">
  <TextInput.Label>Username</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="available_user" />
  </TextInput.Field>
  <TextInput.SuccessMessage>Username is available!</TextInput.SuccessMessage>
</TextInput.Root>`
    },
    {
      name: "Password Input",
      description: "Password field with visibility toggle",
      code: `<TextInput.Root inputType="password">
  <TextInput.Label>Password</TextInput.Label>
  <TextInput.Field>
    <TextInput.PasswordInput placeholder="Enter password" />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Search Input",
      description: "Search field with built-in icon",
      code: `<TextInput.Root inputType="search">
  <TextInput.Label>Search</TextInput.Label>
  <TextInput.Field>
    <TextInput.SearchInput placeholder="Search..." />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Number Input",
      description: "Number input with validation",
      code: `<TextInput.Root inputType="number">
  <TextInput.Label>Age</TextInput.Label>
  <TextInput.Field>
    <TextInput.NumberInput numberType="natural" min={0} max={150} />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Required Field",
      description: "Mark field as required",
      code: `<TextInput.Root required>
  <TextInput.Label>Full Name</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="Enter your full name" />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Optional Field",
      description: "Mark field as optional",
      code: `<TextInput.Root>
  <TextInput.Label optional>Nickname</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="What should we call you?" />
  </TextInput.Field>
</TextInput.Root>`
    },
    {
      name: "Character Count",
      description: "Display character count with configurable visibility",
      code: `<TextInput.Root>
  <TextInput.Label>Bio</TextInput.Label>
  <TextInput.Field>
    <TextInput.Input placeholder="Tell us about yourself" maxLength={100} />
    <TextInput.ClearButton />
  </TextInput.Field>
  <TextInput.CharacterCount maxLength={100} showCount="always" />
</TextInput.Root>`
    }
  ],

  accessibility: {
    pattern: "Form Input Pattern",
    standards: [
      "WCAG 2.2 AA",
      "ARIA 1.2"
    ],
    keyboard_support: [
      "Tab - Navigate between inputs",
      "Enter - Submit form (default behavior)",
      "ArrowLeft/Right - Move cursor within input",
      "ArrowUp/Down - Increment/decrement (number input)",
      "Home/End - Move to start/end of input",
      "Backspace/Delete - Remove characters"
    ],
    aria_attributes: [
      "aria-labelledby - Connects input to label",
      "aria-describedby - Links to description and error messages",
      "aria-invalid - Indicates error state",
      "aria-required - Marks required fields",
      "aria-live='polite' - For error messages and character count",
      "aria-atomic='true' - For character count updates",
      "role='alert' - For error messages"
    ]
  },

  anti_patterns: [
    "Using TextInput.PasswordInput without inputType='password'",
    "Placing TextInput.Input outside TextInput.Field",
    "Using multiple Input components in a single Field",
    "Nesting TextInput components inside each other",
    "Using ErrorMessage/WarningMessage/SuccessMessage without matching validationState"
  ],

  dependencies: {
    icons: [
      "AlertCircle",
      "CheckCircle",
      "Eye",
      "EyeClosed",
      "Loader2",
      "Search",
      "X"
    ],
    utilities: [],
    components: []
  },

  relationships: {
    used_with: [
      "Form",
      "Button",
      "Label"
    ],
    often_inside: [
      "Form",
      "Card",
      "Dialog"
    ],
    often_contains: []
  },

  related_components: [],

  validation_rules: [
    "TextInput compound components must be used within TextInput.Root",
    "TextInput.Input must be placed inside TextInput.Field",
    "TextInput.PasswordInput requires inputType='password' on Root",
    "TextInput.ErrorMessage only renders when validationState='error'",
    "TextInput.WarningMessage only renders when validationState='warning'",
    "TextInput.SuccessMessage only renders when validationState='success'",
    "TextInput.LoadingSpinner only renders when loading=true",
    "TextInput.ClearButton only renders when input has a value",
    "NumberInput min/max constraints are applied on blur"
  ],

  installation: [
    "npx vayu-ui init    # Add Theme CSS if not added",
    "npx vayu-ui add textinput"
  ],

  source: {
    file: "packages/ui/src/components/ui/textinput.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/textinput",
    source_file: "packages/ui/src/components/ui/textinput.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "variants",
      "examples",
      "accessibility",
      "dependencies",
      "composition",
      "design_tokens"
    ],
    inferred: [
      "category",
      "intent",
      "ai_keywords",
      "when_to_use",
      "when_not_to_use",
      "relationships",
      "anti_patterns",
      "validation_rules"
    ]
  }
};
