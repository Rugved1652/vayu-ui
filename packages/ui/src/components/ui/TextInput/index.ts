// index.ts
// Public API

import TextInput from './TextInput';
import { useTextInput } from './TextInput';
import { TextInputLabel as Label } from './TextInputLabel';
import { TextInputField as Field } from './TextInputField';
import { Input } from './Input';
import { PasswordInput } from './TextInputPasswordInput';
import { NumberInput } from './TextInputNumberInput';
import { SearchInput } from './TextInputSearchInput';
import { Description } from './TextInputDescription';
import { ErrorMessage } from './TextInputErrorMessage';
import { WarningMessage } from './TextInputWarningMessage';
import { SuccessMessage } from './TextInputSuccessMessage';
import { Icon } from './TextInputIcon';
import { LoadingSpinner } from './TextInputLoadingSpinner';
import { CharacterCount } from './TextInputCharacterCount';
import { ClearButton } from './TextInputClearButton';

export type {
  InputSize,
  InputType,
  NumberType,
  TextInputContextValue,
  ValidationState,
} from './types';

// Compound component pattern
TextInput.Label = Label;
TextInput.Field = Field;
TextInput.Input = Input;
TextInput.PasswordInput = PasswordInput;
TextInput.NumberInput = NumberInput;
TextInput.SearchInput = SearchInput;
TextInput.Description = Description;
TextInput.ErrorMessage = ErrorMessage;
TextInput.WarningMessage = WarningMessage;
TextInput.SuccessMessage = SuccessMessage;
TextInput.Icon = Icon;
TextInput.LoadingSpinner = LoadingSpinner;
TextInput.CharacterCount = CharacterCount;
TextInput.ClearButton = ClearButton;

export { useTextInput };
export {
  Label,
  Field,
  Input,
  PasswordInput,
  NumberInput,
  SearchInput,
  Description,
  ErrorMessage,
  WarningMessage,
  SuccessMessage,
  Icon,
  LoadingSpinner,
  CharacterCount,
  ClearButton,
};
export { TextInput as default };
export { TextInput };
