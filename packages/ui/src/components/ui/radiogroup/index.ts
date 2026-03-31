// index.ts
// Public API

import RadioGroupRoot from "./radiogroup";
import RadioItem from "./radio-item";

const RadioGroup = Object.assign(RadioGroupRoot, { Item: RadioItem });

export { RadioGroup as default };
export { RadioGroup };

export type { RadioGroupProps, RadioItemProps } from "./types";
