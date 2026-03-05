"use client";
import { useState, useEffect, useRef } from "react";

interface UseCountdownOptions {
    seconds: number;
    interval?: number;
    onTick?: (timeLeft: number) => void;
    onComplete?: () => void;
}

export const useCountdown = ({
    seconds,
    interval = 1000,
    onTick,
    onComplete,
}: UseCountdownOptions) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    if (onTick) onTick(newTime);
                    if (newTime <= 0) {
                        clearInterval(intervalRef.current!);
                        setIsRunning(false);
                        if (onComplete) onComplete();
                    }
                    return newTime > 0 ? newTime : 0;
                });
            }, interval);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, timeLeft, interval, onTick, onComplete]);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const pause = () => {
        if (isRunning) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeLeft(seconds);
        setIsRunning(false);
    };

    return { timeLeft, start, pause, reset, isRunning };
};

