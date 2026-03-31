// hooks.ts
// Logic

import { createContext, useContext } from "react";
import type { ColorPickerContextValue } from "./types";

export const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
    undefined
);

export const useColorPicker = () => {
    const context = useContext(ColorPickerContext);
    if (!context) {
        throw new Error(
            "ColorPicker compound components must be used within ColorPicker.Root"
        );
    }
    return context;
};
