// Type definitions for Accordion component API
import { createContext } from "react";

export type AccordionProps = {
    children: React.ReactNode;
    allowMultiple?: boolean;
    className?: string;
};

export type AccordionItemProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

export type AccordionHeaderProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

export type AccordionBodyProps = {
    children: React.ReactNode;
    itemId: string;
    className?: string;
};

export type AccordionContextType = {
    isItemOpen: (id: string) => boolean;
    toggleItem: (id: string) => void;
    itemIds: string[];
    registerItem: (id: string) => void;
    unregisterItem: (id: string) => void;
    registerPanel: (id: string, ref: React.RefObject<HTMLDivElement | null>) => void;
    unregisterPanel: (id: string) => void;
    firstFocusableRef: React.RefObject<HTMLDivElement | null>;
    moveFocusToPanel: (id: string) => void;
};

export const AccordionContext = createContext<AccordionContextType | null>(null);
