// index.ts
// Public API

import PopoverRoot from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';

export type { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './types';

// Backward compatibility: audioplayer imports useMergeRefs from "../popover"
export { useMergeRefs } from '../utils';

// Compound component pattern
const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

export { Popover as default };
export { Popover };
