// tabs-trigger.tsx
// UI: tab trigger button

"use client";
import React from "react";
import { cn } from "../utils";
import { useTabsContext } from "./context";
import type { TabsTriggerProps } from "./types";

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, disabled = false, className, children, ...props }, ref) => {
        const { activeTab, setActiveTab, orientation } = useTabsContext();

        const isActive = activeTab === value;

        const handleClick = () => {
            if (!disabled) {
                setActiveTab(value);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
            }
        };

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={disabled}
                aria-controls={`tabpanel-${value}`}
                data-state={isActive ? "active" : "inactive"}
                data-disabled={disabled}
                id={`tab-${value}`}
                tabIndex={isActive ? 0 : -1}
                disabled={disabled}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cn(
                    "px-4 py-2 text-sm font-medium transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    orientation === "horizontal"
                        ? cn(
                              "border-b-2 -mb-px",
                              isActive
                                  ? "border-brand text-brand"
                                  : "border-transparent text-muted-content hover:text-canvas-content"
                          )
                        : cn(
                              "w-full text-left rounded",
                              isActive
                                  ? "bg-brand/10 text-brand"
                                  : "text-muted-content hover:bg-muted"
                          ),
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

TabsTrigger.displayName = "Tabs.Trigger";

export default TabsTrigger;
