// calendar.tsx
// Composition: calendar popup with grid, positioning, keyboard navigation

"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  forwardRef,
  HTMLAttributes,
  useCallback,
} from "react";
import moment from "moment";
import { cn } from "../utils";
import { useDatePicker, useMergeRefs } from "./DatePicker";
import type { DatePickerCalendarProps } from "./types";
import {
  getMonthDays,
  isSameDay,
  isSameMonth,
  isToday,
  formatDate,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  isRangeHovered,
  DAY_NAMES_SHORT,
  DAY_NAMES_FULL,
  MONTH_NAMES_SHORT,
} from "./utils";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "./DatePickerIcons";
import { MonthDropdownList, YearDropdownList } from "./DatePickerDropDowns";

export const DatePickerCalendar = forwardRef<
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

  // Update position
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

    if (
      spaceBelow < contentRect.height + sideOffset &&
      spaceAbove > spaceBelow
    ) {
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
  const handleDateKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    date: Date
  ) => {
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
        goToMonth(
          moment(newDate).isBefore(moment(currentDate), "month") ? -1 : 1
        );
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

  // Focus button when focusedDate changes
  useLayoutEffect(() => {
    if (!focusedDate || !open || monthDropdownOpen || yearDropdownOpen) return;

    const targetIndex = days.findIndex((day) => isSameDay(day, focusedDate));
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

    window.addEventListener("scroll", updatePosition, {
      passive: true,
      capture: true,
    });
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
      aria-label={`Select date, ${MONTH_NAMES_SHORT[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
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
      <div role="grid" aria-label="Calendar" className="grid grid-cols-7 gap-1">
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
              ref={(el) => {
                dateButtonRefs.current[index] = el;
              }}
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
                isRangeStartDay && !isRangeEndDay && "rounded-r-none",
                isRangeEndDay && !isRangeStartDay && "rounded-l-none",
                isDisabled && [
                  "text-muted-content/30 cursor-not-allowed line-through",
                  "hover:bg-transparent",
                ],
                !isSelected && !isDisabled && !isInRange && "hover:bg-muted"
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
