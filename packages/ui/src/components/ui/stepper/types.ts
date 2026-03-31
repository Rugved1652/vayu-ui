// types.ts
// Types

import type { HTMLAttributes, ReactNode } from "react";

export type StepperOrientation = "horizontal" | "vertical";
export type StepperStatus = "active" | "completed" | "inactive" | "loading" | "error";

export interface StepperContextValue {
    activeStep: number;
    orientation: StepperOrientation;
    onStepClick?: (step: number) => void;
    totalSteps: number;
}

export interface StepIndexContextValue {
    index: number;
    isFirst: boolean;
    isLast: boolean;
}

export interface StepStatusContextValue {
    status: StepperStatus;
}

export interface StepperRootProps extends HTMLAttributes<HTMLDivElement> {
    activeStep: number;
    orientation?: StepperOrientation;
    onStepClick?: (step: number) => void;
}

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
    status?: StepperStatus;
}

export interface StepIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
}

export interface StepContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface StepTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface StepDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
