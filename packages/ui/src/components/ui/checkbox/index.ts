// index.ts
// Public API

import CheckboxRoot from "./checkbox";
import { CheckboxIndicator } from "./indicator";
import { CheckboxLabel } from "./label";
import { CheckboxDescription } from "./description";
import { CheckboxError } from "./error";

const Checkbox = Object.assign(CheckboxRoot, {
    Indicator: CheckboxIndicator,
    Label: CheckboxLabel,
    Description: CheckboxDescription,
    Error: CheckboxError,
});

export { Checkbox as default };
export { Checkbox };

export type {
    CheckboxRootProps,
    CheckboxIndicatorProps,
    CheckboxLabelProps,
    CheckboxDescriptionProps,
    CheckboxErrorProps,
} from "./types";
