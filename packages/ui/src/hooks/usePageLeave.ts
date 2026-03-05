"use client";
import { useEffect } from "react";

export const usePageLeave = (callback: () => void) => {
    useEffect(() => {
        const handleMouseOut = (event: MouseEvent) => {
            if (!event.relatedTarget && event.clientY <= 0) {
                callback();
            }
        };

        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [callback]);
};

