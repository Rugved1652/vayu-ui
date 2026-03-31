// types.ts
// Types

import type { HTMLAttributes } from "react";

export type AvatarGroupSize = "small" | "medium" | "large" | "xlarge";
export type AvatarGroupLayout = "stack" | "grid";

export interface UserData {
    id?: string | number | null;
    src?: string;
    username?: string;
    alt?: string;
    fallback?: string;
    status?: "online" | "offline" | "away" | "busy";
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    users?: UserData[];
    size?: AvatarGroupSize;
    maxDisplay?: number;
    layout?: AvatarGroupLayout;
    spacing?: "tight" | "normal" | "loose" | number;
    renderOverflow?: (count: number) => React.ReactNode;
    onAvatarClick?: (user: UserData, index: number) => void;
    onOverflowClick?: (hiddenUsers: UserData[]) => void;
}
