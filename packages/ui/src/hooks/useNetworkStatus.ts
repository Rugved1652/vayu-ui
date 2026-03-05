"use client";
import { useState, useEffect } from "react";

export interface NetworkStatus {
    isOnline: boolean;
    offlineAt?: Date;
}

export const useNetworkStatus = (): NetworkStatus => {
    const [status, setStatus] = useState<NetworkStatus>({
        isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    });

    useEffect(() => {
        const handleOnline = () => setStatus({ isOnline: true });
        const handleOffline = () => setStatus({ isOnline: false, offlineAt: new Date() });

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return status;
};

