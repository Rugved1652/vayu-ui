import { ComponentRegistryEntry } from '../types.js';

export const colorPickerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'color-picker',
  name: 'ColorPicker',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A color picker component with hex/rgb/hsl format support, native palette, eyedropper, preset swatches, and clipboard copy using the compound component pattern.',
  longDescription:
    'The ColorPicker provides a complete color selection interface using the compound component pattern (ColorPicker.Label, ColorPicker.Description, ColorPicker.Error, ColorPicker.Trigger, ColorPicker.Input, ColorPicker.CopyButton, ColorPicker.Content, ColorPicker.Palette, ColorPicker.Eyedropper, ColorPicker.Presets, ColorPicker.Swatches). It supports controlled and uncontrolled color values, three color formats (hex, rgb, hsl), validation states, disabled mode, a native browser color palette, an EyeDropper API integration for screen color picking, customizable preset color grids, a standalone Swatches component, and clipboard copy with visual feedback. The dropdown supports top/bottom placement with viewport-aware positioning and keyboard-driven interactions following WAI-ARIA dialog and listbox patterns.',
  tags: [
    'color',
    'picker',
    'palette',
    'eyedropper',
    'swatch',
    'hex',
    'rgb',
    'hsl',
    'input',
    'clipboard',
    'dropdown',
    'dialog',
  ],
  useCases: [
    'Theme or brand color customization in settings panels and admin dashboards',
    'Inline color selection within forms for product variants, labels, or design tokens',
    'Standalone color swatch grid for quick color picking without a full dropdown',
    'Design tool color picker with eyedropper for picking colors from the screen',
    'Form field for color input with hex/rgb/hsl format validation and error states',
    'Copy-to-clipboard color value display in style guides and token editors',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'ColorPicker',
  files: [
    { name: 'ColorPicker.tsx', description: 'Root component managing color state, open state, context provider, click-outside, and Escape key handling' },
    { name: 'ColorPickerLabel.tsx', description: 'Accessible label linked to the input via htmlFor/id' },
    { name: 'ColorPickerDescription.tsx', description: 'Helper description text linked to the input via aria-describedby' },
    { name: 'ColorPickerError.tsx', description: 'Error message with role="alert" that renders only in error validation state' },
    { name: 'ColorPickerTrigger.tsx', description: 'Color swatch button that toggles the dropdown, with size variants and ARIA attributes' },
    { name: 'ColorPickerInput.tsx', description: 'Text input for hex/rgb/hsl values with validation, focus sync, and aria-invalid support' },
    { name: 'ColorPickerCopyButton.tsx', description: 'Clipboard copy button with check icon feedback and 2-second reset' },
    { name: 'ColorPickerContent.tsx', description: 'Dropdown dialog with fixed positioning, viewport boundary detection, and placement props' },
    { name: 'ColorPickerPalette.tsx', description: 'Native browser color picker input with label and Pipette icon' },
    { name: 'ColorPickerEyeDropper.tsx', description: 'EyeDropper API button for picking colors from the screen, with unsupported browser fallback' },
    { name: 'ColorPickerPresets.tsx', description: 'Grid of preset color swatches using listbox/option ARIA pattern with selection indicator' },
    { name: 'ColorPickerSwatches.tsx', description: 'Standalone swatch grid component usable outside the ColorPicker context' },
    { name: 'types.ts', description: 'TypeScript type definitions for all props, context, ColorFormat, ValidationState, RGB, and HSL types' },
    { name: 'hooks.ts', description: 'React context, ColorPickerContext, and useColorPicker hook for accessing component state' },
    { name: 'utils.ts', description: 'Color parsing, formatting, validation, and contrast calculation utilities with DEFAULT_PRESETS constant' },
    { name: 'index.ts', description: 'Barrel export assembling the compound component and re-exporting all types, hooks, and utilities' },
    { name: 'README.md', description: 'Component documentation and usage guide', optional: true },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'ColorPicker',
  subComponents: [
    {
      name: 'Label',
      fileName: 'ColorPickerLabel.tsx',
      description: 'Accessible label element linked to the input via htmlFor/id association',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text or content',
        },
        {
          name: 'optional',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, appends "(optional)" text after the label content',
        },
      ],
    },
    {
      name: 'Description',
      fileName: 'ColorPickerDescription.tsx',
      description: 'Helper text element linked to the input via aria-describedby',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Description text content',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'ColorPickerError.tsx',
      description: 'Error message with role="alert" and aria-live="polite", rendered only when validationState is "error"',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Error message content',
        },
      ],
    },
    {
      name: 'Trigger',
      fileName: 'ColorPickerTrigger.tsx',
      description: 'Color swatch button that toggles the dropdown open state with keyboard support',
      props: [
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          defaultValue: "'md'",
          description: 'Trigger button size: sm (32px), md (48px), lg (64px)',
          options: ['sm', 'md', 'lg'],
        },
      ],
    },
    {
      name: 'Input',
      fileName: 'ColorPickerInput.tsx',
      description: 'Text input displaying the current color value in the active format, with live parsing and validation',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          defaultValue: "'#000000'",
          description: 'Placeholder text shown when the input is empty',
        },
      ],
    },
    {
      name: 'CopyButton',
      fileName: 'ColorPickerCopyButton.tsx',
      description: 'Button that copies the current formatted color to the clipboard with a 2-second check icon feedback',
      props: [
        {
          name: 'copiedText',
          type: 'string',
          required: false,
          defaultValue: "'Copied!'",
          description: 'Text shown in the aria-label when the color has been copied',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'ColorPickerContent.tsx',
      description: 'Dropdown dialog container with fixed positioning, viewport-aware placement, and focus management',
      props: [
        {
          name: 'side',
          type: "'top' | 'bottom'",
          required: false,
          defaultValue: "'bottom'",
          description: 'Vertical placement of the dropdown relative to the trigger',
          options: ['top', 'bottom'],
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          required: false,
          defaultValue: "'start'",
          description: 'Horizontal alignment of the dropdown relative to the trigger',
          options: ['start', 'center', 'end'],
        },
        {
          name: 'sideOffset',
          type: 'number',
          required: false,
          defaultValue: '8',
          description: 'Distance in pixels between the trigger and the dropdown',
        },
      ],
    },
    {
      name: 'Palette',
      fileName: 'ColorPickerPalette.tsx',
      description: 'Native browser color picker input wrapped with a label and Pipette icon',
      props: [
        {
          name: 'label',
          type: 'string',
          required: false,
          defaultValue: "'Pick a color'",
          description: 'Label text displayed above the native color input',
        },
      ],
    },
    {
      name: 'Eyedropper',
      fileName: 'ColorPickerEyeDropper.tsx',
      description: 'EyeDropper API integration for picking colors from the screen, with graceful unsupported-browser fallback',
      props: [
        {
          name: 'label',
          type: 'string',
          required: false,
          defaultValue: "'Pick from screen'",
          description: 'Button text and aria-label for the eyedropper',
        },
        {
          name: 'unsupportedText',
          type: 'string',
          required: false,
          defaultValue: "'Eyedropper not supported in this browser'",
          description: 'Fallback text shown when the EyeDropper API is unavailable',
        },
      ],
    },
    {
      name: 'Presets',
      fileName: 'ColorPickerPresets.tsx',
      description: 'Grid of preset color swatches using listbox/option ARIA pattern with selection check indicator',
      props: [
        {
          name: 'label',
          type: 'string',
          required: false,
          defaultValue: "'Preset Colors'",
          description: 'Section label for the presets grid and listbox aria-label',
        },
        {
          name: 'colors',
          type: 'string[]',
          required: false,
          description: 'Custom preset color array; falls back to the root presets prop or DEFAULT_PRESETS',
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          defaultValue: '8',
          description: 'Number of columns in the swatch grid',
        },
      ],
    },
    {
      name: 'Swatches',
      fileName: 'ColorPickerSwatches.tsx',
      description: 'Standalone color swatch grid usable independently without ColorPicker context, with controlled/uncontrolled value support',
      props: [
        {
          name: 'colors',
          type: 'string[]',
          required: true,
          description: 'Array of color hex codes to display as swatches',
        },
        {
          name: 'value',
          type: 'string',
          required: false,
          description: 'Controlled selected color value',
        },
        {
          name: 'onChange',
          type: '(color: string) => void',
          required: false,
          description: 'Callback fired when a swatch is selected',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          required: false,
          defaultValue: "'md'",
          description: 'Swatch button size: sm (24px), md (32px), lg (40px)',
          options: ['sm', 'md', 'lg'],
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          defaultValue: '8',
          description: 'Number of columns in the swatch grid',
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Optional label displayed above the swatch grid',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, all swatches are non-interactive with reduced opacity',
        },
      ],
    },
  ],
  hooks: ['useColorPicker'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Controlled color value; use with onChange for fully controlled behavior',
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      defaultValue: "'#3b82f6'",
      description: 'Initial color value for uncontrolled usage',
    },
    {
      name: 'onChange',
      type: '(color: string) => void',
      required: false,
      description: 'Callback fired when the color value changes, receiving the new color string',
    },
    {
      name: 'format',
      type: "ColorFormat",
      required: false,
      defaultValue: "'hex'",
      description: 'Color output format for the input display and clipboard copy',
      options: ['hex', 'rgb', 'hsl'],
    },
    {
      name: 'presets',
      type: 'string[]',
      required: false,
      description: 'Array of hex color codes for the Presets sub-component; defaults to 24 Tailwind-inspired colors',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, disables all interactions including trigger, input, and content',
    },
    {
      name: 'validationState',
      type: 'ValidationState',
      required: false,
      defaultValue: "'default'",
      description: 'Visual validation state applied to the input border and error message visibility',
      options: ['default', 'error', 'warning', 'success'],
    },
    {
      name: 'open',
      type: 'boolean',
      required: false,
      description: 'Controlled open state for the dropdown; use with onOpenChange for fully controlled behavior',
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Initial open state for uncontrolled usage',
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      required: false,
      description: 'Callback fired when the dropdown opens or closes',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // No root-level variant prop; Trigger and Swatches have their own size props

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'open',
      prop: 'open',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Controls dropdown visibility. Supports controlled (open + onOpenChange) and uncontrolled (defaultOpen) modes. Closes on Escape key or click-outside.',
    },
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When true, all interactive elements are non-interactive with reduced opacity. The trigger becomes non-clickable, the input is disabled, and the content cannot open.',
    },
    {
      name: 'validationState',
      prop: 'validationState',
      isBoolean: false,
      values: ['default', 'error', 'warning', 'success'],
      defaultValue: "'default'",
      description: 'Controls the input border color and ring style. The "error" state also makes the Error sub-component visible and sets aria-invalid on the input.',
    },
    {
      name: 'picking',
      prop: 'Eyedropper internal state',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Internal state tracking whether the EyeDropper API is actively sampling a color from the screen. Shows "Picking..." text and animated icon.',
    },
    {
      name: 'copied',
      prop: 'CopyButton internal state',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Internal state on the CopyButton showing a check icon and updated aria-label for 2 seconds after a successful clipboard copy.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(color: string) => void',
      description: 'Fired when the color value changes via any method — palette selection, text input, preset click, eyedropper pick, or swatch selection',
    },
    {
      name: 'onOpenChange',
      signature: '(open: boolean) => void',
      description: 'Fired when the dropdown opens or closes, including trigger click, Escape key, or click-outside dismissal',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'aria-expanded (Trigger)',
        description: 'Set to true when the dropdown is open, indicating the dialog popup is visible',
        managedByComponent: true,
      },
      {
        name: 'aria-controls (Trigger)',
        description: 'References the dropdown content element ID for programmatic association',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby (Trigger)',
        description: 'References the label element ID so screen readers announce the label when the trigger is focused',
        managedByComponent: true,
      },
      {
        name: 'aria-haspopup="dialog" (Trigger)',
        description: 'Declares that the trigger opens a dialog popup',
        managedByComponent: true,
      },
      {
        name: 'role="dialog" (Content)',
        description: 'Identifies the dropdown content as a dialog widget',
        managedByComponent: true,
      },
      {
        name: 'aria-modal="false" (Content)',
        description: 'Indicates the dialog is not fully modal; background content remains interactive',
        managedByComponent: true,
      },
      {
        name: 'aria-label="Color picker" (Content)',
        description: 'Provides an accessible name for the dialog content',
        managedByComponent: true,
      },
      {
        name: 'aria-invalid (Input)',
        description: 'Set to true when validationState is "error", signaling the invalid state to assistive technology',
        managedByComponent: true,
      },
      {
        name: 'aria-labelledby (Input)',
        description: 'References the label element ID for associating the input with its label',
        managedByComponent: true,
      },
      {
        name: 'aria-describedby (Input)',
        description: 'Dynamically references description and/or error element IDs based on current validation state',
        managedByComponent: true,
      },
      {
        name: 'role="alert" (Error)',
        description: 'Identifies the error message as an alert that screen readers should announce immediately',
        managedByComponent: true,
      },
      {
        name: 'aria-live="polite" (Error)',
        description: 'Announces error message changes to screen readers without interrupting current speech',
        managedByComponent: true,
      },
      {
        name: 'aria-label (CopyButton)',
        description: 'Dynamic label: "Copy color to clipboard" by default, or the copiedText value after a successful copy',
        managedByComponent: true,
      },
      {
        name: 'aria-busy (Eyedropper)',
        description: 'Set to true during active screen color picking to indicate the busy state',
        managedByComponent: true,
      },
      {
        name: 'role="listbox" (Presets/Swatches)',
        description: 'Identifies the swatch grid as a listbox widget for screen reader navigation',
        managedByComponent: true,
      },
      {
        name: 'role="option" (Preset/Swatch buttons)',
        description: 'Identifies each individual swatch as an option within the listbox',
        managedByComponent: true,
      },
      {
        name: 'aria-selected (Preset/Swatch buttons)',
        description: 'Set to true on the currently selected swatch, communicating the active selection',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Enter',
        behavior: 'On Trigger: toggles the dropdown open state. On Eyedropper: initiates screen color picking.',
      },
      {
        key: 'Space',
        behavior: 'On Trigger: toggles the dropdown open state (same as Enter).',
      },
      {
        key: 'Escape',
        behavior: 'Closes the dropdown and returns focus to the trigger button.',
      },
      {
        key: 'Tab',
        behavior: 'Moves focus between interactive elements. Tabbing out of the dropdown closes it via click-outside detection.',
      },
    ],
    focusManagement:
      'The trigger button receives focus on initialization and after Escape closes the dropdown. The content dialog receives programmatic focus when opened. The input receives focus when clicked for text editing. All interactive elements have visible focus rings using focus-visible:ring-2 ring-focus styling.',
    wcagLevel: 'AA',
    notes:
      'Follows WAI-ARIA dialog pattern for the dropdown content and listbox/option pattern for preset and swatch grids. The trigger uses aria-haspopup="dialog" with aria-expanded and aria-controls. The input uses aria-labelledby and aria-describedby with dynamic error association. The Error sub-component uses role="alert" with aria-live="polite". The EyeDropper gracefully degrades to a text message in unsupported browsers. All interactive elements meet a minimum 32px touch target size.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [
    { name: 'clsx' },
    { name: 'lucide-react' },
  ],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason: 'TextInput pairs with ColorPicker in forms that collect both text and color values (e.g. product configuration)',
    },
    {
      slug: 'popover',
      reason: 'Popover provides a similar dropdown pattern; ColorPicker uses custom positioning but the two are often used together in design tool UIs',
    },
    {
      slug: 'button',
      reason: 'Buttons commonly trigger color picker open state or confirm a selected color',
    },
    {
      slug: 'card',
      reason: 'Cards serve as containers for color picker panels in settings pages and theme editors',
    },
    {
      slug: 'tooltip',
      reason: 'Tooltips can display hex/rgb/hsl values on hover over trigger swatches or preset colors',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Full-Featured ColorPicker',
      description: 'Complete color picker with label, description, trigger, input, copy button, palette, eyedropper, and presets.',
      code: `import { useState } from 'react';
import { ColorPicker } from 'vayu-ui';

export default function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <ColorPicker value={color} onChange={setColor}>
      <ColorPicker.Label>Brand Color</ColorPicker.Label>
      <ColorPicker.Description>Choose a primary color for your brand.</ColorPicker.Description>
      <div className="flex items-center gap-2">
        <ColorPicker.Trigger />
        <ColorPicker.Input />
        <ColorPicker.CopyButton />
      </div>
      <ColorPicker.Content>
        <div className="flex flex-col gap-4">
          <ColorPicker.Palette />
          <ColorPicker.Eyedropper />
          <ColorPicker.Presets />
        </div>
      </ColorPicker.Content>
    </ColorPicker>
  );
}`,
      tags: ['full', 'controlled', 'all-subcomponents'],
    },
    {
      title: 'RGB Format',
      description: 'Color picker using RGB format with custom trigger size and preset column count.',
      code: `import { useState } from 'react';
import { ColorPicker } from 'vayu-ui';

export default function RGBPicker() {
  const [color, setColor] = useState('#22c55e');

  return (
    <ColorPicker value={color} onChange={setColor} format="rgb">
      <ColorPicker.Label>Background Color (RGB)</ColorPicker.Label>
      <div className="flex items-center gap-2">
        <ColorPicker.Trigger size="sm" />
        <ColorPicker.Input />
        <ColorPicker.CopyButton />
      </div>
      <ColorPicker.Content>
        <div className="flex flex-col gap-4">
          <ColorPicker.Palette label="Choose background" />
          <ColorPicker.Presets columns={6} />
        </div>
      </ColorPicker.Content>
    </ColorPicker>
  );
}`,
      tags: ['rgb', 'format', 'columns'],
    },
    {
      title: 'HSL Format with End Alignment',
      description: 'Color picker using HSL format with the dropdown aligned to the right edge of the trigger.',
      code: `import { useState } from 'react';
import { ColorPicker } from 'vayu-ui';

export default function HSLPicker() {
  const [color, setColor] = useState('#8b5cf6');

  return (
    <ColorPicker value={color} onChange={setColor} format="hsl">
      <ColorPicker.Label>Accent Color (HSL)</ColorPicker.Label>
      <div className="flex items-center gap-2">
        <ColorPicker.Trigger size="lg" />
        <ColorPicker.Input />
        <ColorPicker.CopyButton />
      </div>
      <ColorPicker.Content align="end">
        <div className="flex flex-col gap-4">
          <ColorPicker.Palette />
          <ColorPicker.Eyedropper label="Pick accent from screen" />
          <ColorPicker.Presets label="Theme Colors" />
        </div>
      </ColorPicker.Content>
    </ColorPicker>
  );
}`,
      tags: ['hsl', 'format', 'align', 'custom-labels'],
    },
    {
      title: 'Standalone Swatches',
      description: 'Independent swatch grid that works outside the ColorPicker context, useful for quick color selection.',
      code: `import { useState } from 'react';
import { ColorPicker } from 'vayu-ui';

export default function SwatchesDemo() {
  const [color, setColor] = useState('#ef4444');

  return (
    <ColorPicker.Swatches
      label="Quick Pick"
      colors={[
        '#ef4444', '#f97316', '#eab308', '#22c55e',
        '#3b82f6', '#8b5cf6', '#ec4899', '#171717',
      ]}
      value={color}
      onChange={setColor}
      size="lg"
      columns={4}
    />
  );
}`,
      tags: ['swatches', 'standalone', 'grid'],
    },
    {
      title: 'Disabled and Error States',
      description: 'Color picker in disabled state preventing all interaction, and an error state showing validation feedback.',
      code: `import { ColorPicker } from 'vayu-ui';

export default function StatesDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Disabled */}
      <ColorPicker defaultValue="#6366f1" disabled>
        <ColorPicker.Label>Locked Color</ColorPicker.Label>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger />
          <ColorPicker.Input />
        </div>
      </ColorPicker>

      {/* Error */}
      <ColorPicker validationState="error">
        <ColorPicker.Label>Theme Color</ColorPicker.Label>
        <ColorPicker.Description>Select a color for your theme.</ColorPicker.Description>
        <div className="flex items-center gap-2">
          <ColorPicker.Trigger />
          <ColorPicker.Input />
        </div>
        <ColorPicker.Error>This color does not meet contrast requirements.</ColorPicker.Error>
      </ColorPicker>
    </div>
  );
}`,
      tags: ['disabled', 'error', 'validation', 'states'],
    },
    {
      title: 'Minimal Picker',
      description: 'Simplest color picker with just a trigger and palette, no input or copy button.',
      code: `import { ColorPicker } from 'vayu-ui';

export default function MinimalPicker() {
  return (
    <ColorPicker defaultValue="#10b981">
      <ColorPicker.Label>Minimal Picker</ColorPicker.Label>
      <ColorPicker.Trigger />
      <ColorPicker.Content>
        <ColorPicker.Palette />
      </ColorPicker.Content>
    </ColorPicker>
  );
}`,
      tags: ['minimal', 'simple', 'trigger-only'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using Swatches without the colors prop',
      bad: '<ColorPicker.Swatches />',
      good: '<ColorPicker.Swatches colors={["#ef4444", "#3b82f6", "#22c55e"]} />',
      reason: 'The colors prop is required on Swatches because it is a standalone component with no ColorPicker context to fall back to. Omitting it results in an empty grid.',
    },
    {
      title: 'Mixing controlled and uncontrolled patterns',
      bad: '<ColorPicker value={color} defaultValue="#3b82f6" onChange={setColor}>',
      good: '<ColorPicker value={color} onChange={setColor}>',
      reason: 'Passing both value and defaultValue is contradictory. Use value + onChange for controlled mode, or defaultValue alone for uncontrolled mode. Never mix the two.',
    },
    {
      title: 'Placing sub-components outside the ColorPicker root',
      bad: '<ColorPicker /><ColorPicker.Trigger />',
      good: '<ColorPicker><ColorPicker.Trigger /></ColorPicker>',
      reason: 'All sub-components except Swatches depend on the ColorPicker context via useColorPicker(). Placing them outside the root will throw an error because the context is undefined.',
    },
    {
      title: 'Setting validationState to error without providing an Error sub-component',
      bad: '<ColorPicker validationState="error"><ColorPicker.Trigger /></ColorPicker>',
      good: '<ColorPicker validationState="error"><ColorPicker.Trigger /><ColorPicker.Error>Invalid color</ColorPicker.Error></ColorPicker>',
      reason: 'Without the Error sub-component, the input shows error styling but no message is communicated to the user. Always pair error state with a descriptive error message for accessibility.',
    },
    {
      title: 'Relying on EyeDropper in production without a fallback',
      bad: '<ColorPicker.Eyedropper />',
      good: '<ColorPicker.Eyedropper label="Pick from screen" unsupportedText="Not supported — enter a hex value instead" />',
      reason: 'The EyeDropper API is only available in Chromium browsers. The component provides a built-in fallback, but custom unsupportedText provides better UX guidance for users on unsupported browsers.',
    },
  ],
};
