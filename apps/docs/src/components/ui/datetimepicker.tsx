"use client";

import { clsx } from "clsx";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Clock,
} from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types
// ============================================================================

type DateTimePickerMode = "date" | "time" | "datetime";

interface DateTimePickerProps {
    /** Selected value. */
    value?: Date | null;
    /** Change handler. */
    onChange?: (date: Date | null) => void;
    /** Picker mode. */
    mode?: DateTimePickerMode;
    /** Earliest selectable date. */
    min?: Date;
    /** Latest selectable date. */
    max?: Date;
    /** Disable the picker entirely. */
    disabled?: boolean;
    /** Use 24-hour clock. */
    use24Hour?: boolean;
    /** Placeholder shown when no value is selected. */
    placeholder?: string;
    children: React.ReactNode;
}

// ============================================================================
// Context
// ============================================================================

interface Ctx {
    value: Date | null;
    onChange: (date: Date | null) => void;
    viewDate: Date;
    setViewDate: React.Dispatch<React.SetStateAction<Date>>;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    mode: DateTimePickerMode;
    min?: Date;
    max?: Date;
    disabled: boolean;
    use24Hour: boolean;
    placeholder: string;
    triggerId: string;
    contentId: string;
}

const DateTimePickerContext = createContext<Ctx | null>(null);

function useDateTimePicker() {
    const ctx = useContext(DateTimePickerContext);
    if (!ctx)
        throw new Error(
            "DateTimePicker.* must be used within <DateTimePicker>"
        );
    return ctx;
}

// ============================================================================
// Helpers (hoisted — pure)
// ============================================================================

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

function getDaysInMonth(y: number, m: number) {
    return new Date(y, m + 1, 0).getDate();
}

function getFirstDayOfMonth(y: number, m: number) {
    return new Date(y, m, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isDateDisabled(date: Date, min?: Date, max?: Date) {
    if (min) {
        const d = new Date(min.getFullYear(), min.getMonth(), min.getDate());
        if (date < d) return true;
    }
    if (max) {
        const d = new Date(max.getFullYear(), max.getMonth(), max.getDate());
        if (date > d) return true;
    }
    return false;
}

function formatDisplay(
    date: Date | null,
    mode: DateTimePickerMode,
    use24Hour: boolean
): string {
    if (!date) return "";
    if (mode === "time")
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: !use24Hour,
        });
    if (mode === "datetime")
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: !use24Hour,
        });
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function dateKey(d: Date) {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ============================================================================
// Root
// ============================================================================

function DateTimePickerRoot({
    value = null,
    onChange,
    mode = "date",
    min,
    max,
    disabled = false,
    use24Hour = false,
    placeholder = "Select…",
    children,
}: DateTimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(() => value ?? new Date());

    const triggerId = useId();
    const contentId = useId();

    const open = useCallback(() => {
        if (!disabled) setIsOpen(true);
    }, [disabled]);

    const close = useCallback(() => setIsOpen(false), []);

    const toggle = useCallback(() => {
        if (!disabled) setIsOpen((p) => !p);
    }, [disabled]);

    const handleChange = useCallback(
        (d: Date | null) => onChange?.(d),
        [onChange]
    );

    const ctx = useMemo<Ctx>(
        () => ({
            value,
            onChange: handleChange,
            viewDate,
            setViewDate,
            isOpen,
            open,
            close,
            toggle,
            mode,
            min,
            max,
            disabled,
            use24Hour,
            placeholder,
            triggerId,
            contentId,
        }),
        [
            value,
            handleChange,
            viewDate,
            isOpen,
            open,
            close,
            toggle,
            mode,
            min,
            max,
            disabled,
            use24Hour,
            placeholder,
            triggerId,
            contentId,
        ]
    );

    return (
        <DateTimePickerContext.Provider value={ctx}>
            {children}
        </DateTimePickerContext.Provider>
    );
}

// ============================================================================
// Trigger
// ============================================================================

const DateTimePickerTrigger = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const {
        value,
        mode,
        use24Hour,
        placeholder,
        isOpen,
        toggle,
        disabled,
        triggerId,
        contentId,
    } = useDateTimePicker();

    const formatted = formatDisplay(value, mode, use24Hour);

    return (
        <button
            ref={ref}
            id={triggerId}
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls={isOpen ? contentId : undefined}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            onClick={toggle}
            className={clsx(
                "inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-secondary transition-colors",
                "border-ground-300 dark:border-ground-700 bg-white dark:bg-ground-900",
                "hover:border-primary-400 dark:hover:border-primary-600",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                disabled && "opacity-50 cursor-not-allowed",
                isOpen && "border-primary-500 dark:border-primary-500",
                className
            )}
            {...props}
        >
            {children ?? (
                <>
                    <Calendar
                        className="w-4 h-4 shrink-0 text-ground-500 dark:text-ground-400"
                        aria-hidden="true"
                    />
                    <span
                        className={clsx(
                            !formatted &&
                            "text-ground-400 dark:text-ground-500"
                        )}
                    >
                        {formatted || placeholder}
                    </span>
                </>
            )}
        </button>
    );
});

DateTimePickerTrigger.displayName = "DateTimePicker.Trigger";

// ============================================================================
// Content (portal dialog)
// ============================================================================

const DateTimePickerContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { isOpen, close, triggerId, contentId, mode } = useDateTimePicker();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    const reposition = useCallback(() => {
        const trigger = document.getElementById(triggerId);
        if (!trigger || !contentRef.current) return;
        const tr = trigger.getBoundingClientRect();
        const cr = contentRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const gap = 4;

        let top = tr.bottom + gap;
        let left = tr.left;

        if (top + cr.height > vh - 8 && tr.top > cr.height + gap)
            top = tr.top - cr.height - gap;
        if (left + cr.width > vw - 8) left = vw - cr.width - 8;
        if (left < 8) left = 8;

        setPosition({ top, left });
    }, [triggerId]);

    useLayoutEffect(() => {
        if (!isOpen) return;
        reposition();
        window.addEventListener("scroll", reposition, {
            passive: true,
            capture: true,
        });
        window.addEventListener("resize", reposition, { passive: true });
        return () => {
            window.removeEventListener("scroll", reposition, true);
            window.removeEventListener("resize", reposition);
        };
    }, [isOpen, reposition]);

    // Escape
    useEffect(() => {
        if (!isOpen) return;
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
                document.getElementById(triggerId)?.focus();
            }
        };
        document.addEventListener("keydown", h);
        return () => document.removeEventListener("keydown", h);
    }, [isOpen, close, triggerId]);

    // Click outside
    useEffect(() => {
        if (!isOpen) return;
        const h = (e: MouseEvent) => {
            const trigger = document.getElementById(triggerId);
            if (
                contentRef.current &&
                !contentRef.current.contains(e.target as Node) &&
                trigger &&
                !trigger.contains(e.target as Node)
            )
                close();
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, [isOpen, close, triggerId]);

    if (!mounted || !isOpen) return null;

    const dialogLabel =
        mode === "time"
            ? "Time picker"
            : mode === "datetime"
                ? "Date and time picker"
                : "Date picker";

    return createPortal(
        <div
            ref={(node) => {
                (
                    contentRef as React.MutableRefObject<HTMLDivElement | null>
                ).current = node;
                if (typeof ref === "function") ref(node);
                else if (ref)
                    (
                        ref as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
            }}
            id={contentId}
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel}
            style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 50,
            }}
            className={clsx(
                "bg-white dark:bg-ground-900 border-2 border-ground-200 dark:border-ground-800 rounded-xl shadow-xl p-4 animate-in fade-in-0 zoom-in-95 duration-200",
                className
            )}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
});

DateTimePickerContent.displayName = "DateTimePicker.Content";

// ============================================================================
// Calendar
// ============================================================================

const DateTimePickerCalendar = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { value, onChange, viewDate, setViewDate, min, max, close, mode } =
        useDateTimePicker();
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const gridRef = useRef<HTMLTableElement>(null);
    const liveId = useId();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const today = useMemo(() => new Date(), []);

    // Build 6-row grid
    const weeks = useMemo(() => {
        const dim = getDaysInMonth(year, month);
        const fd = getFirstDayOfMonth(year, month);
        const prevDim = getDaysInMonth(year, month - 1);
        const cells: { date: Date; inMonth: boolean }[] = [];

        for (let i = fd - 1; i >= 0; i--)
            cells.push({
                date: new Date(year, month - 1, prevDim - i),
                inMonth: false,
            });
        for (let d = 1; d <= dim; d++)
            cells.push({
                date: new Date(year, month, d),
                inMonth: true,
            });
        const rem = 42 - cells.length;
        for (let d = 1; d <= rem; d++)
            cells.push({
                date: new Date(year, month + 1, d),
                inMonth: false,
            });

        const w: (typeof cells)[] = [];
        for (let i = 0; i < cells.length; i += 7) w.push(cells.slice(i, i + 7));
        return w;
    }, [year, month]);

    const prevMonth = useCallback(
        () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
        [setViewDate]
    );
    const nextMonth = useCallback(
        () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
        [setViewDate]
    );
    const prevYear = useCallback(
        () => setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1)),
        [setViewDate]
    );
    const nextYear = useCallback(
        () => setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1)),
        [setViewDate]
    );

    const selectDate = useCallback(
        (date: Date) => {
            if (isDateDisabled(date, min, max)) return;
            const nd = new Date(date);
            if (value)
                nd.setHours(
                    value.getHours(),
                    value.getMinutes(),
                    value.getSeconds()
                );
            onChange(nd);
            if (mode === "date") close();
        },
        [value, onChange, min, max, mode, close]
    );

    const goToToday = useCallback(() => {
        const t = new Date();
        setViewDate(t);
        selectDate(t);
    }, [setViewDate, selectDate]);

    const handleClear = useCallback(() => {
        onChange(null);
        close();
    }, [onChange, close]);

    // Keyboard navigation
    const handleGridKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const f = focusedDate ?? value ?? new Date(year, month, 1);
            let next: Date | null = null;

            switch (e.key) {
                case "ArrowLeft":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() - 1);
                    break;
                case "ArrowRight":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1);
                    break;
                case "ArrowUp":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() - 7);
                    break;
                case "ArrowDown":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 7);
                    break;
                case "Home":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() - f.getDay());
                    break;
                case "End":
                    next = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (6 - f.getDay()));
                    break;
                case "PageUp":
                    next = e.shiftKey
                        ? new Date(f.getFullYear() - 1, f.getMonth(), f.getDate())
                        : new Date(f.getFullYear(), f.getMonth() - 1, f.getDate());
                    break;
                case "PageDown":
                    next = e.shiftKey
                        ? new Date(f.getFullYear() + 1, f.getMonth(), f.getDate())
                        : new Date(f.getFullYear(), f.getMonth() + 1, f.getDate());
                    break;
                case "Enter":
                case " ":
                    e.preventDefault();
                    selectDate(f);
                    return;
                default:
                    return;
            }

            if (next) {
                e.preventDefault();
                setFocusedDate(next);
                if (next.getMonth() !== month || next.getFullYear() !== year)
                    setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
            }
        },
        [focusedDate, value, year, month, selectDate, setViewDate]
    );

    // Focus the active cell when focusedDate changes
    useEffect(() => {
        if (!focusedDate || !gridRef.current) return;
        const cell = gridRef.current.querySelector(
            `[data-date="${dateKey(focusedDate)}"]`
        ) as HTMLElement;
        cell?.focus();
    }, [focusedDate]);

    // Determine which cell gets tabIndex=0 (roving tabindex)
    const activeDate = focusedDate ?? value ?? new Date(year, month, 1);

    const navBtnClass =
        "p-1 rounded-md hover:bg-ground-100 dark:hover:bg-ground-800 text-ground-500 hover:text-ground-700 dark:hover:text-ground-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500";

    return (
        <div ref={ref} className={clsx("space-y-3 w-[280px]", className)} {...props}>
            {/* Month/year navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={prevYear}
                        className={navBtnClass}
                        aria-label="Previous year"
                    >
                        <ChevronsLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={prevMonth}
                        className={navBtnClass}
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>

                <span
                    id={liveId}
                    aria-live="polite"
                    aria-atomic="true"
                    className="text-sm font-secondary font-semibold text-ground-900 dark:text-ground-100"
                >
                    {MONTHS[month]} {year}
                </span>

                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={nextMonth}
                        className={navBtnClass}
                        aria-label="Next month"
                    >
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={nextYear}
                        className={navBtnClass}
                        aria-label="Next year"
                    >
                        <ChevronsRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <table
                ref={gridRef}
                role="grid"
                aria-labelledby={liveId}
                className="w-full border-collapse"
                onKeyDown={handleGridKeyDown}
            >
                <thead>
                    <tr>
                        {DAYS.map((d) => (
                            <th
                                key={d}
                                scope="col"
                                className="p-1 text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 text-center"
                                aria-label={d}
                            >
                                {d.charAt(0)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, wi) => (
                        <tr key={wi}>
                            {week.map((cell) => {
                                const key = dateKey(cell.date);
                                const isToday = isSameDay(cell.date, today);
                                const isSelected = value
                                    ? isSameDay(cell.date, value)
                                    : false;
                                const isFocusable = isSameDay(
                                    cell.date,
                                    activeDate
                                );
                                const dis = isDateDisabled(
                                    cell.date,
                                    min,
                                    max
                                );

                                return (
                                    <td key={key} role="gridcell">
                                        <button
                                            type="button"
                                            data-date={key}
                                            tabIndex={isFocusable ? 0 : -1}
                                            disabled={dis}
                                            onClick={() =>
                                                selectDate(cell.date)
                                            }
                                            aria-selected={isSelected}
                                            aria-current={
                                                isToday ? "date" : undefined
                                            }
                                            aria-disabled={dis || undefined}
                                            aria-label={cell.date.toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "long",
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )}
                                            className={clsx(
                                                "w-8 h-8 rounded-lg text-xs font-secondary transition-all duration-150",
                                                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                                                !cell.inMonth &&
                                                "text-ground-300 dark:text-ground-600",
                                                cell.inMonth &&
                                                !isSelected &&
                                                !dis &&
                                                "text-ground-700 dark:text-ground-300 hover:bg-primary-50 dark:hover:bg-primary-900/20",
                                                isToday &&
                                                !isSelected &&
                                                "font-bold ring-1 ring-primary-500",
                                                isSelected &&
                                                "bg-primary-600 text-white hover:bg-primary-700",
                                                dis &&
                                                "opacity-30 cursor-not-allowed"
                                            )}
                                        >
                                            {cell.date.getDate()}
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-ground-200 dark:border-ground-800">
                <button
                    type="button"
                    onClick={goToToday}
                    className="text-xs font-secondary text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus:underline"
                >
                    Today
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs font-secondary text-ground-500 hover:text-error-600 dark:hover:text-error-400 transition-colors focus:outline-none focus:underline"
                >
                    Clear
                </button>
            </div>
        </div>
    );
});

DateTimePickerCalendar.displayName = "DateTimePicker.Calendar";

// ============================================================================
// TimePicker
// ============================================================================

const DateTimePickerTimePicker = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { value, onChange, use24Hour } = useDateTimePicker();

    const hourId = useId();
    const minId = useId();
    const periodId = useId();

    const hours = value
        ? use24Hour
            ? value.getHours()
            : value.getHours() % 12 || 12
        : use24Hour
            ? 0
            : 12;
    const minutes = value ? value.getMinutes() : 0;
    const period = value ? (value.getHours() >= 12 ? "PM" : "AM") : "AM";

    const setTime = useCallback(
        (h: number, m: number, p?: string) => {
            const nd = value ? new Date(value) : new Date();
            let h24 = h;
            if (!use24Hour) {
                const per = p ?? period;
                if (per === "AM" && h === 12) h24 = 0;
                else if (per === "PM" && h !== 12) h24 = h + 12;
                else h24 = h;
            }
            nd.setHours(h24, m, 0, 0);
            onChange(nd);
        },
        [value, onChange, use24Hour, period]
    );

    const handleHour = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setTime(parseInt(e.target.value, 10), minutes),
        [setTime, minutes]
    );

    const handleMinute = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setTime(hours, parseInt(e.target.value, 10)),
        [setTime, hours]
    );

    const handlePeriod = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>
            setTime(hours, minutes, e.target.value),
        [setTime, hours, minutes]
    );

    const hourOpts = useMemo(
        () =>
            use24Hour
                ? Array.from({ length: 24 }, (_, i) => i)
                : Array.from({ length: 12 }, (_, i) => i + 1),
        [use24Hour]
    );

    const minOpts = useMemo(
        () => Array.from({ length: 60 }, (_, i) => i),
        []
    );

    const selClass =
        "px-2 py-1.5 rounded-lg border-2 border-ground-300 dark:border-ground-700 bg-white dark:bg-ground-900 text-sm font-secondary text-ground-900 dark:text-ground-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none cursor-pointer";

    return (
        <div
            ref={ref}
            className={clsx(
                "flex items-center gap-2 pt-3 border-t border-ground-200 dark:border-ground-800",
                className
            )}
            {...props}
        >
            <Clock
                className="w-4 h-4 shrink-0 text-ground-400 dark:text-ground-500"
                aria-hidden="true"
            />

            <div className="flex items-center gap-1">
                <label htmlFor={hourId} className="sr-only">
                    Hour
                </label>
                <select
                    id={hourId}
                    value={hours}
                    onChange={handleHour}
                    className={selClass}
                    aria-label="Hour"
                >
                    {hourOpts.map((h) => (
                        <option key={h} value={h}>
                            {String(h).padStart(2, "0")}
                        </option>
                    ))}
                </select>

                <span
                    className="text-ground-500 font-bold"
                    aria-hidden="true"
                >
                    :
                </span>

                <label htmlFor={minId} className="sr-only">
                    Minute
                </label>
                <select
                    id={minId}
                    value={minutes}
                    onChange={handleMinute}
                    className={selClass}
                    aria-label="Minute"
                >
                    {minOpts.map((m) => (
                        <option key={m} value={m}>
                            {String(m).padStart(2, "0")}
                        </option>
                    ))}
                </select>

                {!use24Hour && (
                    <>
                        <label htmlFor={periodId} className="sr-only">
                            AM/PM
                        </label>
                        <select
                            id={periodId}
                            value={period}
                            onChange={handlePeriod}
                            className={selClass}
                            aria-label="AM or PM"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </>
                )}
            </div>
        </div>
    );
});

DateTimePickerTimePicker.displayName = "DateTimePicker.TimePicker";

// ============================================================================
// Compound export
// ============================================================================

const DateTimePicker = Object.assign(DateTimePickerRoot, {
    Trigger: DateTimePickerTrigger,
    Content: DateTimePickerContent,
    Calendar: DateTimePickerCalendar,
    TimePicker: DateTimePickerTimePicker,
});

export { DateTimePicker, useDateTimePicker };
export type { DateTimePickerMode, DateTimePickerProps };
