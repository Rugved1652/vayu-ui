"use client";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  forwardRef,
  useCallback,
  ButtonHTMLAttributes,
  HTMLAttributes,
  useLayoutEffect,
} from "react";
import moment from "moment";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

export type DatePickerMode = "single" | "range";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export type DatePickerValue = Date | DateRange | null;

// ============================================================================
// Context Types
// ============================================================================

interface DatePickerContextValue {
  // Mode
  mode: DatePickerMode;

  // State
  selectedDate: Date | null;
  selectedRange: DateRange | null;
  currentDate: Date;
  open: boolean;

  // Setters
  setSelectedDate: (date: Date | null) => void;
  setSelectedRange: (range: DateRange | null) => void;
  setOpen: (open: boolean) => void;
  setCurrentDate: (date: Date) => void;

  // Navigation
  goToMonth: (direction: 1 | -1) => void;
  goToYear: (direction: 1 | -1) => void;
  goToToday: () => void;
  selectMonth: (month: number) => void;
  selectYear: (year: number) => void;

  // Disabled configuration
  disabled: boolean;
  disabledWeekdays: number[];
  disabledDates: Date[];
  isDateDisabled: (date: Date) => boolean;

  // Range hover state
  rangeHoverDate: Date | null;
  setRangeHoverDate: (date: Date | null) => void;

  // Focus state
  focusedDate: Date | null;
  setFocusedDate: (date: Date | null) => void;

  // Dropdown state
  monthDropdownOpen: boolean;
  setMonthDropdownOpen: (open: boolean) => void;
  yearDropdownOpen: boolean;
  setYearDropdownOpen: (open: boolean) => void;

  // Refs
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  calendarRef: React.RefObject<HTMLDivElement | null>;

  // Clear handler
  handleClear: () => void;
}

// ============================================================================
// Context
// ============================================================================

const DatePickerContext = createContext<DatePickerContextValue | undefined>(
  undefined
);

const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "DatePicker compound components must be used within DatePicker.Root"
    );
  }
  return context;
};

// ============================================================================
// Constants
// ============================================================================

const DAY_NAMES_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_NAMES_FULL = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTH_NAMES = [
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
];
const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ============================================================================
// Date Utilities
// ============================================================================

const getMonthDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = moment(firstDay).subtract(diff, "days");
  const days: Date[] = [];

  for (let i = 0; i < 42; i++) {
    days.push(startOfWeek.clone().add(i, "days").toDate());
  }
  return days;
};

const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return moment(a).isSame(moment(b), "day");
};

const isSameMonth = (a: Date, b: Date): boolean => {
  return moment(a).isSame(moment(b), "month");
};

const isToday = (date: Date): boolean => {
  return moment(date).isSame(moment(), "day");
};

const formatDate = (date: Date, format: string): string => {
  return moment(date).format(format);
};

const isDateInRange = (date: Date, range: DateRange | null): boolean => {
  if (!range?.startDate || !range?.endDate) return false;
  const d = moment(date);
  return (
    d.isSameOrAfter(moment(range.startDate), "day") &&
    d.isSameOrBefore(moment(range.endDate), "day")
  );
};

const isRangeStart = (date: Date, range: DateRange | null): boolean => {
  if (!range?.startDate) return false;
  return isSameDay(date, range.startDate);
};

const isRangeEnd = (date: Date, range: DateRange | null): boolean => {
  if (!range?.endDate) return false;
  return isSameDay(date, range.endDate);
};

const isRangeHovered = (
  date: Date,
  range: DateRange | null,
  hoverDate: Date | null
): boolean => {
  if (!range?.startDate || range.endDate || !hoverDate) return false;
  const d = moment(date);
  const start = moment(range.startDate);
  const hover = moment(hoverDate);

  if (hover.isBefore(start)) {
    return d.isSameOrAfter(hover, "day") && d.isSameOrBefore(start, "day");
  }
  return d.isSameOrAfter(start, "day") && d.isSameOrBefore(hover, "day");
};

// ============================================================================
// Icons
// ============================================================================

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// Utility: Merge Refs
// ============================================================================

function useMergeRefs<T = unknown>(
  ...refs: Array<
    React.RefObject<T | null> | React.ForwardedRef<T> | undefined
  >
): React.RefCallback<T | null> {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          (ref as React.RefObject<T | null>).current = node;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}

// ============================================================================
// Root Component
// ============================================================================

export interface DatePickerRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  children: React.ReactNode;
  mode?: DatePickerMode;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  disabled?: boolean;
  disabledWeekdays?: number[];
  disabledDates?: Date[];
  placeholder?: string;
}

const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(
  (
    {
      children,
      mode = "single",
      value,
      defaultValue,
      onChange,
      disabled = false,
      disabledWeekdays = [],
      disabledDates = [],
      placeholder = "Select date",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;

    const parseDefaultValue = (): {
      date: Date | null;
      range: DateRange | null;
    } => {
      if (!defaultValue) return { date: null, range: null };
      if (mode === "range" && "startDate" in defaultValue) {
        return {
          date: null,
          range: defaultValue as DateRange,
        };
      }
      return {
        date: defaultValue as Date,
        range: null,
      };
    };

    const initial = parseDefaultValue();

    // State
    const [internalDate, setInternalDate] = useState<Date | null>(initial.date);
    const [internalRange, setInternalRange] = useState<DateRange | null>(
      initial.range
    );
    const [currentDate, setCurrentDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [rangeHoverDate, setRangeHoverDate] = useState<Date | null>(null);
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

    // Refs
    const triggerRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Get current values
    const selectedDate = isControlled
      ? mode === "single"
        ? (value as Date)
        : null
      : internalDate;
    const selectedRange = isControlled
      ? mode === "range"
        ? (value as DateRange)
        : null
      : internalRange;

    // Handlers
    const setSelectedDate = (date: Date | null) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
    };

    const setSelectedRange = (range: DateRange | null) => {
      if (!isControlled) setInternalRange(range);
      onChange?.(range);
    };

    const handleClear = () => {
      if (mode === "single") {
        setSelectedDate(null);
      } else {
        setSelectedRange(null);
      }
      setRangeHoverDate(null);
    };

    // Navigation handlers
    const goToMonth = (direction: 1 | -1) => {
      setCurrentDate((prev) => moment(prev).add(direction, "month").toDate());
    };

    const goToYear = (direction: 1 | -1) => {
      setCurrentDate((prev) => moment(prev).add(direction, "year").toDate());
    };

    const goToToday = () => {
      setCurrentDate(new Date());
      setFocusedDate(new Date());
    };

    const selectMonth = (month: number) => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setMonth(month);
        return next;
      });
      setMonthDropdownOpen(false);
    };

    const selectYear = (year: number) => {
      setCurrentDate((prev) => {
        const next = new Date(prev);
        next.setFullYear(year);
        return next;
      });
      setYearDropdownOpen(false);
    };

    // Disabled check helper
    const isDateDisabled = (date: Date): boolean => {
      if (disabledWeekdays.includes(date.getDay())) return true;
      return disabledDates.some((d) => isSameDay(d, date));
    };

    // Scroll lock when open
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          triggerRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
          setMonthDropdownOpen(false);
          setYearDropdownOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          if (monthDropdownOpen || yearDropdownOpen) {
            setMonthDropdownOpen(false);
            setYearDropdownOpen(false);
            return;
          }
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
    }, [open, monthDropdownOpen, yearDropdownOpen]);

    // Context value
    const contextValue: DatePickerContextValue = {
      mode,
      selectedDate,
      selectedRange,
      currentDate,
      open,
      setSelectedDate,
      setSelectedRange,
      setOpen,
      setCurrentDate,
      goToMonth,
      goToYear,
      goToToday,
      selectMonth,
      selectYear,
      disabled,
      disabledWeekdays,
      disabledDates,
      isDateDisabled,
      rangeHoverDate,
      setRangeHoverDate,
      focusedDate,
      setFocusedDate,
      monthDropdownOpen,
      setMonthDropdownOpen,
      yearDropdownOpen,
      setYearDropdownOpen,
      triggerRef,
      calendarRef,
      handleClear,
    };

    return (
      <DatePickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {children}
        </div>
      </DatePickerContext.Provider>
    );
  }
);

DatePickerRoot.displayName = "DatePicker.Root";

// ============================================================================
// Trigger Component
// ============================================================================

export interface DatePickerTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ placeholder = "Select date", className, disabled, ...props }, ref) => {
    const {
      selectedDate,
      selectedRange,
      mode,
      open,
      setOpen,
      disabled: contextDisabled,
      triggerRef,
    } = useDatePicker();

    const isDisabled = disabled ?? contextDisabled;

    const getDisplayValue = (): string => {
      if (mode === "range" && selectedRange) {
        if (selectedRange.startDate && selectedRange.endDate) {
          const start = formatDate(selectedRange.startDate, "MMM D, YYYY");
          const end = formatDate(selectedRange.endDate, "MMM D, YYYY");
          return `${start} - ${end}`;
        }
        if (selectedRange.startDate) {
          return (
            formatDate(selectedRange.startDate, "MMM D, YYYY") + " - Select end"
          );
        }
        return placeholder;
      }
      if (mode === "single" && selectedDate) {
        return formatDate(selectedDate, "MMM D, YYYY");
      }
      return placeholder;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    const mergedRefs = useMergeRefs(triggerRef, ref);

    return (
      <button
        ref={mergedRefs}
        type="button"
        disabled={isDisabled}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full min-w-50 flex items-center justify-between gap-2",
          "px-3 py-2.5 text-left font-secondary",
          "bg-surface border rounded-control",
          "transition-colors duration-150",
          open
            ? "border-focus ring-2 ring-focus/20"
            : "border-field hover:border-muted-content",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-field",
          className
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...props}
      >
        <span
          className={cn(
            "truncate",
            selectedDate || selectedRange?.startDate
              ? "text-surface-content"
              : "text-muted-content"
          )}
        >
          {getDisplayValue()}
        </span>
        <CalendarIcon className="w-4 h-4 text-muted-content shrink-0" />
      </button>
    );
  }
);

DatePickerTrigger.displayName = "DatePicker.Trigger";

// ============================================================================
// Dropdown List Components (with keyboard navigation)
// ============================================================================

interface MonthDropdownListProps {
  currentDate: Date;
  selectMonth: (month: number) => void;
  onClose: () => void;
}

const MonthDropdownList: React.FC<MonthDropdownListProps> = ({
  currentDate,
  selectMonth,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentMonthIndex = currentDate.getMonth();
  const [focusedIndex, setFocusedIndex] = useState(currentMonthIndex);
  const hasFocusedRef = useRef(false);

  // Callback ref that focuses the current month button when mounted
  const setCurrentMonthButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRefs.current[currentMonthIndex] = el;
      if (el && !hasFocusedRef.current) {
        hasFocusedRef.current = true;
        // Use microtask to ensure the element is fully in the DOM
        queueMicrotask(() => {
          el.scrollIntoView({ block: "nearest" });
          el.focus();
        });
      }
    },
    [currentMonthIndex]
  );

  // Regular ref callback for other buttons
  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el;
    },
    []
  );

  // Focus the button when focusedIndex changes (keyboard navigation)
  useLayoutEffect(() => {
    const button = buttonRefs.current[focusedIndex];
    if (button) {
      button.scrollIntoView({ block: "nearest" });
      button.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < 11 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 11));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectMonth(index);
        onClose();
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(11);
        break;
      case "Tab":
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Months"
      aria-activedescendant={`month-${focusedIndex}`}
      className={cn(
        "absolute top-full left-0 mt-1 z-10",
        "bg-surface border border-border rounded-control shadow-elevated",
        "py-1 max-h-64 overflow-y-auto",
        "min-w-28"
      )}
    >
      {MONTH_NAMES.map((month, index) => (
        <button
          key={month}
          ref={index === currentMonthIndex ? setCurrentMonthButtonRef : setButtonRef(index)}
          id={`month-${index}`}
          type="button"
          role="option"
          aria-selected={currentMonthIndex === index}
          tabIndex={focusedIndex === index ? 0 : -1}
          onClick={() => {
            selectMonth(index);
            onClose();
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            "w-full px-3 py-1.5 text-left text-sm font-secondary",
            "transition-colors",
            currentMonthIndex === index
              ? "bg-brand text-brand-content"
              : "text-surface-content hover:bg-muted",
            "focus-visible:outline-none focus-visible:bg-muted"
          )}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

interface YearDropdownListProps {
  currentDate: Date;
  yearOptions: number[];
  selectYear: (year: number) => void;
  onClose: () => void;
}

const YearDropdownList: React.FC<YearDropdownListProps> = ({
  currentDate,
  yearOptions,
  selectYear,
  onClose,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentYearIndex = yearOptions.indexOf(currentDate.getFullYear());
  const initialIndex = currentYearIndex >= 0 ? currentYearIndex : 50;
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);
  const hasFocusedRef = useRef(false);

  // Callback ref that focuses the current year button when mounted
  const setCurrentYearButtonRef = useCallback(
    (el: HTMLButtonElement | null) => {
      buttonRefs.current[initialIndex] = el;
      if (el && !hasFocusedRef.current) {
        hasFocusedRef.current = true;
        // Use microtask to ensure the element is fully in the DOM
        queueMicrotask(() => {
          el.scrollIntoView({ block: "nearest" });
          el.focus();
        });
      }
    },
    [initialIndex]
  );

  // Regular ref callback for other buttons
  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el;
    },
    []
  );

  // Focus the button when focusedIndex changes (keyboard navigation)
  useLayoutEffect(() => {
    const button = buttonRefs.current[focusedIndex];
    if (button) {
      button.scrollIntoView({ block: "nearest" });
      button.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, year: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < yearOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : yearOptions.length - 1
        );
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectYear(year);
        onClose();
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(yearOptions.length - 1);
        break;
      case "PageDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          Math.min(prev + 10, yearOptions.length - 1)
        );
        break;
      case "PageUp":
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 10, 0));
        break;
      case "Tab":
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Years"
      aria-activedescendant={`year-${focusedIndex}`}
      className={cn(
        "absolute top-full left-0 mt-1 z-10",
        "bg-surface border border-border rounded-control shadow-elevated",
        "py-1 max-h-64 overflow-y-auto",
        "min-w-24"
      )}
    >
      {yearOptions.map((year, index) => (
        <button
          key={year}
          ref={index === initialIndex ? setCurrentYearButtonRef : setButtonRef(index)}
          id={`year-${index}`}
          type="button"
          role="option"
          aria-selected={currentDate.getFullYear() === year}
          tabIndex={focusedIndex === index ? 0 : -1}
          onClick={() => {
            selectYear(year);
            onClose();
          }}
          onKeyDown={(e) => handleKeyDown(e, year)}
          className={cn(
            "w-full px-3 py-1.5 text-left text-sm font-secondary",
            "transition-colors",
            currentDate.getFullYear() === year
              ? "bg-brand text-brand-content"
              : "text-surface-content hover:bg-muted",
            "focus-visible:outline-none focus-visible:bg-muted"
          )}
        >
          {year}
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// Calendar Component
// ============================================================================

export interface DatePickerCalendarProps
  extends HTMLAttributes<HTMLDivElement> {}

const DatePickerCalendar = forwardRef<
  HTMLDivElement,
  DatePickerCalendarProps
>(({ className, children, ...props }, ref) => {
  const {
    mode,
    selectedDate,
    selectedRange,
    currentDate,
    open,
    setOpen,
    setSelectedDate,
    setSelectedRange,
    goToMonth,
    goToYear,
    selectMonth,
    selectYear,
    isDateDisabled,
    rangeHoverDate,
    setRangeHoverDate,
    focusedDate,
    setFocusedDate,
    calendarRef,
    triggerRef,
    monthDropdownOpen,
    setMonthDropdownOpen,
    yearDropdownOpen,
    setYearDropdownOpen,
  } = useDatePicker();

  // Position state for fixed positioning
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [calculatedSide, setCalculatedSide] = useState<"top" | "bottom">(
    "bottom"
  );

  // Refs for date buttons (for keyboard navigation)
  const dateButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Generate calendar days
  const days = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Generate year options (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 101 },
    (_, i) => currentYear - 50 + i
  );

  // Update position (similar to popover.tsx)
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !calendarRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = calendarRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const sideOffset = 8;

    let top = 0;
    let left = 0;
    let side: "top" | "bottom" = "bottom";

    // Determine if we should flip to top
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (spaceBelow < contentRect.height + sideOffset && spaceAbove > spaceBelow) {
      side = "top";
      top = triggerRect.top - contentRect.height - sideOffset;
    } else {
      side = "bottom";
      top = triggerRect.bottom + sideOffset;
    }

    // Horizontal alignment (start)
    left = triggerRect.left;

    // Collision detection for horizontal
    if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width - 8;
    }
    if (left < 0) {
      left = 8;
    }

    setCalculatedSide(side);
    setPosition({ top, left });
  }, [triggerRef, calendarRef]);

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (mode === "single") {
      setSelectedDate(date);
      setOpen(false);
      triggerRef.current?.focus();
    } else {
      if (!selectedRange?.startDate || selectedRange.endDate) {
        setSelectedRange({ startDate: date, endDate: null });
        setFocusedDate(date);
      } else {
        const start = selectedRange.startDate;
        if (moment(date).isBefore(moment(start), "day")) {
          setSelectedRange({ startDate: date, endDate: start });
        } else {
          setSelectedRange({ startDate: start, endDate: date });
        }
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
  };

  // Keyboard navigation for date buttons
  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
    // Don't handle keyboard navigation if a dropdown is open
    if (monthDropdownOpen || yearDropdownOpen) {
      return;
    }

    let newDate: Date | null = null;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newDate = moment(date).add(1, "day").toDate();
        break;
      case "ArrowLeft":
        e.preventDefault();
        newDate = moment(date).subtract(1, "day").toDate();
        break;
      case "ArrowDown":
        e.preventDefault();
        newDate = moment(date).add(7, "days").toDate();
        break;
      case "ArrowUp":
        e.preventDefault();
        newDate = moment(date).subtract(7, "days").toDate();
        break;
      case "Home":
        e.preventDefault();
        newDate = moment(date).startOf("month").toDate();
        break;
      case "End":
        e.preventDefault();
        newDate = moment(date).endOf("month").toDate();
        break;
      case "PageUp":
        e.preventDefault();
        newDate = moment(date).subtract(1, "month").toDate();
        break;
      case "PageDown":
        e.preventDefault();
        newDate = moment(date).add(1, "month").toDate();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isDateDisabled(date)) {
          handleDateClick(date);
        }
        return;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
    }

    if (newDate) {
      setFocusedDate(newDate);
      if (!isSameMonth(newDate, currentDate)) {
        goToMonth(moment(newDate).isBefore(moment(currentDate), "month") ? -1 : 1);
      }
    }
  };

  // Focus management - set initial focused date when calendar opens
  useEffect(() => {
    if (open) {
      const focusTarget = selectedDate || selectedRange?.startDate || new Date();
      setFocusedDate(focusTarget);
    } else {
      setFocusedDate(null);
      setRangeHoverDate(null);
      setMonthDropdownOpen(false);
      setYearDropdownOpen(false);
    }
  }, [open, selectedDate, selectedRange]);

  // Focus button when focusedDate changes (keyboard navigation or initial open)
  useLayoutEffect(() => {
    if (!focusedDate || !open || monthDropdownOpen || yearDropdownOpen) return;

    const targetIndex = days.findIndex(day => isSameDay(day, focusedDate));
    if (targetIndex >= 0 && dateButtonRefs.current[targetIndex]) {
      dateButtonRefs.current[targetIndex]?.focus();
    }
  }, [focusedDate, open, days, monthDropdownOpen, yearDropdownOpen]);

  // Positioning with double RAF pattern
  useLayoutEffect(() => {
    if (!open) return;

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePosition();
      });
    });

    window.addEventListener("scroll", updatePosition, { passive: true, capture: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  // Resize observer
  useEffect(() => {
    if (!open || !calendarRef.current) return;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(calendarRef.current);
    return () => observer.disconnect();
  }, [open, calendarRef, updatePosition]);

  // Merge refs
  const mergedRef = useMergeRefs(calendarRef, ref);

  if (!open) return null;

  return (
    <div
      ref={mergedRef}
      role="dialog"
      aria-modal="false"
      aria-label={`Select date, ${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50,
      }}
      className={cn(
        "bg-surface border border-border rounded-surface shadow-elevated",
        "p-4 w-80",
        "animate-fade-in",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className
      )}
      {...props}
    >
      {/* Header - Month/Year Navigation with Dropdowns */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          className={cn(
            "p-1.5 rounded-control transition-colors",
            "text-muted-content hover:text-surface-content",
            "hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          )}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {/* Month Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMonthDropdownOpen(!monthDropdownOpen);
                setYearDropdownOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setMonthDropdownOpen(false);
                } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  if (!monthDropdownOpen) {
                    setMonthDropdownOpen(true);
                    setYearDropdownOpen(false);
                  }
                  // When dropdown is open, arrow keys are handled by the dropdown list
                  // Focus should have been transferred to the list
                } else if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setMonthDropdownOpen(!monthDropdownOpen);
                  setYearDropdownOpen(false);
                }
              }}
              aria-haspopup="listbox"
              aria-expanded={monthDropdownOpen}
              aria-label="Select month"
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-control",
                "text-sm font-secondary text-surface-content",
                "hover:bg-muted transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                monthDropdownOpen && "bg-muted"
              )}
            >
              <span className="min-w-16 text-center">
                {MONTH_NAMES_SHORT[currentDate.getMonth()]}
              </span>
              <ChevronDownIcon className="w-3 h-3 text-muted-content" />
            </button>

            {/* Month Dropdown List */}
            {monthDropdownOpen && (
              <MonthDropdownList
                currentDate={currentDate}
                selectMonth={selectMonth}
                onClose={() => setMonthDropdownOpen(false)}
              />
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setYearDropdownOpen(!yearDropdownOpen);
                setMonthDropdownOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setYearDropdownOpen(false);
                } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  if (!yearDropdownOpen) {
                    setYearDropdownOpen(true);
                    setMonthDropdownOpen(false);
                  }
                } else if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setYearDropdownOpen(!yearDropdownOpen);
                  setMonthDropdownOpen(false);
                }
              }}
              aria-haspopup="listbox"
              aria-expanded={yearDropdownOpen}
              aria-label="Select year"
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-control",
                "text-sm font-secondary text-surface-content",
                "hover:bg-muted transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                yearDropdownOpen && "bg-muted"
              )}
            >
              <span className="min-w-12 text-center">
                {currentDate.getFullYear()}
              </span>
              <ChevronDownIcon className="w-3 h-3 text-muted-content" />
            </button>

            {/* Year Dropdown List */}
            {yearDropdownOpen && (
              <YearDropdownList
                currentDate={currentDate}
                yearOptions={yearOptions}
                selectYear={selectYear}
                onClose={() => setYearDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goToMonth(1)}
          className={cn(
            "p-1.5 rounded-control transition-colors",
            "text-muted-content hover:text-surface-content",
            "hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          )}
          aria-label="Next month"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Day Headers */}
      <div
        className="grid grid-cols-7 mb-2"
        role="row"
        aria-label="Days of the week"
      >
        {DAY_NAMES_SHORT.map((day, index) => (
          <div
            key={day}
            role="columnheader"
            aria-label={DAY_NAMES_FULL[index]}
            className="text-xs font-medium text-muted-content text-center uppercase py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        role="grid"
        aria-label="Calendar"
        className="grid grid-cols-7 gap-1"
      >
        {days.map((day, index) => {
          const isSelected =
            mode === "single"
              ? isSameDay(day, selectedDate)
              : isRangeStart(day, selectedRange) ||
                isRangeEnd(day, selectedRange);
          const isRangeStartDay = isRangeStart(day, selectedRange);
          const isRangeEndDay = isRangeEnd(day, selectedRange);
          const isInRange =
            mode === "range" && isDateInRange(day, selectedRange);
          const isHoverRange = isRangeHovered(
            day,
            selectedRange,
            rangeHoverDate
          );
          const isTodayDate = isToday(day);
          const isDisabled = isDateDisabled(day);
          const isOtherMonth = !isSameMonth(day, currentDate);
          const isFocused = isSameDay(day, focusedDate);

          return (
            <button
              key={index}
              ref={(el) => { dateButtonRefs.current[index] = el; }}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDateClick(day)}
              onKeyDown={(e) => handleDateKeyDown(e, day)}
              onMouseEnter={() => mode === "range" && setRangeHoverDate(day)}
              onMouseLeave={() => setRangeHoverDate(null)}
              onFocus={() => {
                if (!monthDropdownOpen && !yearDropdownOpen) {
                  setFocusedDate(day);
                }
              }}
              role="gridcell"
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              aria-label={formatDate(day, "dddd, MMMM D, YYYY")}
              tabIndex={isFocused ? 0 : -1}
              className={cn(
                "aspect-square relative flex items-center justify-center",
                "text-sm font-secondary rounded-control",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-focus",
                isOtherMonth
                  ? "text-muted-content/40"
                  : "text-surface-content",
                isTodayDate && !isSelected && "ring-2 ring-brand",
                isSelected && "bg-brand text-brand-content font-medium",
                isInRange && !isSelected && "bg-brand/20 text-brand",
                isHoverRange && !isSelected && "bg-brand/10 text-brand",
                isRangeStartDay &&
                  !isRangeEndDay && "rounded-r-none",
                isRangeEndDay &&
                  !isRangeStartDay && "rounded-l-none",
                isDisabled && [
                  "text-muted-content/30 cursor-not-allowed line-through",
                  "hover:bg-transparent",
                ],
                !isSelected &&
                  !isDisabled &&
                  !isInRange && "hover:bg-muted"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer with Clear button */}
      {children}
    </div>
  );
});

DatePickerCalendar.displayName = "DatePicker.Calendar";

// ============================================================================
// Calendar Footer Component
// ============================================================================

export interface DatePickerCalendarFooterProps
  extends HTMLAttributes<HTMLDivElement> {}

const DatePickerCalendarFooter = forwardRef<
  HTMLDivElement,
  DatePickerCalendarFooterProps
>(({ className, ...props }, ref) => {
  const { handleClear, selectedDate, selectedRange, mode, goToToday } =
    useDatePicker();

  const hasSelection =
    mode === "single" ? !!selectedDate : !!(selectedRange?.startDate);

  return (
    <div
      ref={ref}
      className={cn(
        "border-t border-border pt-3 mt-3",
        "flex justify-between items-center",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={goToToday}
        className={cn(
          "text-sm font-secondary",
          "text-muted-content hover:text-surface-content",
          "hover:bg-muted rounded-control px-3 py-1.5",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        )}
      >
        Today
      </button>

      {hasSelection && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "flex items-center gap-1.5",
            "text-sm font-secondary",
            "text-muted-content hover:text-surface-content",
            "hover:bg-muted rounded-control px-3 py-1.5",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          )}
        >
          <XIcon className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
});

DatePickerCalendarFooter.displayName = "DatePicker.Calendar.Footer";

// ============================================================================
// Compound Export
// ============================================================================

export const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  Trigger: DatePickerTrigger,
  Calendar: Object.assign(DatePickerCalendar, {
    Footer: DatePickerCalendarFooter,
  }),
});
