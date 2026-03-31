// index.ts
// Public API

import OTPInputRoot, { useOTPInput } from "./otpinput";
import { OTPInputGroup } from "./group";
import { OTPInputSlot } from "./slot";
import { OTPInputSeparator } from "./separator";

export type {
    OTPInputContextValue,
    OTPInputRootProps,
    OTPInputGroupProps,
    OTPInputSlotProps,
    OTPInputSeparatorProps,
} from "./types";

// Compound component pattern
const OTPInput = Object.assign(OTPInputRoot, {
    Root: OTPInputRoot,
    Group: OTPInputGroup,
    Slot: OTPInputSlot,
    Separator: OTPInputSeparator,
});

export { OTPInputGroup, OTPInputSlot, OTPInputSeparator, useOTPInput };
export { OTPInput as default };
export { OTPInput };
