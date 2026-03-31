// collapsible.tsx
// Composition: context + root

"use client";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    forwardRef,
} from "react";
import { cn } from "../utils";
import type { CollapsibleRootProps, CollapsibleContextType, CollapsibleContentProps, CollapsibleTriggerProps } from "./types";

// Context

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

export const useCollapsible = () => {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error("Collapsible components must be used within Collapsible.Root");
    }
    return context;
};

// Root

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
    ({ children, defaultOpen = false, open, onOpenChange, className, ...props }, ref) => {
        const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
        const idRef = useRef(`collapsible-${Math.random().toString(36).slice(2, 9)}`);

        const isControlled = open !== undefined;
        const isOpen = isControlled ? open : uncontrolledOpen;

        const toggle = useCallback(() => {
            if (isControlled) {
                onOpenChange?.(!open);
            } else {
                setUncontrolledOpen((prev) => {
                    const next = !prev;
                    onOpenChange?.(next);
                    return next;
                });
            }
        }, [isControlled, open, onOpenChange]);

        const contextValue = useMemo(
            () => ({
                isOpen,
                toggle,
                contentId: `${idRef.current}-content`,
                triggerId: `${idRef.current}-trigger`,
            }),
            [isOpen, toggle]
        );

        return (
            <CollapsibleContext.Provider value={contextValue}>
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {children}
                </div>
            </CollapsibleContext.Provider>
        );
    }
);

CollapsibleRoot.displayName = "Collapsible.Root";

const Collapsible = Object.assign(CollapsibleRoot, {
    Content: {} as React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>,
    Trigger: {} as React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>,
});

export default Collapsible;
