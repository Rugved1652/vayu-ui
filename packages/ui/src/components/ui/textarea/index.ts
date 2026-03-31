// index.ts
// Public API

import TextAreaRoot from "./textarea";
import { TextAreaLabel } from "./label";
import { TextAreaInput } from "./input";
import { TextAreaSupportText } from "./support-text";
import { TextAreaErrorText } from "./error-text";
import { TextAreaCharCount } from "./char-count";

export type {
    TextAreaResize,
    TextAreaSize,
    TextAreaRootProps,
    TextAreaLabelProps,
    TextAreaInputProps,
    TextAreaSupportTextProps,
    TextAreaErrorTextProps,
    TextAreaCharCountProps,
} from "./types";

const TextArea = Object.assign(TextAreaRoot, {
    Label: TextAreaLabel,
    Input: TextAreaInput,
    SupportText: TextAreaSupportText,
    ErrorText: TextAreaErrorText,
    CharCount: TextAreaCharCount,
});

export { TextArea as default };
export { TextArea };
