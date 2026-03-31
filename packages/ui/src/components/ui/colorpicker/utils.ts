// utils.ts
// Helpers

import type { ColorFormat, RGB, HSL } from "./types";

// Default Presets (Tailwind Colors)
export const DEFAULT_PRESETS = [
    // Reds & Oranges
    "#ef4444",
    "#f97316",
    "#f59e0b",
    // Yellows & Greens
    "#84cc16",
    "#22c55e",
    "#10b981",
    // Teals & Cyans
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    // Blues & Indigos
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    // Violets & Pinks
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    // Neutrals
    "#171717",
    "#404040",
    "#737373",
    "#a3a3a3",
    "#d4d4d4",
    "#e5e5e5",
    "#f5f5f5",
    "#ffffff",
];

// Color Conversion Utilities

function hexToRgb(hex: string): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

function hslToRgb(h: number, s: number, l: number): RGB {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
        g = 0,
        b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
}

function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    );
}

/**
 * Parse various color formats to hex
 * Supports: #rgb, #rrggbb, rgb(r,g,b), rgba(r,g,b,a), hsl(h,s%,l%), hsla(h,s%,l%,a)
 */
export function parseColor(input: string): string | null {
    const trimmed = input.trim().toLowerCase();

    // Hex formats
    if (/^#[a-f\d]{3}$/i.test(trimmed)) {
        const r = trimmed[1];
        const g = trimmed[2];
        const b = trimmed[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }

    if (/^#[a-f\d]{6}$/i.test(trimmed)) {
        return trimmed;
    }

    // RGB format
    const rgbMatch = trimmed.match(
        /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+)?\s*\)$/
    );
    if (rgbMatch) {
        const r = Math.min(255, parseInt(rgbMatch[1]));
        const g = Math.min(255, parseInt(rgbMatch[2]));
        const b = Math.min(255, parseInt(rgbMatch[3]));
        return rgbToHex(r, g, b);
    }

    // HSL format
    const hslMatch = trimmed.match(
        /^hsla?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*[\d.]+)?\s*\)$/
    );
    if (hslMatch) {
        const h = parseInt(hslMatch[1]);
        const s = parseInt(hslMatch[2]);
        const l = parseInt(hslMatch[3]);
        const rgb = hslToRgb(h, s, l);
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    return null;
}

/**
 * Format hex color to specified format
 */
export function formatColor(hex: string, format: ColorFormat): string {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    switch (format) {
        case "rgb":
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case "hsl":
            return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        default:
            return hex;
    }
}

/**
 * Check if a string is a valid color
 */
export function isValidColor(input: string): boolean {
    return parseColor(input) !== null;
}

/**
 * Get contrast color (black or white) for text on background
 */
export function getContrastColor(hex: string): string {
    const rgb = hexToRgb(hex);
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}
