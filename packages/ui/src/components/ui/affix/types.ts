// types.ts
// Types

import { HTMLAttributes } from "react";

export type AffixPosition = "top" | "bottom";

export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
    offset?: number;
    position?: AffixPosition;
    target?: HTMLElement | null;
    zIndex?: number;
    onAffixed?: (affixed: boolean) => void;
    children: React.ReactNode;
}
