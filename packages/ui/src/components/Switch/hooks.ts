// hooks.ts
// Logic

import { useCallback, useState } from 'react';

export function useSwitchControl(
  controlledChecked: boolean | undefined,
  defaultChecked: boolean,
  disabled: boolean | undefined,
  onCheckedChange?: (checked: boolean) => void,
) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = useCallback(() => {
    if (disabled) return;

    const newValue = !checked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onCheckedChange?.(newValue);
  }, [disabled, checked, isControlled, onCheckedChange]);

  return { checked, handleChange };
}
