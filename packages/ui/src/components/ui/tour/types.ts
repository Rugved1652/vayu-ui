// types.ts
// Types

import { HTMLAttributes, ReactNode } from "react";

// ============================================================================
// TourStep
// ============================================================================

interface TourStep {
    /** CSS selector for the target element. */
    target: string;
    /** Step heading. */
    title: string;
    /** Step body — string or JSX. */
    content: string | ReactNode;
    /** Popover placement relative to the target. */
    placement?: "top" | "bottom" | "left" | "right" | "center";
    /** Extra padding around the spotlight cutout. */
    spotlightPadding?: number;
    /** Block pointer events on the highlighted target. */
    disableInteraction?: boolean;
    /** Show the "Skip Tour" button for this step (default `true`). */
    showSkip?: boolean;
    /** Override the "Next" button label. */
    nextButtonText?: string;
    /** Override the "Previous" button label. */
    prevButtonText?: string;
    /** Async hook before advancing. */
    onNext?: () => void | Promise<void>;
    /** Async hook before going back. */
    onPrev?: () => void | Promise<void>;
    /** Replace the default button row entirely. */
    customButtons?: ReactNode;
}

// ============================================================================
// TourContextValue
// ============================================================================

interface TourContextValue {
    isOpen: boolean;
    currentStep: number;
    steps: TourStep[];
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    close: () => void;
    skip: () => void;
}

// ============================================================================
// TourProps
// ============================================================================

interface TourProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Array of tour steps. */
    steps: TourStep[];
    /** Controlled open state. */
    isOpen?: boolean;
    /** Called when the tour closes. */
    onClose?: () => void;
    /** Called when the last step is completed. */
    onComplete?: () => void;
    /** Called when the user skips. */
    onSkip?: () => void;
    /** Show a progress bar. */
    showProgress?: boolean;
    /** Show "1 / N" step numbers. */
    showStepNumbers?: boolean;
    /** Allow clicks through the overlay mask. */
    maskClickable?: boolean;
    /** Close on Escape key. */
    closeOnEscape?: boolean;
    /** Close when clicking the mask. */
    closeOnMaskClick?: boolean;
    /** Scroll behaviour when scrolling target into view. */
    scrollBehavior?: ScrollBehavior;
    /** Class name for the spotlight border. */
    highlightedAreaClassName?: string;
    /** Class name for the overlay mask. */
    maskClassName?: string;
}

export type { TourStep, TourContextValue, TourProps };
