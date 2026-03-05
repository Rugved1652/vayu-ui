"use client";
import { useEffect, useState } from "react";

export type OSName =
    | "Windows"
    | "macOS"
    | "Linux"
    | "Android"
    | "iOS"
    | "ChromeOS"
    | "Unknown";

export type BrowserName =
    | "Chrome"
    | "Firefox"
    | "Safari"
    | "Edge"
    | "Opera"
    | "Samsung Internet"
    | "Unknown";

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceOSInfo {
    os: OSName;
    browser: BrowserName;
    deviceType: DeviceType;
    isTouchDevice: boolean;
    userAgent: string;
    isReady: boolean;
}

function detectOS(ua: string): OSName {
    if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
    if (/Android/.test(ua)) return "Android";
    if (/CrOS/.test(ua)) return "ChromeOS";
    if (/Mac OS X|Macintosh/.test(ua)) return "macOS";
    if (/Windows/.test(ua)) return "Windows";
    if (/Linux/.test(ua)) return "Linux";
    return "Unknown";
}

function detectBrowser(ua: string): BrowserName {
    if (/SamsungBrowser/i.test(ua)) return "Samsung Internet";
    if (/OPR|Opera/i.test(ua)) return "Opera";
    if (/Edg\//i.test(ua)) return "Edge";
    if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
    if (/Firefox/i.test(ua)) return "Firefox";
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
    return "Unknown";
}

function detectDeviceType(ua: string): DeviceType {
    if (/Mobi|Android.*Mobile|iPhone|iPod/i.test(ua)) return "mobile";
    if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) return "tablet";
    return "desktop";
}

function detectTouch(): boolean {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export const useDeviceOS = (): DeviceOSInfo => {
    const [info, setInfo] = useState<DeviceOSInfo>({
        os: "Unknown",
        browser: "Unknown",
        deviceType: "desktop",
        isTouchDevice: false,
        userAgent: "",
        isReady: false,
    });

    useEffect(() => {
        const ua = navigator.userAgent;
        setInfo({
            os: detectOS(ua),
            browser: detectBrowser(ua),
            deviceType: detectDeviceType(ua),
            isTouchDevice: detectTouch(),
            userAgent: ua,
            isReady: true,
        });
    }, []);

    return info;
};

