// tour.tsx
// Composition: UI + logic

"use client";

import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
} from "react";
import { createPortal } from "react-dom";

import type { TourContextValue, TourProps, TourStep } from "./types";
import { usePopoverPosition } from "./use-position";
import { useTourTarget } from "./use-target";
import { TourOverlay } from "./TourOverlay";
import { TourPopover } from "./TourPopover";

// ============================================================================
// Context
// ============================================================================

const TourContext = createContext<TourContextValue | null>(null);

// ============================================================================
// Tour
// ============================================================================

const TourRoot = forwardRef<HTMLDivElement, TourProps>(
    (
        {
            children,
            steps,
            isOpen: controlledIsOpen,
            onClose,
            onComplete,
            onSkip,
            showProgress = true,
            showStepNumbers = true,
            maskClickable = false,
            closeOnEscape = true,
            closeOnMaskClick = false,
            scrollBehavior = "smooth",
            highlightedAreaClassName,
            maskClassName,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
        const [currentStep, setCurrentStep] = useState(0);
        const [mounted, setMounted] = useState(false);
        const [isTransitioning, setIsTransitioning] = useState(false);

        const maskId = useId();
        const dialogLabelId = useId();
        const liveRegionId = useId();

        const step = steps[currentStep];

        // ----------------------------------------------------------------
        // Custom hooks
        // ----------------------------------------------------------------
        const { targetRect } = useTourTarget({
            isOpen,
            step,
            currentStep,
            scrollBehavior,
        });

        const { popoverRef, popoverPosition } = usePopoverPosition({
            targetRect,
            step,
        });

        // ----------------------------------------------------------------
        // Mount flag
        // ----------------------------------------------------------------
        useEffect(() => {
            setMounted(true);
        }, []);

        // Sync controlled open state
        useEffect(() => {
            if (controlledIsOpen !== undefined) setIsOpen(controlledIsOpen);
        }, [controlledIsOpen]);

        // ----------------------------------------------------------------
        // Actions
        // ----------------------------------------------------------------
        const close = useCallback(() => {
            setIsOpen(false);
            onClose?.();
        }, [onClose]);

        const skip = useCallback(() => {
            onSkip?.();
            close();
        }, [onSkip, close]);

        const goToStep = useCallback(
            (idx: number) => {
                if (idx < 0 || idx >= steps.length) return;
                setIsTransitioning(true);
                setCurrentStep(idx);
                setTimeout(() => setIsTransitioning(false), 300);
            },
            [steps.length]
        );

        const nextStep = useCallback(async () => {
            if (step?.onNext) await step.onNext();

            if (currentStep < steps.length - 1) {
                goToStep(currentStep + 1);
            } else {
                onComplete?.();
                close();
            }
        }, [step, currentStep, steps.length, goToStep, onComplete, close]);

        const prevStep = useCallback(async () => {
            if (step?.onPrev) await step.onPrev();
            if (currentStep > 0) goToStep(currentStep - 1);
        }, [step, currentStep, goToStep]);

        // ----------------------------------------------------------------
        // Keyboard
        // ----------------------------------------------------------------
        useEffect(() => {
            if (!isOpen) return;

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape" && closeOnEscape) {
                    close();
                } else if (
                    e.key === "ArrowRight" &&
                    currentStep < steps.length - 1
                ) {
                    nextStep();
                } else if (e.key === "ArrowLeft" && currentStep > 0) {
                    prevStep();
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () =>
                document.removeEventListener("keydown", handleKeyDown);
        }, [
            isOpen,
            currentStep,
            steps.length,
            closeOnEscape,
            close,
            nextStep,
            prevStep,
        ]);

        // Lock body scroll
        useEffect(() => {
            if (!isOpen) return;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "";
            };
        }, [isOpen]);

        // ----------------------------------------------------------------
        // Live-region text
        // ----------------------------------------------------------------
        const liveText = useMemo(
            () =>
                step
                    ? `Step ${currentStep + 1} of ${steps.length}: ${step.title}`
                    : "",
            [step, currentStep, steps.length]
        );

        // ----------------------------------------------------------------
        // Context
        // ----------------------------------------------------------------
        const contextValue: TourContextValue = useMemo(
            () => ({
                isOpen,
                currentStep,
                steps,
                goToStep,
                nextStep,
                prevStep,
                close,
                skip,
            }),
            [
                isOpen,
                currentStep,
                steps,
                goToStep,
                nextStep,
                prevStep,
                close,
                skip,
            ]
        );

        // ----------------------------------------------------------------
        // Not open — render children only
        // ----------------------------------------------------------------
        if (!mounted || !isOpen || !step) {
            return (
                <TourContext.Provider value={contextValue}>
                    <div ref={ref} {...props}>
                        {children}
                    </div>
                </TourContext.Provider>
            );
        }

        const spotlightPad = step.spotlightPadding ?? 8;
        const placement = step.placement ?? "bottom";
        const isLast = currentStep === steps.length - 1;
        const isFirst = currentStep === 0;

        return (
            <TourContext.Provider value={contextValue}>
                <div ref={ref} {...props}>
                    {children}
                </div>

                {/* Screen-reader live region */}
                <div
                    id={liveRegionId}
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                >
                    {liveText}
                </div>

                {createPortal(
                    <div className="fixed inset-0 z-9999">
                        <TourOverlay
                            maskId={maskId}
                            targetRect={targetRect}
                            placement={placement}
                            spotlightPadding={spotlightPad}
                            maskClassName={maskClassName}
                            maskClickable={maskClickable}
                            closeOnMaskClick={closeOnMaskClick}
                            highlightedAreaClassName={
                                highlightedAreaClassName
                            }
                            onClose={close}
                        />

                        <TourPopover
                            popoverRef={popoverRef}
                            popoverPosition={popoverPosition}
                            step={step}
                            placement={placement}
                            currentStep={currentStep}
                            stepsLength={steps.length}
                            isTransitioning={isTransitioning}
                            isFirst={isFirst}
                            isLast={isLast}
                            showProgress={showProgress}
                            showStepNumbers={showStepNumbers}
                            dialogLabelId={dialogLabelId}
                            onClose={close}
                            onSkip={skip}
                            onNext={nextStep}
                            onPrev={prevStep}
                        />
                    </div>,
                    document.body
                )}
            </TourContext.Provider>
        );
    }
);

TourRoot.displayName = "Tour";

// ============================================================================
// Exports
// ============================================================================

const Tour = TourRoot;

export default Tour;
export { Tour, TourContext };
