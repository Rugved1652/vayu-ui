// index.ts
// Public API

import ButtonRoot from "./button";
import Icon from "./icon";
import Badge from "./badge";
import Text from "./text";

export { Status } from "./types";
export type {
    BadgePosition,
    BadgeProps,
    BadgeVariant,
    ButtonProps,
    ButtonSize,
    ButtonVariant,
    IconProps,
    TextProps,
} from "./types";

// Compound component pattern
const Button = Object.assign(ButtonRoot, {
    Icon,
    Badge,
    Text,
});

export { Button as default };
export { Button };
