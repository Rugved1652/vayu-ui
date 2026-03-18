"use client";
import { useEffect, useLayoutEffect, useState, RefObject, useCallback } from "react";

interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
}

export const useElementPosition = (
    triggerRef: RefObject<HTMLElement | null>,
    isOpen: boolean
): Position => {
    const [position, setPosition] = useState<Position>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });

    const updatePosition = useCallback(() => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        // For position: fixed elements, getBoundingClientRect returns viewport-relative
        // coordinates, so we don't add scroll offsets
        setPosition({
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });
    }, [triggerRef]);

    // Use useLayoutEffect for initial positioning to prevent flash
    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition();
        }
    }, [isOpen, updatePosition]);

    useEffect(() => {
        if (!isOpen || !triggerRef.current) return;

        const handleUpdate = () => {
            requestAnimationFrame(updatePosition);
        };

        // Scroll listener with capture phase to catch scroll events in nested scrollable containers
        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        // ResizeObserver to handle trigger element resize
        const resizeObserver = new ResizeObserver(handleUpdate);
        resizeObserver.observe(triggerRef.current);

        return () => {
            window.removeEventListener("scroll", handleUpdate, true);
            window.removeEventListener("resize", handleUpdate);
            resizeObserver.disconnect();
        };
    }, [isOpen, triggerRef, updatePosition]);

    return position;
};

