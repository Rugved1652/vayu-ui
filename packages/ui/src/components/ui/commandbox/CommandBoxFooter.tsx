// footer.tsx
// UI: Keyboard hints footer

"use client";

import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import React, { forwardRef } from "react";

export const CommandBoxFooter = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="border-t border-neutral-200 dark:border-neutral-700 px-4 py-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-secondary bg-neutral-50/50 dark:bg-neutral-900/30"
            aria-hidden="true"
            {...props}
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    <ArrowDown className="w-3 h-3" />
                    <span>navigate</span>
                </div>
                <div className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3" />
                    <span>select</span>
                </div>
                <div className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-neutral-100 border border-neutral-300 rounded-sm dark:bg-neutral-700 dark:border-neutral-600 font-secondary">
                        esc
                    </kbd>
                    <span>close</span>
                </div>
            </div>
        </div>
    );
});

CommandBoxFooter.displayName = "CommandBox.Footer";
