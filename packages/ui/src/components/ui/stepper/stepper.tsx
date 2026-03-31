// stepper.tsx
// Composition: root + wiring + compound assembly

"use client";

import {
    Children,
    createContext,
    forwardRef,
    isValidElement,
} from "react";
import { clsx } from "clsx";
import { StepIndexContext } from "./hooks";
import type { StepperRootProps } from "./types";
import { Step } from "./step";
import { StepIndicator } from "./StepperIndicator";
import { StepContent, StepTitle, StepDescription } from "./StepperContent";

// StepperContext (created here, consumed via hooks.ts)
import { StepperContext } from "./hooks";

// ============================================================================
// Root
// ============================================================================

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

                        return (
                            <StepIndexContext.Provider
                                key={index}
                                value={{
                                    index,
                                    isFirst: index === 0,
                                    isLast: index === elements.length - 1,
                                }}
                            >
                                {child}
                            </StepIndexContext.Provider>
                        );
                    })}
                </div>
            </StepperContext.Provider>
        );
    }
);
StepperRoot.displayName = "Stepper.Root";

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

export default Stepper;
export { StepperRoot, Step, StepIndicator, StepContent, StepTitle, StepDescription };
