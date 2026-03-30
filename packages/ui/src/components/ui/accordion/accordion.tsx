// Root Accordion: state management, context provider, compound component composition
"use client";
import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { AccordionProps, AccordionContext, AccordionContextType } from "./types";
import { AccordionItem } from "./accordion-item";
import { AccordionHeader } from "./accordion-header";
import { AccordionBody } from "./accordion-body";
import { cn } from "../utils";

const Accordion: React.FC<AccordionProps> & {
    Item: typeof AccordionItem;
    Header: typeof AccordionHeader;
    Body: typeof AccordionBody;
} = ({ children, allowMultiple = false, className }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [itemIds, setItemIds] = useState<string[]>([]);
    const panelRefs = useRef<Map<string, React.RefObject<HTMLDivElement | null>>>(
        new Map()
    );
    const firstFocusableRef = useRef<HTMLDivElement | null>(null);

    const toggleItem = useCallback((id: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            const wasOpen = next.has(id);

            if (wasOpen) {
                const panelRef = panelRefs.current.get(id);
                if (panelRef?.current) {
                    const activeElement = document.activeElement;
                    if (
                        panelRef.current.contains(activeElement) &&
                        activeElement instanceof HTMLElement
                    ) {
                        const headerId = `accordion-header-${id}`;
                        const headerButton = document.getElementById(headerId);
                        setTimeout(() => headerButton?.focus(), 0);
                    }
                }
                next.delete(id);
            } else {
                if (!allowMultiple) next.clear();
                next.add(id);
            }
            return next;
        });
    }, [allowMultiple]);

    const isItemOpen = useCallback((id: string) => openItems.has(id), [openItems]);

    const registerItem = useCallback((id: string) => {
        setItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const unregisterItem = useCallback((id: string) => {
        setItemIds((prev) => prev.filter((itemId) => itemId !== id));
    }, []);

    const registerPanel = useCallback((
        id: string,
        ref: React.RefObject<HTMLDivElement | null>
    ) => {
        panelRefs.current.set(id, ref);
    }, []);

    const unregisterPanel = useCallback((id: string) => {
        panelRefs.current.delete(id);
    }, []);

    const moveFocusToPanel = useCallback((id: string) => {
        const panelRef = panelRefs.current.get(id);
        if (panelRef?.current) {
            const focusableElements = panelRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0] as HTMLElement;
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }, []);

    const contextValue = useMemo(() => ({
        isItemOpen,
        toggleItem,
        itemIds,
        registerItem,
        unregisterItem,
        registerPanel,
        unregisterPanel,
        firstFocusableRef,
        moveFocusToPanel,
    }), [isItemOpen, toggleItem, itemIds, registerItem, unregisterItem, registerPanel, unregisterPanel, moveFocusToPanel]);

    return (
        <AccordionContext.Provider value={contextValue}>
            <div
                className={cn(
                    "border border-border rounded-surface overflow-hidden bg-surface",
                    className
                )}
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export type { AccordionProps, AccordionItemProps, AccordionHeaderProps, AccordionBodyProps, AccordionContextType } from "./types";
export { Accordion };
export default Accordion;
export { AccordionItem } from "./accordion-item";
export { AccordionHeader } from "./accordion-header";
export { AccordionBody } from "./accordion-body";
