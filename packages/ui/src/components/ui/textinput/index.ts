// index.ts
// Public API

import TextInput from "./textinput";
import { useTextInput } from "./textinput";
import { Label } from "./label";
import { Field } from "./field";
import { Input } from "./input";
import { PasswordInput } from "./password-input";
import { NumberInput } from "./number-input";
import { SearchInput } from "./search-input";
import { Description } from "./description";
import { ErrorMessage } from "./error-message";
import { WarningMessage } from "./warning-message";
import { SuccessMessage } from "./success-message";
import { Icon } from "./icon";
import { LoadingSpinner } from "./loading-spinner";
import { CharacterCount } from "./character-count";
import { ClearButton } from "./clear-button";

export type {
    InputSize,
    InputType,
    NumberType,
    TextInputContextValue,
    ValidationState,
} from "./types";

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
export { Label, Field, Input, PasswordInput, NumberInput, SearchInput, Description, ErrorMessage, WarningMessage, SuccessMessage, Icon, LoadingSpinner, CharacterCount, ClearButton };
export { TextInput as default };
export { TextInput };
