"use client";

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    forwardRef,
    ReactNode,
    useId,
    useCallback,
    useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Clock, X, AlertCircle, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

export interface TimeValue {
    hour: number;
    minute: number;
}

export interface TimeRange {
    start: TimeValue | null;
    end: TimeValue | null;
}

type TimeFormat = "12h" | "24h";
type TimepickerMode = "single" | "range";

interface DisabledTimeConfig {
    disabledTimes?: string[]; // ["09:00", "14:30"]
    disabledHours?: number[]; // [0, 1, 2, 3, 4, 5]
    minTime?: string; // "08:00"
    maxTime?: string; // "18:00"
}

// ============================================================================
// Utility Functions
// ============================================================================

function parseTimeString(timeStr: string): TimeValue | null {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return { hour, minute };
}

function formatTimeValue(time: TimeValue | null, format: TimeFormat): string {
    if (!time) return "";
    const hour = format === "12h" ? convertTo12Hour(time.hour) : time.hour;
    const displayHour = format === "12h" && hour === 0 ? 12 : hour;
    const minute = time.minute.toString().padStart(2, "0");
    const period = format === "12h" ? (time.hour >= 12 ? " PM" : " AM") : "";
    return `${displayHour.toString().padStart(2, "0")}:${minute}${period}`;
}

function convertTo12Hour(hour24: number): number {
    if (hour24 === 0 || hour24 === 12) return 12;
    return hour24 > 12 ? hour24 - 12 : hour24;
}

function convertTo24Hour(hour12: number, period: "AM" | "PM"): number {
    if (period === "AM") return hour12 === 12 ? 0 : hour12;
    return hour12 === 12 ? 12 : hour12 + 12;
}

function isTimeDisabled(
    time: TimeValue,
    config: DisabledTimeConfig
): boolean {
    const { disabledTimes = [], disabledHours = [], minTime, maxTime } = config;

    // Check disabled hours
    if (disabledHours.includes(time.hour)) return true;

    // Check exact disabled times
    const timeStr = `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
    if (disabledTimes.includes(timeStr)) return true;

    // Check min time
    if (minTime) {
        const min = parseTimeString(minTime);
        if (min && (time.hour < min.hour || (time.hour === min.hour && time.minute < min.minute))) {
            return true;
        }
    }

    // Check max time
    if (maxTime) {
        const max = parseTimeString(maxTime);
        if (max && (time.hour > max.hour || (time.hour === max.hour && time.minute > max.minute))) {
            return true;
        }
    }

    return false;
}

function timeToMinutes(time: TimeValue): number {
    return time.hour * 60 + time.minute;
}

function isValidTimeRange(range: TimeRange): boolean {
    if (!range.start || !range.end) return false;
    return timeToMinutes(range.start) <= timeToMinutes(range.end);
}

// ============================================================================
// Context
// ============================================================================

interface TimepickerContextValue extends DisabledTimeConfig {
    value: TimeValue | TimeRange | null;
    onValueChange: (value: TimeValue | TimeRange | null) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    format: TimeFormat;
    mode: TimepickerMode;
    rangePhase: "start" | "end";
    setRangePhase: (phase: "start" | "end") => void;
    label?: string;
    error?: string;
    disabled: boolean;
    triggerRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    id: string;
    minuteStep: number;
    placeholder?: string;
    clearable: boolean;
    showApplyButton: boolean;
    tempValue: TimeValue | TimeRange | null;
    setTempValue: (value: TimeValue | TimeRange | null) => void;
    applySelection: () => void;
    clearSelection: () => void;
}

const TimepickerContext = createContext<TimepickerContextValue | undefined>(undefined);

const useTimepicker = () => {
    const context = useContext(TimepickerContext);
    if (!context) {
        throw new Error("Timepicker compound components must be used within Timepicker.Root");
    }
    return context;
};

// ============================================================================
// Root
// ============================================================================

interface TimepickerRootProps extends DisabledTimeConfig {
    children: ReactNode;
    value?: TimeValue | TimeRange | null;
    defaultValue?: TimeValue | TimeRange | null;
    onValueChange?: (value: TimeValue | TimeRange | null) => void;
    format?: TimeFormat;
    mode?: TimepickerMode;
    label?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    minuteStep?: number;
    placeholder?: string;
    clearable?: boolean;
    showApplyButton?: boolean;
}

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

// ============================================================================
// Trigger
// ============================================================================

interface TimepickerTriggerProps {
    className?: string;
}

// Helper: clamp and pad a numeric input for time segments
function clampTimeSegment(
    raw: string,
    min: number,
    max: number,
): number {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return min;
    return Math.max(min, Math.min(max, n));
}

const TimepickerTrigger = forwardRef<HTMLDivElement, TimepickerTriggerProps>(
    ({ className }, ref) => {
        const {
            open,
            setOpen,
            value,
            onValueChange,
            error,
            disabled,
            triggerRef,
            id,
            format,
            mode,
            rangePhase,
            setRangePhase,
            placeholder,
            clearable,
            tempValue,
            setTempValue,
            clearSelection,
            showApplyButton,
            disabledTimes,
            disabledHours,
            minTime,
            maxTime,
        } = useTimepicker();

        const localTriggerRef = useRef<HTMLDivElement | null>(null);
        const hourInputRef = useRef<HTMLInputElement | null>(null);
        const minuteInputRef = useRef<HTMLInputElement | null>(null);
        const periodInputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (localTriggerRef.current && triggerRef) {
                (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
                    localTriggerRef.current;
            }
        }, [triggerRef]);

        useEffect(() => {
            if (localTriggerRef.current && ref) {
                if (typeof ref === "function") ref(localTriggerRef.current);
                else (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                    localTriggerRef.current;
            }
        }, [ref]);

        // --- Helpers to extract current hour/minute from the active time value ---

        const getActiveTime = useCallback((): TimeValue | null => {
            const v = value; // committed value shown in trigger
            if (!v) return null;
            if (mode === "range") {
                const range = v as TimeRange;
                return rangePhase === "start" ? range.start : range.end;
            }
            return v as TimeValue;
        }, [value, mode, rangePhase]);

        const getDisplayHour = useCallback((): string => {
            const time = getActiveTime();
            if (!time) return "";
            const h = format === "12h" ? convertTo12Hour(time.hour) : time.hour;
            return h.toString().padStart(2, "0");
        }, [getActiveTime, format]);

        const getDisplayMinute = useCallback((): string => {
            const time = getActiveTime();
            if (!time) return "";
            return time.minute.toString().padStart(2, "0");
        }, [getActiveTime]);

        const getDisplayPeriod = useCallback((): string => {
            const time = getActiveTime();
            if (!time) return "";
            return time.hour >= 12 ? "PM" : "AM";
        }, [getActiveTime]);

        // --- Local editing state for hour and minute inputs ---
        const [hourText, setHourText] = useState(getDisplayHour());
        const [minuteText, setMinuteText] = useState(getDisplayMinute());
        const [periodText, setPeriodText] = useState(getDisplayPeriod() || "AM");

        // Keep local text in sync with committed value
        useEffect(() => {
            // Only sync when the input is NOT focused (avoid overwriting mid-edit)
            if (document.activeElement !== hourInputRef.current) {
                setHourText(getDisplayHour());
            }
        }, [getDisplayHour]);

        useEffect(() => {
            if (document.activeElement !== minuteInputRef.current) {
                setMinuteText(getDisplayMinute());
            }
        }, [getDisplayMinute]);

        useEffect(() => {
            if (document.activeElement !== periodInputRef.current) {
                setPeriodText(getDisplayPeriod() || "AM");
            }
        }, [getDisplayPeriod]);

        // --- Commit helpers ---

        const commitTime = useCallback(
            (newHour24: number, newMinute: number) => {
                const newTime: TimeValue = { hour: newHour24, minute: newMinute };

                // Validate against constraints
                if (isTimeDisabled(newTime, { disabledTimes, disabledHours, minTime, maxTime })) {
                    // Revert the local text immediately to previous valid state
                    setHourText(getDisplayHour());
                    setMinuteText(getDisplayMinute());
                    setPeriodText(getDisplayPeriod() || "AM");
                    return;
                }

                if (mode === "range") {
                    const range = (value as TimeRange) ?? { start: null, end: null };
                    const newRange: TimeRange = { ...range };
                    if (rangePhase === "start") {
                        newRange.start = newTime;
                    } else {
                        newRange.end = newTime;
                    }
                    if (showApplyButton) {
                        setTempValue(newRange);
                    } else {
                        onValueChange(newRange);
                    }
                } else {
                    if (showApplyButton) {
                        setTempValue(newTime);
                    } else {
                        onValueChange(newTime);
                    }
                }
            },
            [mode, rangePhase, value, onValueChange, setTempValue, showApplyButton, disabledTimes, disabledHours, minTime, maxTime, getDisplayHour, getDisplayMinute, getDisplayPeriod]
        );

        const commitHour = useCallback(
            (raw: string) => {
                const time = getActiveTime();
                const currentMinute = time?.minute ?? 0;
                const currentPeriod: "AM" | "PM" = time ? (time.hour >= 12 ? "PM" : "AM") : "AM";

                if (raw === "") {
                    setHourText(getDisplayHour());
                    return;
                }

                if (format === "12h") {
                    const clamped = clampTimeSegment(raw, 1, 12);
                    const hour24 = convertTo24Hour(clamped, currentPeriod);
                    commitTime(hour24, currentMinute);
                    setHourText(clamped.toString().padStart(2, "0"));
                } else {
                    const clamped = clampTimeSegment(raw, 0, 23);
                    commitTime(clamped, currentMinute);
                    setHourText(clamped.toString().padStart(2, "0"));
                }
            },
            [format, getActiveTime, getDisplayHour, commitTime]
        );

        const commitMinute = useCallback(
            (raw: string) => {
                const time = getActiveTime();
                const currentHour = time?.hour ?? 0;

                if (raw === "") {
                    setMinuteText(getDisplayMinute());
                    return;
                }

                const clamped = clampTimeSegment(raw, 0, 59);
                commitTime(currentHour, clamped);
                setMinuteText(clamped.toString().padStart(2, "0"));
            },
            [getActiveTime, getDisplayMinute, commitTime]
        );

        const commitPeriod = useCallback(
            (newPeriod: "AM" | "PM") => {
                const time = getActiveTime();
                const currentHour = time?.hour ?? 0;
                const currentMinute = time?.minute ?? 0;

                const displayHour12 = currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour;
                const newHour24 = convertTo24Hour(displayHour12, newPeriod);

                commitTime(newHour24, currentMinute);
                setPeriodText(newPeriod);
            },
            [getActiveTime, commitTime]
        );

        // --- Event handlers ---

        const handleClick = (e: React.MouseEvent) => {
            if (disabled) return;
            // Don't toggle dropdown if clicking on an input
            if (
                e.target === hourInputRef.current ||
                e.target === minuteInputRef.current
            ) {
                return;
            }
            setOpen(!open);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (disabled) return;
            // Don't intercept when an input is focused
            if (
                e.target === hourInputRef.current ||
                e.target === minuteInputRef.current ||
                e.target === periodInputRef.current
            ) {
                return;
            }
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(!open);
            }
        };

        const handleClear = (e: React.MouseEvent) => {
            e.stopPropagation();
            clearSelection();
        };

        const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                commitHour(hourText);
                minuteInputRef.current?.focus();
                minuteInputRef.current?.select();
            }
            if (e.key === "ArrowRight") {
                const target = e.target as HTMLInputElement;
                const isAtRightEdge = target.selectionStart === target.value.length;
                const isFullySelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
                if (isAtRightEdge || isFullySelected) {
                    e.preventDefault();
                    commitHour(hourText);
                    minuteInputRef.current?.focus();
                    minuteInputRef.current?.select();
                }
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const time = getActiveTime();
                const currentPeriod: "AM" | "PM" = time ? (time.hour >= 12 ? "PM" : "AM") : "AM";
                const currentMinute = time?.minute ?? 0;
                let currentDisplay = parseInt(hourText, 10);
                if (isNaN(currentDisplay)) currentDisplay = format === "12h" ? 12 : 0;

                if (e.key === "ArrowUp") {
                    currentDisplay = format === "12h"
                        ? (currentDisplay % 12) + 1
                        : (currentDisplay + 1) % 24;
                } else {
                    currentDisplay = format === "12h"
                        ? ((currentDisplay - 2 + 12) % 12) + 1
                        : (currentDisplay - 1 + 24) % 24;
                }
                const newText = currentDisplay.toString().padStart(2, "0");
                setHourText(newText);
                const hour24 = format === "12h" ? convertTo24Hour(currentDisplay, currentPeriod) : currentDisplay;
                commitTime(hour24, currentMinute);
            }
        };

        const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                commitMinute(minuteText);
                // Blur after confirming minute
                minuteInputRef.current?.blur();
            }
            if (e.key === "ArrowLeft") {
                const target = e.target as HTMLInputElement;
                const isAtLeftEdge = target.selectionStart === 0 && target.selectionEnd === 0;
                const isFullySelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
                if (isAtLeftEdge || isFullySelected) {
                    e.preventDefault();
                    commitMinute(minuteText);
                    hourInputRef.current?.focus();
                    hourInputRef.current?.select();
                }
            }
            if (e.key === "ArrowRight") {
                const target = e.target as HTMLInputElement;
                const isAtRightEdge = target.selectionStart === target.value.length;
                const isFullySelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
                if (isAtRightEdge || isFullySelected) {
                    if (format === "12h" && periodInputRef.current) {
                        e.preventDefault();
                        commitMinute(minuteText);
                        periodInputRef.current.focus();
                        periodInputRef.current.select();
                    }
                }
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const time = getActiveTime();
                const currentHour = time?.hour ?? 0;
                let currentMin = parseInt(minuteText, 10);
                if (isNaN(currentMin)) currentMin = 0;

                if (e.key === "ArrowUp") {
                    currentMin = (currentMin + 1) % 60;
                } else {
                    currentMin = (currentMin - 1 + 60) % 60;
                }
                const newText = currentMin.toString().padStart(2, "0");
                setMinuteText(newText);
                commitTime(currentHour, currentMin);
            }
        };

        const handlePeriodKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                periodInputRef.current?.blur();
            }
            if (e.key === "ArrowLeft") {
                const target = e.target as HTMLInputElement;
                const isAtLeftEdge = target.selectionStart === 0 && target.selectionEnd === 0;
                const isFullySelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
                if (isAtLeftEdge || isFullySelected) {
                    e.preventDefault();
                    minuteInputRef.current?.focus();
                    minuteInputRef.current?.select();
                }
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const newPeriod = periodText === "AM" ? "PM" : "AM";
                setPeriodText(newPeriod);
                commitPeriod(newPeriod);
            }
        };

        // For range mode, show the non-editable display
        const getRangeDisplayValue = (): string => {
            if (!value) return placeholder || "Select time range";
            const range = value as TimeRange;
            if (!range.start && !range.end) return placeholder || "Select time range";
            const startStr = range.start ? formatTimeValue(range.start, format) : "--:--";
            const endStr = range.end ? formatTimeValue(range.end, format) : "--:--";
            return `${startStr} - ${endStr}`;
        };

        const hasValue = mode === "range"
            ? !!(value && ((value as TimeRange).start || (value as TimeRange).end))
            : !!value;

        return (
            <div
                ref={localTriggerRef}
                id={id}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-disabled={disabled}
                aria-labelledby={id}
                tabIndex={disabled ? -1 : 0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-control bg-surface border transition-all outline-none cursor-pointer",
                    error
                        ? "border-destructive focus-within:ring-2 focus-within:ring-destructive"
                        : "border-field focus-within:border-focus focus-within:ring-2 focus-within:ring-focus",
                    open && !error && "border-focus ring-2 ring-focus",
                    "text-surface-content placeholder:text-muted-content",
                    "focus-within:ring-offset-2 focus-within:ring-offset-canvas",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
            >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Clock className="w-4 h-4 text-muted-content shrink-0" />
                    {mode === "range" ? (
                        // Range mode: use non-editable display (edits happen inside dropdown)
                        <span
                            className={clsx(
                                "truncate",
                                !hasValue && "text-muted-content"
                            )}
                        >
                            {getRangeDisplayValue()}
                        </span>
                    ) : (
                        // Single mode: always show inline editable inputs
                        <div
                            className="flex items-center gap-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                ref={hourInputRef}
                                type="text"
                                inputMode="numeric"
                                aria-label="Hour"
                                disabled={disabled}
                                value={hourText}
                                placeholder={format === "12h" ? "HH" : "HH"}
                                onChange={(e) => {
                                    // Allow only digits, max 2 chars
                                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                                    setHourText(v);
                                    // Auto-advance to minute after 2 digits
                                    if (v.length === 2) {
                                        commitHour(v);
                                        // Use setTimeout to let state settle before focusing
                                        setTimeout(() => {
                                            minuteInputRef.current?.focus();
                                            minuteInputRef.current?.select();
                                        }, 0);
                                    }
                                }}
                                onBlur={() => commitHour(hourText)}
                                onFocus={(e) => e.target.select()}
                                onKeyDown={handleHourKeyDown}
                                className="w-6 bg-transparent text-center outline-none text-sm tabular-nums selection:bg-brand/20 placeholder:text-muted-content"
                                maxLength={2}
                            />
                            <span className={clsx("text-surface-content", !hasValue && "text-muted-content")}>:</span>
                            <input
                                ref={minuteInputRef}
                                type="text"
                                inputMode="numeric"
                                aria-label="Minute"
                                disabled={disabled}
                                value={minuteText}
                                placeholder="MM"
                                onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                                    setMinuteText(v);
                                    // Auto-commit after 2 digits
                                    if (v.length === 2) {
                                        commitMinute(v);
                                        setTimeout(() => {
                                            if (format === "12h" && periodInputRef.current) {
                                                periodInputRef.current.focus();
                                                periodInputRef.current.select();
                                            } else {
                                                minuteInputRef.current?.blur();
                                            }
                                        }, 0);
                                    }
                                }}
                                onBlur={() => commitMinute(minuteText)}
                                onFocus={(e) => e.target.select()}
                                onKeyDown={handleMinuteKeyDown}
                                className="w-6 bg-transparent text-center outline-none text-sm tabular-nums selection:bg-brand/20 placeholder:text-muted-content"
                                maxLength={2}
                            />
                            {format === "12h" && (
                                <input
                                    ref={periodInputRef}
                                    type="text"
                                    aria-label="AM/PM"
                                    disabled={disabled}
                                    value={periodText}
                                    placeholder="AM"
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/[^APM]/gi, "").slice(0, 2).toUpperCase();
                                        setPeriodText(v);
                                        if (v === "AM" || v === "PM") {
                                            commitPeriod(v);
                                            setTimeout(() => periodInputRef.current?.blur(), 0);
                                        } else if (v === "A") {
                                            setPeriodText("AM");
                                            commitPeriod("AM");
                                            setTimeout(() => periodInputRef.current?.blur(), 0);
                                        } else if (v === "P") {
                                            setPeriodText("PM");
                                            commitPeriod("PM");
                                            setTimeout(() => periodInputRef.current?.blur(), 0);
                                        }
                                    }}
                                    onBlur={() => {
                                        setPeriodText(getDisplayPeriod() || "AM");
                                    }}
                                    onFocus={(e) => e.target.select()}
                                    onKeyDown={handlePeriodKeyDown}
                                    className={clsx(
                                        "w-7 bg-transparent text-center outline-none text-sm font-medium tabular-nums uppercase selection:bg-brand/20 ml-1 placeholder:text-muted-content placeholder:font-normal",
                                        !hasValue && "text-muted-content font-normal"
                                    )}
                                    maxLength={2}
                                />
                            )}
                        </div>
                    )}
                </div>
                {clearable && hasValue && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-0.5 rounded-sm hover:bg-muted/50 transition-colors"
                        aria-label="Clear selection"
                    >
                        <X className="w-4 h-4 text-muted-content" />
                    </button>
                )}
                <ChevronDown
                    className={clsx(
                        "w-4 h-4 text-muted-content transition-transform shrink-0",
                        open && "rotate-180"
                    )}
                />
            </div>
        );
    }
);

TimepickerTrigger.displayName = "Timepicker.Trigger";

// ============================================================================
// Content
// ============================================================================

interface TimepickerContentProps {
    children?: ReactNode;
    className?: string;
}

const TimepickerContent: React.FC<TimepickerContentProps> = ({
    children,
    className,
}) => {
    const { open, triggerRef, contentRef, id, mode, rangePhase, setRangePhase, setOpen } =
        useTimepicker();

    // Position the dropdown
    useLayoutEffect(() => {
        if (!open || !triggerRef.current || !contentRef.current) return;

        const trigger = triggerRef.current;
        const content = contentRef.current;

        const updatePosition = () => {
            if (!trigger || !content) return;
            const rect = trigger.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const contentHeight = content.offsetHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            let top = rect.bottom + 6;

            if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
                top = rect.top - contentHeight - 6;
            }

            content.style.top = `${top}px`;
            content.style.left = `${rect.left}px`;
            content.style.minWidth = `${Math.max(rect.width, 280)}px`;
        };

        updatePosition();

        const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updatePosition));
        resizeObserver.observe(trigger);
        window.addEventListener("resize", updatePosition);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, triggerRef, contentRef]);

    // Body scroll lock
    useEffect(() => {
        if (!open) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    // Focus management - focus selected item or first focusable item when opened
    useEffect(() => {
        if (!open || !contentRef.current) return;

        const focusableSelectors = [
            '[role="option"][aria-selected="true"]:not([data-disabled="true"])',
            '[role="option"]:not([data-disabled="true"])',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const firstFocusable = contentRef.current?.querySelector(focusableSelectors) as HTMLElement;
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 10);

        return () => clearTimeout(timer);
    }, [open, contentRef]);

    // Handle keyboard navigation within the dropdown
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            return;
        }

        if (e.key === "Tab") {
            // Trap focus within the dropdown
            const focusableSelectors = [
                '[role="option"]:not([data-disabled="true"])',
                'button:not([disabled])',
                '[tabindex]:not([tabindex="-1"])',
            ].join(', ');

            const focusables = contentRef.current?.querySelectorAll(focusableSelectors);
            if (!focusables || focusables.length === 0) return;

            const firstFocusable = focusables[0] as HTMLElement;
            const lastFocusable = focusables[focusables.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }, [setOpen, triggerRef, contentRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-label="Time selection"
            onKeyDown={handleKeyDown}
            className={clsx(
                "fixed z-50 overflow-hidden rounded-overlay border border-border bg-elevated shadow-elevated animate-in fade-in-0 zoom-in-95",
                className
            )}
        >
            {mode === "range" && (
                <div className="flex border-b border-border">
                    <button
                        type="button"
                        onClick={() => setRangePhase("start")}
                        className={clsx(
                            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                            rangePhase === "start"
                                ? "text-brand border-b-2 border-brand"
                                : "text-muted-content hover:text-surface-content"
                        )}
                    >
                        Start Time
                    </button>
                    <button
                        type="button"
                        onClick={() => setRangePhase("end")}
                        className={clsx(
                            "flex-1 px-4 py-2 text-sm font-medium transition-colors",
                            rangePhase === "end"
                                ? "text-brand border-b-2 border-brand"
                                : "text-muted-content hover:text-surface-content"
                        )}
                    >
                        End Time
                    </button>
                </div>
            )}
            <div className="p-2">{children}</div>
        </div>,
        document.body
    );
};

TimepickerContent.displayName = "Timepicker.Content";

// ============================================================================
// Column Navigation Helper
// ============================================================================

/**
 * Moves focus to an adjacent timepicker column.
 * direction: "next" moves right, "prev" moves left.
 * Finds sibling columns via `data-timepicker-column` attributes.
 */
function focusAdjacentColumn(currentListbox: HTMLElement, direction: "next" | "prev"): boolean {
    const contentContainer = currentListbox.closest('[role="dialog"]');
    if (!contentContainer) return false;

    const columns = Array.from(
        contentContainer.querySelectorAll('[data-timepicker-column]')
    ) as HTMLElement[];

    const currentIndex = columns.indexOf(currentListbox);
    if (currentIndex === -1) return false;

    const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return false;

    const targetColumn = columns[targetIndex];
    // Focus the selected item in the target column, or the first available option
    const targetItem = (
        targetColumn.querySelector('[role="option"][aria-selected="true"]:not([data-disabled="true"])') ||
        targetColumn.querySelector('[role="option"]:not([data-disabled="true"])')
    ) as HTMLElement | null;

    if (targetItem) {
        targetItem.focus();
        targetItem.scrollIntoView({ block: "nearest" });
        return true;
    }
    return false;
}

// ============================================================================
// Time Column Wrapper
// ============================================================================

interface TimeColumnProps {
    label: string;
    children: ReactNode;
    className?: string;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ label, children, className }) => {
    const listboxRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const listbox = listboxRef.current;
        if (!listbox) return;

        const items = Array.from(
            listbox.querySelectorAll('[role="option"]:not([data-disabled="true"])')
        ) as HTMLElement[];

        if (items.length === 0) return;

        const currentIndex = items.findIndex((item) => item === document.activeElement);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            items[nextIndex]?.focus();
            items[nextIndex]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            items[prevIndex]?.focus();
            items[prevIndex]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            focusAdjacentColumn(listbox, "next");
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            focusAdjacentColumn(listbox, "prev");
        } else if (e.key === "Home") {
            e.preventDefault();
            items[0]?.focus();
            items[0]?.scrollIntoView({ block: "nearest" });
        } else if (e.key === "End") {
            e.preventDefault();
            items[items.length - 1]?.focus();
            items[items.length - 1]?.scrollIntoView({ block: "nearest" });
        }
    }, []);

    return (
        <div className={clsx("flex flex-col items-center", className)}>
            <span className="text-xs font-medium text-muted-content mb-1">{label}</span>
            <div
                ref={listboxRef}
                role="listbox"
                aria-label={label}
                data-timepicker-column
                onKeyDown={handleKeyDown}
                className="relative h-48 overflow-y-auto custom-scrollbar rounded-control border border-border bg-surface"
            >
                {children}
            </div>
        </div>
    );
};

// ============================================================================
// Hour Column
// ============================================================================

interface HourColumnProps {
    className?: string;
}

const HourColumn: React.FC<HourColumnProps> = ({ className }) => {
    const {
        format,
        tempValue,
        setTempValue,
        mode,
        rangePhase,
        disabledHours,
        minTime,
        maxTime,
        disabledTimes,
        minuteStep,
        showApplyButton,
        onValueChange,
    } = useTimepicker();

    const selectedItemRef = useRef<HTMLDivElement>(null);

    const hours = useMemo(() => {
        if (format === "12h") {
            return Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
        }
        return Array.from({ length: 24 }, (_, i) => i); // 0-23
    }, [format]);

    const getCurrentHour = (): number => {
        if (!tempValue) return format === "12h" ? 12 : 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            if (!time) return format === "12h" ? 12 : 0;
            return format === "12h" ? convertTo12Hour(time.hour) : time.hour;
        }

        const time = tempValue as TimeValue;
        return format === "12h" ? convertTo12Hour(time.hour) : time.hour;
    };

    const getCurrentPeriod = (): "AM" | "PM" => {
        if (!tempValue) return "AM";

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            if (!time) return "AM";
            return time.hour >= 12 ? "PM" : "AM";
        }

        const time = tempValue as TimeValue;
        return time.hour >= 12 ? "PM" : "AM";
    };

    const isHourDisabled = (displayHour: number): boolean => {
        let hour24: number;
        if (format === "12h") {
            hour24 = convertTo24Hour(displayHour, getCurrentPeriod());
        } else {
            hour24 = displayHour;
        }

        // Check basic disabled hours
        if (disabledHours?.includes(hour24)) return true;

        // Check min/max time constraints
        const currentTime = getCurrentMinute();
        if (minTime || maxTime) {
            const testTime: TimeValue = { hour: hour24, minute: currentTime };
            if (isTimeDisabled(testTime, { minTime, maxTime, disabledTimes: [], disabledHours: [] })) {
                // Only disable if ALL minutes for this hour are disabled
                const allMinutesDisabled = Array.from({ length: 60 }, (_, m) => m)
                    .filter(m => m % minuteStep === 0)
                    .every(m => {
                        const time: TimeValue = { hour: hour24, minute: m };
                        return isTimeDisabled(time, { minTime, maxTime });
                    });
                if (allMinutesDisabled) return true;
            }
        }

        return false;
    };

    const getCurrentMinute = (): number => {
        if (!tempValue) return 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            return time?.minute ?? 0;
        }

        return (tempValue as TimeValue).minute;
    };

    const handleHourSelect = (displayHour: number) => {
        if (isHourDisabled(displayHour)) return;

        let hour24: number;
        if (format === "12h") {
            hour24 = convertTo24Hour(displayHour, getCurrentPeriod());
        } else {
            hour24 = displayHour;
        }

        const minute = getCurrentMinute();

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const newRange: TimeRange = { ...range };
            if (rangePhase === "start") {
                newRange.start = { hour: hour24, minute };
            } else {
                newRange.end = { hour: hour24, minute };
            }
            setTempValue(newRange);
            if (!showApplyButton) onValueChange(newRange);
        } else {
            const newTime = { hour: hour24, minute };
            setTempValue(newTime);
            if (!showApplyButton) onValueChange(newTime);
        }
    };

    const currentHour = getCurrentHour();

    // Scroll to selected hour on mount
    useEffect(() => {
        if (selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }, [currentHour, rangePhase]);

    return (
        <TimeColumn label="Hour" className={className}>
            <div className="py-1">
                {hours.map((hour) => {
                    const isSelected = hour === currentHour;
                    const isDisabled = isHourDisabled(hour);

                    return (
                        <div
                            key={hour}
                            ref={isSelected ? selectedItemRef : undefined}
                            role="option"
                            tabIndex={isDisabled ? -1 : 0}
                            aria-selected={isSelected}
                            aria-disabled={isDisabled}
                            data-disabled={isDisabled}
                            onClick={() => handleHourSelect(hour)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleHourSelect(hour);
                                    // Auto-advance to the minute column
                                    const listbox = (e.target as HTMLElement).closest('[data-timepicker-column]') as HTMLElement | null;
                                    if (listbox) {
                                        // Small delay to let state update before moving focus
                                        requestAnimationFrame(() => focusAdjacentColumn(listbox, "next"));
                                    }
                                }
                            }}
                            className={clsx(
                                "flex items-center justify-center px-3 py-1.5 text-sm cursor-default select-none transition-colors",
                                isSelected
                                    ? "bg-brand text-brand-content font-medium"
                                    : "text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content",
                                isDisabled && "opacity-50 pointer-events-none"
                            )}
                        >
                            {hour.toString().padStart(2, "0")}
                        </div>
                    );
                })}
            </div>
        </TimeColumn>
    );
};

// ============================================================================
// Minute Column
// ============================================================================

interface MinuteColumnProps {
    className?: string;
}

const MinuteColumn: React.FC<MinuteColumnProps> = ({ className }) => {
    const {
        format,
        tempValue,
        setTempValue,
        mode,
        rangePhase,
        minuteStep,
        disabledHours,
        minTime,
        maxTime,
        disabledTimes,
        showApplyButton,
        setOpen,
        onValueChange,
    } = useTimepicker();

    const selectedItemRef = useRef<HTMLDivElement>(null);

    const minutes = useMemo(() => {
        return Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
    }, [minuteStep]);

    const getCurrentHour = (): number => {
        if (!tempValue) return 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            return time?.hour ?? 0;
        }

        return (tempValue as TimeValue).hour;
    };

    const getCurrentMinute = (): number => {
        if (!tempValue) return 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            return time?.minute ?? 0;
        }

        return (tempValue as TimeValue).minute;
    };

    const isMinuteDisabled = (minute: number): boolean => {
        const hour = getCurrentHour();
        const time: TimeValue = { hour, minute };
        return isTimeDisabled(time, { minTime, maxTime, disabledTimes, disabledHours });
    };

    const handleMinuteSelect = (minute: number) => {
        if (isMinuteDisabled(minute)) return;

        const hour = getCurrentHour();

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const newRange: TimeRange = { ...range };
            if (rangePhase === "start") {
                newRange.start = { hour, minute };
            } else {
                newRange.end = { hour, minute };
            }
            setTempValue(newRange);
            if (!showApplyButton) onValueChange(newRange);
        } else {
            const newTime = { hour, minute };
            setTempValue(newTime);
            if (!showApplyButton) onValueChange(newTime);
        }
    };

    const currentMinute = getCurrentMinute();

    // Scroll to selected minute on mount
    useEffect(() => {
        if (selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    }, [currentMinute, rangePhase]);

    return (
        <TimeColumn label="Minute" className={className}>
            <div className="py-1">
                {minutes.map((minute) => {
                    const isSelected = minute === currentMinute;
                    const isDisabled = isMinuteDisabled(minute);

                    return (
                        <div
                            key={minute}
                            ref={isSelected ? selectedItemRef : undefined}
                            role="option"
                            tabIndex={isDisabled ? -1 : 0}
                            aria-selected={isSelected}
                            aria-disabled={isDisabled}
                            data-disabled={isDisabled}
                            onClick={() => handleMinuteSelect(minute)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleMinuteSelect(minute);
                                    const listbox = (e.target as HTMLElement).closest('[data-timepicker-column]') as HTMLElement | null;
                                    if (listbox) {
                                        // In 12h mode, advance to Period column
                                        // In 24h mode (or with apply button), this is the last column
                                        const advanced = focusAdjacentColumn(listbox, "next");
                                        if (!advanced && !showApplyButton && mode === "single") {
                                            // No next column — apply and close
                                            const hour = getCurrentHour();
                                            onValueChange({ hour, minute });
                                            setOpen(false);
                                        }
                                    }
                                }
                            }}
                            className={clsx(
                                "flex items-center justify-center px-3 py-1.5 text-sm cursor-default select-none transition-colors",
                                isSelected
                                    ? "bg-brand text-brand-content font-medium"
                                    : "text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content",
                                isDisabled && "opacity-50 pointer-events-none"
                            )}
                        >
                            {minute.toString().padStart(2, "0")}
                        </div>
                    );
                })}
            </div>
        </TimeColumn>
    );
};

// ============================================================================
// Period Column (AM/PM)
// ============================================================================

interface PeriodColumnProps {
    className?: string;
}

const PeriodColumn: React.FC<PeriodColumnProps> = ({ className }) => {
    const { format, tempValue, setTempValue, mode, rangePhase, showApplyButton, setOpen, onValueChange } = useTimepicker();

    // Only show in 12h mode
    if (format === "24h") return null;

    const getCurrentHour = (): number => {
        if (!tempValue) return 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            return time?.hour ?? 0;
        }

        return (tempValue as TimeValue).hour;
    };

    const getCurrentMinute = (): number => {
        if (!tempValue) return 0;

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const time = rangePhase === "start" ? range.start : range.end;
            return time?.minute ?? 0;
        }

        return (tempValue as TimeValue).minute;
    };

    const getCurrentPeriod = (): "AM" | "PM" => {
        const hour = getCurrentHour();
        return hour >= 12 ? "PM" : "AM";
    };

    const handlePeriodSelect = (period: "AM" | "PM") => {
        const currentHour = getCurrentHour();
        const currentMinute = getCurrentMinute();
        const displayHour12 = convertTo12Hour(currentHour);
        const newHour24 = convertTo24Hour(displayHour12, period);

        if (mode === "range") {
            const range = tempValue as TimeRange;
            const newRange: TimeRange = { ...range };
            if (rangePhase === "start") {
                newRange.start = { hour: newHour24, minute: currentMinute };
            } else {
                newRange.end = { hour: newHour24, minute: currentMinute };
            }
            setTempValue(newRange);
            if (!showApplyButton) onValueChange(newRange);
        } else {
            const newTime = { hour: newHour24, minute: currentMinute };
            setTempValue(newTime);
            if (!showApplyButton) onValueChange(newTime);
        }
    };

    const currentPeriod = getCurrentPeriod();

    return (
        <TimeColumn label="Period" className={className}>
            <div className="py-1">
                {(["AM", "PM"] as const).map((period) => {
                    const isSelected = period === currentPeriod;

                    return (
                        <div
                            key={period}
                            role="option"
                            tabIndex={0}
                            aria-selected={isSelected}
                            onClick={() => handlePeriodSelect(period)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handlePeriodSelect(period);
                                    // Period is the last column in 12h mode — apply and close
                                    if (!showApplyButton && mode === "single") {
                                        const currentHour = getCurrentHour();
                                        const currentMinute = getCurrentMinute();
                                        const displayHour12 = convertTo12Hour(currentHour);
                                        const newHour24 = convertTo24Hour(displayHour12, period);
                                        onValueChange({ hour: newHour24, minute: currentMinute });
                                        setOpen(false);
                                    }
                                }
                            }}
                            className={clsx(
                                "flex items-center justify-center px-3 py-2 text-sm cursor-default select-none transition-colors",
                                isSelected
                                    ? "bg-brand text-brand-content font-medium"
                                    : "text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content"
                            )}
                        >
                            {period}
                        </div>
                    );
                })}
            </div>
        </TimeColumn>
    );
};

// ============================================================================
// Footer
// ============================================================================

interface TimepickerFooterProps {
    children?: ReactNode;
    className?: string;
}

const TimepickerFooter: React.FC<TimepickerFooterProps> = ({
    children,
    className,
}) => {
    const { clearable, showApplyButton, clearSelection, applySelection, tempValue, mode } =
        useTimepicker();

    const isRangeValid = (): boolean => {
        if (mode !== "range") return true;
        const range = tempValue as TimeRange | null;
        if (!range?.start || !range?.end) return false;
        return isValidTimeRange(range);
    };

    return (
        <div
            className={clsx(
                "flex items-center justify-between gap-2 pt-2 mt-2 border-t border-border",
                className
            )}
        >
            {children || (
                <>
                    {clearable && (
                        <button
                            type="button"
                            onClick={clearSelection}
                            className="px-3 py-1.5 text-sm text-muted-content hover:text-destructive transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    {showApplyButton && (
                        <button
                            type="button"
                            onClick={applySelection}
                            disabled={!tempValue || !isRangeValid()}
                            className={clsx(
                                "ml-auto px-4 py-1.5 text-sm font-medium rounded-control transition-colors",
                                tempValue && isRangeValid()
                                    ? "bg-brand text-brand-content hover:bg-brand/90"
                                    : "bg-muted text-muted-content cursor-not-allowed"
                            )}
                        >
                            Apply
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

TimepickerFooter.displayName = "Timepicker.Footer";

// ============================================================================
// Error
// ============================================================================

interface TimepickerErrorProps {
    children?: ReactNode;
    className?: string;
}

const TimepickerError: React.FC<TimepickerErrorProps> = ({ children, className }) => {
    const { error } = useTimepicker();

    if (!error && !children) return null;

    return (
        <div
            className={clsx(
                "flex items-center gap-1.5 text-sm text-destructive",
                className
            )}
        >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{children || error}</span>
        </div>
    );
};

TimepickerError.displayName = "Timepicker.Error";

// ============================================================================
// Time Grid (Combined columns layout)
// ============================================================================

interface TimeGridProps {
    className?: string;
}

const TimeGrid: React.FC<TimeGridProps> = ({ className }) => {
    const { format } = useTimepicker();

    return (
        <div className={clsx("flex gap-2", className)}>
            <HourColumn />
            <MinuteColumn />
            {format === "12h" && <PeriodColumn />}
        </div>
    );
};

TimeGrid.displayName = "Timepicker.TimeGrid";

// ============================================================================
// Compound Export
// ============================================================================

export const Timepicker = {
    Root: TimepickerRoot,
    Trigger: TimepickerTrigger,
    Content: TimepickerContent,
    HourColumn: HourColumn,
    MinuteColumn: MinuteColumn,
    PeriodColumn: PeriodColumn,
    TimeGrid: TimeGrid,
    Footer: TimepickerFooter,
    Error: TimepickerError,
};

export type {
    TimepickerRootProps,
    TimepickerTriggerProps,
    TimepickerContentProps,
    HourColumnProps,
    MinuteColumnProps,
    PeriodColumnProps,
    TimeGridProps,
    TimepickerFooterProps,
    TimepickerErrorProps,
    TimeFormat,
    TimepickerMode,
};
