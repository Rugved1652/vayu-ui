"use client";
import { useState, useRef, useLayoutEffect } from "react";

export const useMeasure = () => {
    const ref = useRef<HTMLElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(([entry]) => {
            if (entry) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, ...dimensions };
};

