"use client";

import { Check } from "lucide-react";
import {
    Children,
    cloneElement,
    createContext,
    forwardRef,
    HTMLAttributes,
    isValidElement,
    ReactNode,
    useContext,
    useCallback,
} from "react";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

type StepperOrientation = "horizontal" | "vertical";
type StepperStatus = "active" | "completed" | "inactive" | "loading" | "error";

interface StepperContextValue {
    activeStep: number;
    orientation: StepperOrientation;
    onStepClick?: (step: number) => void;
    totalSteps: number;
}

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

// Custom hook for type-safe context access
function useStepperContext() {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error("Stepper components must be used within a Stepper.Root");
    }
    return context;
}

// ============================================================================
// Helper Functions
// ============================================================================

function getStatus(activeStep: number, stepIndex: number, propStatus?: StepperStatus): StepperStatus {
    if (propStatus) return propStatus;
    if (activeStep > stepIndex) return "completed";
    if (activeStep === stepIndex) return "active";
    return "inactive";
}

// ============================================================================
// Root
// ============================================================================

interface StepperRootProps extends HTMLAttributes<HTMLDivElement> {
    activeStep: number;
    orientation?: StepperOrientation;
    onStepClick?: (step: number) => void;
}

const StepperRoot = forwardRef<HTMLDivElement, StepperRootProps>(
    ({ activeStep, orientation = "horizontal", onStepClick, className, children, ...props }, ref) => {
        const elements = Children.toArray(children);
        const totalSteps = elements.length;
        const completedSteps = Math.min(activeStep, totalSteps);

        return (
            <StepperContext.Provider value={{ activeStep, orientation, onStepClick, totalSteps }}>
                <div
                    ref={ref}
                    role="list"
                    aria-label={`Progress steps, ${completedSteps} of ${totalSteps} completed`}
                    className={clsx(
                        "flex w-full",
                        orientation === "vertical" ? "flex-col" : "flex-row items-start",
                        className
                    )}
                    {...props}
                >
                    {elements.map((child, index) => {
                        if (!isValidElement(child)) return null;
                        return cloneElement(child, {
                            index,
                            isFirst: index === 0,
                            isLast: index === elements.length - 1,
                        } as React.HTMLAttributes<HTMLDivElement>);
                    })}
                </div>
            </StepperContext.Provider>
        );
    }
);
StepperRoot.displayName = "Stepper.Root";

// ============================================================================
// Step
// ============================================================================

interface StepProps extends HTMLAttributes<HTMLDivElement> {
    index?: number;
    isFirst?: boolean;
    isLast?: boolean;
    status?: StepperStatus;
}

const Step = forwardRef<HTMLDivElement, StepProps>(
    ({ index = 0, isFirst = false, isLast = false, status: propStatus, className, children, onClick, onKeyDown, ...props }, ref) => {
        const { activeStep, orientation, onStepClick, totalSteps } = useStepperContext();
        const status = getStatus(activeStep, index, propStatus);
        const isClickable = !!onStepClick;

        const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            if (onStepClick) onStepClick(index);
            onClick?.(e);
        }, [onStepClick, index, onClick]);

        const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!isClickable) {
                onKeyDown?.(e);
                return;
            }

            // Get all clickable steps for arrow navigation
            const container = e.currentTarget.parentElement;
            const clickableSteps = container?.querySelectorAll('[role="listitem"][tabindex="0"]') || [];
            const currentIndex = Array.from(clickableSteps).indexOf(e.currentTarget);

            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    onStepClick(index);
                    break;
                case "ArrowLeft":
                    if (orientation === "horizontal" && currentIndex > 0) {
                        e.preventDefault();
                        (clickableSteps[currentIndex - 1] as HTMLElement)?.focus();
                    }
                    break;
                case "ArrowRight":
                    if (orientation === "horizontal" && currentIndex < clickableSteps.length - 1) {
                        e.preventDefault();
                        (clickableSteps[currentIndex + 1] as HTMLElement)?.focus();
                    }
                    break;
                case "ArrowUp":
                    if (orientation === "vertical" && currentIndex > 0) {
                        e.preventDefault();
                        (clickableSteps[currentIndex - 1] as HTMLElement)?.focus();
                    }
                    break;
                case "ArrowDown":
                    if (orientation === "vertical" && currentIndex < clickableSteps.length - 1) {
                        e.preventDefault();
                        (clickableSteps[currentIndex + 1] as HTMLElement)?.focus();
                    }
                    break;
                case "Home":
                    e.preventDefault();
                    (clickableSteps[0] as HTMLElement)?.focus();
                    break;
                case "End":
                    e.preventDefault();
                    (clickableSteps[clickableSteps.length - 1] as HTMLElement)?.focus();
                    break;
            }
            onKeyDown?.(e);
        }, [isClickable, onStepClick, index, orientation, onKeyDown]);

        // Clone children to pass status
        const renderedChildren = Children.map(children, (child) => {
            if (!isValidElement(child)) return null;
            return cloneElement(child, { status } as React.HTMLAttributes<HTMLElement>);
        });

        // Connector color logic
        const isCompleted = status === "completed" || status === "active";
        const leftConnectorActive = index > 0 && activeStep >= index;
        const rightConnectorActive = isCompleted;

        // Horizontal connector classes
        const horizontalConnectorClasses = (isActive: boolean) => clsx(
            "h-0.5 flex-1 transition-colors duration-300",
            isActive
                ? "bg-primary-500"
                : "bg-ground-200 dark:bg-ground-700"
        );

        // Vertical connector classes
        const verticalConnectorClasses = clsx(
            "w-0.5 flex-1 min-h-[24px] transition-colors duration-300",
            isCompleted
                ? "bg-primary-500"
                : "bg-ground-200 dark:bg-ground-700"
        );

        return (
            <div
                ref={ref}
                role="listitem"
                className={clsx(
                    "group relative",
                    orientation === "horizontal" && "flex flex-col items-center flex-1 min-w-0",
                    orientation === "vertical" && "flex flex-row",
                    isClickable && "cursor-pointer",
                    className
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={isClickable ? 0 : -1}
                aria-current={status === "active" ? "step" : undefined}
                aria-posinset={index + 1}
                aria-setsize={totalSteps}
                {...props}
            >
                {/* Screen reader announcement */}
                <span className="sr-only">
                    Step {index + 1} of {totalSteps}, {status}.
                </span>

                {orientation === "horizontal" ? (
                    // === HORIZONTAL LAYOUT ===
                    <>
                        {/* Connector Row */}
                        <div className="flex items-center w-full mb-3">
                            {/* Left space - connector or invisible spacer */}
                            {isFirst ? (
                                <div className="flex-1" />
                            ) : (
                                <div className={horizontalConnectorClasses(leftConnectorActive)} />
                            )}

                            {/* Indicator */}
                            <div className="relative z-10 shrink-0">
                                {Children.map(renderedChildren, child => 
                                    isValidElement(child) && child.type === StepIndicator ? child : null
                                )}
                            </div>

                            {/* Right space - connector or invisible spacer */}
                            {isLast ? (
                                <div className="flex-1" />
                            ) : (
                                <div className={horizontalConnectorClasses(rightConnectorActive)} />
                            )}
                        </div>

                        {/* Content below indicator */}
                        <div className="w-full">
                            {Children.map(renderedChildren, child => 
                                isValidElement(child) && child.type !== StepIndicator ? child : null
                            )}
                        </div>
                    </>
                ) : (
                    // === VERTICAL LAYOUT ===
                    <>
                        {/* Left Column: Indicator + Vertical Connector */}
                        <div className="flex flex-col items-center shrink-0">
                            {Children.map(renderedChildren, child => 
                                isValidElement(child) && child.type === StepIndicator ? child : null
                            )}

                            {/* Vertical Connector - only show if not last step */}
                            {!isLast && (
                                <div className={verticalConnectorClasses} />
                            )}
                        </div>

                        {/* Right Column: Content */}
                        <div className="flex-1">
                            {Children.map(renderedChildren, child => 
                                isValidElement(child) && child.type !== StepIndicator ? child : null
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
);
Step.displayName = "Stepper.Step";

// ============================================================================
// StepIndicator
// ============================================================================

interface StepIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    status?: StepperStatus;
    icon?: ReactNode;
}

const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
    ({ status = "inactive", icon, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                aria-hidden="true"
                className={clsx(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-150 font-secondary font-semibold text-sm shrink-0",
                    // Focus ring for parent's focus-visible state
                    "group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2",
                    // Status styles with WCAG AA contrast
                    status === "active" && "border-primary-500 bg-primary-500 text-ground-950 ring-4 ring-primary-500/20",
                    status === "completed" && "border-primary-500 bg-primary-500 text-ground-950",
                    status === "inactive" && "border-ground-400 dark:border-ground-600 bg-ground-50 dark:bg-ground-900 text-ground-600 dark:text-ground-400",
                    status === "error" && "border-error-500 bg-error-500 text-white",
                    status === "loading" && "border-primary-500 text-primary-500 animate-pulse",
                    className
                )}
                {...props}
            >
                {status === "completed" && !icon && !children ? (
                    <Check className="w-5 h-5" />
                ) : status === "error" && !icon && !children ? (
                    <span className="text-lg font-bold">!</span>
                ) : (
                    children || icon
                )}
            </div>
        );
    }
);
StepIndicator.displayName = "Stepper.Indicator";

// ============================================================================
// StepContent
// ============================================================================

interface StepContentProps extends HTMLAttributes<HTMLDivElement> {
    status?: StepperStatus;
}

const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
    ({ status, className, children, ...props }, ref) => {
        const { orientation } = useStepperContext();

        // Clone children to pass status
        const renderedChildren = Children.map(children, (child) => {
            if (!isValidElement(child)) return null;
            return cloneElement(child, { status } as React.HTMLAttributes<HTMLElement>);
        });

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-col gap-1",
                    // Horizontal: Center text under indicator
                    orientation === "horizontal" && "items-center text-center",
                    // Vertical: Align text to the right of indicator, with padding
                    orientation === "vertical" && "pb-8 pl-4 pt-2 flex-1",
                    className
                )}
                {...props}
            >
                {renderedChildren}
            </div>
        );
    }
);
StepContent.displayName = "Stepper.Content";

// ============================================================================
// StepTitle
// ============================================================================

interface StepTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    status?: StepperStatus;
}

const StepTitle = forwardRef<HTMLHeadingElement, StepTitleProps>(
    ({ status = "inactive", className, children, ...props }, ref) => {
        return (
            <h3
                ref={ref}
                className={clsx(
                    "font-secondary text-sm font-semibold transition-colors duration-150",
                    // WCAG AA contrast: 4.5:1 minimum
                    (status === "active" || status === "completed")
                        ? "text-ground-900 dark:text-ground-100"
                        : "text-ground-600 dark:text-ground-400",
                    className
                )}
                {...props}
            >
                {children}
            </h3>
        );
    }
);
StepTitle.displayName = "Stepper.Title";

// ============================================================================
// StepDescription
// ============================================================================

interface StepDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    status?: StepperStatus;
}

const StepDescription = forwardRef<HTMLParagraphElement, StepDescriptionProps>(
    ({ className, children, ...props }, ref) => {
        const { orientation } = useStepperContext();

        return (
            <p
                ref={ref}
                className={clsx(
                    "font-secondary text-xs text-ground-500 dark:text-ground-400",
                    orientation === "horizontal" && "line-clamp-2",
                    className
                )}
                {...props}
            >
                {children}
            </p>
        );
    }
);
StepDescription.displayName = "Stepper.Description";

// ============================================================================
// Compound Export
// ============================================================================

const Stepper = Object.assign(StepperRoot, {
    Root: StepperRoot,
    Step: Step,
    Indicator: StepIndicator,
    Content: StepContent,
    Title: StepTitle,
    Description: StepDescription,
});

export {
    Stepper,
    StepperRoot,
    Step,
    StepIndicator,
    StepContent,
    StepTitle,
    StepDescription,
};