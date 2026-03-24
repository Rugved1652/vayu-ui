"use client";

import { clsx } from "clsx";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    SkipForward,
    Target,
    X,
} from "lucide-react";
import React, {
    createContext,
    forwardRef,
    HTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Types
// ============================================================================

interface TourStep {
    /** CSS selector for the target element. */
    target: string;
    /** Step heading. */
    title: string;
    /** Step body — string or JSX. */
    content: string | React.ReactNode;
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
    customButtons?: React.ReactNode;
}

// ============================================================================
// Context
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

const TourContext = createContext<TourContextValue | null>(null);

const useTour = () => {
    const ctx = useContext(TourContext);
    if (!ctx) throw new Error("useTour must be used within <Tour>");
    return ctx;
};

// ============================================================================
// Props
// ============================================================================

interface TourProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
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
        const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
        const [popoverPosition, setPopoverPosition] = useState({
            top: 0,
            left: 0,
        });
        const [isTransitioning, setIsTransitioning] = useState(false);

        const targetRef = useRef<Element | null>(null);
        const popoverRef = useRef<HTMLDivElement>(null);

        const maskId = useId();
        const dialogLabelId = useId();
        const liveRegionId = useId();

        const step = steps[currentStep];

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
        // Measure target
        // ----------------------------------------------------------------
        const updateTargetRect = useCallback(() => {
            if (targetRef.current) {
                setTargetRect(
                    targetRef.current.getBoundingClientRect()
                );
            }
        }, []);

        // Find & scroll to target element
        useEffect(() => {
            if (!isOpen || !step) return;

            const findTarget = () => {
                const el = document.querySelector(step.target);
                if (el) {
                    targetRef.current = el;
                    updateTargetRect();
                    el.scrollIntoView({
                        behavior: scrollBehavior,
                        block: "center",
                        inline: "center",
                    });
                }
            };

            findTarget();

            const observer = new MutationObserver(findTarget);
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            return () => observer.disconnect();
        }, [isOpen, currentStep, step, scrollBehavior, updateTargetRect]);

        // Reposition on scroll / resize
        useEffect(() => {
            if (!isOpen) return;

            updateTargetRect();

            window.addEventListener("resize", updateTargetRect, {
                passive: true,
            });
            window.addEventListener("scroll", updateTargetRect, {
                passive: true,
                capture: true,
            });

            return () => {
                window.removeEventListener("resize", updateTargetRect);
                window.removeEventListener("scroll", updateTargetRect);
            };
        }, [isOpen, currentStep, updateTargetRect]);

        // ----------------------------------------------------------------
        // Popover position
        // ----------------------------------------------------------------
        useEffect(() => {
            if (!targetRect || !popoverRef.current || !step) return;

            const pr = popoverRef.current.getBoundingClientRect();
            const pad = 16;
            const arrow = 8;
            const vPad = 16;

            let top = 0;
            let left = 0;

            const placement = step.placement ?? "bottom";

            switch (placement) {
                case "top":
                    top = targetRect.top - pr.height - pad - arrow;
                    left =
                        targetRect.left +
                        targetRect.width / 2 -
                        pr.width / 2;
                    break;
                case "bottom":
                    top = targetRect.bottom + pad + arrow;
                    left =
                        targetRect.left +
                        targetRect.width / 2 -
                        pr.width / 2;
                    break;
                case "left":
                    top =
                        targetRect.top +
                        targetRect.height / 2 -
                        pr.height / 2;
                    left = targetRect.left - pr.width - pad - arrow;
                    break;
                case "right":
                    top =
                        targetRect.top +
                        targetRect.height / 2 -
                        pr.height / 2;
                    left = targetRect.right + pad + arrow;
                    break;
                case "center":
                    top = window.innerHeight / 2 - pr.height / 2;
                    left = window.innerWidth / 2 - pr.width / 2;
                    break;
            }

            // Viewport clamping
            if (left < vPad) left = vPad;
            if (left + pr.width > window.innerWidth - vPad)
                left = window.innerWidth - pr.width - vPad;
            if (top < vPad) top = vPad;
            if (top + pr.height > window.innerHeight - vPad)
                top = window.innerHeight - pr.height - vPad;

            setPopoverPosition({ top, left });
        }, [targetRect, step]);

        // ----------------------------------------------------------------
        // Actions (useCallback to avoid stale closures)
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

        // Arrow CSS per placement
        const arrowStyles: Record<string, React.CSSProperties> = {
            bottom: {
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                borderBottom: "none",
                borderRight: "none",
            },
            top: {
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                borderTop: "none",
                borderLeft: "none",
            },
            left: {
                right: "-10px",
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
                borderLeft: "none",
                borderBottom: "none",
            },
            right: {
                left: "-10px",
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
                borderRight: "none",
                borderTop: "none",
            },
        };

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
                    <div className="fixed inset-0 z-[9999]">
                        {/* Overlay mask */}
                        <div
                            className={clsx("absolute inset-0", maskClassName)}
                            style={{
                                pointerEvents: maskClickable
                                    ? "none"
                                    : "auto",
                            }}
                            onClick={
                                closeOnMaskClick ? close : undefined
                            }
                            aria-hidden="true"
                        >
                            <svg
                                className="absolute inset-0 w-full h-full"
                                style={{ pointerEvents: "none" }}
                                aria-hidden="true"
                            >
                                <defs>
                                    <mask id={maskId}>
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill="white"
                                        />
                                        {targetRect &&
                                            placement !== "center" && (
                                                <rect
                                                    x={
                                                        targetRect.left -
                                                        spotlightPad
                                                    }
                                                    y={
                                                        targetRect.top -
                                                        spotlightPad
                                                    }
                                                    width={
                                                        targetRect.width +
                                                        spotlightPad * 2
                                                    }
                                                    height={
                                                        targetRect.height +
                                                        spotlightPad * 2
                                                    }
                                                    rx="8"
                                                    fill="black"
                                                />
                                            )}
                                    </mask>
                                </defs>
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="rgba(0, 0, 0, 0.7)"
                                    mask={`url(#${maskId})`}
                                    className="animate-in fade-in duration-300"
                                />
                            </svg>

                            {/* Spotlight border */}
                            {targetRect && placement !== "center" && (
                                <div
                                    className={clsx(
                                        "absolute border-2 border-brand rounded-surface pointer-events-none",
                                        "animate-in fade-in zoom-in-95 duration-300",
                                        highlightedAreaClassName
                                    )}
                                    style={{
                                        top:
                                            targetRect.top -
                                            spotlightPad,
                                        left:
                                            targetRect.left -
                                            spotlightPad,
                                        width:
                                            targetRect.width +
                                            spotlightPad * 2,
                                        height:
                                            targetRect.height +
                                            spotlightPad * 2,
                                        boxShadow:
                                            "0 0 0 4px rgb(from var(--brand) r g b / 0.2)",
                                    }}
                                />
                            )}
                        </div>

                        {/* Popover dialog */}
                        <div
                            ref={popoverRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={dialogLabelId}
                            className={clsx(
                                "absolute bg-elevated rounded-overlay shadow-elevated",
                                "border-2 border-border max-w-md w-full",
                                "animate-in fade-in zoom-in-95 duration-300 transition-opacity",
                                isTransitioning
                                    ? "opacity-0"
                                    : "opacity-100"
                            )}
                            style={{
                                top: `${popoverPosition.top}px`,
                                left: `${popoverPosition.left}px`,
                                pointerEvents: "auto",
                            }}
                        >
                            {/* Arrow */}
                            {placement !== "center" &&
                                arrowStyles[placement] && (
                                    <div
                                        className="absolute w-4 h-4 bg-elevated border-2 border-border rotate-45"
                                        style={arrowStyles[placement]}
                                        aria-hidden="true"
                                    />
                                )}

                            {/* Header */}
                            <div className="flex items-start justify-between p-6 pb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {showStepNumbers && (
                                            <span className="px-2 py-0.5 bg-brand/10 text-brand rounded-control text-xs font-secondary font-bold">
                                                {currentStep + 1} /{" "}
                                                {steps.length}
                                            </span>
                                        )}
                                        <Target
                                            className="w-5 h-5 text-brand"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3
                                        id={dialogLabelId}
                                        className="text-xl font-primary font-bold text-elevated-content"
                                    >
                                        {step.title}
                                    </h3>
                                </div>
                                <button
                                    onClick={close}
                                    className="shrink-0 p-1 rounded-control hover:bg-muted transition-colors text-muted-content"
                                    aria-label="Close tour"
                                >
                                    <X
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 pb-4">
                                {typeof step.content === "string" ? (
                                    <p className="font-secondary text-elevated-content/80 leading-relaxed">
                                        {step.content}
                                    </p>
                                ) : (
                                    step.content
                                )}
                            </div>

                            {/* Progress bar */}
                            {showProgress && (
                                <div
                                    className="px-6 pb-4"
                                    role="progressbar"
                                    aria-valuenow={currentStep + 1}
                                    aria-valuemin={1}
                                    aria-valuemax={steps.length}
                                    aria-label={`Tour progress: step ${currentStep + 1} of ${steps.length}`}
                                >
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-brand to-brand/80 transition-all duration-300"
                                            style={{
                                                width: `${((currentStep + 1) / steps.length) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between p-6 pt-0 border-t-2 border-border mt-4">
                                <div className="flex items-center gap-2">
                                    {step.showSkip !== false &&
                                        !isLast && (
                                            <button
                                                onClick={skip}
                                                className="px-3 py-1.5 text-sm font-secondary font-medium text-muted-content hover:text-elevated-content transition-colors flex items-center gap-1"
                                                aria-label="Skip tour"
                                            >
                                                <SkipForward
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                />
                                                Skip Tour
                                            </button>
                                        )}
                                </div>

                                {step.customButtons || (
                                    <div className="flex items-center gap-2">
                                        {!isFirst && (
                                            <button
                                                onClick={prevStep}
                                                className="px-4 py-2 bg-muted text-elevated-content rounded-control hover:bg-muted/80 font-secondary font-medium transition-colors flex items-center gap-1"
                                                aria-label={
                                                    step.prevButtonText ??
                                                    "Previous step"
                                                }
                                            >
                                                <ChevronLeft
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                />
                                                {step.prevButtonText ??
                                                    "Previous"}
                                            </button>
                                        )}
                                        <button
                                            onClick={nextStep}
                                            className="px-4 py-2 bg-brand text-brand-content rounded-control hover:bg-brand/90 font-secondary font-medium transition-colors flex items-center gap-1"
                                            aria-label={
                                                isLast
                                                    ? "Finish tour"
                                                    : (step.nextButtonText ??
                                                        "Next step")
                                            }
                                        >
                                            {isLast ? (
                                                <>
                                                    <Check
                                                        className="w-4 h-4"
                                                        aria-hidden="true"
                                                    />
                                                    Finish
                                                </>
                                            ) : (
                                                <>
                                                    {step.nextButtonText ??
                                                        "Next"}
                                                    <ChevronRight
                                                        className="w-4 h-4"
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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

export { Tour, useTour };
export type { TourContextValue, TourProps, TourStep };
