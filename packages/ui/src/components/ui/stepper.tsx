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
}

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

// ============================================================================
// Root
// ============================================================================

interface StepperRootProps extends HTMLAttributes<HTMLDivElement> {
    activeStep: number;
    orientation?: StepperOrientation;
    onStepClick?: (step: number) => void;
}

const StepperRoot = forwardRef<HTMLDivElement, StepperRootProps>(
    (
        {
            activeStep,
            orientation = "horizontal",
            onStepClick,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const elements = Children.toArray(children);

        return (
            <StepperContext.Provider
                value={{ activeStep, orientation, onStepClick }}
            >
                <div
                    ref={ref}
                    role="list"
                    aria-label="Progress steps"
                    className={clsx(
                        "flex w-full gap-2",
                        orientation === "vertical" ? "flex-col" : "flex-row",
                        className
                    )}
                    {...props}
                >
                    {elements.map((child, index) => {
                        if (!isValidElement(child)) return null;
                        return cloneElement(child, {
                            // @ts-ignore
                            index,
                            isLast: index === elements.length - 1,
                        });
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
    isLast?: boolean;
    status?: StepperStatus;
}

const Step = forwardRef<HTMLDivElement, StepProps>(
    (
        {
            index = 0,
            isLast = false,
            status: propStatus,
            className,
            children,
            onClick,
            onKeyDown,
            ...props
        },
        ref
    ) => {
        const { activeStep, orientation, onStepClick } = useContext(StepperContext)!;

        // Derive status if not explicitly provided
        let status: StepperStatus = propStatus || "inactive";
        if (!propStatus) {
            if (activeStep > index) status = "completed";
            else if (activeStep === index) status = "active";
            else status = "inactive";
        }

        const isClickable = !!onStepClick;

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (onStepClick) {
                onStepClick(index);
            }
            onClick?.(e);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (isClickable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onStepClick?.(index);
            }
            onKeyDown?.(e);
        };

        return (
            <div
                ref={ref}
                role="listitem"
                className={clsx(
                    "relative flex",
                    orientation === "vertical" ? "flex-col" : "items-center flex-1",
                    !isLast && orientation === "horizontal" && "flex-1",
                    isClickable && "cursor-pointer",
                    className
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={isClickable ? 0 : -1}
                aria-current={status === "active" ? "step" : undefined}
                aria-label={`Step ${index + 1}${status === "active" ? ", current" : status === "completed" ? ", completed" : ""}`}
                {...props}
            >
                {/* Horizontal Connector Line */}
                {!isLast && orientation === "horizontal" && (
                    <div
                        className={clsx(
                            "absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 -translate-y-1/2 transition-colors duration-300",
                            status === "completed"
                                ? "bg-primary-500"
                                : "bg-ground-200 dark:bg-ground-800"
                        )}
                        aria-hidden="true"
                    />
                )}

                <div
                    className={clsx(
                        "flex",
                        orientation === "vertical" ? "flex-row gap-4" : "flex-col items-center gap-2"
                    )}
                >
                    {/* Render children with context props */}
                    {Children.map(children, (child) => {
                        if (!isValidElement(child)) return null;
                        return cloneElement(child, {
                            // @ts-ignore
                            status,
                        });
                    })}
                </div>

                {/* Vertical Connector Line */}
                {!isLast && orientation === "vertical" && (
                    <div
                        className={clsx(
                            "absolute left-5 top-10 bottom-0 w-0.5 -translate-x-1/2 my-2 transition-colors duration-300",
                            status === "completed"
                                ? "bg-primary-500"
                                : "bg-ground-200 dark:bg-ground-800"
                        )}
                        aria-hidden="true"
                    />
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
    ({ status, icon, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                aria-hidden="true"
                className={clsx(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 font-secondary font-semibold text-sm",
                    // Focus ring for parent's focus-visible state
                    "group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2",
                    status === "active" && "border-primary-500 bg-primary-500 text-ground-950 ring-4 ring-primary-500/20",
                    status === "completed" && "border-primary-500 bg-primary-500 text-ground-950",
                    status === "inactive" && "border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900 text-ground-500 dark:text-ground-400",
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
// StepContent (Label + Description)
// ============================================================================

interface StepContentProps extends HTMLAttributes<HTMLDivElement> {
    status?: StepperStatus;
}

const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
    ({ status, className, children, ...props }, ref) => {
        const { orientation } = useContext(StepperContext)!;
        return (
            <div
                ref={ref}
                className={clsx(
                    "flex flex-col",
                    orientation === "horizontal" && "items-center text-center",
                    orientation === "vertical" && "pt-1 pb-6",
                    className
                )}
                {...props}
            >
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) return null;
                    return cloneElement(child, {
                        // @ts-ignore
                        status,
                    });
                })}
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
    ({ status, className, children, ...props }, ref) => {
        return (
            <h3
                ref={ref}
                className={clsx(
                    "font-secondary text-sm font-semibold transition-colors duration-200",
                    status === "active" ? "text-ground-900 dark:text-ground-100" : "text-ground-600 dark:text-ground-400",
                    status === "completed" && "text-ground-900 dark:text-ground-100",
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
    ({ status, className, children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={clsx(
                    "font-secondary text-xs text-ground-500 dark:text-ground-400 max-w-[200px]",
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
