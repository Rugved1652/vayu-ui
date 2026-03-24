"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { cn } from "../ui/utils";

type TabsOrientation = "horizontal" | "vertical";

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (value: string) => void;
    orientation: TabsOrientation;
    autoFocus?: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error(
            "Tabs compound components must be used within a Tabs component"
        );
    }
    return context;
};

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: TabsOrientation;
    /** Automatically move focus to the tab panel when a tab is activated */
    autoFocus?: boolean;
    children: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Accessible label for the tab list. Required for WCAG 2.2 AA compliance. */
    "aria-label"?: string;
    /** Alternative to aria-label, references an element that labels the tab list */
    "aria-labelledby"?: string;
    children: React.ReactNode;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children: React.ReactNode;
    forceMount?: boolean;
}

/**
 * Tabs Component - Compound Pattern
 * A flexible, headless-style tabbed interface component with full dark/light mode support.
 * Supports controlled/uncontrolled modes, keyboard navigation, and full accessibility (WCAG 2.2 AA).
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs>
 * ```
 */
const TabsBase = React.forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            defaultValue,
            value,
            onValueChange,
            orientation = "horizontal",
            autoFocus = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [activeTab, setActiveTab] = useState(value || defaultValue || "");
        const isControlled = value !== undefined;

        // Sync controlled value
        useEffect(() => {
            if (isControlled && value !== undefined) {
                setActiveTab(value);
            }
        }, [value, isControlled]);

        const handleTabChange = useCallback((newValue: string) => {
            if (!isControlled) {
                setActiveTab(newValue);
            }
            onValueChange?.(newValue);
        }, [isControlled, onValueChange]);

        const contextValue: TabsContextValue = {
            activeTab: isControlled ? value! : activeTab,
            setActiveTab: handleTabChange,
            orientation,
            autoFocus,
        };

        return (
            <TabsContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn(
                        "w-full",
                        orientation === "vertical" ? "flex flex-row" : "flex flex-col",
                        className
                    )}
                    data-orientation={orientation}
                    {...props}
                >
                    {children}
                </div>
            </TabsContext.Provider>
        );
    }
);

TabsBase.displayName = "Tabs";

// TabsList Component
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, children, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }, ref) => {
        const { orientation } = useTabsContext();
        const listRef = useRef<HTMLDivElement>(null);

        // Handle keyboard navigation (ARIA authoring practices)
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!listRef.current) return;

                const triggers = Array.from(
                    listRef.current.querySelectorAll(
                        '[role="tab"]:not([disabled]):not([data-disabled="true"])'
                    )
                ) as HTMLElement[];

                if (triggers.length === 0) return;

                const currentIndex = triggers.findIndex(
                    (trigger) => trigger === document.activeElement
                );

                if (currentIndex === -1) return;

                let nextIndex = currentIndex;

                const isHorizontal = orientation === "horizontal";
                const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
                const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

                switch (e.key) {
                    case nextKey:
                        e.preventDefault();
                        nextIndex = (currentIndex + 1) % triggers.length;
                        break;
                    case prevKey:
                        e.preventDefault();
                        nextIndex =
                            currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
                        break;
                    case "Home":
                        e.preventDefault();
                        nextIndex = 0;
                        break;
                    case "End":
                        e.preventDefault();
                        nextIndex = triggers.length - 1;
                        break;
                    default:
                        return;
                }

                triggers[nextIndex]?.click();
                triggers[nextIndex]?.focus();
            };

            const listElement = listRef.current;
            if (listElement) {
                listElement.addEventListener("keydown", handleKeyDown);
                return () => listElement.removeEventListener("keydown", handleKeyDown);
            }
        }, [orientation]);

        // Callback ref to merge with forwarded ref
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                listRef.current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [ref]
        );

        return (
            <div
                ref={setRefs}
                role="tablist"
                aria-orientation={orientation}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                className={cn(
                    "inline-flex items-center",
                    orientation === "horizontal"
                        ? "border-b border-border"
                        : "flex-col border-r border-border pr-4 min-w-40",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsList.displayName = "Tabs.List";

// TabsTrigger Component
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

// TabsContent Component
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ value, className, children, forceMount = false, ...props }, ref) => {
        const { activeTab, autoFocus } = useTabsContext();
        const panelRef = useRef<HTMLDivElement>(null);
        const isActive = activeTab === value;

        // Auto-focus the panel when it becomes active (if autoFocus is enabled)
        useEffect(() => {
            if (isActive && autoFocus && panelRef.current) {
                // Small delay to ensure the panel is visible
                const timer = setTimeout(() => {
                    panelRef.current?.focus();
                }, 0);
                return () => clearTimeout(timer);
            }
        }, [isActive, autoFocus]);

        // Callback ref to merge with forwarded ref
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                panelRef.current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [ref]
        );

        if (!isActive && !forceMount) {
            return null;
        }

        return (
            <div
                ref={setRefs}
                role="tabpanel"
                aria-labelledby={`tab-${value}`}
                id={`tabpanel-${value}`}
                tabIndex={isActive ? 0 : undefined}
                data-state={isActive ? "active" : "inactive"}
                hidden={!isActive && forceMount}
                className={cn(
                    "mt-4 focus:outline-none",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

TabsContent.displayName = "Tabs.Content";

// Attach compound components (using type assertion to allow property assignment)
(TabsBase as any).List = TabsList;
(TabsBase as any).Trigger = TabsTrigger;
(TabsBase as any).Content = TabsContent;

// Create properly typed Tabs component with compound components
const Tabs = TabsBase as React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
> & {
    List: typeof TabsList;
    Trigger: typeof TabsTrigger;
    Content: typeof TabsContent;
};

export default Tabs;