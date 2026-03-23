"use client";
import React, {
    useContext,
    useState,
    useRef,
    useEffect,
    createContext,
    useCallback,
    useMemo,
} from "react";
import { cn } from "./utils";
import { ChevronDownIcon } from "../icons/chevron-down-icon";


/* ---------------- TYPES ---------------- */

type AccordionProps = {
    children: React.ReactNode;
    allowMultiple?: boolean;
    className?: string;
};

type AccordionItemProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

type AccordionHeaderProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

type AccordionBodyProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

type AccordionContextType = {
    isItemOpen: (id: string) => boolean;
    toggleItem: (id: string) => void;
    itemIds: string[];
    registerItem: (id: string) => void;
    unregisterItem: (id: string) => void;
    registerPanel: (id: string, ref: React.RefObject<HTMLDivElement | null>) => void;
    unregisterPanel: (id: string) => void;
    firstFocusableRef: React.RefObject<HTMLDivElement | null>;
    moveFocusToPanel: (id: string) => void;
};

/* ---------------- CONTEXT ---------------- */

const AccordionContext = createContext<AccordionContextType | null>(null);

/* ---------------- ROOT ---------------- */

const Accordion: React.FC<AccordionProps> & {
    Item: React.FC<AccordionItemProps>;
    Header: React.FC<AccordionHeaderProps>;
    Body: React.FC<AccordionBodyProps>;
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
            // Find the first focusable element inside the panel
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

/* ---------------- ITEM ---------------- */

const AccordionItem: React.FC<AccordionItemProps> = ({
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

/* ---------------- HEADER ---------------- */

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
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
                    // Move focus to the first focusable element in the panel when opening
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

/* ---------------- BODY (Animated + Accessible) ---------------- */

const AccordionBody: React.FC<AccordionBodyProps> = ({
    children,
    itemId,
    className,
}) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionBody must be inside Accordion");

    const { isItemOpen, registerPanel, unregisterPanel } = context;
    const isOpen = isItemOpen(itemId);

    const headerId = `accordion-header-${itemId}`;
    const panelId = `accordion-panel-${itemId}`;

    const contentRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">(0);
    const [rendered, setRendered] = useState(isOpen);

    useEffect(() => {
        registerPanel(itemId, panelRef);
        return () => unregisterPanel(itemId);
    }, [itemId, registerPanel, unregisterPanel]);

    useEffect(() => {
        if (isOpen) {
            setRendered(true);
            requestAnimationFrame(() => {
                if (contentRef.current) {
                    setHeight(contentRef.current.scrollHeight);
                }
            });
        } else {
            if (contentRef.current) {
                setHeight(contentRef.current.scrollHeight);
                requestAnimationFrame(() => {
                    setHeight(0);
                });
            }
        }
    }, [isOpen]);

    const handleTransitionEnd = () => {
        if (!isOpen) {
            setRendered(false);
        } else {
            setHeight("auto");
        }
    };

    return (
        <div
            ref={panelRef}
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            aria-hidden={!isOpen}
            style={{
                height: rendered ? height : 0,
            }}
            className={cn(
                "overflow-hidden will-change-[height]",
                !isOpen && "pointer-events-none"
            )}
            onTransitionEnd={handleTransitionEnd}
            tabIndex={-1}
        >
            <div
                ref={contentRef}
                className={cn(
                    "px-5 py-3",
                    "font-secondary text-base leading-relaxed text-muted-content bg-muted",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};

/* ---------------- EXPORTS ---------------- */

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export { Accordion };
export default Accordion;
