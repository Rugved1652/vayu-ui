// textinput.tsx
// Composition: context + root

"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useId,
    useMemo,
    useRef,
    useState,
    forwardRef,
} from "react";
import { cn } from "../utils";
import type {
    TextInputRootProps,
    TextInputContextValue,
    InputType,
    InputSize,
    ValidationState,
    LabelProps,
    FieldProps,
    InputProps,
    PasswordInputProps,
    NumberInputProps,
    SearchInputProps,
    HelperTextProps,
    IconProps,
    CharacterCountProps,
    ClearButtonProps,
} from "./types";

// Context

const TextInputContext = createContext<TextInputContextValue | undefined>(
    undefined
);

export const useTextInput = () => {
    const context = useContext(TextInputContext);
    if (!context) {
        throw new Error(
            "TextInput compound components must be used within TextInput.Root"
        );
    }
    return context;
};

// Root

const TextInputRoot = forwardRef<HTMLDivElement, TextInputRootProps>(
    (
        {
            children,
            value: controlledValue,
            defaultValue = "",
            onChange,
            inputType = "text",
            size = "md",
            validationState = "default",
            disabled = false,
            readOnly = false,
            required = false,
            loading = false,
            className = "",
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
        const [isFocused, setIsFocused] = useState(false);

        const baseId = useId();
        const inputId = `${baseId}-input`;
        const errorId = `${baseId}-error`;
        const descriptionId = `${baseId}-description`;
        const labelId = `${baseId}-label`;

        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : uncontrolledValue;

        const setValue = useCallback(
            (newValue: string) => {
                if (!isControlled) {
                    setUncontrolledValue(newValue);
                }
                onChange?.(newValue);
            },
            [isControlled, onChange]
        );

        const clearValue = useCallback(() => {
            setValue("");
        }, [setValue]);

        const hasValue = value.trim() !== "";

        const contextValue = useMemo<TextInputContextValue>(() => ({
            inputId,
            errorId,
            descriptionId,
            labelId,
            value,
            isFocused,
            isDisabled: disabled,
            isReadOnly: readOnly,
            isRequired: required,
            isLoading: loading,
            validationState,
            hasValue,
            inputType,
            size,
            setValue,
            setFocused: setIsFocused,
            clearValue,
            inputRef: inputRef as React.RefObject<HTMLInputElement>,
        }), [
            inputId,
            errorId,
            descriptionId,
            labelId,
            value,
            isFocused,
            disabled,
            readOnly,
            required,
            loading,
            validationState,
            hasValue,
            inputType,
            size,
            setValue,
            clearValue,
        ]);

        return (
            <TextInputContext.Provider value={contextValue}>
                <div ref={ref} className={cn("w-full", className)}>
                    {children}
                </div>
            </TextInputContext.Provider>
        );
    }
);

TextInputRoot.displayName = "TextInput.Root";

// Compound component with placeholder subcomponents (real ones assigned in index.ts)
const TextInput = Object.assign(TextInputRoot, {
    Label: {} as React.FC<LabelProps>,
    Field: {} as React.FC<FieldProps>,
    Input: {} as React.ForwardRefExoticComponent<
        InputProps & React.RefAttributes<HTMLInputElement>
    >,
    PasswordInput: {} as React.ForwardRefExoticComponent<
        PasswordInputProps & React.RefAttributes<HTMLInputElement>
    >,
    NumberInput: {} as React.ForwardRefExoticComponent<
        NumberInputProps & React.RefAttributes<HTMLInputElement>
    >,
    SearchInput: {} as React.ForwardRefExoticComponent<
        SearchInputProps & React.RefAttributes<HTMLInputElement>
    >,
    Description: {} as React.FC<HelperTextProps>,
    ErrorMessage: {} as React.FC<HelperTextProps>,
    WarningMessage: {} as React.FC<HelperTextProps>,
    SuccessMessage: {} as React.FC<HelperTextProps>,
    Icon: {} as React.FC<IconProps>,
    LoadingSpinner: {} as React.FC,
    CharacterCount: {} as React.FC<CharacterCountProps>,
    ClearButton: {} as React.FC<ClearButtonProps>,
});

export default TextInput;
