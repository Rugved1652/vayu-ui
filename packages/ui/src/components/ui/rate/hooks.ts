// rate/hooks.ts
// Logic

import { createContext, useContext } from "react";
import type { RateContextType } from "./types";

export const RateContext = createContext<RateContextType | undefined>(undefined);

export const useRate = () => {
    const context = useContext(RateContext);
    if (!context) {
        throw new Error("Rate compound components must be used within Rate");
    }
    return context;
};
