import { VayuComponentDoc } from "..";

export const otpinputRegistry: VayuComponentDoc = {
  component: "OTPInput",
  slug: "otpinput",
  category: "forms",

  complexity: "compound",

  description: "An accessible one-time password input component with compound component pattern for entering verification codes, PINs, and authentication tokens.",
  ai_summary: "A compound OTP input component that provides an accessible, customizable interface for entering one-time passwords. Uses a hidden single input with visual slot representation for better UX while maintaining full accessibility and SMS autofill support.",

  intent: [
    "Enter one-time passwords and verification codes",
    "Collect PIN numbers in a user-friendly format",
    "Provide authentication code input with visual feedback",
    "Create accessible OTP entry forms"
  ],
  ai_keywords: [
    "otp",
    "one-time password",
    "verification code",
    "pin input",
    "authentication",
    "code input",
    "sms code",
    "verification",
    "two-factor authentication",
    "2FA"
  ],

  when_to_use: [
    "Authentication flows requiring verification codes",
    "Two-factor authentication (2FA) setups",
    "Phone number verification",
    "Email verification with codes",
    "PIN entry screens",
    "SMS-based authentication"
  ],
  when_not_to_use: [
    "Regular text input needs",
    "Password entry fields",
    "Long form inputs",
    "Numeric data entry beyond codes",
    "Search or filter inputs"
  ],

  composition: {
    root: "OTPInput.Root",
    slots: ["OTPInput.Group", "OTPInput.Slot", "OTPInput.Separator"],
    structure: [
      "OTPInput.Root",
      "OTPInput.Group",
      "OTPInput.Slot",
      "OTPInput.Separator"
    ],
    rules: [
      "OTPInput.Slot must have an index prop indicating its position",
      "OTPInput.Slot components should be wrapped in OTPInput.Group",
      "OTPInput.Separator is optional and placed between groups",
      "All OTPInput components must be used within OTPInput.Root"
    ]
  },

  props: {
    "OTPInput.Root": [
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled value of the OTP input"
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description: "Callback when value changes"
      },
      {
        name: "maxLength",
        type: "number",
        required: false,
        default: 6,
        description: "Maximum length of the code"
      },
      {
        name: "onComplete",
        type: "(code: string) => void",
        required: false,
        description: "Callback when maxLength is reached"
      },
      {
        name: "label",
        type: "string",
        required: false,
        default: "\"One-time password\"",
        description: "Accessible label for the input"
      },
      {
        name: "autoFocus",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to auto-focus on mount"
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the input is disabled"
      },
      {
        name: "hasError",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the input has an error"
      },
      {
        name: "errorMessageId",
        type: "string",
        required: false,
        description: "ID of the element containing the error message"
      },
      {
        name: "aria-describedby",
        type: "string",
        required: false,
        description: "ID of the element describing the input"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "OTPInput.Group": [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Slot elements to render"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "OTPInput.Slot": [
      {
        name: "index",
        type: "number",
        required: true,
        description: "Position in the OTP sequence (0-indexed)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ],
    "OTPInput.Separator": [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        description: "Custom separator content (defaults to a dot)"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes"
      }
    ]
  },

  variants: [],

  states: [
    "default",
    "focused",
    "filled",
    "error",
    "disabled"
  ],

  responsive: {
    allowed: true,
    patterns: [
      "Slots can be arranged in groups for different screen sizes",
      "Separator placement can be adjusted for responsive layouts"
    ]
  },

  design_tokens: {
    used: {
      colors: [
        "ground-50",
        "ground-100",
        "ground-300",
        "ground-400",
        "ground-600",
        "ground-700",
        "ground-900",
        "ground-950",
        "red-50",
        "red-400",
        "red-500",
        "red-600",
        "red-950"
      ],
      radius: ["rounded-l", "rounded-r"],
      border: ["border-y", "border-r", "border-l"],
      spacing: ["gap-2", "px-2", "size-10"],
      typography: ["text-sm", "font-secondary"]
    },
    recommended: {
      colors: [
        "ground-300",
        "ground-700",
        "ground-950",
        "ground-100"
      ],
      radius: ["rounded-l", "rounded-r"],
      typography: ["text-sm", "font-secondary"]
    },
    allowed: {
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
        "red-50",
        "red-100",
        "red-200",
        "red-300",
        "red-400",
        "red-500",
        "red-600",
        "red-700",
        "red-800",
        "red-900",
        "red-950"
      ],
      radius: ["rounded", "rounded-sm", "rounded-md", "rounded-lg", "rounded-l", "rounded-r"],
      border: ["border", "border-0", "border-2", "border-y", "border-x", "border-l", "border-r"],
      spacing: ["gap-1", "gap-2", "gap-3", "gap-4", "px-1", "px-2", "px-3", "px-4", "size-8", "size-9", "size-10", "size-11", "size-12"],
      typography: ["text-xs", "text-sm", "text-base", "text-lg", "font-primary", "font-secondary"]
    }
  },

  examples: [
    {
      name: "Basic OTP Input",
      description: "A standard 6-digit OTP input with grouped slots",
      code: `import { OTPInput } from "vayu-ui";

export default function OTPInputDemo() {
  return (
    <OTPInput.Root maxLength={6} onComplete={(code) => console.log(code)}>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
      </OTPInput.Group>
      <OTPInput.Separator />
      <OTPInput.Group>
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`
    },
    {
      name: "Controlled OTP Input",
      description: "OTP input with controlled state and completion callback",
      code: `import { OTPInput } from "vayu-ui";
import { useState } from "react";

export default function ControlledOTP() {
  const [otp, setOtp] = useState("");

  const handleComplete = (code: string) => {
    console.log("OTP entered:", code);
    // Verify OTP with backend
  };

  return (
    <OTPInput.Root
      value={otp}
      onChange={setOtp}
      maxLength={6}
      onComplete={handleComplete}
    >
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
      </OTPInput.Group>
      <OTPInput.Separator />
      <OTPInput.Group>
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`
    },
    {
      name: "OTP Input with Error State",
      description: "OTP input displaying validation error",
      code: `import { OTPInput } from "vayu-ui";
import { useState } from "react";

export default function ErrorOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const handleComplete = (code: string) => {
    if (code !== "123456") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <OTPInput.Root
        value={otp}
        onChange={(v) => { setOtp(v); setError(false); }}
        maxLength={6}
        onComplete={handleComplete}
        hasError={error}
        errorMessageId="otp-error"
      >
        <OTPInput.Group>
          <OTPInput.Slot index={0} />
          <OTPInput.Slot index={1} />
          <OTPInput.Slot index={2} />
        </OTPInput.Group>
        <OTPInput.Separator />
        <OTPInput.Group>
          <OTPInput.Slot index={3} />
          <OTPInput.Slot index={4} />
          <OTPInput.Slot index={5} />
        </OTPInput.Group>
      </OTPInput.Root>
      {error && (
        <p id="otp-error" className="text-red-500 text-sm mt-2">
          Invalid code. Please try again.
        </p>
      )}
    </div>
  );
}`
    },
    {
      name: "Disabled OTP Input",
      description: "OTP input in disabled state",
      code: `import { OTPInput } from "vayu-ui";

export default function DisabledOTP() {
  return (
    <OTPInput.Root maxLength={6} disabled>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
      </OTPInput.Group>
      <OTPInput.Separator />
      <OTPInput.Group>
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`
    },
    {
      name: "Custom Separator",
      description: "OTP input with custom separator content",
      code: `import { OTPInput } from "vayu-ui";

export default function CustomSeparatorOTP() {
  return (
    <OTPInput.Root maxLength={6}>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
        <OTPInput.Slot index={2} />
      </OTPInput.Group>
      <OTPInput.Separator>
        <span className="text-ground-400">-</span>
      </OTPInput.Separator>
      <OTPInput.Group>
        <OTPInput.Slot index={3} />
        <OTPInput.Slot index={4} />
        <OTPInput.Slot index={5} />
      </OTPInput.Group>
    </OTPInput.Root>
  );
}`
    }
  ],

  accessibility: {
    pattern: "Single hidden input with visual slot representation",
    standards: [
      "WCAG 2.1 Level AA compliant",
      "Uses role='group' with aria-label for screen readers",
      "Supports prefers-reduced-motion for animations"
    ],
    keyboard_support: [
      "Tab - Move focus to the OTP input",
      "0-9 - Enter digits",
      "Backspace - Delete last entered digit",
      "Arrow keys - Not supported (single input model)"
    ],
    aria_attributes: [
      "role='group' on root container",
      "aria-label for accessible naming",
      "aria-disabled for disabled state",
      "aria-invalid for error state",
      "aria-errormessage linking to error description",
      "aria-describedby for help text",
      "aria-hidden='true' on visual slots",
      "autoComplete='one-time-code' for SMS autofill",
      "inputMode='numeric' for mobile numeric keyboard"
    ]
  },

  anti_patterns: [
    "Do not use individual inputs for each digit - use the compound component pattern",
    "Avoid using without OTPInput.Root wrapper",
    "Do not skip index props on Slot components",
    "Avoid using for non-numeric codes without modification",
    "Do not remove the hidden input - it's required for accessibility"
  ],

  dependencies: {
    icons: [],
    utilities: ["clsx"],
    components: []
  },

  relationships: {
    used_with: ["Button", "Form", "Card", "Dialog", "Alert"],
    often_inside: ["Form", "Card", "Dialog", "Modal"],
    often_contains: []
  },

  related_components: ["TextInput", "Input", "Form", "PinInput"],

  validation_rules: [
    "OTPInput.Slot must have a valid numeric index prop",
    "OTPInput.Slot index should be within maxLength bounds",
    "All OTPInput subcomponents must be inside OTPInput.Root",
    "errorMessageId should reference an existing element when hasError is true"
  ],

  installation: [
    "npx vayu-ui init",
    "npx vayu-ui add otpinput"
  ],

  source: {
    file: "packages/ui/src/components/ui/otpinput.tsx",
    language: "typescript",
    framework: "react"
  },

  meta: {
    doc_url: "/docs/components/otpinput",
    source_file: "packages/ui/src/components/ui/otpinput.tsx",
    extracted: [
      "component",
      "description",
      "props",
      "accessibility",
      "examples",
      "composition",
      "installation"
    ],
    inferred: [
      "ai_keywords",
      "ai_summary",
      "when_to_use",
      "when_not_to_use",
      "anti_patterns",
      "relationships",
      "validation_rules"
    ]
  }
};
