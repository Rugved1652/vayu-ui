// types.ts
// Types

import React, { HTMLAttributes } from "react";

export interface RadioGroupContextType {
    value: string;
    onChange: (value: string) => void;
    name: string;
    disabled?: boolean;
}

export interface RadioGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    disabled?: boolean;
    orientation?: "vertical" | "horizontal";
    label?: string;
    description?: string;
    error?: boolean;
    errorText?: string;
    required?: boolean;
    children: React.ReactNode;
}

export interface RadioItemProps
    extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
    value: string;
    label?: string;
    description?: string;
    disabled?: boolean;
}
