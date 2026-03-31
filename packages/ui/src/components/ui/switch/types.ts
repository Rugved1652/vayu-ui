// types.ts
// Types

import type { InputHTMLAttributes, ReactNode } from "react";

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
