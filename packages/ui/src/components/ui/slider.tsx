"use client";

import { clsx } from "clsx";
import {
    forwardRef,
    HTMLAttributes,
    KeyboardEvent,
    PointerEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
}

// ============================================================================
// Component
// ============================================================================

const Slider = forwardRef<HTMLDivElement, SliderProps>(
    (
        {
            value: valueProp,
            defaultValue = [0],
            min = 0,
            max = 100,
            step = 1,
            disabled = false,
            name,
            onValueChange,
            onValueCommit,
            className,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState<number[]>(
            valueProp || defaultValue
        );
        const [isDragging, setIsDragging] = useState(false);
        const trackRef = useRef<HTMLDivElement>(null);

        // Sync with controlled value prop
        useEffect(() => {
            if (valueProp !== undefined) {
                setInternalValue(valueProp);
            }
        }, [valueProp]);

        const values = valueProp || internalValue;

        // Ensure value is within bounds
        const clamp = (v: number) => Math.min(Math.max(v, min), max);

        // Helper to update value based on percentage
        const updateValue = useCallback(
            (percent: number, commit = false) => {
                const rawValue = min + percent * (max - min);
                const steppedValue = Math.round(rawValue / step) * step;
                const clampedValue = clamp(Number(steppedValue.toFixed(2))); // Avoid float errors

                // Determine which thumb to move (closest one)
                // For simplicity in this version, we'll assume single thumb or
                // simple replacement. If supporting multiple thumbs, find nearest.
                const nextValues = [...values];

                // Find closest thumb index
                let closestIndex = 0;
                let minDiff = Infinity;
                nextValues.forEach((val, index) => {
                    const diff = Math.abs(val - clampedValue);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIndex = index;
                    }
                });

                nextValues[closestIndex] = clampedValue;
                // Sort values if needed, but usually for ranges we keep [min, max] logic
                // simpler to just update the specific one. For pure range sliders, 
                // we might want sorting, but for now let's just update.
                nextValues.sort((a, b) => a - b);

                if (valueProp === undefined) {
                    setInternalValue(nextValues);
                }

                onValueChange?.(nextValues);
                if (commit) {
                    onValueCommit?.(nextValues);
                }
            },
            [min, max, step, values, valueProp, onValueChange, onValueCommit]
        );

        const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
            if (disabled) return;
            setIsDragging(true);

            event.currentTarget.setPointerCapture(event.pointerId);

            const rect = event.currentTarget.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
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
                // Commit the final value
                const rect = event.currentTarget.getBoundingClientRect();
                const percent = (event.clientX - rect.left) / rect.width;
                updateValue(percent, true);
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
            if (disabled) return;

            let newValue = values[index];
            const direction = event.key;

            switch (direction) {
                case "ArrowRight":
                case "ArrowUp":
                    newValue = Math.min(max, newValue + step);
                    break;
                case "ArrowLeft":
                case "ArrowDown":
                    newValue = Math.max(min, newValue - step);
                    break;
                case "Home":
                    newValue = min;
                    break;
                case "End":
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

            if (valueProp === undefined) {
                setInternalValue(nextValues);
            }
            onValueChange?.(nextValues);
            onValueCommit?.(nextValues);
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative flex w-full touch-none select-none items-center py-4", // Added py for hit area
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                aria-disabled={disabled}
                {...props}
            >
                {/* Track */}
                <div
                    ref={trackRef}
                    className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-ground-200 dark:bg-ground-800"
                >
                    {/* Range Fill */}
                    {values.length > 1 ? (
                        // Range: fill between thumbs
                        <div
                            className="absolute h-full bg-primary-500"
                            style={{
                                left: `${((values[0] - min) / (max - min)) * 100}%`,
                                right: `${100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,
                            }}
                        />
                    ) : (
                        // Single: fill from start
                        <div
                            className="absolute h-full bg-primary-500"
                            style={{
                                width: `${((values[0] - min) / (max - min)) * 100}%`,
                            }}
                        />
                    )}
                </div>

                {/* Thumbs */}
                {values.map((val, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "absolute block h-5 w-5 rounded-full border-2 border-primary-500 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                            "dark:border-primary-400 dark:bg-ground-950 dark:focus-visible:ring-offset-ground-950",
                            isDragging && "scale-110 cursor-grabbing"
                        )}
                        style={{
                            left: `${((val - min) / (max - min)) * 100}%`,
                            transform: "translateX(-50%)",
                        }}
                        tabIndex={disabled ? -1 : 0}
                        role="slider"
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={val}
                        aria-disabled={disabled}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}

                {/* Hidden Input for Form Submission */}
                {name && values.map((val, i) => (
                    <input
                        key={i}
                        type="hidden"
                        name={values.length > 1 ? `${name}[]` : name}
                        value={val}
                    />
                ))}
            </div>
        );
    }
);

Slider.displayName = "Slider";

export { Slider };
