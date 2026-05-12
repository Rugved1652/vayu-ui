/**
 * Standardized input styling utilities for VVayu UI components.
 *
 * Provides consistent tokens for borders, focus rings, sizes, validation states,
 * labels, and helper text across all input-like components (TextInput, Select,
 * TextArea, DatePicker, TimePicker, ColorPicker, OTPInput).
 *
 * All focus indicators use a 2px border (no outline/ring) to avoid the visual
 * "double border" effect caused by ring offsets.
 *
 * State rules:
 *   - Hover / Focus / Filled  →  border-2 border-brand
 *   - Error                    →  border-2 border-destructive
 *   - Success                  →  border-2 border-success  (explicit flag)
 *   - Warning                  →  border-2 border-warning
 *   - Default (empty)          →  border-2 border-field hover:border-brand
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type ValidationState = 'default' | 'error' | 'warning' | 'success';

/* ------------------------------------------------------------------ */
/*  Base container                                                    */
/* ------------------------------------------------------------------ */

/** Classes applied to every input field / trigger container. */
export const inputBaseStyles =
  'flex items-center w-full bg-surface border-2 rounded-control transition-all duration-200';

/** Classes for the native/native-like input element inside the container. */
export const inputTextStyles =
  'font-secondary text-surface-content placeholder:text-muted-content';

/** Container gap between prefix icon, input, suffix actions. */
export const inputGapStyles = 'gap-2';

/* ------------------------------------------------------------------ */
/*  Size variants                                                     */
/* ------------------------------------------------------------------ */

export const inputSizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-2.5 text-lg',
};

/** Height-only size map for components where width is fixed (e.g. OTP slots). */
export const inputSlotSizeStyles: Record<InputSize, string> = {
  sm: 'size-8 text-sm',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
};

/* ------------------------------------------------------------------ */
/*  Validation states  — 2px border only (no outline / no ring)       */
/* ------------------------------------------------------------------ */

/**
 * Container-level state styles (used by div wrappers).
 *
 * Default: gray field border that turns brand on hover or when the child
 * input is focused (`focus-within`).
 */
export const inputStateStyles: Record<ValidationState, string> = {
  default:
    'border-field focus-within:border-brand hover:border-brand',
  error: 'border-destructive',
  warning: 'border-warning',
  success: 'border-success',
};

/** Standalone border color per state (1px, for inner elements). */
export const inputBorderStyles: Record<ValidationState, string> = {
  default: 'border-field',
  error: 'border-destructive',
  warning: 'border-warning',
  success: 'border-success',
};

/** Standalone 2px border color per state. */
export const inputBorder2Styles: Record<ValidationState, string> = {
  default: 'border-2 border-field',
  error: 'border-2 border-destructive',
  warning: 'border-2 border-warning',
  success: 'border-2 border-success',
};

/** Focus-within border color per state (for container wrappers). */
export const inputFocusBorderStyles: Record<ValidationState, string> = {
  default: 'focus-within:border-brand',
  error: 'focus-within:border-destructive',
  warning: 'focus-within:border-warning',
  success: 'focus-within:border-success',
};

/* ------------------------------------------------------------------ */
/*  Hover / disabled                                                  */
/* ------------------------------------------------------------------ */

/** Standard hover border tint applied to triggers/fields. */
export const inputHoverBorder = 'hover:border-brand';

/** Disabled state for field containers. */
export const inputDisabledStyles =
  'disabled:opacity-50 disabled:cursor-not-allowed';

/** Disabled state that also swaps background (used by TextInput/TextArea). */
export const inputDisabledMutedStyles =
  'opacity-60 cursor-not-allowed bg-muted';

/* ------------------------------------------------------------------ */
/*  Loading                                                           */
/* ------------------------------------------------------------------ */

/** Spinner classes shown inside input triggers. */
export const inputLoadingSpinnerStyles =
  'w-4 h-4 text-brand animate-spin shrink-0';

/** ARIA attributes for a loading input. */
export const inputLoadingAria = {
  'aria-busy': true,
  'aria-label': 'Loading',
} as const;

/* ------------------------------------------------------------------ */
/*  Label & helper text                                               */
/* ------------------------------------------------------------------ */

/** Root layout spacing between label, field, and messages. */
export const inputRootLayout = 'w-full flex flex-col gap-1.5';

/** Label text above the field. */
export const inputLabelStyles =
  'block font-primary font-medium text-surface-content mb-1.5';

/** Optional / required adornments inside the label row. */
export const inputLabelMetaStyles = 'text-sm font-secondary font-normal';
export const inputRequiredStyles = 'text-destructive ml-1';
export const inputOptionalStyles = 'text-muted-content ml-2';

/** Base classes for helper / status messages. */
export const inputMessageBase =
  'mt-1.5 text-sm font-secondary flex items-center gap-1.5';

export const inputErrorMessageStyles = 'text-destructive';
export const inputWarningMessageStyles = 'text-warning';
export const inputSuccessMessageStyles = 'text-success';
export const inputDescriptionStyles = 'text-muted-content';

/* ------------------------------------------------------------------ */
/*  Dropdown overlays (Select, DatePicker, TimePicker, ColorPicker)   */
/* ------------------------------------------------------------------ */

export const dropdownOverlayStyles =
  'fixed z-50 overflow-hidden rounded-overlay border border-border bg-elevated shadow-elevated animate-in fade-in-0 zoom-in-95';

export const dropdownItemStyles =
  'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors';

export const dropdownItemActiveStyles =
  'bg-brand/90 text-brand-content font-medium';

export const dropdownItemInactiveStyles =
  'text-elevated-content bg-elevated hover:text-brand-content focus:text-brand-content hover:bg-brand/90 focus:bg-brand/90';

/* ------------------------------------------------------------------ */
/*  Convenience helpers                                               */
/* ------------------------------------------------------------------ */

/**
 * Resolve a validation state from the legacy APIs used by some components.
 *
 * - `boolean` true  → 'error'
 * - `string` truthy → 'error'
 * - `undefined`     → 'default'
 */
export function normalizeValidationState(
  value?: boolean | string | ValidationState,
): ValidationState {
  if (value === undefined || value === null) return 'default';
  if (typeof value === 'boolean') return value ? 'error' : 'default';
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase() as ValidationState;
    if (['default', 'error', 'warning', 'success'].includes(normalized)) {
      return normalized;
    }
    return 'error';
  }
  return value;
}

/**
 * Build the complete className for an input field container.
 *
 * @example
 *   cn(inputBaseStyles, inputSizeStyles[size], inputStateStyles[state], className)
 */
export function buildInputContainerClasses(
  size: InputSize = 'md',
  state: ValidationState = 'default',
  extra?: string,
): string {
  const parts = [
    inputBaseStyles,
    inputGapStyles,
    inputSizeStyles[size],
    inputStateStyles[state],
  ];
  if (extra) parts.push(extra);
  return parts.join(' ');
}
