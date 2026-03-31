// use-target.ts
// Logic: target finding, MutationObserver, scroll/resize repositioning

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TourStep } from "./types";

interface UseTourTargetOptions {
    isOpen: boolean;
    step: TourStep | undefined;
    currentStep: number;
    scrollBehavior: ScrollBehavior;
}

const useTourTarget = ({
    isOpen,
    step,
    currentStep,
    scrollBehavior,
}: UseTourTargetOptions) => {
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const targetRef = useRef<Element | null>(null);

    const updateTargetRect = useCallback(() => {
        if (targetRef.current) {
            setTargetRect(targetRef.current.getBoundingClientRect());
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

    return { targetRef, targetRect };
};

export { useTourTarget };
