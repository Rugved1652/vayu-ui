// rate/types.ts
// Types

import { ReactElement, ReactNode } from "react";

export type RateSize = "sm" | "md" | "lg" | "xl";

export interface DefaultIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export interface RateContextType {
    count: number;
    currentValue: number;
    activeValue: number;
    hoverValue: number | null;
    setHoverValue: (value: number | null) => void;
    handleClick: (clickValue: number) => void;
    handleHover: (value: number) => void;
    handleMouseLeave: () => void;
    isDisabled: boolean;
    readOnly: boolean;
    allowHalf: boolean;
    size: RateSize;
    icon: ReactElement;
    filledIcon: ReactElement;
    halfIcon: ReactElement;
    error: boolean;
    labels?: string[];
    getFillPercentage: (starIndex: number) => number;
    inputId: string;
    isControlled: boolean;
    setInternalValue: (value: number) => void;
    onChange?: (value: number) => void;
    isContainerFocused: boolean;
    setIsContainerFocused: (value: boolean) => void;
}

export interface RateRootProps {
    children?: ReactNode;
    count?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    readOnly?: boolean;
    disabled?: boolean;
    allowHalf?: boolean;
    allowClear?: boolean;
    size?: RateSize;
    icon?: ReactElement;
    filledIcon?: ReactElement;
    halfIcon?: ReactElement;
    error?: boolean;
    labels?: string[];
    className?: string;
    id?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
}

export interface RateLabelProps {
    children: ReactNode;
    className?: string;
}

export interface RateDescriptionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export interface RateStarsProps {
    className?: string;
    "aria-label"?: string;
}

export interface RateStarProps {
    index: number;
}

export interface RateValueProps {
    className?: string;
    showTotal?: boolean;
    decimals?: number;
}

export interface RateTextLabelProps {
    className?: string;
}

export interface RateContainerProps {
    children: ReactNode;
    className?: string;
}

export interface RateErrorTextProps {
    children: ReactNode;
    className?: string;
    id?: string;
}
