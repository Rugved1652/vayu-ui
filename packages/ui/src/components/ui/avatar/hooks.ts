// hooks.ts
// Logic: Initial generation and color assignment

import { WCAG_COMPLIANT_COLORS } from "./types";

export const generateInitials = (username: string): string => {
    if (!username) return "";
    const names = username.trim().split(/\s+/);
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const getInitialsColor = (username: string): string => {
    if (!username) return WCAG_COMPLIANT_COLORS[0];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return WCAG_COMPLIANT_COLORS[Math.abs(hash) % WCAG_COMPLIANT_COLORS.length];
};
