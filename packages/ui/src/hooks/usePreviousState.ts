"use client";
import { useEffect, useRef } from "react";

export const usePreviousState = <T>(value: T): T | undefined => {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

