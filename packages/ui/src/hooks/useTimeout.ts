"use client";
import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, ms: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(callback, ms);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [callback, ms]);

    const clearTimeoutHandler = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return { clearTimeout: clearTimeoutHandler };
};

