// AccordionItem: container with item registration for keyboard navigation
"use client";
import React, { useContext, useEffect } from "react";
import { cn } from "../utils";
import { AccordionContext } from "./types";
import type { AccordionItemProps } from "./types";

export const AccordionItem: React.FC<AccordionItemProps> = ({
    children,
    itemId,
    className,
}) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be inside Accordion");

    const { registerItem, unregisterItem } = context;

    useEffect(() => {
        registerItem(itemId);
        return () => unregisterItem(itemId);
    }, [itemId, registerItem, unregisterItem]);

    return (
        <div
            className={cn(
                "group border-b border-border last:border-b-0",
                className
            )}
        >
            {children}
        </div>
    );
};
