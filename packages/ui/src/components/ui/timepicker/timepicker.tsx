// timepicker.tsx
// Composition: context + root

"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useRef,
    useEffect,
    useId,
} from "react";
import { clsx } from "clsx";
import { AlertCircle } from "lucide-react";
import type {
    TimeValue,
    TimeRange,
    TimepickerRootProps,
    TimepickerContextValue,
    TimepickerTriggerProps,
    TimepickerContentProps,
    HourColumnProps,
    MinuteColumnProps,
    PeriodColumnProps,
    TimeGridProps,
    TimepickerFooterProps,
    TimepickerErrorProps,
} from "./types";

// Context

const TimepickerContext = createContext<TimepickerContextValue | undefined>(undefined);

export const useTimepicker = () => {
    const context = useContext(TimepickerContext);
    if (!context) {
        throw new Error("Timepicker compound components must be used within Timepicker.Root");
    }
    return context;
};

// Root

const TimepickerRoot: React.FC<TimepickerRootProps> = ({
    children,
    value: controlledValue,
    defaultValue,
    onValueChange,
    format = "12h",
    mode = "single",
    label,
    error,
    disabled = false,
    className,
    minuteStep = 5,
    placeholder,
    clearable = true,
    showApplyButton = false,
    disabledTimes,
    disabledHours,
    minTime,
    maxTime,
}) => {
    const [internalValue, setInternalValue] = useState<TimeValue | TimeRange | null>(
        defaultValue ?? null
    );
    const [open, setOpen] = useState(false);
    const [rangePhase, setRangePhase] = useState<"start" | "end">("start");
    const [tempValue, setTempValue] = useState<TimeValue | TimeRange | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const id = useId();
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Sync temp value when opening
    useEffect(() => {
        if (open) {
            setTempValue(value);
        }
    }, [open, value]);

    const handleValueChange = useCallback(
        (newValue: TimeValue | TimeRange | null) => {
            if (!isControlled) setInternalValue(newValue);
            onValueChange?.(newValue);
        },
        [isControlled, onValueChange]
    );

    const applySelection = useCallback(() => {
        handleValueChange(tempValue);
        setOpen(false);
    }, [tempValue, handleValueChange]);

    const clearSelection = useCallback(() => {
        setTempValue(null);
        handleValueChange(null);
        setOpen(false);
    }, [handleValueChange]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!containerRef.current) return;
            const isInsideTrigger = triggerRef.current?.contains(target);
            const isInsideContent = contentRef.current?.contains(target);
            if (!isInsideTrigger && !isInsideContent) {
                if (open) {
                    setOpen(false);
                    setTempValue(value);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, value]);

    // Escape key handler
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && open) {
                setOpen(false);
                setTempValue(value);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, value]);

    return (
        <TimepickerContext.Provider
            value={{
                value,
                onValueChange: handleValueChange,
                open,
                setOpen,
                format,
                mode,
                rangePhase,
                setRangePhase,
                label,
                error,
                disabled,
                triggerRef,
                contentRef,
                id,
                minuteStep,
                placeholder,
                clearable,
                showApplyButton,
                disabledTimes,
                disabledHours,
                minTime,
                maxTime,
                tempValue,
                setTempValue,
                applySelection,
                clearSelection,
            }}
        >
            <div ref={containerRef} className={clsx("relative space-y-1.5", className)}>
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-xs font-medium text-muted-content"
                    >
                        {label}
                    </label>
                )}
                {children}
                {error && (
                    <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </p>
                )}
            </div>
        </TimepickerContext.Provider>
    );
};

TimepickerRoot.displayName = "Timepicker.Root";

// Compound component with placeholder subcomponents (real ones assigned in index.ts)
const Timepicker = Object.assign(TimepickerRoot, {
    Trigger: {} as React.ForwardRefExoticComponent<
        TimepickerTriggerProps & React.RefAttributes<HTMLDivElement>
    >,
    Content: {} as React.FC<TimepickerContentProps>,
    HourColumn: {} as React.FC<HourColumnProps>,
    MinuteColumn: {} as React.FC<MinuteColumnProps>,
    PeriodColumn: {} as React.FC<PeriodColumnProps>,
    TimeGrid: {} as React.FC<TimeGridProps>,
    Footer: {} as React.FC<TimepickerFooterProps>,
    Error: {} as React.FC<TimepickerErrorProps>,
});

export default Timepicker;
