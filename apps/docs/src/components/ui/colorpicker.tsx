"use client";

import React, {
    forwardRef,
    HTMLAttributes,
    useState,
    useRef,
    useEffect,
    useId,
    useCallback,
} from "react";
import { clsx } from "clsx";
import { Check, Pipette, RefreshCw } from "lucide-react";

// ============================================================================
// Types & Interfaces
// ============================================================================

type ColorFormat = "hex" | "rgb" | "hsl";

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

interface ColorPickerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    format?: ColorFormat;
    showInput?: boolean;
    showPresets?: boolean;
    showAlpha?: boolean;
    presetColors?: string[];
    disabled?: boolean;
    label?: string;
    description?: string;
    error?: boolean;
    errorText?: string;
}

interface ColorSwatchesProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    colors: string[];
    value?: string;
    onChange?: (color: string) => void;
    size?: "sm" | "md" | "lg";
    label?: string;
}

// ============================================================================
// Color Conversion Utilities
// ============================================================================

const hexToRgb = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
};

// ============================================================================
// ColorPicker Component
// ============================================================================

const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerProps>(
    (
        {
            value,
            defaultValue = "#3b82f6",
            onChange,
            format = "hex",
            showInput = true,
            showPresets = true,
            showAlpha = false,
            presetColors = [
                "#ef4444",
                "#f97316",
                "#f59e0b",
                "#eab308",
                "#84cc16",
                "#22c55e",
                "#10b981",
                "#14b8a6",
                "#06b6d4",
                "#0ea5e9",
                "#3b82f6",
                "#6366f1",
                "#8b5cf6",
                "#a855f7",
                "#d946ef",
                "#ec4899",
            ],
            disabled = false,
            label,
            description,
            error = false,
            errorText,
            className,
            ...props
        },
        ref
    ) => {
        const [internalColor, setInternalColor] = useState(defaultValue);
        const [isOpen, setIsOpen] = useState(false);
        const [alpha, setAlpha] = useState(1);
        const containerRef = useRef<HTMLDivElement>(null);
        const uniqueId = useId();
        const labelId = `${uniqueId}-label`;
        const descriptionId = `${uniqueId}-desc`;
        const errorId = `${uniqueId}-error`;
        const dropdownId = `${uniqueId}-dropdown`;

        const isControlled = value !== undefined;
        const currentColor = isControlled ? value : internalColor;

        // Close on click outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [isOpen]);

        // Close on Escape
        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener("keydown", handleKeyDown);
            }

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [isOpen]);

        const handleColorChange = useCallback(
            (newColor: string) => {
                if (!isControlled) {
                    setInternalColor(newColor);
                }
                onChange?.(newColor);
            },
            [isControlled, onChange]
        );

        const formatColor = useCallback(
            (hex: string): string => {
                const rgb = hexToRgb(hex);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

                switch (format) {
                    case "rgb":
                        return showAlpha
                            ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
                            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                    case "hsl":
                        return showAlpha
                            ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`
                            : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
                    default:
                        return hex;
                }
            },
            [format, showAlpha, alpha]
        );

        const generateRandomColor = () => {
            const randomColor =
                "#" +
                Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0");
            handleColorChange(randomColor);
        };

        return (
            <div
                ref={ref}
                className={clsx("w-full", className)}
                {...props}
            >
                {/* Label & Description */}
                {(label || description) && (
                    <div className="mb-2">
                        {label && (
                            <label
                                id={labelId}
                                className="block font-primary text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-1"
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p
                                id={descriptionId}
                                className="text-xs font-secondary text-neutral-500 dark:text-neutral-400"
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div ref={containerRef} className="relative">
                    {/* Color Display & Input */}
                    <div className="flex gap-2">
                        {/* Color Swatch Trigger */}
                        <button
                            type="button"
                            onClick={() => !disabled && setIsOpen(!isOpen)}
                            disabled={disabled}
                            aria-expanded={isOpen}
                            aria-controls={dropdownId}
                            aria-labelledby={label ? labelId : undefined}
                            aria-describedby={clsx(
                                description && descriptionId,
                                error && errorText && errorId
                            ) || undefined}
                            className={clsx(
                                "w-12 h-12 rounded-md border-2 transition-all duration-200",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2",
                                "shadow-sm hover:shadow-md",
                                error
                                    ? "border-error-500 dark:border-error-400"
                                    : "border-neutral-300 dark:border-neutral-700",
                                disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer"
                            )}
                            style={{ backgroundColor: currentColor }}
                        >
                            <span className="sr-only">
                                {formatColor(currentColor)}
                            </span>
                        </button>

                        {/* Input Field */}
                        {showInput && (
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={formatColor(currentColor)}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (
                                            newValue.startsWith("#") &&
                                            /^#[0-9A-F]{6}$/i.test(newValue)
                                        ) {
                                            handleColorChange(newValue);
                                        }
                                    }}
                                    disabled={disabled}
                                    aria-label={
                                        label
                                            ? `${label} color value`
                                            : "Color value"
                                    }
                                    aria-invalid={error || undefined}
                                    className={clsx(
                                        "flex-1 px-3 py-2 rounded-md border-2 font-mono text-sm",
                                        "bg-white dark:bg-neutral-800",
                                        "text-neutral-900 dark:text-white",
                                        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                        "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                                        "font-secondary",
                                        error
                                            ? "border-error-500 dark:border-error-400"
                                            : "border-neutral-300 dark:border-neutral-700"
                                    )}
                                    placeholder="#000000"
                                />
                                <button
                                    type="button"
                                    onClick={generateRandomColor}
                                    disabled={disabled}
                                    aria-label="Generate random color"
                                    className={clsx(
                                        "px-3 py-2 rounded-md border-2 border-neutral-300 dark:border-neutral-700",
                                        "bg-white dark:bg-neutral-800",
                                        "text-neutral-700 dark:text-neutral-300",
                                        "hover:bg-neutral-50 dark:hover:bg-neutral-700",
                                        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                                        "transition-colors",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Color Picker Dropdown */}
                    {isOpen && !disabled && (
                        <div
                            id={dropdownId}
                            role="dialog"
                            aria-label="Color picker"
                            className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-50 w-full min-w-[280px]"
                        >
                            {/* Native Color Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-secondary font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    <Pipette className="w-4 h-4 inline-block mr-2" />
                                    Pick a color
                                </label>
                                <input
                                    type="color"
                                    value={currentColor}
                                    onChange={(e) =>
                                        handleColorChange(e.target.value)
                                    }
                                    className="w-full h-12 rounded-md cursor-pointer border-2 border-neutral-300 dark:border-neutral-700"
                                />
                            </div>

                            {/* Alpha Slider */}
                            {showAlpha && (
                                <div className="mb-4">
                                    <label className="block text-sm font-secondary font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Opacity: {Math.round(alpha * 100)}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={alpha}
                                        onChange={(e) =>
                                            setAlpha(
                                                parseFloat(e.target.value)
                                            )
                                        }
                                        aria-label="Color opacity"
                                        className="w-full accent-primary-500"
                                    />
                                </div>
                            )}

                            {/* Preset Colors */}
                            {showPresets && presetColors.length > 0 && (
                                <div>
                                    <label className="block text-sm font-secondary font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Preset Colors
                                    </label>
                                    <div
                                        className="grid grid-cols-8 gap-2"
                                        role="listbox"
                                        aria-label="Preset colors"
                                    >
                                        {presetColors.map(
                                            (presetColor, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={
                                                        currentColor.toLowerCase() ===
                                                        presetColor.toLowerCase()
                                                    }
                                                    onClick={() =>
                                                        handleColorChange(
                                                            presetColor
                                                        )
                                                    }
                                                    className={clsx(
                                                        "w-8 h-8 rounded-md border-2 transition-all duration-200",
                                                        "hover:scale-110 hover:shadow-md",
                                                        "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                                                        currentColor.toLowerCase() ===
                                                            presetColor.toLowerCase()
                                                            ? "border-neutral-900 dark:border-white ring-2 ring-primary-500 dark:ring-primary-400"
                                                            : "border-neutral-300 dark:border-neutral-700"
                                                    )}
                                                    style={{
                                                        backgroundColor:
                                                            presetColor,
                                                    }}
                                                    aria-label={`Select color ${presetColor}`}
                                                >
                                                    {currentColor.toLowerCase() ===
                                                        presetColor.toLowerCase() && (
                                                            <Check
                                                                className="w-4 h-4 text-white drop-shadow-md mx-auto"
                                                                strokeWidth={3}
                                                            />
                                                        )}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Text */}
                {error && errorText && (
                    <p
                        id={errorId}
                        role="alert"
                        className="text-xs font-secondary text-error-500 dark:text-error-400 mt-1"
                    >
                        {errorText}
                    </p>
                )}
            </div>
        );
    }
);

ColorPickerRoot.displayName = "ColorPicker";

// ============================================================================
// ColorSwatches Component
// ============================================================================

const ColorSwatches = forwardRef<HTMLDivElement, ColorSwatchesProps>(
    (
        { colors, value, onChange, size = "md", label, className, ...props },
        ref
    ) => {
        const sizeClasses = {
            sm: "w-6 h-6",
            md: "w-8 h-8",
            lg: "w-10 h-10",
        };

        return (
            <div ref={ref} className={className} {...props}>
                {label && (
                    <label className="block font-primary text-neutral-700 dark:text-neutral-300 text-sm font-medium mb-2">
                        {label}
                    </label>
                )}
                <div
                    className="flex flex-wrap gap-2"
                    role="listbox"
                    aria-label={label || "Color swatches"}
                >
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            role="option"
                            aria-selected={
                                value?.toLowerCase() === color.toLowerCase()
                            }
                            onClick={() => onChange?.(color)}
                            className={clsx(
                                sizeClasses[size],
                                "rounded-md border-2 transition-all duration-200",
                                "hover:scale-110 hover:shadow-md",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
                                value?.toLowerCase() === color.toLowerCase()
                                    ? "border-neutral-900 dark:border-white ring-2 ring-primary-500 dark:ring-primary-400"
                                    : "border-neutral-300 dark:border-neutral-700"
                            )}
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                        >
                            {value?.toLowerCase() === color.toLowerCase() && (
                                <Check
                                    className="w-4 h-4 text-white drop-shadow-md mx-auto"
                                    strokeWidth={3}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
);

ColorSwatches.displayName = "ColorPicker.Swatches";

// ============================================================================
// Compound Export
// ============================================================================

export const ColorPicker = Object.assign(ColorPickerRoot, {
    Swatches: ColorSwatches,
});

export type {
    ColorFormat,
    ColorPickerProps,
    ColorSwatchesProps,
    HSL,
    RGB,
};
