// footer.tsx
// UI: TimepickerFooter, TimepickerError

"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { useTimepicker } from "./TimePicker";
import type { TimeRange } from "./types";
import { isValidTimeRange } from "./utils";

// ============================================================================
// Footer
// ============================================================================

const TimepickerFooter: React.FC<{ children?: React.ReactNode; className?: string }> = ({
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

const TimepickerError: React.FC<{ children?: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
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

export { TimepickerFooter, TimepickerError };
