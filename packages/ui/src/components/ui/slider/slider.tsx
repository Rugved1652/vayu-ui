// Composition: UI + logic

"use client";

import { clsx } from "clsx";
import { forwardRef, useRef } from "react";

import { useSliderDrag } from "./hooks";
import SliderTrack from "./track";
import SliderThumb from "./thumb";
import type { SliderProps } from "./types";

const sliderRootStyles =
    "relative flex w-full touch-none select-none items-center py-4 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed";

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
            name,
            label,
            onValueChange,
            onValueCommit,
            className,
            ...props
        },
        ref
    ) => {
        const {
            values,
            isDragging,
            activeThumb,
            handlePointerDown,
            handlePointerMove,
            handlePointerUp,
        } = useSliderDrag({
            valueProp,
            defaultValue,
            min,
            max,
            step,
            disabled,
            onValueChange,
            onValueCommit,
        });

        const trackRef = useRef<HTMLDivElement>(null);

        // Generate unique ID for ARIA
        const sliderId =
            props.id || `slider-${Math.random().toString(36).slice(2, 9)}`;

        return (
            <div
                ref={ref}
                id={sliderId}
                className={clsx(sliderRootStyles, className)}
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
                <SliderTrack
                    ref={trackRef}
                    min={min}
                    max={max}
                    values={values}
                />

                {/* Thumbs */}
                {values.map((val, index) => (
                    <SliderThumb
                        key={index}
                        value={val}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        sliderId={sliderId}
                        index={index}
                        totalThumbs={values.length}
                        label={label}
                        isDragging={isDragging}
                        isActive={activeThumb === index}
                        onValueChange={onValueChange || (() => {})}
                        onValueCommit={onValueCommit || (() => {})}
                        values={values}
                    />
                ))}

                {/* Hidden inputs for form submission */}
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

export default Slider;
