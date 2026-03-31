// index.ts
// Public API

import ColorPickerRoot from "./colorpicker";
import { ColorPickerLabel } from "./label";
import { ColorPickerDescription } from "./description";
import { ColorPickerError } from "./error";
import { ColorPickerTrigger } from "./trigger";
import { ColorPickerInput } from "./input";
import { ColorPickerCopyButton } from "./copy-button";
import { ColorPickerContent } from "./content";
import { ColorPickerPalette } from "./palette";
import { ColorPickerEyedropper } from "./eyedropper";
import { ColorPickerPresets } from "./presets";
import { ColorPickerSwatches } from "./swatches";

// Types
export type {
    ColorFormat,
    ValidationState,
    ColorPickerContextValue,
    RGB,
    HSL,
    ColorPickerRootProps,
    ColorPickerLabelProps,
    ColorPickerDescriptionProps,
    ColorPickerErrorProps,
    ColorPickerTriggerProps,
    ColorPickerInputProps,
    ColorPickerCopyButtonProps,
    ColorPickerContentProps,
    ColorPickerPaletteProps,
    ColorPickerEyedropperProps,
    ColorPickerPresetsProps,
    ColorPickerSwatchesProps,
} from "./types";

// Utilities
export { useColorPicker } from "./hooks";
export { parseColor, formatColor, isValidColor } from "./utils";

// Compound component
const ColorPicker = Object.assign(ColorPickerRoot, {
    Label: ColorPickerLabel,
    Description: ColorPickerDescription,
    Error: ColorPickerError,
    Trigger: ColorPickerTrigger,
    Input: ColorPickerInput,
    CopyButton: ColorPickerCopyButton,
    Content: ColorPickerContent,
    Palette: ColorPickerPalette,
    Eyedropper: ColorPickerEyedropper,
    Presets: ColorPickerPresets,
    Swatches: ColorPickerSwatches,
});

export { ColorPicker };
export default ColorPicker;
