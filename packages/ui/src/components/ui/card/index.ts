// index.ts
// Public API

import CardRoot from "./Card";
import { CardHeader } from "./CardHeader";
import { CardMedia } from "./CardMedia";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

export type {
    CardProps,
    CardHeaderProps,
    CardMediaProps,
    CardContentProps,
    CardFooterProps,
} from "./types";

// Compound component pattern
const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Media: CardMedia,
    Content: CardContent,
    Footer: CardFooter,
});

// Named exports for subcomponents
export { CardHeader, CardMedia, CardContent, CardFooter };
export { Card as default };
export { Card };
