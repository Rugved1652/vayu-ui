// index.ts
// Public API

import TextAreaRoot from './TextArea';
import { TextAreaLabel } from './TextAreaLabel';
import { TextAreaInput } from './TextAreaInput';
import { TextAreaSupportText } from './TextAreaSupportText';
import { TextAreaErrorText } from './TextAreaErrorText';
import { TextAreaCharCount } from './TextAreaCharCount';

export type {
  TextAreaResize,
  TextAreaSize,
  TextAreaRootProps,
  TextAreaLabelProps,
  TextAreaInputProps,
  TextAreaSupportTextProps,
  TextAreaErrorTextProps,
  TextAreaCharCountProps,
} from './types';

const TextArea = Object.assign(TextAreaRoot, {
  Label: TextAreaLabel,
  Input: TextAreaInput,
  SupportText: TextAreaSupportText,
  ErrorText: TextAreaErrorText,
  CharCount: TextAreaCharCount,
});

export { TextArea as default };
export { TextArea };
