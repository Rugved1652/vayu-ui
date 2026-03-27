"use client";

import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    HTMLAttributes,
    ReactNode,
} from "react";
import { Check, Copy, Pipette } from "lucide-react";
import { cn } from "./utils";

// ============================================================================
// Types & Interfaces
// ============================================================================

type ColorFormat = "hex" | "rgb" | "hsl";
type ValidationState = "default" | "error" | "warning" | "success";

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

interface ColorPickerContextValue {
    // State
    color: string;
    format: ColorFormat;
    open: boolean;
    disabled: boolean;
    validationState: ValidationState;
    presets: string[];

    // IDs for accessibility
    inputId: string;
    labelId: string;
    descriptionId: string;
    errorId: string;
    dropdownId: string;

    // Actions
    setColor: (color: string) => void;
    setOpen: (open: boolean) => void;
    setFormat: (format: ColorFormat) => void;

    // Refs
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
    undefined
);

const useColorPicker = () => {
    const context = useContext(ColorPickerContext);
    if (!context) {
        throw new Error(
            "ColorPicker compound components must be used within ColorPicker.Root"
        );
    }
    return context;
};

// ============================================================================
// Default Presets (Tailwind Colors)
// ============================================================================

const DEFAULT_PRESETS = [
    // Reds & Oranges
    "#ef4444",
    "#f97316",
    "#f59e0b",
    // Yellows & Greens
    "#84cc16",
    "#22c55e",
    "#10b981",
    // Teals & Cyans
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    // Blues & Indigos
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    // Violets & Pinks
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    // Neutrals
    "#171717",
    "#404040",
    "#737373",
    "#a3a3a3",
    "#d4d4d4",
    "#e5e5e5",
    "#f5f5f5",
    "#ffffff",
];

// ============================================================================
// Color Conversion Utilities
// ============================================================================

function hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r: number, g: number, b: number): HSL {
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
}

function hslToRgb(h: number, s: number, l: number): RGB {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
        g = 0,
        b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
}

function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}

/**
 * Parse various color formats to hex
 * Supports: #rgb, #rrggbb, rgb(r,g,b), rgba(r,g,b,a), hsl(h,s%,l%), hsla(h,s%,l%,a)
 */
function parseColor(input: string): string | null {
    const trimmed = input.trim().toLowerCase();

    // Hex formats
    if (/^#[a-f\d]{3}$/i.test(trimmed)) {
        // Convert #rgb to #rrggbb
        const r = trimmed[1];
        const g = trimmed[2];
        const b = trimmed[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }

    if (/^#[a-f\d]{6}$/i.test(trimmed)) {
        return trimmed;
    }

    // RGB format
    const rgbMatch = trimmed.match(
        /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+)?\s*\)$/
    );
    if (rgbMatch) {
        const r = Math.min(255, parseInt(rgbMatch[1]));
        const g = Math.min(255, parseInt(rgbMatch[2]));
        const b = Math.min(255, parseInt(rgbMatch[3]));
        return rgbToHex(r, g, b);
    }

    // HSL format
    const hslMatch = trimmed.match(
        /^hsla?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*[\d.]+)?\s*\)$/
    );
    if (hslMatch) {
        const h = parseInt(hslMatch[1]);
        const s = parseInt(hslMatch[2]);
        const l = parseInt(hslMatch[3]);
        const rgb = hslToRgb(h, s, l);
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    return null;
}

/**
 * Format hex color to specified format
 */
function formatColor(hex: string, format: ColorFormat): string {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    switch (format) {
        case "rgb":
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case "hsl":
            return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        default:
            return hex;
    }
}

/**
 * Check if a string is a valid color
 */
function isValidColor(input: string): boolean {
    return parseColor(input) !== null;
}

/**
 * Get contrast color (black or white) for text on background
 */
function getContrastColor(hex: string): string {
    const rgb = hexToRgb(hex);
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

// ============================================================================
// Root Component
// ============================================================================

interface ColorPickerRootProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    format?: ColorFormat;
    presets?: string[];
    disabled?: boolean;
    validationState?: ValidationState;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerRootProps>(
    (
        {
            children,
            value: controlledValue,
            defaultValue = "#3b82f6",
            onChange,
            format = "hex",
            presets = DEFAULT_PRESETS,
            disabled = false,
            validationState = "default",
            defaultOpen = false,
            open: controlledOpen,
            onOpenChange,
            className,
            ...props
        },
        ref
    ) => {
        const triggerRef = useRef<HTMLButtonElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const [internalColor, setInternalColor] = useState(defaultValue);
        const [internalOpen, setInternalOpen] = useState(defaultOpen);

        const baseId = useId();
        const inputId = `${baseId}-input`;
        const labelId = `${baseId}-label`;
        const descriptionId = `${baseId}-description`;
        const errorId = `${baseId}-error`;
        const dropdownId = `${baseId}-dropdown`;

        const isControlledColor = controlledValue !== undefined;
        const isControlledOpen = controlledOpen !== undefined;

        const color = isControlledColor ? controlledValue : internalColor;
        const open = isControlledOpen ? controlledOpen : internalOpen;

        const setColor = useCallback(
            (newColor: string) => {
                const parsed = parseColor(newColor);
                if (parsed) {
                    if (!isControlledColor) {
                        setInternalColor(parsed);
                    }
                    onChange?.(parsed);
                }
            },
            [isControlledColor, onChange]
        );

        const setOpen = useCallback(
            (newOpen: boolean) => {
                if (!isControlledOpen) {
                    setInternalOpen(newOpen);
                }
                onOpenChange?.(newOpen);
            },
            [isControlledOpen, onOpenChange]
        );

        const setFormat = useCallback(() => {
            // Format is controlled via props, this is for future extensibility
        }, []);

        // Close on click outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    contentRef.current &&
                    triggerRef.current &&
                    !contentRef.current.contains(event.target as Node) &&
                    !triggerRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };

            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setOpen(false);
                    triggerRef.current?.focus();
                }
            };

            if (open) {
                document.addEventListener("mousedown", handleClickOutside);
                document.addEventListener("keydown", handleEscape);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscape);
            };
        }, [open, setOpen]);

        const contextValue = useMemo<ColorPickerContextValue>(
            () => ({
                color,
                format,
                open,
                disabled,
                validationState,
                presets,
                inputId,
                labelId,
                descriptionId,
                errorId,
                dropdownId,
                setColor,
                setOpen,
                setFormat,
                triggerRef,
                contentRef,
                inputRef,
            }),
            [
                color,
                format,
                open,
                disabled,
                validationState,
                presets,
                inputId,
                labelId,
                descriptionId,
                errorId,
                dropdownId,
                setColor,
                setOpen,
                setFormat,
            ]
        );

        return (
            <ColorPickerContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn("w-full", className)}
                    {...props}
                >
                    {children}
                </div>
            </ColorPickerContext.Provider>
        );
    }
);

ColorPickerRoot.displayName = "ColorPicker.Root";

// ============================================================================
// Label Component
// ============================================================================

interface LabelProps {
    children: ReactNode;
    className?: string;
    optional?: boolean;
}

const Label: React.FC<LabelProps> = ({
    children,
    className = "",
    optional = false,
}) => {
    const { labelId, inputId } = useColorPicker();

    return (
        <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
                "block font-primary font-medium text-surface-content mb-1.5",
                className
            )}
        >
            {children}
            {optional && (
                <span className="text-muted-content text-sm font-secondary font-normal ml-2">
                    (optional)
                </span>
            )}
        </label>
    );
};

Label.displayName = "ColorPicker.Label";

// ============================================================================
// Description Component
// ============================================================================

interface DescriptionProps {
    children: ReactNode;
    className?: string;
}

const Description: React.FC<DescriptionProps> = ({
    children,
    className = "",
}) => {
    const { descriptionId } = useColorPicker();

    return (
        <p
            id={descriptionId}
            className={cn(
                "text-sm font-secondary text-muted-content mb-2",
                className
            )}
        >
            {children}
        </p>
    );
};

Description.displayName = "ColorPicker.Description";

// ============================================================================
// ErrorMessage Component
// ============================================================================

interface ErrorMessageProps {
    children: ReactNode;
    className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, className = "" }) => {
    const { errorId, validationState } = useColorPicker();

    if (validationState !== "error") return null;

    return (
        <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
                "mt-1.5 text-sm font-secondary text-destructive",
                className
            )}
        >
            {children}
        </p>
    );
};

ErrorMessage.displayName = "ColorPicker.Error";

// ============================================================================
// Trigger Component
// ============================================================================

interface TriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
    size?: "sm" | "md" | "lg";
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
    ({ size = "md", className, ...props }, ref) => {
        const {
            color,
            open,
            disabled,
            setOpen,
            triggerRef,
            dropdownId,
            labelId,
        } = useColorPicker();

        const sizeClasses = {
            sm: "w-8 h-8",
            md: "w-12 h-12",
            lg: "w-16 h-16",
        };

        const handleClick = () => {
            if (!disabled) {
                setOpen(!open);
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
            }
        };

        // Merge refs
        const mergedRef = (node: HTMLButtonElement | null) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (triggerRef as any).current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref as any).current = node;
            }
        };

        return (
            <button
                ref={mergedRef}
                type="button"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-expanded={open}
                aria-controls={dropdownId}
                aria-labelledby={labelId}
                aria-haspopup="dialog"
                className={cn(
                    sizeClasses[size],
                    "rounded-control border-2 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    "shadow-control hover:shadow-elevated",
                    disabled
                        ? "opacity-50 cursor-not-allowed border-border"
                        : "border-field hover:border-focus cursor-pointer",
                    className
                )}
                style={{ backgroundColor: color }}
                {...props}
            >
                <span className="sr-only">
                    Select color. Current color: {color}
                </span>
            </button>
        );
    }
);

Trigger.displayName = "ColorPicker.Trigger";

// ============================================================================
// Input Component
// ============================================================================

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder = "#000000", className, ...props }, ref) => {
        const {
            color,
            format,
            disabled,
            validationState,
            setColor,
            inputId,
            labelId,
            descriptionId,
            errorId,
            inputRef,
        } = useColorPicker();

        const [inputValue, setInputValue] = useState("");
        const [isFocused, setIsFocused] = useState(false);

        // Sync input with color when not focused
        useEffect(() => {
            if (!isFocused) {
                setInputValue(formatColor(color, format));
            }
        }, [color, format, isFocused]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setInputValue(value);

            const parsed = parseColor(value);
            if (parsed) {
                setColor(parsed);
            }
        };

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
            // Reset to formatted value if invalid
            if (!isValidColor(inputValue)) {
                setInputValue(formatColor(color, format));
            }
        };

        // Merge refs
        const mergedRef = (node: HTMLInputElement | null) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (inputRef as any).current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref as any).current = node;
            }
        };

        const stateClasses = {
            default: "border-field focus:border-focus focus:ring-2 focus:ring-focus/20",
            error: "border-destructive ring-2 ring-destructive/20",
            warning: "border-warning ring-2 ring-warning/20",
            success: "border-success ring-2 ring-success/20",
        };

        return (
            <input
                ref={mergedRef}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={placeholder}
                aria-labelledby={labelId}
                aria-describedby={
                    validationState === "error"
                        ? `${descriptionId} ${errorId}`
                        : descriptionId
                }
                aria-invalid={validationState === "error"}
                className={cn(
                    "flex-1 px-3 py-2 rounded-control border-2",
                    "bg-surface text-surface-content font-mono text-sm",
                    "placeholder:text-muted-content",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none",
                    "transition-all duration-200",
                    "font-secondary",
                    stateClasses[validationState],
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "ColorPicker.Input";

// ============================================================================
// CopyButton Component
// ============================================================================

interface CopyButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
    copiedText?: string;
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
    ({ copiedText = "Copied!", className, ...props }, ref) => {
        const { color, format, disabled } = useColorPicker();
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(formatColor(color, format));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy color:", err);
            }
        };

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleCopy}
                disabled={disabled}
                aria-label={copied ? copiedText : "Copy color to clipboard"}
                className={cn(
                    "px-3 py-2 rounded-control border-2 border-field",
                    "bg-surface text-surface-content",
                    "hover:bg-muted transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "font-secondary",
                    className
                )}
                {...props}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-success" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
        );
    }
);

CopyButton.displayName = "ColorPicker.CopyButton";

// ============================================================================
// Content Component (Dropdown)
// ============================================================================

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end";
    side?: "top" | "bottom";
    sideOffset?: number;
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
    (
        {
            children,
            align = "start",
            side = "bottom",
            sideOffset = 8,
            className,
            ...props
        },
        ref
    ) => {
        const {
            open,
            contentRef,
            triggerRef,
            dropdownId,
        } = useColorPicker();
        const [position, setPosition] = useState({ top: 0, left: 0 });

        // Positioning logic
        const updatePosition = useCallback(() => {
            if (!triggerRef.current || !contentRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let top = 0;
            let left = 0;

            // Vertical position
            if (side === "bottom") {
                top = triggerRect.bottom + sideOffset;
                // Flip to top if not enough space below
                if (top + contentRect.height > viewportHeight) {
                    top = triggerRect.top - contentRect.height - sideOffset;
                }
            } else {
                top = triggerRect.top - contentRect.height - sideOffset;
                // Flip to bottom if not enough space above
                if (top < 0) {
                    top = triggerRect.bottom + sideOffset;
                }
            }

            // Horizontal position
            switch (align) {
                case "start":
                    left = triggerRect.left;
                    break;
                case "center":
                    left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
                    break;
                case "end":
                    left = triggerRect.right - contentRect.width;
                    break;
            }

            // Keep within viewport
            if (left < 0) left = 8;
            if (left + contentRect.width > viewportWidth) {
                left = viewportWidth - contentRect.width - 8;
            }

            setPosition({ top, left });
        }, [align, side, sideOffset, triggerRef, contentRef]);

        // Update position on open and scroll/resize
        useLayoutEffect(() => {
            if (!open) return;

            const rafId = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    updatePosition();
                    contentRef.current?.focus();
                });
            });

            window.addEventListener("scroll", updatePosition, { passive: true, capture: true });
            window.addEventListener("resize", updatePosition, { passive: true });

            return () => {
                cancelAnimationFrame(rafId);
                window.removeEventListener("scroll", updatePosition, true);
                window.removeEventListener("resize", updatePosition);
            };
        }, [open, updatePosition, contentRef]);

        // Merge refs
        const mergedRef = (node: HTMLDivElement | null) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (contentRef as any).current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref as any).current = node;
            }
        };

        if (!open) return null;

        return (
            <div
                ref={mergedRef}
                id={dropdownId}
                role="dialog"
                aria-modal="false"
                aria-label="Color picker"
                tabIndex={-1}
                style={{
                    position: "fixed",
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    zIndex: 50,
                }}
                className={cn(
                    "bg-elevated text-elevated-content border border-border",
                    "rounded-overlay p-4 shadow-elevated",
                    "animate-fade-in",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                    "min-w-70",
                    className
                )}
                {...props}
            >
                <div className="font-secondary">{children}</div>
            </div>
        );
    }
);

Content.displayName = "ColorPicker.Content";

// ============================================================================
// Palette Component (Native Color Input)
// ============================================================================

interface PaletteProps extends Omit<HTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    label?: string;
}

const Palette = forwardRef<HTMLInputElement, PaletteProps>(
    ({ label = "Pick a color", className, ...props }, ref) => {
        const { color, setColor } = useColorPicker();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setColor(e.target.value);
        };

        return (
            <div className={className}>
                <label className="flex items-center gap-2 text-sm font-medium text-elevated-content mb-2">
                    <Pipette className="w-4 h-4" aria-hidden="true" />
                    {label}
                </label>
                <input
                    ref={ref}
                    type="color"
                    value={color}
                    onChange={handleChange}
                    className={cn(
                        "w-full h-12 rounded-control cursor-pointer",
                        "border-2 border-border",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    )}
                    {...props}
                />
            </div>
        );
    }
);

Palette.displayName = "ColorPicker.Palette";

// ============================================================================
// Eyedropper Component
// ============================================================================

interface EyedropperProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
    label?: string;
    unsupportedText?: string;
}

const Eyedropper = forwardRef<HTMLButtonElement, EyedropperProps>(
    (
        {
            label = "Pick from screen",
            unsupportedText = "Eyedropper not supported in this browser",
            className,
            ...props
        },
        ref
    ) => {
        const { setColor, disabled } = useColorPicker();
        const [isSupported, setIsSupported] = useState(true);
        const [isPicking, setIsPicking] = useState(false);

        const handlePick = async () => {
            // Check if EyeDropper API is available
            if (!("EyeDropper" in window)) {
                setIsSupported(false);
                return;
            }

            try {
                setIsPicking(true);
                // @ts-ignore - EyeDropper is not in TypeScript lib
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                setColor(result.sRGBHex);
            } catch (err) {
                // User cancelled or error occurred
                console.log("Eyedropper cancelled or error:", err);
            } finally {
                setIsPicking(false);
            }
        };

        if (!isSupported) {
            return (
                <p className="text-sm text-muted-content italic">
                    {unsupportedText}
                </p>
            );
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handlePick}
                disabled={disabled || isPicking}
                aria-label={label}
                aria-busy={isPicking}
                className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-control",
                    "border-2 border-border bg-surface",
                    "text-surface-content hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors",
                    "font-secondary text-sm",
                    className
                )}
                {...props}
            >
                <Pipette
                    className={cn("w-4 h-4", isPicking && "animate-pulse")}
                    aria-hidden="true"
                />
                {isPicking ? "Picking..." : label}
            </button>
        );
    }
);

Eyedropper.displayName = "ColorPicker.Eyedropper";

// ============================================================================
// Presets Component
// ============================================================================

interface PresetsProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    colors?: string[];
    columns?: number;
}

const Presets = forwardRef<HTMLDivElement, PresetsProps>(
    (
        {
            label = "Preset Colors",
            colors: customColors,
            columns = 8,
            className,
            ...props
        },
        ref
    ) => {
        const { color, setColor, presets: contextPresets, disabled } = useColorPicker();
        const colors = customColors || contextPresets;

        return (
            <div ref={ref} className={className} {...props}>
                {label && (
                    <label className="block text-sm font-medium text-elevated-content mb-2">
                        {label}
                    </label>
                )}
                <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                    role="listbox"
                    aria-label={label}
                >
                    {colors.map((presetColor, index) => {
                        const isSelected =
                            color.toLowerCase() === presetColor.toLowerCase();
                        const contrastColor = getContrastColor(presetColor);

                        return (
                            <button
                                key={index}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                aria-label={`Select color ${presetColor}`}
                                onClick={() => setColor(presetColor)}
                                disabled={disabled}
                                className={cn(
                                    "aspect-square rounded-control border-2 transition-all duration-200",
                                    "hover:scale-110 hover:shadow-elevated",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    isSelected
                                        ? "border-elevated-content ring-2 ring-focus"
                                        : "border-border"
                                )}
                                style={{ backgroundColor: presetColor }}
                            >
                                {isSelected && (
                                    <Check
                                        className="w-4 h-4 mx-auto"
                                        style={{ color: contrastColor }}
                                        strokeWidth={3}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
);

Presets.displayName = "ColorPicker.Presets";

// ============================================================================
// Swatches Component (Standalone)
// ============================================================================

interface SwatchesProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    colors: string[];
    value?: string;
    onChange?: (color: string) => void;
    size?: "sm" | "md" | "lg";
    columns?: number;
    label?: string;
    disabled?: boolean;
}

const Swatches = forwardRef<HTMLDivElement, SwatchesProps>(
    (
        {
            colors,
            value,
            onChange,
            size = "md",
            columns = 8,
            label,
            disabled = false,
            className,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = useState(value || colors[0]);
        const isControlled = value !== undefined;
        const selectedColor = isControlled ? value : internalValue;

        const handleSelect = (color: string) => {
            if (!isControlled) {
                setInternalValue(color);
            }
            onChange?.(color);
        };

        const sizeClasses = {
            sm: "w-6 h-6",
            md: "w-8 h-8",
            lg: "w-10 h-10",
        };

        return (
            <div ref={ref} className={className} {...props}>
                {label && (
                    <label className="block font-primary text-surface-content text-sm font-medium mb-2">
                        {label}
                    </label>
                )}
                <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                    role="listbox"
                    aria-label={label || "Color swatches"}
                >
                    {colors.map((color, index) => {
                        const isSelected =
                            selectedColor?.toLowerCase() === color.toLowerCase();
                        const contrastColor = getContrastColor(color);

                        return (
                            <button
                                key={index}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                aria-label={`Select color ${color}`}
                                onClick={() => handleSelect(color)}
                                disabled={disabled}
                                className={cn(
                                    sizeClasses[size],
                                    "rounded-control border-2 transition-all duration-200",
                                    "hover:scale-110 hover:shadow-elevated",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    isSelected
                                        ? "border-surface-content ring-2 ring-focus"
                                        : "border-border"
                                )}
                                style={{ backgroundColor: color }}
                            >
                                {isSelected && (
                                    <Check
                                        className="w-4 h-4 mx-auto"
                                        style={{ color: contrastColor }}
                                        strokeWidth={3}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
);

Swatches.displayName = "ColorPicker.Swatches";

// ============================================================================
// Exports
// ============================================================================

export const ColorPicker = {
    Root: ColorPickerRoot,
    Label,
    Description,
    Error: ErrorMessage,
    Trigger,
    Input,
    CopyButton,
    Content,
    Palette,
    Eyedropper,
    Presets,
    Swatches,
};

export { useColorPicker, parseColor, formatColor, isValidColor };
export type {
    ColorFormat,
    ColorPickerContextValue,
    RGB,
    HSL,
};
