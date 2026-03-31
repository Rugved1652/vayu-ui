// footer.tsx
// UI: calendar footer (Today + Clear)

"use client";

import React, { forwardRef } from "react";
import { cn } from "../utils";
import { useDatePicker } from "./datepicker";
import { XIcon } from "./icons";
import type { DatePickerCalendarFooterProps } from "./types";

export const DatePickerCalendarFooter = forwardRef<
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
