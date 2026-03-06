"use client";

import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
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
// CVA Variants
// ============================================================================

const sliderTrackVariants = cva(
    [
        "relative",
        "w-full",
        "grow",
        "overflow-hidden",
        "rounded-full",
        "bg-ground-200",
        "dark:bg-ground-800",
    ],
    {
        variants: {
            size: {
                sm: "h-1",
                md: "h-1.5",
                lg: "h-2",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

const sliderRangeVariants = cva(
    ["absolute", "h-full", "bg-primary-500", "dark:bg-primary-500"],
    {
        variants: {
            size: {
                sm: "",
                md: "",
                lg: "",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

const sliderThumbVariants = cva(
    [
        "absolute",
        "block",
        "rounded-full",
        "border-2",
        "border-primary-500",
        "dark:border-primary-400",
        "bg-white",
        "dark:bg-ground-950",
        "shadow-outer",
        "transition-transform",
        "duration-150",
        "ease-in-out",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary-500",
        "dark:focus-visible:ring-primary-400",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white",
        "dark:focus-visible:ring-offset-ground-950",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
    ],
    {
        variants: {
            size: {
                sm: "h-4 w-4",
                md: "h-5 w-5",
                lg: "h-6 w-6",
            },
            isDragging: {
                true: "scale-110 cursor-grabbing",
                false: "cursor-grab",
            },
        },
        defaultVariants: {
            size: "md",
            isDragging: false,
        },
    }
);

const sliderRootVariants = cva(
    [
        "relative",
        "flex",
        "w-full",
        "touch-none",
        "select-none",
        "items-center",
        "data-[disabled]:opacity-50",
        "data-[disabled]:cursor-not-allowed",
    ],
    {
        variants: {
            size: {
                sm: "py-3",
                md: "py-4",
                lg: "py-5",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

// ============================================================================
// Types
// ============================================================================

export type SliderSize = VariantProps<typeof sliderTrackVariants>["size"];

export interface SliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
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
    /** Size of the slider */
    size?: SliderSize;
    /** Name for form submission */
    name?: string;
    /** Accessible label for the slider */
    label?: string;
    /** Callback when value changes */
    onValueChange?: (value: number[]) => void;
    /** Callback when value change is committed (drag/key end) */
    onValueCommit?: (value: number[]) => void;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Slider — An input where the user selects a value from within a given range.
 *
 * Supports single value or range (multiple thumbs) with full keyboard
 * accessibility and WCAG 2.2 AA compliance.
 *
 * @example
 * ```tsx
 * // Single value
 * <Slider defaultValue={[50]} max={100} label="Volume" />
 *
 * // Range (two thumbs)
 * <Slider defaultValue={[25, 75]} max={100} label="Price range" />
 * ```
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(
    (
        {
            value: valueProp,
            defaultValue = [0],
            min = 0,
            max = 100,
            step = 1,
            disabled = false,
            size = "md",
            name,
            label,
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
        const [activeThumb, setActiveThumb] = useState<number | null>(null);
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
            [min, max, step, values, valueProp, activeThumb, onValueChange, onValueCommit]
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

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
            if (disabled) return;

            let newValue = values[index];

            switch (event.key) {
                case "ArrowRight":
                case "ArrowUp":
                    newValue = Math.min(max, newValue + step);
                    break;
                case "ArrowLeft":
                case "ArrowDown":
                    newValue = Math.max(min, newValue - step);
                    break;
                case "PageUp":
                    newValue = Math.min(max, newValue + step * 10);
                    break;
                case "PageDown":
                    newValue = Math.max(min, newValue - step * 10);
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

        // Generate unique IDs for ARIA
        const sliderId = props.id || `slider-${Math.random().toString(36).slice(2, 9)}`;

        return (
            <div
                ref={ref}
                id={sliderId}
                className={clsx(
                    sliderRootVariants({ size }),
                    className
                )}
                data-disabled={disabled ? "" : undefined}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                aria-disabled={disabled}
                role="group"
                aria-label={label || "Slider"}
                {...props}
            >
                {/* Track */}
                <div
                    ref={trackRef}
                    className={sliderTrackVariants({ size })}
                    aria-hidden="true"
                >
                    {/* Range Fill */}
                    {values.length > 1 ? (
                        <div
                            className={sliderRangeVariants({ size })}
                            style={{
                                left: `${((values[0] - min) / (max - min)) * 100}%`,
                                right: `${100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,
                            }}
                        />
                    ) : (
                        <div
                            className={sliderRangeVariants({ size })}
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
                        id={`${sliderId}-thumb-${index}`}
                        className={sliderThumbVariants({ size, isDragging })}
                        style={{
                            left: `${((val - min) / (max - min)) * 100}%`,
                            transform: "translateX(-50%)",
                        }}
                        tabIndex={disabled ? -1 : 0}
                        role="slider"
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={val}
                        aria-valuetext={label ? `${label}: ${val}` : String(val)}
                        aria-disabled={disabled}
                        aria-label={
                            values.length > 1
                                ? `${label || "Value"} ${index + 1} of ${values.length}`
                                : label || "Slider value"
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}

                {/* Hidden Input for Form Submission */}
                {name &&
                    values.map((val, i) => (
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

export {
    Slider,
    sliderTrackVariants,
    sliderRangeVariants,
    sliderThumbVariants,
    sliderRootVariants,
};