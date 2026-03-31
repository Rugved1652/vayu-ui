// types.ts
// Types

import type { InputHTMLAttributes, ReactNode } from "react";

export type InputType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";

export type InputSize = "sm" | "md" | "lg";

export type ValidationState = "default" | "error" | "warning" | "success";

export type NumberType = "integer" | "decimal" | "positive" | "natural";

export interface TextInputContextValue {
    inputId: string;
    errorId: string;
    descriptionId: string;
    labelId: string;
    value: string;
    isFocused: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    isRequired: boolean;
    isLoading: boolean;
    validationState: ValidationState;
    hasValue: boolean;
    inputType: InputType;
    size: InputSize;
    setValue: (value: string) => void;
    setFocused: (focused: boolean) => void;
    clearValue: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

export interface TextInputRootProps {
    children: ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    inputType?: InputType;
    size?: InputSize;
    validationState?: ValidationState;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    loading?: boolean;
    className?: string;
}

export interface LabelProps {
    children: ReactNode;
    className?: string;
    optional?: boolean;
}

export interface FieldProps {
    children: ReactNode;
    className?: string;
}

export interface InputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange" | "size" | "defaultValue"
    > {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    type?: InputType;
}

export interface PasswordInputProps extends InputProps {}

export interface NumberInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type" | "value" | "onChange" | "size"
    > {
    numberType?: NumberType;
    min?: number;
    max?: number;
    step?: number;
}

export interface SearchInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type" | "value" | "onChange" | "size"
    > {}

export interface HelperTextProps {
    children: ReactNode;
    className?: string;
}

export interface IconProps {
    children: ReactNode;
    className?: string;
}

export interface CharacterCountProps {
    maxLength: number;
    showCount?: "always" | "focus" | "near-limit";
    threshold?: number;
    className?: string;
}

export interface ClearButtonProps {
    onClear?: () => void;
    className?: string;
}
