import { VayuComponentDoc } from '..';

export const tooltipRegistry: VayuComponentDoc = {
  component: 'Tooltip',
  slug: 'tooltip',
  category: 'overlay',

  complexity: 'simple',

  description:
    'A portal-rendered tooltip with positions, colour variants, keyboard & focus support, and WCAG 2.2 AA accessibility compliance.',
  ai_summary:
    'A simple, accessible tooltip component that renders via React portal for proper z-index layering. Supports 4 positions (top, bottom, left, right), 7 color variants, configurable show/hide delays, optional arrow, and full keyboard navigation. Implements WCAG 2.5.7 (hoverable tooltips), WCAG 2.5.8 (touch targets), and WCAG 2.3.3 (reduced motion).',

  intent: [
    'Display contextual information on hover or focus',
    'Provide helpful hints for interactive elements',
    'Show supplementary content without cluttering the UI',
    'Add descriptive labels to icon buttons',
    'Display keyboard shortcuts and tooltips',
  ],
  ai_keywords: [
    'tooltip',
    'popover',
    'hover',
    'hint',
    'infotip',
    'overlay',
    'contextual help',
    'focus tooltip',
    'aria tooltip',
    'portal tooltip',
  ],

  when_to_use: [
    'Explaining icon-only buttons',
    'Showing keyboard shortcuts',
    'Providing additional context for truncated text',
    'Displaying help text for form fields',
    'Adding supplementary information to UI elements',
  ],
  when_not_to_use: [
    'Critical information that must always be visible',
    'Long-form content or instructions',
    'Interactive content requiring user input',
    'Primary navigation or actions',
    'Mobile-first interfaces (touch interactions are limited)',
  ],

  composition: {
    root: 'Tooltip',
    slots: [],
    structure: ['Tooltip'],
    rules: [
      'Tooltip must wrap a single child element as the trigger',
      'Content can be string or JSX',
    ],
  },

  props: {
    Tooltip: [
      {
        name: 'content',
        type: 'ReactNode',
        required: true,
        description: 'Tooltip content (string or JSX)',
      },
      {
        name: 'position',
        type: '"top" | "bottom" | "left" | "right"',
        required: false,
        default: '"top"',
        description: 'Placement relative to the trigger',
      },
      {
        name: 'delay',
        type: 'number',
        required: false,
        default: 200,
        description: 'Show delay in milliseconds',
      },
      {
        name: 'hideDelay',
        type: 'number',
        required: false,
        default: 150,
        description:
          'Hide delay in milliseconds (time before tooltip disappears after mouse leaves)',
      },
      {
        name: 'variant',
        type: '"default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"',
        required: false,
        default: '"default"',
        description: 'Colour variant',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: false,
        description: 'Disable the tooltip entirely',
      },
      {
        name: 'showArrow',
        type: 'boolean',
        required: false,
        default: true,
        description: 'Show the directional arrow',
      },
      {
        name: 'ensureTouchTarget',
        type: 'boolean',
        required: false,
        default: true,
        description:
          'Ensures minimum touch target size of 24x24 CSS pixels (WCAG 2.5.8). Set to false for inline text tooltips.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Class applied to the trigger wrapper',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Trigger element for the tooltip',
      },
    ],
  },

  variants: [
    {
      name: 'position',
      values: ['top', 'bottom', 'left', 'right'],
      default: 'top',
      description: 'Placement of the tooltip relative to the trigger element',
    },
    {
      name: 'variant',
      values: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      default: 'default',
      description: 'Color variant for different visual contexts',
    },
  ],

  states: ['hidden', 'visible', 'disabled'],

  responsive: {
    allowed: true,
    patterns: [
      'Position automatically adjusts to stay within viewport',
      'Tooltip repositions on scroll and resize events',
    ],
  },

  design_tokens: {
    used: {
      colors: [
        'ground-700',
        'ground-800',
        'ground-900',
        'primary-600',
        'success-600',
        'warning-600',
        'error-600',
        'info-600',
        'white',
      ],
      radius: ['rounded'],
      spacing: ['px-3', 'py-2', 'min-h-6', 'min-w-6', 'w-2', 'h-2'],
      typography: ['text-sm', 'font-secondary'],
    },
    recommended: {
      colors: ['ground-800', 'ground-900', 'white'],
      radius: ['rounded'],
      typography: ['text-sm', 'font-secondary'],
    },
    allowed: {
      colors: [
        'ground-700',
        'ground-800',
        'ground-900',
        'primary-500',
        'primary-600',
        'primary-700',
        'secondary-500',
        'secondary-600',
        'secondary-700',
        'success-500',
        'success-600',
        'success-700',
        'warning-500',
        'warning-600',
        'warning-700',
        'error-500',
        'error-600',
        'error-700',
        'info-500',
        'info-600',
        'info-700',
        'white',
      ],
      radius: ['rounded', 'rounded-sm', 'rounded-md', 'rounded-lg'],
      spacing: ['px-2', 'px-3', 'px-4', 'py-1', 'py-2', 'py-3'],
      typography: ['text-xs', 'text-sm', 'text-base', 'font-primary', 'font-secondary'],
    },
  },

  examples: [
    {
      name: 'Basic Tooltip',
      description: 'A simple tooltip with default settings',
      code: `import { Tooltip } from "vayu-ui";

export function Example() {
  return (
    <Tooltip content="Save changes" position="top">
      <button>Save</button>
    </Tooltip>
  );
}`,
    },
    {
      name: 'Positioned Tooltips',
      description: 'Tooltips in different positions',
      code: `import { Tooltip } from "vayu-ui";

export function PositionExample() {
  return (
    <div className="flex gap-8">
      <Tooltip content="Top tooltip" position="top">
        <button>Top</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <button>Bottom</button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <button>Right</button>
      </Tooltip>
    </div>
  );
}`,
    },
    {
      name: 'Color Variants',
      description: 'Tooltips with different color variants',
      code: `import { Tooltip } from "vayu-ui";

export function VariantExample() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Default style" variant="default">
        <button>Default</button>
      </Tooltip>
      <Tooltip content="Primary action" variant="primary">
        <button>Primary</button>
      </Tooltip>
      <Tooltip content="Success message" variant="success">
        <button>Success</button>
      </Tooltip>
      <Tooltip content="Warning notice" variant="warning">
        <button>Warning</button>
      </Tooltip>
      <Tooltip content="Error occurred" variant="error">
        <button>Error</button>
      </Tooltip>
      <Tooltip content="Information" variant="info">
        <button>Info</button>
      </Tooltip>
    </div>
  );
}`,
    },
    {
      name: 'Custom Delay',
      description: 'Tooltip with custom show and hide delays',
      code: `import { Tooltip } from "vayu-ui";

export function DelayExample() {
  return (
    <Tooltip
      content="Appears instantly, hides slowly"
      delay={0}
      hideDelay={500}
    >
      <button>Custom Timing</button>
    </Tooltip>
  );
}`,
    },
    {
      name: 'Without Arrow',
      description: 'Tooltip without directional arrow',
      code: `import { Tooltip } from "vayu-ui";

export function NoArrowExample() {
  return (
    <Tooltip content="No arrow tooltip" showArrow={false}>
      <button>No Arrow</button>
    </Tooltip>
  );
}`,
    },
    {
      name: 'Rich Content',
      description: 'Tooltip with JSX content',
      code: `import { Tooltip } from "vayu-ui";

export function RichContentExample() {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <div className="font-semibold">Keyboard Shortcuts</div>
          <div>Ctrl + S - Save</div>
          <div>Ctrl + Z - Undo</div>
        </div>
      }
    >
      <button>Shortcuts</button>
    </Tooltip>
  );
}`,
    },
    {
      name: 'Disabled Tooltip',
      description: 'Tooltip that can be disabled conditionally',
      code: `import { Tooltip } from "vayu-ui";
import { useState } from "react";

export function DisabledExample() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <Tooltip
      content="This tooltip can be disabled"
      disabled={!isEnabled}
    >
      <button onClick={() => setIsEnabled(!isEnabled)}>
        Toggle Tooltip
      </button>
    </Tooltip>
  );
}`,
    },
    {
      name: 'Inline Text Tooltip',
      description: 'Tooltip on inline text without touch target enforcement',
      code: `import { Tooltip } from "vayu-ui";

export function InlineExample() {
  return (
    <p>
      This is some text with a{" "}
      <Tooltip
        content="This is a helpful definition"
        ensureTouchTarget={false}
      >
        <span className="underline decoration-dotted cursor-help">
          technical term
        </span>
      </Tooltip>
      {" "}that needs explanation.
    </p>
  );
}`,
    },
  ],

  accessibility: {
    pattern: 'ARIA tooltip pattern with portal rendering',
    standards: [
      'WCAG 2.2 AA compliant',
      'WCAG 2.5.7 - Hoverable tooltips (cursor can move onto tooltip)',
      'WCAG 2.5.8 - Minimum touch target size 24x24 CSS pixels',
      'WCAG 2.3.3 - Respects prefers-reduced-motion',
    ],
    keyboard_support: [
      'Tab - Move focus to/from trigger element',
      'Focus - Show tooltip when trigger receives focus',
      'Blur - Hide tooltip when trigger loses focus',
      'Escape - Dismiss visible tooltip',
    ],
    aria_attributes: [
      "role='tooltip' on the tooltip container",
      'aria-describedby links trigger to tooltip content',
      "aria-hidden='true' on decorative arrow element",
    ],
  },

  anti_patterns: [
    'Do not put critical information only in tooltips',
    'Avoid using tooltips for interactive content',
    'Do not nest tooltips within tooltips',
    'Avoid long content - tooltips are for brief information',
    'Do not rely on tooltips for mobile interfaces',
    'Avoid using for primary navigation or main actions',
  ],

  dependencies: {
    icons: [],
    utilities: ['clsx'],
    components: [],
  },

  relationships: {
    used_with: ['Button', 'IconButton', 'Badge', 'Link', 'Input'],
    often_inside: ['Toolbar', 'Card', 'Header', 'Table'],
    often_contains: [],
  },

  related_components: ['Popover', 'Dialog', 'Dropdown', 'HoverCard'],

  validation_rules: [
    'Tooltip must have a content prop',
    'Tooltip must have a single child element as trigger',
    'content should be concise - recommend under 100 characters for strings',
  ],

  installation: ['npx vayu-ui init', 'npx vayu-ui add tooltip'],

  source: {
    file: 'packages/ui/src/components/ui/tooltip/tooltip.tsx',
    language: 'typescript',
    framework: 'react',
  },

  meta: {
    doc_url: '/docs/components/tooltip',
    source_file: 'packages/ui/src/components/ui/tooltip/tooltip.tsx',
    extracted: [
      'component',
      'description',
      'props',
      'variants',
      'accessibility',
      'examples',
      'installation',
    ],
    inferred: [
      'ai_keywords',
      'ai_summary',
      'when_to_use',
      'when_not_to_use',
      'anti_patterns',
      'relationships',
      'validation_rules',
      'category',
    ],
  },
};
