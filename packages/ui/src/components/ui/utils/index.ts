import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes conflicting Tailwind utilities
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
