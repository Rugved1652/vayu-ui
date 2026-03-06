"use client";

import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

// ============================================================================
// CVA Variants
// ============================================================================

const switchTrackVariants = cva(
  [
    "rounded-full",
    "border-2",
    "border-transparent",
    "cursor-pointer",
    "transition-colors",
    "duration-200",
    "ease-in-out",
    "bg-ground-200",
    "dark:bg-ground-700",
    "peer-checked:bg-primary-500",
    "peer-focus-visible:ring-2",
    "peer-focus-visible:ring-offset-2",
    "peer-focus-visible:ring-primary-600",
    "peer-disabled:opacity-50",
    "peer-disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-4",
        md: "w-11 h-6",
        lg: "w-14 h-7",
      },
      error: {
        true: "ring-2 ring-error-500",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

const switchThumbVariants = cva(
  [
    "block",
    "rounded-full",
    "shadow-outer",
    "ring-0",
    "transition-transform",
    "duration-200",
    "ease-in-out",
    "pointer-events-none",
    "bg-ground-50",
  ],
  {
    variants: {
      size: {
        sm: "w-3 h-3 translate-x-0.5 peer-checked:translate-x-4 mt-0.5",
        md: "w-5 h-5 translate-x-0.5 peer-checked:translate-x-5 mt-0.5",
        lg: "w-6 h-6 translate-x-0.5 peer-checked:translate-x-7 mt-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const labelVariants = cva(
  [
    "font-medium",
    "font-primary",
    "bg-transparent",
    "select-none",
    "cursor-pointer",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      error: {
        true: "text-error-600 dark:text-error-500",
        false: "text-ground-900 dark:text-ground-100",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      error: false,
    },
  }
);

const descriptionVariants = cva(
  ["font-secondary", "select-none", "text-ground-500 dark:text-ground-400"],
  {
    variants: {
      size: {
        sm: "text-[10px]",
        md: "text-xs",
        lg: "text-sm",
      },
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

// ============================================================================
// Types
// ============================================================================

export type SwitchSize = VariantProps<typeof switchTrackVariants>["size"];

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size of the switch track and typography */
  size?: SwitchSize;
  /** Primary label displayed next to the switch */
  label?: ReactNode;
  /** Secondary helper text displayed below the label */
  description?: ReactNode;
  /** Visual error state indicator */
  error?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Switch — A toggle control for binary on/off states.
 *
 * Built on native `input[type="checkbox"]` with `role="switch"` for
 * full WCAG 2.2 AA accessibility compliance.
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   description="Receive email alerts"
 *   defaultChecked
 * />
 * ```
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      label,
      description,
      error = false,
      disabled,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp || generatedId;
    const descriptionId = `${id}-description`;

    return (
      <div className={clsx("inline-flex items-start gap-3", className)}>
        <div className="relative inline-flex items-center shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={description ? descriptionId : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={switchTrackVariants({ size, error })}
            aria-hidden="true"
          >
            <span className={switchThumbVariants({ size })} />
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col cursor-default">
            {label && (
              <label
                htmlFor={id}
                className={labelVariants({ size, disabled: !!disabled, error })}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={descriptionId}
                className={descriptionVariants({ size, disabled: !!disabled })}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants, labelVariants, descriptionVariants };