"use client";
import { useEffect, useState, RefObject } from "react";

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

    useEffect(() => {
        if (!isOpen || !triggerRef.current) return;

        const updatePosition = () => {
            if (!triggerRef.current) return;

            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
            });
        };

        updatePosition();

        const handleUpdate = () => {
            requestAnimationFrame(updatePosition);
        };

        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        return () => {
            window.removeEventListener("scroll", handleUpdate, true);
            window.removeEventListener("resize", handleUpdate);
        };
    }, [isOpen, triggerRef]);

    return position;
};

