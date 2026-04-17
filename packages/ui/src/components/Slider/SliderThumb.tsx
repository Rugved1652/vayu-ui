// UI: Thumb with keyboard handling

import { clsx } from 'clsx';
import { KeyboardEvent } from 'react';

interface SliderThumbProps {
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  sliderId: string;
  index: number;
  totalThumbs: number;
  label?: string;
  isDragging: boolean;
  isActive: boolean;
  onValueChange: (values: number[]) => void;
  onValueCommit: (values: number[]) => void;
  values: number[];
}

const sliderThumbStyles = clsx(
  'absolute block h-5 w-5 rounded-full',
  'border-2 border-brand bg-surface',
  'shadow-control',
  'transition-transform duration-150 ease-in-out',
  'cursor-grab active:cursor-grabbing',
  'focus-visible:outline-none',
  'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
  'disabled:pointer-events-none disabled:opacity-50',
);

function SliderThumb({
  value,
  min,
  max,
  step,
  disabled,
  sliderId,
  index,
  totalThumbs,
  label,
  isDragging,
  isActive,
  onValueChange,
  onValueCommit,
  values,
}: SliderThumbProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    let newValue = values[index];

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, newValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, newValue - step);
        break;
      case 'PageUp':
        newValue = Math.min(max, newValue + step * 10);
        break;
      case 'PageDown':
        newValue = Math.max(min, newValue - step * 10);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const nextValues = [...values];
    nextValues[index] = newValue;
    nextValues.sort((a, b) => a - b);

    onValueChange(nextValues);
    onValueCommit(nextValues);
  };

  return (
    <div
      id={`${sliderId}-thumb-${index}`}
      className={clsx(sliderThumbStyles, isDragging && isActive && 'scale-110')}
      style={{
        left: `${((value - min) / (max - min)) * 100}%`,
        transform: 'translateX(-50%)',
      }}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={label ? `${label}: ${value}` : String(value)}
      aria-disabled={disabled}
      aria-label={
        totalThumbs > 1
          ? `${label || 'Value'} ${index + 1} of ${totalThumbs}`
          : label || 'Slider value'
      }
      onKeyDown={handleKeyDown}
    />
  );
}

SliderThumb.displayName = 'Slider.Thumb';

export default SliderThumb;
