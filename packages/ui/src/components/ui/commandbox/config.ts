// config.ts
// Configuration constants

import { clsx } from "clsx";
import type { CommandBoxSize, CommandBoxVariant } from "./types";

export const sizeClasses: Record<
    CommandBoxSize,
    { container: string; input: string; item: string; icon: string }
> = {
    small: {
        container: "text-sm",
        input: "px-3 py-2 text-sm",
        item: "px-3 py-2 text-sm",
        icon: "w-4 h-4",
    },
    medium: {
        container: "text-base",
        input: "px-4 py-3 text-base",
        item: "px-4 py-3 text-base",
        icon: "w-5 h-5",
    },
    large: {
        container: "text-lg",
        input: "px-5 py-4 text-lg",
        item: "px-5 py-4 text-lg",
        icon: "w-6 h-6",
    },
};

export const variantClasses: Record<CommandBoxVariant, string> = {
    default: clsx(
        "bg-white border border-neutral-200 shadow-lg",
        "dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-xl"
    ),
    bordered: clsx(
        "bg-white border-2 border-primary-200 shadow-lg",
        "dark:bg-neutral-800 dark:border-primary-600 dark:shadow-xl"
    ),
    elevated: clsx(
        "bg-white border border-neutral-200 shadow-xl",
        "dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-2xl"
    ),
    minimal: clsx(
        "bg-white border border-neutral-100 shadow-md",
        "dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-lg"
    ),
};

export const defaultFilter = (value: string, search: string): number =>
    value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
