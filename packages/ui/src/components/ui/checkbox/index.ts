// index.ts
// Public API

import CheckboxRoot from "./CheckBox";
import { CheckboxIndicator } from "./CheckBoxIndicator";
import { CheckboxLabel } from "./CheckBoxLabel";
import { CheckboxDescription } from "./CheckBoxDescription";
import { CheckboxError } from "./CheckBoxError";

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
