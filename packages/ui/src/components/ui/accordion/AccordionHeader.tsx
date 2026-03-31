// AccordionHeader: clickable trigger with keyboard navigation (arrows, Home, End, Escape)
"use client";
import React, { useContext } from "react";
import { cn } from "../utils";
import { ChevronDownIcon } from "../../icons/chevron-down-icon";
import { AccordionContext } from "./types";
import type { AccordionHeaderProps } from "./types";

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    children,
    itemId,
    className,
}) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionHeader must be inside Accordion");

    const { isItemOpen, toggleItem, itemIds, moveFocusToPanel } = context;
    const isOpen = isItemOpen(itemId);

    const headerId = `accordion-header-${itemId}`;
    const panelId = `accordion-panel-${itemId}`;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const currentIndex = itemIds.indexOf(itemId);
        let nextIndex: number | null = null;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                nextIndex = (currentIndex + 1) % itemIds.length;
                break;
            case "ArrowUp":
                e.preventDefault();
                nextIndex =
                    (currentIndex - 1 + itemIds.length) % itemIds.length;
                break;
            case "Home":
                e.preventDefault();
                nextIndex = 0;
                break;
            case "End":
                e.preventDefault();
                nextIndex = itemIds.length - 1;
                break;
            case "Escape":
                if (isOpen) {
                    e.preventDefault();
                    toggleItem(itemId);
                }
                break;
        }

        if (nextIndex !== null) {
            const nextId = itemIds[nextIndex];
            const nextButton = document.getElementById(
                `accordion-header-${nextId}`
            );
            nextButton?.focus();
        }
    };

    return (
        <h3 className="rounded-surface">
            <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                    toggleItem(itemId);
                    if (!isOpen) {
                        setTimeout(() => moveFocusToPanel(itemId), 300);
                    }
                }}
                onKeyDown={handleKeyDown}
                className={cn(
                    "outline-none",
                    "w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-200",
                    "font-secondary font-medium text-surface-content",
                    "hover:bg-muted",
                    "focus:outline-none focus:ring-2 first:focus:rounded-t-surface focus:ring-inset focus:ring-focus",
                    "rounded-surface",
                    isOpen ? "bg-muted" : "",
                    className
                )}
            >
                <span className="flex-1">{children}</span>
                <span
                    aria-hidden="true"
                    className={cn(
                        "ml-3 shrink-0 text-muted-content transition-transform duration-300",
                        isOpen ? "rotate-180 text-brand" : ""
                    )}
                >
                    <ChevronDownIcon />
                </span>
            </button>
        </h3>
    );
};
