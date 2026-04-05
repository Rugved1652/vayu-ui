// index.ts
// Public API

import ButtonRoot from './Button';
import Icon from './ButtonIcon';
import Badge from './ButtonBadge';
import Text from './ButtonText';

export { Status } from './types';
export type {
  BadgePosition,
  BadgeProps,
  BadgeVariant,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  IconProps,
  TextProps,
} from './types';

// Compound component pattern
const Button = Object.assign(ButtonRoot, {
  Icon,
  Badge,
  Text,
});

export { Button as default };
export { Button };
