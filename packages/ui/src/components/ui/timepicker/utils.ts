// utils.ts
// Logic

import type { TimeValue, TimeRange, DisabledTimeConfig } from "./types";

export function parseTimeString(timeStr: string): TimeValue | null {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return { hour, minute };
}

export function formatTimeValue(time: TimeValue | null, format: "12h" | "24h"): string {
    if (!time) return "";
    const hour = format === "12h" ? convertTo12Hour(time.hour) : time.hour;
    const displayHour = format === "12h" && hour === 0 ? 12 : hour;
    const minute = time.minute.toString().padStart(2, "0");
    const period = format === "12h" ? (time.hour >= 12 ? " PM" : " AM") : "";
    return `${displayHour.toString().padStart(2, "0")}:${minute}${period}`;
}

export function convertTo12Hour(hour24: number): number {
    if (hour24 === 0 || hour24 === 12) return 12;
    return hour24 > 12 ? hour24 - 12 : hour24;
}

export function convertTo24Hour(hour12: number, period: "AM" | "PM"): number {
    if (period === "AM") return hour12 === 12 ? 0 : hour12;
    return hour12 === 12 ? 12 : hour12 + 12;
}

export function isTimeDisabled(
    time: TimeValue,
    config: DisabledTimeConfig
): boolean {
    const { disabledTimes = [], disabledHours = [], minTime, maxTime } = config;

    if (disabledHours.includes(time.hour)) return true;

    const timeStr = `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
    if (disabledTimes.includes(timeStr)) return true;

    if (minTime) {
        const min = parseTimeString(minTime);
        if (min && (time.hour < min.hour || (time.hour === min.hour && time.minute < min.minute))) {
            return true;
        }
    }

    if (maxTime) {
        const max = parseTimeString(maxTime);
        if (max && (time.hour > max.hour || (time.hour === max.hour && time.minute > max.minute))) {
            return true;
        }
    }

    return false;
}

export function timeToMinutes(time: TimeValue): number {
    return time.hour * 60 + time.minute;
}

export function isValidTimeRange(range: TimeRange): boolean {
    if (!range.start || !range.end) return false;
    return timeToMinutes(range.start) <= timeToMinutes(range.end);
}

export function clampTimeSegment(
    raw: string,
    min: number,
    max: number,
): number {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return min;
    return Math.max(min, Math.min(max, n));
}
