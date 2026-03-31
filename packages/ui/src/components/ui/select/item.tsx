// item.tsx
// UI: Selectable option item with keyboard navigation

"use client";

import React, { useEffect, forwardRef } from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { useSelect } from "./select";
import type { SelectItemProps, SingleValue } from "./types";

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ value: itemValue, children, className, disabled, ...props }, ref) => {
        const { value, onValueChange, setOpen, multiple, search, registerOption, unregisterOption, focusInput, onSearch } = useSelect();

        const isSelected = multiple ? Array.isArray(value) && value.includes(itemValue) : value === itemValue;
        const label = typeof children === 'string' ? children : String(itemValue);

        useEffect(() => {
            registerOption({ value: itemValue, label, disabled });
            return () => unregisterOption(itemValue);
        }, [itemValue, label, disabled, registerOption, unregisterOption]);

        if (!onSearch && search) {
            const contentString = typeof children === 'string' ? children : '';
            if (!contentString.toLowerCase().includes(search.toLowerCase())) return null;
        }

        const handleSelect = () => {
            if (disabled) return;
            onValueChange(itemValue);
            if (!multiple) { setOpen(false); focusInput(); }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const list = e.currentTarget.parentElement;
                if (!list) return;
                const items = Array.from(list.querySelectorAll('[role="option"]:not([data-disabled="true"])')) as HTMLElement[];
                const currentIndex = items.indexOf(e.currentTarget as HTMLElement);
                if (e.key === "ArrowDown") (items[currentIndex + 1] || items[0])?.focus();
                else (items[currentIndex - 1] || items[items.length - 1])?.focus();
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect();
            } else if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
                focusInput();
            } else if (e.key === "Tab") {
                e.preventDefault();
                const list = e.currentTarget.parentElement;
                if (!list) return;
                const items = Array.from(list.querySelectorAll('[role="option"]:not([data-disabled="true"])')) as HTMLElement[];
                const currentIndex = items.indexOf(e.currentTarget as HTMLElement);
                if (e.shiftKey) currentIndex === 0 ? focusInput() : items[currentIndex - 1]?.focus();
                else currentIndex === items.length - 1 ? focusInput() : items[currentIndex + 1]?.focus();
            }
        };

        return (
            <div
                ref={ref}
                role="option"
                tabIndex={0}
                aria-selected={isSelected}
                data-disabled={disabled}
                onClick={handleSelect}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
                    isSelected
                        ? "bg-brand/90 text-brand-content font-medium"
                        : "text-elevated-content bg-elevated hover:text-brand-content focus:text-brand-content hover:bg-brand/90 focus:bg-brand/90",
                    disabled && "pointer-events-none opacity-50",
                    className
                )}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {isSelected && <Check className="h-4 w-4" />}
                </span>
                <span className="block truncate">{children}</span>
            </div>
        );
    }
);

SelectItem.displayName = "Select.Item";
