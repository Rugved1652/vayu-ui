"use client";
import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, storedValue]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue) {
                setStoredValue(JSON.parse(event.newValue));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    return [storedValue, setStoredValue] as const;
};

