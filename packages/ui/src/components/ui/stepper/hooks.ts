// hooks.ts
// Logic: contexts + hooks + helpers

"use client";

import { createContext, useContext } from "react";
import type {
    StepperContextValue,
    StepIndexContextValue,
    StepStatusContextValue,
    StepperStatus,
} from "./types";

// StepperContext
export const StepperContext = createContext<StepperContextValue | undefined>(undefined);

export function useStepperContext() {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error("Stepper components must be used within a Stepper.Root");
    }
    return context;
}

// StepIndexContext
export const StepIndexContext = createContext<StepIndexContextValue | undefined>(undefined);

export function useStepIndexContext() {
    const context = useContext(StepIndexContext);
    if (!context) {
        throw new Error("Step components must be used within a Stepper.Root");
    }
    return context;
}

// StepStatusContext
export const StepStatusContext = createContext<StepStatusContextValue | undefined>(undefined);

export function useStepStatusContext() {
    const context = useContext(StepStatusContext);
    if (!context) {
        throw new Error("Step children must be used within a Stepper.Step");
    }
    return context;
}

// Helper
export function getStatus(activeStep: number, stepIndex: number, propStatus?: StepperStatus): StepperStatus {
    if (propStatus) return propStatus;
    if (activeStep > stepIndex) return "completed";
    if (activeStep === stepIndex) return "active";
    return "inactive";
}
