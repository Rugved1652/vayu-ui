// index.ts
// Public API

import CardRoot from "./card";
import { CardHeader } from "./header";
import { CardMedia } from "./media";
import { CardContent } from "./content";
import { CardFooter } from "./footer";

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
