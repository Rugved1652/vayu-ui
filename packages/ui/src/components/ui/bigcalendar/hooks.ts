// hooks.ts
// Logic: calendar context

"use client";

import { createContext, useContext } from "react";
import type { CalendarContextValue } from "./types";

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendar(): CalendarContextValue {
    const ctx = useContext(CalendarContext);
    if (!ctx) throw new Error("BigCalendar compound components must be used inside <BigCalendar>");
    return ctx;
}
