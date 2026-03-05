"use client";
import { useEffect, useRef } from "react";

export const useIntervalWhen = (
    callback: () => void,
    ms: number,
    when: boolean,
    startImmediately: boolean = false
) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!when) return;

        if (startImmediately) {
            savedCallback.current();
        }

        const interval = setInterval(() => {
            savedCallback.current();
        }, ms);

        return () => clearInterval(interval);
    }, [ms, when, startImmediately]);
};

