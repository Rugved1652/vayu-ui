// index.ts
// Public API

import OTPInputRoot, { useOTPInput } from "./OTPInput";
import { OTPInputGroup } from "./OTPInputGroup";
import { OTPInputSlot } from "./OTPInputSlot";
import { OTPInputSeparator } from "./OTPSeparator";

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
