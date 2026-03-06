"use client";
import React, {
    createContext,
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
    children: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
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

        const handleTabChange = (newValue: string) => {
            if (!isControlled) {
                setActiveTab(newValue);
            }
            onValueChange?.(newValue);
        };

        const contextValue: TabsContextValue = {
            activeTab: isControlled ? value! : activeTab,
            setActiveTab: handleTabChange,
            orientation,
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
    ({ className, children, ...props }, ref) => {
        const { orientation } = useTabsContext();
        const listRef = useRef<HTMLDivElement>(null);

        // Merge refs
        useEffect(() => {
            if (ref) {
                if (typeof ref === "function") {
                    ref(listRef.current);
                } else {
                    ref.current = listRef.current;
                }
            }
        }, [ref]);

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

        return (
            <div
                ref={listRef}
                role="tablist"
                aria-orientation={orientation}
                className={cn(
                    "inline-flex items-center",
                    orientation === "horizontal"
                        ? "border-b border-ground-200 dark:border-ground-700"
                        : "flex-col border-r border-ground-200 dark:border-ground-700 pr-4 min-w-[160px]",
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
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    orientation === "horizontal"
                        ? cn(
                            "border-b-2 -mb-px",
                            isActive
                                ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                                : "border-transparent text-ground-600 hover:text-ground-900 dark:text-ground-400 dark:hover:text-ground-200"
                        )
                        : cn(
                            "w-full text-left rounded",
                            isActive
                                ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400"
                                : "text-ground-600 hover:bg-ground-50 dark:text-ground-400 dark:hover:bg-ground-800/50"
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
        const { activeTab } = useTabsContext();
        const isActive = activeTab === value;

        if (!isActive && !forceMount) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                aria-labelledby={`tab-${value}`}
                id={`tabpanel-${value}`}
                tabIndex={0}
                data-state={isActive ? "active" : "inactive"}
                hidden={!isActive && forceMount}
                className={cn(
                    "mt-4 focus:outline-none animate-fade-in",
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