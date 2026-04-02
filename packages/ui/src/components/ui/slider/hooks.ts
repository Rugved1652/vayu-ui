// Logic

import { PointerEvent, useCallback, useEffect, useState } from 'react';

interface UseSliderDragOptions {
  valueProp?: number[];
  defaultValue?: number[];
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
}

export function useSliderDrag({
  valueProp,
  defaultValue = [0],
  min,
  max,
  step,
  disabled,
  onValueChange,
  onValueCommit,
}: UseSliderDragOptions) {
  const [internalValue, setInternalValue] = useState<number[]>(valueProp || defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  // Sync with controlled value prop
  useEffect(() => {
    if (valueProp !== undefined) {
      setInternalValue(valueProp);
    }
  }, [valueProp]);

  const values = valueProp || internalValue;

  // Clamp value within bounds
  const clamp = (v: number) => Math.min(Math.max(v, min), max);

  // Update value based on pointer position percentage
  const updateValue = useCallback(
    (percent: number, commit = false) => {
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = clamp(Number(steppedValue.toFixed(2)));

      const nextValues = [...values];

      // Find closest thumb index (use active thumb if dragging)
      let closestIndex = 0;
      if (activeThumb !== null) {
        closestIndex = activeThumb;
      } else {
        let minDiff = Infinity;
        nextValues.forEach((val, index) => {
          const diff = Math.abs(val - clampedValue);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });
      }

      nextValues[closestIndex] = clampedValue;
      nextValues.sort((a, b) => a - b);

      if (valueProp === undefined) {
        setInternalValue(nextValues);
      }

      onValueChange?.(nextValues);
      if (commit) {
        onValueCommit?.(nextValues);
      }
    },
    [min, max, step, values, valueProp, activeThumb, onValueChange, onValueCommit],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);

    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;

    // Determine which thumb to activate
    const rawValue = min + percent * (max - min);
    let closestIndex = 0;
    let minDiff = Infinity;
    values.forEach((val, index) => {
      const diff = Math.abs(val - rawValue);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    setActiveThumb(closestIndex);

    updateValue(percent);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    updateValue(percent);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (isDragging) {
      setIsDragging(false);
      setActiveThumb(null);
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      updateValue(percent, true);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    values,
    isDragging,
    activeThumb,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
