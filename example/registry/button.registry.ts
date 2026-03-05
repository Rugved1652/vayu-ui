import type { RegistryItem } from '../types/registry.types';

export const button: RegistryItem = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name:        'Button',
  category:    'action',
  description: 'Triggers an action or event. Use for form submits, CTAs, and confirmations.',
  since:       '1.0.0',
  importPath:  "import { Button } from '@mykit/ui'",

  // ── Props ──────────────────────────────────────────────────────────────────
  props: {
    variant: {
      type:        '"solid" | "outline" | "ghost"',
      required:    false,
      default:     '"solid"',
      description: 'Visual style of the button.',
    },
    size: {
      type:        '"sm" | "md" | "lg"',
      required:    false,
      default:     '"md"',
      description: 'Controls padding and font size.',
    },
    color: {
      type:        '"emerald" | "orange" | "red" | "gray"',
      required:    false,
      default:     '"emerald"',
      description: 'Color palette applied to the button.',
    },
    disabled: {
      type:        'boolean',
      required:    false,
      default:     'false',
      description: 'Prevents interaction and applies muted styling.',
    },
    loading: {
      type:        'boolean',
      required:    false,
      default:     'false',
      description: 'Replaces content with a spinner. Implicitly disables the button.',
    },
    leftIcon: {
      type:        'React.ReactNode',
      required:    false,
      default:     'undefined',
      description: 'Icon rendered left of the label. Use 16px icons.',
    },
    rightIcon: {
      type:        'React.ReactNode',
      required:    false,
      default:     'undefined',
      description: 'Icon rendered right of the label.',
    },
    fullWidth: {
      type:        'boolean',
      required:    false,
      default:     'false',
      description: 'Stretches button to fill its container.',
    },
    type: {
      type:        '"button" | "submit" | "reset"',
      required:    false,
      default:     '"button"',
      description: 'Native HTML button type. Always set to "submit" inside forms.',
    },
    children: {
      type:        'React.ReactNode',
      required:    true,
      description: 'Button label content.',
    },
    // Deprecated example
    intent: {
      type:        '"primary" | "danger"',
      required:    false,
      default:     '"primary"',
      description: 'Legacy intent prop.',
      deprecated: {
        since:      '2.0.0',
        replacedBy: 'color',
        message:    'Use `color="red"` for danger intent.',
      },
    },
  },

  // ── Events ─────────────────────────────────────────────────────────────────
  events: {
    onClick: {
      signature:   '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fires on click. Not fired when disabled or loading.',
    },
    onFocus: {
      signature:   '(event: React.FocusEvent<HTMLButtonElement>) => void',
      description: 'Fires when button receives focus.',
    },
    onBlur: {
      signature:   '(event: React.FocusEvent<HTMLButtonElement>) => void',
      description: 'Fires when button loses focus.',
    },
  },

  // ── Variants & States ──────────────────────────────────────────────────────
  variants: ['solid', 'outline', 'ghost'],

  states: {
    default: {
      trigger:      'No special props',
      visualChange: 'Base bg + text color from variant',
    },
    hover: {
      trigger:      'Mouse hover (CSS)',
      visualChange: 'bg darkens by one shade (e.g. emerald-600 → emerald-700)',
    },
    focus: {
      trigger:      'Keyboard Tab or click',
      visualChange: 'ring-2 ring-offset-2 ring-emerald-500',
      ariaAttr:     ':focus-visible',
    },
    disabled: {
      trigger:      'disabled={true}',
      visualChange: 'opacity-50, cursor-not-allowed',
      ariaAttr:     'aria-disabled="true"',
    },
    loading: {
      trigger:      'loading={true}',
      visualChange: 'Spinner replaces children, button implicitly disabled',
      ariaAttr:     'aria-busy="true"',
    },
  },

  // ── Examples ───────────────────────────────────────────────────────────────
  examples: {
    default: {
      code:        `<Button>Save Changes</Button>`,
      description: 'Basic solid emerald button.',
    },
    outline: {
      code:        `<Button variant="outline">Cancel</Button>`,
      description: 'Outline variant for secondary actions.',
    },
    ghost: {
      code:        `<Button variant="ghost" size="sm">Clear</Button>`,
      description: 'Ghost for low-priority tertiary actions.',
    },
    loading: {
      code:        `<Button loading={true}>Submitting...</Button>`,
      description: 'Loading state during async operations.',
    },
    withIcon: {
      code:        `<Button leftIcon={<PlusIcon className="w-4 h-4" />}>Add Item</Button>`,
      description: 'With a leading icon.',
    },
    danger: {
      code:        `<Button color="red" variant="solid">Delete Account</Button>`,
      description: 'Destructive action using red color.',
    },
    formSubmit: {
      code: `
<form onSubmit={handleSubmit}>
  <Button type="submit" loading={isSubmitting} fullWidth>
    Create Account
  </Button>
</form>`,
      description: 'Inside a form with submit type and full width.',
    },
  },

  // ── Design Tokens ──────────────────────────────────────────────────────────
  tokens: [
    { var: '--color-emerald-600', value: '#059669', controls: 'solid variant background',  overridable: true  },
    { var: '--color-emerald-700', value: '#047857', controls: 'solid variant hover bg',     overridable: true  },
    { var: '--color-emerald-500', value: '#10b981', controls: 'focus ring color',           overridable: true  },
    { var: '--btn-border-radius', value: '0.375rem', controls: 'border radius (all sizes)', overridable: true  },
    { var: '--btn-font-weight',   value: '600',     controls: 'label font weight',          overridable: false },
  ],

  // ── Dark Mode ──────────────────────────────────────────────────────────────
  darkMode: {
    automatic: true,
    tokenSwaps: {
      '--color-emerald-600': '--color-emerald-500',
      '--color-emerald-700': '--color-emerald-400',
    },
  },

  // ── Accessibility ──────────────────────────────────────────────────────────
  a11y: {
    role: 'button',
    requiredAttrs: {
      'aria-label': 'Required when button has no visible text (icon-only buttons)',
    },
    managedAttrs: ['aria-disabled', 'aria-busy'],
    keyboard: {
      'Enter': 'Activates the button',
      'Space': 'Activates the button',
    },
    focusManagement: 'Focus remains on button after click. Move focus manually if button triggers navigation.',
  },

  // ── Relationships ──────────────────────────────────────────────────────────
  dependencies:   [],                                   // No internal sub-components
  peerComponents: ['Tooltip', 'ButtonGroup', 'Form'],   // Frequently used with

  // ── Rules ──────────────────────────────────────────────────────────────────
  doNot: [
    { rule: "Don't use ghost for primary CTAs",          category: 'ux',     why: 'Low visual weight fails to draw attention' },
    { rule: "Don't nest <a> or <button> inside Button",  category: 'nesting',why: 'Invalid HTML — causes unpredictable event behaviour' },
    { rule: "Don't disable without a Tooltip explaining why", category: 'a11y', why: 'Disabled state gives no feedback to screen reader users' },
    { rule: "Don't override --btn-font-weight",          category: 'styling', why: 'Breaks optical consistency across button sizes' },
    { rule: "Don't use loading + disabled simultaneously", category: 'api',   why: 'Redundant — loading already disables interaction' },
  ],

  // ── Testing ────────────────────────────────────────────────────────────────
  testing: {
    testIds: {
      'root element':      'btn-root',
      'loading spinner':   'btn-spinner',
      'left icon wrapper': 'btn-icon-left',
    },
    storybookPath: 'Components/Button',
  },

  // ── Changelog ──────────────────────────────────────────────────────────────
  changelog: [
    {
      version:     '2.0.0',
      date:        '2024-11-01',
      type:        'deprecated',
      description: 'Deprecated `intent` prop. Use `color` instead.',
      breaking:    false,
    },
    {
      version:     '1.3.0',
      date:        '2024-06-15',
      type:        'added',
      description: 'Added `rightIcon` and `fullWidth` props.',
      breaking:    false,
    },
    {
      version:     '1.0.0',
      date:        '2024-01-01',
      type:        'added',
      description: 'Initial release.',
      breaking:    false,
    },
  ],
};
