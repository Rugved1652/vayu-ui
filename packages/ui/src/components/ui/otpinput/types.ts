// types.ts
// Types

import type { HTMLAttributes, InputHTMLAttributes } from "react";

export interface OTPInputContextValue {
    value: string;
    isFocused: boolean;
    maxLength: number;
    disabled: boolean;
    id: string;
    hasError: boolean;
}

export interface OTPInputRootProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value?: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    containerClassName?: string;
    /** Callback when the complete code is entered */
    onComplete?: (code: string) => void;
    /** Accessible label for the input */
    label?: string;
    /** Render prop for slots and separators */
    children?: React.ReactNode;
    /** Whether the input has an error */
    hasError?: boolean;
    /** ID of the element that describes the error message */
    errorMessageId?: string;
}

export interface OTPInputGroupProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export interface OTPInputSlotProps extends HTMLAttributes<HTMLDivElement> {
    index: number;
}

export interface OTPInputSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}
