import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'md', 'para', 'body', 'label', 'cta'] },
      ],
    },
  },
});

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes conflicting Tailwind utilities
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

export * from './input-styles';
export * from './use-merge-refs';
