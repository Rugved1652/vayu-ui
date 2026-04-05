// Types

import { HTMLAttributes } from 'react';

export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Controlled value(s) */
  value?: number[];
  /** Initial value(s) when uncontrolled */
  defaultValue?: number[];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Stepping interval */
  step?: number;
  /** Disable interaction */
  disabled?: boolean;
  /** Name for form submission */
  name?: string;
  /** Accessible label for the slider */
  label?: string;
  /** Callback when value changes */
  onValueChange?: (value: number[]) => void;
  /** Callback when value change is committed (drag/key end) */
  onValueCommit?: (value: number[]) => void;
}
