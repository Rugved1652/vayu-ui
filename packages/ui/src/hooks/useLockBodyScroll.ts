"use client";
import { useLayoutEffect } from "react";

export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);
};

