// hooks.ts
// Logic

"use client";

import { useContext } from "react";
import { TourContext } from "./tour";
import type { TourContextValue } from "./types";

const useTour = (): TourContextValue => {
    const ctx = useContext(TourContext);
    if (!ctx) throw new Error("useTour must be used within <Tour>");
    return ctx;
};

export { useTour };
