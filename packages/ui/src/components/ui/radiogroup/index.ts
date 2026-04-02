// index.ts
// Public API

import RadioGroupRoot from './RadioGroup';
import RadioItem from './RadioItem';

const RadioGroup = Object.assign(RadioGroupRoot, { Item: RadioItem });

export { RadioGroup as default };
export { RadioGroup };

export type { RadioGroupProps, RadioItemProps } from './types';
