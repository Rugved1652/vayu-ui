"use client";
import { useEffect, useState } from "react";

export interface BatteryStatus {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    isSupported: boolean;
}

interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: (() => void) | null;
    onchargingtimechange: (() => void) | null;
    ondischargingtimechange: (() => void) | null;
    onlevelchange: (() => void) | null;
}

export const useBatteryStatus = (): BatteryStatus => {
    const [status, setStatus] = useState<BatteryStatus>({
        charging: false,
        chargingTime: 0,
        dischargingTime: Infinity,
        level: 1,
        isSupported: false,
    });

    useEffect(() => {
        let battery: BatteryManager | null = null;

        const updateStatus = (b: BatteryManager) => {
            setStatus({
                charging: b.charging,
                chargingTime: b.chargingTime,
                dischargingTime: b.dischargingTime,
                level: b.level,
                isSupported: true,
            });
        };

        const nav = navigator as Navigator & {
            getBattery?: () => Promise<BatteryManager>;
        };

        if (!nav.getBattery) {
            setStatus((prev) => ({ ...prev, isSupported: false }));
            return;
        }

        nav.getBattery().then((b) => {
            battery = b;
            updateStatus(b);

            b.addEventListener("chargingchange", () => updateStatus(b));
            b.addEventListener("chargingtimechange", () => updateStatus(b));
            b.addEventListener("dischargingtimechange", () => updateStatus(b));
            b.addEventListener("levelchange", () => updateStatus(b));
        });

        return () => {
            if (battery) {
                battery.removeEventListener("chargingchange", () => { });
                battery.removeEventListener("chargingtimechange", () => { });
                battery.removeEventListener("dischargingtimechange", () => { });
                battery.removeEventListener("levelchange", () => { });
            }
        };
    }, []);

    return status;
};

