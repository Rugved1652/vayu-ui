"use client";

import { cn } from "./utils";
import { forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from "react";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "checked" | "onChange"> {
  /** Label text displayed next to the switch */
  label?: ReactNode;
  /** Description text below the label */
  description?: ReactNode;
  /** Shows error styling */
  error?: boolean;
  /** Controlled state value */
  checked?: boolean;
  /** Default state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      error = false,
      disabled,
      id: idProp,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const labelId = `${id}-label`;
    const descriptionId = description ? `${id}-description` : undefined;

    // State management
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = () => {
      if (disabled) return;

      const newValue = !checked;

      if (!isControlled) {
        setInternalChecked(newValue);
      }

      onCheckedChange?.(newValue);
    };

    return (
      <div className={cn("flex items-start gap-3", className)}>
        {/* Switch Control */}
        <label
          htmlFor={id}
          className={cn(
            "inline-flex items-center",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {/* Hidden Input - Accessibility API */}
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-checked={checked}
            aria-invalid={error || undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={descriptionId}
            className="peer sr-only"
            checked={checked}
            onChange={handleChange}
            {...props}
          />

          {/* Visual Track */}
          <span
            aria-hidden="true"
            className={cn(
              // Base
              "relative inline-flex items-center",
              "w-11 h-6 p-0.5 rounded-control",
              "transition-colors duration-200 ease-in-out",
              // Background colors (semantic tokens)
              checked ? "bg-brand" : "bg-muted",
              // Focus visible ring (WCAG 2.2)
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas",
              // Disabled state
              "peer-disabled:opacity-50",
              // Error state (only when not checked and not disabled)
              error && !disabled && !checked && "ring-2 ring-destructive"
            )}
          >
            {/* Thumb - JS conditional since peer-checked doesn't work on nested elements */}
            <span
              className={cn(
                "pointer-events-none",
                "w-5 h-5 rounded-full",
                "bg-elevated shadow-control",
                "transition-transform duration-200 ease-in-out",
                )}
              style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
            />
          </span>
        </label>

        {/* Label & Description */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                id={labelId}
                htmlFor={id}
                className={cn(
                  "text-sm font-medium select-none",
                  "text-surface-content",
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                  error && !disabled && "text-destructive"
                )}
              >
                {label}
              </label>
            )}

            {description && (
              <p
                id={descriptionId}
                className={cn(
                  "text-xs select-none",
                  "text-muted-content",
                  disabled && "opacity-50"
                )}
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

export { Switch };
