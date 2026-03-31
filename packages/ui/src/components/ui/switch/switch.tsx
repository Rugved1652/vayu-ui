// switch.tsx
// Composition: UI + wiring

"use client";

import { cn } from "../utils";
import { forwardRef, useId } from "react";
import type { SwitchProps } from "./types";
import { useSwitchControl } from "./hooks";
import { SwitchTrack } from "./SwitchTrack";
import { SwitchLabel } from "./SwitchLabel";

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      error = false,
      disabled,
      id: idProp,
      checked,
      defaultChecked = false,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const { checked: isChecked, handleChange } = useSwitchControl(
      checked,
      defaultChecked,
      disabled,
      onCheckedChange
    );

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
            aria-checked={isChecked}
            aria-invalid={error || undefined}
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-describedby={description ? `${id}-description` : undefined}
            className="peer sr-only"
            checked={isChecked}
            onChange={handleChange}
            {...props}
          />

          <SwitchTrack checked={isChecked} disabled={disabled} error={error} />
        </label>

        {/* Label & Description */}
        <SwitchLabel
          id={id}
          label={label}
          description={description}
          disabled={disabled}
          error={error}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
