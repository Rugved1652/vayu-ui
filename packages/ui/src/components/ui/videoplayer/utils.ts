// utils.ts
// Helpers

export function formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export const VIDEO_BTN =
    "p-2 rounded-full transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500";
