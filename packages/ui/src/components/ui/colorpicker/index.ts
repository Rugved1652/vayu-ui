// index.ts
// Public API

import ColorPickerRoot from "./ColorPicker";
import { ColorPickerLabel } from "./ColorPickerLabel";
import { ColorPickerDescription } from "./ColorPickerDescription";
import { ColorPickerError } from "./ColorPickerError";
import { ColorPickerTrigger } from "./ColorPickerTrigger";
import { ColorPickerInput } from "./ColorPickerInput";
import { ColorPickerCopyButton } from "./ColorPickerCopyButton";
import { ColorPickerContent } from "./ColorPickerContent";
import { ColorPickerPalette } from "./ColorPickerPalette";
import { ColorPickerEyedropper } from "./ColorPickerEyeDropper";
import { ColorPickerPresets } from "./ColorPickerPresets";
import { ColorPickerSwatches } from "./ColorPickerSwatches";

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
